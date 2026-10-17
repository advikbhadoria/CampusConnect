/**
 * Junior Student Dashboard (Earning & Skill Hub)
 */
const JuniorDashboardView = {
  async render() {
    const user = API.getCurrentUser() || { anonymous_id: 'Junior #J194', rating: 4.9 };

    return `
      <div class="dashboard-page" style="padding: 24px 0;">
        <!-- Header -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 28px;">
          <div>
            <div class="badge badge-verified" style="margin-bottom: 6px;">Earner Hub</div>
            <h1 style="font-size: 1.85rem;">Welcome, <span class="gradient-text">${user.anonymous_id}</span></h1>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">Monetize free hours with permitted peer assistance.</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <a href="#marketplace" class="btn btn-primary">
              <span>Find Tasks</span>
            </a>
            <a href="#wallet" class="btn btn-secondary">
              <span>Wallet</span>
            </a>
          </div>
        </div>

        <!-- Metric Stat Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 16px; margin-bottom: 32px;" id="junior-stats-grid">
          <div class="card" style="padding: 18px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Available Tasks</div>
            <div id="stat-avail-tasks" style="font-size: 1.9rem; font-weight: 800; color: var(--info); margin: 4px 0;">27</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">Open on campus</div>
          </div>
          <div class="card" style="padding: 18px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">In Progress</div>
            <div id="stat-active-assigned" style="font-size: 1.9rem; font-weight: 800; color: var(--primary); margin: 4px 0;">2</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">Assigned to you</div>
          </div>
          <div class="card" style="padding: 18px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Completed</div>
            <div id="stat-comp-count" style="font-size: 1.9rem; font-weight: 800; color: var(--success); margin: 4px 0;">18</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">Delivered & approved</div>
          </div>
          <div class="card" style="padding: 18px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Pending</div>
            <div id="stat-pending-earn" style="font-size: 1.9rem; font-weight: 800; color: var(--warning); margin: 4px 0;">₹350</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">In escrow review</div>
          </div>
          <div class="card" style="padding: 18px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Total Earned</div>
            <div id="stat-total-earned" style="font-size: 1.9rem; font-weight: 800; color: var(--success); margin: 4px 0;">₹3,850</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">All-time payouts</div>
          </div>
          <div class="card" style="padding: 18px;">
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Rating</div>
            <div style="font-size: 1.9rem; font-weight: 800; color: #d97706; margin: 4px 0;">⭐ ${user.rating || 4.9}</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">Peer feedback</div>
          </div>
        </div>

        <!-- Two Column Layout: Recommended & Active Tasks vs Skills/Profile -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
          <!-- Left Column: Active Assigned & Smart Recommendations -->
          <div>
            <!-- Active Tasks In Progress -->
            <div class="card" style="margin-bottom: 24px;">
              <h3 style="font-size: 1.25rem; margin-bottom: 16px;">My Active Tasks In Progress</h3>
              <div id="junior-active-tasks-list">
                <div style="text-align: center; padding: 20px; color: var(--text-muted);">Loading active tasks...</div>
              </div>
            </div>

            <!-- Smart Recommended Tasks (Matched with Skills) -->
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <div>
                  <h3 style="font-size: 1.25rem;">⚡ Recommended for You</h3>
                  <p style="font-size: 0.85rem; color: var(--text-secondary);">Matched with your verified campus skill profile.</p>
                </div>
                <a href="#marketplace" style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">View All Tasks →</a>
              </div>
              <div id="junior-recommended-list">
                <div style="text-align: center; padding: 20px; color: var(--text-muted);">Loading recommended tasks...</div>
              </div>
            </div>
          </div>

          <!-- Right Column: Skills & Fast Earnings -->
          <div>
            <!-- Skills Capsule -->
            <div class="card" style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <h4 style="font-size: 1.05rem;">My Skills & Tags</h4>
                <a href="#profile" style="font-size: 0.8rem; color: var(--primary);">Edit Skills</a>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 14px;">
                Skills determine the % match for high-paying senior tasks.
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;" id="junior-skills-pills">
                ${(user.skills || ['Mathematics', 'Python', 'LaTeX', 'Excel', 'PPT Formatting']).map(s => `
                  <span class="badge badge-match" style="font-size: 0.75rem;">${s}</span>
                `).join('')}
              </div>
            </div>

            <!-- Simulated Earnings Summary -->
            <div class="card" style="background: linear-gradient(135deg, rgba(5, 150, 105, 0.08), rgba(124, 58, 237, 0.05)); border: 1px solid rgba(5, 150, 105, 0.25);">
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Available Balance</div>
              <div style="font-size: 2.2rem; font-weight: 800; color: var(--success); margin: 6px 0;" id="junior-wallet-bal">
                ₹${Math.round(user.wallet_balance || 1250)}
              </div>
              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
                Ready for simulated UPI withdrawal to student bank account.
              </div>
              <a href="#wallet" class="btn btn-primary" style="width: 100%;">
                <span>Withdraw Simulated Earnings</span>
              </a>
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
      // 1. Fetch assigned tasks
      const activeTasks = await API.getTasks({ assigned_junior_id: user.id });
      // 2. Fetch marketplace tasks for recommendation
      const allTasks = await API.getTasks({ status: 'OPEN' });
      // 3. Fetch wallet summary
      const wallet = await API.getWalletSummary();

      document.getElementById('stat-avail-tasks').textContent = allTasks.length;
      document.getElementById('stat-active-assigned').textContent = activeTasks.length;
      document.getElementById('stat-pending-earn').textContent = `₹${Math.round(wallet.pending_balance || 350)}`;
      document.getElementById('stat-total-earned').textContent = `₹${Math.round(wallet.total_earned || 3850)}`;
      if (document.getElementById('junior-wallet-bal')) {
        document.getElementById('junior-wallet-bal').textContent = `₹${Math.round(wallet.available_balance || 1250)}`;
      }

      // Render Active Assigned Tasks
      const activeListEl = document.getElementById('junior-active-tasks-list');
      if (activeTasks.length === 0) {
        activeListEl.innerHTML = `
          <div style="text-align: center; padding: 24px; color: var(--text-muted);">
            <p>You have no active tasks in progress.</p>
            <a href="#marketplace" class="btn btn-sm btn-primary" style="margin-top: 10px;">Browse Tasks to Apply</a>
          </div>
        `;
      } else {
        activeListEl.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${activeTasks.map(t => `
              <div style="background: var(--bg-surface); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
                <div>
                  <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                    <span class="badge ${TaskDetailView.getStatusBadgeClass(t.status)}">${t.status}</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${t.subject}</span>
                  </div>
                  <a href="#task/${t.id}" style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">${t.title}</a>
                  <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 4px;">
                    Payout: <strong style="color: var(--success);">₹${Math.round(t.total_budget)}</strong> &bull; 
                    Senior: <strong>${t.poster_anon_id}</strong> &bull; 
                    <span>⏳ ${t.time_left_str}</span>
                  </div>
                </div>

                <div style="display: flex; gap: 8px;">
                  <a href="#chat?task=${t.id}" class="btn btn-sm btn-secondary">💬 Chat</a>
                  <a href="#task/${t.id}" class="btn btn-sm btn-success">
                    ${t.status === 'SUBMITTED' ? 'View Submission' : '📤 Upload Work'}
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      // Render Recommendations (top 4 with highest match score)
      const recListEl = document.getElementById('junior-recommended-list');
      const recTasks = allTasks.sort((a, b) => (b.match_score || 0) - (a.match_score || 0)).slice(0, 4);

      if (recTasks.length === 0) {
        recListEl.innerHTML = `<div style="text-align: center; padding: 20px; color: var(--text-muted);">No open tasks at the moment.</div>`;
      } else {
        recListEl.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${recTasks.map(t => `
              <div style="background: var(--bg-surface); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 4px;">
                    <span class="badge badge-match">⚡ ${t.match_score || 88}% Match</span>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">${t.category}</span>
                  </div>
                  <a href="#task/${t.id}" style="font-weight: 600; font-size: 0.98rem; color: var(--text-primary);">${t.title}</a>
                  <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">
                    ₹${Math.round(t.total_budget)} &bull; Due in ${t.time_left_str}
                  </div>
                </div>
                <a href="#task/${t.id}?apply=1" class="btn btn-sm btn-primary">Apply</a>
              </div>
            `).join('')}
          </div>
        `;
      }

    } catch (err) {
      console.error(err);
    }
  }
};
