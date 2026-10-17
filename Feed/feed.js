/* ===================================================================
   CAMPUS CONNECT — FEED & LANDING PAGE JS (feed.js)
   Role permissions, Notice/Event/Collab popouts, 70% Calendar,
   Club member verification, Instagram save archive, Real-time feed
   =================================================================== */

/* ─────────────────────────────────────────────────────────
   CURRENT USER & ROLE STATE
   ───────────────────────────────────────────────────────── */
let currentUser = {
  name: "Snehangshu Das",
  role: "student", // 'student' | 'faculty' | 'admin'
  department: "B.Tech CSE '26 · AIT Pune",
  avatar: "user.png",
  // Active club memberships (verified)
  myClubs: [
    "OSS Club",
    "GDG AIT Pune",
    "Centre of Excellence for AI & Robotics (CEAR)",
    "Technical Board",
    "E-Cell",
    "DDQ Club",
    "Cycling Club"
  ]
};

// Full roster of all 29 AIT Pune collegiate clubs & student boards
const allCampusClubs = [
  "CP Club",
  "Cultural Board",
  "Cycling Club",
  "E-Cell",
  "GDG AIT Pune",
  "GDXR",
  "ISDF",
  "Magboard",
  "Nature's Club",
  "NSS",
  "OSS Club",
  "PR Cell",
  "R&D Cell",
  "Technical Board",
  "Sports Club",
  "Centre of Excellence for AI & Robotics (CEAR)",
  "Spiritual Club",
  "Fine Arts Club",
  "DDQ Club",
  "Radio Club",
  "EV Cell",
  "Film Club",
  "Press & News Cell",
  "Social Media Cell",
  "SAE - AIT Collegiate Club",
  "College Innovation Development Club",
  "Astronomy Club",
  "Drone Club",
  "Music & Dance Club"
];

// Active clubs where current student is an authorized member (No lock options displayed!)
const myMemberClubs = [
  "OSS Club",
  "GDG AIT Pune",
  "Centre of Excellence for AI & Robotics (CEAR)",
  "Technical Board",
  "E-Cell",
  "DDQ Club",
  "Cycling Club"
];

/* ─────────────────────────────────────────────────────────
   CAMPUS NOTICES DATA (6 Circulars for rich scrolling)
   ───────────────────────────────────────────────────────── */
const campusNotices = [
  {
    id: "not-1",
    title: "Mid-Semester Examination Schedule Autumn 2026",
    issuer: "Office of the Dean of Academics, AIT Pune",
    refNo: "AIT/ACAD/EXAM/2026/089",
    date: "September 12, 2026",
    urgent: true,
    summary: "Complete timetable and seating matrices released for 2nd, 3rd, and 4th year B.Tech examinations commencing Oct 12th.",
    content: `All students of SE, TE, and BE are hereby informed that Mid-Semester Examinations for Autumn 2026 will be conducted in offline pen-and-paper mode in designated examination halls.
    1. Students must carry their physical RFID Campus Identity Card.
    2. No programmable calculators or smart wearables are permitted.
    3. Minimum attendance requirement of 75% applies for admit card eligibility.
    Contact your respective Head of Department for discrepancies.`
  },
  {
    id: "not-2",
    title: "Annual Techfest 'Solutions 2026' Registrations & Rules",
    issuer: "Technical Board & Student Council, AIT Pune",
    refNo: "AIT/TECH/FEST/2026/014",
    date: "September 11, 2026",
    urgent: false,
    summary: "Cash prize pool of ₹3,50,000 across 18 hackathons, robotics arenas, paper symposiums, and coding decathlons.",
    content: `Solutions 2026 — Central India's premier defense-collegiate techfest is now accepting registrations!
    Major Tracks:
    - Smart Defense & AI Hackathon (Grand Prize ₹1,00,000)
    - Robowars & Autonomous Drone Obstacle Sprint
    - Competitive Coding Sprint by CP Club
    - Research Paper Poster Session (Indexed Proceedings)
    Early bird registration ends September 30.`
  },
  {
    id: "not-3",
    title: "Guest Lecture: Satellite IoT & 5G Edge with ISRO Scientists",
    issuer: "Dept. of Electronics & Telecommunications (E&TC)",
    refNo: "AIT/ETC/GL/2026/042",
    date: "September 10, 2026",
    urgent: false,
    summary: "Distinguished keynote by Dr. K. Radhakrishnan, Senior Project Scientist, ISRO Space Applications Center.",
    content: `Join us at Manekshaw Hall on September 18th at 10:00 AM. 
    Topic: 'Next-Generation Constellations: Edge AI and Satellite-Assisted IoT for Remote Border Logistics'.
    Open to all branches. Certificates of participation will be awarded to attendees who complete the Q&A session.`
  },
  {
    id: "not-4",
    title: "Campus Wi-Fi Upgrade & Hostel Night Hours Circular",
    issuer: "Office of the Chief Warden, AIT Pune",
    refNo: "AIT/HOSTEL/CIRC/2026/112",
    date: "September 08, 2026",
    urgent: false,
    summary: "Installation of Wi-Fi 6 access points across Aryabhatta and Shivaji hostels completed. Extended lab access timings announced.",
    content: `All hostellers are advised of the following welfare updates:
    1. High-speed 10Gbps Wi-Fi 6 mesh routers are active across all hostel blocks.
    2. Computer Center Labs will remain open till 11:30 PM for SIH and Solutions 2026 hackathon preparation teams with faculty mentor approval.
    3. Standard hostel in-timings remain 09:30 PM for non-lab pass holders.`
  },
  {
    id: "not-5",
    title: "Placement Season 2026-27: Mandatory Registration on T&P Portal",
    issuer: "Training & Placement Cell, AIT Pune",
    refNo: "AIT/TNP/RECRUIT/2026/031",
    date: "September 05, 2026",
    urgent: true,
    summary: "Tier-1 recruiting partners commencing technical assessments from October 1st. Profile freeze deadline is Sept 25.",
    content: `All BE (Final Year) students seeking campus placement opportunities must verify their CGPA, internship records, and GitHub/Portfolio links on the T&P ERP portal.
    Eligible branches: CSE, IT, E&TC, MECH.
    Mock technical interviews and coding rounds will be hosted by CP Club and Alumni Mentors starting next Monday.`
  },
  {
    id: "not-6",
    title: "Inter-Collegiate Cultural Auditions for 'Aakriti 2026'",
    issuer: "Cultural Board & DDQ Club",
    refNo: "AIT/CULT/AUD/2026/007",
    date: "September 02, 2026",
    urgent: false,
    summary: "Auditions for Street Play, Western/Classical Dance, Battle of Bands, and Fine Arts showcase.",
    content: `The Cultural Board invites talented performers from all academic years for Aakriti 2026 auditions at the Open Air Amphitheatre (OAT).
    - Stage Play & Mime: 24th Sept, 4 PM
    - Music & Vocal Solo/Band: 25th Sept, 5 PM
    - Dance Troupe: 26th Sept, 4 PM
    Represent AIT Pune in prestigious inter-college fests across Pune and Mumbai!`
  }
];

/* ─────────────────────────────────────────────────────────
   UPCOMING CLUB EVENTS DATA (6 Events for rich scrolling)
   ───────────────────────────────────────────────────────── */
