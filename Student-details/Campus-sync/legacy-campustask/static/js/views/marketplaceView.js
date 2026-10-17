/**
 * Task Marketplace View
 */
const MarketplaceView = {
  state: {
    tasks: [],
    search: '',
    category: 'all',
    difficulty: 'all',
    sortBy: 'newest',
    minBudget: '',
    maxBudget: '',
    loading: true
  },

  async render() {
    return `
      <div class="marketplace-page" style="padding: 24px 0;">
        <!-- Header & Quick Post -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.85rem; margin-bottom: 4px;">Task Marketplace</h1>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">Explore peer academic support tasks posted across faculties.</p>
          </div>
          <a href="#post-task" class="btn btn-primary">
            <span>+ Post a Task</span>
          </a>
        </div>

        <!-- Search and Filters Bar -->
        <div class="card" style="padding: 16px 20px; margin-bottom: 24px;">
          <div style="display: grid; grid-template-columns: 1fr auto; gap: 14px; margin-bottom: 14px;">
            <div style="position: relative;">
              <input type="text" id="market-search" class="form-input" 
                placeholder="🔍 Search tasks, subjects, or skills (e.g. Python, LaTeX, CAD, Mathematics)..." 
                value="${this.state.search}"
                oninput="MarketplaceView.handleSearch(this.value)"
              />
            </div>
            <button class="btn btn-secondary" onclick="MarketplaceView.toggleFilterDrawer()">
              <span>⚙️ Filters</span>
            </button>
          </div>

          <!-- Category Quick Chips -->
          <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch;" id="category-chips">
            ${this.renderCategoryChips()}
          </div>

          <!-- Extended Filter Options (Collapsible) -->
          <div id="filter-drawer" style="display: none; padding-top: 16px; border-top: 1px solid var(--border-subtle); margin-top: 14px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px;">
              <div>
                <label class="form-label">Sort By</label>
                <select class="form-select" onchange="MarketplaceView.handleSort(this.value)">
                  <option value="newest" ${this.state.sortBy === 'newest' ? 'selected' : ''}>✨ Newest First</option>
                  <option value="highest_budget" ${this.state.sortBy === 'highest_budget' ? 'selected' : ''}>💰 Highest Budget</option>
                  <option value="lowest_pages" ${this.state.sortBy === 'lowest_pages' ? 'selected' : ''}>📄 Lowest Pages</option>
                  <option value="nearest_deadline" ${this.state.sortBy === 'nearest_deadline' ? 'selected' : ''}>⏳ Nearest Deadline</option>
                </select>
              </div>
              <div>
                <label class="form-label">Difficulty</label>
                <select class="form-select" onchange="MarketplaceView.handleDifficulty(this.value)">
                  <option value="all">All Difficulties</option>
                  <option value="Easy" ${this.state.difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
                  <option value="Medium" ${this.state.difficulty === 'Medium' ? 'selected' : ''}>Medium</option>
                  <option value="Hard" ${this.state.difficulty === 'Hard' ? 'selected' : ''}>Hard</option>
                </select>
              </div>
              <div>
                <label class="form-label">Min Budget (₹)</label>
                <input type="number" class="form-input" placeholder="e.g. 200" value="${this.state.minBudget}" onchange="MarketplaceView.handleMinBudget(this.value)" />
              </div>
              <div>
                <label class="form-label">Max Budget (₹)</label>
                <input type="number" class="form-input" placeholder="e.g. 1000" value="${this.state.maxBudget}" onchange="MarketplaceView.handleMaxBudget(this.value)" />
              </div>
            </div>
          </div>
        </div>

        <!-- Task Grid Container -->
        <div id="task-grid-container">
          <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
            <span>Loading active campus tasks...</span>
          </div>
        </div>
      </div>
    `;
  },

  renderCategoryChips() {
    const cats = [
      { id: 'all', label: 'All Tasks', icon: '🌐' },
      { id: 'Assignment Assistance', label: 'Assignment Help', icon: '📝' },
      { id: 'Notes Preparation', label: 'Notes', icon: '📚' },
      { id: 'Presentation / PPT', label: 'PPT / Slides', icon: '📊' },
      { id: 'Diagrams & CAD', label: 'Diagrams & CAD', icon: '📐' },
      { id: 'Excel & Data Entry', label: 'Excel Work', icon: '📈' },
      { id: 'Programming & Debugging', label: 'Coding / Doc', icon: '💻' },
      { id: 'Research Assistance', label: 'Research', icon: '🔍' },
      { id: 'Formatting & LaTeX', label: 'LaTeX / Format', icon: '📄' },
      { id: 'Proofreading', label: 'Proofreading', icon: '✨' },
      { id: 'Tutoring & Doubt Solving', label: 'Tutoring', icon: '🎓' }
    ];

    return cats.map(c => `
      <button class="btn btn-sm ${this.state.category === c.id ? 'btn-primary' : 'btn-secondary'}" 
        style="border-radius: var(--radius-full); font-size: 0.82rem; padding: 6px 14px;"
        onclick="MarketplaceView.handleCategory('${c.id}')">
        <span>${c.icon}</span> <span>${c.label}</span>
      </button>
    `).join('');
  },

  toggleFilterDrawer() {
    const drawer = document.getElementById('filter-drawer');
    if (drawer) {
      drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
    }
  },

  handleSearch(val) {
    this.state.search = val;
    this.debounceFetch();
  },

  handleCategory(cat) {
    this.state.category = cat;
    const chipsContainer = document.getElementById('category-chips');
    if (chipsContainer) chipsContainer.innerHTML = this.renderCategoryChips();
    this.fetchAndRenderTasks();
  },

  handleDifficulty(diff) {
    this.state.difficulty = diff;
    this.fetchAndRenderTasks();
  },

  handleSort(sort) {
    this.state.sortBy = sort;
    this.fetchAndRenderTasks();
  },

  handleMinBudget(val) {
    this.state.minBudget = val;
    this.fetchAndRenderTasks();
  },

  handleMaxBudget(val) {
    this.state.maxBudget = val;
    this.fetchAndRenderTasks();
  },

  debounceTimer: null,
  debounceFetch() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.fetchAndRenderTasks();
    }, 300);
  },

  async afterRender() {
    await this.fetchAndRenderTasks();
  },

  async fetchAndRenderTasks() {
    const container = document.getElementById('task-grid-container');
    if (!container) return;

    try {
      const params = {
        search: this.state.search,
        category: this.state.category,
        difficulty: this.state.difficulty,
        sort_by: this.state.sortBy,
        min_budget: this.state.minBudget || undefined,
        max_budget: this.state.maxBudget || undefined
      };

      const tasks = await API.getTasks(params);
      this.state.tasks = tasks;

      if (!tasks || tasks.length === 0) {
        container.innerHTML = `
          <div class="card" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
            <h3 style="margin-bottom: 8px;">No campus tasks match your search</h3>
            <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto 20px;">
              Try adjusting your search terms or category filters to find available student tasks.
            </p>
            <button class="btn btn-secondary" onclick="MarketplaceView.resetFilters()">Reset All Filters</button>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 16px; font-weight: 600;">
          Showing ${tasks.length} open campus task${tasks.length === 1 ? '' : 's'}
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px;">
          ${tasks.map(t => this.renderTaskCard(t)).join('')}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px 20px; color: var(--danger);">
          <p>Failed to load tasks: ${err.message}</p>
        </div>
      `;
    }
  },

  resetFilters() {
    this.state.search = '';
    this.state.category = 'all';
    this.state.difficulty = 'all';
    this.state.minBudget = '';
    this.state.maxBudget = '';
    this.state.sortBy = 'newest';
    const sInput = document.getElementById('market-search');
    if (sInput) sInput.value = '';
    const chipsContainer = document.getElementById('category-chips');
    if (chipsContainer) chipsContainer.innerHTML = this.renderCategoryChips();
    this.fetchAndRenderTasks();
  },

  renderTaskCard(t) {
    const user = API.getCurrentUser();
    const isJunior = user && user.role === 'junior';

    // Status badge
    let statusBadge = `<span class="badge badge-open">🟢 Open</span>`;
    if (t.is_urgent) {
      statusBadge = `<span class="badge badge-urgent">🔴 Urgent Deadline</span>`;
    } else if (t.applications_count >= 3) {
      statusBadge = `<span class="badge badge-warning">🟡 Almost Filled</span>`;
    }

    // Match badge for juniors
    let matchBadge = '';
    if (isJunior && t.match_score) {
      matchBadge = `<span class="badge badge-match">⚡ ${t.match_score}% Match</span>`;
    }

    // Budget display
    let budgetDetail = t.pages > 0 && t.rate_per_page > 0 
      ? `${t.pages} Pages × ₹${t.rate_per_page}/page`
      : 'Fixed Budget';

    return `
      <div class="task-card">
        <div>
          <div class="task-card-header">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${statusBadge}
              ${matchBadge}
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary);">
              ${t.difficulty}
            </span>
          </div>

          <div style="margin-top: 12px;">
            <a href="#task/${t.id}" class="task-card-title">${t.title}</a>
          </div>

          <div class="task-card-meta" style="margin-bottom: 12px;">
            <span>📚 ${t.subject}</span>
            <span>🏷️ ${t.category}</span>
            ${t.pages > 0 ? `<span>📄 ${t.pages} Pages</span>` : ''}
          </div>

          <p class="task-card-desc">${t.description}</p>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; font-size: 0.82rem; color: var(--text-secondary);">
            <span>Posted by <strong style="color: var(--text-primary);">${t.poster_anon_id}</strong> (⭐ ${t.poster_rating})</span>
            <span style="font-weight: 600; color: ${t.is_urgent ? 'var(--danger)' : t.is_warning ? 'var(--warning)' : 'var(--text-secondary)'};">
              ⏳ ${t.time_left_str}
            </span>
          </div>

          <div class="task-card-footer">
            <div class="task-budget-display">
              <span class="task-budget-amount">₹${Math.round(t.total_budget)}</span>
              <span class="task-budget-sub">${budgetDetail}</span>
            </div>

            <div style="display: flex; gap: 8px;">
              <a href="#task/${t.id}" class="btn btn-sm btn-secondary">View Task</a>
              <a href="#task/${t.id}?apply=1" class="btn btn-sm btn-primary">Apply</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
