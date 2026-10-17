/* ===================================================================
   CAMPUS CONNECT — STUDENT DIRECTORY JS
   Real-time search, filters, modal popups, posts panel, collaborate
   =================================================================== */

/* ──────────────────────────────────────
   DATA
────────────────────────────────────── */
const students = [
  {
    id: "s1",
    name: "Snehangshu Das",
    year: "B.Tech CSE · AIT Pune '27",
    yearNum: "1st",
    branch: "Computer Science",
    accent: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    online: true,
    postCount: 12, likeCount: 340, followers: 128,
    bio: "Conducting reinforcement learning benchmarking for multilingual models. Collaborating with the NLP lab to publish results at a national conference. Always on the lookout for the next big idea to prototype.",
    achievements: "🏆 Best Paper Award, AIT Tech Fest 2024 · 🥈 Runner-up, Smart India Hackathon 2023",
    hobbies: "♟ Chess · 🎨 Sketching · 📚 Sci-fi novels · 🎵 Lo-fi music",
    projects: "Multilingual chatbot · Campus event predictor · AI code reviewer",
    skills: ["HTML", "CSS", "JavaScript", "Python", "PyTorch"],
    clubs: ["OSS Club", "GDG", "CP Club"],
    email: "snehangshu.d@ait.edu",
    github: "github.com/snehangshu",
    linkedin: "linkedin.com/in/snehangshu",
    instagram: "instagram.com/snehangshu.dev",
    x: "x.com/snehangshu_d",
    posts: [
      { id:"p1", tag:"🏆 Achievement", image:"https://picsum.photos/seed/nlp2024/600/400", text:"Just submitted our ML paper to the NLP national conference! 🎉 Months of late nights finally paid off. Huge thanks to the lab team.", time:"2h ago", likes:48, liked:false, shares:5, collabRequested:false, comments:[{user:"Priya S.",text:"Congrats!! You deserve this 🔥",time:"1h ago"},{user:"Rohan P.",text:"Incredible work bro. Let me know if you need reviewers!",time:"45m ago"}] },
      { id:"p2", tag:"💻 Recent Work", image:"https://picsum.photos/seed/predict42/600/400", text:"Built a campus event predictor using LSTM + historical data. Predicts footfall for events with 87% accuracy. Open sourcing it soon!", time:"3 days ago", likes:92, liked:false, shares:18, collabRequested:false, comments:[{user:"Arjun M.",text:"This is so cool! Can I contribute?",time:"2 days ago"},{user:"Ananya K.",text:"87% is insane. Post the repo link!",time:"2 days ago"}] },
      { id:"p3", tag:"🏆 Achievement", image:null, text:"Won a chess tournament at the college fest today ♟ Nothing like a good game to reset after a week of debugging.", time:"1 week ago", likes:75, liked:false, shares:3, collabRequested:false, comments:[{user:"Ishita D.",text:"King energy only 👑",time:"6 days ago"}] }
    ]
  },
  {
    id: "s2",
    name: "Priya Sharma",
    year: "B.Tech IT · AIT Pune '26",
    yearNum: "2nd",
    branch: "Information Technology",
    accent: "linear-gradient(90deg,#ec4899,#f43f5e)",
    online: false,
    postCount: 8, likeCount: 215, followers: 94,
    bio: "Passionate about full-stack web development and open-source software. Organising workshops for freshers to help them break into tech. Loves clean code, good coffee, and dark mode everything.",
    achievements: "🥇 1st Place, Web-a-Thon AIT 2024 · 🌟 Open Source Contributor of the Month",
    hobbies: "☕ Coffee brewing · 📸 Photography · 🧗 Bouldering · 🎧 Podcasts",
    projects: "Hostel management portal · Notes-sharing platform · Event ticketing PWA",
    skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
    clubs: ["OSS Club", "GDG"],
    email: "priya.s@ait.edu",
    github: "github.com/priyasharma",
    linkedin: "linkedin.com/in/priyasharma",
    instagram: "instagram.com/priya.codes",
    telegram: "t.me/priya_dev",
    posts: [
      { id:"p4", tag:"💻 Recent Work", image:"https://picsum.photos/seed/webhack2024/600/400", text:"Our hostel management portal just crossed 1,000 daily active users! Built with React + Supabase. Thank you to everyone who tested early alphas.", time:"1 day ago", likes:110, liked:false, shares:22, collabRequested:false, comments:[{user:"Snehangshu D.",text:"Huge milestone Priya! UI is so clean.",time:"20h ago"}] },
      { id:"p5", tag:"🎪 Club Event", image:"https://picsum.photos/seed/workshopait/600/400", text:"Conducted a Web Dev 101 workshop for 80+ freshers today! The energy in the room was unbelievable. Next up: React fundamentals.", time:"4 days ago", likes:85, liked:false, shares:14, collabRequested:false, comments:[{user:"Arjun M.",text:"Freshers loved it, great job!",time:"3 days ago"}] }
    ]
  },
  {
    id: "s3",
    name: "Arjun Mehta",
    year: "B.Tech E&TC · AIT Pune '25",
    yearNum: "3rd",
    branch: "Electronics & Comm.",
    accent: "linear-gradient(90deg,#10b981,#06b6d4)",
    online: true,
    postCount: 5, likeCount: 160, followers: 76,
    bio: "Hardware tinkerer by day, embedded systems enthusiast by night. Working on IoT solutions for campus sustainability. You can usually find me in the robotics lab surrounded by wires and soldering irons.",
    achievements: "🤖 Best IoT Project, Techfest 2025 · 🎵 Performed at AIT Cultural Fest",
    hobbies: "🎵 Music production · 🤖 Robotics · 🏃 Running",
    projects: "Smart Campus Energy Monitor · Gesture-controlled robot · Weather station IoT",
    skills: ["C++", "Arduino", "Python", "Raspberry Pi", "MQTT"],
    clubs: ["OSS Club", "Robotics Club", "CEAR"],
    email: "arjun.m@ait.edu",
    github: "github.com/arjunmehta",
    linkedin: "linkedin.com/in/arjunmehta",
    posts: [
      { id:"p6", tag:"💻 Recent Work", image:"https://picsum.photos/seed/iot2025/600/400", text:"Our Smart Campus Energy Monitor went live today in Lab Block A! 🔌 Reduces energy waste by detecting idle equipment automatically. Built with Raspberry Pi + MQTT.", time:"5 days ago", likes:62, liked:false, shares:11, collabRequested:false, comments:[{user:"Snehangshu D.",text:"This is so practical. Props! 🙌",time:"4 days ago"},{user:"Priya S.",text:"Open source it!!!",time:"4 days ago"}] }
    ]
  },
  {
    id: "s4",
    name: "Ananya Kulkarni",
    year: "B.Tech Mech · AIT Pune '27",
    yearNum: "1st",
    branch: "Mechanical Eng.",
    accent: "linear-gradient(90deg,#f59e0b,#ef4444)",
    online: false,
    postCount: 15, likeCount: 520, followers: 210,
    bio: "Design thinking advocate bridging engineering and human experience. Working on sustainable mechanical designs that are as beautiful as they are functional. Photography and art keep me sane.",
    achievements: "🎨 Best Design Award, Techfest 2024 · 🏅 National Level Robotics Finalist",
    hobbies: "📷 Photography · 🎨 Watercolour painting · 🌿 Sustainability projects",
    projects: "Eco-bot (solar-powered campus cleanup robot) · Ergonomic campus chair redesign",
    skills: ["SolidWorks", "MATLAB", "Figma", "AutoCAD", "Fusion 360"],
    clubs: ["Design Club", "Robotics Club"],
    email: "ananya.k@ait.edu",
    github: "github.com/ananyak",
    linkedin: "linkedin.com/in/ananyakulkarni",
    posts: [
      { id:"p7", tag:"💻 Recent Work", image:"https://picsum.photos/seed/ecobot99/600/400", text:"Eco-bot picked up 3kg of litter from the campus garden today! 🌱🤖 Our solar-powered little hero. Phase 2 coming soon — autonomous path planning!", time:"2 days ago", likes:187, liked:false, shares:34, collabRequested:false, comments:[{user:"Rohan P.",text:"This is genuinely impactful work 🌍",time:"1 day ago"},{user:"Arjun M.",text:"Love the sustainability angle! Let me know if you need help with path planning algo.",time:"22h ago"}] },
      { id:"p8", tag:"🏆 Achievement", image:"https://picsum.photos/seed/thesis55/600/400", text:"Submitted my design thesis today — 'Human-Centred Engineering for Campus Spaces.' Three months of research, interviews, and prototyping. Feels surreal. 🎓", time:"1 week ago", likes:220, liked:false, shares:19, collabRequested:false, comments:[{user:"Snehangshu D.",text:"Proud of you! 🎉",time:"6 days ago"},{user:"Ishita D.",text:"Can't wait to read it!",time:"6 days ago"}] }
    ]
  },
  {
    id: "s5",
    name: "Rohan Patil",
    year: "B.Tech CSE · AIT Pune '26",
    yearNum: "2nd",
    branch: "Computer Science",
    accent: "linear-gradient(90deg,#0ea5e9,#6366f1)",
    online: true,
    postCount: 20, likeCount: 870, followers: 345,
    bio: "ML researcher focused on NLP and vision models. Contributing to open-source AI tools and mentoring juniors in the AI Club. Training models, chasing gradients, occasionally sleeping before deadlines.",
    achievements: "🥇 Google Hack4Change Winner 2024 · 📜 Research paper accepted at ICML Workshop",
    hobbies: "🎮 Gaming · 🏸 Badminton · 🍕 Amateur chef",
    projects: "CampusGPT — AIT-specific chatbot · Vision-based attendance system",
    skills: ["PyTorch", "TensorFlow", "Python", "Hugging Face", "FastAPI"],
    clubs: ["GDG", "AI Club", "CP Club"],
    email: "rohan.p@ait.edu",
    github: "github.com/rohanpatil",
    linkedin: "linkedin.com/in/rohanpatil",
    posts: [
      { id:"p9", tag:"🏆 Achievement", image:"https://picsum.photos/seed/icml2024/600/400", text:"Our paper got accepted at the ICML Workshop! 🎉 'Efficient Fine-tuning of LLMs for Low-Resource Indian Languages.' Thanks to everyone who reviewed drafts at 2am 😅", time:"6h ago", likes:312, liked:false, shares:67, collabRequested:false, comments:[{user:"Snehangshu D.",text:"ICML!! You're insane bro 🔥🔥🔥",time:"5h ago"},{user:"Priya S.",text:"Absolutely deserved. 🏆",time:"4h ago"},{user:"Ananya K.",text:"I'm so proud of you!! 🎉",time:"3h ago"}] },
      { id:"p10", tag:"💻 Recent Work", image:"https://picsum.photos/seed/gpt500/600/400", text:"CampusGPT now has 500 active users! 🤯 It's been 3 months since I released it as a side project. Crazy how far this has come. Next up — adding faculty Q&A mode.", time:"3 days ago", likes:298, liked:false, shares:45, collabRequested:false, comments:[{user:"Arjun M.",text:"Daily user here. It's genuinely useful!",time:"2 days ago"},{user:"Ishita D.",text:"Adding faculty Q&A is going to be 🔥",time:"2 days ago"}] },
      { id:"p11", tag:"💻 Recent Work", image:null, text:"Vision-based attendance marking went live for 3 classes today. Zero manual roll-calls. The professors love it 😄 Will open-source once we finish the privacy audit.", time:"1 week ago", likes:183, liked:false, shares:28, collabRequested:false, comments:[{user:"Priya S.",text:"Future of edtech right here!",time:"6 days ago"}] }
    ]
  },
  {
    id: "s6",
    name: "Ishita Desai",
    year: "B.Tech IT · AIT Pune '28",
    yearNum: "1st",
    branch: "Information Technology",
    accent: "linear-gradient(90deg,#a855f7,#ec4899)",
    online: false,
    postCount: 7, likeCount: 188, followers: 89,
    bio: "Cybersecurity nerd and CTF competitor. Believes in ethical hacking, open standards, and that every wall has a door. Linux from scratch is my hobby. If you break it, you better fix it.",
    achievements: "🏴‍☠️ Top 10, National CTF Championship 2024 · 🔐 CVE contributor",
    hobbies: "🔐 CTF competitions · 🎸 Guitar · 🍜 Ramen connoisseur",
    projects: "PatchWatch — CVE monitoring tool · Secure campus Wi-Fi audit",
    skills: ["Linux", "Kali Linux", "Python", "Wireshark", "Burp Suite"],
    clubs: ["OSS Club", "CyberSec Club"],
    email: "ishita.d@ait.edu",
    github: "github.com/ishitadesai",
    linkedin: "linkedin.com/in/ishitadesai",
    posts: [
      { id:"p12", tag:"🏆 Achievement", image:"https://picsum.photos/seed/ctf2024/600/400", text:"Finished a 36-hour CTF marathon and landed Top 10 nationally! 🏴‍☠️ Solved 12/15 challenges solo. Tired but absolutely buzzing.", time:"3 days ago", likes:98, liked:false, shares:14, collabRequested:false, comments:[{user:"Rohan P.",text:"Top 10 nationally is INSANE. Congrats!! 🔥",time:"2 days ago"},{user:"Snehangshu D.",text:"Absolute beast mode 💪",time:"2 days ago"}] }
    ]
  }
];

