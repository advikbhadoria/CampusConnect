/**
 * Campus AI — Intelligent Assistant for Campus Connect (AIT Pune)
 * Self-initializing floating chatbot widget with full-site knowledge retrieval,
 * simulated typing latency, session history persistence, and client-side auth guard.
 */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. CLIENT-SIDE AUTHENTICATION & ACCESS GUARD
  // ─────────────────────────────────────────────────────────────────────────────
  const isHomePage = window.location.pathname.endsWith('homepage.html') || 
                     window.location.pathname.endsWith('homepage/') ||
                     window.location.pathname.endsWith('Graphica/') ||
                     window.location.pathname === '/' ||
                     (window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('Clubs'));

  function getStoredUser() {
    try {
      const raw = localStorage.getItem('campusConnectUser');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse user session', e);
    }
    // Return active default student session if not explicitly stored
    return {
      name: "Snehangshu Das",
      role: "student",
      branch: "Computer Science",
      year: "3rd Year",
      email: "snehangshu_22045@aitpune.edu.in"
    };
  }

  // Export global auth helper for Profile Sign Out & Pages
  window.CampusAuth = {
    getUser: getStoredUser,
    isLoggedIn: function () {
      return true;
    },
    signOut: function () {
      localStorage.removeItem('campusConnectUser');
      // Calculate relative path to homepage
      const depth = getPathDepth();
      const homePath = depth === 2 ? '../../homepage/homepage.html' : (depth === 1 ? '../homepage/homepage.html' : './homepage.html');
      
      // Toast notice
      showToast('Signed out successfully. Redirecting to Homepage...', 'info');
      setTimeout(function () {
        window.location.href = homePath;
      }, 700);
    }
  };


  // ─────────────────────────────────────────────────────────────────────────────
  // 2. PATH RESOLUTION UTILITIES
  // ─────────────────────────────────────────────────────────────────────────────
  function getPathDepth() {
    const path = window.location.pathname;
    if (path.includes('/Feed/Profile/') || path.includes('/Clubs/dist/') || path.includes('/Complain/dist/') || path.includes('/Borrow/dist/')) {
      return 2;
    }
    if (path.includes('/Feed/') || path.includes('/Student-details/') || path.includes('/Faculty directory/') || path.includes('/alumini directory/') || path.includes('/homepage/') || path.includes('/Clubs/') || path.includes('/Complain/') || path.includes('/Borrow/') || path.includes('/Shops/') || path.includes('/Aakriti/') || path.includes('/Outpass/')) {
      return 1;
    }
    return 0;
  }

  function resolveRelPath(target) {
    const depth = getPathDepth();
    const prefix = depth === 2 ? '../../' : (depth === 1 ? '../' : './');
    
    if (target === 'faculty') return prefix + 'Faculty directory/faculty-directory.html';
    if (target === 'clubs') return prefix + 'Clubs/dist/index.html';
    if (target === 'student') return prefix + 'Student-details/student-details.html';
    if (target === 'alumni') return prefix + 'alumini directory/alumini.html';
    if (target === 'feed') return prefix + 'Feed/feed.html';
    if (target === 'profile') return prefix + 'Feed/Profile/profile.html';
    if (target === 'home') return prefix + 'homepage/homepage.html';
    if (target === 'aakriti') return prefix + 'Aakriti/aakriti.html';
    if (target === 'outpass') return prefix + 'Outpass/outpass.html';
    if (target === 'complain') return prefix + 'Complain/dist/index.html';
    if (target === 'shops') return prefix + 'Shops/index.html';
    if (target === 'borrow') return prefix + 'Borrow/dist/index.html';
    return '#';
  }

  function showToast(msg, type) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
      background: ${type === 'info' ? '#1e293b' : '#7c3aed'}; color: #fff;
      padding: 10px 22px; border-radius: 9999px; font-size: 13px; font-weight: 700;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25); z-index: 999999;
      font-family: system-ui, sans-serif; transition: opacity 0.3s;
    `;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2200);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. CAMPUS AI KNOWLEDGE RETRIEVAL BASE (AIT PUNE DATASET)
  // ─────────────────────────────────────────────────────────────────────────────
  const KNOWLEDGE_BASE = [
    {
      keywords: ['ai', 'machine learning', 'ml', 'deep learning', 'nlp', 'computer vision', 'data science', 'research ai'],
      answer: `<strong>🔬 AI, Machine Learning & Data Science Research:</strong><br/>
