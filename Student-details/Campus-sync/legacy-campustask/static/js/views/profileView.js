/**
 * Student Profile & Skills View
 */
const ProfileView = {
  reviews: [],

  async render() {
    const user = API.getCurrentUser() || { anonymous_id: 'Student #A482', role: 'junior', rating: 4.9, rating_count: 12 };

    return `
      <div class="profile-page" style="padding: 24px 0; max-width: 800px; margin: 0 auto;">
        <!-- Profile Identity Card -->
        <div class="card" style="padding: 28px; margin-bottom: 24px; position: relative; overflow: hidden;">
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 20px;">
            <div style="width: 72px; height: 72px; border-radius: var(--radius-full); background: var(--primary-gradient); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; color: white; box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35);">
              ${user.role === 'senior' ? 'S' : user.role === 'admin' ? 'A' : 'J'}
            </div>

            <div style="flex: 1;">
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                <span class="badge badge-verified">✓ Campus Verified</span>
                <span class="badge ${user.role === 'senior' ? 'badge-assigned' : 'badge-match'}">${user.role.toUpperCase()}</span>
              </div>
              <h1 style="font-size: 1.65rem; margin-bottom: 4px;">${user.anonymous_id}</h1>
              <div style="font-size: 0.88rem; color: var(--text-secondary);">
                ${user.branch || 'Engineering Department'} &bull; Year ${user.year || 1}
              </div>
            </div>

            <div style="text-align: right; background: var(--bg-surface); padding: 12px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
              <div style="font-size: 1.6rem; font-weight: 800; color: #d97706;">⭐ ${user.rating || '5.0'}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${user.rating_count || 0} Peer Reviews</div>
            </div>
          </div>

          <!-- Subtle Privacy Note -->
          <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-subtle); font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
            <span>🛡️</span>
            <span>Institutional encryption active: Your roll number and personal contact details remain private.</span>
          </div>
        </div>

        <!-- Skills & Profile Editor Form -->
        <div class="card" style="padding: 28px; margin-bottom: 24px;">
          <h3 style="font-size: 1.25rem; margin-bottom: 18px;">Edit Skills & Academic Bio</h3>
          <form onsubmit="ProfileView.handleSave(event)">
            <div class="form-group">
              <label class="form-label">Skills & Permitted Competencies (Comma-separated)</label>
              <input type="text" id="profile-skills-input" class="form-input" 
                value="${(user.skills || []).join(', ')}" 
                placeholder="e.g. Mathematics, Python, LaTeX, Excel, PPT Formatting, Proofreading, CAD" />
              <span style="font-size: 0.75rem; color: var(--text-muted);">
                Adding relevant skills boosts your match score for senior tasks.
              </span>
            </div>

            <div class="form-group">
              <label class="form-label">Department / Branch</label>
              <input type="text" id="profile-branch-input" class="form-input" value="${user.branch || ''}" />
            </div>

            <div class="form-group">
              <label class="form-label">Academic Year</label>
              <select id="profile-year-select" class="form-select">
                <option value="1" ${user.year === 1 ? 'selected' : ''}>1st Year (Junior)</option>
                <option value="2" ${user.year === 2 ? 'selected' : ''}>2nd Year</option>
                <option value="3" ${user.year === 3 ? 'selected' : ''}>3rd Year</option>
                <option value="4" ${user.year === 4 ? 'selected' : ''}>4th Year (Senior)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Bio / Turnaround Commitment</label>
              <textarea id="profile-bio-input" class="form-textarea" placeholder="Describe your strengths and turnaround speed.">${user.bio || ''}</textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px;">
              <span>💾 Save Profile Updates</span>
            </button>
          </form>
        </div>

        <!-- Peer Reviews Received -->
        <div class="card" style="padding: 28px;">
          <h3 style="font-size: 1.25rem; margin-bottom: 16px;">Campus Peer Reviews</h3>
          <div id="profile-reviews-list">
            <div style="text-align: center; padding: 20px; color: var(--text-muted);">Loading reviews...</div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const user = API.getCurrentUser();
    if (!user) return;

    try {
      this.reviews = await API.getUserReviews(user.id);
      const revContainer = document.getElementById('profile-reviews-list');
      if (!revContainer) return;

      if (this.reviews.length === 0) {
        revContainer.innerHTML = `
          <div style="text-align: center; padding: 20px; color: var(--text-muted);">
            No peer reviews yet. Complete your first task to receive feedback!
          </div>
        `;
        return;
      }

      revContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${this.reviews.map(r => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 14px 18px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-weight: 700; color: var(--text-primary);">${r.reviewer_anon_id}</span>
                <span style="color: #d97706; font-weight: 700;">⭐ ${'★'.repeat(r.rating)}</span>
              </div>
              <div style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 4px;">
                "${r.comment || 'Great peer assistance.'}"
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">
                For task: ${r.task_title} &bull; ${new Date(r.created_at).toLocaleDateString()}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } catch (err) {
      console.error(err);
    }
  },

  async handleSave(e) {
    e.preventDefault();
    const skillsRaw = document.getElementById('profile-skills-input').value;
    const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);
    const branch = document.getElementById('profile-branch-input').value.trim();
    const year = parseInt(document.getElementById('profile-year-select').value);
    const bio = document.getElementById('profile-bio-input').value.trim();

    try {
      await API.updateProfile({ skills, branch, year, bio });
      API.showToast('Profile updated successfully!', 'success');
      App.refreshHeader();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  }
};
