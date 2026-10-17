/**
 * Offline Fallback View
 */
const OfflineView = {
  render() {
    return `
      <div class="offline-page" style="padding: 60px 0; text-align: center; max-width: 600px; margin: 0 auto;">
        <div class="card" style="padding: 40px 24px;">
          <div style="font-size: 3.5rem; margin-bottom: 16px;">📡</div>
          <h1 style="font-size: 1.8rem; margin-bottom: 12px;">You're Offline</h1>
          <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
            Some CampusTask features require an active campus Wi-Fi or cellular connection. Your previously loaded marketplace tasks and wallet records are still safely available in cache.
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="btn btn-primary" onclick="window.location.reload()">
              <span>🔄 Retry Connection</span>
            </button>
            <a href="#marketplace" class="btn btn-secondary">
              <span>View Cached Tasks</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }
};