/* ──────────────────────────────────────
   STATE
────────────────────────────────────── */
let activeStudent = null;
let activePostId = null;
let postsPanelOpen = false;
let currentSearchQuery = "";
let selectedBranch = "all";
let selectedYear = "all";
let selectedClubs = [];
let selectedSort = "name-asc";

/* ──────────────────────────────────────
   DOM READY
────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  renderCardsGrid();
  setupSearchAndFilters();
  setupStickyScrollListener();
});

/* ──────────────────────────────────────
   DYNAMIC CARDS RENDERER WITH FILTERING
────────────────────────────────────── */
function renderCardsGrid() {
  const container = document.getElementById("cardsGrid");
  if (!container) return;

  let filtered = students.filter(s => {
    // Search query match
    if (currentSearchQuery) {
      const q = currentSearchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchBranch = s.branch.toLowerCase().includes(q) || s.year.toLowerCase().includes(q);
      const matchBio = s.bio.toLowerCase().includes(q);
      const matchSkills = s.skills.some(sk => sk.toLowerCase().includes(q));
      const matchClubs = s.clubs.some(cl => cl.toLowerCase().includes(q));
      if (!matchName && !matchBranch && !matchBio && !matchSkills && !matchClubs) return false;
    }

    // Branch filter
    if (selectedBranch !== "all" && s.branch !== selectedBranch) {
      return false;
    }

    // Year filter
    if (selectedYear !== "all" && s.yearNum !== selectedYear) {
      return false;
    }

    // Club filter
    if (selectedClubs.length > 0) {
      const hasClub = selectedClubs.some(c => s.clubs.includes(c));
      if (!hasClub) return false;
    }

    return true;
  });

  // Sorting
  if (selectedSort === "name-asc") {
    filtered.sort((a,b) => a.name.localeCompare(b.name));
  } else if (selectedSort === "name-desc") {
    filtered.sort((a,b) => b.name.localeCompare(a.name));
  }

  // Update count in header
  const countEl = document.querySelector(".stu-count");
  if (countEl) countEl.textContent = `🎓 Students (${filtered.length} found)`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.6); backdrop-filter: blur(14px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.8);">
        <span style="font-size: 40px; display: block; margin-bottom: 12px;">🔍</span>
        <h3 style="font-size: 18px; font-weight: 800; color: #1e1b4b; margin-bottom: 6px;">No matching students found</h3>
        <p style="font-size: 13.5px; color: #6b7280; margin-bottom: 16px;">Try adjusting your search query or reset the active filters.</p>
        <button onclick="resetAllFilters()" style="font-family: inherit; font-size: 13px; font-weight: 700; background: var(--primary); color: #fff; border: none; border-radius: 99px; padding: 8px 22px; cursor: pointer;">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(s => `
    <div class="student-card" tabindex="0"
      style="--accent-gradient: ${s.accent}"
      onclick="openModalById('${s.id}')"
      onkeydown="if(event.key==='Enter')openModalById('${s.id}')">
      <div class="card-avatar-wrap">
        <img class="s-img" src="user.png" alt="${s.name}" />
        ${s.online ? '<span class="online-dot"></span>' : ''}
      </div>
      <div class="card-body">
        <div class="s-name">${s.name}</div>
        <div class="s-year">${s.year}</div>
        <p class="s-bio">${s.bio}</p>
        <p class="s-label">Club Affiliations</p>
        <div class="s-tags">
          ${s.clubs.map(c => `<span class="tag-club">${c}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

function openModalById(id) {
  const s = students.find(x => x.id === id);
  if (s) openModal(s);
}

/* ──────────────────────────────────────
   SEARCH & FILTERS EVENT WIRING
────────────────────────────────────── */
function setupSearchAndFilters() {
  const searchInput = document.getElementById("studentSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim();
      renderCardsGrid();
    });
  }

  // Branch Radios
  document.querySelectorAll("input[name='branch']").forEach(radio => {
    radio.addEventListener("change", (e) => {
      selectedBranch = e.target.value;
      renderCardsGrid();
    });
  });

  // Year Chips
  document.querySelectorAll(".year-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".year-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      selectedYear = chip.getAttribute("data-year") || chip.textContent.trim();
      renderCardsGrid();
    });
  });

  // Club Checkboxes
  document.querySelectorAll(".club-checkbox").forEach(cb => {
    cb.addEventListener("change", () => {
      selectedClubs = Array.from(document.querySelectorAll(".club-checkbox:checked")).map(c => c.value);
      renderCardsGrid();
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById("sortBy");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      selectedSort = e.target.value;
      renderCardsGrid();
    });
  }
}

