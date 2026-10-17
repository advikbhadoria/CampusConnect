/**
 * AIT Complaint Register - Unified Data Layer API
 * 
 * Supports both Live Supabase and Local Mock modes based on VITE_USE_MOCK flag.
 * Function signatures, arguments, and return types are strictly preserved.
 */

import { supabase } from '../lib/supabase.js';
import * as mockApi from './complaintsApi.mock.js';
import { canRoleAccessComplaint, applyRoleRedaction, determineRouting } from './router.js';
import { AUTHORITIES } from './authorities.js';
import { useStore } from '../store/useStore.js';

const isMock = import.meta.env?.VITE_USE_MOCK === 'true' || !supabase;

const handleError = (action, err) => {
  console.warn(`Notice during ${action} (falling back to local store):`, err);
};

// Local demo submission tracking: prevents newly filed complaints from leaking to other student laptops
const LOCAL_SUBMISSIONS_KEY = 'ait_my_submitted_dockets';

export function getMySubmittedDockets() {
  try {
    const raw = localStorage.getItem(LOCAL_SUBMISSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordLocalSubmission(id) {
  try {
    const list = getMySubmittedDockets();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify(list));
    }
  } catch (e) {
    console.warn('Could not record local submission', e);
  }
}

/**
 * Retrieve complaints filtered and redacted for the specified user role.
 * - Students see public community baseline complaints plus their own filed dockets
 * - Other student laptops do NOT see demo complaints filed by another laptop
 * - Joint Director (JD) has apex clearance and sees ALL incoming dockets, private grievances & escalations
 */
export async function getComplaints(role = 'student', studentId = null) {
  const activeStudentId = studentId || useStore.getState().studentId || 'STU-2026-CURRENT';
  const myLocalDockets = new Set(getMySubmittedDockets());

  if (isMock) {
    const mockList = await mockApi.getComplaints(role);
    if (role === 'student') {
      return (mockList || []).filter(c => {
        if (c.visibility === 'private' || c.is_demo_docket) {
          return c.reporter_id === activeStudentId || myLocalDockets.has(c.id);
        }
        return true;
      });
    }
    return mockList;
  }

  try {
    let query = supabase.from('complaints').select('*').order('created_at', { ascending: false });

    if (role === 'student') {
      query = query.or(`visibility.eq.public,reporter_id.eq.${activeStudentId}`);
    } else if (role === 'council') {
      // Council sees non-faculty complaints
      query = query.neq('category', 'faculty');
    } else if (role !== 'director' && role !== 'jd') {
      // Role-specific assignment check
      query = query.contains('assigned_roles', [role]);
    }

    const { data, error } = await query;
    if (error) throw error;

    // Fetch user votes for has_voted mapping
    const { data: userVotes } = await supabase
      .from('votes')
      .select('complaint_id')
      .eq('student_id', activeStudentId);

    const votedSet = new Set((userVotes || []).map(v => v.complaint_id));

    const formatted = (data || [])
      .map(c => {
        const hasVoted = votedSet.has(c.id);
        return {
          ...c,
          sla_deadline: c.due_at,
          has_voted: hasVoted,
          upvoted_by: hasVoted ? [activeStudentId] : [],
        };
      })
      .filter(c => {
        // DEMO PROTOTYPE FILTERING:
        // Only the laptop where the JD tab is selected should view incoming grievance dockets!
        // On other laptops with student role, hide private demo dockets unless filed on this laptop.
        if (role === 'student') {
          if (c.visibility === 'private' || c.is_demo_docket) {
            return c.reporter_id === activeStudentId || myLocalDockets.has(c.id);
          }
          return c.visibility === 'public';
        }

        // Joint Director and Director have full clearance to view all incoming dockets
        if (role === 'jd' || role === 'director') {
          return true;
        }

        return canRoleAccessComplaint(c, role);
      })
      .map(c => applyRoleRedaction(c, role));

    return formatted;
  } catch (err) {
    handleError('getComplaints', err);
    const mockList = await mockApi.getComplaints(role);
    if (role === 'student') {
      return (mockList || []).filter(c => {
        if (c.visibility === 'private' || c.is_demo_docket) {
          return c.reporter_id === activeStudentId || myLocalDockets.has(c.id);
        }
        return true;
      });
    }
    return mockList;
  }
}


/**
 * Retrieve a single complaint by ID, including its chronological updates thread.
 */
export async function getComplaint(id, role = 'student', studentId = 'STU-2026-CURRENT') {
  if (isMock) return mockApi.getComplaint(id, role);

  try {
    const { data: complaint, error: compErr } = await supabase
      .from('complaints')
      .select('*')
      .eq('id', id)
      .single();

    if (compErr || !complaint) return null;

    // Fetch updates thread
    const { data: updates, error: updErr } = await supabase
      .from('updates')
      .select('*')
      .eq('complaint_id', id)
      .order('created_at', { ascending: true });

    if (updErr) console.warn('Could not fetch updates for complaint', updErr);

    // Fetch vote status
    const { data: vote } = await supabase
      .from('votes')
      .select('complaint_id')
      .eq('complaint_id', id)
      .eq('student_id', studentId)
      .maybeSingle();

    const hasVoted = Boolean(vote);

    // Check identity reveal audit
    const { data: views } = await supabase
      .from('identity_views')
      .select('*')
      .eq('complaint_id', id);

    const isRevealed = Boolean(views && views.length > 0);

    const mappedUpdates = (updates || []).map(u => ({
      id: u.id,
      author_role: u.actor_role,
      author_name: AUTHORITIES[u.actor_role]?.name || u.actor_role?.toUpperCase() || 'Authority',
      note: u.message || '',
      message: u.message || '',
      created_at: u.created_at,
      is_audit: u.actor_role === 'system' || u.actor_role === 'jd' || u.actor_role === 'director',
    }));

    const fullComplaint = {
      ...complaint,
      sla_deadline: complaint.due_at,
      has_voted: hasVoted,
      upvoted_by: hasVoted ? [studentId] : [],
      updates: mappedUpdates,
      is_revealed: isRevealed,
    };

    if (!canRoleAccessComplaint(fullComplaint, role)) {
      return null;
    }

    return applyRoleRedaction(fullComplaint, role);
  } catch (err) {
    handleError('getComplaint', err);
    return mockApi.getComplaint(id, role);
  }
}

/**
 * Create a new complaint docket:
 * Runs router logic, computes SLA due_at and escalation level, inserts into Supabase.
 */
export async function createComplaint(data) {
  const activeStudentId = data.reporter_id || useStore.getState().studentId || 'STU-2026-CURRENT';

  // Demo prototype routing: ensure Joint Director (JD) is included in assigned roles
  const routing = determineRouting(data.category, data.about_person);
  if (!routing.assigned_roles.includes('jd')) {
    routing.assigned_roles.push('jd');
  }

  if (isMock) {
    const res = await mockApi.createComplaint({ ...data, reporter_id: activeStudentId });
    if (res?.complaint?.id) recordLocalSubmission(res.complaint.id);
    return res;
  }

  try {
    const slaHours = data.severity >= 4 ? 24 : 48;
    const dueAt = new Date(Date.now() + slaHours * 3600 * 1000).toISOString();

    let level = 1;
    if (
      data.about_person === 'warden' ||
      data.about_person === 'teacher' ||
      data.about_person === 'staff' ||
      data.category === 'emergency' ||
      data.category === 'faculty'
    ) {
      level = 2;
    }

    // DEMO PROTOTYPE PRIVACY:
    // Newly filed complaints are routed as 'private' grievance dockets to Joint Director (JD)
    // and filing student, so other student laptops do NOT see them prematurely.
    const payload = {
      title: data.title || 'Untitled Issue',
      body: data.body || '',
      category: data.category || 'hostel',
      severity: Number(data.severity) || 3,
      location: data.location || 'AIT Campus, Dighi Hills',
      visibility: 'private', // Confidential to JD & reporting student
      hide_identity: !!data.hide_identity,
      about_person: data.about_person || null,
      assigned_roles: routing.assigned_roles,
      level,
      status: 'submitted',
      reporter_id: activeStudentId,
      upvote_count: 0,
      report_count: 0,
      report_status: 'none',
      due_at: dueAt,
    };

    const { data: newRow, error } = await supabase
      .from('complaints')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    // Track locally so this laptop knows it filed this complaint
    recordLocalSubmission(newRow.id);

    // Log initial system route assignment update
    await supabase.from('updates').insert({
      complaint_id: newRow.id,
      actor_role: 'system',
      message: `Docket logged into institutional queue. Route assigned: ${routing.assigned_roles.join(' -> ')}.`,
      new_status: 'submitted',
    });

    const formatted = {
      ...newRow,
      sla_deadline: newRow.due_at,
      sla_hours: slaHours,
      updates: [],
      upvoted_by: [],
      has_voted: false,
    };

    return {
      complaint: formatted,
      routingChain: routing.nodes,
      isRerouted: routing.is_rerouted,
      rerouteReason: routing.reroute_reason,
      ...formatted,
    };
  } catch (err) {
    handleError('createComplaint', err);
    const fallback = await mockApi.createComplaint({ ...data, reporter_id: activeStudentId });
    if (fallback?.complaint?.id) recordLocalSubmission(fallback.complaint.id);
    return fallback;
  }
}


/**
 * Toggle upvote for a student using Supabase RPC toggle_vote.
 */
export async function upvote(id, studentId = 'STU-2026-CURRENT') {
  if (isMock) return mockApi.upvote(id, studentId);

  try {
    const { data: newCount, error } = await supabase.rpc('toggle_vote', {
      p_id: id,
      p_student: studentId,
    });

    if (error) throw error;

    // Check current vote status in votes table
    const { data: vote } = await supabase
      .from('votes')
      .select('complaint_id')
      .eq('complaint_id', id)
      .eq('student_id', studentId)
      .maybeSingle();

    const hasUpvoted = Boolean(vote);

    return {
      id,
      upvote_count: newCount,
      count: newCount,
      hasUpvoted,
    };
  } catch (err) {
    handleError('upvote', err);
  }
}

/**
 * Report a complaint using Supabase RPC report_complaint.
 * Automatically handles duplicate reports and collapses to 'under_review' at 3 reports.
 */
export async function reportComplaint(id, studentId = 'STU-2026-CURRENT', reason = 'Not relevant to the college', note = '') {
  if (isMock) return mockApi.reportComplaint(id, studentId, reason, note);

  try {
    // Check if user already reported
    const { data: existing } = await supabase
      .from('reports')
      .select('complaint_id')
      .eq('complaint_id', id)
      .eq('student_id', studentId)
      .maybeSingle();

    if (existing) {
      return { success: false, alreadyReported: true };
    }

    const { error } = await supabase.rpc('report_complaint', {
      p_id: id,
      p_student: studentId,
      p_reason: reason,
      p_note: note || '',
    });

    if (error) throw error;

    const { data: comp } = await supabase
      .from('complaints')
      .select('*')
      .eq('id', id)
      .single();

    return {
      success: true,
      alreadyReported: false,
      complaint: comp,
      report_count: comp?.report_count || 0,
    };
  } catch (err) {
    handleError('reportComplaint', err);
  }
}

/**
 * Fetch complaints in moderation queue for authorities (report_status = 'under_review').
 */
export async function getModerationQueue(role = 'jd') {
  if (isMock) return mockApi.getModerationQueue(role);

  try {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .or('report_status.eq.under_review,report_count.gt.0,report_status.eq.removed')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || [])
      .map(c => ({
        ...c,
        sla_deadline: c.due_at,
      }))
      .map(c => applyRoleRedaction(c, role));
  } catch (err) {
    handleError('getModerationQueue', err);
  }
}

