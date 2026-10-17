/**
 * AIT Complaint Router & Privacy Policy Enforcement Engine
 * 
 * Defines routing hierarchies, automated escalation pathways, role-based visibility,
 * and whistleblower identity redaction rules.
 * 
 * Rules:
 * 1. Category-based routing with multi-level chains (L1 First Responder -> L2 Oversight -> L3 Directorate).
 * 2. Conflict of Interest: If complaint is about a person (e.g. about_person === 'warden'),
 *    that role is STRICTLY EXCLUDED from receiving or seeing the docket.
 * 3. Whistleblower Protection: Only 'jd' and 'director' can reveal the reporter's true identity,
 *    and each view triggers an immutable audit log entry.
 * 4. Faculty Conduct Protection: Faculty conduct complaints are always private and routed
 *    directly to Joint Director & Director, bypassing department teachers.
 * 5. Student Council Oversight: Council members see a high-level redacted view (category, title, status).
 *    Body, personal attachments, and identities are withheld to safeguard privacy.
 */

// Base routing matrix per category
export const CATEGORY_ROUTING_CHAINS = {
  hostel: [
    { level: 'L1', role: 'warden', label: 'Hostel Warden' },
    { level: 'L2', role: 'chief_warden', label: 'Chief Warden' },
    { level: 'L3', role: 'jd', label: 'Joint Director' },
  ],
  mess: [
    { level: 'L1', role: 'mess_incharge', label: 'Mess In-Charge' },
    { level: 'L2', role: 'chief_warden', label: 'Chief Warden' },
    { level: 'L3', role: 'jd', label: 'Joint Director' },
  ],
  academics: [
    { level: 'L1', role: 'hod_comp', label: 'Head of Department' },
    { level: 'L2', role: 'principal', label: 'Principal' },
    { level: 'L3', role: 'director', label: 'Director' },
  ],
  faculty: [
    { level: 'L2', role: 'jd', label: 'Joint Director (Inquiry)' },
    { level: 'L3', role: 'director', label: 'Director (Command)' },
  ],
  sports: [
    { level: 'L1', role: 'sports_officer', label: 'Sports Officer' },
    { level: 'L2', role: 'chief_warden', label: 'Chief Warden' },
    { level: 'L3', role: 'jd', label: 'Joint Director' },
  ],
  library: [
    { level: 'L1', role: 'librarian', label: 'Chief Librarian' },
    { level: 'L2', role: 'principal', label: 'Principal' },
    { level: 'L3', role: 'director', label: 'Director' },
  ],
  infrastructure: [
    { level: 'L1', role: 'warden', label: 'Estate / Warden' },
    { level: 'L2', role: 'chief_warden', label: 'Chief Warden' },
    { level: 'L3', role: 'jd', label: 'Joint Director' },
  ],
  emergency: [
    { level: 'L2', role: 'chief_warden', label: 'Chief Warden (Discipline)' },
    { level: 'L2', role: 'jd', label: 'Joint Director (Immediate Intervention)' },
    { level: 'L3', role: 'director', label: 'Director (Executive Action)' },
  ],
};

/**
 * Calculates assigned roles and visual routing nodes for a complaint,
 * applying conflict of interest bypass rules.
 */
