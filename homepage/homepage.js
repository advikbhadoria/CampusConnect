/**
 * Campus Connect - Army Institute of Technology (AIT Pune)
 * JavaScript Engine
 * Includes: Three.js 3D WebGL Canvas, 3D Card Tilt, Multi-Role Login Hub, Modals, Filter System, Live Poll, and Alumni Contact
 */

document.addEventListener('DOMContentLoaded', () => {
  initThreeJSScene();
  initCard3DTilt();
  initLoginModal();
  initNavDropdown();
  initClubsFilter();
  initDetailsModals();
  initCampusVibePoll();
  initLiveCounters();
});

/* ==========================================================================
   1. Three.js 3D Scene (Connected Campus Knowledge Sphere & Particles)
   ========================================================================== */
function initThreeJSScene() {
  const container = document.getElementById('canvas-3d-container');
  if (!container) return;

  if (typeof THREE === 'undefined') {
    // Pure HTML5 Canvas Vanilla JS Fallback for 3D Constellation
    initPureCanvas3DFallback(container);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 24;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group to hold all 3D components
  const campusNetworkGroup = new THREE.Group();
  scene.add(campusNetworkGroup);

  // Core 3D Geometry: Glowing Icosahedron Lattice
  const coreGeometry = new THREE.IcosahedronGeometry(7, 2);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    roughness: 0.2,
    metalness: 0.8
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  campusNetworkGroup.add(coreMesh);

  // Inner Solid Frosted Core
  const innerGeometry = new THREE.IcosahedronGeometry(4.8, 1);
  const innerMaterial = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.3,
    metalness: 0.2,
    transparent: true,
    opacity: 0.25
  });
  const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
  campusNetworkGroup.add(innerMesh);

  // Floating Interconnected Nodes (Points)
  const nodeCount = 65;
  const positions = new Float32Array(nodeCount * 3);
  const nodeSpheres = [];

  const sphereGeo = new THREE.SphereGeometry(0.22, 12, 12);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.8,
    roughness: 0.1
  });

  for (let i = 0; i < nodeCount; i++) {
    const radius = 7 + (Math.random() - 0.5) * 4.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    if (i < 24) {
      const nodeObj = new THREE.Mesh(sphereGeo, sphereMat);
      nodeObj.position.set(x, y, z);
      campusNetworkGroup.add(nodeObj);
      nodeSpheres.push({ mesh: nodeObj, originalPos: new THREE.Vector3(x, y, z), speed: 0.5 + Math.random() * 0.5 });
    }
  }

  // Orbital Rings
  const ringGeo1 = new THREE.TorusGeometry(10.5, 0.04, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.45 });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  campusNetworkGroup.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(12, 0.03, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  campusNetworkGroup.add(ring2);

  // Background Particles Cloud
  const particleCount = 140;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePos[i] = (Math.random() - 0.5) * 45;
    particlePos[i + 1] = (Math.random() - 0.5) * 45;
    particlePos[i + 2] = (Math.random() - 0.5) * 35;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.15,
    color: 0x0ea5e9,
    transparent: true,
    opacity: 0.6
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const directLight1 = new THREE.DirectionalLight(0x38bdf8, 1.8);
  directLight1.position.set(15, 20, 15);
  scene.add(directLight1);

  const directLight2 = new THREE.DirectionalLight(0x0284c7, 1.2);
  directLight2.position.set(-15, -10, -10);
  scene.add(directLight2);

  // Mouse Interaction Variables
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.0008;
    mouseY = (event.clientY - windowHalfY) * 0.0008;
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth target easing for interactive rotation
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    campusNetworkGroup.rotation.y = elapsedTime * 0.12 + targetX;
    campusNetworkGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 + targetY;

    ring1.rotation.z = elapsedTime * 0.08;
    ring2.rotation.x = elapsedTime * -0.06;

    // Node micro-pulse
    nodeSpheres.forEach((node, idx) => {
      const offset = Math.sin(elapsedTime * 2 + idx) * 0.3;
      node.mesh.position.y = node.originalPos.y + offset;
    });

    particleSystem.rotation.y = elapsedTime * 0.02;

    renderer.render(scene, camera);
  }
  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

