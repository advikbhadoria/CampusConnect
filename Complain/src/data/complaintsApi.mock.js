/**
 * AIT Complaint Register - Unified Data Layer API
 * 
 * ALL components must strictly read and write data through this file.
 * Ready for drop-in Supabase / REST backend replacement with identical signatures.
 */

import { INITIAL_COMPLAINTS } from './mock.js';
import { canRoleAccessComplaint, applyRoleRedaction, determineRouting } from './router.js';
import { AUTHORITIES } from './authorities.js';

// In-memory store initialized from localStorage or mock data
const STORAGE_KEY = 'ait_complaints_v4';

function loadComplaints() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Could not read from localStorage, using initial mock data', err);
  }
  return [...INITIAL_COMPLAINTS];
}

let complaintsStore = loadComplaints();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaintsStore));
  } catch (err) {
    console.warn('Could not persist to localStorage', err);
  }
}

// Simple delay simulation: snappy 20ms for instant 60fps interaction
const delay = (ms = 20) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retrieve complaints filtered and redacted for the specified user role.
 * @param {string} role - 'student' | 'warden' | 'chief_warden' | 'jd' | 'director' | 'council'
 */
export async function getComplaints(role = 'student') {
  await delay(15);
  
  const accessible = complaintsStore
    .filter(c => {
      if (role === 'jd' || role === 'director') return true;
      return canRoleAccessComplaint(c, role);
    })
    .map(c => applyRoleRedaction(c, role));

  return accessible;
}

/**
 * Retrieve a single complaint by ID, applying role redaction rules.
 */
export async function getComplaint(id, role = 'student') {
  await delay(15);
  const found = complaintsStore.find(c => c.id === id);
  if (!found) return null;

  if (!canRoleAccessComplaint(found, role)) {
    return null; // Denied by router
  }

  return applyRoleRedaction(found, role);
}

/**
 * Create a new complaint docket.
 */
export async function createComplaint(data) {
  await delay(25);

  const routing = determineRouting(data.category, data.about_person);
  if (!routing.assigned_roles.includes('jd')) {
    routing.assigned_roles.push('jd');
  }

  const nextSeq = complaintsStore.length + 310;
  const newId = `AIT-2026-0${nextSeq}`;

  const newDocket = {
    id: newId,
    category: data.category || 'hostel',
    title: data.title || 'Untitled Issue',
    body: data.body || '',
    severity: Number(data.severity) || 3,
    visibility: 'private', // Confidential to JD & reporting student in demo
    hide_identity: !!data.hide_identity,
    about_person: data.about_person || null,
    assigned_roles: routing.assigned_roles,
    status: 'submitted',
    location: data.location || 'AIT Campus, Dighi Hills',
    reporter_id: data.reporter_id || 'STU-2026-CURRENT',
    reporter_name: data.hide_identity ? 'Confidential Student' : (data.reporter_name || 'Cadet Rohit Deshmukh'),
    reporter_roll: data.reporter_roll || '231094',
    reporter_branch: data.reporter_branch || 'SE Computer',

    reporter_hostel: data.reporter_hostel || 'NBH Block 2',
    upvote_count: 0,
    duplicate_of: data.duplicate_of || null,
    report_count: 0,
    report_status: 'none',
    reported_by: [],
    reports: [],
    created_at: new Date().toISOString(),
    resolved_at: null,
    sla_hours: data.severity >= 4 ? 24 : 48,
    sla_deadline: new Date(Date.now() + (data.severity >= 4 ? 24 : 48) * 3600 * 1000).toISOString(),
    updates: [
      {
        id: `UPD-${nextSeq}-1`,
        author_role: 'system',
        author_name: 'AIT Central Docket Registry',
        note: `Docket logged into institutional queue. Route assigned: ${routing.assigned_roles.join(' -> ')}.`,
        created_at: new Date().toISOString(),
        is_audit: true,
      }
    ],
    upvoted_by: [],
  };

  complaintsStore.unshift(newDocket);
  persist();

  // Return docket along with visual routing metadata for the signature moment animation
  return {
    complaint: newDocket,
    routingChain: routing.nodes,
    isRerouted: routing.is_rerouted,
    rerouteReason: routing.reroute_reason,
  };
}

/**
 * Upvote or remove upvote from a complaint.
 */