export function determineRouting(category, about_person) {
  const baseChain = CATEGORY_ROUTING_CHAINS[category] || CATEGORY_ROUTING_CHAINS.infrastructure;

  // Conflict of Interest: Warden complaint
  if (about_person === 'warden') {
    return {
      assigned_roles: ['chief_warden', 'jd', 'director'],
      nodes: [
        { role: 'warden', label: 'Hostel Warden', status: 'blocked', reason: 'Subject of complaint: Not notified' },
        { role: 'chief_warden', label: 'Chief Warden', status: 'active', reason: 'L2 Campus Oversight' },
        { role: 'jd', label: 'Joint Director', status: 'active', reason: 'L2 Independent Ethics' },
        { role: 'director', label: 'Director', status: 'standby', reason: 'L3 Directorate Apex' },
      ],
      is_rerouted: true,
      reroute_reason: 'Warden bypassed to ensure impartial resolution',
    };
  }

  // Conflict of Interest: Teacher / Faculty Conduct
  if (about_person === 'teacher' || category === 'faculty') {
    return {
      assigned_roles: ['jd', 'director'],
      nodes: [
        { role: 'teacher', label: 'Faculty / HoD', status: 'blocked', reason: 'Faculty conduct policy: HoD bypassed' },
        { role: 'jd', label: 'Joint Director', status: 'active', reason: 'Internal Complaints / Inquiry' },
        { role: 'director', label: 'Director', status: 'standby', reason: 'Disciplinary Authority' },
      ],
      is_rerouted: true,
      reroute_reason: 'Department faculty excluded from hearing conduct allegations',
    };
  }

  // Standard category flow
  const assigned_roles = baseChain.map(n => n.role);
  const nodes = baseChain.map((node, index) => ({
    role: node.role,
    label: node.label,
    status: index === 0 ? 'active' : 'standby',
    reason: `${node.level} Response Pathway`,
  }));

  return {
    assigned_roles,
    nodes,
    is_rerouted: false,
    reroute_reason: null,
  };
}

/**
 * Determines whether a user role is permitted to see a given complaint.
 */
export function canRoleAccessComplaint(complaint, role) {
  if (role === 'student') {
    // Students can see any public complaint, or their own private complaint
    return complaint.visibility === 'public' || complaint.reporter_id === 'STU-2026-CURRENT';
  }

  if (role === 'council') {
    // Council gets access to all non-faculty complaints for systemic oversight
    return complaint.category !== 'faculty';
  }

  // Conflict of interest check for authority roles
  if (role === 'warden' && complaint.about_person === 'warden') {
    return false; // Strictly blocked!
  }

  if (complaint.category === 'faculty' && role === 'warden') {
    return false;
  }

  // Director and JD have campus-wide jurisdiction
  if (role === 'director' || role === 'jd') {
    return true;
  }

  // Check if this specific role is assigned to the complaint
  if (complaint.assigned_roles && complaint.assigned_roles.includes(role)) {
    return true;
  }

  return false;
}

/**
 * Redacts complaint data based on the viewer's security clearance.
 */
export function applyRoleRedaction(complaint, role) {
  const clone = { ...complaint };

  // Council view is strictly redacted for privacy
  if (role === 'council') {
    return {
      id: clone.id,
      category: clone.category,
      title: clone.title,
      status: clone.status,
      severity: clone.severity,
      created_at: clone.created_at,
      location: clone.location,
      upvote_count: clone.upvote_count,
      duplicate_of: clone.duplicate_of,
      // Redacted fields:
      body: clone.visibility === 'private' ? '[PRIVATE COMPLAINT: Content withheld under student privacy guidelines]' : clone.body,
      reporter_name: '[REDACTED: Student Council Audit]',
      reporter_id: '[CONFIDENTIAL]',
      hide_identity: true,
      images: [],
      updates: (clone.updates || []).map(u => ({
        id: u.id,
        created_at: u.created_at,
        author_role: u.author_role,
        note: u.is_audit ? '[Internal Audit Log Entry]' : u.note,
      })),
      is_redacted: true,
    };
  }

  // If identity is hidden by student:
  if (clone.hide_identity) {
    if (role !== 'jd' && role !== 'director') {
      clone.reporter_name = 'Confidential Student (AIT)';
      clone.reporter_roll = '••••••••';
      clone.reporter_branch = 'Confidential';
      clone.reporter_hostel = 'Confidential';
      clone.can_reveal = false;
    } else {
      clone.can_reveal = true; // JD and Director have unmask privilege
      clone.is_revealed = clone.is_revealed || false;
    }
  }

  return clone;
}

/**
 * Checks if the current role has authority to reveal protected identity.
 */
export function canRevealIdentity(role) {
  return role === 'jd' || role === 'director';
}