function resetAllFilters() {
  currentSearchQuery = "";
  selectedBranch = "all";
  selectedYear = "all";
  selectedClubs = [];
  selectedSort = "name-asc";

  const searchInput = document.getElementById("studentSearch");
  if (searchInput) searchInput.value = "";

  document.querySelectorAll("input[name='branch']").forEach(r => r.checked = false);
  const allRadio = document.querySelector("input[name='branch'][value='all']");
  if (allRadio) allRadio.checked = true;

  document.querySelectorAll(".year-chip").forEach(c => c.classList.remove("active"));
  const firstYearChip = document.querySelector(".year-chip[data-year='all']") || document.querySelector(".year-chip");
  if (firstYearChip) firstYearChip.classList.add("active");

  document.querySelectorAll(".club-checkbox").forEach(cb => cb.checked = false);

  const sortSelect = document.getElementById("sortBy");
  if (sortSelect) sortSelect.value = "name-asc";

  renderCardsGrid();
  showToast("All filters have been reset.", "🔄");
}

/* ──────────────────────────────────────
   SMOOTH SCROLL FIXED CONTROLS LISTENER
────────────────────────────────────── */
function setupStickyScrollListener() {
  const controls = document.getElementById("stickyControls");
  if (!controls) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 90) {
      controls.classList.add("scrolled-fixed");
    } else {
      controls.classList.remove("scrolled-fixed");
    }
  }, { passive: true });
}