export async function upvote(id, studentId = 'STU-2026-CURRENT') {
  await delay(40);
  const target = complaintsStore.find(c => c.id === id);
  if (!target) return null;

  target.upvoted_by = target.upvoted_by || [];
  const idx = target.upvoted_by.indexOf(studentId);
  let hasUpvoted = false;

  if (idx >= 0) {
    target.upvoted_by.splice(idx, 1);
    target.upvote_count = Math.max(0, target.upvote_count - 1);
    hasUpvoted = false;
  } else {
    target.upvoted_by.push(studentId);
    target.upvote_count = (target.upvote_count || 0) + 1;
    hasUpvoted = true;
  }

  persist();
  return { id, upvote_count: target.upvote_count, hasUpvoted };
}

/**
 * Add an official status update or inquiry dispatch to a complaint.
 */
export async function addUpdate(id, update) {
  await delay(80);
  const target = complaintsStore.find(c => c.id === id);
  if (!target) return null;

  const newUpdate = {
    id: `UPD-${Date.now()}`,
    author_role: update.author_role || 'authority',
    author_name: update.author_name || 'Designated Authority',
    note: update.note,
    created_at: new Date().toISOString(),
    is_audit: !!update.is_audit,
    before_image: update.before_image || null,
    after_image: update.after_image || null,
  };

  target.updates = target.updates || [];
  target.updates.push(newUpdate);
  persist();

  return target;
}

/**
 * Update complaint status (e.g. 'acknowledged' -> 'in_progress' -> 'resolved' -> 'closed').
 */
export async function setStatus(id, status, role = 'authority', reason = '') {
  await delay(80);
  const target = complaintsStore.find(c => c.id === id);
  if (!target) return null;

  target.status = status;
  if (status === 'resolved' || status === 'closed') {
    target.resolved_at = new Date().toISOString();
  }

  target.updates = target.updates || [];
  target.updates.push({
    id: `UPD-${Date.now()}`,
    author_role: role,
    author_name: AUTHORITIES[role]?.name || role.toUpperCase(),
    note: reason || `Status transitioned to ${status.toUpperCase().replace('_', ' ')}.`,
    created_at: new Date().toISOString(),
    is_audit: true,
  });

  persist();
  return target;
}

/**
 * Audit log: Reveal confidential whistleblower identity.
 * Restricted to JD and Director only.
 */
export async function revealIdentity(id, reviewerRole) {
  await delay(60);
  const target = complaintsStore.find(c => c.id === id);
  if (!target) return null;

  target.is_revealed = true;
  target.updates = target.updates || [];
  
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const reviewerTitle = AUTHORITIES[reviewerRole]?.title || reviewerRole.toUpperCase();

  target.updates.push({
    id: `AUDIT-${Date.now()}`,
    author_role: reviewerRole,
    author_name: 'Security Audit Service',
    note: `Whistleblower identity viewed by ${reviewerTitle} at ${timestamp}. Action recorded in campus compliance register.`,
    created_at: new Date().toISOString(),
    is_audit: true,
  });

  persist();
  return target;
}

/**
 * Report a complaint for moderation.
 * Rules:
 * - One report per student per complaint.
 * - At 3 reports, card collapses to 'Under review' (title hidden) and enters moderation queue.
 */
export async function reportComplaint(id, studentId = 'STU-2026-CURRENT', reason = 'Not relevant to the college', note = '') {
  await delay(60);
  const target = complaintsStore.find(c => c.id === id);
  if (!target) return { success: false, error: 'Complaint not found' };

  if (target.visibility === 'private' && target.reporter_id !== studentId) {
    return { success: false, error: 'Private complaints cannot be reported by others' };
  }

  target.reported_by = target.reported_by || [];
  target.reports = target.reports || [];

  if (target.reported_by.includes(studentId)) {
    return { success: false, alreadyReported: true, complaint: target };
  }

  if (target.reports_locked) {
    return { success: false, locked: true, complaint: target };
  }

  target.reported_by.push(studentId);
  target.report_count = (target.report_count || 0) + 1;
  target.reports.push({
    studentId,
    reason,
    note: note || '',
    created_at: new Date().toISOString(),
  });

  // Threshold check: at 3 reports, collapse to under review
  if (target.report_count >= 3 && target.report_status !== 'removed') {
    target.report_status = 'under_review';
    target.updates = target.updates || [];
    target.updates.push({
      id: `MOD-${Date.now()}`,
      author_role: 'system',
      author_name: 'Campus Moderation Sentinel',
      note: 'Notice collapsed to "Under review" after receiving 3 community flags. Awaiting JD / Director determination.',
      created_at: new Date().toISOString(),
      is_audit: true,
    });
  }

  persist();
  return { success: true, complaint: target, report_count: target.report_count };
}

