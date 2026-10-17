/**
 * Notification Center View
 */
const NotificationsView = {
  notifications: [],

  async render() {
    return `
      <div class="notifs-page" style="padding: 24px 0; max-width: 800px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.85rem; margin-bottom: 4px;">Notification Center</h1>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">Real-time campus task updates, messages, and wallet alerts.</p>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="NotificationsView.markAllRead()">
            <span>✓ Mark All as Read</span>
          </button>
        </div>

        <div class="card" id="notifs-container" style="padding: 20px;">
          <div style="text-align: center; padding: 40px; color: var(--text-muted);">Loading notifications...</div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    await this.loadNotifications();
  },

  async loadNotifications() {
    const container = document.getElementById('notifs-container');
    if (!container) return;

    try {
      const res = await API.getNotifications();
      this.notifications = res.notifications || [];

      if (this.notifications.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🔔</div>
            <p>You have no notifications yet.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${this.notifications.map(n => {
            let icon = '🔔';
            if (n.type === 'acceptance') icon = '🎉';
            if (n.type === 'payment') icon = '💰';
            if (n.type === 'chat') icon = '💬';
            if (n.type === 'submission') icon = '📁';
            if (n.type === 'deadline') icon = '⏳';

            const timeStr = new Date(n.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

            return `
              <div style="background: ${n.read ? 'var(--bg-surface)' : 'rgba(124, 58, 237, 0.08)'}; border: 1px solid ${n.read ? 'var(--border-subtle)' : 'rgba(124, 58, 237, 0.25)'}; border-radius: var(--radius-md); padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <span style="font-size: 1.4rem; margin-top: 2px;">${icon}</span>
                  <div>
                    <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${n.title}</div>
                    <div style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 2px;">${n.message}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">${timeStr}</div>
                  </div>
                </div>

                <div style="display: flex; gap: 8px;">
                  ${n.link_task_id ? `
                    <a href="#task/${n.link_task_id}" class="btn btn-sm btn-primary" onclick="API.markNotificationRead(${n.id})">View</a>
                  ` : ''}
                  ${!n.read ? `
                    <button class="btn btn-sm btn-secondary" onclick="NotificationsView.markSingleRead(${n.id})">✓</button>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div style="color:var(--danger);">${err.message}</div>`;
    }
  },

  async markSingleRead(id) {
    try {
      await API.markNotificationRead(id);
      await this.loadNotifications();
      App.updateUnreadCount();
    } catch (err) {
      console.error(err);
    }
  },

  async markAllRead() {
    try {
      await API.markAllNotificationsRead();
      await this.loadNotifications();
      App.updateUnreadCount();
      API.showToast('All notifications marked as read.', 'success');
    } catch (err) {
      console.error(err);
    }
  }
};