/* ──────────────────────────────────────
   MODAL OPEN / CLOSE
────────────────────────────────────── */
function openModal(student) {
  activeStudent = student;
  const modal   = document.getElementById("profileModal");
  const overlay = document.getElementById("modalOverlay");

  // Set accent gradient on modal header
  document.getElementById("modalHeader").style.setProperty("--modal-accent", student.accent);

  // Avatar & online
  document.getElementById("modalAvatar").src = "user.png";
  document.getElementById("modalAvatar").alt = student.name;
  const onlineDot = document.getElementById("modalOnline");
  onlineDot.hidden = !student.online;

  // Info
  const nameEl = document.getElementById("modalName");
  if (nameEl) nameEl.textContent = student.name;

  const yearEl = document.getElementById("modalYear");
  if (yearEl) yearEl.textContent = student.year;

  const postEl = document.getElementById("modalPostCount") || document.getElementById("statPosts");
  if (postEl) postEl.textContent = student.posts.length;

  const likeEl = document.getElementById("modalLikeCount") || document.getElementById("statLikes");
  if (likeEl) likeEl.textContent = fmtCount(student.likeCount);

  const followEl = document.getElementById("modalFollowers") || document.getElementById("statFollowers");
  if (followEl) followEl.textContent = fmtCount(student.followers);

  // About tab fields
  const bioEl = document.getElementById("modalBio");
  if (bioEl) bioEl.textContent = student.bio;

  const achEl = document.getElementById("modalAchievements");
  if (achEl) achEl.textContent = student.achievements;

  const hobEl = document.getElementById("modalHobbies");
  if (hobEl) hobEl.textContent = student.hobbies;

  const projEl = document.getElementById("modalProjects");
  if (projEl) projEl.textContent = student.projects;

  // Tags
  renderTags("modalSkills", student.skills, "modal-tag");
  renderTags("modalClubs",  student.clubs,  "tag-club");

  // Contact & Social Channels (Unhidden links only)
  const socialGrid = document.getElementById("modalSocialLinksGrid");
  if (socialGrid) {
    const list = [];
    if (student.email) list.push({ icon: "✉️", label: "Email", href: "mailto:" + student.email });
    if (student.github) list.push({ icon: "🐙", label: "GitHub", href: "https://" + student.github });
    if (student.linkedin) list.push({ icon: "💼", label: "LinkedIn", href: "https://" + student.linkedin });
    if (student.instagram) list.push({ icon: "📸", label: "Instagram", href: "https://" + student.instagram });
    if (student.telegram) list.push({ icon: "✈️", label: "Telegram", href: "https://t.me/" + student.telegram.replace(/^@/, "") });
    if (student.x) list.push({ icon: "🐦", label: "X", href: "https://" + student.x });
    if (student.whatsapp) list.push({ icon: "💬", label: "WhatsApp", href: "https://wa.me/" + student.whatsapp.replace(/[^0-9]/g, "") });
    if (student.portfolio) list.push({ icon: "🌐", label: "Portfolio", href: "https://" + student.portfolio });

    socialGrid.innerHTML = list.map(item => `
      <a href="${item.href}" target="_blank" rel="noopener noreferrer" class="student-social-chip">
        <span>${item.icon}</span>
        <span>${item.label}</span>
      </a>
    `).join("");
  }

  // Populate active rental listings from CampusSync if any
  populateStudentRentals(student.name);

  // Reset to about tab
  resetModalToAbout();

  // Populate posts panel header
  const panelAvatar = document.getElementById("postsPanelAvatar");
  if (panelAvatar) panelAvatar.src = "user.png";
  const panelName = document.getElementById("postsPanelName");
  if (panelName) panelName.textContent = student.name;
  const panelSub = document.getElementById("postsPanelSub");
  if (panelSub) panelSub.textContent = student.year + " · " + student.posts.length + " Posts";

  // Render posts inside the posts panel
  renderPostsFeed("postsPanelFeed", student.posts);

  // Show modal & overlay
  modal.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function resetModalToAbout() {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
  document.getElementById("tabBtnAbout").classList.add("active");
  document.getElementById("tab-about").classList.add("active");
}

function closeModal() {
  document.getElementById("profileModal").classList.remove("open");
  const rdModal = document.getElementById("rentalDetailModal");
  if (rdModal) rdModal.style.display = "none";
  const liModal = document.getElementById("listItemModal");
  if (liModal) liModal.style.display = "none";
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
  closePostsPanel(false);
  activeStudent = null;
}

/* ──────────────────────────────────────
   POSTS PANEL
────────────────────────────────────── */
function openPostsPanel() {
  const panel = document.getElementById("postsPanel");
  panel.classList.add("open");
  document.getElementById("profileModal").classList.add("posts-open");
  postsPanelOpen = true;
}

function closePostsPanel(resetTab = true) {
  const panel = document.getElementById("postsPanel");
  panel.classList.remove("open");
  document.getElementById("profileModal").classList.remove("posts-open");
  postsPanelOpen = false;
  if (resetTab) resetModalToAbout();
  closeComments();
}

/* ──────────────────────────────────────
   HELPERS
────────────────────────────────────── */
function fmtCount(n) {
  return n >= 1000 ? (n/1000).toFixed(1)+"k" : n;
}

function renderTags(containerId, items, cls) {
  document.getElementById(containerId).innerHTML =
    items.map(t => `<span class="${cls}">${t}</span>`).join("");
}

function switchTab(tabId, btnEl) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  document.getElementById("tab-" + tabId).classList.add("active");
}

/* ──────────────────────────────────────
   POSTS FEED RENDERER
────────────────────────────────────── */
function renderPostsFeed(containerId, posts) {
  const feed = document.getElementById(containerId);
  if (!posts || posts.length === 0) {
    feed.innerHTML = `<p class="no-posts">No posts yet.</p>`;
    return;
  }
  feed.innerHTML = posts.map(post => buildPostHTML(post)).join("");
  // Fill author names
  feed.querySelectorAll("[data-author-slot]").forEach(el => {
    el.textContent = activeStudent ? activeStudent.name : "";
  });
}