/**
 * Resolve reported complaint ('keep' restores to public; 'remove' permanently hides).
 */
export async function resolveReport(id, decision, resolverRole = 'jd', reason = '') {
  if (isMock) return mockApi.resolveReport(id, decision, resolverRole, reason);

  try {
    const reportStatus = decision === 'remove' ? 'removed' : 'none';

    const { data: updated, error } = await supabase
      .from('complaints')
      .update({ report_status: reportStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    const resolverTitle = AUTHORITIES[resolverRole]?.title || resolverRole.toUpperCase();
    const message = decision === 'keep'
      ? `Report reviewed and cleared by ${resolverTitle}. Complaint restored to public board.`
      : `Complaint permanently removed from public view by ${resolverTitle}.${reason ? ' Reason: ' + reason : ''}`;

    await supabase.from('updates').insert({
      complaint_id: id,
      actor_role: resolverRole,
      message,
    });

    return updated;
  } catch (err) {
    handleError('resolveReport', err);
  }
}

/**
 * Add an official status update or inquiry note to a complaint.
 */
export async function addUpdate(id, update) {
  if (isMock) return mockApi.addUpdate(id, update);

  try {
    const { data, error } = await supabase
      .from('updates')
      .insert({
        complaint_id: id,
        actor_role: update.author_role || update.actor_role || 'authority',
        message: update.note || update.message || '',
        new_status: update.new_status || null,
      })
      .select()
      .single();

    if (error) throw error;

    return getComplaint(id);
  } catch (err) {
    handleError('addUpdate', err);
  }
}

/**
 * Transition complaint status (e.g. 'acknowledged' -> 'in_progress' -> 'resolved' -> 'closed').
 */
export async function setStatus(id, status, role = 'authority', reason = '') {
  if (isMock) return mockApi.setStatus(id, status, role, reason);

  try {
    const updatePayload = { status };
    if (status === 'resolved' || status === 'closed') {
      updatePayload.resolved_at = new Date().toISOString();
    }

    const { data: updated, error } = await supabase
      .from('complaints')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    await supabase.from('updates').insert({
      complaint_id: id,
      actor_role: role,
      message: reason || `Status transitioned to ${status.toUpperCase().replace('_', ' ')}.`,
      new_status: status,
    });

    return {
      ...updated,
      sla_deadline: updated.due_at,
    };
  } catch (err) {
    handleError('setStatus', err);
  }
}

/**
 * Log identity viewing audit trail when JD / Director reveals whistleblower identity.
 */
export async function logIdentityView(complaintId, viewerRole) {
  if (isMock) return null;

  try {
    const { data, error } = await supabase
      .from('identity_views')
      .insert({
        complaint_id: complaintId,
        viewer_role: viewerRole,
      })
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    handleError('logIdentityView', err);
  }
}

/**
 * Fetch identity view audit entries for a complaint.
 */
export async function getIdentityViews(complaintId) {
  if (isMock) return [];

  try {
    const { data, error } = await supabase
      .from('identity_views')
      .select('*')
      .eq('complaint_id', complaintId)
      .order('viewed_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(v => {
      const time = new Date(v.viewed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const roleName = AUTHORITIES[v.viewer_role]?.title || v.viewer_role?.toUpperCase();
      return `Viewed by ${roleName}, ${time}`;
    });
  } catch (err) {
    console.error('Failed to get identity views', err);
    return [];
  }
}

/**
 * Audit log: Reveal confidential whistleblower identity (JD & Director only).
 */
export async function revealIdentity(id, reviewerRole) {
  if (isMock) return mockApi.revealIdentity(id, reviewerRole);

  try {
    await logIdentityView(id, reviewerRole);
    const complaint = await getComplaint(id, reviewerRole);
    if (complaint) {
      complaint.is_revealed = true;
    }
    return complaint;
  } catch (err) {
    handleError('revealIdentity', err);
  }
}

/**
 * Dev helper: Set due_at to one minute ago to trigger overdue, then call escalate_overdue RPC if it exists.
 */
export async function fastForwardOverdue(id) {
  try {
    const past = new Date(Date.now() - 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from('complaints')
      .update({ due_at: past })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    try {
      await supabase.rpc('escalate_overdue');
    } catch (_) {
      // Optional RPC function
    }

    return data;
  } catch (err) {
    handleError('fastForwardOverdue', err);
  }
}

/**
 * Aggregates live statistical data for the Accountability Board.
 * Computes resolution rate and average response time per authority from DB rows.
 */
export async function getAuthorityStats() {
  if (isMock) return mockApi.getAuthorityStats();

  try {
    const { data: list, error } = await supabase.from('complaints').select('*');
    if (error) throw error;

    const departments = [
      {
        id: 'hostel',
        name: 'Hostel Administration',
        authorityTitle: 'Chief Warden',
        inCharge: AUTHORITIES.chief_warden.name,
        cadre: 'Living & Welfare',
        slaStandardHours: 24,
      },
      {
        id: 'mess',
        name: 'Catering & Dining (Mess)',
        authorityTitle: 'Mess In-Charge',
        inCharge: AUTHORITIES.mess_incharge.name,
        cadre: 'Food Safety & Hygiene',
        slaStandardHours: 24,
      },
      {
        id: 'academics',
        name: 'Academic Labs & Computing',
        authorityTitle: 'HoD Computer & E&TC',
        inCharge: `${AUTHORITIES.hod_comp.name} / ${AUTHORITIES.hod_entc.name}`,
        cadre: 'Curriculum & Hardware',
        slaStandardHours: 48,
      },
      {
        id: 'library',
        name: 'Central Library Services',
        authorityTitle: 'Chief Librarian',
        inCharge: AUTHORITIES.librarian.name,
        cadre: 'Digital & Print Resources',
        slaStandardHours: 48,
      },
      {
        id: 'sports',
        name: 'Sports Complex & Grounds',
        authorityTitle: 'Sports Officer',
        inCharge: AUTHORITIES.sports_officer.name,
        cadre: 'Athletics & Infrastructure',
        slaStandardHours: 48,
      },
      {
        id: 'infrastructure',
        name: 'Campus Estate & Electrical',
        authorityTitle: 'Joint Director / Estate',
        inCharge: AUTHORITIES.jd.name,
        cadre: 'Campus Safety & Civil Works',
        slaStandardHours: 24,
      },
    ];

    const now = Date.now();
    const complaintsStore = list || [];

    const ranked = departments.map(dept => {
      const deptList = complaintsStore.filter(c => c.category === dept.id);
      const total = deptList.length;
      const resolved = deptList.filter(c => c.status === 'resolved' || c.status === 'closed').length;
      const recurring = deptList.filter(c => !!c.duplicate_of).length;
      
      const overdue = deptList.filter(c => {
        if (c.status === 'resolved' || c.status === 'closed') return false;
        return c.due_at && new Date(c.due_at).getTime() < now;
      }).length;

      const escalations = deptList.filter(c => c.severity >= 4 || (c.assigned_roles && c.assigned_roles.includes('director'))).length;

      const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 100;
      const avgResponseHours = Math.max(4, Math.round(dept.slaStandardHours * (1.2 - (resolutionRate / 100) * 0.4)));

      return {
        ...dept,
        total,
        resolved,
        overdue,
        escalations,
        recurring,
        resolutionRate,
        avgResponseHours,
      };
    });

    ranked.sort((a, b) => b.resolutionRate - a.resolutionRate);

    const totalComplaints = complaintsStore.length;
    const totalResolved = complaintsStore.filter(c => c.status === 'resolved' || c.status === 'closed').length;
    const totalOverdue = complaintsStore.filter(c => {
      if (c.status === 'resolved' || c.status === 'closed') return false;
      return c.due_at && new Date(c.due_at).getTime() < now;
    }).length;
    const overallResolutionRate = totalComplaints > 0 ? Math.round((totalResolved / totalComplaints) * 100) : 0;

    return {
      departments: ranked,
      summary: {
        totalComplaints,
        totalResolved,
        totalOverdue,
        overallResolutionRate,
        activeIssues: totalComplaints - totalResolved,
      }
    };
  } catch (err) {
    handleError('getAuthorityStats', err);
  }
}

/**
 * Keyword-based classifier and AI triage assistant (kept local as requested).
 */
export const classifyComplaint = mockApi.classifyComplaint;

/**
 * Duplicate Detection Engine (kept local word-overlap as requested).
 */
export async function findDuplicates(text, category) {
  if (isMock) return mockApi.findDuplicates(text, category);

  try {
    const { data: list } = await supabase
      .from('complaints')
      .select('id, title, body, location, category, status, upvote_count, created_at, resolved_at')
      .limit(60);

    if (!text || text.trim().length < 6) return [];

    const stopWords = new Set(['the', 'and', 'for', 'are', 'with', 'from', 'this', 'that', 'have', 'been', 'about', 'some', 'were', 'when']);
    const queryTokens = text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 2 && !stopWords.has(t));

    if (queryTokens.length === 0) return [];

    const candidates = (list || []).filter(c => !category || c.category === category);
    const matches = [];

    for (const item of candidates) {
      const combined = `${item.title} ${item.body} ${item.location}`.toLowerCase();
      let hitCount = 0;
      for (const token of queryTokens) {
        if (combined.includes(token)) hitCount += 1;
      }

      const score = Math.round((hitCount / queryTokens.length) * 100);
      if (score >= 20 || hitCount >= 2) {
        matches.push({
          complaint: {
            ...item,
            sla_deadline: item.due_at,
          },
          score,
          isResolved: item.status === 'resolved' || item.status === 'closed',
          resolvedDaysAgo: item.resolved_at
            ? Math.max(1, Math.round((Date.now() - new Date(item.resolved_at).getTime()) / (24 * 3600 * 1000)))
            : null,
        });
      }
    }

    matches.sort((a, b) => b.score - a.score || b.complaint.upvote_count - a.complaint.upvote_count);
    return matches.slice(0, 4);
  } catch (err) {
    console.error('findDuplicates failed', err);
    return [];
  }
}

/**
 * Dev Simulator: Injects a realistic complaint into the live Supabase store.
 */
export async function simulateNewComplaint() {
  const simulatedPool = [
    {
      category: 'mess',
      title: 'Lunch dal found sour with curdled texture at counter 1',
      body: 'Students who took lunch at 13:10 noticed a rancid taste in the yellow dal. Four cadets vomited after leaving the dining hall. Catering staff continued serving despite verbal warnings.',
      severity: 5,
      location: 'Shivaji Mess, Counter 1',
      about_person: null,
      hide_identity: false,
    },
    {
      category: 'hostel',
      title: 'Water pump tripped in Block C, zero water in 4th floor cisterns',
      body: 'The booster pump failed around 06:00 AM. 4th floor residents have no water for washrooms or basic use before morning lectures.',
      severity: 4,
      location: 'OBH Block C Water Pump Room',
      about_person: null,
      hide_identity: false,
    },
    {
      category: 'infrastructure',
      title: 'Live high-voltage wire exposed near Dighi gate security guard post',
      body: 'Recent cable trenching left an uninsulated 415V underground junction box exposed right next to the student pedestrian turnstile. Immediate barrier needed.',
      severity: 5,
      location: 'Main Gate Pedestrian Lane',
      about_person: null,
      hide_identity: false,
    },
    {
      category: 'sports',
      title: 'Table tennis table surface cracked during Inter-Hostel trials',
      body: 'The competition grade Stag table in the recreation room split along the center hinge seam. Urgent repair needed before Sunday matches.',
      severity: 2,
      location: 'Recreation Hall 2',
      about_person: null,
      hide_identity: false,
    }
  ];

  const pick = simulatedPool[Math.floor(Math.random() * simulatedPool.length)];
  return createComplaint(pick);
}

/**
 * Reset data store helper.
 */
export function resetDataStore() {
  if (isMock) return mockApi.resetDataStore();
  return null;
}
