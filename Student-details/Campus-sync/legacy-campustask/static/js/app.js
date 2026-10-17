/**
 * CampusTask Master Application Router & State Manager
 */
const App = {
  routes: {
    'landing': LandingView,
    'marketplace': MarketplaceView,
    'task': TaskDetailView,
    'post-task': PostTaskView,
    'senior-dashboard': SeniorDashboardView,
    'junior-dashboard': JuniorDashboardView,
    'chat': ChatView,
    'wallet': WalletView,
    'admin-dashboard': AdminDashboardView,
    'profile': ProfileView,
    'notifications': NotificationsView,
    'login': AuthView,
    'register': AuthView,
    'offline': OfflineView
  },

  async init() {
    // 1. Initialize PWA
    PWA.init();

    // 2. Check current authenticated user
    const token = API.getToken();
    if (token) {
      try {
        await API.getMe();
      } catch {
        API.setToken(null);
        API.setCurrentUser(null);
      }
    }

    // 3. Render Header and Bottom Nav
    this.refreshHeader();
    this.refreshBottomNav();

    // 4. Setup Hash Change Listener
    window.addEventListener('hashchange', () => this.handleRouting());

    // 5. Initial Route dispatch
    const user = API.getCurrentUser();
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
      if (user) {
        window.location.hash = user.role === 'senior' ? '#senior-dashboard' : user.role === 'admin' ? '#admin-dashboard' : '#junior-dashboard';
      } else {
        window.location.hash = '#landing';
      }
    } else {
      this.handleRouting();
    }

    // 6. If visitor is not logged in, present the Onboarding Window asking for their details
    if (!user && (window.location.hash === '#landing' || window.location.hash === '' || window.location.hash === '#')) {
      setTimeout(() => {
        if (!API.getCurrentUser()) {
          AuthView.openModal('register');
        }
      }, 350);
    }

    // 7. Polling for unread notifications
    this.updateUnreadCount();
    setInterval(() => this.updateUnreadCount(), 15000);
  },

  async handleRouting() {
    const rawHash = window.location.hash.replace('#', '') || 'landing';
    const [pathWithQuery] = rawHash.split('?');
    const parts = pathWithQuery.split('/');
    const routeKey = parts[0] || 'landing';
    const paramId = parts[1] || null;

    // Parse query parameters
    const queryParams = {};
    if (rawHash.includes('?')) {
      const qs = rawHash.split('?')[1];
      new URLSearchParams(qs).forEach((v, k) => { queryParams[k] = v; });
    }

    const view = this.routes[routeKey] || LandingView;
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    window.scrollTo({ top: 0, behavior: 'instant' });

    // Render View HTML
    const params = { id: paramId, ...queryParams };
    if (routeKey === 'login') params.mode = 'login';
    if (routeKey === 'register') params.mode = 'register';

    appRoot.innerHTML = await view.render(params);

    // Call afterRender hook if available
    if (view.afterRender) {
      await view.afterRender(params);
    }

    this.refreshHeader();
    this.refreshBottomNav();
    this.updateUnreadCount();
  },

  refreshHeader() {
    const headerEl = document.getElementById('site-header-slot');
    if (!headerEl) return;

    const user = API.getCurrentUser();
    const currentHash = window.location.hash || '#landing';

    let navLinksHtml = `
      <a href="#marketplace" class="nav-link ${currentHash.startsWith('#marketplace') ? 'active' : ''}">
        <span>🔍 Tasks</span>
      </a>
    `;

    if (user) {
      if (user.role === 'senior') {
        navLinksHtml = `
          <a href="#senior-dashboard" class="nav-link ${currentHash.startsWith('#senior-dashboard') ? 'active' : ''}">
            <span>Dashboard</span>
          </a>
          <a href="#marketplace" class="nav-link ${currentHash.startsWith('#marketplace') ? 'active' : ''}">
            <span>Marketplace</span>
          </a>
          <a href="#post-task" class="nav-link ${currentHash.startsWith('#post-task') ? 'active' : ''}">
            <span>+ Post Task</span>
          </a>
          <a href="#chat" class="nav-link ${currentHash.startsWith('#chat') ? 'active' : ''}">
            <span>Messages</span>
          </a>
          <a href="#wallet" class="nav-link ${currentHash.startsWith('#wallet') ? 'active' : ''}">
            <span>Wallet (₹${Math.round(user.wallet_balance || 0)})</span>
          </a>
        `;
      } else if (user.role === 'junior') {
        navLinksHtml = `
          <a href="#junior-dashboard" class="nav-link ${currentHash.startsWith('#junior-dashboard') ? 'active' : ''}">
            <span>Earnings Hub</span>
          </a>
          <a href="#marketplace" class="nav-link ${currentHash.startsWith('#marketplace') ? 'active' : ''}">
            <span>Browse Tasks</span>
          </a>
          <a href="#chat" class="nav-link ${currentHash.startsWith('#chat') ? 'active' : ''}">
            <span>Messages</span>
          </a>
          <a href="#wallet" class="nav-link ${currentHash.startsWith('#wallet') ? 'active' : ''}">
            <span>Wallet (₹${Math.round(user.wallet_balance || 0)})</span>
          </a>
        `;
      } else if (user.role === 'admin') {
        navLinksHtml = `
          <a href="#admin-dashboard" class="nav-link ${currentHash.startsWith('#admin-dashboard') ? 'active' : ''}">
            <span>Admin Console</span>
          </a>
          <a href="#marketplace" class="nav-link ${currentHash.startsWith('#marketplace') ? 'active' : ''}">
            <span>Marketplace</span>
          </a>
          <a href="#wallet" class="nav-link ${currentHash.startsWith('#wallet') ? 'active' : ''}">
            <span>Platform Volume</span>
          </a>
        `;
      }
    }

    headerEl.innerHTML = `
      <header class="site-header">
        <div class="container header-container">
          <!-- Logo Brand -->
          <a href="${user ? (user.role === 'senior' ? '#senior-dashboard' : user.role === 'admin' ? '#admin-dashboard' : '#junior-dashboard') : '#landing'}" class="logo-brand">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
            </div>
            <span>Campus<span style="color: var(--primary);">Task</span></span>
          </a>

          <!-- Navigation Links -->
          <nav class="nav-links">
            ${navLinksHtml}
          </nav>

          <!-- Header Actions -->
          <div class="header-actions">
            <!-- Quick Demo Sandbox Switcher Dropdown -->
            <button class="demo-switcher-pill" onclick="App.openDemoSwitcherModal()" title="1-Click Role Switcher for Hackathon Testing">
              <div class="demo-avatar">${user ? (user.role === 'senior' ? 'S' : user.role === 'admin' ? 'A' : 'J') : '⚡'}</div>
              <span>${user ? user.anonymous_id : 'Demo Sandbox'}</span>
              <span style="font-size: 0.7rem; opacity: 0.8;">▼</span>
            </button>

            ${user ? `
              <!-- Notifications Bell -->
              <a href="#notifications" class="notif-btn" title="Campus Notifications">
                <span>🔔</span>
                <span id="header-notif-badge" class="notif-badge-count" style="display: none;">0</span>
              </a>

              <!-- User Profile Dropdown Pill -->
              <a href="#profile" class="btn btn-sm btn-secondary" title="View Verified Profile">
                <span>👤 Profile</span>
              </a>

              <button class="btn btn-sm btn-secondary" onclick="API.logout()" title="Logout">
                <span>Log Out</span>
              </button>
            ` : `
              <button class="btn btn-sm btn-secondary" onclick="AuthView.openModal('login')">Sign In</button>
              <button class="btn btn-sm btn-primary" onclick="AuthView.openModal('register')">Join Campus</button>
            `}
          </div>
        </div>
      </header>
    `;
  },

  refreshBottomNav() {
    const navEl = document.getElementById('bottom-nav-slot');
    if (!navEl) return;

    const user = API.getCurrentUser();
    const currentHash = window.location.hash || '#landing';

    const homeTarget = user ? (user.role === 'senior' ? '#senior-dashboard' : user.role === 'admin' ? '#admin-dashboard' : '#junior-dashboard') : '#landing';

    navEl.innerHTML = `
      <nav class="bottom-nav">
        <a href="${homeTarget}" class="bottom-nav-item ${currentHash.includes('dashboard') || currentHash === '#landing' ? 'active' : ''}">
          <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span>Home</span>
        </a>
        <a href="#marketplace" class="bottom-nav-item ${currentHash.startsWith('#marketplace') ? 'active' : ''}">
          <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
          <span>Tasks</span>
        </a>
        <a href="${user && user.role === 'senior' ? '#post-task' : '#wallet'}" class="bottom-nav-item ${currentHash.startsWith('#post-task') ? 'active' : ''}">
          <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          <span>${user && user.role === 'senior' ? 'Post' : 'Earn'}</span>
        </a>
        <a href="#chat" class="bottom-nav-item ${currentHash.startsWith('#chat') ? 'active' : ''}">
          <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
          <span>Chat</span>
        </a>
        <a href="#wallet" class="bottom-nav-item ${currentHash.startsWith('#wallet') ? 'active' : ''}">
          <svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
          <span>Wallet</span>
        </a>
      </nav>
    `;
  },

  async updateUnreadCount() {
    const badge = document.getElementById('header-notif-badge');
    if (!badge || !API.getToken()) return;

    try {
      const res = await API.getNotifications();
      if (res.unread_count > 0) {
        badge.textContent = res.unread_count;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    } catch {
      badge.style.display = 'none';
    }
  },

  openModal(contentHtml) {
    let overlay = document.getElementById('app-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'app-modal-overlay';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = `<div class="modal-content">${contentHtml}</div>`;
    overlay.classList.add('open');
    overlay.onclick = (e) => {
      if (e.target === overlay) this.closeModal();
    };
  },

  closeModal() {
    const overlay = document.getElementById('app-modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
    }
  },

  async openDemoSwitcherModal() {
    try {
      const demoUsers = await API.getDemoUsers();
      this.openModal(`
        <div class="modal-header">
          <div>
            <h3 style="font-size: 1.25rem;">⚡ Instant Demo Role Switcher</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">Switch active testing identity with 1-click (no passwords needed).</p>
          </div>
          <button class="modal-close" onclick="App.closeModal()">&times;</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px; max-height: 420px; overflow-y: auto;">
          ${demoUsers.map(u => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: var(--transition);" onclick="App.switchDemoUser(${u.id})">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-weight: 700; color: var(--text-primary); font-size: 1rem;">${u.anonymous_id}</span>
                  <span class="badge ${u.role === 'senior' ? 'badge-assigned' : u.role === 'admin' ? 'badge-urgent' : 'badge-match'}">${u.role.toUpperCase()}</span>
                  <span style="font-size: 0.8rem; color: #d97706; font-weight: 600;">⭐ ${u.rating}</span>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 3px;">
                  ${u.branch} &bull; Year ${u.year} &bull; Balance: <strong style="color:var(--success);">₹${Math.round(u.wallet_balance)}</strong>
                </div>
              </div>
              <button class="btn btn-sm btn-primary">Switch</button>
            </div>
          `).join('')}
        </div>
      `);
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  async switchDemoUser(userId) {
    try {
      const res = await API.switchDemoUser(userId);
      this.closeModal();
      API.showToast(`Switched to ${res.user.anonymous_id} (${res.user.role.toUpperCase()})`, 'success');
      this.refreshHeader();
      this.refreshBottomNav();
      if (res.user.role === 'senior') window.location.hash = '#senior-dashboard';
      else if (res.user.role === 'admin') window.location.hash = '#admin-dashboard';
      else window.location.hash = '#junior-dashboard';
      window.location.reload();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  }
};

// Global Boot
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