function buildPostHTML(post) {
  const imgHTML = post.image
    ? `<img class="post-img" src="${post.image}" alt="Post image" loading="lazy" />`
    : "";
  const tagHTML = post.tag
    ? `<span class="post-category-tag">${post.tag}</span>`
    : `<span class="post-category-tag">💻 Recent Work</span>`;
  return `
    <article class="post-card" id="post-${post.id}">
      ${imgHTML}
      <div class="post-card-body">
        <div class="post-header">
          <div class="post-header-left">
            <img class="post-avatar" src="user.png" alt="" />
            <div>
              <div class="post-author" data-author-slot></div>
              <div class="post-time">${post.time}</div>
            </div>
          </div>
          ${tagHTML}
        </div>
        <p class="post-text">${post.text}</p>
      </div>
      <div class="post-actions">
        <button class="action-btn like-btn ${post.liked ? 'liked' : ''}"
          onclick="toggleLike('${post.id}',this)" id="likeBtn-${post.id}">
          <span class="action-icon" id="likeIcon-${post.id}">${post.liked ? '❤️' : '🤍'}</span>
          <span class="action-count" id="likeCount-${post.id}">${post.likes}</span>
          <span class="action-label">Like</span>
        </button>
        <button class="action-btn comment-btn" onclick="openComments('${post.id}')">
          <span class="action-icon">💬</span>
          <span class="action-count" id="cmtCount-${post.id}">${post.comments.length}</span>
          <span class="action-label">Comment</span>
        </button>
        <button class="action-btn share-btn" onclick="sharePost('${post.id}',this)">
          <span class="action-icon">↗️</span>
          <span class="action-count" id="shareCount-${post.id}">${post.shares}</span>
          <span class="action-label">Share</span>
        </button>
        <button class="action-btn collab-btn ${post.collabRequested ? 'requested' : ''}"
          onclick="requestCollab('${post.id}',this)" id="collabBtn-${post.id}" title="Send collaboration request">
          <span class="action-icon">🤝</span>
          <span class="action-label">${post.collabRequested ? 'Requested' : 'Collaborate'}</span>
        </button>
      </div>
    </article>`;
}

/* ──────────────────────────────────────
   LIKE
────────────────────────────────────── */
function toggleLike(postId, btn) {
  const post = findPost(postId);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  btn.classList.toggle("liked", post.liked);
  document.getElementById("likeIcon-"  + postId).textContent = post.liked ? "❤️" : "🤍";
  document.getElementById("likeCount-" + postId).textContent = post.likes;

  btn.classList.add("pop");
  setTimeout(() => btn.classList.remove("pop"), 320);
}

/* ──────────────────────────────────────
   SHARE
────────────────────────────────────── */
function sharePost(postId, btn) {
  const post = findPost(postId);
  if (!post) return;
  post.shares++;
  document.getElementById("shareCount-" + postId).textContent = post.shares;
  btn.classList.add("shared");
  setTimeout(() => btn.classList.remove("shared"), 900);
  if (navigator.share) navigator.share({ title:"Campus Connect Post", text: post.text }).catch(()=>{});
  else showToast("Post link copied to clipboard! 📋", "🔗");
}

/* ──────────────────────────────────────
   COMMENTS
────────────────────────────────────── */
function openComments(postId) {
  activePostId = postId;
  const post = findPost(postId);
  if (!post) return;
  renderCommentList(post.comments);
  document.getElementById("commentPopup").classList.add("open");
  document.getElementById("commentOverlay").classList.add("open");
}

function closeComments() {
  activePostId = null;
  document.getElementById("commentPopup").classList.remove("open");
  document.getElementById("commentOverlay").classList.remove("open");
  document.getElementById("newCommentInput").value = "";
}