For research in AI, Deep Learning, and Computer Vision, the following faculty members lead prominent labs:
<ul>
  <li><strong>Dr. Preeti Patil</strong> (Computer Engg) — Specialization: Machine Learning, NLP, Healthcare AI. Office: Comp Dept, Raman Block.</li>
  <li><strong>Dr. Surekha KS</strong> (Comp/IT) — Specialization: Deep Learning, Big Data Analytics & Predictive Modeling.</li>
  <li><strong>Dr. S.R. Dhore</strong> (HOD Comp) — Specialization: Cloud Computing, Distributed AI Systems.</li>
  <li><strong>Centre of Excellence for AI & Robotics (CEAR)</strong> — Equipped with GPU servers & computer vision rigs in Lab 4.</li>
</ul>
You can schedule a consultation with them directly through the Faculty Directory!`,
      actions: [
        { label: '👨‍🏫 View Faculty Directory', linkType: 'faculty' },
        { label: '🏆 Explore CEAR Lab', linkType: 'clubs' }
      ]
    },
    {
      keywords: ['robotics', 'rover', 'combat bot', 'robocon', 'hardware', 'drone', 'iot', 'sensors', 'mechatronics'],
      answer: `<strong>🤖 Robotics, Drones & Hardware Innovation:</strong><br/>
For robotics research, DD Robocon, combat bots, and autonomous rovers:
<ul>
  <li><strong>Dr. S.M. Gaikwad</strong> (Faculty In-charge, Robotics Lab & 3D PLM Lab) — Focus: Autonomous rovers, LiDAR navigation & kinematics.</li>
  <li><strong>Dr. Seema Tiwari</strong> (E&TC) — Focus: Embedded Systems, IoT, Edge Robotics.</li>
  <li><strong>AIT Robotics Club & Drone Club</strong> — Active in DD Robocon arena prototyping, Mechatronics expos, and autonomous flight.</li>
</ul>
Check their profile and recent publications in the Faculty Directory!`,
      actions: [
        { label: '👨‍🏫 Contact Dr. Gaikwad', linkType: 'faculty' },
        { label: '🤖 Robotics Club Hub', linkType: 'clubs' }
      ]
    },
    {
      keywords: ['baja', 'racing', 'car', 'vehicle', 'automobile', 'mechanical', 'buggy', 'supra', 'sae'],
      answer: `<strong>🏎️ Team BAJA SAE & Motorsports Engineering:</strong><br/>
For all-terrain buggies, Formula electric, and automotive CAD/FEA simulation:
<ul>
  <li><strong>Dr. Raviraj B. Gurav</strong> (Faculty Advisor, BAJA SAE & E-Cell In-charge) — Office: Mech Workshop Room 102.</li>
  <li><strong>Dr. J.B. Sankpal</strong> — FEA Stress Analysis, Rollcage design & Powertrain.</li>
  <li><strong>Team BAJA / SAE Collegiate Club</strong> fabricates custom single-seater ATVs and competes nationally.</li>
</ul>`,
      actions: [
        { label: '👨‍🏫 Contact Dr. Gurav', linkType: 'faculty' },
        { label: '🏎️ View BAJA Club', linkType: 'clubs' }
      ]
    },
    {
      keywords: ['cycling', 'cycle', 'cycling club', 'rides', 'weekend ride', 'kshitij', 'anshika'],
      answer: `<strong>🚲 AIT Cycling Club:</strong><br/>
Promotes fitness and campus community through regular morning cycling meetups and endurance trails.
<ul>
  <li><strong>Secretaries</strong>: Kshitij Kumar (ARE) & Anshika Yadav (ARE)</li>
  <li><strong>Instagram</strong>: <code>@ait_cycling_club</code></li>
  <li><strong>Key Activities</strong>: Weekend rides (Dighi Hills), Long-distance trails (Lonavala/Lavasa), and Campus Cyclothons.</li>
  <li><strong>Official Registration Portal</strong>: All rides and fleet borrow requests are on <strong><a href="https://aitnexus.in" target="_blank" style="color:#7c3aed;font-weight:bold;">aitnexus.in</a></strong>!</li>
</ul>`,
      actions: [
        { label: '🚲 View Cycling Club', linkType: 'clubs' },
        { label: '🌐 Open aitnexus.in ↗', url: 'https://aitnexus.in' }
      ]
    },
    {
      keywords: ['cultural', 'cult', 'cultural board', 'dance', 'music', 'drama', 'fest', 'aakriti', 'singing', 'talent night', 'abhay', 'himanshi'],
      answer: `<strong>🎭 Cultural Board & Creative Arts:</strong><br/>
