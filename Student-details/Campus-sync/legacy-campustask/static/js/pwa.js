/**
 * CampusTask PWA Manager
 */
const PWA = {
  deferredPrompt: null,

  init() {
    // 1. Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('[CampusTask PWA] Service Worker registered:', registration.scope);
          })
          .catch((err) => {
            console.error('[CampusTask PWA] SW registration failed:', err);
          });
      });
    }

    // 2. Intercept BeforeInstallPrompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.renderInstallBanner();
    });

    // 3. Online / Offline listeners
    window.addEventListener('online', () => {
      API.showToast('Back online! Live campus marketplace reconnected.', 'success');
      const offlineBanner = document.getElementById('offline-indicator');
      if (offlineBanner) offlineBanner.remove();
    });

    window.addEventListener('offline', () => {
      API.showToast('You are currently offline. Viewing cached tasks.', 'info');
      this.renderOfflineIndicator();
    });

    // Initial check
    if (!navigator.onLine) {
      this.renderOfflineIndicator();
    }
  },

  renderInstallBanner() {
    const bannerContainer = document.getElementById('pwa-banner-slot');
    if (!bannerContainer || document.getElementById('pwa-install-card')) return;

    bannerContainer.innerHTML = `
      <div id="pwa-install-card" class="pwa-install-banner">
        <div class="pwa-install-left">
          <div class="pwa-install-icon">⚡</div>
          <div>
            <div style="font-weight: 700; font-size: 1.05rem; color: #fff;">Install CampusTask App</div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Add to your home screen for quick offline access and instant notifications.</div>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-secondary" onclick="document.getElementById('pwa-install-card').remove()">Dismiss</button>
          <button class="btn btn-sm btn-primary" onclick="PWA.promptInstall()">Install App</button>
        </div>
      </div>
    `;
  },

  async promptInstall() {
    if (!this.deferredPrompt) {
      API.showToast('To install CampusTask on iOS, tap Share → "Add to Home Screen".', 'info');
      return;
    }
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('[CampusTask PWA] User accepted install prompt');
      const card = document.getElementById('pwa-install-card');
      if (card) card.remove();
    }
    this.deferredPrompt = null;
  },

  renderOfflineIndicator() {
    if (document.getElementById('offline-indicator')) return;
    const indicator = document.createElement('div');
    indicator.id = 'offline-indicator';
    indicator.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
      background: #ef4444; color: white; text-align: center;
      padding: 6px 12px; font-size: 0.82rem; font-weight: 600;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    `;
    indicator.innerHTML = `
      <span>📡 Offline Mode</span> — <span>Displaying cached marketplace tasks. Changes will sync when reconnected.</span>
    `;
    document.body.prepend(indicator);
  }
};