const upcomingEvents = [
  {
    id: "ev-1",
    title: "Hacktoberfest 24h Hackathon 2026",
    club: "Open Source Software Club (OSS)",
    month: "OCT",
    day: "04",
    time: "Saturday 10:00 AM – Sunday 10:00 AM",
    venue: "Lab Complex B, Ground Floor",
    desc: "A 24-hour sprint focused on making meaningful contributions to upstream open-source repositories. Free food, mentor sessions from FAANG alumni, and official GitHub swag kits.",
    regLink: "https://unstop.com/hackathons/hacktoberfest-ait-pune",
    rsvpd: false
  },
  {
    id: "ev-2",
    title: "Flutter & GenAI Masterclass",
    club: "GDG AIT Pune",
    month: "OCT",
    day: "11",
    time: "Saturday 02:00 PM – 06:00 PM",
    venue: "Ramanujan Auditorium",
    desc: "Hands-on workshop building production cross-platform apps connected with Google Gemini API & Firebase streaming. Bring your laptop with Flutter installed.",
    regLink: "https://gdg.community.dev/events/details/developer-student-clubs-ait-pune",
    rsvpd: false
  },
  {
    id: "ev-3",
    title: "Robocon Bot Showcase & Arena Trial",
    club: "Centre of Excellence for AI & Robotics (CEAR)",
    month: "OCT",
    day: "19",
    time: "Sunday 11:00 AM – 04:00 PM",
    venue: "AIT Basketball Arena / Open Grounds",
    desc: "Live demonstration of our autonomous ball-throwing and obstacle-navigation bots built for ABU Robocon 2027. Open trial session for aspiring roboticists.",
    regLink: "https://forms.google.com/ait-robotics-open-trial",
    rsvpd: false
  },
  {
    id: "ev-4",
    title: "Aakriti Cultural Fest Stage Auditions",
    club: "DDQ Club & Cultural Board",
    month: "OCT",
    day: "25",
    time: "Friday 04:30 PM",
    venue: "Manekshaw Hall",
    desc: "Open auditions for stage play, street play (Nukkad Natak), classical instrumental, and debate teams for Aakriti 2026.",
    regLink: "https://forms.google.com/aakriti-auditions-2026",
    rsvpd: false
  },
  {
    id: "ev-5",
    title: "SIH Internal Hackathon Review",
    club: "E-Cell & College Innovation Club",
    month: "OCT",
    day: "28",
    time: "Tuesday 09:30 AM",
    venue: "Seminar Room 1",
    desc: "Final jury presentation for teams shortlisted for Smart India Hackathon grand finale nomination.",
    regLink: "https://ait.edu/innovation/sih-review",
    rsvpd: false
  },
  {
    id: "ev-6",
    title: "CyberSec CTF & Binary Defense Arena",
    club: "ISDF & Technical Board",
    month: "OCT",
    day: "30",
    time: "Thursday 05:00 PM – 09:00 PM",
    venue: "Network Security Lab 3",
    desc: "4-hour collegiate Capture The Flag competition covering cryptography, reverse engineering, web exploitation, and steganography. Top 3 teams win cash bounties.",
    regLink: "https://ctftime.org/event/ait-isdf-ctf",
    rsvpd: false
  }
];

/* ─────────────────────────────────────────────────────────
   COLLABORATION RADAR LEADS DATA (6 Leads for rich scrolling)
   ───────────────────────────────────────────────────────── */
const collabLeads = [
  {
    id: "lead-1",
    name: "Rohan Patil",
    role: "B.Tech CSE '26 · AI Researcher",
    avatar: "user.png",
    skills: ["PyTorch", "FastAPI", "Docker", "NLP", "CUDA"],
    projectTitle: "CampusGPT Vision & Multi-lingual Q&A",
    projectScope: "Scaling our campus conversational assistant to ingest lecture slide PDF images and answer queries in Hindi, Marathi & English.",
    roleNeeded: "PyTorch & Transformers Developer",
    openSpots: 1,
    github: "github.com/rohanpatil",
    linkedin: "linkedin.com/in/rohanpatil",
    requested: false
  },
  {
    id: "lead-2",
    name: "Ananya Kulkarni",
    role: "B.Tech Mech '27 · CAD & Robotics",
    avatar: "user.png",
    skills: ["SolidWorks", "Embedded C", "Arduino", "Fusion 360"],
    projectTitle: "Eco-Bot Autonomous Solar Chassis",
    projectScope: "Developing path planning and motor controller firmware for an autonomous campus litter collection solar rover.",
    roleNeeded: "Embedded C / ROS2 Developer",
    openSpots: 2,
    github: "github.com/ananyak",
    linkedin: "linkedin.com/in/ananyakulkarni",
    requested: false
  },
  {
    id: "lead-3",
    name: "Priya Sharma",
    role: "B.Tech IT '26 · Full-Stack Developer",
    avatar: "user.png",
    skills: ["React", "TypeScript", "Tailwind", "Figma", "Node.js"],
    projectTitle: "Smart India Hackathon: AgriSupply Chain",
    projectScope: "Building a transparent decentralized marketplace for farmer co-operatives with real-time MSP price tracking.",
    roleNeeded: "UI/UX Lead & Frontend Designer",
    openSpots: 1,
    github: "github.com/priyasharma",
    linkedin: "linkedin.com/in/priyasharma",
    requested: false
  },
  {
    id: "lead-4",
    name: "Ishita Desai",
    role: "B.Tech IT '28 · CyberSec Researcher",
    avatar: "user.png",
    skills: ["Linux", "Kali", "Wireshark", "Python", "Burp Suite"],
    projectTitle: "National Cyber Challenge CTF Team",
    projectScope: "Assembling a 4-person elite defense team for the upcoming DefCon / Nullcon collegiate cybersecurity competition.",
    roleNeeded: "Binary Exploitation & Reverse Engineer",
    openSpots: 2,
    github: "github.com/ishitadesai",
    linkedin: "linkedin.com/in/ishitadesai",
    requested: false
  },
  {
    id: "lead-5",
    name: "Vikram Aditya",
    role: "B.Tech E&TC '27 · Drone & Avionics",
    avatar: "user.png",
    skills: ["ArduPilot", "ROS", "Python", "OpenCV", "PX4"],
    projectTitle: "Autonomous Defense Recon Quadcopter",
    projectScope: "Designing computer vision payload algorithms for GPS-denied obstacle avoidance and perimeter night-patrol flights.",
    roleNeeded: "Computer Vision & Edge AI Specialist",
    openSpots: 1,
    github: "github.com/vikramaditya",
    linkedin: "linkedin.com/in/vikramaditya",
    requested: false
  },
  {
    id: "lead-6",
    name: "Sneha Joshi",
    role: "B.Tech CSE '28 · Data Science & ML",
    avatar: "user.png",
    skills: ["Python", "Pandas", "Scikit-Learn", "React", "SQL"],
    projectTitle: "Campus Food Waste & Mess Analytics",
    projectScope: "Predicting daily mess consumption and preventing bulk kitchen food wastage across 1400+ campus hostellers using ML models.",
    roleNeeded: "Full-Stack React & Charts Developer",
    openSpots: 2,
    github: "github.com/snehajoshi",
    linkedin: "linkedin.com/in/snehajoshi",
    requested: false
  }
];

/* ─────────────────────────────────────────────────────────
   CAMPUS FEED POSTS DATA
   ───────────────────────────────────────────────────────── */