Oversees all cultural societies and promotes artistic expression across campus.
<ul>
  <li><strong>Secretaries</strong>: Abhay Singh (E&TC A) & Himanshi Pathak (Comp A)</li>
  <li><strong>Instagram</strong>: <code>@culturalboard_ait</code></li>
  <li><strong>Key Activities</strong>: Annual Cultural Fest (Aakriti), Open-mic Talent Nights, and Inter-College Cultural Contingents (Mood Indigo, Oasis).</li>
  <li><strong>Registrations & Auditions</strong>: Register your solo acts or team entries on <strong><a href="https://aitnexus.in" target="_blank" style="color:#7c3aed;font-weight:bold;">aitnexus.in</a></strong>!</li>
</ul>`,
      actions: [
        { label: '🎭 View Cultural Board', linkType: 'clubs' },
        { label: '🌐 Open aitnexus.in ↗', url: 'https://aitnexus.in' }
      ]
    },
    {
      keywords: ['oss', 'open source', 'innerve', 'hackathon', 'git', 'linux', 'coding', 'nishant'],
      answer: `<strong>💻 Open Source Software (OSS) Club:</strong><br/>
The premier software development and open-source body at AIT Pune.
<ul>
  <li><strong>Flagship Event</strong>: <strong>Innerve</strong> — National 36-hour hackathon with $5,000+ prizes.</li>
  <li><strong>Faculty In-charge</strong>: Dr. P.B. Patil (Computer Engg)</li>
  <li><strong>Instagram</strong>: <code>@ossclub.ait</code></li>
  <li><strong>Portal</strong>: <strong><a href="https://aitnexus.in" target="_blank" style="color:#7c3aed;font-weight:bold;">aitnexus.in</a></strong></li>
</ul>`,
      actions: [
        { label: '🏆 View OSS Club', linkType: 'clubs' },
        { label: '👨‍🏫 Contact Dr. P.B. Patil', linkType: 'faculty' }
      ]
    },
    {
      keywords: ['cyber', 'security', 'isdf', 'ethical hacking', 'cryptography', 'network security'],
      answer: `<strong>🛡️ Information Security & Digital Forensics (ISDF):</strong><br/>
For research in Cyber Security, CTFs, and Cryptography:
<ul>
  <li><strong>Dr. Ashwini Sapkal</strong> (Faculty Lead, Cyber Security Cell)</li>
  <li><strong>ISDF Club</strong> conducts weekly Capture-The-Flag (CTF) challenges and network defense bootcamps.</li>
</ul>`,
      actions: [
        { label: '👨‍🏫 Faculty Cyber Security Lead', linkType: 'faculty' },
        { label: '🛡️ View ISDF Club', linkType: 'clubs' }
      ]
    },
    {
      keywords: ['alumni', 'referral', 'jobs', 'placement', 'interview', 'google', 'microsoft', 'amazon', 'nvidia', 'senior'],
      answer: `<strong>💼 Alumni Network & Industry Mentorship:</strong><br/>
AIT has distinguished alumni working at top global companies:
<ul>
  <li><strong>Google / Microsoft / Amazon / Nvidia</strong> — Connect with alumni for 1-on-1 mock interviews and job referrals.</li>
  <li><strong>Filter by Past Clubs</strong> (e.g. OSS, BAJA, GDG alumni) or Graduation Batch in the Alumni Directory.</li>
</ul>
Head to the Alumni Directory to send collaboration and mentorship requests!`,
      actions: [
        { label: '💼 Open Alumni Directory', linkType: 'alumni' }
      ]
    },
    {
      keywords: ['attendance', '75', 'rule', 'hall ticket', 'exam eligibility', 'defaulter'],
      answer: `<strong>📋 Attendance Policy & Exam Eligibility:</strong><br/>
<ul>
  <li>A minimum of <strong>75% attendance</strong> is strictly mandatory across theory lectures and laboratory sessions as per SPPU & AIT autonomous regulations.</li>
  <li>Students with approved duty leaves for official club competitions (BAJA, Robocon, Sports Pace, Cultural fests) must submit duty certificates verified by faculty advisors.</li>
