/**
 * CampusTask API Client Wrapper
 */
const API = {
  baseUrl: '',

  getToken() {
    return localStorage.getItem('campustask_token');
  },

  setToken(token) {
    if (token) {
      localStorage.setItem('campustask_token', token);
    } else {
      localStorage.removeItem('campustask_token');
    }
  },

  getCurrentUser() {
    try {
      const u = localStorage.getItem('campustask_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem('campustask_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campustask_user');
    }
  },

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (response.status === 401) {
        // Clear expired session
        this.setToken(null);
        this.setCurrentUser(null);
        if (window.location.hash !== '#login' && window.location.hash !== '#landing') {
          API.showToast('Session expired. Please log in.', 'error');
        }
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || data.message || 'An error occurred.');
      }
      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  },

  // Auth Endpoints
  async register(formData) {
    const res = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    this.setToken(res.token);
    this.setCurrentUser(res.user);
    return res;
  },

  async login(identifier, password) {
    const res = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ college_email: identifier, username: identifier, password })
    });
    this.setToken(res.token);
    this.setCurrentUser(res.user);
    return res;
  },

  async getMe() {
    const user = await this.request('/api/auth/me');
    this.setCurrentUser(user);
    return user;
  },

  async updateProfile(updates) {
    const user = await this.request('/api/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
    this.setCurrentUser(user);
    return user;
  },

  async getDemoUsers() {
    return await this.request('/api/auth/demo-users');
  },

  async switchDemoUser(userId) {
    const res = await this.request(`/api/auth/switch-demo/${userId}`, { method: 'POST' });
    this.setToken(res.token);
    this.setCurrentUser(res.user);
    return res;
  },

  logout() {
    this.setToken(null);
    this.setCurrentUser(null);
    window.location.hash = '#landing';
    window.location.reload();
  },

  // Task Endpoints
  async getTasks(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, v);
      }
    });
    return await this.request(`/api/tasks?${query.toString()}`);
  },

  async getTask(id) {
    return await this.request(`/api/tasks/${id}`);
  },

  async createTask(taskData) {
    return await this.request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
  },

  async cancelTask(id) {
    return await this.request(`/api/tasks/${id}/cancel`, { method: 'POST' });
  },

  // Applications
  async applyForTask(applicationData) {
    return await this.request('/api/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData)
    });
  },

  async getTaskApplications(taskId) {
    return await this.request(`/api/applications/task/${taskId}`);
  },

  async decideApplication(applicationId, decision) {
    return await this.request('/api/applications/decision', {
      method: 'POST',
      body: JSON.stringify({ application_id: applicationId, decision })
    });
  },

  async getMyApplications() {
    return await this.request('/api/applications/my-applications');
  },

  // Chat
  async getTaskMessages(taskId) {
    return await this.request(`/api/messages/task/${taskId}`);
  },

  async sendMessage(taskId, receiverId, message, attachment = null) {
    return await this.request('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ task_id: taskId, receiver_id: receiverId, message, attachment })
    });
  },

  async getConversations() {
    return await this.request('/api/messages/conversations');
  },

  // Submissions & Approvals
  async submitWork(taskId, submissionNote, submissionFile = null) {
    return await this.request('/api/submissions/submit', {
      method: 'POST',
      body: JSON.stringify({ task_id: taskId, submission_note: submissionNote, submission_file: submissionFile })
    });
  },

  async approveTask(taskId) {
    return await this.request(`/api/submissions/approve/${taskId}`, { method: 'POST' });
  },

  async requestRevision(taskId) {
    return await this.request(`/api/submissions/request-revision/${taskId}`, { method: 'POST' });
  },

  // Wallet
  async getWalletSummary() {
    return await this.request('/api/wallet/summary');
  },

  async getTransactions() {
    return await this.request('/api/wallet/transactions');
  },

  async walletAction(action, amount, note = '') {
    return await this.request('/api/wallet/action', {
      method: 'POST',
      body: JSON.stringify({ action, amount: parseFloat(amount), note })
    });
  },

  // Reviews
  async createReview(taskId, rating, comment = '') {
    return await this.request('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ task_id: taskId, rating: parseInt(rating), comment })
    });
  },

  async getUserReviews(userId) {
    return await this.request(`/api/reviews/user/${userId}`);
  },

  // Notifications
  async getNotifications() {
    return await this.request('/api/notifications');
  },

  async markNotificationRead(notifId) {
    return await this.request(`/api/notifications/${notifId}/read`, { method: 'POST' });
  },

  async markAllNotificationsRead() {
    return await this.request('/api/notifications/read-all', { method: 'POST' });
  },

  // Disputes
  async raiseDispute(taskId, reason, description, evidenceFile = null) {
    return await this.request('/api/disputes', {
      method: 'POST',
      body: JSON.stringify({ task_id: taskId, reason, description, evidence_file: evidenceFile })
    });
  },

  async getDisputes() {
    return await this.request('/api/disputes');
  },

  async resolveDispute(disputeId, action, adminNotes = '') {
    return await this.request('/api/disputes/resolve', {
      method: 'POST',
      body: JSON.stringify({ dispute_id: disputeId, action, admin_notes: adminNotes })
    });
  },

  // Admin
  async getAdminStats() {
    return await this.request('/api/admin/stats');
  },

  async getAdminUsers() {
    return await this.request('/api/admin/users');
  },

  async updateAdminUserStatus(userId, status) {
    return await this.request('/api/admin/users/status', {
      method: 'PATCH',
      body: JSON.stringify({ user_id: userId, status })
    });
  },

  async removeAdminTask(taskId) {
    return await this.request(`/api/admin/tasks/${taskId}`, { method: 'DELETE' });
  },

  // File Upload Helper
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.getToken();
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers,
      body: formData
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'File upload failed.');
    }
    return data;
  },

  // UI Toast Helper
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>${icon}</span>
        <span>${message}</span>
      </div>
      <button onclick="this.parentElement.remove()" style="opacity:0.6; cursor:pointer; font-size:1.1rem;">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4500);
  }
};