function renderCommentList(comments) {
  const list = document.getElementById("commentList");
  if (!comments.length) {
    list.innerHTML = `<p class="no-comments">No comments yet. Be the first!</p>`;
    return;
  }
  list.innerHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-user-avatar">${c.user.charAt(0)}</div>
      <div class="comment-body">
        <span class="comment-user">${c.user}</span>
        <p class="comment-text">${c.text}</p>
        <span class="comment-time">${c.time}</span>
      </div>
    </div>`).join("");
  list.scrollTop = list.scrollHeight;
}

function submitComment() {
  if (!activePostId) return;
  const input = document.getElementById("newCommentInput");
  const text  = input.value.trim();
  if (!text) return;
  const post = findPost(activePostId);
  if (!post) return;
  post.comments.push({ user:"You", text, time:"Just now" });
  renderCommentList(post.comments);
  const cntEl = document.getElementById("cmtCount-" + activePostId);
  if (cntEl) cntEl.textContent = post.comments.length;
  input.value = "";
}

const commentInput = document.getElementById("newCommentInput");
if (commentInput) {
  commentInput.addEventListener("keydown", e => {
    if (e.key === "Enter") submitComment();
  });
}

/* ──────────────────────────────────────
   FOLLOW
────────────────────────────────────── */
function toggleFollow(btn) {
  const following = btn.classList.toggle("following");
  btn.textContent = following ? "✓ Following" : "Follow";
}

/* ──────────────────────────────────────
   FILTER PANEL TOGGLE & DISMISS
────────────────────────────────────── */
function toggleFilters(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const panel = document.getElementById("filtersPanel");
  if (panel) {
    panel.classList.toggle("open");
  }
}

document.addEventListener("click", function(e) {
  const panel = document.getElementById("filtersPanel");
  const btn   = document.getElementById("filterToggleBtn");
  if (panel && panel.classList.contains("open")) {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      panel.classList.remove("open");
    }
  }
});

/* ──────────────────────────────────────
   COLLABORATE & NOTIFICATION TOAST
────────────────────────────────────── */
function showToast(msg, icon = "🤝") {
  let t = document.getElementById("toastNotify");
  if (!t) return;
  document.getElementById("toastIcon").textContent = icon;
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
}

function requestCollab(postId, btn) {
  const post = findPost(postId);
  if (!post) return;
  post.collabRequested = !post.collabRequested;
  btn.classList.toggle("requested", post.collabRequested);
  const label = btn.querySelector(".action-label");
  const authorName = activeStudent ? activeStudent.name : "Student";
  if (post.collabRequested) {
    label.textContent = "Requested";
    showToast(`Collaboration invite sent to ${authorName}! Notification queued.`, "🤝");
  } else {
    label.textContent = "Collaborate";
    showToast(`Collaboration request withdrawn.`, "ℹ️");
  }
}

/* ──────────────────────────────────────
   UTILITY
────────────────────────────────────── */
function findPost(postId) {
  for (const s of students) {
    const p = s.posts.find(p => p.id === postId);
    if (p) return p;
  }
  return null;
}

/* ===================================================================
   CAMPUSYNC — PEER RENTAL & GEAR EXCHANGE INTEGRATION MODULE
   =================================================================== */

const DEFAULT_CAMPUS_LISTINGS = [
  {
    id: 'listing_01',
    ownerId: 'user_ait_01',
    ownerName: 'Aarav Sharma',
    ownerEmail: 'aarav.comp23@aitpune.edu.in',
    ownerHostel: 'OBH-2',
    ownerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.9,
    title: 'Arduino Mega 2560 + Complete 37 Sensor Kit',
    description: 'Original Arduino Mega with ultrasonic, flame, DHT11, servo motor, jumper wires, and breadboard. Perfect for Microcontroller lab / Capstone IoT project. Ready to test.',
    category: 'Electronics & IoT',
    transactionType: 'Rent',
    price: 45,
    rentalPeriod: 'per week',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80',
    hostelBlock: 'OBH-2',
    tags: ['IoT', 'Arduino', 'Robotics', 'Rent']
  },
  {
    id: 'listing_02',
    ownerId: 'user_ait_03',
    ownerName: 'Rohan Verma',
    ownerEmail: 'rohan.mech22@aitpune.edu.in',
    ownerHostel: 'NBH-1',
    ownerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    ownerRating: 5.0,
    title: 'Engineering Graphics Mini Drafter + Heavy-Duty Tube',
    description: 'Omega professional mini-drafter with locking knob + black sheet storage tube + set squares. Completely calibrated and smooth.',
    category: 'Lab Tools & Drafters',
    transactionType: 'Skill-Barter',
    price: 0,
    barterSkill: 'Need help debugging my Web Tech Node.js backend assignment (approx 1-2 hours)',
    condition: 'Gently Used',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    hostelBlock: 'NBH-1',
    tags: ['Barter', 'Drafter', 'Mech', 'Graphics']
  },
  {
    id: 'listing_03',
    ownerId: 'user_ait_02',
    ownerName: 'Priya Sharma',
    ownerEmail: 'priya.it24@aitpune.edu.in',
    ownerHostel: 'GH-1',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.8,
    title: 'Higher Engineering Mathematics (B.S. Grewal 44th Edition)',
    description: 'Standard textbook for M-1, M-2 and M-3. Clean pages, highlighted formulas, and solved previous year SPPU question papers tucked inside.',
    category: 'Books & Notes',
    transactionType: 'Sell',
    price: 320,
    condition: 'Good Condition',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    hostelBlock: 'GH-1',
    tags: ['Maths', 'Grewal', 'SPPU', 'Books']
  },
  {
    id: 'listing_04',
    ownerId: 'user_ait_01',
    ownerName: 'Aarav Sharma',
    ownerEmail: 'aarav.comp23@aitpune.edu.in',
    ownerHostel: 'OBH-2',
    ownerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.9,
    title: 'Raspberry Pi 4 Model B (4GB RAM) + Aluminium Casing',
    description: 'Quad-core 64-bit SoC, dual micro-HDMI 4K, 32GB SanDisk Extreme MicroSD pre-flashed with Raspberry Pi OS. Runs cool with passive heatsinks.',
    category: 'Electronics & IoT',
    transactionType: 'Skill-Barter',
    price: 0,
    barterSkill: 'Looking for CAD SolidWorks mentoring for robotics chassis design.',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80',
    hostelBlock: 'OBH-2',
    tags: ['RaspberryPi', 'Linux', 'IoT', 'Barter']
  },
  {
    id: 'listing_05',
    ownerId: 'user_ait_05',
    ownerName: 'Vikram Patil',
    ownerEmail: 'vikram.mech23@aitpune.edu.in',
    ownerHostel: 'OBH-1',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.9,
    title: 'Hero Sprint Pro 21-Speed Gear Bicycle (With Number Lock)',
    description: 'Dual disc brakes, front suspension, smooth Shimano shifters. Includes mudguards and a sturdy 4-digit combination steel cable lock. Ideal for local Dighi/Alandi errands.',
    category: 'Cycles & Mobility',
    transactionType: 'Rent',
    price: 180,
    rentalPeriod: 'per week',
    condition: 'Good Condition',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80',
    hostelBlock: 'OBH-1',
    tags: ['Cycle', 'Bicycle', 'Mobility', 'Rent']
  },
  {
    id: 'listing_06',
    ownerId: 'user_ait_02',
    ownerName: 'Priya Sharma',
    ownerEmail: 'priya.it24@aitpune.edu.in',
    ownerHostel: 'GH-1',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.8,
    title: 'Pigeon 1.5L Stainless Steel Rapid Electric Kettle',
    description: 'Auto cut-off safety feature, boil dry protection, corded base. Perfect for midnight Maggi, green tea, or warm water during exams.',
    category: 'Hostel Essentials',
    transactionType: 'Sell',
    price: 380,
    condition: 'Gently Used',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    hostelBlock: 'GH-1',
    tags: ['Kettle', 'Hostel', 'Maggi', 'Essentials']
  },
  {
    id: 'listing_07',
    ownerId: 'user_ait_04',
    ownerName: 'Ananya Singh',
    ownerEmail: 'ananya.entc23@aitpune.edu.in',
    ownerHostel: 'GH-2',
    ownerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    ownerRating: 4.7,
    title: 'Yonex Nanoray Light 18i Badminton Racket Set',
    description: 'Graphite frame (77g ultra-lightweight) strung at 26 lbs. Comes with full zip cover and 3 Mavis 350 nylon shuttles. Ready to play at the campus badminton courts.',
    category: 'Sports & Gym',
    transactionType: 'Rent',
    price: 25,
    rentalPeriod: 'per day',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80',
    hostelBlock: 'GH-2',
    tags: ['Sports', 'Badminton', 'Yonex', 'Rent']
  },
  {
    id: 'listing_08',
    ownerId: 'user_ait_03',
    ownerName: 'Rohan Verma',
    ownerEmail: 'rohan.mech22@aitpune.edu.in',
    ownerHostel: 'NBH-1',
    ownerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    ownerRating: 5.0,
    title: '100MHz Digital Oscilloscope Probe (10X/1X) + Logic Analyzer',
    description: 'High-precision oscilloscope probe with grounding alligator clip and 8-channel USB 24MHz logic analyzer. Indispensable for ENTC/ECE hardware troubleshooting.',
    category: 'Lab Tools & Drafters',
    transactionType: 'Rent',
    price: 50,
    rentalPeriod: 'per week',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    hostelBlock: 'NBH-1',
    tags: ['Lab', 'ENTC', 'Probe', 'Oscilloscope']
  }
];

function getCampusListings() {
  try {
    const raw = localStorage.getItem('campusync_listings');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
  }
  localStorage.setItem('campusync_listings', JSON.stringify(DEFAULT_CAMPUS_LISTINGS));
  return DEFAULT_CAMPUS_LISTINGS;
}

function saveCampusListings(listings) {
  try {
    localStorage.setItem('campusync_listings', JSON.stringify(listings));
  } catch (e) {
    console.error('Error saving listings:', e);
  }
}

function getStudentRentalListings(studentName) {
  const all = getCampusListings();
  const lower = (studentName || '').toLowerCase();
  return all.filter(item => {
    const owner = (item.ownerName || '').toLowerCase();
    return owner.includes(lower) || lower.includes(owner.split(' ')[0]);
  });
}

function populateStudentRentals(studentName) {
  const sec = document.getElementById("modalRentalsSection");
  const list = document.getElementById("modalRentalsList");
  if (!sec || !list) return;

  const items = getStudentRentalListings(studentName);
  if (items.length > 0) {
    sec.style.display = "block";
    list.innerHTML = items.map(item => `
      <div class="mini-rental-card">
        <img class="mini-rental-thumb" src="${item.imageUrl}" alt="${item.title}" />
        <div class="mini-rental-info">
          <div class="mini-rental-title" title="${item.title}">${item.title}</div>
          <div class="mini-rental-price">${item.transactionType === 'Rent' ? '₹' + item.price + ' ' + (item.rentalPeriod || '/week') : (item.transactionType === 'Skill-Barter' ? '🔄 Skill-Barter' : '₹' + item.price)}</div>
          <a href="javascript:void(0)" onclick="openRentalDetail('${item.id}'); event.stopPropagation();" class="mini-rental-link">View Details →</a>
        </div>
      </div>
    `).join("");
  } else {
    sec.style.display = "none";
    list.innerHTML = "";
  }
}

/* ───────── View Mode Switching ───────── */
let currentViewMode = 'directory';
let rentalFilterState = {
  type: 'all',
  category: 'all',
  hostel: 'all',
  search: ''
};

function switchViewMode(mode) {
  currentViewMode = mode;
  const dirView = document.getElementById('directoryView');
  const rentView = document.getElementById('rentalsView');
  const tabDir = document.getElementById('viewTabDirectory');
  const tabRent = document.getElementById('viewTabRentals');

  if (mode === 'rentals') {
    if (dirView) dirView.style.display = 'none';
    if (rentView) rentView.style.display = 'block';
    if (tabDir) tabDir.classList.remove('active');
    if (tabRent) tabRent.classList.add('active');
    renderRentalCards();
    window.location.hash = 'rentals';
    window.scrollTo({ top: 120, behavior: 'smooth' });
  } else {
    if (dirView) dirView.style.display = 'block';
    if (rentView) rentView.style.display = 'none';
    if (tabDir) tabDir.classList.add('active');
    if (tabRent) tabRent.classList.remove('active');
    history.replaceState(null, null, ' ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ───────── Rental Filtering & Rendering ───────── */
function filterRentalType(type, btn) {
  rentalFilterState.type = type;
  document.querySelectorAll('.rtype-chip').forEach(el => el.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderRentalCards();
}

function handleRentalCategory(cat) {
  rentalFilterState.category = cat;
  renderRentalCards();
}

function handleRentalHostel(hostel) {
  rentalFilterState.hostel = hostel;
  renderRentalCards();
}

function handleRentalSearch(query) {
  rentalFilterState.search = (query || '').toLowerCase().trim();
  renderRentalCards();
}

function renderRentalCards() {
  const container = document.getElementById('rentalsGrid');
  if (!container) return;

  const all = getCampusListings();
  const q = rentalFilterState.search;

  const filtered = all.filter(item => {
    // Transaction type
    if (rentalFilterState.type !== 'all' && item.transactionType !== rentalFilterState.type) {
      return false;
    }
    // Category
    if (rentalFilterState.category !== 'all' && item.category !== rentalFilterState.category) {
      return false;
    }
    // Hostel
    if (rentalFilterState.hostel !== 'all' && item.hostelBlock !== rentalFilterState.hostel) {
      return false;
    }
    // Search query
    if (q) {
      const matchTitle = (item.title || '').toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const matchCat = (item.category || '').toLowerCase().includes(q);
      const matchHostel = (item.hostelBlock || '').toLowerCase().includes(q);
      const matchOwner = (item.ownerName || '').toLowerCase().includes(q);
      const matchTags = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchHostel && !matchOwner && !matchTags) {
        return false;
      }
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.7); border-radius: 20px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">📦</div>
        <h3 style="font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 6px;">No items match your filter</h3>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 16px;">Try adjusting your hostel block or search query, or be the first to list one!</p>
        <button onclick="openAddListingPrompt()" class="rb-btn primary" style="display:inline-flex;">+ List an Item</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isRent = item.transactionType === 'Rent';
    const isBarter = item.transactionType === 'Skill-Barter';
    const isSell = item.transactionType === 'Sell';

    const typeBadgeClass = isRent ? 'type-rent' : (isBarter ? 'type-barter' : 'type-sell');
    const typeLabel = isRent ? '⏳ For Rent' : (isBarter ? '🔄 Skill-Barter' : '🏷️ For Sale');

    const priceHtml = isRent
      ? `<span class="rc-price">₹${item.price}</span><span class="rc-period">${item.rentalPeriod || 'per week'}</span>`
      : (isBarter
          ? `<span class="rc-price" style="color: #7c3aed; font-size: 16px;">Skill Trade</span>`
          : `<span class="rc-price">₹${item.price}</span><span class="rc-period">Fixed</span>`);

    const barterPrompt = isBarter && item.barterSkill
      ? `<div class="rc-barter-desc">Trade: ${item.barterSkill}</div>`
      : '';

    return `
      <div class="rent-card" data-id="${item.id}">
        <div class="rc-img-wrap">
          <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" />
          <span class="rc-type-badge ${typeBadgeClass}">${typeLabel}</span>
          <span class="rc-cat-badge">${item.category}</span>
        </div>
        <div class="rc-body">
          <h3 class="rc-title" title="${item.title}">${item.title}</h3>
          <div class="rc-price-row">${priceHtml}</div>
          ${barterPrompt}
          <p class="rc-desc">${item.description}</p>
          <div class="rc-owner-row">
            <img class="rc-owner-avatar" src="${item.ownerAvatar || 'user.png'}" alt="${item.ownerName}" />
            <div class="rc-owner-info">
              <div class="rc-owner-name">${item.ownerName}</div>
              <div class="rc-owner-hostel">📍 ${item.hostelBlock} • ⭐ ${item.ownerRating || 5.0}</div>
            </div>
          </div>
          <div class="rc-card-actions">
            <button class="rc-btn primary" onclick="openRentalDetail('${item.id}')">View &amp; Rent</button>
            <a href="./Campus-sync/dist/index.html" class="rc-btn outline" title="Open in CampusSync App">In App ↗</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ───────── Rental Detail Modal ───────── */
let activeRentalItem = null;

function openRentalDetail(itemId) {
  const all = getCampusListings();
  const item = all.find(i => i.id === itemId);
  if (!item) return;

  activeRentalItem = item;

  document.getElementById('rdTypeBadge').textContent = item.transactionType === 'Rent' ? '⏳ For Rent' : (item.transactionType === 'Skill-Barter' ? '🔄 Skill-Barter' : '🏷️ For Sale');
  document.getElementById('rdCategoryBadge').textContent = item.category;
  document.getElementById('rdImage').src = item.imageUrl;
  document.getElementById('rdTitle').textContent = item.title;
  
  if (item.transactionType === 'Rent') {
    document.getElementById('rdPrice').textContent = `₹${item.price} ${item.rentalPeriod || 'per week'}`;
  } else if (item.transactionType === 'Skill-Barter') {
    document.getElementById('rdPrice').textContent = `🔄 Skill-Barter (${item.barterSkill || 'Trade Help'})`;
  } else {
    document.getElementById('rdPrice').textContent = `₹${item.price} (Outright)`;
  }

  document.getElementById('rdCondition').textContent = `Condition: ${item.condition || 'Good'}`;
  document.getElementById('rdDescription').textContent = item.description;
  document.getElementById('rdOwnerAvatar').src = item.ownerAvatar || 'user.png';
  document.getElementById('rdOwnerName').textContent = item.ownerName;
  document.getElementById('rdOwnerHostel').textContent = `📍 Hostel ${item.hostelBlock} • ${item.ownerEmail || 'verified ait student'}`;
  document.getElementById('rdOwnerRating').textContent = `⭐ ${item.ownerRating || 5.0} Verified AITian`;

  const modal = document.getElementById('rentalDetailModal');
  const overlay = document.getElementById('modalOverlay');
  if (modal) modal.style.display = 'block';
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeRentalDetailModal() {
  const modal = document.getElementById('rentalDetailModal');
  const overlay = document.getElementById('modalOverlay');
  if (modal) modal.style.display = 'none';
  if (overlay && !document.getElementById('profileModal').classList.contains('open')) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function simulateRentChat() {
  if (!activeRentalItem) return;
  showToast(`💬 Negotiation chat initiated with ${activeRentalItem.ownerName} in ${activeRentalItem.hostelBlock}! Opening CampusSync...`, "💬");
  setTimeout(() => {
    window.location.href = "./Campus-sync/dist/index.html";
  }, 1200);
}

/* ───────── Quick Add Listing Modal ───────── */
function openAddListingPrompt() {
  const modal = document.getElementById('listItemModal');
  const overlay = document.getElementById('modalOverlay');
  if (modal) modal.style.display = 'block';
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeListItemModal() {
  const modal = document.getElementById('listItemModal');
  const overlay = document.getElementById('modalOverlay');
  if (modal) modal.style.display = 'none';
  if (overlay && !document.getElementById('profileModal').classList.contains('open')) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function toggleLimPrice(type) {
  const priceRow = document.getElementById('limPriceRow');
  const barterRow = document.getElementById('limBarterRow');
  if (type === 'Skill-Barter') {
    if (priceRow) priceRow.style.display = 'none';
    if (barterRow) barterRow.style.display = 'flex';
  } else {
    if (priceRow) priceRow.style.display = 'grid';
    if (barterRow) barterRow.style.display = 'none';
  }
}

function handleQuickListItem(e) {
  e.preventDefault();
  const title = document.getElementById('limTitle').value.trim();
  const category = document.getElementById('limCategory').value;
  const transactionType = document.getElementById('limType').value;
  const price = parseFloat(document.getElementById('limPrice').value) || 0;
  const rentalPeriod = document.getElementById('limPeriod').value;
  const barterSkill = document.getElementById('limBarter').value.trim();
  const hostelBlock = document.getElementById('limHostel').value;
  const condition = document.getElementById('limCondition').value;
  const description = document.getElementById('limDesc').value.trim();

  // Category fallback image presets
  const presets = {
    'Electronics & IoT': 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80',
    'Lab Tools & Drafters': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    'Books & Notes': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    'Cycles & Mobility': 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80',
    'Hostel Essentials': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    'Sports & Gym': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80'
  };

  const newListing = {
    id: 'listing_' + Date.now(),
    ownerId: 'user_current',
    ownerName: 'You (AIT Student)',
    ownerEmail: 'student@aitpune.edu.in',
    ownerHostel: hostelBlock,
    ownerAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AITian',
    ownerRating: 5.0,
    title,
    category,
    transactionType,
    price: transactionType === 'Skill-Barter' ? 0 : price,
    rentalPeriod: transactionType === 'Rent' ? rentalPeriod : undefined,
    barterSkill: transactionType === 'Skill-Barter' ? barterSkill : undefined,
    condition,
    description,
    hostelBlock,
    imageUrl: presets[category] || presets['Electronics & IoT'],
    createdAt: Date.now(),
    tags: [category, transactionType, hostelBlock]
  };

  const all = getCampusListings();
  const updated = [newListing, ...all];
  saveCampusListings(updated);

  closeListItemModal();
  document.getElementById('listItemForm').reset();
  showToast("🎉 Item successfully listed for rent! Synced to CampusSync.", "📦");

  if (currentViewMode !== 'rentals') {
    switchViewMode('rentals');
  } else {
    renderRentalCards();
  }
}

// Check on load if URL requests rentals
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#rentals' || window.location.search.includes('tab=rentals')) {
    switchViewMode('rentals');
  }
});