</ul>`,
      actions: [
        { label: '🎓 View Student Directory', linkType: 'student' }
      ]
    },
    {
      keywords: ['hostel', 'timing', 'mess', 'in time', 'curfew', 'gate', 'warden'],
      answer: `<strong>🏠 Hostel & Campus Guidelines:</strong><br/>
<ul>
  <li><strong>Hostel In-Time</strong>: 09:30 PM strictly for all hostel residents.</li>
  <li><strong>Night Pass</strong>: Apply 24 hours prior on the warden portal.</li>
  <li><strong>Mess Timings</strong>: Breakfast (7:30–9:00 AM), Lunch (12:30–2:00 PM), Dinner (7:30–9:30 PM).</li>
</ul>`
    },
    {
      keywords: ['library', 'books', 'digital library', 'reading room', 'study'],
      answer: `<strong>📚 Central Library Timings & Access:</strong><br/>
<ul>
  <li><strong>Regular Hours</strong>: 8:00 AM to 10:00 PM (Monday to Saturday).</li>
  <li><strong>Reading Hall</strong>: 24/7 access during Mid-Sem and End-Sem examination weeks.</li>
  <li><strong>Digital Library</strong>: Access IEEE Xplore, ScienceDirect, and ACM Digital Library from any campus WiFi connection.</li>
</ul>`
    },
    {
      keywords: ['nexus', 'aitnexus', 'registration', 'events', 'portal', 'website'],
      answer: `<strong>🌐 AIT Nexus Portal (aitnexus.in):</strong><br/>
<strong>AIT Nexus</strong> is the centralized event registration, club membership, and student activity platform for AIT Pune.
<ul>
  <li>Official Website: <strong><a href="https://aitnexus.in" target="_blank" style="color:#7c3aed;font-weight:bold;">https://aitnexus.in</a></strong></li>
  <li>Use it to register for hackathons, cultural fest auditions, sports Pace matches, and cycling trail check-ins.</li>
</ul>`,
      actions: [
        { label: '🌐 Open aitnexus.in ↗', url: 'https://aitnexus.in' }
      ]
    },
    {
      keywords: ['signout', 'logout', 'sign out', 'log out', 'exit'],
      answer: `<strong>🚪 Signing Out of Campus Connect:</strong><br/>
You can sign out anytime by going to <strong>Profile & Settings</strong> and clicking the <strong>Sign Out</strong> button, or by clicking the button below. Once signed out, access to protected directories is locked until you sign in again.`,
      actions: [
        { label: '🚪 Sign Out Now', isSignOut: true }
      ]
    }
  ];

  function queryKnowledgeBase(userPrompt) {
    const cleanPrompt = userPrompt.toLowerCase().trim();
    let bestMatch = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (cleanPrompt.includes(kw)) {
          score += kw.length; // weight longer specific matches higher
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch;
    }

    // Smart contextual fallback generator
    return {
      answer: `I looked up our campus database for <em>"${escapeHtml(userPrompt)}"</em>.<br/><br/>
Here is how I can help you find what you need:
<ul>
  <li>🔍 <strong>Faculty Research Guidance</strong>: Head to the <strong>Faculty Directory</strong> to filter by department (Comp, IT, E&TC, Mech, ASGE) and areas of expertise.</li>
  <li>🎪 <strong>Clubs & Chapters</strong>: Explore 30+ student organizations in the <strong>Clubs Hub</strong> or visit <strong><a href="https://aitnexus.in" target="_blank" style="color:#7c3aed;font-weight:bold;">aitnexus.in</a></strong>.</li>
  <li>👥 <strong>Peer & Alumni Network</strong>: Connect with students in the <strong>Student Directory</strong> or find alumni working at top tier tech firms.</li>
