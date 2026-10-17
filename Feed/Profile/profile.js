/* ===================================================================
   CAMPUS CONNECT — STUDENT PROFILE & SETTINGS JS (profile.js)
   Profile state, Live project links, Saved posts archive, Settings
   =================================================================== */

let myProfile = {
  name: "Snehangshu Das",
  year: "B.Tech Computer Science '26 · AIT Pune",
  roll: "22045",
  status: "🚀 Open for Collaborations",
  bio: "Full-stack developer & AI researcher bridging web architecture and ML systems. Lead at Open Source Software Club. Currently building developer productivity tools and competing in collegiate hackathons.",
  skills: "React, Node.js, Python, TypeScript, Docker, FastAPI, Git, UI/UX",
  socials: {
    linkedin: { url: "linkedin.com/in/snehangshudas", show: true, name: "LinkedIn", icon: "💼", cls: "chip-linkedin" },
    github: { url: "github.com/snehangshu", show: true, name: "GitHub", icon: "🐙", cls: "chip-github" },
    instagram: { url: "instagram.com/snehangshu.dev", show: true, name: "Instagram", icon: "📸", cls: "chip-instagram" },
    telegram: { url: "t.me/snehangshu_ait", show: false, name: "Telegram", icon: "✈️", cls: "chip-telegram" },
    x: { url: "x.com/snehangshu_d", show: true, name: "X", icon: "🐦", cls: "chip-x" },
    whatsapp: { url: "+91 98765 43210", show: false, name: "WhatsApp", icon: "💬", cls: "chip-whatsapp" },
    website: { url: "snehangshu.dev", show: true, name: "Website", icon: "🌐", cls: "chip-website" }
  },
  customSocials: []
};

let myPosts = [
  {
    id: "p-my-1",
    tag: "💻 Recent Work",
    time: "5 hours ago",
    text: "Just pushed v1.0 of our open-source 'CampusCode AI' developer assistant! 🚀 It analyzes college assignment repos, explains code line-by-line, and generates unit tests locally. Looking for 1 frontend dev and 1 Python developer for HackSphere Pune. Hit Collaborate below to team up!",
    image: "https://picsum.photos/seed/devtoolsai/800/450",
    likes: 184,
    liked: true,
    commentsCount: 2
  },
  {
    id: "p-my-2",
    tag: "🏆 Achievement",
    time: "3 days ago",
    text: "Ranked Top 5 in Smart India Hackathon internal campus selection round! 🥇 Our autonomous lab monitoring system passed all stress tests. Huge thanks to our faculty guide Prof. Karandikar.",
    image: "https://picsum.photos/seed/sihaward2025/800/450",
    likes: 242,
    liked: true,
    commentsCount: 5
  },
  {
    id: "p-my-3",
    tag: "🎪 Club Activity",
    time: "1 week ago",
    text: "Conducted the Git & GitHub beginner workshop for 120+ first-year students at Ramanujan Hall! 🎓 Amazing energy from the freshers. Keep contributing to open source!",
    image: null,
    likes: 198,
    liked: false,
    commentsCount: 8
  }
];

const myProjects = [
  {
    id: "proj-1",
    title: "CampusCode AI — Local Code Assistant",
    status: "Active Capstone",
    statusColor: "emerald",
    desc: "An open-source developer tool that indexes local college code repositories and generates explanations, security linting, and automated unit tests. Powered by FastAPI, WebAssembly, and quantized LLMs.",
    tags: ["Python", "FastAPI", "TypeScript", "Llama-3"],
    githubUrl: "https://github.com/snehangshu/campus-code-ai",
    liveUrl: "https://campuscode-ait.vercel.app",
    docsUrl: "https://github.com/snehangshu/campus-code-ai#readme"
  },
  {
    id: "proj-2",
    title: "Campus Connect — Social & Directory Portal",
    status: "AIT Official",
    statusColor: "primary",
    desc: "Unified community platform for AIT Pune connecting students, faculty, alumni, and club chapters. Includes interactive student search, feeds, achievement broadcasts, and peer project collaboration.",
    tags: ["HTML5", "Modern CSS", "JavaScript", "Glassmorphism"],
    githubUrl: "https://github.com/snehangshu/campus-connect-ait",
    liveUrl: "https://campusconnect-ait.edu",
    docsUrl: "https://github.com/snehangshu/campus-connect-ait#architecture"
  },
  {
    id: "proj-3",
    title: "CyberShield — Automated Campus Wi-Fi Audit",
    status: "Collaboration",
    statusColor: "amber",
    desc: "Collaborative research project with Ishita Desai auditing network isolation and open port vulnerabilities across campus dormitory subnets.",
    tags: ["Network Security", "Wireshark", "Python", "Burp Suite"],
    githubUrl: "https://github.com/snehangshu/cybershield-ait",
    liveUrl: "https://cybershield-dashboard.internal.ait",
    docsUrl: null
  }
];

const myMemberClubs = [
  "OSS Club",
  "GDG AIT Pune",
  "Centre of Excellence for AI & Robotics (CEAR)",
  "Technical Board",
  "E-Cell",
  "DDQ Club",
  "Cycling Club"
];