let postsData = [
  {
    id: "feed-1",
    category: "college",
    badgeText: "🏆 College Achievement",
    badgeClass: "badge-college",
    author: "AIT Pune Official",
    verified: true,
    role: "Administration & R&D Cell",
    time: "3 hours ago",
    text: "Proud moment for AIT Pune! 🏆 Our student team 'CyberSentinels' (Dept of CSE & IT) clinched 1st Prize nationally at Smart India Hackathon 2025 Hardware Edition with a cash award of ₹1,00,000. Hearty congratulations to the team and faculty mentors!",
    image: "https://picsum.photos/seed/sihaward2025/800/450",
    likes: 428,
    liked: false,
    saved: false,
    collabRequested: false,
    allowCollab: false,
    comments: [
      { user: "Dr. P. B. Karandikar", text: "Brilliant achievement! Proud of our students.", time: "2h ago" },
      { user: "Snehangshu Das", text: "Huge congratulations seniors! Inspiring work 🙌", time: "1h ago" }
    ]
  },
  {
    id: "feed-2",
    category: "student",
    badgeText: "💻 Student Work & Collab",
    badgeClass: "badge-student",
    author: "Snehangshu Das",
    verified: true,
    role: "B.Tech CSE '26 · OSS Club Lead",
    time: "5 hours ago",
    text: "Just pushed v1.0 of our open-source 'CampusCode AI' developer assistant! 🚀 It analyzes college assignment repos, explains code line-by-line, and generates unit tests locally. Looking for 1 frontend dev (UI polish) and 1 Python developer for HackSphere Pune. Hit Collaborate below to team up!",
    image: "https://picsum.photos/seed/devtoolsai/800/450",
    likes: 184,
    liked: false,
    saved: false,
    collabRequested: false,
    allowCollab: true,
    comments: [
      { user: "Rohan Patil", text: "The local inference pipeline is super clean. Starred the repo!", time: "4h ago" },
      { user: "Ishita Desai", text: "Let's do a security review on the AST parser together.", time: "3h ago" }
    ]
  },
  {
    id: "feed-3",
    category: "club",
    badgeText: "🎪 Club Event Announcement",
    badgeClass: "badge-club",
    author: "Open Source Software Club (OSS)",
    verified: true,
    role: "Official Technical Club",
    time: "8 hours ago",
    text: "Hacktoberfest AIT 2026 is officially here! 🎃 Join us for our signature 24-hour sprint in Lab Block B. Free Git & GitHub training, swag, pizza, and mentorship from alumni working at Google, Microsoft, and Amazon. Open to all branches and years!",
    image: "https://picsum.photos/seed/hacktoberfestait/800/450",
    likes: 295,
    liked: false,
    saved: true,
    collabRequested: false,
    allowCollab: true,
    comments: [
      { user: "Arjun Mehta", text: "Count me in for the hardware hacking track!", time: "6h ago" },
      { user: "Priya Sharma", text: "Can 1st years participate? Excited!", time: "5h ago" }
    ]
  },
  {
    id: "feed-4",
    category: "faculty",
    badgeText: "👨‍🏫 Faculty Update",
    badgeClass: "badge-faculty",
    author: "Dr. P. B. Karandikar",
    verified: true,
    role: "Professor & Head, E&TC Dept",
    time: "1 day ago",
    text: "Thrilled to share that our department has been awarded an AICTE Modernization grant of ₹18.5 Lakhs to establish an advanced 5G-IoT & Edge Computing Research Center. Third and final-year students interested in capstone research on smart sensor networks are welcome to visit my cabin.",
    image: "https://picsum.photos/seed/researchlab5g/800/450",
    likes: 310,
    liked: false,
    saved: false,
    collabRequested: false,
    allowCollab: true,
    comments: [
      { user: "Arjun Mehta", text: "Will send over our IoT energy monitoring draft proposal, sir!", time: "1d ago" }
    ]
  },
  {
    id: "feed-5",
    category: "student",
    badgeText: "🏆 Student Achievement",
    badgeClass: "badge-student",
    author: "Rohan Patil",
    verified: true,
    role: "B.Tech CSE '26 · AI Researcher",
    time: "1 day ago",
    text: "Our research paper 'Efficient Quantization of Large Language Models for Indic Languages' was formally accepted at the ICML Workshop! 🎉 Massive gratitude to Prof. Karandikar and peer reviewers who spent late nights testing benchmarks. Full preprint is now on arXiv!",
    image: "https://picsum.photos/seed/icmlpaperposter/800/450",
    likes: 365,
    liked: false,
    saved: false,
    collabRequested: false,
    allowCollab: true,
    comments: [
      { user: "Snehangshu Das", text: "Huge win for AIT! Congratulations Rohan 👑", time: "1d ago" },
      { user: "Ananya Kulkarni", text: "So well deserved!!", time: "22h ago" }
    ]
  },
  {
    id: "feed-6",
    category: "club",
    badgeText: "🎪 Club Workshop",
    badgeClass: "badge-club",
    author: "Google Developer Student Club (GDSC)",
    verified: true,
    role: "AIT Student Chapter",
    time: "2 days ago",
    text: "Build with AI: Flutter & Gemini API Masterclass happening this Saturday! 📱 From zero to production-grade mobile app with streaming AI completions. Certificates and Google cloud credits for attendees. Seats limited to 80.",
    image: "https://picsum.photos/seed/fluttergdsc2026/800/450",
    likes: 215,
    liked: false,
    saved: false,
    collabRequested: false,
    allowCollab: false,
    comments: [
      { user: "Ishita Desai", text: "Registered! See you all there.", time: "1d ago" }
    ]
  },
  {
    id: "feed-7",
    category: "college",
    badgeText: "🏆 Sports Achievement",
    badgeClass: "badge-college",
    author: "AIT Sports Council",
    verified: true,
    role: "College Athletics",
    time: "3 days ago",
    text: "AIT Pune wins West Zone Inter-College Football Championship! ⚽ In a nail-biting final against COEP, our team triumphed 2-1 with a last-minute header. Salute to the squad's relentless spirit and coach Sharma!",
    image: "https://picsum.photos/seed/footballaitchamps/800/450",
    likes: 540,
    liked: false,
    saved: false,
    collabRequested: false,
    allowCollab: false,
    comments: [
      { user: "Rohan Patil", text: "What a match!! That 89th minute goal was electric ⚡", time: "2d ago" }
    ]
  }
];

let currentFilter = "all";
let activeCommentPostId = null;
let composerSelectedCategory = "student";
let composerImageAttached = true;
let selectedCalendarDay = null;

/* ─────────────────────────────────────────────────────────
   INITIALIZATION
   ───────────────────────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  // Sync logged in session from localStorage if available
  const storedUser = localStorage.getItem("campusConnectUser");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (user && user.role) {
        currentUser.role = user.role === "alumni" ? "student" : user.role;
        if (user.name) currentUser.name = user.name;
        if (user.role === "faculty") {
          currentUser.department = "Faculty Mentor · AIT Pune";
        }
      }
    } catch (e) {}
  }

  // Load saved bookmarks from localStorage
  const storedSaved = localStorage.getItem("ait_saved_posts");
  if (storedSaved) {
    try {
      const savedIds = JSON.parse(storedSaved);
      postsData.forEach(p => {
        if (savedIds.includes(p.id)) p.saved = true;
      });
    } catch(e) {}
  }

  // Populate club selector dropdown in composer
  populateClubDropdown();
  updateRoleDisplay();
  updateSavedBadge();
  renderFeed();
  renderRightSidebarNotices();
  renderRightSidebarEvents();
  renderRightSidebarCollabs();
});

/* ─────────────────────────────────────────────────────────
   ROLE SWITCHER & PERMISSION ENFORCEMENT
   ───────────────────────────────────────────────────────── */
function onRoleChanged(newRole) {
  currentUser.role = newRole;

  if (newRole === "faculty") {
    currentUser.name = "Dr. Sanjay Karandikar";
    currentUser.department = "HOD & Professor · Computer Science & Engg.";
    currentUser.verified = true;
  } else if (newRole === "admin") {
    currentUser.name = "Brig. Abhay A. Bhat (Retd.)";
    currentUser.department = "Director & System Administrator · AIT Pune";
    currentUser.verified = true;
  } else {
    currentUser.name = "Snehangshu Das";
    currentUser.department = "B.Tech CSE '26 · AIT Pune";
    currentUser.verified = true;
  }

  updateRoleDisplay();

  // If switched to student while on restricted category, reset to student
  if (currentUser.role === "student" && (composerSelectedCategory === "college" || composerSelectedCategory === "faculty")) {
    selectComposerCategory("student", document.getElementById("tagBtnStudent"));
  }

  renderFeed();
  showToast(`Switched perspective to: ${newRole.toUpperCase()} mode. Role privileges updated!`, newRole === "admin" ? "🛡️" : newRole === "faculty" ? "👨‍🏫" : "🎓");
}

