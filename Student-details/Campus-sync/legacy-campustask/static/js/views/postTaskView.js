/**
 * Post a Task View
 * Clean, modern form with instant budget calculator
 */
const PostTaskView = {
  pricingMode: 'pages', // 'pages' or 'fixed'

  render() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(18, 0, 0, 0);
    const defaultDeadline = tomorrow.toISOString().slice(0, 16);

    return `
      <div class="post-task-page" style="padding: 24px 0; max-width: 760px; margin: 0 auto;">
        <!-- Header -->
        <div style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <a href="#marketplace" class="btn btn-sm btn-secondary">← Back to Tasks</a>
            <div class="badge badge-verified">🛡️ Permitted Peer Support Only</div>
          </div>
          <h1 style="font-size: 1.85rem; margin-bottom: 4px;">Post a Campus Task</h1>
          <p style="color: var(--text-secondary); font-size: 0.92rem;">
            Delegate formatting, notes, or slide structuring to verified juniors with escrow protection.
          </p>
        </div>

        <!-- Task Creation Card -->
        <div class="card" style="padding: 28px;">
          <form onsubmit="PostTaskView.handleSubmit(event)">
            <!-- Title -->
            <div class="form-group">
              <label class="form-label">Task Title *</label>
              <input type="text" id="task-title" class="form-input" 
                placeholder="e.g. Engineering Mathematics Assignment Formatting" required 
                value="Engineering Mathematics Assignment Formatting" />
            </div>

            <!-- Category & Subject -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Category *</label>
                <select id="task-category" class="form-select" required>
                  <option value="Assignment Assistance">📝 Assignment Assistance</option>
                  <option value="Notes Preparation">📚 Notes Preparation</option>
                  <option value="Presentation / PPT">📊 Presentation / PPT</option>
                  <option value="Research Assistance">🔍 Research Assistance</option>
                  <option value="Excel & Data Entry">📈 Excel & Data Entry</option>
                  <option value="Programming & Debugging">💻 Programming & Debugging</option>
                  <option value="Diagrams & CAD">📐 Diagrams & CAD</option>
                  <option value="Formatting & LaTeX">📄 Formatting & LaTeX</option>
                  <option value="Proofreading">✨ Proofreading</option>
                  <option value="Tutoring & Doubt Solving">🎓 Tutoring & Doubt Solving</option>
                  <option value="Other">📌 Other Permitted Task</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Subject / Course *</label>
                <input type="text" id="task-subject" class="form-input" 
                  placeholder="e.g. Engineering Mathematics" required 
                  value="Engineering Mathematics" />
              </div>
            </div>

            <!-- Pricing Mode Switcher -->
            <div style="margin: 16px 0;">
              <label class="form-label" style="margin-bottom: 8px;">Budget Type</label>
              <div style="display: flex; gap: 10px;">
                <button type="button" id="btn-mode-pages" class="btn btn-sm btn-primary" onclick="PostTaskView.setPricingMode('pages')">
                  📄 Per-Page Rate
                </button>
                <button type="button" id="btn-mode-fixed" class="btn btn-sm btn-secondary" onclick="PostTaskView.setPricingMode('fixed')">
                  💰 Fixed Amount
                </button>
              </div>
            </div>

            <!-- Per-Page Pricing Inputs -->
            <div id="pages-pricing-inputs" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: rgba(241, 245, 249, 0.8); padding: 16px; border-radius: var(--radius-md); margin-bottom: 18px; border: 1px solid rgba(255, 255, 255, 0.8);">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Number of Pages</label>
                <input type="number" id="task-pages" class="form-input" value="20" min="1" oninput="PostTaskView.calculateBudget()" />
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Rate Per Page (₹)</label>
                <input type="number" id="task-rate" class="form-input" value="20" min="1" oninput="PostTaskView.calculateBudget()" />
              </div>
            </div>

            <!-- Fixed Pricing Input -->
            <div id="fixed-pricing-inputs" style="display: none; background: rgba(241, 245, 249, 0.8); padding: 16px; border-radius: var(--radius-md); margin-bottom: 18px; border: 1px solid rgba(255, 255, 255, 0.8);">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Total Task Budget (₹)</label>
                <input type="number" id="task-fixed-budget" class="form-input" value="400" min="50" oninput="PostTaskView.calculateBudget()" />
              </div>
            </div>

            <!-- Live Calculated Budget Display -->
            <div style="background: rgba(5, 150, 105, 0.08); border: 1px solid rgba(5, 150, 105, 0.25); border-radius: var(--radius-md); padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; box-shadow: var(--shadow-sm);">
              <div>
                <span style="font-size: 0.78rem; color: #047857; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">Escrow Total</span>
                <div id="budget-calc-explanation" style="font-size: 0.85rem; color: var(--text-secondary);">20 pages × ₹20/page</div>
              </div>
              <div id="budget-calc-total" style="font-size: 1.6rem; font-weight: 800; color: var(--success);">
                ₹400
              </div>
            </div>

            <!-- Deadline & Difficulty -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Submission Deadline *</label>
                <input type="datetime-local" id="task-deadline" class="form-input" value="${defaultDeadline}" required />
              </div>

              <div class="form-group">
                <label class="form-label">Difficulty Level</label>
                <select id="task-difficulty" class="form-select">
                  <option value="Easy">🟢 Easy (Data entry / basic formatting)</option>
                  <option value="Medium" selected>🟡 Medium (Typesetting / Diagrams / PPT)</option>
                  <option value="Hard">🔴 Hard (Technical calculations / CAD)</option>
                </select>
              </div>
            </div>

            <!-- Instructions -->
            <div class="form-group">
              <label class="form-label">Task Instructions & Requirements *</label>
              <textarea id="task-desc" class="form-textarea" style="min-height: 110px;" placeholder="Provide clear instructions for the junior..." required>Clean typesetting of 20 pages of handwritten notes into formatted layout with numbered equations and citations.</textarea>
            </div>

            <!-- Upload Reference File -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Reference Material or Rough Notes (Optional)</label>
              <input type="file" id="task-ref-file" class="form-input" />
              <span style="font-size: 0.75rem; color: var(--text-muted);">PDF, DOCX, PNG, JPG, ZIP (Max 15MB)</span>
            </div>

            <!-- Safety Confirmation -->
            <div style="background: var(--bg-surface); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-glass); margin-bottom: 20px;">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                <input type="checkbox" id="integrity-confirm" checked required style="width: 16px; height: 16px; accent-color: var(--primary);" />
                <span style="font-size: 0.84rem; color: var(--text-primary);">
                  I confirm this task complies with campus academic assistance guidelines.
                </span>
              </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-lg btn-primary" style="width: 100%;">
              <span>⚡ Publish to Marketplace</span>
            </button>
          </form>
        </div>
      </div>
    `;
  },

  setPricingMode(mode) {
    this.pricingMode = mode;
    const pagesInputs = document.getElementById('pages-pricing-inputs');
    const fixedInputs = document.getElementById('fixed-pricing-inputs');
    const btnPages = document.getElementById('btn-mode-pages');
    const btnFixed = document.getElementById('btn-mode-fixed');

    if (mode === 'pages') {
      pagesInputs.style.display = 'grid';
      fixedInputs.style.display = 'none';
      btnPages.className = 'btn btn-sm btn-primary';
      btnFixed.className = 'btn btn-sm btn-secondary';
    } else {
      pagesInputs.style.display = 'none';
      fixedInputs.style.display = 'block';
      btnPages.className = 'btn btn-sm btn-secondary';
      btnFixed.className = 'btn btn-sm btn-primary';
    }
    this.calculateBudget();
  },

  calculateBudget() {
    const totalEl = document.getElementById('budget-calc-total');
    const expEl = document.getElementById('budget-calc-explanation');
    if (!totalEl || !expEl) return;

    if (this.pricingMode === 'pages') {
      const pages = parseInt(document.getElementById('task-pages').value) || 0;
      const rate = parseFloat(document.getElementById('task-rate').value) || 0;
      const total = pages * rate;
      totalEl.textContent = `₹${total}`;
      expEl.textContent = `${pages} pages × ₹${rate}/page`;
    } else {
      const fixed = parseFloat(document.getElementById('task-fixed-budget').value) || 0;
      totalEl.textContent = `₹${fixed}`;
      expEl.textContent = `Fixed task allowance`;
    }
  },

  async handleSubmit(e) {
    e.preventDefault();
    const currentUser = API.getCurrentUser();
    if (!currentUser) {
      API.showToast('Please log in to post a task.', 'error');
      window.location.hash = '#login';
      return;
    }

    const title = document.getElementById('task-title').value.trim();
    const category = document.getElementById('task-category').value;
    const subject = document.getElementById('task-subject').value.trim();
    const deadline = new Date(document.getElementById('task-deadline').value).toISOString();
    const difficulty = document.getElementById('task-difficulty').value;
    const description = document.getElementById('task-desc').value.trim();
    const integrity = document.getElementById('integrity-confirm').checked;

    let pages = 0;
    let rate_per_page = 0.0;
    let fixed_budget = 0.0;

    if (this.pricingMode === 'pages') {
      pages = parseInt(document.getElementById('task-pages').value) || 0;
      rate_per_page = parseFloat(document.getElementById('task-rate').value) || 0.0;
    } else {
      fixed_budget = parseFloat(document.getElementById('task-fixed-budget').value) || 0.0;
    }

    // Reference file upload
    const fileInput = document.getElementById('task-ref-file');
    let refFilename = null;
    if (fileInput.files.length > 0) {
      try {
        const uploadRes = await API.uploadFile(fileInput.files[0]);
        refFilename = uploadRes.filename;
      } catch (err) {
        API.showToast('Reference file upload failed: ' + err.message, 'error');
        return;
      }
    }

    try {
      const res = await API.createTask({
        title,
        category,
        subject,
        pages,
        rate_per_page,
        fixed_budget,
        deadline,
        difficulty,
        description,
        academic_integrity_confirmed: integrity,
        reference_file: refFilename
      });

      API.showToast(`Task published! ₹${res.total_budget} reserved in escrow.`, 'success');
      window.location.hash = `#task/${res.task_id}`;
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  }
};
