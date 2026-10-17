/**
 * Task Detail View with full Lifecycle Management
 */
const TaskDetailView = {
  taskId: null,
  task: null,
  applications: [],

  async render(params) {
    this.taskId = params.id;
    return `
      <div class="task-detail-page" style="padding: 24px 0; max-width: 960px; margin: 0 auto;">
        <div id="task-detail-content">
          <div style="text-align: center; padding: 60px 0; color: var(--text-muted);">
            Loading task details...
          </div>
        </div>
      </div>
    `;
  },

  async afterRender(params) {
    this.taskId = params.id;
    await this.loadTaskDetails(params);
  },

  async loadTaskDetails(params) {
    const container = document.getElementById('task-detail-content');
    if (!container) return;

    try {
      this.task = await API.getTask(this.taskId);
      const currentUser = API.getCurrentUser();
      const isPoster = currentUser && currentUser.id === this.task.poster_id;
      const isAssignedJunior = currentUser && currentUser.id === this.task.assigned_junior_id;
      const isAdmin = currentUser && currentUser.role === 'admin';

      // If poster or admin, load applications
      if (isPoster || isAdmin) {
        try {
          this.applications = await API.getTaskApplications(this.taskId);
        } catch {
          this.applications = [];
        }
      }

      container.innerHTML = `
        <!-- Top Navigation / Back -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <a href="#marketplace" class="btn btn-sm btn-secondary">
            <span>← Back to Marketplace</span>
          </a>
          <div style="display: flex; gap: 8px;">
            ${isPoster && ['OPEN', 'APPLICATIONS'].includes(this.task.status) ? `
              <button class="btn btn-sm btn-danger" onclick="TaskDetailView.cancelTask()">Cancel Task & Refund</button>
            ` : ''}
            ${(isPoster || isAssignedJunior) && ['ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW'].includes(this.task.status) ? `
              <button class="btn btn-sm btn-danger" onclick="TaskDetailView.openDisputeModal()">Raise Dispute</button>
            ` : ''}
          </div>
        </div>

        <!-- Main Task Header Card (Glassmorphic) -->
        <div class="card" style="margin-bottom: 24px;">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 16px;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                <span class="badge ${this.getStatusBadgeClass(this.task.status)}">${this.task.status}</span>
                <span class="badge badge-match">${this.task.category}</span>
                <span class="badge" style="background: var(--bg-surface); color: var(--text-secondary);">${this.task.difficulty}</span>
              </div>
              <h1 style="font-size: 1.75rem; margin-bottom: 6px;">${this.task.title}</h1>
              <div style="font-size: 0.92rem; color: var(--text-secondary);">
                Subject: <strong style="color: var(--text-primary);">${this.task.subject}</strong> &bull; 
                Posted by: <strong style="color: var(--primary);">${this.task.poster_anon_id}</strong> (⭐ ${this.task.poster_rating})
              </div>
            </div>

            <div style="text-align: right; background: rgba(241, 245, 249, 0.8); padding: 14px 20px; border-radius: var(--radius-md); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: var(--shadow-sm);">
              <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Total Budget</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--success);">₹${Math.round(this.task.total_budget)}</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">
                ${this.task.pages > 0 ? `${this.task.pages} Pages × ₹${this.task.rate_per_page}/page` : 'Fixed Budget'}
              </div>
            </div>
          </div>

          <!-- Lifecycle Stepper -->
          ${this.renderLifecycleStepper(this.task.status)}

          <!-- Deadline & Timing Alert -->
          <div style="background: ${this.task.is_urgent ? 'rgba(225, 29, 72, 0.08)' : 'rgba(241, 245, 249, 0.75)'}; border: 1px solid ${this.task.is_urgent ? 'rgba(225, 29, 72, 0.25)' : 'var(--border-subtle)'}; padding: 12px 18px; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.2rem;">⏳</span>
              <div>
                <span style="font-weight: 600; font-size: 0.92rem;">Submission Deadline:</span>
                <span style="color: var(--text-secondary); font-size: 0.88rem; margin-left: 6px;">${new Date(this.task.deadline).toLocaleString()}</span>
              </div>
            </div>
            <div style="font-weight: 700; color: ${this.task.is_urgent ? 'var(--danger)' : 'var(--warning)'}; font-size: 0.92rem;">
              ${this.task.time_left_str}
            </div>
          </div>

          <!-- Description & Instructions -->
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; margin-bottom: 10px;">Task Instructions & Requirements</h3>
            <div style="background: rgba(248, 250, 252, 0.8); border: 1px solid var(--border-subtle); padding: 18px; border-radius: var(--radius-md); font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; color: var(--text-primary); box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">${this.task.description}</div>
          </div>

          <!-- Reference File Download (If Attached) -->
          ${this.task.reference_file ? `
            <div style="margin-bottom: 24px; padding: 14px 18px; background: rgba(124, 58, 237, 0.06); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">📎</span>
                <div>
                  <div style="font-weight: 600; font-size: 0.92rem;">Attached Reference Document</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">${this.task.reference_file}</div>
                </div>
              </div>
              <a href="/uploads/${this.task.reference_file}" target="_blank" class="btn btn-sm btn-primary">
                <span>⬇️ Download Reference</span>
              </a>
            </div>
          ` : ''}

          <!-- Assigned Junior Header (If Assigned) -->
          ${this.task.junior_anon_id ? `
            <div style="padding: 16px 20px; background: rgba(5, 150, 105, 0.08); border: 1px solid rgba(5, 150, 105, 0.25); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Assigned Student Earner</span>
                <div style="font-size: 1.15rem; font-weight: 700; color: var(--success);">${this.task.junior_anon_id} (⭐ ${this.task.junior_rating || '5.0'})</div>
              </div>
              ${(isPoster || isAssignedJunior || isAdmin) ? `
                <a href="#chat?task=${this.task.id}" class="btn btn-primary">
                  <span>💬 Open Anonymous Chat</span>
                </a>
              ` : ''}
            </div>
          ` : ''}
        </div>

        <!-- Dynamic Role Context Actions -->
        ${this.renderActionSection(currentUser, isPoster, isAssignedJunior, isAdmin, params)}
      `;

      // Auto scroll to application form if ?apply=1
      if (params && params.apply && document.getElementById('apply-form-section')) {
        document.getElementById('apply-form-section').scrollIntoView({ behavior: 'smooth' });
      }

    } catch (err) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px 20px; color: var(--danger);">
          <p>Failed to load task: ${err.message}</p>
          <a href="#marketplace" class="btn btn-secondary" style="margin-top: 14px;">Return to Marketplace</a>
        </div>
      `;
    }
  },

  getStatusBadgeClass(status) {
    switch (status) {
      case 'OPEN': return 'badge-open';
      case 'APPLICATIONS': return 'badge-warning';
      case 'ASSIGNED':
      case 'IN_PROGRESS': return 'badge-assigned';
      case 'SUBMITTED':
      case 'UNDER_REVIEW': return 'badge-match';
      case 'COMPLETED': return 'badge-verified';
      case 'DISPUTED': return 'badge-urgent';
      default: return 'badge-secondary';
    }
  },

  renderLifecycleStepper(status) {
    const steps = [
      { id: 'OPEN', label: '1. Posted' },
      { id: 'ASSIGNED', label: '2. Assigned' },
      { id: 'SUBMITTED', label: '3. Submitted' },
      { id: 'COMPLETED', label: '4. Paid & Rated' }
    ];

    let activeIdx = 0;
    if (['APPLICATIONS'].includes(status)) activeIdx = 0;
    if (['ASSIGNED', 'IN_PROGRESS'].includes(status)) activeIdx = 1;
    if (['SUBMITTED', 'UNDER_REVIEW'].includes(status)) activeIdx = 2;
    if (['COMPLETED'].includes(status)) activeIdx = 3;

    return `
      <div class="lifecycle-stepper">
        <div class="stepper-line">
          <div class="stepper-line-progress" style="width: ${(activeIdx / (steps.length - 1)) * 100}%;"></div>
        </div>
        ${steps.map((s, idx) => {
          let stepClass = '';
          if (idx < activeIdx || status === 'COMPLETED') stepClass = 'completed';
          else if (idx === activeIdx) stepClass = 'active';
          return `
            <div class="lifecycle-step ${stepClass}">
              <div class="step-circle">${idx < activeIdx || status === 'COMPLETED' ? '✓' : idx + 1}</div>
              <div class="step-label">${s.label}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderActionSection(currentUser, isPoster, isAssignedJunior, isAdmin, params) {
    // 1. If Junior viewing an OPEN task
    if (!isPoster && !isAssignedJunior && currentUser && currentUser.role === 'junior' && ['OPEN', 'APPLICATIONS'].includes(this.task.status)) {
      if (this.task.user_application) {
        return `
          <div class="card" style="border: 1px solid rgba(124, 58, 237, 0.4); background: rgba(124, 58, 237, 0.05);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <h3 style="font-size: 1.15rem; color: var(--primary);">Your Application Status:</h3>
              <span class="badge ${this.task.user_application.status === 'accepted' ? 'badge-verified' : 'badge-warning'}">
                ${this.task.user_application.status.toUpperCase()}
              </span>
            </div>
            <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 10px;">
              You proposed <strong>₹${this.task.user_application.proposed_price}</strong> &bull; ETA: <strong>${this.task.user_application.estimated_time}</strong>
            </p>
            <div style="font-size: 0.88rem; background: #ffffff; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); color: var(--text-primary);">
              "${this.task.user_application.message}"
            </div>
          </div>
        `;
      }

      return `
        <div class="card" id="apply-form-section" style="border: 1px solid rgba(124, 58, 237, 0.3); background: rgba(255, 255, 255, 0.9);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <div>
              <h3 style="font-size: 1.25rem;">Apply for this Task</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary);">Outsource your skills and earn securely. Your identity remains 100% anonymous.</p>
            </div>
            <div class="badge badge-match">⚡ Guaranteed Escrow Payout</div>
          </div>

          <form onsubmit="TaskDetailView.handleApply(event)">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div class="form-group">
                <label class="form-label">Proposed Price (₹)</label>
                <input type="number" id="apply-price" class="form-input" value="${this.task.total_budget}" required />
                <span style="font-size: 0.75rem; color: var(--text-muted);">Senior's budget: ₹${this.task.total_budget}</span>
              </div>
              <div class="form-group">
                <label class="form-label">Estimated Completion Time</label>
                <input type="text" id="apply-eta" class="form-input" placeholder="e.g. Tomorrow 6 PM / 24 hours" required />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Pitch to Senior</label>
              <textarea id="apply-pitch" class="form-textarea" placeholder="Tell the senior why you're suitable (e.g., 'I have experience with engineering mathematics and can complete formatting by tomorrow.')." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1rem; padding: 12px;">
              <span>🚀 Submit Application to Senior</span>
            </button>
          </form>
        </div>
      `;
    }

    // 2. If Senior viewing applications on their task
    if (isPoster && ['OPEN', 'APPLICATIONS'].includes(this.task.status)) {
      return `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
            <div>
              <h3 style="font-size: 1.25rem;">Received Applications (${this.applications.length})</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary);">Select the best junior student for your task.</p>
            </div>
            <span class="badge badge-warning">${this.applications.filter(a => a.status === 'pending').length} Pending</span>
          </div>

          ${this.applications.length === 0 ? `
            <div style="text-align: center; padding: 30px; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-md);">
              <span>⏳ No applications yet. Interested campus juniors will apply shortly.</span>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 14px;">
              ${this.applications.map(app => `
                <div style="background: rgba(255, 255, 255, 0.9); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-sm);">
                  <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                    <div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: 700; font-size: 1.05rem; color: var(--primary);">${app.applicant_anon_id}</span>
                        <span class="badge badge-verified">⭐ ${app.applicant_rating}</span>
                        <span class="badge" style="background: var(--bg-surface); color: var(--text-secondary);">${app.applicant_branch} (Year ${app.applicant_year})</span>
                      </div>
                      <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
                        Proposed Price: <strong style="color: var(--success);">₹${app.proposed_price}</strong> &bull; ETA: <strong>${app.estimated_time}</strong>
                      </div>
                    </div>

                    ${app.status === 'pending' ? `
                      <div style="display: flex; gap: 8px;">
                        <button class="btn btn-sm btn-success" onclick="TaskDetailView.decideApp(${app.id}, 'accepted')">
                          <span>✓ Accept Junior</span>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="TaskDetailView.decideApp(${app.id}, 'rejected')">
                          <span>✕ Reject</span>
                        </button>
                      </div>
                    ` : `
                      <span class="badge ${app.status === 'accepted' ? 'badge-verified' : 'badge-danger'}">${app.status.toUpperCase()}</span>
                    `}
                  </div>
                  <div style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.5; background: rgba(241, 245, 249, 0.6); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                    "${app.message}"
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    }

    // 3. If Active (ASSIGNED / IN_PROGRESS / SUBMITTED)
    if (['ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW'].includes(this.task.status)) {
      return `
        <div class="card">
          <h3 style="font-size: 1.25rem; margin-bottom: 16px;">Task Execution & Delivery</h3>

          <!-- Submission File Showcase if submitted -->
          ${this.task.submission_file || this.task.submission_note ? `
            <div style="background: rgba(5, 150, 105, 0.08); border: 1px solid rgba(5, 150, 105, 0.25); padding: 18px; border-radius: var(--radius-md); margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 700; color: #047857; font-size: 1rem;">📁 Completed Work Delivered:</span>
                <span style="font-size: 0.78rem; color: var(--text-muted);">${this.task.submitted_at ? new Date(this.task.submitted_at).toLocaleString() : ''}</span>
              </div>
              <p style="font-size: 0.92rem; color: var(--text-primary); margin-bottom: 12px;">"${this.task.submission_note}"</p>
              ${this.task.submission_file ? `
                <a href="/uploads/${this.task.submission_file}" target="_blank" class="btn btn-sm btn-success">
                  <span>⬇️ Download & Review Completed Work</span>
                </a>
              ` : ''}
            </div>
          ` : ''}

          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            <a href="#chat?task=${this.task.id}" class="btn btn-primary">
              <span>💬 Open Anonymous Chat</span>
            </a>

            <!-- Junior Action: Submit Work -->
            ${isAssignedJunior && ['ASSIGNED', 'IN_PROGRESS'].includes(this.task.status) ? `
              <button class="btn btn-success" onclick="TaskDetailView.openSubmitWorkModal()">
                <span>📤 Upload & Submit Completed Work</span>
              </button>
            ` : ''}

            <!-- Senior Action: Approve & Release Payment -->
            ${isPoster && ['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS'].includes(this.task.status) ? `
              <button class="btn btn-success" onclick="TaskDetailView.approveTask()">
                <span>✅ Approve Work & Release ₹${Math.round(this.task.total_budget)} Payment</span>
              </button>
              <button class="btn btn-secondary" onclick="TaskDetailView.requestRevision()">
                <span>🔄 Request Minor Revision</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }

    // 4. If COMPLETED
    if (this.task.status === 'COMPLETED') {
      return `
        <div class="card" style="background: rgba(5, 150, 105, 0.08); border: 1px solid rgba(5, 150, 105, 0.3);">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
            <div>
              <div class="badge badge-verified" style="margin-bottom: 6px;">✓ Task Completed & Payment Settled</div>
              <h3 style="font-size: 1.3rem;">Escrow Payment Released</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                ₹${Math.round(this.task.total_budget)} has been deposited into ${this.task.junior_anon_id}'s available wallet.
              </p>
            </div>
            <button class="btn btn-primary" onclick="TaskDetailView.openReviewModal()">
              <span>⭐ Rate & Review ${isPoster ? this.task.junior_anon_id : this.task.poster_anon_id}</span>
            </button>
          </div>
        </div>
      `;
    }

    return '';
  },

  async handleApply(e) {
    e.preventDefault();
    const price = parseFloat(document.getElementById('apply-price').value);
    const eta = document.getElementById('apply-eta').value.trim();
    const pitch = document.getElementById('apply-pitch').value.trim();

    try {
      await API.applyForTask({
        task_id: this.taskId,
        proposed_price: price,
        estimated_time: eta,
        message: pitch
      });
      API.showToast('Application sent to senior! You will be notified when accepted.', 'success');
      await this.loadTaskDetails();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  async decideApp(appId, decision) {
    try {
      await API.decideApplication(appId, decision);
      API.showToast(decision === 'accepted' ? 'Junior accepted! Anonymous chat channel opened.' : 'Application rejected.', 'success');
      await this.loadTaskDetails();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  openSubmitWorkModal() {
    App.openModal(`
      <div class="modal-header">
        <h3 style="font-size: 1.25rem;">Submit Completed Work</h3>
        <button class="modal-close" onclick="App.closeModal()">&times;</button>
      </div>
      <form onsubmit="TaskDetailView.handleSubmitWork(event)">
        <div class="form-group">
          <label class="form-label">Delivery Notes / Summary</label>
          <textarea id="sub-notes" class="form-textarea" placeholder="Explain what has been completed (e.g. 'Completed 20 pages with IEEE formulas and high-res diagrams')." required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Upload Completed File (PDF, DOCX, ZIP, Image)</label>
          <input type="file" id="sub-file" class="form-input" />
        </div>
        <button type="submit" class="btn btn-success" style="width: 100%; padding: 12px; margin-top: 10px;">
          <span>🚀 Deliver to Senior for Review</span>
        </button>
      </form>
    `);
  },

  async handleSubmitWork(e) {
    e.preventDefault();
    const notes = document.getElementById('sub-notes').value.trim();
    const fileInput = document.getElementById('sub-file');
    let filename = null;

    if (fileInput.files.length > 0) {
      try {
        const uploadRes = await API.uploadFile(fileInput.files[0]);
        filename = uploadRes.filename;
      } catch (err) {
        API.showToast('File upload failed: ' + err.message, 'error');
        return;
      }
    }

    try {
      await API.submitWork(this.taskId, notes, filename);
      App.closeModal();
      API.showToast('Work submitted to senior! Awaiting payment approval.', 'success');
      await this.loadTaskDetails();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  async approveTask() {
    if (!confirm(`Are you sure you want to approve this work and release ₹${Math.round(this.task.total_budget)} to ${this.task.junior_anon_id}?`)) {
      return;
    }

    try {
      await API.approveTask(this.taskId);
      API.showToast(`Task approved! ₹${Math.round(this.task.total_budget)} released to junior's wallet.`, 'success');
      await this.loadTaskDetails();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  async requestRevision() {
    const reason = prompt("Enter revision instructions for the junior:");
    if (!reason) return;

    try {
      await API.requestRevision(this.taskId);
      await API.sendMessage(this.taskId, this.task.assigned_junior_id, `Revision Request: ${reason}`);
      API.showToast('Revision request sent to junior.', 'info');
      await this.loadTaskDetails();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  openReviewModal() {
    const isPoster = API.getCurrentUser() && API.getCurrentUser().id === this.task.poster_id;
    const targetName = isPoster ? this.task.junior_anon_id : this.task.poster_anon_id;

    App.openModal(`
      <div class="modal-header">
        <h3 style="font-size: 1.25rem;">Rate & Review ${targetName}</h3>
        <button class="modal-close" onclick="App.closeModal()">&times;</button>
      </div>
      <form onsubmit="TaskDetailView.handleReview(event)">
        <div class="form-group">
          <label class="form-label">Rating (1 to 5 Stars)</label>
          <select id="review-stars" class="form-select">
            <option value="5">⭐⭐⭐⭐⭐ (5 - Outstanding / Flawless)</option>
            <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
            <option value="3">⭐⭐⭐ (3 - Average)</option>
            <option value="2">⭐⭐ (2 - Below Expectations)</option>
            <option value="1">⭐ (1 - Unsatisfactory)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Review Feedback</label>
          <textarea id="review-text" class="form-textarea" placeholder="Share your experience (e.g. 'Completed the task before the deadline with excellent formatting.')."></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; margin-top: 10px;">
          <span>Submit Anonymous Rating</span>
        </button>
      </form>
    `);
  },

  async handleReview(e) {
    e.preventDefault();
    const rating = document.getElementById('review-stars').value;
    const comment = document.getElementById('review-text').value.trim();

    try {
      await API.createReview(this.taskId, rating, comment);
      App.closeModal();
      API.showToast('Rating submitted successfully! Thank you.', 'success');
      await this.loadTaskDetails();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  openDisputeModal() {
    App.openModal(`
      <div class="modal-header">
        <h3 style="font-size: 1.25rem;">File a Campus Dispute</h3>
        <button class="modal-close" onclick="App.closeModal()">&times;</button>
      </div>
      <form onsubmit="TaskDetailView.handleDispute(event)">
        <div class="form-group">
          <label class="form-label">Dispute Reason</label>
          <select id="disp-reason" class="form-select">
            <option value="Work not delivered">Work not delivered</option>
            <option value="Work delivered late">Work delivered late</option>
            <option value="Task description mismatch">Task description mismatch</option>
            <option value="Payment issue">Payment issue</option>
            <option value="Inappropriate behavior">Inappropriate behavior</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Detailed Explanation</label>
          <textarea id="disp-desc" class="form-textarea" placeholder="Describe the issue with evidence for the campus administration to review." required></textarea>
        </div>
        <button type="submit" class="btn btn-danger" style="width: 100%; padding: 12px; margin-top: 10px;">
          <span>⚠️ Submit Dispute for Admin Review</span>
        </button>
      </form>
    `);
  },

  async handleDispute(e) {
    e.preventDefault();
    const reason = document.getElementById('disp-reason').value;
    const desc = document.getElementById('disp-desc').value.trim();

    try {
      await API.raiseDispute(this.taskId, reason, desc);
      App.closeModal();
      API.showToast('Dispute submitted. Administration will review evidence.', 'info');
      await this.loadTaskDetails();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  async cancelTask() {
    if (!confirm('Are you sure you want to cancel this task and refund escrow?')) return;
    try {
      await API.cancelTask(this.taskId);
      API.showToast('Task cancelled and funds refunded to your wallet.', 'success');
      window.location.hash = '#marketplace';
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  }
};