/**
 * Fetch the Moderation Queue for authorized roles (JD, Director, Council).
 */
export async function getModerationQueue(role = 'jd') {
  await delay(60);
  // Accessible to JD, Director, and Student Council
  const flagged = complaintsStore.filter(c => 
    c.report_status === 'under_review' || 
    c.report_status === 'removed' || 
    (c.report_count && c.report_count > 0)
  );

  return flagged.map(c => applyRoleRedaction(c, role));
}

/**
 * Resolve a reported complaint: 'keep' (restores and locks) or 'remove' (permanently hides).
 */
export async function resolveReport(id, decision, resolverRole = 'jd', reason = '') {
  await delay(80);
  const target = complaintsStore.find(c => c.id === id);
  if (!target) return null;

  const resolverTitle = AUTHORITIES[resolverRole]?.title || resolverRole.toUpperCase();
  target.updates = target.updates || [];

  if (decision === 'keep') {
    target.report_status = 'none';
    target.reports_locked = true;
    target.updates.push({
      id: `MOD-${Date.now()}`,
      author_role: resolverRole,
      author_name: resolverTitle,
      note: `Report reviewed and cleared by ${resolverTitle}. Complaint restored to public board; further reports locked.`,
      created_at: new Date().toISOString(),
      is_audit: true,
    });
  } else if (decision === 'remove') {
    target.report_status = 'removed';
    target.updates.push({
      id: `MOD-${Date.now()}`,
      author_role: resolverRole,
      author_name: resolverTitle,
      note: `Complaint permanently removed from public view by ${resolverTitle}. ${reason ? `Reason: ${reason}` : ''}`,
      created_at: new Date().toISOString(),
      is_audit: true,
    });
  }

  persist();
  return target;
}

/**
 * Keyword-based classifier and AI triage assistant.
 * Analyzes student text for category, severity, emergency triggers, and personnel.
 */
export async function classifyComplaint(text) {
  await delay(100);
  const lower = (text || '').toLowerCase();

  let category = 'hostel';
  let severity = 3;
  let is_emergency = false;
  let about_person = null;

  // Personnel detection
  if (lower.includes('warden') || lower.includes('caretaker')) {
    about_person = 'warden';
  } else if (lower.includes('teacher') || lower.includes('faculty') || lower.includes('professor') || lower.includes('viva') || lower.includes('marks')) {
    about_person = 'teacher';
  } else if (lower.includes('guard') || lower.includes('staff') || lower.includes('nurse') || lower.includes('peon')) {
    about_person = 'staff';
  }

  // Emergency triggers
  if (
    lower.includes('ragging') ||
    lower.includes('harass') ||
    lower.includes('threat') ||
    lower.includes('fight') ||
    lower.includes('assault') ||
    lower.includes('emergency') ||
    lower.includes('dog') ||
    lower.includes('shock') ||
    lower.includes('hospital')
  ) {
    category = 'emergency';
    severity = 5;
    is_emergency = true;
  }
  // Mess / Food
  else if (
    lower.includes('food') ||
    lower.includes('mess') ||
    lower.includes('dinner') ||
    lower.includes('lunch') ||
    lower.includes('breakfast') ||
    lower.includes('roti') ||
    lower.includes('curd') ||
    lower.includes('canteen') ||
    lower.includes('taste') ||
    lower.includes('insect')
  ) {
    category = 'mess';
    severity = lower.includes('insect') || lower.includes('expired') || lower.includes('sick') ? 5 : 3;
  }
  // Library
  else if (lower.includes('library') || lower.includes('book') || lower.includes('reading room') || lower.includes('journal')) {
    category = 'library';
    severity = 2;
  }
  // Academics & Labs
  else if (
    lower.includes('lab') ||
    lower.includes('pc') ||
    lower.includes('computer') ||
    lower.includes('exam') ||
    lower.includes('lecture') ||
    lower.includes('syllabus') ||
    lower.includes('dso') ||
    lower.includes('attendance')
  ) {
    category = about_person === 'teacher' ? 'faculty' : 'academics';
    severity = lower.includes('exam') || lower.includes('marks') ? 4 : 3;
  }
  // Sports & Grounds
  else if (
    lower.includes('sports') ||
    lower.includes('ground') ||
    lower.includes('cricket') ||
    lower.includes('football') ||
    lower.includes('court') ||
    lower.includes('gym') ||
    lower.includes('basketball')
  ) {
    category = 'sports';
    severity = 3;
  }
  // Hostel & Water / Room
  else if (
    lower.includes('water') ||
    lower.includes('geyser') ||
    lower.includes('room') ||
    lower.includes('washroom') ||
    lower.includes('toilet') ||
    lower.includes('hostel') ||
    lower.includes('fan') ||
    lower.includes('bed') ||
    lower.includes('block b') ||
    lower.includes('block a') ||
    lower.includes('nbh') ||
    lower.includes('obh')
  ) {
    category = 'hostel';
    severity = lower.includes('geyser') || lower.includes('water') || lower.includes('leak') ? 4 : 3;
  } else {
    category = 'infrastructure';
    severity = 3;
  }

  // Summary generation
  const words = text.trim().split(/\s+/).slice(0, 14);
  const summary = words.length > 0 ? words.join(' ') + '...' : 'Student reported issue';

  return {
    category,
    severity,
    is_emergency,
    about_person,
    summary,
  };
}

