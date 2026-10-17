/**
 * Authentication View (Registration with 8 Mandatory Details & Login for Existing Users)
 * Dark Midnight Study Theme
 */
const AuthView = {
  mode: 'register', // 'register' by default for new visitors, 'login' for existing

  render(params) {
    if (params && params.mode) {
      this.mode = params.mode;
    }

    return `
      <div class="auth-page" style="padding: 32px 0; max-width: 620px; margin: 0 auto;">
        
        <!-- Header Brand Icon & Titles -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div class="logo-icon" style="margin: 0 auto 12px; width: 48px; height: 48px; background: var(--primary-gradient); box-shadow: var(--shadow-glow);">
            <svg viewBox="0 0 24 24" fill="#ffffff" width="26" height="26"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.02em;">
            ${this.mode === 'login' ? 'Welcome Back to CampusTask' : 'Join CampusTask Study Network'}
          </h1>
          <p style="color: var(--text-secondary); font-size: 0.92rem; max-width: 440px; margin: 0 auto;">
            ${this.mode === 'login' 
              ? 'Sign in to access your open study tasks, messages, and earnings.' 
              : 'Enter your student credentials below to unlock anonymous peer study assistance.'}
          </p>
        </div>

        <!-- Glassmorphic Auth Card -->
        <div class="card" style="padding: 30px; background: rgba(17, 24, 39, 0.88); backdrop-filter: blur(20px); border: 1px solid var(--border-glass); box-shadow: var(--shadow-lg);">
          
          <!-- Mode Switcher Tabs -->
          <div style="display: flex; gap: 6px; margin-bottom: 24px; background: var(--bg-surface); padding: 5px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <button 
              type="button"
              class="btn btn-sm ${this.mode === 'register' ? 'btn-primary' : ''}" 
              style="flex: 1; border: none; font-weight: 700; ${this.mode !== 'register' ? 'color: var(--text-secondary);' : ''}" 
              onclick="AuthView.switchMode('register')"
            >
              ✨ Sign Up (New Student)
            </button>
            <button 
              type="button"
              class="btn btn-sm ${this.mode === 'login' ? 'btn-primary' : ''}" 
              style="flex: 1; border: none; font-weight: 700; ${this.mode !== 'login' ? 'color: var(--text-secondary);' : ''}" 
              onclick="AuthView.switchMode('login')"
            >
              🔑 Log In (Existing User)
            </button>
          </div>

          <!-- Active Form -->
          ${this.mode === 'login' ? this.renderLoginForm() : this.renderRegisterForm()}
        </div>

        <!-- Instant Demo Preview Bar for Evaluators -->
        <div class="card" style="margin-top: 20px; padding: 16px 20px; text-align: center; background: rgba(99, 102, 241, 0.08); border: 1px dashed rgba(99, 102, 241, 0.35);">
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 8px;">
            <span>⚡ Evaluator Quick Logins (No Password Needed)</span>
          </div>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-sm btn-primary" onclick="App.switchDemoUser(2)">Senior #A482 (Poster)</button>
            <button class="btn btn-sm btn-success" onclick="App.switchDemoUser(7)">Junior #J194 (Earner)</button>
            <button class="btn btn-sm btn-secondary" onclick="App.switchDemoUser(1)">Admin Console</button>
          </div>
        </div>

      </div>
    `;
  },

  /**
   * Render Sign In Form for Existing Users
   */
  renderLoginForm() {
    return `
      <form onsubmit="AuthView.handleLogin(event)" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group">
          <label class="form-label" for="login-identifier">
            <span>Username or College Email *</span>
          </label>
          <input 
            type="text" 
            id="login-identifier" 
            class="form-input" 
            placeholder="e.g. arjun_das or student@campus.edu" 
            required 
            value="aravind.k@campus.edu" 
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label class="form-label" for="login-password" style="margin-bottom: 0;">
              <span>Password *</span>
            </label>
          </div>
          <input 
            type="password" 
            id="login-password" 
            class="form-input" 
            placeholder="••••••••" 
            required 
            value="password123" 
            autocomplete="current-password"
          />
        </div>

        <button type="submit" class="btn btn-lg btn-primary" style="width: 100%; margin-top: 8px; box-shadow: var(--shadow-glow);">
          <span>Sign In to Campus</span>
          <span>→</span>
        </button>

        <div style="text-align: center; margin-top: 10px; font-size: 0.88rem; color: var(--text-secondary);">
          Don't have an account yet? 
          <a href="javascript:void(0)" onclick="AuthView.switchMode('register')" style="color: var(--primary); font-weight: 700; text-decoration: underline;">
            Sign Up here
          </a>
        </div>
      </form>
    `;
  },

  /**
   * Render 8-Field Registration Form for New Users
   * Required fields: Name, Branch, Phone Number, Registration Number, Year, Email, Username, Password
   */
  renderRegisterForm() {
    return `
      <form onsubmit="AuthView.handleRegister(event)" style="display: flex; flex-direction: column; gap: 16px;">
        
        <!-- Row 1: Full Name & Username -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
          <div class="form-group">
            <label class="form-label" for="reg-name">
              <span>1. Full Name *</span>
            </label>
            <input 
              type="text" 
              id="reg-name" 
              class="form-input" 
              placeholder="e.g. Rahul Sharma" 
              required 
              autocomplete="name"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="reg-username">
              <span>2. Username (Public Handle) *</span>
            </label>
            <input 
              type="text" 
              id="reg-username" 
              class="form-input" 
              placeholder="e.g. CodeNinja, LatexPro" 
              required 
              autocomplete="username"
            />
          </div>
        </div>

        <!-- Row 2: College Email & Phone Number -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
          <div class="form-group">
            <label class="form-label" for="reg-email">
              <span>3. College Email Address *</span>
            </label>
            <input 
              type="email" 
              id="reg-email" 
              class="form-input" 
              placeholder="e.g. rahul.s@campus.edu" 
              required 
              autocomplete="email"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="reg-phone">
              <span>4. Phone Number *</span>
            </label>
            <input 
              type="tel" 
              id="reg-phone" 
              class="form-input" 
              placeholder="e.g. +91 98765 43210" 
              required 
              autocomplete="tel"
            />
          </div>
        </div>

        <!-- Row 3: Registration / Roll No & Branch -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
          <div class="form-group">
            <label class="form-label" for="reg-student-id">
              <span>5. Registration / Roll Number *</span>
            </label>
            <input 
              type="text" 
              id="reg-student-id" 
              class="form-input" 
              placeholder="e.g. 2024CS0194" 
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="reg-branch">
              <span>6. Department / Branch *</span>
            </label>
            <select id="reg-branch" class="form-select" required>
              <option value="" disabled selected>Select your branch</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Electrical & Electronics">Electrical & Electronics</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Data Science & AI">Data Science & AI</option>
              <option value="Management & Commerce">Management & Commerce</option>
              <option value="Other Department">Other Department</option>
            </select>
          </div>
        </div>

        <!-- Row 4: Academic Year & Password -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
          <div class="form-group">
            <label class="form-label" for="reg-year">
              <span>7. Academic Year *</span>
            </label>
            <select id="reg-year" class="form-select" required onchange="AuthView.handleYearChange(this.value)">
              <option value="1">1st Year (Junior Earner)</option>
              <option value="2">2nd Year (Junior Earner)</option>
              <option value="3" selected>3rd Year (Senior Requester)</option>
              <option value="4">4th Year (Senior Requester)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="reg-password">
              <span>8. Create Password *</span>
            </label>
            <input 
              type="password" 
              id="reg-password" 
              class="form-input" 
              placeholder="Min 6 characters" 
              minlength="6" 
              required 
              autocomplete="new-password"
            />
          </div>
        </div>

        <!-- Role Guidance Card -->
        <div id="role-guidance-box" style="padding: 12px 14px; background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-sm); font-size: 0.82rem; color: #c7d2fe; line-height: 1.45;">
          🛡️ <strong>Privacy Protection:</strong> Your real name, phone number, and roll number remain private for college admin verification. Only your chosen <strong>Username</strong> is displayed publicly on tasks and messages.
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-lg btn-success" style="width: 100%; margin-top: 4px; box-shadow: var(--shadow-sm);">
          <span>✓ Complete Registration & Enter Campus</span>
        </button>

        <!-- Toggle to Login for existing users -->
        <div style="text-align: center; margin-top: 6px; font-size: 0.88rem; color: var(--text-secondary);">
          Already have an account? 
          <a href="javascript:void(0)" onclick="AuthView.switchMode('login')" style="color: var(--primary); font-weight: 700; text-decoration: underline;">
            Log In instead
          </a>
        </div>
      </form>
    `;
  },

  handleYearChange(yearVal) {
    const box = document.getElementById('role-guidance-box');
    if (!box) return;
    const year = parseInt(yearVal);
    if (year <= 2) {
      box.innerHTML = `🎯 <strong>Junior Role:</strong> As a Year ${year} student, your profile will be configured to browse open tasks, apply for assignments/PPTs, and earn flexible income.`;
    } else {
      box.innerHTML = `👤 <strong>Senior Role:</strong> As a Year ${year} student, your profile will be configured to post tasks, set page budgets, and coordinate deliverables.`;
    }
  },

  switchMode(mode) {
    this.mode = mode;
    // If we're inside a modal, re-render modal content
    const modalContent = document.querySelector('.auth-modal-wrapper');
    if (modalContent) {
      modalContent.innerHTML = this.renderModalContent();
      return;
    }

    // Otherwise re-render full auth page
    const card = document.querySelector('.auth-page');
    if (card) {
      card.outerHTML = this.render({ mode });
    } else {
      window.location.hash = `#${mode}`;
    }
  },

  /**
   * Open as a floating Onboarding / Auth Modal Window
   */
  openModal(initialMode = 'register') {
    this.mode = initialMode;
    App.openModal(`
      <div class="auth-modal-wrapper" style="width: 100%;">
        ${this.renderModalContent()}
      </div>
    `);
  },

  renderModalContent() {
    return `
      <div class="modal-header" style="margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="logo-icon" style="width: 38px; height: 38px; background: var(--primary-gradient);">
            <svg viewBox="0 0 24 24" fill="#ffffff" width="20" height="20"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
          </div>
          <div>
            <h3 style="font-size: 1.25rem; margin: 0; font-weight: 800;">
              ${this.mode === 'login' ? 'Student Sign In' : 'New Student Onboarding'}
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">
              ${this.mode === 'login' ? 'Enter your credentials to continue' : 'Please fill in your details to enter the campus study marketplace'}
            </p>
          </div>
        </div>
        <button class="modal-close" onclick="App.closeModal()">&times;</button>
      </div>

      <!-- Mode Switcher Tabs -->
      <div style="display: flex; gap: 6px; margin-bottom: 20px; background: var(--bg-surface); padding: 4px; border-radius: var(--radius-md);">
        <button 
          type="button"
          class="btn btn-sm ${this.mode === 'register' ? 'btn-primary' : ''}" 
          style="flex: 1; border: none; font-weight: 700; ${this.mode !== 'register' ? 'color: var(--text-secondary);' : ''}" 
          onclick="AuthView.switchMode('register')"
        >
          ✨ Sign Up
        </button>
        <button 
          type="button"
          class="btn btn-sm ${this.mode === 'login' ? 'btn-primary' : ''}" 
          style="flex: 1; border: none; font-weight: 700; ${this.mode !== 'login' ? 'color: var(--text-secondary);' : ''}" 
          onclick="AuthView.switchMode('login')"
        >
          🔑 Log In
        </button>
      </div>

      ${this.mode === 'login' ? this.renderLoginForm() : this.renderRegisterForm()}
    `;
  },

  async handleLogin(e) {
    e.preventDefault();
    const identifierInput = document.getElementById('login-identifier');
    const pwdInput = document.getElementById('login-password');
    if (!identifierInput || !pwdInput) return;

    const identifier = identifierInput.value.trim();
    const pwd = pwdInput.value;

    if (!identifier || !pwd) {
      API.showToast('Please enter your username/email and password.', 'error');
      return;
    }

    try {
      const res = await API.login(identifier, pwd);
      App.closeModal();
      API.showToast(`Welcome back, ${res.user.anonymous_id}!`, 'success');
      App.refreshHeader();
      App.refreshBottomNav();
      
      if (res.user.role === 'senior') window.location.hash = '#senior-dashboard';
      else if (res.user.role === 'admin') window.location.hash = '#admin-dashboard';
      else window.location.hash = '#junior-dashboard';
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  async handleRegister(e) {
    e.preventDefault();
    
    // 8 Required Fields
    const name = (document.getElementById('reg-name')?.value || '').trim();
    const username = (document.getElementById('reg-username')?.value || '').trim();
    const college_email = (document.getElementById('reg-email')?.value || '').trim();
    const phone = (document.getElementById('reg-phone')?.value || '').trim();
    const student_id = (document.getElementById('reg-student-id')?.value || '').trim();
    const branch = (document.getElementById('reg-branch')?.value || '').trim();
    const year = parseInt(document.getElementById('reg-year')?.value || '1');
    const password = document.getElementById('reg-password')?.value || '';

    // Validation
    if (!name || !username || !college_email || !phone || !student_id || !branch || !password) {
      API.showToast('Please fill in all 8 required fields.', 'error');
      return;
    }

    const role = year >= 3 ? 'senior' : 'junior';

    try {
      const res = await API.register({
        name,
        username,
        college_email,
        phone,
        student_id,
        branch,
        year,
        password,
        role
      });

      App.closeModal();
      API.showToast(`Welcome to CampusTask! Account created as ${res.user.anonymous_id}.`, 'success');
      App.refreshHeader();
      App.refreshBottomNav();

      if (role === 'senior') window.location.hash = '#senior-dashboard';
      else window.location.hash = '#junior-dashboard';
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  }
};