/* ==========================================================================
   2. 3D Card Tilt Interaction with Dynamic Specular Glare
   ========================================================================== */
function initCard3DTilt() {
  const cards = document.querySelectorAll('.role-3d-card, .featured-news-card, .achievement-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   3. Multi-Role Dedicated Login Hub (Student, Faculty, Alumni)
   ========================================================================== */
function initLoginModal() {
  const loginOverlay = document.getElementById('loginModalOverlay');
  const openLoginBtns = document.querySelectorAll('.open-login-trigger');
  const closeLoginBtn = document.getElementById('closeLoginModalBtn');
  const tabBtns = document.querySelectorAll('.modal-tab-btn');
  const rolePanels = document.querySelectorAll('.role-form-panel');

  if (!loginOverlay) return;

  // Open Modal triggers with role preset
  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetRole = btn.getAttribute('data-role') || 'student';
      activateLoginRole(targetRole);
      loginOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Modal
  function closeLogin() {
    loginOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeLoginBtn) {
    closeLoginBtn.addEventListener('click', closeLogin);
  }

  loginOverlay.addEventListener('click', (e) => {
    if (e.target === loginOverlay) closeLogin();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginOverlay.classList.contains('active')) {
      closeLogin();
    }
  });

  // Role Tab Switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-tab');
      activateLoginRole(role);
    });
  });

  function activateLoginRole(roleName) {
    tabBtns.forEach(b => {
      if (b.getAttribute('data-tab') === roleName) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    rolePanels.forEach(panel => {
      if (panel.id === `${roleName}FormPanel`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  }


  // Form Submit Simulation & Session Storage
  const forms = [
    { form: document.getElementById('studentLoginForm'), role: 'student', defaultName: 'Sachin S. (Comp A)', inputId: 'studentIdInput' },
    { form: document.getElementById('facultyLoginForm'), role: 'faculty', defaultName: 'Dr. R. B. Gurav', inputId: 'facultyIdInput' },
    { form: document.getElementById('alumniLoginForm'), role: 'alumni', defaultName: 'Neha Sharma (Alumni)', inputId: 'alumniIdInput' }
  ];

  forms.forEach(({ form, role, defaultName, inputId }) => {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const idVal = document.getElementById(inputId)?.value.trim();
      const userName = idVal || defaultName;

      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Authenticating AIT Credentials...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Save Authenticated Session
        let regId = '22145';
        let studentName = userName;
        let branch = 'Comp';
        let studentEmail = '';

        if (role === 'student') {
          const explicitName = document.getElementById('studentNameInput')?.value.trim() || '';
          const emailInput = document.getElementById('studentEmailInput')?.value.trim() || '';
          studentEmail = emailInput;

          // Detect branch if specified in ID or email
          if (/it/i.test(idVal) || /it/i.test(emailInput)) branch = 'IT';
          else if (/etc|e&tc/i.test(idVal) || /etc/i.test(emailInput)) branch = 'E&TC';
          else if (/mech|are/i.test(idVal) || /mech/i.test(emailInput)) branch = 'Mech-ARE';
          else if (/comp/i.test(idVal) || /comp/i.test(emailInput)) branch = 'Comp';

          // Extract roll / registration digits
          const digitsMatch = idVal ? idVal.match(/\d+/) : null;
          if (digitsMatch) {
            regId = digitsMatch[0];
          }

          if (explicitName) {
            studentName = explicitName;
          } else {
            // Extract readable student name from idVal or email
            const textOnly = idVal ? idVal.replace(/[^a-zA-Z\s]/g, '').trim() : '';
            if (textOnly.length > 2 && !/^(comp|it|etc|mech|are)$/i.test(textOnly)) {
              studentName = textOnly;
            } else if (emailInput) {
              const prefix = emailInput.split('@')[0];
              const nameCandidate = prefix.replace(/_\d+$/, '').replace(/\d+/g, '').replace(/[._-]/g, ' ').trim();
              if (nameCandidate && nameCandidate.length > 1) {
                studentName = nameCandidate.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
              }
            }
          }

          if (!studentName || studentName.toLowerCase() === 'student' || /^\d+$/.test(studentName)) {
            studentName = explicitName || 'Advik Bhadoria';
          }
          if (!studentEmail) {
            studentEmail = `${studentName.toLowerCase().replace(/\s+/g, '_')}_${regId}@aitpune.edu.in`;
          }
        } else if (role === 'faculty') {
          const explicitFacultyName = document.getElementById('facultyNameInput')?.value.trim() || '';
          if (explicitFacultyName) studentName = explicitFacultyName;
        } else if (role === 'alumni') {
          const explicitAlumniName = document.getElementById('alumniNameInput')?.value.trim() || '';
          if (explicitAlumniName) studentName = explicitAlumniName;
        }

        const sessionData = {
          role: role,
          name: studentName,
          regNo: regId,
          branch: branch,
          email: studentEmail,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('campusConnectUser', JSON.stringify(sessionData));
        
        // Update UI state and transition to Feed
        initSessionState();
        closeLogin();
        showToast(`🎉 Authenticated as ${studentName}! Redirecting to Campus Feed...`);
        
        setTimeout(() => {
          window.location.href = '../Feed/feed.html';
        }, 500);
      }, 750);
    });
  });

  // Guest Continue button inside modal
  const guestPassBtn = document.getElementById('guestPassModalBtn');
  if (guestPassBtn) {
    guestPassBtn.addEventListener('click', () => {
      const guestSession = {
        role: 'guest',
        name: 'Guest Explorer',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('campusConnectUser', JSON.stringify(guestSession));
      initSessionState();
      closeLogin();
      showToast('🌐 Entering Campus Connect Feed as Guest...');
      setTimeout(() => {
        window.location.href = '../Feed/feed.html';
      }, 500);
    });
  }

  // Initialize Session State on page load
  initSessionState();
}

/* ==========================================================================
   Navigation Dropdown & Mobile Menu Controller
   ========================================================================== */
function initNavDropdown() {
  const dropdownItem = document.getElementById('navExploreDropdown');
  const dropdownBtn = document.getElementById('exploreDropdownBtn');
  const dropdownMenu = document.getElementById('exploreDropdownMenu');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (dropdownBtn && dropdownItem) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownItem.classList.toggle('is-open');
      dropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking any dropdown link
    const dropdownLinks = dropdownMenu ? dropdownMenu.querySelectorAll('.dropdown-link') : [];
    dropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
        dropdownItem.classList.remove('is-open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
        if (navLinks && window.innerWidth <= 860) {
          navLinks.classList.remove('active');
        }
      });
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (dropdownItem && !dropdownItem.contains(e.target)) {
      dropdownItem.classList.remove('is-open');
      if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
    }
    if (mobileToggle && navLinks && !mobileToggle.contains(e.target) && !navLinks.contains(e.target) && window.innerWidth <= 860) {
      navLinks.classList.remove('active');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (dropdownItem) {
        dropdownItem.classList.remove('is-open');
        if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
      }
      if (navLinks && window.innerWidth <= 860) {
        navLinks.classList.remove('active');
      }
    }
  });
}