const allCampusFeedPosts = [
  {
    id: "feed-1",
    author: "AIT Pune Official",
    role: "Administration & R&D Cell",
    badgeText: "🏆 College Achievement",
    time: "2 hours ago",
    text: "Proud to announce that AIT Pune has been awarded the 'A+ National Academic Excellence Accreditation' by NAAC with a record CGPA score of 3.68! Congratulations to all faculty, research scholars, and students for this stellar collegiate milestone.",
    image: "https://picsum.photos/seed/aitcampusaward/900/500",
    likes: 342,
    commentsCount: 24
  },
  {
    id: "feed-2",
    author: "Ishita Desai",
    role: "B.Tech IT '28 · CyberSec Researcher",
    badgeText: "💻 Student Work",
    time: "4 hours ago",
    text: "Published our new open-source campus tool: 'AIT Wi-Fi Audit & Vulnerability Scanner' 🛡️ It tests subnet isolation and alerts when unencrypted credentials pass through access points. Check it out on GitHub!",
    image: "https://picsum.photos/seed/cybernetwork/900/500",
    likes: 129,
    commentsCount: 11
  },
  {
    id: "feed-3",
    author: "Open Source Software Club (OSS)",
    role: "Technical Board Club Chapter",
    badgeText: "🎪 Club Event",
    time: "6 hours ago",
    text: "Hacktoberfest 2026 registration is officially LIVE! 🔥 Over 20+ open-source mentors from top product companies will guide you through your first PRs. Register via the Events tab on the right sidebar.",
    image: "https://picsum.photos/seed/hacktoberfest2026/900/500",
    likes: 215,
    commentsCount: 18
  },
  {
    id: "feed-4",
    author: "Dr. Sanjay Karandikar",
    role: "Professor & Head of CSE",
    badgeText: "👨‍🏫 Faculty Update",
    time: "Yesterday",
    text: "Congratulations to our 3rd-year students Rohan Patil and Snehangshu Das for publishing their paper 'Distributed Edge-Inference for IoT Fleets' in IEEE Transactions on Cloud Systems.",
    image: null,
    likes: 412,
    commentsCount: 38
  },
  {
    id: "feed-5",
    author: "Sports Cell AIT",
    role: "Department of Physical Education",
    badgeText: "🏆 College Achievement",
    time: "2 days ago",
    text: "AIT Pune Football Team wins the Pune Inter-Collegiate Defense Invitational Trophy defeating NDA Khadakwasla 2-1 in a nail-biting final match at AFMC Stadium! ⚽🏆",
    image: "https://picsum.photos/seed/footballaitcup/900/500",
    likes: 512,
    commentsCount: 45
  }
];

let modalSelectedCategory = "student";
let modalImageAttached = true;

/* ─────────────────────────────────────────────────────────
   INITIALIZATION
   ───────────────────────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  loadSavedProfileData();
  initVerificationState();
  renderMyPosts();
  renderPortfolioProjects();
  renderSavedPosts();
  populateModalClubDropdown();
});

/* ─────────────────────────────────────────────────────────
   TABS SWITCHING
   ───────────────────────────────────────────────────────── */