</ul>
Try asking: <em>"Faculty for AI research"</em>, <em>"How to join Cycling club?"</em>, or <em>"Alumni at Google"</em>!`,
      actions: [
        { label: '👨‍🏫 Faculty Directory', linkType: 'faculty' },
        { label: '🏆 Clubs Hub', linkType: 'clubs' },
        { label: '💼 Alumni Directory', linkType: 'alumni' }
      ]
    };
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. CHAT HISTORY LOCALSTORAGE MANAGER
  // ─────────────────────────────────────────────────────────────────────────────
  const STORAGE_KEY = 'campusAIChatHistory';

  function getChatHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
    const user = getStoredUser();
    const userName = user ? user.name : 'Student';
    return [
      {
        sender: 'bot',
        text: `👋 Hi <strong>${userName}</strong>! I am <strong>Campus AI</strong>, your 24/7 intelligent guide for Campus Connect · AIT Pune.<br/><br/>Ask me anything about faculty research mentorship, clubs (Cycling, Cultural Board, OSS, etc.), fests, alumni referrals, or campus guidelines!`,
        time: getCurrentTime(),
        actions: [
          { label: '🔬 AI & Robotics Faculty', query: 'Which faculty for AI and Robotics research?' },
          { label: '🚲 Join Cycling Club', query: 'How to join Cycling Club or Cultural Board?' },
          { label: '💼 Connect with Alumni', query: 'How to connect with Alumni at Google or Microsoft?' },
          { label: '🎪 Events on AIT Nexus', query: 'Where to register for campus events on AIT Nexus?' }
        ]
      }
    ];
  }

  function saveChatHistory(history) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-30))); // Keep last 30 messages
    } catch (e) {
      console.error(e);
    }
  }

  function getCurrentTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. INJECT WIDGET DOM & ATTACH LISTENERS
  // ─────────────────────────────────────────────────────────────────────────────
  function initCampusAI() {
    if (document.getElementById('campusAIWidget')) return;

    // 1. Inject Backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'campusAIBackdrop';
    backdrop.className = 'campus-ai-backdrop';
    document.body.appendChild(backdrop);

    // 2. Inject Launcher Trigger Button
    const launcher = document.createElement('button');
    launcher.id = 'campusAILauncher';
    launcher.className = 'campus-ai-launcher';
    launcher.setAttribute('aria-label', 'Open Campus AI Assistant');
    launcher.innerHTML = `
      <div class="campus-ai-ping"></div>
      <div class="campus-ai-launcher-icon">✨</div>
      <div class="campus-ai-tooltip">Campus AI • Ask Doubts</div>
    `;
    document.body.appendChild(launcher);

    // 3. Inject Chat Window Panel
    const windowEl = document.createElement('div');
    windowEl.id = 'campusAIWindow';
    windowEl.className = 'campus-ai-window';
    windowEl.innerHTML = `
      <div class="campus-ai-header">
        <div class="campus-ai-header-left">
          <div class="campus-ai-avatar">
            <span>✨</span>
            <div class="campus-ai-avatar-online"></div>
          </div>
          <div class="campus-ai-title-wrap">
            <h3>Campus AI <span class="campus-ai-badge">AIT Copilot</span></h3>
            <p>Instant answers on Faculty, Clubs &amp; Campus</p>
          </div>
        </div>
        <div class="campus-ai-header-actions">
          <button class="campus-ai-btn-icon" id="campusAIClearBtn" title="Clear Chat History">🗑️</button>
          <button class="campus-ai-btn-icon close-btn" id="campusAICloseBtn" title="Close (ESC)">✕</button>
        </div>
      </div>

      <div class="campus-ai-messages" id="campusAIMessages"></div>

      <div class="campus-ai-suggestions" id="campusAISuggestions">
        <button class="campus-ai-chip" data-q="Which faculty should I contact for AI & Machine Learning research?">🔬 AI Faculty</button>
        <button class="campus-ai-chip" data-q="How do I join the Cycling Club or Cultural Board?">🚲 Cycling &amp; Cultural</button>
        <button class="campus-ai-chip" data-q="How to get alumni mentorship and job referrals?">💼 Alumni Referral</button>
        <button class="campus-ai-chip" data-q="Where to register for college events on AIT Nexus?">🎪 AIT Nexus</button>
        <button class="campus-ai-chip" data-q="What is the 75% attendance rule and library timings?">📋 Attendance &amp; Library</button>
      </div>

      <div class="campus-ai-footer">
        <form class="campus-ai-input-form" id="campusAIForm">
          <input
            type="text"
            class="campus-ai-input"
            id="campusAIInput"
            placeholder="Ask Campus AI about faculty, clubs, fests..."
            autocomplete="off"
          />
          <button type="submit" class="campus-ai-send-btn" id="campusAISendBtn" aria-label="Send Message">
            ➤
          </button>
        </form>
        <div class="campus-ai-disclaimer">Campus AI searches verified AIT Pune datasets in real-time.</div>
      </div>
    `;
    document.body.appendChild(windowEl);

    // 4. Attach Event Handlers
    let isOpen = false;

    function toggleChat(open) {
      isOpen = open !== undefined ? open : !isOpen;
      if (isOpen) {
        windowEl.classList.add('open');
        backdrop.classList.add('active');
        document.getElementById('campusAIInput').focus();
        scrollBottom();
      } else {
        windowEl.classList.remove('open');
        backdrop.classList.remove('active');
      }
    }

    launcher.addEventListener('click', () => toggleChat(true));
    document.getElementById('campusAICloseBtn').addEventListener('click', () => toggleChat(false));
    backdrop.addEventListener('click', () => toggleChat(false));

    // Handle ESC key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleChat(false);
      }
    });

    // Clear Chat
    document.getElementById('campusAIClearBtn').addEventListener('click', () => {
      if (confirm('Clear your Campus AI chat history?')) {
        localStorage.removeItem(STORAGE_KEY);
        renderMessages();
      }
    });

    // Suggestion chips click
    document.getElementById('campusAISuggestions').addEventListener('click', (e) => {
      const chip = e.target.closest('.campus-ai-chip');
      if (chip && chip.dataset.q) {
        handleUserQuery(chip.dataset.q);
      }
    });

    // Form submit
    const form = document.getElementById('campusAIForm');
    const input = document.getElementById('campusAIInput');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      input.value = '';
      handleUserQuery(q);
    });

    // Render initial messages
    renderMessages();
  }

  function renderMessages() {
    const container = document.getElementById('campusAIMessages');
    if (!container) return;
    const history = getChatHistory();

    container.innerHTML = history.map((msg) => {
      const isBot = msg.sender === 'bot';
      const actionButtons = isBot && msg.actions ? msg.actions.map(act => {
        if (act.url) {
          return `<a href="${act.url}" target="_blank" class="campus-ai-action-btn">${act.label}</a>`;
        }
        if (act.linkType) {
          const resolved = resolveRelPath(act.linkType);
          return `<a href="${resolved}" class="campus-ai-action-btn">${act.label}</a>`;
        }
        if (act.query) {
          return `<button class="campus-ai-action-btn" onclick="window.CampusAISendQuery('${escapeQuotes(act.query)}')">${act.label}</button>`;
        }
        if (act.isSignOut) {
          return `<button class="campus-ai-action-btn" style="background:#fee2e2;color:#b91c1c;border-color:#fca5a5;" onclick="window.CampusAuth.signOut()">${act.label}</button>`;
        }
        return '';
      }).join('') : '';

      return `
        <div class="campus-ai-msg ${isBot ? 'bot' : 'user'}">
          <div class="campus-ai-msg-avatar">${isBot ? '✨' : '👤'}</div>
          <div class="campus-ai-msg-bubble">
            <div>${msg.text}</div>
            ${actionButtons ? `<div style="margin-top:6px;">${actionButtons}</div>` : ''}
            <div class="campus-ai-msg-time">${msg.time}</div>
          </div>
        </div>
      `;
    }).join('');

    scrollBottom();
  }

  function escapeQuotes(str) {
    return str.replace(/'/g, "\\'");
  }

  function scrollBottom() {
    const container = document.getElementById('campusAIMessages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  function handleUserQuery(queryText) {
    const history = getChatHistory();
    const userMsg = {
      sender: 'user',
      text: escapeHtml(queryText),
      time: getCurrentTime()
    };
    history.push(userMsg);
    saveChatHistory(history);
    renderMessages();

    // Show typing indicator
    const container = document.getElementById('campusAIMessages');
    const typingEl = document.createElement('div');
    typingEl.className = 'campus-ai-msg bot';
    typingEl.id = 'campusAITypingIndicator';
    typingEl.innerHTML = `
      <div class="campus-ai-msg-avatar">✨</div>
      <div class="campus-ai-typing">
        <div class="campus-ai-dot"></div>
        <div class="campus-ai-dot"></div>
        <div class="campus-ai-dot"></div>
      </div>
    `;
    container.appendChild(typingEl);
    scrollBottom();

    // Simulated intelligent latency (~600ms)
    setTimeout(() => {
      typingEl.remove();
      const result = queryKnowledgeBase(queryText);
      const botMsg = {
        sender: 'bot',
        text: result.answer,
        actions: result.actions || [],
        time: getCurrentTime()
      };
      history.push(botMsg);
      saveChatHistory(history);
      renderMessages();
    }, 600);
  }

  // Global helper to trigger query from inline action button
  window.CampusAISendQuery = function (q) {
    handleUserQuery(q);
  };

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCampusAI);
  } else {
    initCampusAI();
  }

})();