/* ==========================================================================
   Session State Controller (Hides Faculty Directory for Guest Users)
   ========================================================================== */
function initSessionState() {
  const storedUser = localStorage.getItem('campusConnectUser');
  const facultyDirLink = document.getElementById('facultyDirNavLink');
  const footerFacultyDirLink = document.getElementById('footerFacultyDirLink');
  const userStatusLabel = document.getElementById('userStatusLabel');
  const userStatusDot = document.getElementById('userStatusDot');
  const navLoginBtn = document.getElementById('navLoginBtn');
  const navDashboardBtn = document.getElementById('navDashboardBtn');
  const navSignOutBtn = document.getElementById('navSignOutBtn');

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      // Show Faculty Directory link for logged in user (student, faculty, or alumni)
      if (facultyDirLink) {
        facultyDirLink.style.display = 'inline-block';
      }
      if (footerFacultyDirLink) {
        footerFacultyDirLink.style.display = 'list-item';
      }
      if (userStatusLabel) {
        let label = 'Campus Member';
        if (user.role === 'student') label = `🎓 ${user.name || 'Student'}`;
        else if (user.role === 'faculty') label = `👨‍🏫 ${user.name || 'Faculty'}`;
        else if (user.role === 'alumni') label = `💼 ${user.name || 'Alumni'}`;
        else label = `👤 ${user.name || 'Member'}`;
        userStatusLabel.textContent = label;
      }
      if (userStatusDot) {
        userStatusDot.style.background = '#10b981';
      }
      if (navLoginBtn) navLoginBtn.style.display = 'none';
      if (navDashboardBtn) navDashboardBtn.style.display = 'inline-flex';
      if (navSignOutBtn) navSignOutBtn.style.display = 'inline-flex';

      // Update hero CTA buttons so user goes straight to Feed without signing in again
      const heroStudentBtn = document.querySelector('.hero-cta-group button[data-role="student"]');
      if (heroStudentBtn) {
        heroStudentBtn.innerHTML = '<i class="fa-solid fa-compass"></i><span>Enter Campus Feed 🚀</span>';
        heroStudentBtn.onclick = (e) => {
          e.preventDefault();
          window.location.href = '../Feed/feed.html';
        };
      }
    } catch (e) {
      localStorage.removeItem('campusConnectUser');
    }
  } else {
    // Guest User: Faculty Directory option is HIDDEN
    if (facultyDirLink) {
      facultyDirLink.style.display = 'none';
    }
    if (footerFacultyDirLink) {
      footerFacultyDirLink.style.display = 'none';
    }
    if (userStatusLabel) {
      userStatusLabel.textContent = 'Guest Mode';
    }
    if (userStatusDot) {
      userStatusDot.style.background = '#0284c7';
    }
    if (navLoginBtn) {
      navLoginBtn.style.display = 'inline-flex';
    }
    if (navDashboardBtn) {
      navDashboardBtn.style.display = 'none';
    }
    if (navSignOutBtn) {
      navSignOutBtn.style.display = 'none';
    }

    const heroStudentBtn = document.querySelector('.hero-cta-group button[data-role="student"]');
    if (heroStudentBtn) {
      heroStudentBtn.innerHTML = '<i class="fa-solid fa-user-graduate"></i><span>Student Portal</span>';
      heroStudentBtn.onclick = null;
    }
  }

  if (navSignOutBtn) {
    navSignOutBtn.onclick = () => {
      localStorage.removeItem('campusConnectUser');
      initSessionState();
      showToast('👋 You have signed out. Protected directories locked.');
    };
  }
}

