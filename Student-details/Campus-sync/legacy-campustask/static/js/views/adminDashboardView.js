/**
 * CampusTask Administration Dashboard
 */
const AdminDashboardView = {
  activeTab: 'users', // 'users', 'disputes', 'categories', 'analytics'
  stats: null,
  users: [],
  disputes: [],

  async render() {
    return `
      <div class="admin-page" style="padding: 24px 0;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <div class="badge badge-urgent" style="margin-bottom: 6px;">🛡️ Administrator Console</div>
            <h1 style="font-size: 1.85rem;">Campus Governance</h1>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">
              Verified student registry, category oversight, and escrow dispute management.
            </p>
          </div>
          <div class="badge badge-verified" style="font-size: 0.85rem; padding: 8px 14px;">
            Dean of Academics Office
          </div>
        </div>

        <!-- Metric Stat Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; margin-bottom: 32px;" id="admin-stats-grid">
          <div class="card" style="padding: 20px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Total Students</div>
            <div id="adm-stat-students" style="font-size: 2rem; font-weight: 800; color: var(--primary); margin: 6px 0;">1,248</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Verified on campus</div>
          </div>
          <div class="card" style="padding: 20px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Active Tasks</div>
            <div id="adm-stat-active" style="font-size: 2rem; font-weight: 800; color: var(--info); margin: 6px 0;">87</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">In progress across branches</div>
          </div>
          <div class="card" style="padding: 20px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Completed Tasks</div>
            <div id="adm-stat-completed" style="font-size: 2rem; font-weight: 800; color: var(--success); margin: 6px 0;">2,341</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Peer assistance deliverables</div>
          </div>
          <div class="card" style="padding: 20px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Platform Volume</div>
            <div id="adm-stat-volume" style="font-size: 2rem; font-weight: 800; color: #0284c7; margin: 6px 0;">₹5,84,200</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Escrow settlements</div>
          </div>
          <div class="card" style="padding: 20px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Reports & Disputes</div>
            <div id="adm-stat-reports" style="font-size: 2rem; font-weight: 800; color: var(--danger); margin: 6px 0;">12</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Compliance flags</div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; gap: 10px; margin-bottom: 24px; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;" id="admin-tabs">
          <button class="btn btn-sm btn-primary" onclick="AdminDashboardView.switchTab('users')" id="tab-btn-users">
            👥 Verified Student Registry
          </button>
          <button class="btn btn-sm btn-secondary" onclick="AdminDashboardView.switchTab('disputes')" id="tab-btn-disputes">
            ⚖️ Disputes & Reports
          </button>
          <button class="btn btn-sm btn-secondary" onclick="AdminDashboardView.switchTab('categories')" id="tab-btn-categories">
            🏷️ Task Categories
          </button>
        </div>

        <!-- Tab Content Container -->
        <div id="admin-tab-content">
          <div style="text-align: center; padding: 40px; color: var(--text-muted);">Loading admin records...</div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    await this.loadStats();
    await this.switchTab(this.activeTab);
  },

  async loadStats() {
    try {
      this.stats = await API.getAdminStats();
      document.getElementById('adm-stat-students').textContent = this.stats.total_students;
      document.getElementById('adm-stat-active').textContent = this.stats.active_tasks;
      document.getElementById('adm-stat-completed').textContent = this.stats.completed_tasks;
      document.getElementById('adm-stat-volume').textContent = `₹${Math.round(this.stats.total_volume)}`;
      document.getElementById('adm-stat-reports').textContent = this.stats.pending_reports;
    } catch (err) {
      console.error(err);
    }
  },

  async switchTab(tab) {
    this.activeTab = tab;
    ['users', 'disputes', 'categories'].forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      if (btn) btn.className = t === tab ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
    });

    const content = document.getElementById('admin-tab-content');
    if (!content) return;

    if (tab === 'users') {
      await this.renderUsersTab(content);
    } else if (tab === 'disputes') {
      await this.renderDisputesTab(content);
    } else if (tab === 'categories') {
      await this.renderCategoriesTab(content);
    }
  },

  async renderUsersTab(container) {
    try {
      this.users = await API.getAdminUsers();
      container.innerHTML = `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
            <div>
              <h3 style="font-size: 1.25rem;">Institutional Student Identity Registry</h3>
              <p style="font-size: 0.82rem; color: var(--text-secondary);">
                Real names and institutional IDs are revealed ONLY to platform administrators.
              </p>
            </div>
            <span class="badge badge-match">${this.users.length} Enrolled Students</span>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">
                  <th style="padding: 10px 12px;">Anonymous Handle</th>
                  <th style="padding: 10px 12px;">Real Student Name</th>
                  <th style="padding: 10px 12px;">Student ID</th>
                  <th style="padding: 10px 12px;">Role & Branch</th>
                  <th style="padding: 10px 12px;">Status</th>
                  <th style="padding: 10px 12px;">Rating</th>
                  <th style="padding: 10px 12px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${this.users.map(u => `
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px; font-weight: 700; color: var(--primary);">${u.anonymous_id}</td>
                    <td style="padding: 12px; font-weight: 600; color: var(--text-primary);">${u.name}</td>
                    <td style="padding: 12px; color: var(--text-secondary); font-family: monospace;">${u.student_id}</td>
                    <td style="padding: 12px;">
                      <span class="badge ${u.role === 'senior' ? 'badge-assigned' : 'badge-match'}">${u.role.toUpperCase()}</span>
                      <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${u.branch} (Yr ${u.year})</div>
                    </td>
                    <td style="padding: 12px;">
                      <span class="badge ${u.verification_status === 'verified' ? 'badge-verified' : u.verification_status === 'suspended' ? 'badge-urgent' : 'badge-warning'}">
                        ${u.verification_status.toUpperCase()}
                      </span>
                    </td>
                    <td style="padding: 12px; font-weight: 600; color: #d97706;">⭐ ${u.rating}</td>
                    <td style="padding: 12px;">
                      ${u.role !== 'admin' ? `
                        <div style="display: flex; gap: 6px;">
                          ${u.verification_status !== 'suspended' ? `
                            <button class="btn btn-sm btn-danger" onclick="AdminDashboardView.updateStatus(${u.id}, 'suspended')">Suspend</button>
                          ` : `
                            <button class="btn btn-sm btn-success" onclick="AdminDashboardView.updateStatus(${u.id}, 'verified')">Activate</button>
                          `}
                        </div>
                      ` : '<span style="color:var(--text-muted); font-size:0.8rem;">Super Admin</span>'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="card" style="color:var(--danger);">${err.message}</div>`;
    }
  },

  async renderDisputesTab(container) {
    try {
      this.disputes = await API.getDisputes();
      container.innerHTML = `
        <div class="card">
          <div style="margin-bottom: 18px;">
            <h3 style="font-size: 1.25rem;">Academic Integrity & Escrow Dispute Console</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              Review student claims, examine uploaded deliverables, and release or refund escrow payments.
            </p>
          </div>

          ${this.disputes.length === 0 ? `
            <div style="text-align: center; padding: 30px; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-md);">
              <span>✅ No open disputes or academic integrity violations currently flagged.</span>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 14px;">
              ${this.disputes.map(d => `
                <div style="background: var(--bg-surface); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 18px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <div>
                      <span class="badge ${d.status === 'resolved' ? 'badge-verified' : 'badge-urgent'}">${d.status.toUpperCase()}</span>
                      <strong style="margin-left: 8px; font-size: 1.05rem;">Dispute #${d.id}: ${d.reason}</strong>
                      <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 4px;">
                        Task: <strong>${d.task_title || 'N/A'}</strong> (₹${d.task_budget || 0}) &bull; 
                        Reporter: <strong>${d.reporter_anon_id}</strong> (${d.reporter_real_name})
                      </div>
                    </div>
                  </div>
                  <div style="font-size: 0.9rem; color: var(--text-primary); background: var(--bg-card); padding: 12px; border-radius: var(--radius-sm); margin-bottom: 14px;">
                    "${d.description}"
                  </div>

                  ${d.status === 'open' ? `
                    <div style="display: flex; gap: 8px; justify-content: flex-end;">
                      <button class="btn btn-sm btn-secondary" onclick="AdminDashboardView.resolveDispute(${d.id}, 'refund_senior')">
                        <span>↩️ Refund Senior</span>
                      </button>
                      <button class="btn btn-sm btn-success" onclick="AdminDashboardView.resolveDispute(${d.id}, 'release_junior')">
                        <span>💰 Release to Junior</span>
                      </button>
                      <button class="btn btn-sm btn-danger" onclick="AdminDashboardView.resolveDispute(${d.id}, 'dismiss')">
                        <span>Dismiss</span>
                      </button>
                    </div>
                  ` : `
                    <div style="font-size: 0.8rem; color: var(--success); font-weight: 600;">
                      ✓ Resolved by Administration
                    </div>
                  `}
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="card" style="color:var(--danger);">${err.message}</div>`;
    }
  },

  async renderCategoriesTab(container) {
    container.innerHTML = `
      <div class="card">
        <h3 style="font-size: 1.25rem; margin-bottom: 16px;">Task Categories & Permitted Task Types</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">
          Categories configured to enforce institutional academic guidelines across faculties.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
          ${(this.stats?.category_distribution || []).map(c => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${c.category}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Permitted Academic Work</div>
              </div>
              <span class="badge badge-match">${c.count} tasks</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  async updateStatus(userId, status) {
    try {
      await API.updateAdminUserStatus(userId, status);
      API.showToast(`User status updated to ${status}.`, 'success');
      await this.switchTab('users');
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  async resolveDispute(disputeId, action) {
    const notes = prompt("Enter administrative resolution notes for the record:");
    try {
      await API.resolveDispute(disputeId, action, notes || '');
      API.showToast(`Dispute resolved with action: ${action}`, 'success');
      await this.switchTab('disputes');
      await this.loadStats();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  }
};