/**
 * Duplicate Detection Engine.
 * Compares query words against unresolved and resolved complaints in the same category.
 */
export async function findDuplicates(text, category) {
  await delay(80);
  if (!text || text.trim().length < 6) return [];

  const stopWords = new Set(['the', 'and', 'for', 'are', 'with', 'from', 'this', 'that', 'have', 'been', 'about', 'some', 'were', 'when']);
  const queryTokens = text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !stopWords.has(t));

  if (queryTokens.length === 0) return [];

  const candidates = complaintsStore.filter(c => {
    // Filter by same category or broad overlap
    return !category || c.category === category;
  });

  const matches = [];

  for (const item of candidates) {
    const combined = `${item.title} ${item.body} ${item.location}`.toLowerCase();
    let hitCount = 0;

    for (const token of queryTokens) {
      if (combined.includes(token)) {
        hitCount += 1;
      }
    }

    const score = Math.round((hitCount / queryTokens.length) * 100);

    // Threshold score of 20% word overlap
    if (score >= 20 || hitCount >= 2) {
      matches.push({
        complaint: item,
        score,
        isResolved: item.status === 'resolved' || item.status === 'closed',
        resolvedDaysAgo: item.resolved_at
          ? Math.max(1, Math.round((Date.now() - new Date(item.resolved_at).getTime()) / (24 * 3600 * 1000)))
          : null,
      });
    }
  }

  // Sort by score descending and then by upvotes
  matches.sort((a, b) => b.score - a.score || b.complaint.upvote_count - a.complaint.upvote_count);
  return matches.slice(0, 4);
}

/**
 * Aggregates live statistical data for the Accountability Board and Authority Dashboards.
 */
export async function getAuthorityStats() {
  await delay(60);

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

  const ranked = departments.map(dept => {
    const list = complaintsStore.filter(c => c.category === dept.id);
    const total = list.length;
    const resolved = list.filter(c => c.status === 'resolved' || c.status === 'closed').length;
    const recurring = list.filter(c => !!c.duplicate_of).length;
    
    // Calculate overdue
    const overdue = list.filter(c => {
      if (c.status === 'resolved' || c.status === 'closed') return false;
      return new Date(c.sla_deadline).getTime() < now;
    }).length;

    // Escalations: severity >= 4 or overdue
    const escalations = list.filter(c => c.severity >= 4 || (c.assigned_roles && c.assigned_roles.includes('director'))).length;

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

  // Sort by resolution rate descending
  ranked.sort((a, b) => b.resolutionRate - a.resolutionRate);

  const totalComplaints = complaintsStore.length;
  const totalResolved = complaintsStore.filter(c => c.status === 'resolved' || c.status === 'closed').length;
  const totalOverdue = complaintsStore.filter(c => {
    if (c.status === 'resolved' || c.status === 'closed') return false;
    return new Date(c.sla_deadline).getTime() < now;
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
}

/**
 * Dev Simulator: Injects a brand new realistic complaint into the live store.
 * Causes live slide-in animations on the Authority Dashboard!
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
 * Resets the in-memory and local store back to fresh initial seed data.
 */
export function resetDataStore() {
  complaintsStore = [...INITIAL_COMPLAINTS];
  persist();
  return complaintsStore;
}