function updateRoleDisplay() {
  const roleSelect = document.getElementById("userRoleSelect");
  if (roleSelect) roleSelect.value = currentUser.role;

  // Mini-profile in left sidebar & Navbar profile chip
  const isProfileVerified = localStorage.getItem("ait_profile_verified") === "true";
  const twitterBadgeSvg = `<span class="x-verified-badge" title="Verified College Student (College ID Verified)" style="margin-left: 6px;"><svg class="x-verified-icon" viewBox="0 0 24 24" width="16" height="16"><path fill="#1d9bf0" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.19 3.34-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.79 4.25l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z"/></svg></span>`;
  const navTwitterBadgeSvg = `<svg class="x-verified-icon" viewBox="0 0 24 24" width="13" height="13" style="display:inline-block; vertical-align:-1px; margin-left:3px;"><path fill="#1d9bf0" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.19 3.34-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.79 4.25l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z"/></svg>`;

  const miniName = document.getElementById("miniProfileName");
  const miniRole = document.getElementById("miniProfileRole");
  const miniStatus = document.getElementById("miniProfileStatus");
  const navUserName = document.getElementById("navUserNameDisplay");
  if (navUserName) navUserName.innerHTML = currentUser.name.split(" ")[0] + (isProfileVerified ? navTwitterBadgeSvg : "");
  if (miniName) miniName.innerHTML = currentUser.name + (isProfileVerified ? twitterBadgeSvg : "");
  if (miniRole) miniRole.textContent = currentUser.department;
  if (miniStatus) {
    if (currentUser.role === "faculty") {
      miniStatus.textContent = "👨‍🏫 Consulting Hours: 2-4 PM (Block B-204)";
    } else if (currentUser.role === "admin") {
      miniStatus.textContent = "🛡️ Directorate Console · AIT Moderation";
    } else {
      miniStatus.textContent = "🚀 Open for Collaborations";
    }
  }

  // Role Privilege Banner
  const banner = document.getElementById("rolePrivilegeBanner");
  const bannerIcon = document.getElementById("roleBannerIcon");
  const bannerTitle = document.getElementById("roleBannerTitle");
  const bannerBadge = document.getElementById("roleBannerBadge");
  const bannerDesc = document.getElementById("roleBannerDesc");

  if (banner && bannerIcon && bannerTitle && bannerBadge && bannerDesc) {
    banner.className = `role-privilege-banner role-${currentUser.role}`;
    if (currentUser.role === "faculty") {
      bannerIcon.textContent = "👨‍🏫";
      bannerTitle.textContent = "Faculty Portal Active";
      bannerBadge.className = "privilege-badge faculty";
      bannerBadge.textContent = "FACULTY VERIFIED";
      bannerDesc.textContent = "You can publish College Achievements, Faculty Research, and broadcast circulars live to Campus Notices.";
    } else if (currentUser.role === "admin") {
      bannerIcon.textContent = "🛡️";
      bannerTitle.textContent = "Collegiate Admin Console";
      bannerBadge.className = "privilege-badge admin";
      bannerBadge.textContent = "ADMINISTRATOR";
      bannerDesc.textContent = "Full moderation permissions: Remove inappropriate posts, pin advisories to top, and broadcast urgent circulars.";
    } else {
      bannerIcon.textContent = "🎓";
      bannerTitle.textContent = "Student Mode Active";
      bannerBadge.className = "privilege-badge student";
      bannerBadge.textContent = "STUDENT";
      bannerDesc.textContent = "Explore peer projects, discover upcoming campus events, share milestones, and recruit teammates.";
    }
  }

  // Composer Category Button permissions
  const collegeTagBtn = document.getElementById("tagBtnCollege");
  const facultyTagBtn = document.getElementById("tagBtnFaculty");

  if (currentUser.role === "student") {
    if (collegeTagBtn) {
      collegeTagBtn.classList.add("restricted");
      collegeTagBtn.innerHTML = "<span>🔒</span> 🏆 College Achievement";
      collegeTagBtn.title = "Restricted: Only Faculty and Administrators can publish College Achievements";
    }
    if (facultyTagBtn) {
      facultyTagBtn.classList.add("restricted");
      facultyTagBtn.innerHTML = "<span>🔒</span> 👨‍🏫 Faculty Update";
      facultyTagBtn.title = "Restricted: Only Faculty members can publish Faculty Updates";
    }
  } else if (currentUser.role === "faculty") {
    if (collegeTagBtn) {
      collegeTagBtn.classList.remove("restricted");
      collegeTagBtn.innerHTML = "🏆 College Achievement";
      collegeTagBtn.title = "Verified Faculty access enabled";
    }
    if (facultyTagBtn) {
      facultyTagBtn.classList.remove("restricted");
      facultyTagBtn.innerHTML = "👨‍🏫 Faculty Update";
      facultyTagBtn.title = "Faculty Updates enabled";
    }
  } else if (currentUser.role === "admin") {
    if (collegeTagBtn) {
      collegeTagBtn.classList.remove("restricted");
      collegeTagBtn.innerHTML = "🏆 College Achievement";
      collegeTagBtn.title = "Admin access enabled";
    }
    if (facultyTagBtn) {
      facultyTagBtn.classList.remove("restricted");
      facultyTagBtn.innerHTML = "👨‍🏫 Faculty Update";
      facultyTagBtn.title = "Admin access enabled";
    }
  }

  // Composer Privileged Options Row (broadcast circular, pin post)
  const privilegedRow = document.getElementById("composerPrivilegedRow");
  const adminPinLabel = document.getElementById("adminPinPostLabel");
  if (privilegedRow) {
    if (currentUser.role === "faculty" || currentUser.role === "admin") {
      privilegedRow.style.display = "flex";
      if (adminPinLabel) {
        adminPinLabel.style.display = currentUser.role === "admin" ? "flex" : "none";
      }
    } else {
      privilegedRow.style.display = "none";
    }
  }
}

/* ─────────────────────────────────────────────────────────
   COMPOSER CATEGORY & CLUB SELECTION
   ───────────────────────────────────────────────────────── */
