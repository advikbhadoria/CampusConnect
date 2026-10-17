/**
 * Senior Student Dashboard
 */
const SeniorDashboardView = {
  async render() {
    const user = API.getCurrentUser() || { anonymous_id: 'Senior #A482', wallet_balance: 3400 };

    return `
      <div class="dashboard-page" style="padding: 24px 0;">
        <!-- Header -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 28px;">
          <div>
            <div class="badge badge-verified" style="margin-bottom: 6px;">Senior Portal</div>
            <h1 style="font-size: 1.85rem;">Welcome, <span class="gradient-text">${user.anonymous_id}</span></h1>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">Manage active tasks, applications, and escrow releases.</p>
          </div>
          <a href="#post-task" class="btn btn-primary">
            <span>+ Post a Task</span>
          </a>
        </div>

        <!-- Metric Stat Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 18px; margin-bottom: 32px;" id="senior-stats-grid">
          <div class="card" style="padding: 20px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Active Tasks</div>
            <div id="stat-active-tasks" style="font-size: 2rem; font-weight: 800; color: var(--primary); margin: 4px 0;">3</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">In progress</div>
          </div>
          <div class="card" style="padding: 20px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Applications</div>
            <div id="stat-pending-apps" style="font-size: 2rem; font-weight: 800; color: var(--warning); margin: 4px 0;">7</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Awaiting review</div>
          </div>
          <div class="card" style="padding: 20px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Completed</div>
            <div id="stat-comp-tasks" style="font-size: 2rem; font-weight: 800; color: var(--success); margin: 4px 0;">14</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Approved deliverables</div>
          </div>
          <div class="card" style="padding: 20px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Escrow Volume</div>
            <div id="stat-total-spent" style="font-size: 2rem; font-weight: 800; color: var(--accent-coral); margin: 4px 0;">₹4,250</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Settled transactions</div>
          </div>
        </div>

        <!-- Main Dashboard Content Tabs / Sections -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
          <!-- Left Column: Active Tasks & Submissions -->
          <div>
            <div class="card" style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                <h3 style="font-size: 1.25rem;">My Posted Tasks</h3>
                <a href="#marketplace" style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">Browse Marketplace →</a>
              </div>
              <div id="senior-my-tasks-list">
                <div style="text-align: center; padding: 24px; color: var(--text-muted);">Loading tasks...</div>
              </div>
            </div>
          </div>

          <!-- Right Column: Wallet & Quick Actions -->
          <div>
            <div class="card" style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(192, 38, 211, 0.04)); border: 1px solid rgba(124, 58, 237, 0.25); margin-bottom: 24px;">
              <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Available Balance</div>
              <div style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: 4px 0;">
                ₹${Math.round(user.wallet_balance || 0)}
              </div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 16px;">
                Funds are reserved in escrow on posting and released upon your deliverable approval.
              </p>
              <div style="display: flex; gap: 8px;">
                <a href="#wallet" class="btn btn-sm btn-primary" style="flex: 1;">Ledger</a>
                <a href="#post-task" class="btn btn-sm btn-secondary" style="flex: 1;">+ Post</a>
              </div>
            </div>

            <!-- Quick Tips Capsule -->
            <div class="card" style="padding: 20px;">
              <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 8px; color: var(--text-primary);">
                💡 Quick Tip
              </div>
              <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
                Add specific page counts and sample rubrics to get faster, higher quality junior submissions.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const user = API.getCurrentUser();
    if (!user) return;

    try {
      // Fetch tasks posted by current senior
      const tasks = await API.getTasks({ poster_id: user.id });
      const wallet = await API.getWalletSummary();

      // Update stat cards
      const activeCount = tasks.filter(t => ['OPEN', 'APPLICATIONS', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW'].includes(t.status)).length;
      const completedCount = tasks.filter(t => t.status === 'COMPLETED').length;
      const totalApps = tasks.reduce((sum, t) => sum + (t.applications_count || 0), 0);

      document.getElementById('stat-active-tasks').textContent = activeCount;
      document.getElementById('stat-pending-apps').textContent = totalApps;
      document.getElementById('stat-comp-tasks').textContent = completedCount;
      document.getElementById('stat-total-spent').textContent = `₹${Math.round(wallet.total_spent || 4250)}`;

      const listEl = document.getElementById('senior-my-tasks-list');
      if (tasks.length === 0) {
        listEl.innerHTML = `
          <div style="text-align: center; padding: 30px; color: var(--text-muted);">
            <p>You haven't posted any tasks yet.</p>
            <a href="#post-task" class="btn btn-sm btn-primary" style="margin-top: 10px;">Post Your First Task</a>
          </div>
        `;
        return;
      }

      listEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${tasks.map(t => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
              <div>
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
                  <span class="badge ${TaskDetailView.getStatusBadgeClass(t.status)}">${t.status}</span>
                  <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${t.subject}</span>
                </div>
                <a href="#task/${t.id}" style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">${t.title}</a>
                <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 4px;">
                  Budget: <strong style="color: var(--success);">₹${Math.round(t.total_budget)}</strong> &bull; 
                  ${t.applications_count ? `<span>📬 ${t.applications_count} Application${t.applications_count === 1 ? '' : 's'}</span> &bull; ` : ''}
                  <span>⏳ ${t.time_left_str}</span>
                </div>
              </div>

              <div style="display: flex; gap: 8px;">
                ${t.assigned_junior_id ? `
                  <a href="#chat?task=${t.id}" class="btn btn-sm btn-secondary">💬 Chat</a>
                ` : ''}
                <a href="#task/${t.id}" class="btn btn-sm btn-primary">Manage Task</a>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } catch (err) {
      console.error(err);
    }
  }
};
