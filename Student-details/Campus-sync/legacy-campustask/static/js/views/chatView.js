/**
 * Anonymous Task Chat View
 */
const ChatView = {
  activeTaskId: null,
  activeTask: null,
  pollInterval: null,

  async render(params) {
    this.activeTaskId = params.task ? parseInt(params.task) : null;

    return `
      <div class="chat-page" style="padding: 20px 0;">
        <div class="chat-container">
          <!-- Left Sidebar: Conversations -->
          <div class="chat-sidebar" id="chat-conversations-sidebar">
            <div class="chat-sidebar-header">
              <span>💬 Campus Messages</span>
            </div>
            <div class="chat-conv-list" id="conversations-list">
              <div style="text-align: center; padding: 24px; color: var(--text-muted);">Loading chats...</div>
            </div>
          </div>

          <!-- Main Chat Panel -->
          <div class="chat-main" id="chat-main-panel">
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); flex-direction: column; gap: 12px;">
              <div style="font-size: 3rem;">💬</div>
              <p>Select a task conversation from the left to start anonymous chatting.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender(params) {
    this.activeTaskId = params.task ? parseInt(params.task) : null;
    await this.loadConversations();

    if (this.activeTaskId) {
      await this.openTaskChat(this.activeTaskId);
    }

    // Start live polling every 4 seconds for new incoming messages
    clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      if (this.activeTaskId && window.location.hash.startsWith('#chat')) {
        this.fetchMessagesSilently();
      }
    }, 4000);
  },

  async loadConversations() {
    const listEl = document.getElementById('conversations-list');
    if (!listEl) return;

    try {
      const convs = await API.getConversations();
      if (convs.length === 0) {
        listEl.innerHTML = `
          <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.88rem;">
            No active conversations yet. Chats open automatically once a task application is accepted.
          </div>
        `;
        return;
      }

      listEl.innerHTML = convs.map(c => `
        <div class="chat-conv-item ${c.task_id === this.activeTaskId ? 'active' : ''}" onclick="ChatView.openTaskChat(${c.task_id})">
          <div style="width: 40px; height: 40px; border-radius: var(--radius-full); background: var(--primary-gradient); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">
            ${c.other_role === 'senior' ? 'S' : 'J'}
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <span style="font-weight: 700; font-size: 0.92rem; color: var(--text-primary);">${c.other_anon_id}</span>
              ${c.unread_count > 0 ? `<span class="badge badge-urgent" style="padding: 2px 6px; font-size: 0.7rem;">${c.unread_count}</span>` : ''}
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${c.task_title}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px;">
              ${c.last_message || 'No messages yet'}
            </div>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.error(err);
    }
  },

  async openTaskChat(taskId) {
    this.activeTaskId = taskId;
    const panel = document.getElementById('chat-main-panel');
    if (!panel) return;

    try {
      this.activeTask = await API.getTask(taskId);
      const currentUser = API.getCurrentUser();
      const isPoster = currentUser && currentUser.id === this.activeTask.poster_id;
      const otherAnonId = isPoster ? (this.activeTask.junior_anon_id || 'Assigned Junior') : this.activeTask.poster_anon_id;
      const otherUserId = isPoster ? this.activeTask.assigned_junior_id : this.activeTask.poster_id;

      panel.innerHTML = `
        <!-- Chat Header -->
        <div class="chat-header">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 800; font-size: 1.1rem; color: var(--text-primary);">${otherAnonId}</span>
              <span class="badge badge-verified">✓ Campus Verified</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">
              Task: <a href="#task/${this.activeTask.id}" style="color: var(--primary); font-weight: 600;">${this.activeTask.title}</a> (₹${Math.round(this.activeTask.total_budget)})
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <a href="#task/${this.activeTask.id}" class="btn btn-sm btn-secondary">Task Details</a>
            <button class="btn btn-sm btn-danger" onclick="ChatView.reportUser(${otherUserId})">Report</button>
          </div>
        </div>

        <!-- Messages Flow -->
        <div class="chat-messages" id="chat-messages-flow">
          <div style="text-align: center; color: var(--text-muted); padding: 20px;">Loading messages...</div>
        </div>

        <!-- Message Input Form -->
        <form class="chat-input-area" onsubmit="ChatView.handleSendMessage(event, ${otherUserId})">
          <input type="file" id="chat-file-input" style="display: none;" onchange="ChatView.handleFileSelected(this)" />
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('chat-file-input').click()" title="Attach file or screenshot" style="padding: 10px 14px;">
            📎
          </button>
          <input type="text" id="chat-msg-input" class="form-input" placeholder="Type an anonymous message to ${otherAnonId}..." required autocomplete="off" />
          <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">
            <span>Send</span>
          </button>
        </form>
      `;

      await this.fetchMessagesSilently();
    } catch (err) {
      console.error(err);
      panel.innerHTML = `<div style="padding: 24px; color: var(--danger);">Failed to load chat: ${err.message}</div>`;
    }
  },

  async fetchMessagesSilently() {
    const flow = document.getElementById('chat-messages-flow');
    if (!flow || !this.activeTaskId) return;

    try {
      const messages = await API.getTaskMessages(this.activeTaskId);
      const currentUser = API.getCurrentUser();

      if (messages.length === 0) {
        flow.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 40px 20px;">
            <p>No messages yet. Send a message to coordinate task delivery.</p>
          </div>
        `;
        return;
      }

      flow.innerHTML = messages.map(m => {
        const isMine = currentUser && m.sender_id === currentUser.id;
        const timeStr = new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return `
          <div class="chat-bubble ${isMine ? 'chat-bubble-mine' : 'chat-bubble-theirs'}">
            <div style="font-size: 0.72rem; font-weight: 700; margin-bottom: 2px; opacity: 0.85;">
              ${isMine ? 'You' : m.sender_anon_id}
            </div>
            <div>${m.message}</div>
            ${m.attachment ? `
              <div style="margin-top: 8px; padding: 6px 10px; background: rgba(0,0,0,0.25); border-radius: var(--radius-sm); font-size: 0.8rem; display: flex; align-items: center; justify-content: space-between;">
                <span>📎 ${m.attachment}</span>
                <a href="/uploads/${m.attachment}" target="_blank" style="color: #fff; text-decoration: underline; margin-left: 8px;">Download</a>
              </div>
            ` : ''}
            <div class="chat-bubble-time">${timeStr} ${isMine && m.is_read ? '✓✓' : ''}</div>
          </div>
        `;
      }).join('');

      // Auto scroll to bottom
      flow.scrollTop = flow.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  },

  async handleSendMessage(e, receiverId) {
    e.preventDefault();
    const input = document.getElementById('chat-msg-input');
    const msg = input.value.trim();
    if (!msg) return;

    input.value = '';
    try {
      await API.sendMessage(this.activeTaskId, receiverId, msg);
      await this.fetchMessagesSilently();
      await this.loadConversations();
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  async handleFileSelected(fileInput) {
    if (fileInput.files.length === 0) return;
    const file = fileInput.files[0];

    try {
      API.showToast('Uploading attachment...', 'info');
      const uploadRes = await API.uploadFile(file);
      const currentUser = API.getCurrentUser();
      const isPoster = currentUser && currentUser.id === this.activeTask.poster_id;
      const otherUserId = isPoster ? this.activeTask.assigned_junior_id : this.activeTask.poster_id;

      await API.sendMessage(this.activeTaskId, otherUserId, `Sent an attachment: ${file.name}`, uploadRes.filename);
      fileInput.value = '';
      await this.fetchMessagesSilently();
      API.showToast('Attachment sent!', 'success');
    } catch (err) {
      API.showToast('Failed to upload file: ' + err.message, 'error');
    }
  },

  reportUser(userId) {
    const reason = prompt("Enter reason for reporting this user to campus administration:");
    if (!reason) return;

    API.raiseDispute(this.activeTaskId, 'Inappropriate behavior in chat', reason)
      .then(() => API.showToast('User reported to campus moderators.', 'info'))
      .catch(err => API.showToast(err.message, 'error'));
  }
};