function selectComposerCategory(cat, btn) {
  // Check permission: Student cannot post College Achievement or Faculty Updates
  if ((cat === "college" || cat === "faculty") && currentUser.role === "student") {
    showToast("⚠️ Permission Denied: Only College Administrators and Faculty can publish official announcements or faculty updates.", "🔒");
    return;
  }

  composerSelectedCategory = cat;
  document.querySelectorAll(".composer-tag-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  // Show / hide club dropdown if 'club' category selected
  const clubRow = document.getElementById("composerClubRow");
  if (clubRow) {
    if (cat === "club") {
      clubRow.classList.add("show");
    } else {
      clubRow.classList.remove("show");
    }
  }
}

function populateClubDropdown() {
  const select = document.getElementById("composerClubSelect");
  if (!select) return;

  // Simply show the clubs of which you are the member — no lock options!
  select.innerHTML = myMemberClubs.map(c => `
    <option value="${c}">${c}</option>
  `).join("");
}

function toggleComposerImage() {
  composerImageAttached = !composerImageAttached;
  const lbl = document.getElementById("attachImgLabel");
  if (lbl) lbl.textContent = composerImageAttached ? "Image Attached ✓" : "Attach Image";
  showToast(composerImageAttached ? "Demo image attached to your post!" : "Image removed", "🖼️");
}

function publishNewPost() {
  const input = document.getElementById("composerText");
  const text = input.value.trim();
  if (!text) {
    showToast("Please enter some project or milestone details before posting!", "⚠️");
    return;
  }

  // Final role verification for college achievements
  if ((composerSelectedCategory === "college" || composerSelectedCategory === "faculty") && currentUser.role === "student") {
    showToast("⚠️ Blocked: Students cannot publish official College Achievements. Switch role to Faculty/Admin to test.", "🚫");
    return;
  }

  let authorName = currentUser.name;
  let roleTitle = currentUser.department;
  let badgeText = "💻 Student Work";
  let badgeClass = "badge-student";

  // Category determination
  if (composerSelectedCategory === "club") {
    const clubSelect = document.getElementById("composerClubSelect");
    const chosenClubName = clubSelect ? clubSelect.value : "OSS Club";
    authorName = chosenClubName;
    roleTitle = `Official Club Post by ${currentUser.name}`;
    badgeText = "🎪 Club Event";
    badgeClass = "badge-club";
  } else if (composerSelectedCategory === "college") {
    authorName = currentUser.role === "faculty" ? currentUser.name : "AIT Administration & Directorate";
    roleTitle = "Official Campus Milestone";
    badgeText = "🏆 College Achievement";
    badgeClass = "badge-college";
  } else if (composerSelectedCategory === "faculty") {
    authorName = currentUser.name;
    roleTitle = currentUser.department;
    badgeText = "👨‍🏫 Faculty Update";
    badgeClass = "badge-faculty";
  } else if (composerSelectedCategory === "collab") {
    badgeText = "🤝 Project Collab";
    badgeClass = "badge-student";
  }

  const collabWanted = document.getElementById("composerCollabWanted").checked;
  const broadcastCircular = document.getElementById("composerBroadcastCircular")?.checked;
  const pinPost = document.getElementById("composerPinPost")?.checked;

  const newPost = {
    id: "feed-" + Date.now(),
    category: composerSelectedCategory === "collab" ? "student" : composerSelectedCategory,
    badgeText: badgeText,
    badgeClass: badgeClass,
    author: authorName,
    verified: true,
    role: roleTitle,
    time: "Just now",
    text: text,
    image: composerImageAttached ? "https://picsum.photos/seed/post" + Date.now() + "/800/450" : null,
    likes: 1,
    liked: true,
    saved: false,
    pinned: pinPost && currentUser.role === "admin",
    collabRequested: false,
    allowCollab: collabWanted,
    comments: []
  };

  if (newPost.pinned) {
    postsData.unshift(newPost);
  } else {
    // Put after any pinned posts
    const firstNonPinnedIndex = postsData.findIndex(p => !p.pinned);
    if (firstNonPinnedIndex === -1) {
      postsData.push(newPost);
    } else {
      postsData.splice(firstNonPinnedIndex, 0, newPost);
    }
  }

  // FACULTY / ADMIN BROADCAST SUPERPOWER: Broadcast directly to Campus Notices widget & modal!
  if (broadcastCircular && (currentUser.role === "faculty" || currentUser.role === "admin")) {
    const isAdm = currentUser.role === "admin";
    const refCode = isAdm ? `AIT/DIR/NOTIF/2026/0${campusNotices.length + 95}` : `AIT/CSE/FAC/2026/0${campusNotices.length + 95}`;
    const noticeTitle = text.length > 75 ? text.substring(0, 72) + "..." : text;

    const dynamicNotice = {
      id: "notif-dyn-" + Date.now(),
      refNo: refCode,
      title: noticeTitle,
      issuer: `${currentUser.name}, ${currentUser.department.split('·')[0].trim()}`,
      date: "September 12, 2026",
      urgent: isAdm,
      summary: text,
      content: `${text}\n\nNotice authorized for collegiate distribution across all departments.\nRef: ${refCode}\nContact: office@${isAdm ? 'aitpune.edu.in' : 'cse.aitpune.edu.in'}`
    };

    campusNotices.unshift(dynamicNotice);
    renderRightSidebarNotices();
    showToast("Official Circular broadcasted live to Campus Notices widget & modal! 📢", "📢");
  }

  input.value = "";
  if (document.getElementById("composerBroadcastCircular")) document.getElementById("composerBroadcastCircular").checked = false;
  if (document.getElementById("composerPinPost")) document.getElementById("composerPinPost").checked = false;

  renderFeed();
  showToast("Your post has been published to the Campus Feed! 🎉", "🚀");
}

/* ─────────────────────────────────────────────────────────
   FEED RENDERER & ACTIONS
   ───────────────────────────────────────────────────────── */
function renderFeed() {
  const container = document.getElementById("feedPostsContainer");
  if (!container) return;

  let filtered = postsData;
  if (currentFilter === "saved") {
    filtered = postsData.filter(p => p.saved);
  } else if (currentFilter !== "all") {
    filtered = postsData.filter(p => p.category === currentFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-card" style="padding: 48px 24px; text-align: center; color: var(--text-muted);">
        <div style="font-size: 40px; margin-bottom: 12px;">🔖</div>
        <h3 style="color: var(--text-main); font-size: 17px; margin-bottom: 6px;">No posts in this view</h3>
        <p style="font-size: 13.5px;">${currentFilter === 'saved' ? 'You have not saved or bookmarked any posts yet.' : 'Check back later for new updates in this category.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(post => `
    <article class="feed-post-card ${post.pinned ? 'pinned' : ''}" id="card-${post.id}">
      ${post.pinned ? `
        <div class="pinned-indicator">📌 PINNED OFFICIAL ADVISORY · CAMPUS ADMINISTRATION</div>
      ` : ''}

      <div class="feed-post-header">
        <a class="feed-author-wrap" href="./Profile/profile.html">
          <img class="feed-author-avatar" src="user.png" alt="${post.author}" />
          <div>
            <div class="feed-author-name">
              ${post.author}
              ${(post.verified || (post.author === currentUser.name && localStorage.getItem("ait_profile_verified") === "true")) ? `
                <span class="x-verified-badge" title="Verified College Student (College ID Verified)" style="margin-left: 4px;">
                  <svg class="x-verified-icon" viewBox="0 0 24 24" width="14" height="14">
                    <path fill="#1d9bf0" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12c0 1.43.88 2.67 2.19 3.34-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.79 4.25l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z"/>
                  </svg>
                </span>
              ` : ''}
            </div>
            <div class="feed-author-meta">${post.role} · ${post.time}</div>
          </div>
        </a>
        <span class="feed-post-badge ${post.badgeClass}">${post.badgeText}</span>
      </div>

      <div class="feed-post-content">
        <p class="feed-post-text">${post.text}</p>
      </div>

      ${post.image ? `<img class="feed-post-image" src="${post.image}" alt="Post attachment" loading="lazy" />` : ''}

      <div class="feed-post-actions">
        <div class="actions-left">
          <button class="feed-act-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike('${post.id}')" id="likeBtn-${post.id}">
            <span>${post.liked ? '❤️' : '🤍'}</span>
            <span id="likeCount-${post.id}">${post.likes}</span>
          </button>
          <button class="feed-act-btn" onclick="openCommentsDrawer('${post.id}')">
            <span>💬</span>
            <span id="cmtCount-${post.id}">${post.comments.length}</span>
          </button>
          <button class="feed-act-btn" onclick="shareFeedPost('${post.id}')">
            <span>↗️</span>
            <span>Share</span>
          </button>
          <button class="feed-act-btn ${post.saved ? 'saved' : ''}" onclick="toggleSavePost('${post.id}')" id="saveBtn-${post.id}" title="Save / Bookmark post">
            <span>${post.saved ? '🔖' : '🏷️'}</span>
            <span>${post.saved ? 'Saved' : 'Save'}</span>
          </button>

          <!-- Post Author Delete -->
          ${post.author === currentUser.name ? `
            <button class="feed-act-btn" onclick="deleteFeedPost('${post.id}')" style="color: #e11d48;" title="Delete your post">
              <span>🗑️</span>
              <span>Delete</span>
            </button>
          ` : ''}

          <!-- ADMIN MODERATION SUPERPOWER: Can delete any inappropriate post from feed -->
          ${currentUser.role === 'admin' && post.author !== currentUser.name ? `
            <button class="feed-act-btn admin-mod-btn" onclick="adminRemovePost('${post.id}')" title="Admin Moderation: Remove this post from collegiate feed">
              <span>🛡️</span>
              <span>Admin: Remove</span>
            </button>
          ` : ''}
        </div>

        ${post.allowCollab ? `
          <button class="feed-act-btn feed-collab-btn ${post.collabRequested ? 'requested' : ''}" onclick="requestCollab('${post.id}')" id="collabBtn-${post.id}">
            <span>🤝</span>
            <span>${post.collabRequested ? 'Requested' : 'Collaborate'}</span>
          </button>
        ` : ''}
      </div>
    </article>
  `).join("");
}

function deleteFeedPost(postId) {
  const confirmed = confirm("Are you sure you want to delete this post from the campus feed? This action cannot be undone.");
  if (!confirmed) return;

  postsData = postsData.filter(p => p.id !== postId);
  renderFeed();
  showToast("Post has been deleted from campus feed.", "🗑️");
}

function adminRemovePost(postId) {
  const p = postsData.find(x => x.id === postId);
  const authorName = p ? p.author : "author";
  const reason = prompt(`ADMIN ACTION: Removing post by ${authorName}.\nEnter reason for removal (e.g. Violation of Campus Code of Conduct, spam, misleading info):`, "Violation of collegiate community guidelines");
  if (reason === null) return; // cancelled

  postsData = postsData.filter(item => item.id !== postId);
  renderFeed();
  showToast(`🛡️ Post by ${authorName} removed by Administrator (Reason: ${reason}).`, "🛡️");
}

function filterFeed(category, btnEl) {
  currentFilter = category;
  document.querySelectorAll(".feed-nav-menu .menu-item").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  renderFeed();
}

function toggleLike(postId) {
  const p = postsData.find(x => x.id === postId);
  if (!p) return;
  p.liked = !p.liked;
  p.likes += p.liked ? 1 : -1;
  const btn = document.getElementById("likeBtn-" + postId);
  const cnt = document.getElementById("likeCount-" + postId);
  if (btn) {
    btn.classList.toggle("liked", p.liked);
    btn.querySelector("span:first-child").textContent = p.liked ? "❤️" : "🤍";
  }
  if (cnt) cnt.textContent = p.likes;
}

function shareFeedPost(postId) {
  const p = postsData.find(x => x.id === postId);
  if (!p) return;
  if (navigator.share) {
    navigator.share({ title: "AIT Campus Connect", text: p.text }).catch(()=>{});
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast("Post link copied to clipboard! 📋", "🔗");
  }
}

function toggleSavePost(postId) {
  const p = postsData.find(x => x.id === postId);
  if (!p) return;
  p.saved = !p.saved;

  const savedList = postsData.filter(x => x.saved).map(x => x.id);
  localStorage.setItem("ait_saved_posts", JSON.stringify(savedList));
  updateSavedBadge();

  const btn = document.getElementById("saveBtn-" + postId);
  if (btn) {
    btn.classList.toggle("saved", p.saved);
    btn.querySelector("span:first-child").textContent = p.saved ? "🔖" : "🏷️";
    btn.querySelector("span:last-child").textContent = p.saved ? "Saved" : "Save";
  }

  if (p.saved) {
    showToast("Post bookmarked to your saved archive! 🔖", "🔖");
  } else {
    showToast("Post removed from saved archive.", "ℹ️");
    if (currentFilter === "saved") renderFeed();
  }
}

function updateSavedBadge() {
  const savedCount = postsData.filter(x => x.saved).length;
  const badge = document.getElementById("savedCountBadge");
  if (badge) badge.textContent = savedCount;
}

function requestCollab(postId) {
  const p = postsData.find(x => x.id === postId);
  if (!p) return;
  p.collabRequested = !p.collabRequested;
  const btn = document.getElementById("collabBtn-" + postId);
  if (btn) {
    btn.classList.toggle("requested", p.collabRequested);
    btn.querySelector("span:last-child").textContent = p.collabRequested ? "Requested" : "Collaborate";
  }

  if (p.collabRequested) {
    showToast(`Collaboration invite sent to ${p.author}! Notification sent to their inbox.`, "🤝");
  } else {
    showToast("Collaboration request cancelled.", "ℹ️");
  }
}

/* ─────────────────────────────────────────────────────────
   CAMPUS NOTICES POPOUT MODAL
   ───────────────────────────────────────────────────────── */
function renderRightSidebarNotices() {
  const list = document.getElementById("noticesList");
  if (!list) return;

  list.innerHTML = campusNotices.map(n => `
    <div class="notice-item" onclick="openNoticeModal('${n.id}')">
      <div class="notice-title">${n.title}</div>
      <span class="notice-meta">${n.issuer.split(',')[0]} · ${n.date}</span>
    </div>
  `).join("");
}

function openNoticeModal(noticeId) {
  const n = campusNotices.find(x => x.id === noticeId) || campusNotices[0];
  const modal = document.getElementById("noticeModal");
  const content = document.getElementById("noticeModalContent");

  content.innerHTML = `
    <div style="margin-bottom: 14px;">
      <span style="font-size: 11px; font-weight:800; background: rgba(245,158,11,0.14); color: #b45309; padding: 4px 10px; border-radius: 99px;">OFFICIAL CIRCULAR</span>
      <span style="font-size: 11.5px; color: var(--text-muted); margin-left: 8px;">Ref: ${n.refNo}</span>
    </div>
    <h2 style="font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 8px; line-height: 1.35;">${n.title}</h2>
    <div style="font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-bottom: 16px; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 10px;">
      Issued by: <strong style="color:var(--text-main);">${n.issuer}</strong> · ${n.date}
    </div>
    <p style="font-size: 14px; color: var(--text-main); line-height: 1.7; white-space: pre-line; margin-bottom: 24px;">${n.content}</p>
    <div style="display: flex; gap: 10px; justify-content: flex-end;">
      <button class="btn-primary" onclick="showToast('Downloading official PDF circular...', '📄')" style="font-size:13px; padding: 8px 18px;">
        📄 Download PDF
      </button>
      <button class="event-rsvp-btn" onclick="closeNoticeModal()" style="padding: 8px 18px;">Acknowledge ✓</button>
    </div>
  `;

  modal.classList.add("open");
  document.getElementById("modalBackdrop").classList.add("open");
}

function closeNoticeModal() {
  document.getElementById("noticeModal").classList.remove("open");
  document.getElementById("modalBackdrop").classList.remove("open");
}

/* ─────────────────────────────────────────────────────────
   ALL CAMPUS NOTICES MODAL ("CLICK TO VIEW")
   ───────────────────────────────────────────────────────── */
function openAllNoticesModal() {
  const modal = document.getElementById("allNoticesModal");
  const content = document.getElementById("allNoticesModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div>
        <h2 style="font-size: 19px; font-weight: 800; color: var(--text-main);">Official Campus Notice Board</h2>
        <p style="font-size: 13px; color: var(--text-sub);">All verified circulars and administrative orders issued by AIT Pune bodies.</p>
      </div>
      <span style="font-size: 12px; font-weight: 800; background: rgba(99,102,241,0.12); color: var(--primary); padding: 5px 14px; border-radius: 99px;">
        ${campusNotices.length} Notices Active
      </span>
    </div>

    <div class="widget-scroll-container" style="max-height: 440px; gap: 12px; padding-right: 6px;">
      ${campusNotices.map(n => `
        <div class="glass-card" style="padding: 16px 20px; border-radius: 12px; background: rgba(255,255,255,0.65); transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <div>
              <span style="font-size: 10.5px; font-weight: 800; background: ${n.urgent ? 'rgba(239,68,68,0.12)' : 'rgba(99,102,241,0.1)'}; color: ${n.urgent ? '#dc2626' : 'var(--primary)'}; padding: 3px 8px; border-radius: 99px;">
                ${n.urgent ? '⚠️ URGENT CIRCULAR' : 'OFFICIAL CIRCULAR'}
              </span>
              <span style="font-size: 11px; color: var(--text-muted); margin-left: 8px;">Ref: ${n.refNo}</span>
            </div>
            <span style="font-size: 11.5px; color: var(--text-muted); font-weight: 600;">${n.date}</span>
          </div>
          <h3 style="font-size: 15px; font-weight: 800; color: var(--text-main); margin: 6px 0;">${n.title}</h3>
          <p style="font-size: 13px; color: var(--text-sub); line-height: 1.55; margin-bottom: 12px;">${n.summary}</p>
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 10px;">
            <span style="font-size: 11.5px; color: var(--text-muted); font-weight: 600;">Issued by: ${n.issuer}</span>
            <div style="display: flex; gap: 8px;">
              <button class="event-rsvp-btn" onclick="openNoticeModal('${n.id}')" style="padding: 4px 14px; font-size: 12px;">Read Full Notice →</button>
              <button class="btn-primary" onclick="showToast('Downloading official PDF circular (${n.refNo})...', '📄')" style="padding: 4px 12px; font-size: 12px;">PDF 📄</button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  modal.classList.add("open");
  document.getElementById("modalBackdrop").classList.add("open");
}

function closeAllNoticesModal() {
  const modal = document.getElementById("allNoticesModal");
  if (modal) modal.classList.remove("open");
  document.getElementById("modalBackdrop").classList.remove("open");
}

/* ─────────────────────────────────────────────────────────
   ALL COLLABORATION REQUESTS MODAL
   ───────────────────────────────────────────────────────── */
function openAllCollabModal() {
  const modal = document.getElementById("allCollabModal");
  const content = document.getElementById("allCollabModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div>
        <h2 style="font-size: 19px; font-weight: 800; color: var(--text-main);">Campus Collaboration Radar</h2>
        <p style="font-size: 13px; color: var(--text-sub);">Connect with student developers, hackathon teams, and researchers actively recruiting teammates.</p>
      </div>
      <span style="font-size: 12px; font-weight: 800; background: rgba(16,185,129,0.12); color: var(--emerald); padding: 5px 14px; border-radius: 99px;">
        ● ${collabLeads.length} Active Leads
      </span>
    </div>

    <div class="widget-scroll-container" style="max-height: 440px; gap: 12px; padding-right: 6px;">
      ${collabLeads.map(lead => `
        <div class="glass-card" style="padding: 16px 20px; border-radius: 12px; background: rgba(255,255,255,0.65); transition: all 0.2s ease;">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 10px;">
            <img src="${lead.avatar}" style="width: 42px; height: 42px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" />
            <div>
              <strong style="font-size: 14.5px; color: var(--text-main);">${lead.name}</strong>
              <div style="font-size: 12px; color: var(--text-sub);">${lead.role}</div>
            </div>
            <span style="margin-left: auto; font-size: 11px; font-weight: 800; background: rgba(14,165,233,0.12); color: var(--sky); padding: 3px 10px; border-radius: 99px;">
              ${lead.roleNeeded}
            </span>
          </div>
          <h4 style="font-size: 14px; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">${lead.projectTitle}</h4>
          <p style="font-size: 13px; color: var(--text-sub); line-height: 1.5; margin-bottom: 12px;">${lead.projectScope}</p>
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 10px;">
            <div style="display: flex; gap: 6px;">
              ${lead.skills.slice(0, 3).map(sk => `<span style="font-size: 11px; font-weight: 700; background: rgba(99,102,241,0.08); color: var(--primary); padding: 2px 8px; border-radius: 99px;">${sk}</span>`).join("")}
            </div>
            <button class="btn-primary" onclick="openCollabModal('${lead.id}')" style="padding: 5px 14px; font-size: 12px;">
              View &amp; Pitch ↗
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  modal.classList.add("open");
  document.getElementById("modalBackdrop").classList.add("open");
}

function closeAllCollabModal() {
  const modal = document.getElementById("allCollabModal");
  if (modal) modal.classList.remove("open");
  document.getElementById("modalBackdrop").classList.remove("open");
}

/* ─────────────────────────────────────────────────────────
   UPCOMING EVENTS POPOUT MODAL
   ───────────────────────────────────────────────────────── */
function renderRightSidebarEvents() {
  const list = document.getElementById("upcomingEventsList");
  if (!list) return;

  // Render all upcoming events for active independent scrolling
  list.innerHTML = upcomingEvents.map(ev => `
    <div class="event-item" onclick="openEventModal('${ev.id}')">
      <div class="event-date-badge">
        <span class="event-month">${ev.month}</span>
        <span class="event-day">${ev.day}</span>
      </div>
      <div class="event-details">
        <div class="event-title">${ev.title}</div>
        <div class="event-club">${ev.club}</div>
      </div>
      <span style="font-size: 12px; color: var(--primary); font-weight:700;">View →</span>
    </div>
  `).join("");
}

function openEventModal(eventId) {
  const ev = upcomingEvents.find(x => x.id === eventId) || upcomingEvents[0];
  const modal = document.getElementById("eventModal");
  const content = document.getElementById("eventModalContent");

  content.innerHTML = `
    <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 16px;">
      <div class="event-date-badge" style="width: 52px; height: 56px;">
        <span class="event-month" style="font-size: 11px;">${ev.month}</span>
        <span class="event-day" style="font-size: 20px;">${ev.day}</span>
      </div>
      <div>
        <h2 style="font-size: 18px; font-weight: 800; color: var(--text-main);">${ev.title}</h2>
        <span style="font-size: 12.5px; color: var(--primary); font-weight: 700;">Organized by ${ev.club}</span>
      </div>
    </div>

    <div style="background: rgba(99,102,241,0.06); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 16px; font-size: 13px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
      <div><strong>📅 Timings:</strong><br><span style="color:var(--text-sub);">${ev.time}</span></div>
      <div><strong>📍 Venue:</strong><br><span style="color:var(--text-sub);">${ev.venue}</span></div>
    </div>

    <p style="font-size: 14px; color: var(--text-main); line-height: 1.65; margin-bottom: 24px;">${ev.desc}</p>

    <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 16px;">
      <button class="event-rsvp-btn ${ev.rsvpd ? 'rsvpd' : ''}" onclick="toggleEventRsvp('${ev.id}', this)">
        ${ev.rsvpd ? "RSVP'd ✓" : "RSVP for Event"}
      </button>
      <a href="${ev.regLink}" target="_blank" class="btn-primary" style="font-size: 13px; text-decoration: none; padding: 8px 20px;">
        🔗 Official Registration Form ↗
      </a>
    </div>
  `;

  modal.classList.add("open");
  document.getElementById("modalBackdrop").classList.add("open");
}

function closeEventModal() {
  document.getElementById("eventModal").classList.remove("open");
  document.getElementById("modalBackdrop").classList.remove("open");
}

function toggleEventRsvp(eventId, btn) {
  const ev = upcomingEvents.find(x => x.id === eventId);
  if (!ev) return;
  ev.rsvpd = !ev.rsvpd;
  btn.classList.toggle("rsvpd", ev.rsvpd);
  btn.textContent = ev.rsvpd ? "RSVP'd ✓" : "RSVP for Event";
  showToast(ev.rsvpd ? "RSVP confirmed! Event added to your calendar." : "RSVP withdrawn.", ev.rsvpd ? "📅" : "ℹ️");
}

/* ─────────────────────────────────────────────────────────
   70% WIDTH INTERACTIVE CALENDAR WIDGET MODAL
   ───────────────────────────────────────────────────────── */
function openCalendarModal() {
  const modal = document.getElementById("calendarModal");
  renderCalendarGrid();
  modal.classList.add("open");
  document.getElementById("modalBackdrop").classList.add("open");
}

function closeCalendarModal() {
  document.getElementById("calendarModal").classList.remove("open");
  document.getElementById("modalBackdrop").classList.remove("open");
}

function renderCalendarGrid() {
  const grid = document.getElementById("calendarGridDays");
  if (!grid) return;

  // October 2026 calendar (starts on Thursday = index 4)
  // Day offset for Oct 1, 2026: 4 blanks (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4)
  const totalDays = 31;
  const startOffset = 4;
  let cellsHTML = "";

  // Previous month trailing days
  for (let i = 0; i < startOffset; i++) {
    cellsHTML += `<div class="calendar-day-cell other-month"><span class="cal-date-num">${27 + i}</span></div>`;
  }

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    const dayStr = d < 10 ? "0" + d : "" + d;
    const eventsOnDay = upcomingEvents.filter(e => e.month === "OCT" && e.day === dayStr);
    const hasEv = eventsOnDay.length > 0;
    const isSelected = selectedCalendarDay === d;

    cellsHTML += `
      <div class="calendar-day-cell ${hasEv ? 'has-event' : ''} ${isSelected ? 'selected' : ''}" onclick="selectCalendarDay(${d})">
        <span class="cal-date-num">${d}</span>
        ${eventsOnDay.map(e => `<span class="cal-event-pill" title="${e.title}">${e.title}</span>`).join("")}
      </div>
    `;
  }

  grid.innerHTML = cellsHTML;
}

function selectCalendarDay(dayNum) {
  selectedCalendarDay = dayNum;
  renderCalendarGrid();

  const dayStr = dayNum < 10 ? "0" + dayNum : "" + dayNum;
  const events = upcomingEvents.filter(e => e.month === "OCT" && e.day === dayStr);
  const panel = document.getElementById("dayEventsPanel");

  if (!panel) return;

  if (events.length === 0) {
    panel.innerHTML = `
      <div style="font-size: 13.5px; color: var(--text-sub);">
        <strong>October ${dayNum}, 2026</strong> — No major campus events scheduled. Quiet study day!
      </div>
    `;
    panel.style.display = "block";
    return;
  }

  panel.innerHTML = `
    <div style="margin-bottom: 10px; font-size: 14px; font-weight: 800; color: var(--text-main);">
      📅 Events on October ${dayNum}, 2026 (${events.length})
    </div>
    ${events.map(e => `
      <div style="background:#fff; border-radius:10px; padding:12px 14px; margin-bottom:8px; border:1px solid rgba(0,0,0,0.06); display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:var(--text-main); font-size:14px;">${e.title}</strong>
          <div style="font-size:12px; color:var(--text-sub);">${e.club} · ${e.time} · ${e.venue}</div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="event-rsvp-btn" onclick="openEventModal('${e.id}')">Details</button>
          <a href="${e.regLink}" target="_blank" class="btn-primary" style="font-size:11.5px; padding:4px 12px; text-decoration:none;">Register ↗</a>
        </div>
      </div>
    `).join("")}
  `;
  panel.style.display = "block";
}

/* ─────────────────────────────────────────────────────────
   COLLABORATION RADAR LEADS POPOUT MODAL
   ───────────────────────────────────────────────────────── */
function renderRightSidebarCollabs() {
  const list = document.getElementById("collabRadarList");
  if (!list) return;

  list.innerHTML = collabLeads.map(lead => `
    <div class="collab-lead-item" onclick="openCollabModal('${lead.id}')">
      <div class="collab-lead-info">
        <img class="collab-lead-avatar" src="${lead.avatar}" alt="${lead.name}" />
        <div>
          <div class="collab-lead-name">${lead.name}</div>
          <div class="collab-lead-role">${lead.role.split('·')[0]}</div>
        </div>
      </div>
      <span class="collab-tag">${lead.roleNeeded.split(' ')[0]}</span>
    </div>
  `).join("");
}

function openCollabModal(leadId) {
  const lead = collabLeads.find(x => x.id === leadId) || collabLeads[0];
  const modal = document.getElementById("collabModal");
  const content = document.getElementById("collabModalContent");

  content.innerHTML = `
    <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 18px; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 16px;">
      <img src="${lead.avatar}" style="width: 56px; height: 56px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
      <div>
        <h2 style="font-size: 18px; font-weight: 800; color: var(--text-main);">${lead.name}</h2>
        <div style="font-size: 12.5px; color: var(--text-sub); font-weight: 600;">${lead.role}</div>
        <div style="margin-top: 4px; display: flex; gap: 6px; font-size: 11px;">
          <a href="https://${lead.github}" target="_blank" style="color:var(--primary); text-decoration:none; font-weight:700;">GitHub ↗</a>
          <span>·</span>
          <a href="https://${lead.linkedin}" target="_blank" style="color:var(--primary); text-decoration:none; font-weight:700;">LinkedIn ↗</a>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 16px;">
      <span style="font-size: 11px; font-weight: 800; background: rgba(14,165,233,0.12); color: var(--sky); padding: 4px 10px; border-radius: 99px;">ACTIVE COLLABORATION CALL</span>
      <h3 style="font-size: 16px; font-weight: 800; color: var(--text-main); margin-top: 8px;">${lead.projectTitle}</h3>
      <p style="font-size: 13.5px; color: var(--text-sub); line-height: 1.6; margin-top: 6px;">${lead.projectScope}</p>
    </div>

    <div style="background: rgba(99,102,241,0.06); padding: 14px 16px; border-radius: var(--radius-sm); margin-bottom: 20px;">
      <strong style="font-size: 13px; color: var(--text-main); display:block; margin-bottom: 4px;">🎯 Looking For:</strong>
      <span style="font-size: 13.5px; font-weight: 700; color: var(--primary);">${lead.roleNeeded}</span> (${lead.openSpots} spot open)
    </div>

    <div style="display: flex; gap: 10px; justify-content: flex-end;">
      <button class="event-rsvp-btn" onclick="closeCollabModal()">Close</button>
      <button class="btn-primary" onclick="acceptCollabLead('${lead.id}')" style="font-size: 13px; padding: 9px 20px;">
        🤝 Send Collaboration Pitch
      </button>
    </div>
  `;

  modal.classList.add("open");
  document.getElementById("modalBackdrop").classList.add("open");
}

function closeCollabModal() {
  document.getElementById("collabModal").classList.remove("open");
  document.getElementById("modalBackdrop").classList.remove("open");
}

function acceptCollabLead(leadId) {
  const lead = collabLeads.find(x => x.id === leadId);
  if (!lead) return;
  lead.requested = true;
  closeCollabModal();
  showToast(`Collaboration pitch sent to ${lead.name}! They will receive a notification in their inbox.`, "🤝");
}

/* ─────────────────────────────────────────────────────────
   COMMENTS DRAWER
   ───────────────────────────────────────────────────────── */
function openCommentsDrawer(postId) {
  activeCommentPostId = postId;
  const p = postsData.find(x => x.id === postId);
  if (!p) return;
  renderDrawerComments(p.comments);
  document.getElementById("commentsDrawer").classList.add("open");
  document.getElementById("commentOverlay").classList.add("open");
}

function closeCommentsDrawer() {
  document.getElementById("commentsDrawer").classList.remove("open");
  document.getElementById("commentOverlay").classList.remove("open");
  activeCommentPostId = null;
}

function renderDrawerComments(comments) {
  const list = document.getElementById("drawerCommentsList");
  if (!comments.length) {
    list.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:28px 0; font-size:13.5px;">No comments yet. Start the conversation!</p>`;
    return;
  }
  list.innerHTML = comments.map(c => `
    <div class="comment-row">
      <div class="comment-avatar">${c.user.charAt(0)}</div>
      <div class="comment-bubble">
        <div class="comment-user">${c.user}</div>
        <div class="comment-msg">${c.text}</div>
        <div class="comment-meta">${c.time}</div>
      </div>
    </div>
  `).join("");
  list.scrollTop = list.scrollHeight;
}

function submitDrawerComment() {
  if (!activeCommentPostId) return;
  const input = document.getElementById("drawerCommentInput");
  const text = input.value.trim();
  if (!text) return;

  const p = postsData.find(x => x.id === activeCommentPostId);
  if (!p) return;
  p.comments.push({ user: currentUser.name, text: text, time: "Just now" });
  renderDrawerComments(p.comments);

  const cnt = document.getElementById("cmtCount-" + activeCommentPostId);
  if (cnt) cnt.textContent = p.comments.length;
  input.value = "";
}

const drawerInput = document.getElementById("drawerCommentInput");
if (drawerInput) {
  drawerInput.addEventListener("keydown", e => {
    if (e.key === "Enter") submitDrawerComment();
  });
}

/* ─────────────────────────────────────────────────────────
   GLOBAL TOAST NOTIFICATION
   ───────────────────────────────────────────────────────── */
function showToast(msg, icon = "🤝") {
  const t = document.getElementById("toastNotify");
  if (!t) return;
  document.getElementById("toastIcon").textContent = icon;
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(window._feedToastTimer);
  window._feedToastTimer = setTimeout(() => t.classList.remove("show"), 3400);
}