/* ==========================================================================
   4. Clubs & Communities Filter System
   ========================================================================== */
function initClubsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const clubCards = document.querySelectorAll('.club-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      clubCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Authentic AIT Pune Clubs Data & Interactive Details Modals
   ========================================================================== */
const clubsData = {
  'oss': {
    title: 'Open Source Software (OSS) Club',
    category: 'Technical & Open Source',
    lead: 'Student Lead: Nishant Singh (Comp B) • Staff In-charge: Dr. P.B. Patil',
    members: '280+ Active Contributors',
    projects: '15+ Open Source Repos',
    image: './images/innerve_hackathon.jpg',
    description: 'The premier open-source and software development community at AIT Pune. OSS Club organizes the flagship national 36-hour hackathon "Innerve", promotes Linux adoption, Git workflows, full-stack web development, and cloud solutions while contributing to prominent global open-source repositories.',
    events: [
      'Innerve 2026: National 36-Hour Hackathon ($5,000+ Prize Pool)',
      'Weekly Git & Linux Contribution Sprint: Saturdays @ 5:00 PM',
      'Open Source Day: Guest Session with Red Hat & GitHub Campus Experts'
    ]
  },
  'robotics': {
    title: 'AIT Robotics Club & 3D PLM Innovation Lab',
    category: 'Robotics & Hardware',
    lead: 'Student Lead: Aryan Deshmukh • Staff In-charge: Dr. S.M. Gaikwad',
    members: '190+ Roboticists',
    projects: '8 Autonomous Bot Platforms',
    image: './images/robotics_lab.jpg',
    description: 'Dedicated to designing and building autonomous rovers, combat bots, robotic arms, and industrial IoT solutions. Based in the cutting-edge 3D PLM Product Innovation Lab, the club represents AIT Pune at DD Robocon, Mechatronics Expos, and international collegiate robotics contests.',
    events: [
      'DD Robocon 2026 Arena Bot Prototyping & Testing',
      'Autonomous Rover Lidar & Computer Vision Workshop',
      'Battle of Bots (RoboWars) @ Solutions Tech Fest'
    ]
  },
  'baja': {
    title: 'Team BAJA / SAE India Collegiate Club',
    category: 'Automotive & Motorsport',
    lead: 'Team Captain: Harshvardhan Joshi • Faculty Advisor: Dr. R.B. Gurav',
    members: '130+ Automotive Engineers',
    projects: 'Custom All-Terrain Buggy & Formula EV',
    image: './images/baja_racing.jpg',
    description: 'The interdisciplinary motorsport engineering team of AIT Pune. Designing, analyzing, fabricating, and racing all-terrain single-seater BAJA buggies from scratch in the AIT mechanical workshop. Consistently finishes on podiums at national SAE BAJA and SUPRA championships.',
    events: [
      'BAJA SAE India 2026 Virtual Design & Dynamic Evaluations',
      'Suspension Tuning & Rollcage FEA Stress Analysis Bootcamp',
      'Live Vehicle Test Runs at AIT Track'
    ]
  },
  'cultural': {
    title: 'Cultural Club (Kalakriti, Swaranjali & Miraki)',
    category: 'Cultural & Performing Arts',
    lead: 'Cultural Sec: Ms. Sneha • Music Lead: Raghav • Drama: Miraki Troupe',
    members: '320+ Artists & Performers',
    projects: 'Aakriti Annual Cultural Extravaganza',
    image: './images/aakriti_cultural.jpg',
    description: 'The creative and artistic soul of AIT Pune. Comprises Kalakriti (Fine Arts), Swaranjali (Music & Rock Band), Natraj (Dance Troupe), and Miraki (Stage & Street Drama). They organize AIT\'s flagship annual inter-collegiate cultural fest, Aakriti, with celebrity concerts and national talent competitions.',
    events: [
      'Aakriti 2026: 3-Day Inter-Collegiate Cultural Festival & Star Night',
      'Inter-College Battle of the Bands (Swaranjali Live)',
      'Nukkad Natak Street Play Showcase on Social Themes'
    ]
  },
  'sports': {
    title: 'AIT Sports Guild & Pace Festival',
    category: 'Sports & Athletics',
    lead: 'Sports Secretary: Sachin (E&TC) • Physical Director: Col. R. Rathore',
    members: '500+ Varsity Athletes',
    projects: '12 Active Sports Disciplines',
    image: './images/pace_sports.jpg',
    description: 'Nurturing sporting excellence, fitness, and varsity spirit. Hosts Pace — AIT Pune\'s prestigious annual inter-collegiate sports championship featuring Football, Basketball, Cricket, Squash, Badminton, Lawn Tennis, Table Tennis, Volleyball, and Athletics.',
    events: [
      'Pace 2026: Annual Inter-Collegiate Sports Tournament',
      'Inter-Department Football & Cricket Trophy League',
      'AIT Annual Cross-Country 10K Run'
    ]
  },
  'ecell': {
    title: 'Innovation & Entrepreneurship Cell (AIT E-Cell)',
    category: 'Startups & Incubation',
    lead: 'Student In-charge: Samiksha Sharma • Faculty In-charge: Dr. Raviraj B. Gurav',
    members: '220+ Innovators & Founders',
    projects: '12+ Seeded Campus Startups',
    image: './images/ecell_summit.jpg',
    description: 'Affiliated with the Institute Innovation Council (IIC) and MoE guidelines. AIT E-Cell empowers student startup founders with pre-incubation grants, intellectual property & patent filings, mentor connects, and hosts the annual AIT E-Summit with prominent venture capitalists and angel networks.',
    events: [
      'AIT E-Summit 2026: National Pitch Deck & VC Investor Conclave',
      'Idea-to-Product Hackathon & Angel Grant Showcase',
      'Fireside Chat: From AIT Campus to $100M Tech Unicorn'
    ]
  },
  'coding': {
    title: 'AIT Coding Club & ACM Student Chapter (A2SC)',
    category: 'Competitive Programming',
    lead: 'Coding Head: Nishant S. • ACM Chapter Chair: Tanmay K.',
    members: '380+ Programmers',
    projects: 'ICPC Regional Finalist Teams',
    image: './images/innerve_hackathon.jpg',
    description: 'The competitive coding and algorithms power-hub at AIT Pune. Affiliated with ACM (A2SC), this society trains students in Data Structures, Dynamic Programming, and Graph Theory to compete at Codeforces, LeetCode, CodeChef, and ICPC regional contests.',
    events: [
      'Weekly Algorithm Contest (AIT CodeWars): Wednesdays @ 8:00 PM',
      'ICPC Bootcamp: Advanced Dynamic Programming & Graph Sprints',
      'Mock Technical Interview Sessions with FAANG Alumni'
    ]
  },
  'debsoc': {
    title: 'Debating Society (DebSoc) & Amethyst Board',
    category: 'Debating & Literary',
    lead: 'DebSoc Convener: Ananya Nair • Amethyst Chief Editor: Devansh T.',
    members: '160+ Orators & Writers',
    projects: 'Amethyst College Annual Magazine',
    image: './images/aakriti_cultural.jpg',
    description: 'The literary and parliamentary debating powerhouse of AIT Pune. Prepares students for national Model United Nations (MUNs), parliamentary debates, elocutions, and publishes the official annual college magazine, Amethyst.',
    events: [
      'AIT Parliamentary Debate Championship (AIT-PD 2026)',
      'Amethyst Literary & Poetry Showcase Evening',
      'National Model United Nations (AIT-MUN Delegation Training)'
    ]
  }
};

function initDetailsModals() {
  const detailsOverlay = document.getElementById('detailsModalOverlay');
  const detailsContent = document.getElementById('detailsModalContent');
  const closeDetailsBtn = document.getElementById('closeDetailsModalBtn');

  if (!detailsOverlay) return;

  function closeDetails() {
    detailsOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeDetailsBtn) closeDetailsBtn.addEventListener('click', closeDetails);
  detailsOverlay.addEventListener('click', (e) => {
    if (e.target === detailsOverlay) closeDetails();
  });

  // Club Details Modal Triggers
  document.querySelectorAll('.open-club-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const clubKey = btn.getAttribute('data-club');
      const data = clubsData[clubKey] || clubsData['oss'];

      detailsContent.innerHTML = `
        <div style="margin-bottom: 20px;">
          <div style="height: 220px; border-radius: 16px; overflow: hidden; margin-bottom: 20px; background: #e0f2fe; box-shadow: 0 6px 18px rgba(2,132,199,0.15);">
            <img src="${data.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${data.title}" />
          </div>
          <span class="glass-badge" style="margin-bottom: 12px;"><i class="fa-solid fa-tag"></i> ${data.category}</span>
          <h2 style="font-size: 1.8rem; margin: 8px 0 6px;">${data.title}</h2>
          <p style="color: var(--primary-700); font-weight: 600; font-size: 0.9rem; margin-bottom: 16px;">
            <i class="fa-solid fa-user-shield"></i> ${data.lead}
          </p>
          
          <div style="display: flex; gap: 24px; padding: 14px 18px; background: rgba(224,242,254,0.5); border-radius: 12px; margin-bottom: 20px;">
            <div>
              <span style="font-size: 0.8rem; color: var(--text-light); display: block;">Active Strength</span>
              <strong style="font-size: 1.1rem; color: var(--primary-800);">${data.members}</strong>
            </div>
            <div>
              <span style="font-size: 0.8rem; color: var(--text-light); display: block;">Key Milestones</span>
              <strong style="font-size: 1.1rem; color: var(--primary-800);">${data.projects}</strong>
            </div>
          </div>

          <h4 style="font-size: 1.05rem; margin-bottom: 8px;">About the Organization</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">${data.description}</p>

          <h4 style="font-size: 1.05rem; margin-bottom: 10px;">Flagship Events & Schedule</h4>
          <ul style="list-style: none; margin-bottom: 28px;">
            ${data.events.map(ev => `
              <li style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 0.92rem; color: var(--text-dark);">
                <span style="color: var(--primary-500); font-weight: bold;">⚡</span> ${ev}
              </li>
            `).join('')}
          </ul>

          <div style="display: flex; gap: 14px;">
            <button class="btn-glass btn-glass-primary" style="flex: 1;" onclick="joinClubAction('${data.title}')">
              <i class="fa-solid fa-paper-plane"></i> Apply for Club Membership
            </button>
            <button class="btn-glass btn-glass-secondary" onclick="closeDetailsModalDirect()">
              Close
            </button>
          </div>
        </div>
      `;

      detailsOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Direct Alumni Contact Trigger (Mentorship replaced with Contact)
  document.querySelectorAll('.open-contact-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const alumniName = btn.getAttribute('data-alumni') || 'AIT Alumni';
      const role = btn.getAttribute('data-role') || 'Distinguished Alumni';
      const company = btn.getAttribute('data-company') || 'Global Enterprise';
      const email = btn.getAttribute('data-email') || 'alumni@aitpune.edu.in';

      // Pre-fill user info if signed in
      let loggedUser = null;
      try {
        const raw = localStorage.getItem('campusConnectUser');
        if (raw) loggedUser = JSON.parse(raw);
      } catch (e) {}
      const isGuest = loggedUser && loggedUser.role === 'guest';
      const senderName = (!isGuest && loggedUser && loggedUser.name) ? loggedUser.name : '';
      const senderEmail = (!isGuest && loggedUser && loggedUser.email) ? loggedUser.email : '';

      detailsContent.innerHTML = `
        <div>
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 14px; box-shadow: 0 8px 20px rgba(14,165,233,0.3);">
              <i class="fa-solid fa-envelope-open-text"></i>
            </div>
            <h2 style="font-size: 1.6rem; margin-bottom: 4px;">Contact ${alumniName}</h2>
            <p style="color: var(--primary-700); font-size: 0.92rem; font-weight: 600;">${role} • ${company}</p>
            <span class="glass-badge" style="font-size: 0.76rem; margin-top: 6px;">
              <i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Verified AIT Alumni: ${email}
            </span>
          </div>

          <form id="contactAlumniForm" onsubmit="handleContactAlumniSubmit(event, '${alumniName}')">
            <div class="form-group">
              <label class="form-label">Your Full Name</label>
              <input type="text" class="form-input" placeholder="e.g. Rahul Sharma" value="${senderName}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Your Email Address</label>
              <input type="email" class="form-input" placeholder="your.email@aitpune.edu.in" value="${senderEmail}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Your Affiliation / Status</label>
              <select class="form-input" style="cursor: pointer;">
                <option>AIT Pune Student (Current Batch)</option>
                <option>AIT Pune Faculty / Researcher</option>
                <option>Fellow AIT Alumni</option>
                <option>Industry Recruiter / Collaborator</option>
                <option>Guest Explorer</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Purpose of Contact</label>
              <select class="form-input" style="cursor: pointer;">
                <option>Career Guidance & Industry Inquiry</option>
                <option>Job / Internship Referral Inquiry</option>
                <option>Technical / Startup Project Discussion</option>
                <option>AIT Batch Networking & Catch-up</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea class="form-input" rows="4" placeholder="Write your professional message or query here..." style="resize: none;" required></textarea>
            </div>
            <div style="display: flex; gap: 12px; margin-top: 24px;">
              <button type="submit" class="btn-glass btn-glass-primary" style="flex: 1;">
                <i class="fa-solid fa-paper-plane"></i> Send Direct Message
              </button>
              <button type="button" class="btn-glass btn-glass-secondary" onclick="closeDetailsModalDirect()">
                Cancel
              </button>
            </div>
          </form>
        </div>
      `;

      detailsOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

// Global modal helper handlers
window.closeDetailsModalDirect = function() {
  const detailsOverlay = document.getElementById('detailsModalOverlay');
  if (detailsOverlay) {
    detailsOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.joinClubAction = function(clubName) {
  closeDetailsModalDirect();
  showToast(`🎉 Registration request submitted to ${clubName}! The club secretary will reach out.`);
};

window.handleContactAlumniSubmit = function(e, alumniName) {
  e.preventDefault();
  closeDetailsModalDirect();
  showToast(`📨 Message directly dispatched to ${alumniName} via the AIT Alumni Network!`);
};

/* ==========================================================================
   6. Campus Vibe / Guest Interactive Poll
   ========================================================================== */
function initCampusVibePoll() {
  const pollBtns = document.querySelectorAll('.poll-option-btn');
  let hasVoted = false;

  const pollCounts = {
    'opt1': 483,
    'opt2': 398,
    'opt3': 312,
    'opt4': 227
  };

  function updatePollPercentages() {
    const total = Object.values(pollCounts).reduce((a, b) => a + b, 0);

    pollBtns.forEach(btn => {
      const opt = btn.getAttribute('data-opt');
      const count = pollCounts[opt] || 0;
      const pct = Math.round((count / total) * 100);

      const progressBg = btn.querySelector('.poll-progress-bg');
      const pctLabel = btn.querySelector('.poll-pct');

      if (progressBg) progressBg.style.width = `${pct}%`;
      if (pctLabel) pctLabel.textContent = `${pct}%`;
    });
  }

  // Initial calculation
  updatePollPercentages();

  pollBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (hasVoted) {
        showToast('ℹ️ You have already cast your vote for this week\'s AIT campus poll!');
        return;
      }

      pollBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const opt = btn.getAttribute('data-opt');
      pollCounts[opt] = (pollCounts[opt] || 0) + 1;
      hasVoted = true;

      updatePollPercentages();
      showToast('🌟 Vote recorded! Thank you for sharing your AIT campus vibe.');
    });
  });
}

/* ==========================================================================
   7. Live Counters & Micro-Interactions
   ========================================================================== */
function initLiveCounters() {
  const activeUsersCounter = document.getElementById('liveActiveUsersCount');
  if (!activeUsersCounter) return;

  let currentCount = 1842;

  // Random gentle live pulse every 8 seconds
  setInterval(() => {
    const delta = (Math.random() > 0.4 ? 1 : -1) * Math.floor(Math.random() * 4 + 1);
    currentCount = Math.max(1750, Math.min(2200, currentCount + delta));
    activeUsersCounter.textContent = `${currentCount.toLocaleString()} Online Now`;
  }, 8000);
}

/* ==========================================================================
   8. Global Toast Notification System
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('globalToastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   9. Native HTML5 Canvas 3D Particle Constellation (Pure Vanilla JS Fallback)
   ========================================================================== */
function initPureCanvas3DFallback(container) {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = container.clientWidth);
  let height = (canvas.height = container.clientHeight);

  const points = [];
  const pointCount = 45;

  for (let i = 0; i < pointCount; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: 2 + Math.random() * 3,
      color: Math.random() > 0.5 ? '#0ea5e9' : '#38bdf8'
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.25 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw and update points
    points.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Soft mouse gravity
      const mdx = mouseX - p.x;
      const mdy = mouseY - p.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < 100) {
        p.x += mdx * 0.01;
        p.y += mdy * 0.01;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    if (!container) return;
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  });
}