function switchProfileTab(tabKey, btnEl) {
  document.querySelectorAll(".tab-nav-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));

  const targetBtn = btnEl || document.getElementById("tabBtn-" + tabKey);
  if (targetBtn) targetBtn.classList.add("active");

  const targetPanel = document.getElementById("panel-" + tabKey);
  if (targetPanel) {
    targetPanel.classList.add("active");
    if (tabKey === "settings" && !btnEl) {
      targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (tabKey === "saved") {
    renderSavedPosts();
  }
}

/* ─────────────────────────────────────────────────────────
   RENDER MY POSTS
   ───────────────────────────────────────────────────────── */
function renderMyPosts() {
  const container = document.getElementById("myPostsList");
  if (!container) return;

  const stat = document.getElementById("statPostsCount");
  if (stat) stat.textContent = myPosts.length;

  if (!myPosts.length) {
    container.innerHTML = `<div class="glass-box" style="padding:40px; text-align:center; color:var(--text-muted);">No posts yet. Share your first work!</div>`;
    return;
  }

  container.innerHTML = myPosts.map(p => `
    <article class="glass-box" style="padding: 22px 26px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="user.png" style="width: 38px; height: 38px; border-radius: 50%;" />
          <div>
            <strong style="font-size: 14px; color: var(--text-main); display:block;">${myProfile.name}</strong>
            <span style="font-size: 11.5px; color: var(--text-muted);">${p.time}</span>
          </div>
        </div>
        <span style="font-size: 11px; font-weight:700; background:rgba(99,102,241,0.1); color:var(--primary); padding:4px 10px; border-radius:99px;">${p.tag}</span>
      </div>

      <p style="font-size: 14.5px; line-height: 1.65; color: var(--text-main); margin-bottom: 14px;">${p.text}</p>
      ${p.image ? `<img src="${p.image}" style="width: 100%; max-height: 380px; object-fit: cover; border-radius: 12px; margin-bottom: 14px; display:block;" />` : ''}

      <div style="display: flex; align-items: center; gap: 16px; font-size: 13px; font-weight: 700; color: var(--text-sub); border-top: 1px solid rgba(0,0,0,0.05); padding-top: 10px;">
        <span>❤️ ${p.likes} Likes</span>
        <span>💬 ${p.commentsCount} Comments</span>
        <button onclick="deletePost('${p.id}')" style="margin-left: auto; background: none; border: none; font-size: 12.5px; font-weight:700; color: #e11d48; cursor: pointer;">Delete 🗑️</button>
      </div>
    </article>
  `).join("");
}

function deletePost(id) {
  const confirmed = confirm("Are you sure you want to delete this post from your profile? This action cannot be undone.");
  if (!confirmed) return;

  myPosts = myPosts.filter(p => p.id !== id);
  renderMyPosts();
  showToast("Post removed from your profile.", "🗑️");
}

/* ─────────────────────────────────────────────────────────
   RENDER PORTFOLIO & PROJECTS (WITH LIVE CLICKABLE LINKS)
   ───────────────────────────────────────────────────────── */
function renderPortfolioProjects() {
  const container = document.getElementById("portfolioProjectsList");
  if (!container) return;

  container.innerHTML = myProjects.map(proj => {
    let statusStyle = "background: rgba(16,185,129,0.12); color: var(--emerald);";
    if (proj.statusColor === "primary") statusStyle = "background: rgba(99,102,241,0.12); color: var(--primary);";
    if (proj.statusColor === "amber") statusStyle = "background: rgba(245,158,11,0.14); color: #b45309;";

    return `
      <div class="glass-box" style="padding: 26px 30px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 17.5px; font-weight: 800; color: var(--text-main);">${proj.title}</h3>
          <span style="font-size: 11.5px; font-weight: 700; ${statusStyle} padding: 4px 12px; border-radius: 99px;">${proj.status}</span>
        </div>

        <p style="font-size: 14px; color: var(--text-sub); line-height: 1.6; margin-bottom: 14px;">${proj.desc}</p>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
          ${proj.tags.map(t => `<span style="font-size: 11.5px; font-weight: 700; background: rgba(99,102,241,0.1); color: var(--primary); padding: 4px 10px; border-radius: 99px;">${t}</span>`).join("")}
        </div>

        <!-- Clickable Live Project Links -->
        <div class="project-links-row" style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 14px;">
          ${proj.githubUrl ? `
            <a href="${proj.githubUrl}" target="_blank" class="project-link-btn project-link-github" title="View source code on GitHub">
              <span>🐙 GitHub Repo ↗</span>
            </a>
          ` : ''}
          ${proj.liveUrl ? `
            <a href="${proj.liveUrl}" target="_blank" class="project-link-btn project-link-live" title="Open live interactive deployment">
              <span>🚀 Live Demo / Site ↗</span>
            </a>
          ` : ''}
          ${proj.docsUrl ? `
            <a href="${proj.docsUrl}" target="_blank" class="project-link-btn project-link-github" title="View technical documentation">
              <span>📖 Docs &amp; Paper ↗</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join("");
}

/* ─────────────────────────────────────────────────────────
   RENDER SAVED POSTS (INSTAGRAM STYLE ARCHIVE WITH ACTUAL CARDS)
   ───────────────────────────────────────────────────────── */
function renderSavedPosts() {
  const container = document.getElementById("savedPostsList");
  if (!container) return;

  let savedIds = JSON.parse(localStorage.getItem("ait_saved_posts") || "[]");
  if (!localStorage.getItem("ait_saved_posts")) {
    savedIds = ["feed-1", "feed-3"];
    localStorage.setItem("ait_saved_posts", JSON.stringify(savedIds));
  }

  const badge = document.getElementById("savedCountNum");
  if (badge) badge.textContent = savedIds.length;

  const savedPosts = allCampusFeedPosts.filter(p => savedIds.includes(p.id));

  if (!savedPosts.length) {
    container.innerHTML = `
      <div class="glass-box" style="padding: 48px 24px; text-align: center; color: var(--text-muted);">
        <div style="font-size: 44px; margin-bottom: 12px;">🔖</div>
        <h3 style="color: var(--text-main); font-size: 18px; margin-bottom: 6px; font-weight: 800;">No Saved Posts Yet</h3>
        <p style="font-size: 13.5px; max-width: 440px; margin: 0 auto 18px;">Click the Bookmark/Save icon on any post in the Campus Feed to archive it directly here.</p>
        <a href="../feed.html" class="btn-primary" style="display:inline-block; text-decoration:none; padding:8px 22px; font-size:13px;">Browse Campus Feed ↗</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="glass-box" style="padding: 14px 22px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <span style="font-size: 13.5px; font-weight: 800; color: var(--text-main);">
        Archived Posts (${savedPosts.length})
      </span>
      <button onclick="clearAllSaved()" style="background: none; border: none; font-size: 12.5px; font-weight: 700; color: #e11d48; cursor: pointer;">
        🗑️ Clear All Archive
      </button>
    </div>

    <div style="display: flex; flex-direction: column; gap: 18px;">
      ${savedPosts.map(p => `
        <article class="glass-box" style="padding: 22px 26px; border-radius: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="user.png" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />
              <div>
                <strong style="font-size: 14.5px; color: var(--text-main); display:block;">${p.author}</strong>
                <span style="font-size: 11.5px; color: var(--text-muted);">${p.role} · ${p.time}</span>
              </div>
            </div>
            <span style="font-size: 11px; font-weight:800; background:rgba(99,102,241,0.1); color:var(--primary); padding:4px 12px; border-radius:99px;">
              ${p.badgeText}
            </span>
          </div>

          <p style="font-size: 14.5px; line-height: 1.65; color: var(--text-main); margin-bottom: 14px;">${p.text}</p>
          ${p.image ? `<img src="${p.image}" style="width: 100%; max-height: 380px; object-fit: cover; border-radius: 12px; margin-bottom: 14px; display:block;" />` : ''}

          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 12px; font-size: 13px;">
            <div style="display: flex; gap: 14px; color: var(--text-sub); font-weight: 700;">
              <span>❤️ ${p.likes} Likes</span>
              <span>💬 ${p.commentsCount} Comments</span>
            </div>
            <div style="display: flex; gap: 10px;">
              <a href="../feed.html" class="event-rsvp-btn" style="text-decoration:none; padding:4px 14px; font-size:12px;">↗️ View on Feed</a>
              <button onclick="removeSavedPost('${p.id}')" style="background: none; border: none; font-size: 12.5px; font-weight:700; color: #e11d48; cursor: pointer;">
                Unsave ✕
              </button>
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function removeSavedPost(id) {
  let savedIds = JSON.parse(localStorage.getItem("ait_saved_posts") || "[]");
  savedIds = savedIds.filter(x => x !== id);
  localStorage.setItem("ait_saved_posts", JSON.stringify(savedIds));
  renderSavedPosts();
  showToast("Post removed from your saved archive.", "🗑️");
}

function clearAllSaved() {
  const confirmed = confirm("Are you sure you want to clear your saved post archive?");
  if (!confirmed) return;
  localStorage.setItem("ait_saved_posts", "[]");
  renderSavedPosts();
  showToast("Cleared your saved bookmarks archive.", "🧹");
}

/* ─────────────────────────────────────────────────────────
   DYNAMIC SOCIAL CHANNELS & VISIBILITY PRIVACY
   ───────────────────────────────────────────────────────── */
function renderSocialChips() {
  const container = document.getElementById("profileSocialLinksBar");
  if (!container) return;

  const chipsHTML = [];

  // Standard configured channels (only render if enabled & has content)
  if (myProfile.socials) {
    Object.keys(myProfile.socials).forEach(key => {
      const s = myProfile.socials[key];
      if (s && s.show && s.url && s.url.trim() !== "") {
        let href = s.url.trim();
        if (key === "whatsapp") {
          const rawNum = href.replace(/[^0-9]/g, "");
          href = href.startsWith("http") ? href : `https://wa.me/${rawNum}`;
        } else if (key === "telegram") {
          const handle = href.replace(/^@/, "").replace("https://t.me/", "");
          href = href.startsWith("http") ? href : `https://t.me/${handle}`;
        } else if (!href.startsWith("http://") && !href.startsWith("https://")) {
          href = "https://" + href;
        }

        chipsHTML.push(`
          <a href="${href}" target="_blank" rel="noopener noreferrer" class="social-link-chip ${s.cls || ''}" title="${s.name}: ${s.url}">
            <span>${s.icon || '🔗'}</span>
            <span>${s.name}</span>
          </a>
        `);
      }
    });
  }

  // Custom user-defined platform links (only if show is true)
  if (myProfile.customSocials && Array.isArray(myProfile.customSocials)) {
    myProfile.customSocials.forEach(c => {
      if (c && c.show && c.url && c.url.trim() !== "") {
        let href = c.url.trim();
        if (!href.startsWith("http://") && !href.startsWith("https://")) href = "https://" + href;

        chipsHTML.push(`
          <a href="${href}" target="_blank" rel="noopener noreferrer" class="social-link-chip" title="${c.platform}: ${c.url}">
            <span>🌐</span>
            <span>${c.platform}</span>
          </a>
        `);
      }
    });
  }

  if (chipsHTML.length === 0) {
    container.innerHTML = `
      <span style="font-size: 12px; color: var(--text-muted); font-style: italic;">
        No public social links enabled. (Configure or show links in Settings ⚙️)
      </span>
    `;
  } else {
    container.innerHTML = chipsHTML.join("");
  }
}

let customSocialCounter = 0;
function addCustomSocialField(data = null) {
  const container = document.getElementById("customSocialsContainer");
  if (!container) return;

  const rowId = "custom-social-" + (++customSocialCounter);
  const platformVal = data ? data.platform : "";
  const urlVal = data ? data.url : "";
  const isChecked = data ? data.show : true;

  const div = document.createElement("div");
  div.className = "custom-social-row";
  div.id = rowId;
  div.innerHTML = `
    <input type="text" class="form-input custom-social-name" placeholder="Platform (e.g. Discord, LeetCode, Medium)" value="${platformVal}" style="width: 180px; flex-shrink: 0;" />
    <input type="text" class="form-input custom-social-url" placeholder="URL or handle" value="${urlVal}" style="flex: 1;" />
    <label class="social-vis-toggle" title="Toggle visibility on profile">
      <input type="checkbox" class="custom-social-vis" ${isChecked ? "checked" : ""} />
      <span>👁️ Visible</span>
    </label>
    <button type="button" class="btn-delete-social" onclick="removeCustomSocialField('${rowId}')" title="Remove custom link">✕</button>
  `;

  container.appendChild(div);
}

function removeCustomSocialField(rowId) {
  const el = document.getElementById(rowId);
  if (el) el.remove();
}

/* ─────────────────────────────────────────────────────────
   SETTINGS SAVE & LOAD
   ───────────────────────────────────────────────────────── */
function saveProfileSettings(e) {
  e.preventDefault();
  const name   = document.getElementById("settingName").value.trim();
  const year   = document.getElementById("settingYear").value.trim();
  const status = document.getElementById("settingStatus").value.trim();
  const bio    = document.getElementById("settingBio").value.trim();
  const skills = document.getElementById("settingSkills").value.trim();

  const roll   = document.getElementById("settingRoll")?.value.trim() || myProfile.roll || "22045";

  // Standard Socials & Visibilities
  const socials = {
    linkedin: {
      url: document.getElementById("settingLinkedin")?.value.trim() || "",
      show: document.getElementById("vis-linkedin")?.checked || false,
      name: "LinkedIn",
      icon: "💼",
      cls: "chip-linkedin"
    },
    github: {
      url: document.getElementById("settingGithub")?.value.trim() || "",
      show: document.getElementById("vis-github")?.checked || false,
      name: "GitHub",
      icon: "🐙",
      cls: "chip-github"
    },
    instagram: {
      url: document.getElementById("settingInstagram")?.value.trim() || "",
      show: document.getElementById("vis-instagram")?.checked || false,
      name: "Instagram",
      icon: "📸",
      cls: "chip-instagram"
    },
    telegram: {
      url: document.getElementById("settingTelegram")?.value.trim() || "",
      show: document.getElementById("vis-telegram")?.checked || false,
      name: "Telegram",
      icon: "✈️",
      cls: "chip-telegram"
    },
    x: {
      url: document.getElementById("settingX")?.value.trim() || "",
      show: document.getElementById("vis-x")?.checked || false,
      name: "X",
      icon: "🐦",
      cls: "chip-x"
    },
    whatsapp: {
      url: document.getElementById("settingWhatsapp")?.value.trim() || "",
      show: document.getElementById("vis-whatsapp")?.checked || false,
      name: "WhatsApp",
      icon: "💬",
      cls: "chip-whatsapp"
    },
    website: {
      url: document.getElementById("settingWebsite")?.value.trim() || "",
      show: document.getElementById("vis-website")?.checked || false,
      name: "Website",
      icon: "🌐",
      cls: "chip-website"
    }
  };

  // Collect any custom platform rows
  const customSocials = [];
  document.querySelectorAll(".custom-social-row").forEach(row => {
    const platform = row.querySelector(".custom-social-name")?.value.trim();
    const url = row.querySelector(".custom-social-url")?.value.trim();
    const show = row.querySelector(".custom-social-vis")?.checked || false;
    if (platform && url) {
      customSocials.push({ platform, url, show });
    }
  });

  myProfile = { name, year, roll, status, bio, skills, socials, customSocials };

  // Update Hero UI
  document.getElementById("profileNameDisplay").textContent = name;
  document.getElementById("profileSubtitleDisplay").textContent = year;
  document.getElementById("profileStatusPill").textContent = status;
  document.getElementById("profileBioDisplay").textContent = bio;

  // Persist
  localStorage.setItem("ait_student_profile", JSON.stringify(myProfile));
  try {
    const rawUser = localStorage.getItem('campusConnectUser');
    if (rawUser) {
      const u = JSON.parse(rawUser);
      u.name = name;
      u.regNo = roll;
      localStorage.setItem('campusConnectUser', JSON.stringify(u));
    }
  } catch(e) {}

  // Render newly updated social chips
  renderSocialChips();
  renderMyPosts();

  showToast("Profile & social channels updated successfully! ✨", "✓");
}

function loadSavedProfileData() {
  const sessionUser = (() => {
    try {
      const raw = localStorage.getItem('campusConnectUser');
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return null;
  })();

  if (sessionUser && sessionUser.name) {
    myProfile.name = sessionUser.name;
    if (sessionUser.regNo) myProfile.roll = sessionUser.regNo;
    if (sessionUser.branch) {
      myProfile.year = `B.Tech ${sessionUser.branch} '27 · Army Institute of Technology, Pune`;
    }
  }

  const saved = localStorage.getItem("ait_student_profile");
  if (saved) {
    try {
      const d = JSON.parse(saved);
      if (sessionUser && sessionUser.name) {
        delete d.name;
        if (sessionUser.regNo) delete d.roll;
        if (sessionUser.branch) delete d.year;
      }
      Object.assign(myProfile, d);
    } catch(e) {}
  }

  if (myProfile.avatar && document.getElementById("profileAvatarImg")) {
    document.getElementById("profileAvatarImg").src = myProfile.avatar;
  }

  // Populate UI fields
  if (myProfile.name) {
    document.getElementById("profileNameDisplay").textContent = myProfile.name;
    if (document.getElementById("settingName")) document.getElementById("settingName").value = myProfile.name;
  }
  if (myProfile.year) {
    document.getElementById("profileSubtitleDisplay").textContent = myProfile.year;
    if (document.getElementById("settingYear")) document.getElementById("settingYear").value = myProfile.year;
  }
  if (myProfile.roll && document.getElementById("settingRoll")) {
    document.getElementById("settingRoll").value = myProfile.roll;
  }
  if (myProfile.status) {
    document.getElementById("profileStatusPill").textContent = myProfile.status;
    if (document.getElementById("settingStatus")) document.getElementById("settingStatus").value = myProfile.status;
  }
  if (myProfile.bio) {
    document.getElementById("profileBioDisplay").textContent = myProfile.bio;
    if (document.getElementById("settingBio")) document.getElementById("settingBio").value = myProfile.bio;
  }
  if (myProfile.skills && document.getElementById("settingSkills")) {
    document.getElementById("settingSkills").value = myProfile.skills;
  }

  // Populate Social Inputs and Privacy Switches
  if (myProfile.socials) {
    const s = myProfile.socials;
    if (s.linkedin) {
      if (document.getElementById("settingLinkedin")) document.getElementById("settingLinkedin").value = s.linkedin.url;
      if (document.getElementById("vis-linkedin")) document.getElementById("vis-linkedin").checked = s.linkedin.show;
    }
    if (s.github) {
      if (document.getElementById("settingGithub")) document.getElementById("settingGithub").value = s.github.url;
      if (document.getElementById("vis-github")) document.getElementById("vis-github").checked = s.github.show;
    }
    if (s.instagram) {
      if (document.getElementById("settingInstagram")) document.getElementById("settingInstagram").value = s.instagram.url;
      if (document.getElementById("vis-instagram")) document.getElementById("vis-instagram").checked = s.instagram.show;
    }
    if (s.telegram) {
      if (document.getElementById("settingTelegram")) document.getElementById("settingTelegram").value = s.telegram.url;
      if (document.getElementById("vis-telegram")) document.getElementById("vis-telegram").checked = s.telegram.show;
    }
    if (s.x) {
      if (document.getElementById("settingX")) document.getElementById("settingX").value = s.x.url;
      if (document.getElementById("vis-x")) document.getElementById("vis-x").checked = s.x.show;
    }
    if (s.whatsapp) {
      if (document.getElementById("settingWhatsapp")) document.getElementById("settingWhatsapp").value = s.whatsapp.url;
      if (document.getElementById("vis-whatsapp")) document.getElementById("vis-whatsapp").checked = s.whatsapp.show;
    }
    if (s.website) {
      if (document.getElementById("settingWebsite")) document.getElementById("settingWebsite").value = s.website.url;
      if (document.getElementById("vis-website")) document.getElementById("vis-website").checked = s.website.show;
    }
  }

  // Populate Custom Socials
  const customContainer = document.getElementById("customSocialsContainer");
  if (customContainer) {
    customContainer.innerHTML = "";
    if (myProfile.customSocials && Array.isArray(myProfile.customSocials)) {
      myProfile.customSocials.forEach(c => addCustomSocialField(c));
    }
  }

  renderSocialChips();
}

/* ─────────────────────────────────────────────────────────
   UNIFIED COMPOSE POST MODAL (FLOATING)
   Matches feed composer structure and design
   ───────────────────────────────────────────────────────── */
function openComposeModal() {
  populateModalClubDropdown();
  const modal = document.getElementById("composeModal");
  const overlay = document.getElementById("composeOverlay");
  if (modal) modal.classList.add("open");
  if (overlay) overlay.classList.add("open");
}

function closeComposeModal() {
  const modal = document.getElementById("composeModal");
  const overlay = document.getElementById("composeOverlay");
  if (modal) modal.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
}

function selectModalCategory(cat, btn) {
  // Permission restriction: Students cannot post college achievements
  if (cat === "college") {
    showToast("⚠️ Permission Denied: Only College Administrators and Faculty can publish College Achievements.", "🔒");
    return;
  }

  modalSelectedCategory = cat;
  document.querySelectorAll("#composeModal .composer-tag-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const clubRow = document.getElementById("modalClubRow");
  if (clubRow) {
    clubRow.style.display = (cat === "club") ? "block" : "none";
  }
}

function populateModalClubDropdown() {
  const select = document.getElementById("modalClubSelect");
  if (!select) return;

  // Only member clubs — no locks or disabled options!
  select.innerHTML = myMemberClubs.map(c => `
    <option value="${c}">${c}</option>
  `).join("");
}

function toggleModalImage() {
  modalImageAttached = !modalImageAttached;
  const lbl = document.getElementById("modalAttachImgLabel");
  if (lbl) lbl.textContent = modalImageAttached ? "Image Attached ✓" : "Attach Image";
  showToast(modalImageAttached ? "Image attached to post!" : "Image removed", "🖼️");
}

function submitModalPost() {
  const input = document.getElementById("modalPostText");
  const text = input ? input.value.trim() : "";
  if (!text) {
    showToast("Please enter some project or milestone details before posting!", "⚠️");
    return;
  }

  let tag = "💻 Recent Work";
  if (modalSelectedCategory === "collab") tag = "🤝 Collab Request";
  if (modalSelectedCategory === "club") {
    const clubSel = document.getElementById("modalClubSelect");
    const chosenClub = clubSel ? clubSel.value : "Club Activity";
    tag = `🎪 ${chosenClub}`;
  }

  const newPost = {
    id: "p-my-" + Date.now(),
    tag: tag,
    time: "Just now",
    text: text,
    image: modalImageAttached ? "https://picsum.photos/seed/work" + Date.now() + "/800/450" : null,
    likes: 1,
    liked: true,
    commentsCount: 0
  };

  myPosts.unshift(newPost);
  if (input) input.value = "";
  closeComposeModal();
  renderMyPosts();
  switchProfileTab('posts');
  showToast("Your work has been published to your profile & campus feed! 🚀", "🚀");
}

/* ─────────────────────────────────────────────────────────
   TOAST NOTIFICATION
   ───────────────────────────────────────────────────────── */
function showToast(msg, icon = "🤝") {
  const t = document.getElementById("toastNotify");
  if (!t) return;
  document.getElementById("toastIcon").textContent = icon;
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(window._profToastTimer);
  window._profToastTimer = setTimeout(() => t.classList.remove("show"), 3200);
}

/* ─────────────────────────────────────────────────────────
   COLLEGE ID CARD VERIFICATION & TWITTER/X BLUE BADGE
   ───────────────────────────────────────────────────────── */

const VERIFICATION_STORAGE_KEY = "ait_profile_verified";
const ID_CARD_IMG_STORAGE_KEY = "ait_profile_id_card";
const ID_CARD_DATE_STORAGE_KEY = "ait_profile_id_date";

let currentSelectedIdDataUrl = null;

function isStudentVerified() {
  return localStorage.getItem(VERIFICATION_STORAGE_KEY) === "true";
}

function getStoredIdCardImage() {
  return localStorage.getItem(ID_CARD_IMG_STORAGE_KEY) || "ait_id_sample.jpg";
}

function getStoredVerificationDate() {
  return localStorage.getItem(ID_CARD_DATE_STORAGE_KEY) || "Verified Member";
}

function initVerificationState() {
  const verified = isStudentVerified();
  const idImg = getStoredIdCardImage();
  const verifyDate = getStoredVerificationDate();

  // 1. Twitter / X Blue Verified Badge next to name
  const verifiedBadge = document.getElementById("profileVerifiedBadge");
  const heroVerifiedPill = document.getElementById("heroVerifiedPill");
  const heroVerifyBtn = document.getElementById("btnHeroVerifyAction");
  const heroVerifyLabel = document.getElementById("btnHeroVerifyLabel");

  if (verifiedBadge) {
    verifiedBadge.style.display = verified ? "inline-flex" : "none";
  }
  if (heroVerifiedPill) {
    heroVerifiedPill.style.display = verified ? "inline-flex" : "none";
  }
  if (heroVerifyBtn && heroVerifyLabel) {
    if (verified) {
      heroVerifyBtn.classList.add("is-verified");
      heroVerifyLabel.textContent = "ID Verified ✓";
      heroVerifyBtn.title = "View Verified College ID Card";
      heroVerifyBtn.onclick = openIdViewModal;
    } else {
      heroVerifyBtn.classList.remove("is-verified");
      heroVerifyLabel.textContent = "Verify ID Card";
      heroVerifyBtn.title = "Upload College ID Card to get verified";
      heroVerifyBtn.onclick = openIdCardModal;
    }
  }

  // 2. Render Hero ID Verification Banner (above tabs)
  renderIdVerificationBanner(verified, idImg, verifyDate);

  // 3. Render Settings Page ID Card Section
  renderSettingsIdCardSection(verified, idImg, verifyDate);

  // Setup dropzone drag and drop listeners once
  setupDropzoneEvents();
}

function renderIdVerificationBanner(verified, idImg, verifyDate) {
  const banner = document.getElementById("idVerificationBanner");
  if (!banner) return;

  if (verified) {
    banner.className = "glass-box id-verification-banner verified";
    banner.innerHTML = `
      <div class="id-banner-left">
        <div class="id-banner-icon-box verified">
          <svg viewBox="0 0 24 24" class="x-verified-icon">
            <path fill="#1d9bf0" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
          </svg>
        </div>
        <div>
          <div class="id-banner-title">
            <span>Official AIT Student Profile Verified</span>
            <span class="id-badge-tag verified"><i class="fa-solid fa-circle-check"></i> Twitter/X Verified Badge Active</span>
          </div>
          <p class="id-banner-sub">
            Your identity has been verified with your official AIT College ID Card (${verifyDate}). Your verified blue checkmark is displayed across your profile, news feeds, and college boards.
          </p>
        </div>
      </div>
      <div class="id-banner-actions">
        <button type="button" class="btn-secondary" onclick="openIdViewModal()" style="font-size: 12.5px; padding: 8px 16px;">
          <i class="fa-solid fa-eye"></i> <span>View ID Card</span>
        </button>
        <button type="button" class="btn-verify-pill" onclick="openIdCardModal()" style="font-size: 12.5px; padding: 8px 16px;">
          <i class="fa-solid fa-arrow-rotate-right"></i> <span>Update ID</span>
        </button>
      </div>
    `;
  } else {
    banner.className = "glass-box id-verification-banner unverified";
    banner.innerHTML = `
      <div class="id-banner-left">
        <div class="id-banner-icon-box unverified">
          <i class="fa-solid fa-id-card"></i>
        </div>
        <div>
          <div class="id-banner-title">
            <span>Get Verified with Your College ID Card</span>
            <span class="id-badge-tag unverified">Unverified Account</span>
          </div>
          <p class="id-banner-sub">
            Upload your official Army Institute of Technology student ID card to earn the Twitter/X blue checkmark badge, increase credibility among student clubs, and verify your campus peer status.
          </p>
        </div>
      </div>
      <div class="id-banner-actions">
        <button type="button" class="btn-primary" onclick="openIdCardModal()" style="font-size: 13px; padding: 9px 20px; background: linear-gradient(135deg, #1d9bf0, #0284c7);">
          <i class="fa-solid fa-camera"></i>
          <span>Upload College ID</span>
        </button>
      </div>
    `;
  }
}

function renderSettingsIdCardSection(verified, idImg, verifyDate) {
  const badgeContainer = document.getElementById("settingsVerificationBadgeContainer");
  const content = document.getElementById("settingsIdCardContent");
  if (!badgeContainer || !content) return;

  if (verified) {
    badgeContainer.innerHTML = `
      <span class="profile-verified-pill" style="font-size: 12px;">
        <svg viewBox="0 0 24 24" style="width: 15px; height: 15px; vertical-align: middle;">
          <path fill="#1d9bf0" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
        </svg>
        <strong style="margin-left: 2px;">Twitter/X Verified Student</strong>
      </span>
    `;

    content.innerHTML = `
      <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap; background: rgba(255, 255, 255, 0.65); padding: 18px; border-radius: 14px; border: 1px solid rgba(16, 185, 129, 0.25);">
        <div style="position: relative; width: 180px; max-width: 100%; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.12); cursor: pointer;" onclick="openIdViewModal()">
          <img src="${idImg}" alt="Verified College ID" style="width: 100%; height: auto; display: block;">
          <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s;" onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=0">
            <span style="color: #fff; font-size: 11px; font-weight: 700; background: rgba(0,0,0,0.6); padding: 4px 8px; border-radius: 6px;">🔍 Enlarge</span>
          </div>
        </div>
        <div style="flex: 1; min-width: 240px;">
          <div style="font-size: 14px; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-circle-check" style="color: #10b981;"></i>
            <span>AIT Student Smart ID Verified</span>
          </div>
          <div style="font-size: 12px; color: var(--text-sub); margin-top: 4px;">
            Verified credential associated with roll <strong>${myProfile.roll || '22045'}</strong> (${myProfile.name}).
          </div>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">
            Status: Active · Logged on ${verifyDate}
          </div>
          <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
            <button type="button" class="btn-secondary" onclick="openIdViewModal()" style="font-size: 12px; padding: 6px 14px;">
              <i class="fa-solid fa-eye"></i> View Full ID
            </button>
            <button type="button" class="btn-secondary" onclick="openIdCardModal()" style="font-size: 12px; padding: 6px 14px;">
              <i class="fa-solid fa-arrow-rotate-right"></i> Change ID Photo
            </button>
            <button type="button" onclick="removeIdVerification()" style="background: none; border: none; color: #ef4444; font-size: 12px; font-weight: 600; cursor: pointer; padding: 6px 10px;">
              Remove Verification
            </button>
          </div>
        </div>
      </div>
    `;
  } else {
    badgeContainer.innerHTML = `
      <span class="id-badge-tag unverified" style="font-size: 12px; padding: 5px 12px;">
        ⚠️ Not Verified
      </span>
    `;

    content.innerHTML = `
      <div class="id-upload-dropzone" onclick="openIdCardModal()" style="padding: 24px;">
        <div class="dropzone-icon">
          <i class="fa-solid fa-id-card"></i>
        </div>
        <div class="dropzone-title">Upload your College ID Card to get the Verified Badge</div>
        <div class="dropzone-sub">Click here to select a photo from your device or use the sample demo card</div>
        <button type="button" class="btn-primary" style="margin-top: 14px; font-size: 12.5px; padding: 8px 18px; background: linear-gradient(135deg, #1d9bf0, #0284c7);">
          <i class="fa-solid fa-camera"></i> Select ID Card Photo
        </button>
      </div>
    `;
  }
}

function openIdCardModal() {
  currentSelectedIdDataUrl = null;
  const modal = document.getElementById("idUploadModal");
  const overlay = document.getElementById("idUploadOverlay");
  const dropzonePrompt = document.getElementById("dropzonePrompt");
  const dropzonePreview = document.getElementById("dropzonePreview");
  const btnSubmit = document.getElementById("btnSubmitIdVerification");
  const studentNameMeta = document.getElementById("idMetaStudentName");
  const rollNoMeta = document.getElementById("idMetaRollNo");

  if (studentNameMeta) studentNameMeta.textContent = myProfile.name || "Snehangshu Das";
  if (rollNoMeta) rollNoMeta.textContent = myProfile.roll || "22045";

  if (dropzonePrompt) dropzonePrompt.style.display = "block";
  if (dropzonePreview) dropzonePreview.style.display = "none";
  if (btnSubmit) btnSubmit.disabled = true;

  // Clear file input
  const fileInput = document.getElementById("idCardFileInput");
  if (fileInput) fileInput.value = "";

  if (modal) modal.classList.add("open");
  if (overlay) overlay.classList.add("open");
}

function closeIdCardModal() {
  const modal = document.getElementById("idUploadModal");
  const overlay = document.getElementById("idUploadOverlay");
  if (modal) modal.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
}

function triggerIdFileInput() {
  const fileInput = document.getElementById("idCardFileInput");
  if (fileInput) fileInput.click();
}

function handleIdFileSelect(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("Please upload a valid image file (JPG, PNG, or WEBP).", "⚠️");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    applySelectedIdImage(evt.target.result);
  };
  reader.readAsDataURL(file);
}

function useDemoIdCard() {
  applySelectedIdImage("ait_id_sample.jpg");
  showToast("Sample AIT Student ID loaded! Click 'Verify & Activate Badge' to complete.", "⚡");
}

function applySelectedIdImage(imgUrl) {
  currentSelectedIdDataUrl = imgUrl;
  const dropzonePrompt = document.getElementById("dropzonePrompt");
  const dropzonePreview = document.getElementById("dropzonePreview");
  const previewImg = document.getElementById("idPreviewImg");
  const btnSubmit = document.getElementById("btnSubmitIdVerification");

  if (previewImg) previewImg.src = imgUrl;
  if (dropzonePrompt) dropzonePrompt.style.display = "none";
  if (dropzonePreview) dropzonePreview.style.display = "flex";
  if (btnSubmit) btnSubmit.disabled = false;
}

function submitIdCardVerification() {
  if (!currentSelectedIdDataUrl) {
    showToast("Please select or drop your college ID card photo first!", "⚠️");
    return;
  }

  const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Save to localStorage
  try {
    localStorage.setItem(VERIFICATION_STORAGE_KEY, "true");
    localStorage.setItem(ID_CARD_IMG_STORAGE_KEY, currentSelectedIdDataUrl);
    localStorage.setItem(ID_CARD_DATE_STORAGE_KEY, formattedDate);
  } catch(e) {
    console.warn("Storage quota or error:", e);
    localStorage.setItem(VERIFICATION_STORAGE_KEY, "true");
    localStorage.setItem(ID_CARD_IMG_STORAGE_KEY, "ait_id_sample.jpg");
    localStorage.setItem(ID_CARD_DATE_STORAGE_KEY, formattedDate);
  }

  closeIdCardModal();
  initVerificationState();

  // Play celebration animation on the badge!
  const badge = document.getElementById("profileVerifiedBadge");
  if (badge) {
    badge.classList.remove("verify-burst-anim");
    void badge.offsetWidth;
    badge.classList.add("verify-burst-anim");
  }

  showToast(`🎉 Verification Successful! You've unlocked the Twitter/X Blue Verified Badge on your profile!`, "✓");
}

function openIdViewModal() {
  const modal = document.getElementById("idViewModal");
  const overlay = document.getElementById("idViewOverlay");
  const fullImg = document.getElementById("idCardFullDisplayImg");
  const timestamp = document.getElementById("idViewDateTimestamp");

  if (fullImg) fullImg.src = getStoredIdCardImage();
  if (timestamp) timestamp.textContent = `Verified On: ${getStoredVerificationDate()} • Official AIT Smart ID`;

  if (modal) modal.classList.add("open");
  if (overlay) overlay.classList.add("open");
}

function closeIdViewModal() {
  const modal = document.getElementById("idViewModal");
  const overlay = document.getElementById("idViewOverlay");
  if (modal) modal.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
}

function removeIdVerification() {
  if (confirm("Are you sure you want to remove your College ID card and reset your verified status?")) {
    localStorage.removeItem(VERIFICATION_STORAGE_KEY);
    localStorage.removeItem(ID_CARD_IMG_STORAGE_KEY);
    localStorage.removeItem(ID_CARD_DATE_STORAGE_KEY);
    initVerificationState();
    showToast("Verification removed. Profile is now unverified.", "ℹ️");
  }
}

function setupDropzoneEvents() {
  const dropzone = document.getElementById("idUploadDropzone");
  if (!dropzone || dropzone._eventsAttached) return;
  dropzone._eventsAttached = true;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const file = dt && dt.files && dt.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        applySelectedIdImage(evt.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Please drop an image file (JPG, PNG, or WEBP).", "⚠️");
    }
  }, false);
}

/* ─────────────────────────────────────────────────────────
   EDIT PROFILE MODAL CONTROLLERS
   ───────────────────────────────────────────────────────── */
function openEditProfileModal() {
  const modal = document.getElementById("editProfileModal");
  const overlay = document.getElementById("editProfileOverlay");
  if (!modal || !overlay) {
    switchProfileTab('settings');
    return;
  }

  // Pre-fill modal input fields
  if (document.getElementById("editModalName")) document.getElementById("editModalName").value = myProfile.name || "";
  if (document.getElementById("editModalYear")) document.getElementById("editModalYear").value = myProfile.year || "";
  if (document.getElementById("editModalRoll")) document.getElementById("editModalRoll").value = myProfile.roll || "";
  if (document.getElementById("editModalStatus")) document.getElementById("editModalStatus").value = myProfile.status || "";
  if (document.getElementById("editModalBio")) document.getElementById("editModalBio").value = myProfile.bio || "";
  if (document.getElementById("editModalSkills")) document.getElementById("editModalSkills").value = myProfile.skills || "";

  const heroAvatar = document.getElementById("profileAvatarImg");
  const preview = document.getElementById("editModalAvatarPreview");
  if (preview && heroAvatar) {
    preview.src = myProfile.avatar || heroAvatar.src || "user.png";
  }

  modal.style.display = "flex";
  modal.classList.add("open");
  overlay.classList.add("open");
}

function closeEditProfileModal() {
  const modal = document.getElementById("editProfileModal");
  const overlay = document.getElementById("editProfileOverlay");
  if (modal) {
    modal.classList.remove("open");
    modal.style.display = "none";
  }
  if (overlay) overlay.classList.remove("open");
}

function saveEditProfileModal(e) {
  if (e) e.preventDefault();

  const name   = document.getElementById("editModalName")?.value.trim() || myProfile.name;
  const year   = document.getElementById("editModalYear")?.value.trim() || myProfile.year;
  const roll   = document.getElementById("editModalRoll")?.value.trim() || myProfile.roll;
  const status = document.getElementById("editModalStatus")?.value.trim() || myProfile.status;
  const bio    = document.getElementById("editModalBio")?.value.trim() || myProfile.bio;
  const skills = document.getElementById("editModalSkills")?.value.trim() || myProfile.skills;

  myProfile.name = name;
  myProfile.year = year;
  myProfile.roll = roll;
  myProfile.status = status;
  myProfile.bio = bio;
  myProfile.skills = skills;

  const preview = document.getElementById("editModalAvatarPreview");
  if (preview && preview.src) {
    myProfile.avatar = preview.src;
    const heroAvatar = document.getElementById("profileAvatarImg");
    if (heroAvatar) heroAvatar.src = preview.src;
  }

  // Update Hero UI displays
  if (document.getElementById("profileNameDisplay")) document.getElementById("profileNameDisplay").textContent = name;
  if (document.getElementById("profileSubtitleDisplay")) document.getElementById("profileSubtitleDisplay").textContent = year;
  if (document.getElementById("profileStatusPill")) document.getElementById("profileStatusPill").textContent = status;
  if (document.getElementById("profileBioDisplay")) document.getElementById("profileBioDisplay").textContent = bio;

  // Keep Settings panel form inputs in sync
  if (document.getElementById("settingName")) document.getElementById("settingName").value = name;
  if (document.getElementById("settingYear")) document.getElementById("settingYear").value = year;
  if (document.getElementById("settingRoll")) document.getElementById("settingRoll").value = roll;
  if (document.getElementById("settingStatus")) document.getElementById("settingStatus").value = status;
  if (document.getElementById("settingBio")) document.getElementById("settingBio").value = bio;
  if (document.getElementById("settingSkills")) document.getElementById("settingSkills").value = skills;

  // Persist updated profile
  localStorage.setItem("ait_student_profile", JSON.stringify(myProfile));

  closeEditProfileModal();
  showToast("Profile updated successfully! ✨", "✓");
}

function previewEditAvatar(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    const preview = document.getElementById("editModalAvatarPreview");
    if (preview) preview.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function resetEditAvatar() {
  const preview = document.getElementById("editModalAvatarPreview");
  if (preview) preview.src = "user.png";
}

// Make accessible to global scope
window.openEditProfileModal = openEditProfileModal;
window.closeEditProfileModal = closeEditProfileModal;
window.saveEditProfileModal = saveEditProfileModal;
window.previewEditAvatar = previewEditAvatar;
window.resetEditAvatar = resetEditAvatar;


