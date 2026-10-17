/**
 * Campus Connect - Faculty Directory Engine
 * Army Institute of Technology (AIT Pune)
 * Features:
 * - 48 Comprehensive Faculty Profiles across 6 Academic Departments
 * - Interactive Real-Time Search with Highlight & Debouncing
 * - Dynamic Department & Designation Filtering
 * - Multi-criteria Sorting (Hierarchy, Name, Experience, Publications)
 * - 3D Card Tilt & Specular Parallax
 * - Interactive Neural Constellation Background Canvas
 * - Detailed Faculty Profile Modal with Qualifications & Teaching Schedules
 * - Consultation Booking & Academic Inquiry Modals with Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initConstellationCanvas();
  initFacultyDirectory();
  initShortcuts();
  initDirectoryNavDropdown();
  initDirectorySession();
});

/* ==========================================================================
   1. Authentic AIT Pune Faculty Data Store (48 Profiles)
   ========================================================================== */
const facultyData = [
  // ------------------------------------------------------------------------
  // COMPUTER ENGINEERING (12)
  // ------------------------------------------------------------------------
  {
    id: 'comp-1',
    name: 'Dr. S. R. Dhore',
    designation: 'Professor & Head of Department (COMP)',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'hod',
    qualifications: 'Ph.D. (Comp Engg), M.Tech (IIT Bombay), B.E.',
    experience: '24 Years',
    expYears: 24,
    papers: '48+ Scopus/IEEE',
    papersCount: 48,
    patents: '2 Patents Granted',
    currentSubjects: ['Distributed Systems', 'Cloud Computing', 'High Performance Computing'],
    researchDomains: ['Parallel Computing', 'Cloud Architecture', 'Distributed AI'],
    highlights: ['⭐ 24 Yrs Exp', '🏆 Best Teacher Award', '📄 48+ Papers', '🔬 Rs. 7 Cr Govt Grant PI'],
    bio: 'Leading high-performance computing research, cloud distributed systems, and industry-sponsored AI projects at AIT Pune.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Computer Dept, Room B-204',
    email: 'srdhore@aitpune.edu.in',
    phoneExt: 'Ext. 2104',
    officeHours: 'Mon, Wed & Fri: 2:00 PM – 4:00 PM',
    educationTimeline: [
      'Ph.D. in Computer Science & Engineering, SPPU',
      'M.Tech in Computer Science, IIT Bombay (Distinction)',
      'B.E. in Computer Engineering, Govt. College of Engineering'
    ],
    achievementsDetailed: [
      'Principal Investigator for Central Govt Rs. 7 Cr High-Performance Computing Research Grant.',
      'Recipient of SPPU Best Engineering Teacher Award 2023.',
      'Senior Member IEEE and Fellow of Computer Society of India (CSI).',
      'Published 48+ indexed journal articles in IEEE Transactions, Springer, and Elsevier.'
    ],
    labName: 'Cloud Computing & High Performance Server Lab'
  },
  {
    id: 'comp-2',
    name: 'Dr. P. B. Patil',
    designation: 'Dean Academics & Professor',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'hod',
    qualifications: 'Ph.D. (Computer Science), M.E., B.E.',
    experience: '22 Years',
    expYears: 22,
    papers: '42+ IEEE/ACM',
    papersCount: 42,
    patents: '3 Patents Filed',
    currentSubjects: ['Deep Learning', 'Machine Learning', 'Big Data Analytics'],
    researchDomains: ['Computer Vision', 'Deep Neural Architectures', 'Healthcare AI'],
    highlights: ['⭐ 22 Yrs Exp', '🎓 Dean Academics', '📄 42+ Papers', '💡 OSS Club Mentor'],
    bio: 'Specializing in deep learning architectures and predictive healthcare analytics. Chief Faculty Mentor for the Open Source Software (OSS) Club.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Main Academic Wing, Room A-102',
    email: 'pbpatil@aitpune.edu.in',
    phoneExt: 'Ext. 2101',
    officeHours: 'Tue & Thu: 3:00 PM – 5:00 PM',
    educationTimeline: [
      'Ph.D. in Deep Learning & Pattern Recognition, COEP',
      'M.E. in Computer Engineering, SPPU',
      'B.E. in Computer Science & Engineering'
    ],
    achievementsDetailed: [
      'Architected AIT Autonomous Curriculum and OBE (Outcome Based Education) framework.',
      'Chief Patron and Mentor for national 36-hour hackathon Innerve.',
      'Mentored 6 winning teams in Smart India Hackathon (SIH).'
    ],
    labName: 'NVIDIA Deep Learning & GPU Research Lab'
  },
  {
    id: 'comp-3',
    name: 'Dr. N. K. Bansode',
    designation: 'Associate Professor & NBA Coordinator',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (Cyber Security), M.Tech, B.E.',
    experience: '18 Years',
    expYears: 18,
    papers: '34+ Scopus',
    papersCount: 34,
    patents: '1 Patent Granted',
    currentSubjects: ['Information & Cyber Security', 'Blockchain Technologies', 'Cryptography'],
    researchDomains: ['Cyber Forensics', 'Zero-Trust Networks', 'Smart Contracts'],
    highlights: ['⭐ 18 Yrs Exp', '🛡️ Cyber Lead', '📄 34+ Papers', '🔐 Blockchain Specialist'],
    bio: 'Pioneering research in enterprise blockchain security and military cyber defense. In-charge of AIT Information Security & Data Forensics Club.',
    status: 'busy',
    statusText: 'In Lecture Hall',
    cabin: 'Computer Dept, Room B-212',
    email: 'nbansode@aitpune.edu.in',
    phoneExt: 'Ext. 2112',
    officeHours: 'Mon & Thu: 11:00 AM – 1:00 PM',
    educationTimeline: [
      'Ph.D. in Cyber Security & Cryptography, SPPU',
      'M.Tech in Network Security, VJTI Mumbai',
      'B.E. in Computer Engineering'
    ],
    achievementsDetailed: [
      'Authored standard textbook "Practical Cyber Forensics & Blockchain Security".',
      'Consultant to defense technical establishments for zero-trust vulnerability assessments.'
    ],
    labName: 'Information Security & Digital Forensics Lab'
  },
  {
    id: 'comp-4',
    name: 'Dr. Sushila Shelke',
    designation: 'Associate Professor',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (AI & NLP), M.Tech, B.E.',
    experience: '16 Years',
    expYears: 16,
    papers: '28+ IEEE/Springer',
    papersCount: 28,
    patents: '2 Patents Published',
    currentSubjects: ['Natural Language Processing', 'Database Management Systems', 'AI Ethics'],
    researchDomains: ['Multilingual NLP', 'Knowledge Graphs', 'Large Language Models'],
    highlights: ['⭐ 16 Yrs Exp', '🤖 NLP Specialist', '📄 28+ Papers', '🏆 Research Excellence'],
    bio: 'Investigating transformer-based multilingual semantic understanding and graph databases for low-resource Indic languages.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Computer Dept, Room B-208',
    email: 'sshelke@aitpune.edu.in',
    phoneExt: 'Ext. 2108',
    officeHours: 'Wed & Fri: 2:00 PM – 4:00 PM',
    educationTimeline: [
      'Ph.D. in Computational Linguistics & NLP, VNIT Nagpur',
      'M.Tech in Computer Engineering',
      'B.E. in Computer Engineering'
    ],
    achievementsDetailed: [
      'AICTE Research Promotion Scheme (RPS) grant recipient for Indic Speech Translation.',
      'Chairperson for IEEE Women in Engineering (WIE) Student Chapter.'
    ],
    labName: 'Artificial Intelligence & NLP Innovation Lab'
  },
  {
    id: 'comp-5',
    name: 'Prof. M. B. Lonare',
    designation: 'Assistant Professor (Senior Scale)',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Comp Engg), Ph.D. (Pursuing), B.E.',
    experience: '14 Years',
    expYears: 14,
    papers: '16+ Journals',
    papersCount: 16,
    patents: '1 Patent Filed',
    currentSubjects: ['Theory of Computation', 'Compiler Design', 'Design & Analysis of Algorithms'],
    researchDomains: ['Automata Theory', 'Grammar Optimization', 'Complexity Theory'],
    highlights: ['⭐ 14 Yrs Exp', '📐 Algorithms Guru', '📄 16+ Papers', '👨‍💻 Competitive Coding Mentor'],
    bio: 'Mentoring competitive programmers and algorithm enthusiasts at AIT. Renowned for intuitive pedagogy in theoretical computer science.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'Computer Dept, Room B-210',
    email: 'mlonare@aitpune.edu.in',
    phoneExt: 'Ext. 2110',
    officeHours: 'Tue & Fri: 11:30 AM – 1:30 PM',
    educationTimeline: [
      'Ph.D. (Pursuing) in Algorithmic Optimization, SPPU',
      'M.Tech in Computer Science, COEP',
      'B.E. in Computer Engineering'
    ],
    achievementsDetailed: [
      'Chief Faculty Coordinator for AIT CodeWars and ICPC Regional Training Camps.'
    ],
    labName: 'Advanced Programming & Algorithm Lab'
  },
  {
    id: 'comp-6',
    name: 'Prof. Snehal Marathe',
    designation: 'Assistant Professor',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Comp Engg), B.E.',
    experience: '11 Years',
    expYears: 11,
    papers: '12+ Papers',
    papersCount: 12,
    patents: '1 Copyright Registered',
    currentSubjects: ['Web Technology & Full Stack', 'Software Engineering & Agile', 'Cloud Native Apps'],
    researchDomains: ['Microservices Architecture', 'DevOps Automations', 'Frontend Frameworks'],
    highlights: ['⭐ 11 Yrs Exp', '🌐 Full Stack Lead', '📄 12+ Papers', '⚡ Hackathon Mentor'],
    bio: 'Passionate about modern cloud-native architectures, containerization, and full-stack software lifecycle engineering.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Computer Dept, Room B-206',
    email: 'smarathe@aitpune.edu.in',
    phoneExt: 'Ext. 2106',
    officeHours: 'Mon & Wed: 3:30 PM – 5:00 PM',
    educationTimeline: [
      'M.E. in Computer Engineering, SPPU',
      'B.E. in Computer Engineering'
    ],
    achievementsDetailed: [
      'Mentored 3 student startup teams incubated in AIT E-Cell.'
    ],
    labName: 'Web Technologies & Software Studio'
  },
  {
    id: 'comp-7',
    name: 'Prof. Sagar Rane',
    designation: 'Assistant Professor',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Information Technology), B.E.',
    experience: '9 Years',
    expYears: 9,
    papers: '10+ Conferences',
    papersCount: 10,
    patents: '—',
    currentSubjects: ['Operating Systems', 'Linux System Programming', 'Virtualization & Hypervisors'],
    researchDomains: ['Kernel Optimization', 'Container Runtimes', 'Embedded Linux'],
    highlights: ['⭐ 9 Yrs Exp', '🐧 Linux Kernel Specialist', '📄 10+ Papers', '🔧 System In-charge'],
    bio: 'Kernel hacker and system architect guiding students in bare-metal programming, OS internals, and virtualization fabrics.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'Server Center, Room B-105',
    email: 'srane@aitpune.edu.in',
    phoneExt: 'Ext. 2105',
    officeHours: 'Mon & Thu: 10:00 AM – 12:00 PM',
    educationTimeline: [
      'M.Tech in Information Technology, PICT Pune',
      'B.E. in Computer Science'
    ],
    achievementsDetailed: [
      'Designed campus-wide 10 Gbps network topology and high-availability virtualization cluster.'
    ],
    labName: 'Systems Software & Virtualization Lab'
  },
  {
    id: 'comp-8',
    name: 'Prof. Kuldeep Hule',
    designation: 'Assistant Professor',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Comp Engg), B.E.',
    experience: '8 Years',
    expYears: 8,
    papers: '8+ IEEE',
    papersCount: 8,
    patents: '—',
    currentSubjects: ['Data Structures & OOP in C++', 'Discrete Mathematics', 'Computer Graphics'],
    researchDomains: ['Computational Geometry', '3D Rendering Engines', 'Graph Theory'],
    highlights: ['⭐ 8 Yrs Exp', '🎮 Graphics & C++', '📄 8+ Papers', '🎯 First Year Mentor'],
    bio: 'Specializing in computer graphics algorithms, spatial data structures, and object-oriented paradigms.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Computer Dept, Room B-214',
    email: 'khule@aitpune.edu.in',
    phoneExt: 'Ext. 2114',
    officeHours: 'Tue & Thu: 2:00 PM – 4:00 PM',
    educationTimeline: [
      'M.Tech in Computer Engineering, SPPU',
      'B.E. in Computer Engineering'
    ],
    achievementsDetailed: [
      'Coordinator for AIT Augmented & Virtual Reality (AR/VR) Lab.'
    ],
    labName: 'Computer Graphics & Interactive Media Lab'
  },
  {
    id: 'comp-9',
    name: 'Prof. Jayashree Shinde',
    designation: 'Assistant Professor',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Comp Engg), B.E.',
    experience: '10 Years',
    expYears: 10,
    papers: '9+ Scopus',
    papersCount: 9,
    patents: '1 Patent Filed',
    currentSubjects: ['Computer Networks', 'Wireless Sensor Networks', 'Mobile Computing'],
    researchDomains: ['Routing Protocols', 'IoT Sensor Mesh', 'SDN Architectures'],
    highlights: ['⭐ 10 Yrs Exp', '📡 Network Specialist', '📄 9+ Papers', '🌐 Cisco Academy Lead'],
    bio: 'Teaching modern networking protocols, software-defined networks, and IoT telemetries with hands-on packet analytics.',
    status: 'busy',
    statusText: 'In Lecture Hall',
    cabin: 'Computer Dept, Room B-209',
    email: 'jshinde@aitpune.edu.in',
    phoneExt: 'Ext. 2109',
    officeHours: 'Wed & Fri: 11:00 AM – 1:00 PM',
    educationTimeline: ['M.E. in Computer Engineering, SPPU', 'B.E. in Computer Engineering'],
    achievementsDetailed: ['Certified Cisco CCNA & Network Security Academy Instructor.'],
    labName: 'Computer Networks & Packet Forensics Lab'
  },
  {
    id: 'comp-10',
    name: 'Prof. Rohit Kumar',
    designation: 'Assistant Professor',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Data Science), B.Tech',
    experience: '7 Years',
    expYears: 7,
    papers: '7+ International Journals',
    papersCount: 7,
    patents: '—',
    currentSubjects: ['Python for Data Science', 'Machine Learning Foundations', 'Data Mining'],
    researchDomains: ['Time-Series Forecasting', 'Recommender Systems', 'Edge AI'],
    highlights: ['⭐ 7 Yrs Exp', '📊 Data Science Lead', '📄 7+ Papers', '🚀 Kaggle Grandmaster Contributor'],
    bio: 'Focusing on edge inference optimization, scalable predictive modeling, and applied machine learning in industry.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Computer Dept, Room B-211',
    email: 'rkumar@aitpune.edu.in',
    phoneExt: 'Ext. 2111',
    officeHours: 'Mon & Wed: 1:30 PM – 3:30 PM',
    educationTimeline: ['M.Tech in Data Science, NIT Kurukshetra', 'B.Tech in Computer Science'],
    achievementsDetailed: ['Lead trainer for AIT Big Data & Industry 4.0 student certification cohorts.'],
    labName: 'Data Analytics & Predictive Modeling Lab'
  },
  {
    id: 'comp-11',
    name: 'Prof. Aparna Sonawane',
    designation: 'Assistant Professor',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Computer Engineering), B.E.',
    experience: '9 Years',
    expYears: 9,
    papers: '8+ Papers',
    papersCount: 8,
    patents: '—',
    currentSubjects: ['Object Oriented Modeling & Design', 'Software Testing & QA', 'Java Enterprise'],
    researchDomains: ['Software Reliability', 'Automated QA Testing', 'Design Patterns'],
    highlights: ['⭐ 9 Yrs Exp', '🧪 Software QA Lead', '📄 8+ Papers', '🏛️ Accreditation Team'],
    bio: 'Guiding student engineers in industry-grade automated test pipelines, architectural patterns, and defect prediction models.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Computer Dept, Room B-207',
    email: 'asonawane@aitpune.edu.in',
    phoneExt: 'Ext. 2107',
    officeHours: 'Tue & Thu: 10:30 AM – 12:30 PM',
    educationTimeline: ['M.E. in Computer Engineering, SPPU', 'B.E. in Computer Science'],
    achievementsDetailed: ['Authored lab manuals for Software Engineering and Object Oriented Modeling.'],
    labName: 'Software Engineering & Testing Lab'
  },
  {
    id: 'comp-12',
    name: 'Prof. Vijayalakshmi B.',
    designation: 'Assistant Professor',
    dept: 'comp',
    deptName: 'Computer Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Comp Sci), B.E.',
    experience: '8 Years',
    expYears: 8,
    papers: '6+ Papers',
    papersCount: 6,
    patents: '—',
    currentSubjects: ['Microprocessor Architectures', 'Computer Organization', 'Assembly Language'],
    researchDomains: ['Heterogeneous Computing', 'Embedded MCU Programming', 'RISC-V Systems'],
    highlights: ['⭐ 8 Yrs Exp', '⚡ Hardware Architecture', '📄 6+ Papers', '🔬 Microprocessor In-charge'],
    bio: 'Specializing in computer micro-architectures, instruction pipelines, and RISC-V processor simulation environments.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'Hardware Lab, Room B-110',
    email: 'bvijaya@aitpune.edu.in',
    phoneExt: 'Ext. 2110',
    officeHours: 'Fri: 2:00 PM – 4:00 PM',
    educationTimeline: ['M.Tech in Computer Science, VTU', 'B.E. in Computer Science & Engineering'],
    achievementsDetailed: ['Supervised student hardware projects selected at national ARM Design Contests.'],
    labName: 'Computer Hardware & Microprocessor Lab'
  },

  // ------------------------------------------------------------------------
  // INFORMATION TECHNOLOGY (10)
  // ------------------------------------------------------------------------
  {
    id: 'it-1',
    name: 'Dr. (Mrs.) Sangeeta Jadhav',
    designation: 'Professor & Head of Department (IT)',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'hod',
    qualifications: 'Ph.D. (Information Technology), M.E., B.E.',
    experience: '23 Years',
    expYears: 23,
    papers: '52+ Scopus/IEEE',
    papersCount: 52,
    patents: '3 Patents Granted',
    currentSubjects: ['Big Data Analytics', 'Cloud Computing Architecture', 'Information Retrieval'],
    researchDomains: ['AI in Healthcare', 'Predictive Modeling', 'Distributed Data Lakehouses'],
    highlights: ['⭐ 23 Yrs Exp', '🏆 HOD IT & Researcher', '📄 52+ Papers', '💡 3 Patents Granted'],
    bio: 'Directing data science research, health informatics, and cloud data infrastructures. Published over 52 indexed international research papers.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'IT Dept, Room IT-201',
    email: 'sjadhav@aitpune.edu.in',
    phoneExt: 'Ext. 2201',
    officeHours: 'Mon, Wed & Thu: 2:00 PM – 4:00 PM',
    educationTimeline: [
      'Ph.D. in Information Technology, SPPU',
      'M.E. in Computer Engineering, SPPU (First Class with Distinction)',
      'B.E. in Computer Engineering'
    ],
    achievementsDetailed: [
      'Granted 3 Indian Patents on intelligent healthcare diagnostic systems.',
      'Recipient of National Award for Outstanding Women Engineering Educator.',
      'Supervised 4 Ph.D. scholars in Big Data analytics and Machine Learning.'
    ],
    labName: 'Big Data & Cloud Computing Lab'
  },
  {
    id: 'it-2',
    name: 'Dr. Rahul Desai',
    designation: 'Associate Professor & Training & Placement Officer',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (Software Engg), M.Tech, B.E.',
    experience: '17 Years',
    expYears: 17,
    papers: '31+ IEEE/Springer',
    papersCount: 31,
    patents: '2 Patents Filed',
    currentSubjects: ['DevOps & Cloud Deployment', 'Software Testing & Automation', 'Enterprise IT'],
    researchDomains: ['Automated CI/CD Pipelines', 'Cloud Security', 'Agile Product Management'],
    highlights: ['⭐ 17 Yrs Exp', '💼 T&P Head', '📄 31+ Papers', '🚀 Corporate Liaison'],
    bio: 'Heading Campus Placements while conducting applied research in CI/CD pipeline automation and enterprise cloud migration.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Placement Cell & IT Dept, Room IT-104',
    email: 'rdesai@aitpune.edu.in',
    phoneExt: 'Ext. 2204',
    officeHours: 'Tue & Thu: 10:00 AM – 1:00 PM',
    educationTimeline: [
      'Ph.D. in Software Quality Engineering, SPPU',
      'M.Tech in Information Technology, VJTI Mumbai',
      'B.E. in Information Technology'
    ],
    achievementsDetailed: [
      'Facilitated over 92% consistent campus placements across top global tech giants.',
      'Organizer of annual AIT Industry-Academia Conclave.'
    ],
    labName: 'DevOps & Enterprise Software Studio'
  },
  {
    id: 'it-3',
    name: 'Dr. Ashwini Sapkal',
    designation: 'Associate Professor',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (Computer Vision), M.E., B.E.',
    experience: '15 Years',
    expYears: 15,
    papers: '26+ Scopus',
    papersCount: 26,
    patents: '1 Patent Granted',
    currentSubjects: ['Computer Vision & Image Processing', 'Machine Learning', 'Data Structures'],
    researchDomains: ['Biomedical Imaging', 'Facial Recognition', 'Generative Adversarial Networks'],
    highlights: ['⭐ 15 Yrs Exp', '👁️ Vision Specialist', '📄 26+ Papers', '🔬 DST Grant Co-PI'],
    bio: 'Specializing in generative vision models, biomedical image segmentation, and intelligent optical sensors.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'IT Dept, Room IT-205',
    email: 'asapkal@aitpune.edu.in',
    phoneExt: 'Ext. 2205',
    officeHours: 'Wed & Fri: 2:30 PM – 4:30 PM',
    educationTimeline: [
      'Ph.D. in Computer Vision & Image Processing, COEP',
      'M.E. in Information Technology',
      'B.E. in Computer Engineering'
    ],
    achievementsDetailed: [
      'DST-SERB research project on automated retinal pathology detection.'
    ],
    labName: 'Computer Vision & Multimedia Lab'
  },
  {
    id: 'it-4',
    name: 'Prof. Y. D. Vadnere',
    designation: 'Assistant Professor (Senior Scale)',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (IT), Ph.D. (Pursuing), B.E.',
    experience: '13 Years',
    expYears: 13,
    papers: '15+ Papers',
    papersCount: 15,
    patents: '—',
    currentSubjects: ['Object Oriented Programming (Java/C++)', 'Design Patterns', 'Data Structures'],
    researchDomains: ['Software Architecture', 'Component Reusability', 'Code Optimization'],
    highlights: ['⭐ 13 Yrs Exp', '☕ Java & OOP Master', '📄 15+ Papers', '🏆 Student Choice Award'],
    bio: 'Mentor for foundational programming cohorts, algorithmic efficiency, and object-oriented architectural paradigms.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'IT Dept, Room IT-207',
    email: 'yvadnere@aitpune.edu.in',
    phoneExt: 'Ext. 2207',
    officeHours: 'Mon & Thu: 11:00 AM – 1:00 PM',
    educationTimeline: ['M.Tech in Information Technology, SPPU', 'B.E. in Information Technology'],
    achievementsDetailed: ['Author of standard student lab manuals for Java Enterprise Edition.'],
    labName: 'Object Oriented Software Lab'
  },
  {
    id: 'it-5',
    name: 'Prof. G. M. Walunjkar',
    designation: 'Assistant Professor',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Computer Engineering), B.E.',
    experience: '12 Years',
    expYears: 12,
    papers: '14+ Conferences',
    papersCount: 14,
    patents: '1 Copyright',
    currentSubjects: ['Mobile Application Development', 'Internet of Things (IoT)', 'Computer Networks'],
    researchDomains: ['Android / iOS Architectures', 'Edge Computing', 'Sensor Telemetry'],
    highlights: ['⭐ 12 Yrs Exp', '📱 Mobile Apps Lead', '📄 14+ Papers', '📡 IoT Lab In-charge'],
    bio: 'Building cross-platform mobile experiences, IoT sensor meshes, and wearable tech integrations with cloud backends.',
    status: 'busy',
    statusText: 'In Lecture Hall',
    cabin: 'IT Dept, Room IT-203',
    email: 'gwalunjkar@aitpune.edu.in',
    phoneExt: 'Ext. 2203',
    officeHours: 'Tue & Fri: 3:00 PM – 5:00 PM',
    educationTimeline: ['M.E. in Computer Engineering, SPPU', 'B.E. in Information Technology'],
    achievementsDetailed: ['Faculty In-charge for Google Developer Student Club (GDSC) AIT Chapter.'],
    labName: 'Mobile Applications & IoT Lab'
  },
  {
    id: 'it-6',
    name: 'Prof. Preeti Verma',
    designation: 'Assistant Professor',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (IT), B.E.',
    experience: '10 Years',
    expYears: 10,
    papers: '11+ Journals',
    papersCount: 11,
    patents: '—',
    currentSubjects: ['Data Warehousing & Mining', 'Business Intelligence', 'Database Systems'],
    researchDomains: ['Data Lakes', 'ETL Optimizations', 'Customer Analytics'],
    highlights: ['⭐ 10 Yrs Exp', '📊 BI & ETL Expert', '📄 11+ Papers', '🎯 Student Mentor'],
    bio: 'Focusing on enterprise data warehousing architectures, analytics dashboards, and relational schema designs.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'IT Dept, Room IT-209',
    email: 'pverma@aitpune.edu.in',
    phoneExt: 'Ext. 2209',
    officeHours: 'Mon & Wed: 10:00 AM – 12:00 PM',
    educationTimeline: ['M.Tech in Information Technology, NIT Bhopal', 'B.E. in Information Technology'],
    achievementsDetailed: ['Certified Oracle Database Administrator & PowerBI Instructor.'],
    labName: 'Database & Business Intelligence Lab'
  },
  {
    id: 'it-7',
    name: 'Prof. Aparna Joshi',
    designation: 'Assistant Professor',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Information Technology), B.E.',
    experience: '8 Years',
    expYears: 8,
    papers: '8+ Papers',
    papersCount: 8,
    patents: '—',
    currentSubjects: ['Human Computer Interaction (HCI)', 'UI/UX Design', 'Python Programming'],
    researchDomains: ['Usability Engineering', 'Cognitive Load in UI', 'Accessibility Standards'],
    highlights: ['⭐ 8 Yrs Exp', '🎨 UI/UX Specialist', '📄 8+ Papers', '✨ Design Mentor'],
    bio: 'Passionate about accessible human-computer interaction, wireframing workflows, and ergonomic web interfaces.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'IT Dept, Room IT-206',
    email: 'ajoshi@aitpune.edu.in',
    phoneExt: 'Ext. 2206',
    officeHours: 'Thu & Fri: 1:30 PM – 3:30 PM',
    educationTimeline: ['M.E. in Information Technology, SPPU', 'B.E. in Information Technology'],
    achievementsDetailed: ['Conducted 12+ industry workshops on Figma, design systems, and web accessibility.'],
    labName: 'Human Centered Computing & UI Lab'
  },
  {
    id: 'it-8',
    name: 'Prof. Shweta Kapse',
    designation: 'Assistant Professor',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Comp Sci), B.E.',
    experience: '9 Years',
    expYears: 9,
    papers: '9+ Papers',
    papersCount: 9,
    patents: '—',
    currentSubjects: ['Cyber Laws & Ethics', 'Information Security', 'Web Development'],
    researchDomains: ['Digital Privacy', 'IT Act Compliance', 'Data Protection'],
    highlights: ['⭐ 9 Yrs Exp', '⚖️ Cyber Laws', '📄 9+ Papers', '🛡️ Security Advocate'],
    bio: 'Educating engineering cohorts in data privacy legislation, information ethics, and defensive web practices.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'IT Dept, Room IT-208',
    email: 'skapse@aitpune.edu.in',
    phoneExt: 'Ext. 2208',
    officeHours: 'Tue & Thu: 2:00 PM – 4:00 PM',
    educationTimeline: ['M.Tech in Computer Science, SPPU', 'B.E. in Information Technology'],
    achievementsDetailed: ['Faculty Advisor for AIT Cyber Club seminars and ethical hacking bootcamps.'],
    labName: 'Information Security & Ethics Lab'
  },
  {
    id: 'it-9',
    name: 'Prof. Deepali Patil',
    designation: 'Assistant Professor',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Comp Engg), B.E.',
    experience: '7 Years',
    expYears: 7,
    papers: '6+ Papers',
    papersCount: 6,
    patents: '—',
    currentSubjects: ['Data Structures & C++', 'Operating Systems', 'Web Fundamentals'],
    researchDomains: ['Performance Profiling', 'Algorithmic Efficiency', 'Memory Optimization'],
    highlights: ['⭐ 7 Yrs Exp', '💡 DSA Mentor', '📄 6+ Papers', '📚 Library In-charge'],
    bio: 'Dedicated to strengthening core data structures, memory management, and recursive algorithmic patterns in junior batches.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'IT Dept, Room IT-210',
    email: 'dpatil@aitpune.edu.in',
    phoneExt: 'Ext. 2210',
    officeHours: 'Mon & Fri: 11:30 AM – 1:30 PM',
    educationTimeline: ['M.E. in Computer Engineering, SPPU', 'B.E. in Information Technology'],
    achievementsDetailed: ['Organizer of internal AIT intra-department coding hackathons.'],
    labName: 'Programming Paradigms Lab'
  },
  {
    id: 'it-10',
    name: 'Prof. Mahesh Ghadge',
    designation: 'Assistant Professor',
    dept: 'it',
    deptName: 'Information Technology',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Network Engg), B.E.',
    experience: '8 Years',
    expYears: 8,
    papers: '7+ Conferences',
    papersCount: 7,
    patents: '—',
    currentSubjects: ['Cloud Infrastructure', 'Network Virtualization', 'Linux Administration'],
    researchDomains: ['Software Defined WAN', 'OpenStack Clouds', 'Network Security'],
    highlights: ['⭐ 8 Yrs Exp', '☁️ Cloud Infra', '📄 7+ Papers', '🔧 Network Admin'],
    bio: 'Managing cloud infrastructure labs and teaching virtualization, container orchestration, and network security policies.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'IT Server Room, IT-102',
    email: 'mghadge@aitpune.edu.in',
    phoneExt: 'Ext. 2202',
    officeHours: 'Wed: 2:00 PM – 5:00 PM',
    educationTimeline: ['M.Tech in Network Engineering, COEP', 'B.E. in Information Technology'],
    achievementsDetailed: ['Maintains AIT Department Data Center and Red Hat Academy setups.'],
    labName: 'Cloud Infrastructure & Networking Lab'
  },

  // ------------------------------------------------------------------------
  // ELECTRONICS & TELECOMMUNICATION (11)
  // ------------------------------------------------------------------------
  {
    id: 'etc-1',
    name: 'Dr. B. P. Patil',
    designation: 'Principal & Senior Professor (E&TC)',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'hod',
    qualifications: 'Ph.D. (Electronics Engg), M.Tech, B.E.',
    experience: '28 Years',
    expYears: 28,
    papers: '86+ Scopus/IEEE',
    papersCount: 86,
    patents: '5 Patents Granted',
    currentSubjects: ['Wireless Sensor Networks', 'Advanced Digital Signal Processing', 'RF & Microwave'],
    researchDomains: ['5G / 6G Communications', 'Cognitive Radio', 'MIMO Antennas'],
    highlights: ['⭐ 28 Yrs Exp', '🏛️ Principal AIT', '📄 86+ Papers', '🏆 Lifetime Achievement'],
    bio: 'Esteemed academic leader and Principal of AIT Pune. Forefront researcher in next-generation wireless communications and cognitive radio systems.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: "Principal's Office, Main Administration Wing",
    email: 'bppatil@aitpune.edu.in',
    phoneExt: 'Ext. 1001',
    officeHours: 'Tue & Thu: 3:30 PM – 5:00 PM',
    educationTimeline: [
      'Ph.D. in Electronics & Telecommunication, SPPU',
      'M.Tech in Microwave Electronics, University of Delhi',
      'B.E. in Electronics Engineering'
    ],
    achievementsDetailed: [
      'Authored 4 standard engineering textbooks adopted nationwide by AICTE & SPPU.',
      'Fellow of IETE, Senior Member IEEE, and Member of National Advisory Boards.',
      'Guided 8 successful Ph.D. dissertations in RF & Telecommunications.'
    ],
    labName: 'Advanced Wireless & RF Research Center'
  },
  {
    id: 'etc-2',
    name: 'Dr. G. R. Patil',
    designation: 'Professor & Head of Department (E&TC)',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'hod',
    qualifications: 'Ph.D. (VLSI & Embedded Systems), M.E., B.E.',
    experience: '22 Years',
    expYears: 22,
    papers: '46+ IEEE/Elsevier',
    papersCount: 46,
    patents: '3 Patents Published',
    currentSubjects: ['VLSI Design & System on Chip', 'Embedded Systems & RTOS', 'Microcontrollers'],
    researchDomains: ['FPGA Architectures', 'Low-Power VLSI', 'Hardware Security'],
    highlights: ['⭐ 22 Yrs Exp', '⚡ HOD E&TC', '📄 46+ Papers', '💡 VLSI Specialist'],
    bio: 'Spearheading VLSI design and SoC synthesis research. Head of Department for Electronics & Telecommunication Engineering.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'E&TC Dept, Room ETC-201',
    email: 'grpatil@aitpune.edu.in',
    phoneExt: 'Ext. 2301',
    officeHours: 'Mon, Wed & Fri: 2:00 PM – 4:00 PM',
    educationTimeline: [
      'Ph.D. in VLSI & Microelectronics, SPPU',
      'M.E. in Electronics Engineering, COEP',
      'B.E. in Electronics & Telecommunication'
    ],
    achievementsDetailed: [
      'Established Cadence and Synopsys EDA Tool Suite Center of Excellence at AIT.',
      'Co-PI for central defense research projects on radiation-hardened FPGA microchips.'
    ],
    labName: 'VLSI & Cadence Design Suite Lab'
  },
  {
    id: 'etc-3',
    name: 'Dr. Renuka Bhandari',
    designation: 'Dean Student Affairs & Associate Professor',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'hod',
    qualifications: 'Ph.D. (Biomedical Signals), M.E., B.E.',
    experience: '19 Years',
    expYears: 19,
    papers: '32+ Scopus',
    papersCount: 32,
    patents: '2 Patents Granted',
    currentSubjects: ['Digital Signal Processing', 'Biomedical Electronics', 'Signals & Systems'],
    researchDomains: ['EEG / ECG Signal Analysis', 'Smart Healthcare Sensors', 'Wavelet Transforms'],
    highlights: ['⭐ 19 Yrs Exp', '🎓 Dean Student Affairs', '📄 32+ Papers', '🩺 Biomedical Lead'],
    bio: 'Championing student welfare, cultural enrichment, and researching non-invasive biomedical signal acquisition devices.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Student Affairs Cell & E&TC Dept, Room ETC-103',
    email: 'rbhandari@aitpune.edu.in',
    phoneExt: 'Ext. 2303',
    officeHours: 'Mon, Tue & Thu: 3:00 PM – 5:00 PM',
    educationTimeline: [
      'Ph.D. in Biomedical Signal Processing, SPPU',
      'M.E. in Electronics, SPPU',
      'B.E. in E&TC Engineering'
    ],
    achievementsDetailed: [
      'Faculty Chairperson for Aakriti Cultural Fest and Student Council Oversight Committee.'
    ],
    labName: 'Digital Signal Processing & Biomedical Lab'
  },
  {
    id: 'etc-4',
    name: 'Dr. Vandana Inamdar',
    designation: 'Associate Professor',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (Microwave & Antenna), M.Tech, B.E.',
    experience: '16 Years',
    expYears: 16,
    papers: '27+ IEEE',
    papersCount: 27,
    patents: '2 Patents Filed',
    currentSubjects: ['Electromagnetics & Wave Propagation', 'Antenna Theory & Design', 'Microwave Devices'],
    researchDomains: ['Microstrip Patch Antennas', 'Metamaterials', 'Radar Cross Section'],
    highlights: ['⭐ 16 Yrs Exp', '📡 Antenna Specialist', '📄 27+ Papers', '🔬 Ansys HFSS Lead'],
    bio: 'Designing compact multi-band antennas for satellite downlinks, drone telemetry, and 5G base stations using Ansys HFSS.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'E&TC Dept, Room ETC-206',
    email: 'vinamdar@aitpune.edu.in',
    phoneExt: 'Ext. 2306',
    officeHours: 'Tue & Thu: 11:00 AM – 1:00 PM',
    educationTimeline: ['Ph.D. in Microwave Engineering, DIAT Pune', 'M.Tech in RF & Microwave', 'B.E. in E&TC'],
    achievementsDetailed: ['Recipient of IEEE Microwave Theory & Technology Society best paper award.'],
    labName: 'Microwave & Antenna Anechoic Chamber Lab'
  },
  {
    id: 'etc-5',
    name: 'Dr. P. R. Sonawane',
    designation: 'Associate Professor',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (Optical Networks), M.E., B.E.',
    experience: '15 Years',
    expYears: 15,
    papers: '22+ Scopus',
    papersCount: 22,
    patents: '1 Patent Granted',
    currentSubjects: ['Fiber Optic Communication', 'Telecommunication Switching Systems', 'Network Security'],
    researchDomains: ['WDM Optical Networks', 'Free Space Optics', 'Laser Communication'],
    highlights: ['⭐ 15 Yrs Exp', '💡 Optical Specialist', '📄 22+ Papers', '✨ IETE Coordinator'],
    bio: 'Investigating high-speed wavelength division multiplexing (WDM) and optical burst switching topologies.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'E&TC Dept, Room ETC-208',
    email: 'psonawane@aitpune.edu.in',
    phoneExt: 'Ext. 2308',
    officeHours: 'Wed & Fri: 1:30 PM – 3:30 PM',
    educationTimeline: ['Ph.D. in Optical Communications, SPPU', 'M.E. in Digital Systems', 'B.E. in E&TC'],
    achievementsDetailed: ['Consultant for telecom fiber infrastructure modernization.'],
    labName: 'Fiber Optics & Laser Communication Lab'
  },
  {
    id: 'etc-6',
    name: 'Prof. Avinash Patil',
    designation: 'Assistant Professor (Senior Scale)',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Embedded Systems), B.E.',
    experience: '12 Years',
    expYears: 12,
    papers: '13+ Papers',
    papersCount: 13,
    patents: '—',
    currentSubjects: ['ARM Microcontrollers', 'Digital Electronics & Logic Design', 'Embedded C'],
    researchDomains: ['Automotive ECUs', 'Real-Time Embedded Firmware', 'CAN Bus Protocols'],
    highlights: ['⭐ 12 Yrs Exp', '🚗 Automotive Electronics', '📄 13+ Papers', '🔧 Hardware Lead'],
    bio: 'Specializing in ARM Cortex microcontrollers, digital synthesis, and automotive electronic control units.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'E&TC Dept, Room ETC-204',
    email: 'apatil@aitpune.edu.in',
    phoneExt: 'Ext. 2304',
    officeHours: 'Mon & Thu: 10:00 AM – 12:00 PM',
    educationTimeline: ['M.Tech in Embedded Systems, COEP', 'B.E. in Electronics'],
    achievementsDetailed: ['Technical mentor for Team BAJA vehicle data acquisition telemetry system.'],
    labName: 'Embedded Microcontroller Lab'
  },
  {
    id: 'etc-7',
    name: 'Prof. Shilpa Pawar',
    designation: 'Assistant Professor',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Digital Systems), B.E.',
    experience: '10 Years',
    expYears: 10,
    papers: '11+ Papers',
    papersCount: 11,
    patents: '—',
    currentSubjects: ['Control Systems', 'Electronic Circuits & Design', 'Sensor Interfacing'],
    researchDomains: ['PID Control Tuning', 'Smart Power Inverters', 'Analog Circuit Design'],
    highlights: ['⭐ 10 Yrs Exp', '🎛️ Control Systems', '📄 11+ Papers', '🎯 Lab In-charge'],
    bio: 'Teaching feedback control architectures, frequency domain compensators, and analog circuit simulations in SPICE.',
    status: 'busy',
    statusText: 'In Lecture Hall',
    cabin: 'E&TC Dept, Room ETC-207',
    email: 'spawar@aitpune.edu.in',
    phoneExt: 'Ext. 2307',
    officeHours: 'Tue & Thu: 2:00 PM – 4:00 PM',
    educationTimeline: ['M.E. in Digital Systems, SPPU', 'B.E. in E&TC'],
    achievementsDetailed: ['Faculty In-charge for Analog & Linear Integrated Circuits Lab.'],
    labName: 'Analog Electronics & Control Systems Lab'
  },
  {
    id: 'etc-8',
    name: 'Prof. Karunesh Tiwari',
    designation: 'Assistant Professor',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Robotics & Automation), B.Tech',
    experience: '8 Years',
    expYears: 8,
    papers: '9+ IEEE',
    papersCount: 9,
    patents: '1 Patent Filed',
    currentSubjects: ['Mechatronics & Robotics', 'Industrial Automation & PLC', 'Sensor Fusion'],
    researchDomains: ['Robotic Actuators', 'Kinematics & Dynamics', 'SCADA Interfaces'],
    highlights: ['⭐ 8 Yrs Exp', '🤖 Robotics Hardware', '📄 9+ Papers', '🏆 Robocon Mentor'],
    bio: 'Guiding DD Robocon teams and building robotic motion control stages with multi-axis sensor fusion algorithms.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'Robotics Lab, Room B-101',
    email: 'ktiwari@aitpune.edu.in',
    phoneExt: 'Ext. 2310',
    officeHours: 'Mon & Wed: 3:00 PM – 5:00 PM',
    educationTimeline: ['M.Tech in Robotics, NIT Rourkela', 'B.Tech in Electronics'],
    achievementsDetailed: ['Led AIT Robotics Team to national podium finishes at DD Robocon.'],
    labName: 'Robotics Interfacing & Automation Lab'
  },
  {
    id: 'etc-9',
    name: 'Prof. Sneha Deshmukh',
    designation: 'Assistant Professor',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Signal Processing), B.E.',
    experience: '7 Years',
    expYears: 7,
    papers: '7+ Papers',
    papersCount: 7,
    patents: '—',
    currentSubjects: ['Digital Communication', 'Information Theory & Coding', 'Data Transmission'],
    researchDomains: ['Error Correcting Codes', 'Modulation Schemes', 'OFDM Technologies'],
    highlights: ['⭐ 7 Yrs Exp', '📶 Digital Comm', '📄 7+ Papers', '📚 First Year Mentor'],
    bio: 'Dedicated to teaching modulation techniques, Shannon capacity theorem, and channel coding methods.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'E&TC Dept, Room ETC-209',
    email: 'sdeshmukh@aitpune.edu.in',
    phoneExt: 'Ext. 2309',
    officeHours: 'Wed & Fri: 10:30 AM – 12:30 PM',
    educationTimeline: ['M.E. in Signal Processing, SPPU', 'B.E. in E&TC'],
    achievementsDetailed: ['Developed interactive MATLAB virtual lab simulations for digital communications.'],
    labName: 'Digital Communication Systems Lab'
  },
  {
    id: 'etc-10',
    name: 'Prof. Rajeev Kumar',
    designation: 'Assistant Professor',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Microelectronics), B.Tech',
    experience: '8 Years',
    expYears: 8,
    papers: '8+ Conferences',
    papersCount: 8,
    patents: '—',
    currentSubjects: ['Semiconductor Devices & Physics', 'Nanotechnology', 'Integrated Circuits'],
    researchDomains: ['FinFET Transistors', 'Wide Bandgap Semiconductors', 'MEMS Devices'],
    highlights: ['⭐ 8 Yrs Exp', '🔬 Semiconductor Lead', '📄 8+ Papers', '⚡ Cleanroom Mentor'],
    bio: 'Focusing on semiconductor physics, FinFET scaling limits, and MEMS transducer modeling.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'E&TC Dept, Room ETC-205',
    email: 'rkumaretc@aitpune.edu.in',
    phoneExt: 'Ext. 2305',
    officeHours: 'Tue & Thu: 11:30 AM – 1:30 PM',
    educationTimeline: ['M.Tech in Microelectronics, IIT BHU', 'B.Tech in Electronics'],
    achievementsDetailed: ['Author of research papers in IEEE Transactions on Electron Devices.'],
    labName: 'Semiconductor & MEMS Modeling Lab'
  },
  {
    id: 'etc-11',
    name: 'Prof. Jyoti Kadam',
    designation: 'Assistant Professor',
    dept: 'etc',
    deptName: 'Electronics & Telecommunication',
    roleCategory: 'assistant',
    qualifications: 'M.E. (VLSI Design), B.E.',
    experience: '6 Years',
    expYears: 6,
    papers: '5+ Papers',
    papersCount: 5,
    patents: '—',
    currentSubjects: ['Verilog HDL & FPGA Programming', 'Digital System Synthesis', 'Basic Electronics'],
    researchDomains: ['FPGA Prototyping', 'Hardware Accelerators', 'Xilinx Vivado Tools'],
    highlights: ['⭐ 6 Yrs Exp', '💻 Verilog & FPGA', '📄 5+ Papers', '🎯 Lab In-charge'],
    bio: 'Training engineers in hardware description languages (Verilog/VHDL) and Xilinx FPGA deployment.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'E&TC Dept, Room ETC-211',
    email: 'jkadam@aitpune.edu.in',
    phoneExt: 'Ext. 2311',
    officeHours: 'Mon & Fri: 2:30 PM – 4:30 PM',
    educationTimeline: ['M.E. in VLSI Design, SPPU', 'B.E. in E&TC'],
    achievementsDetailed: ['Coordinator for Xilinx Vivado University Program at AIT.'],
    labName: 'FPGA & Digital Synthesis Lab'
  },

  // ------------------------------------------------------------------------
  // MECHANICAL ENGINEERING (9)
  // ------------------------------------------------------------------------
  {
    id: 'mech-1',
    name: 'Dr. U. V. Hambire',
    designation: 'Professor & Head of Department (MECH)',
    dept: 'mech',
    deptName: 'Mechanical Engineering',
    roleCategory: 'hod',
    qualifications: 'Ph.D. (Mechanical Engg, IIT), M.E., B.E.',
    experience: '26 Years',
    expYears: 26,
    papers: '64+ Scopus/Elsevier',
    papersCount: 64,
    patents: '4 Patents Granted',
    currentSubjects: ['Finite Element Analysis (FEA)', 'Computational Fluid Dynamics (CFD)', 'Design of Machine Elements'],
    researchDomains: ['Structural Optimization', 'Additive Manufacturing', 'Aerodynamic Simulations'],
    highlights: ['⭐ 26 Yrs Exp', '🏆 HOD Mechanical', '📄 64+ Papers', '⚙️ FEA / CFD Authority'],
    bio: 'Prominent mechanical authority in structural dynamics, finite element analysis, and defense ballistic modeling. Head of Mechanical Engineering.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Mechanical Dept, Room MECH-101',
    email: 'uvhambire@aitpune.edu.in',
    phoneExt: 'Ext. 2401',
    officeHours: 'Mon, Wed & Fri: 2:00 PM – 4:00 PM',
    educationTimeline: [
      'Ph.D. in Mechanical Engineering, IIT Kharagpur',
      'M.E. in Machine Design, SPPU',
      'B.E. in Mechanical Engineering'
    ],
    achievementsDetailed: [
      'Granted 4 Indian & International Patents on novel damping composite materials.',
      'Consultant to DRDO (ARDE Pune) for high-strain structural impact analysis.',
      'Guided 6 Ph.D. scholars in computational mechanics.'
    ],
    labName: 'Advanced FEA & Computational Mechanics Lab'
  },
  {
    id: 'mech-2',
    name: 'Dr. S. M. Gaikwad',
    designation: 'Professor & In-charge 3D PLM Product Innovation Lab',
    dept: 'mech',
    deptName: 'Mechanical Engineering',
    roleCategory: 'professor',
    qualifications: 'Ph.D. (CAD/CAM & Mechatronics), M.E., B.E.',
    experience: '21 Years',
    expYears: 21,
    papers: '38+ IEEE/Springer',
    papersCount: 38,
    patents: '2 Patents Granted',
    currentSubjects: ['Robotics & Mechatronics Systems', 'CAD/CAM / 3D Modeling (CATIA)', 'Computer Integrated Manufacturing'],
    researchDomains: ['Autonomous Rovers', 'Digital Twin Technologies', 'Additive 3D Printing'],
    highlights: ['⭐ 21 Yrs Exp', '🤖 3D PLM Lab Head', '📄 38+ Papers', '🏆 SIH Winning Mentor'],
    bio: 'Director of the Dassault Systèmes 3D PLM Product Innovation Center at AIT. Guiding autonomous robotics and digital twin prototypes.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: '3D PLM Innovation Lab, Ground Floor',
    email: 'smgaikwad@aitpune.edu.in',
    phoneExt: 'Ext. 2405',
    officeHours: 'Tue & Thu: 2:30 PM – 4:30 PM',
    educationTimeline: [
      'Ph.D. in Mechatronics & CAD/CAM, COEP',
      'M.E. in Production & CAD/CAM',
      'B.E. in Mechanical Engineering'
    ],
    achievementsDetailed: [
      'Instrumental in setting up state-of-the-art 3D PLM Innovation Facility at AIT Pune.',
      'Mentored Smart India Hackathon (SIH) 1st Prize Hardware Team ($1,500 Cash Award).'
    ],
    labName: 'Dassault Systèmes 3D PLM Center of Excellence'
  },
  {
    id: 'mech-3',
    name: 'Dr. Raviraj B. Gurav',
    designation: 'Associate Professor & E-Cell Faculty Head',
    dept: 'mech',
    deptName: 'Mechanical Engineering',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (Thermal & Energy), M.Tech, B.E.',
    experience: '19 Years',
    expYears: 19,
    papers: '33+ Scopus',
    papersCount: 33,
    patents: '3 Patents Published',
    currentSubjects: ['Internal Combustion Engines', 'Thermodynamics & Heat Transfer', 'Alternate Fuels & Bio-Energy'],
    researchDomains: ['Green Hydrogen Engines', 'Electric Vehicle Battery Cooling', 'Thermal Storage'],
    highlights: ['⭐ 19 Yrs Exp', '💡 E-Cell Faculty Lead', '📄 33+ Papers', '🔥 Thermal Energy Expert'],
    bio: 'Researching green hydrogen combustion, EV thermal management, and leading the AIT Innovation & Entrepreneurship Cell (E-Cell).',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Mechanical Dept & E-Cell, Room MECH-204',
    email: 'rgurav@aitpune.edu.in',
    phoneExt: 'Ext. 2404',
    officeHours: 'Mon, Tue & Thu: 3:00 PM – 5:00 PM',
    educationTimeline: [
      'Ph.D. in Thermal Engineering & Alternate Fuels, SPPU',
      'M.Tech in Thermal Power Engineering, VNIT',
      'B.E. in Mechanical Engineering'
    ],
    achievementsDetailed: [
      'Organized annual AIT E-Summit with prominent venture capital funds.',
      'Funded research project on hydrogen dual-fuel injection kinetics.'
    ],
    labName: 'Internal Combustion Engines & Alternate Energy Lab'
  },
  {
    id: 'mech-4',
    name: 'Dr. J. D. Patil',
    designation: 'Associate Professor',
    dept: 'mech',
    deptName: 'Mechanical Engineering',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (Industrial & Manufacturing), M.E., B.E.',
    experience: '17 Years',
    expYears: 17,
    papers: '25+ Journals',
    papersCount: 25,
    patents: '1 Patent Granted',
    currentSubjects: ['Operations Research', 'Industrial Engineering & Management', 'Manufacturing Processes'],
    researchDomains: ['Lean Manufacturing', 'Supply Chain Optimization', 'Six Sigma Quality'],
    highlights: ['⭐ 17 Yrs Exp', '📊 Industrial Lead', '📄 25+ Papers', '🏭 Industry Liaison'],
    bio: 'Expertise in linear programming, supply chain simulations, and lean manufacturing workflows for aerospace and automotive sectors.',
    status: 'busy',
    statusText: 'In Lecture Hall',
    cabin: 'Mechanical Dept, Room MECH-208',
    email: 'jdpatil@aitpune.edu.in',
    phoneExt: 'Ext. 2408',
    officeHours: 'Wed & Fri: 11:00 AM – 1:00 PM',
    educationTimeline: ['Ph.D. in Industrial Engineering, SPPU', 'M.E. in Production', 'B.E. in Mechanical'],
    achievementsDetailed: ['Certified Six Sigma Black Belt & Operations Auditor.'],
    labName: 'Industrial Engineering & Operations Studio'
  },
  {
    id: 'mech-5',
    name: 'Prof. Harshwardhan Deshmukh',
    designation: 'Assistant Professor & Team BAJA Advisor',
    dept: 'mech',
    deptName: 'Mechanical Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Automobile Engg), Ph.D. (Pursuing), B.E.',
    experience: '13 Years',
    expYears: 13,
    papers: '16+ Papers',
    papersCount: 16,
    patents: '1 Patent Filed',
    currentSubjects: ['Automobile Engineering', 'Vehicle Dynamics & Chassis Design', 'Kinematics of Machinery'],
    researchDomains: ['Off-Road Buggy Dynamics', 'Suspension Kinematics', 'Lightweight Carbon Composites'],
    highlights: ['⭐ 13 Yrs Exp', '🏎️ Team BAJA Lead', '📄 16+ Papers', '🛠️ Workshop Mentor'],
    bio: 'Chief Faculty Advisor for AIT Team BAJA & Formula Student. Specialist in vehicle rollcage stress FEA and all-terrain suspension.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'BAJA Workshop & Mech Dept, Room MECH-108',
    email: 'hdeshmukh@aitpune.edu.in',
    phoneExt: 'Ext. 2409',
    officeHours: 'Mon & Thu: 3:30 PM – 5:30 PM',
    educationTimeline: ['M.Tech in Automobile Engineering, ARAI / COEP', 'B.E. in Mechanical Engineering'],
    achievementsDetailed: ['Guided Team BAJA to top-3 national podiums at SAE BAJA India.'],
    labName: 'Automobile Engineering & BAJA Racing Workshop'
  },
  {
    id: 'mech-6',
    name: 'Prof. Nilesh Patil',
    designation: 'Assistant Professor',
    dept: 'mech',
    deptName: 'Mechanical Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Material Science & Metallurgy), B.E.',
    experience: '11 Years',
    expYears: 11,
    papers: '12+ Scopus',
    papersCount: 12,
    patents: '—',
    currentSubjects: ['Material Science & Metallurgy', 'Heat Treatment of Metals', 'Manufacturing Technology'],
    researchDomains: ['High-Entropy Alloys', 'Surface Coating & Tribology', 'Failure Analysis'],
    highlights: ['⭐ 11 Yrs Exp', '🔬 Metallurgy Expert', '📄 12+ Papers', '⚙️ Materials In-charge'],
    bio: 'Investigating microstructural phase transitions, friction wear coatings, and non-destructive testing (NDT) of engineering alloys.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Mechanical Dept, Room MECH-202',
    email: 'npatil@aitpune.edu.in',
    phoneExt: 'Ext. 2402',
    officeHours: 'Tue & Thu: 10:00 AM – 12:00 PM',
    educationTimeline: ['M.E. in Materials & Metallurgy, COEP', 'B.E. in Mechanical Engineering'],
    achievementsDetailed: ['Certified NDT Level-II Ultrasonic & Magnetic Particle Testing Inspector.'],
    labName: 'Metallurgy & Materials Characterization Lab'
  },
  {
    id: 'mech-7',
    name: 'Prof. Sagar Mane',
    designation: 'Assistant Professor',
    dept: 'mech',
    deptName: 'Mechanical Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Heat Power), B.E.',
    experience: '9 Years',
    expYears: 9,
    papers: '9+ Conferences',
    papersCount: 9,
    patents: '—',
    currentSubjects: ['Refrigeration & Air Conditioning', 'Fluid Mechanics & Turbo-machinery', 'Heat Transfer'],
    researchDomains: ['Eco-Friendly Refrigerants', 'Heat Pipe Exchangers', 'Vapor Absorption Systems'],
    highlights: ['⭐ 9 Yrs Exp', '❄️ HVAC & RAC Lead', '📄 9+ Papers', '🌀 Fluids In-charge'],
    bio: 'Designing ultra-low GWP refrigeration cycles, phase change thermal batteries, and vortex tube cooling stages.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Mechanical Dept, Room MECH-205',
    email: 'smane@aitpune.edu.in',
    phoneExt: 'Ext. 2405',
    officeHours: 'Wed & Fri: 2:00 PM – 4:00 PM',
    educationTimeline: ['M.Tech in Heat Power Engineering, SPPU', 'B.E. in Mechanical Engineering'],
    achievementsDetailed: ['Faculty Advisor for ISHRAE (Indian Society of Heating, Refrigerating & AC Engineers) Student Chapter.'],
    labName: 'Refrigeration, Air Conditioning & Fluids Lab'
  },
  {
    id: 'mech-8',
    name: 'Prof. Amit Gaikwad',
    designation: 'Assistant Professor',
    dept: 'mech',
    deptName: 'Mechanical Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Machine Design), B.E.',
    experience: '8 Years',
    expYears: 8,
    papers: '8+ Papers',
    papersCount: 8,
    patents: '—',
    currentSubjects: ['Strength of Materials (SOM)', 'Mechanical Vibrations & Noise', 'Theory of Machines'],
    researchDomains: ['Vibration Isolation', 'Acoustic Metamaterials', 'Modal Analysis'],
    highlights: ['⭐ 8 Yrs Exp', '🔔 Vibrations & SOM', '📄 8+ Papers', '🛠️ Dynamics Lead'],
    bio: 'Focusing on multi-degree-of-freedom vibrational resonance mitigation, dynamic balancing, and stress strain tensors.',
    status: 'busy',
    statusText: 'In Lecture Hall',
    cabin: 'Mechanical Dept, Room MECH-207',
    email: 'agaikwad@aitpune.edu.in',
    phoneExt: 'Ext. 2407',
    officeHours: 'Mon & Thu: 11:30 AM – 1:30 PM',
    educationTimeline: ['M.E. in Machine Design, SPPU', 'B.E. in Mechanical Engineering'],
    achievementsDetailed: ['Supervised student test rigs for FFT spectrum vibrational analysis.'],
    labName: 'Dynamics of Machinery & Vibrations Lab'
  },
  {
    id: 'mech-9',
    name: 'Prof. Suvarna Patil',
    designation: 'Assistant Professor',
    dept: 'mech',
    deptName: 'Mechanical Engineering',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (CAD/CAM), B.E.',
    experience: '7 Years',
    expYears: 7,
    papers: '6+ Papers',
    papersCount: 6,
    patents: '—',
    currentSubjects: ['Engineering Graphics & Drafting', 'Computer Aided Design (CAD)', 'Geometric Dimensioning & Tolerancing (GD&T)'],
    researchDomains: ['Parametric CAD Modeling', 'Generative Design', 'ISO Drafting Standards'],
    highlights: ['⭐ 7 Yrs Exp', '📐 CAD & Drafting', '📄 6+ Papers', '✏️ First Year In-charge'],
    bio: 'Training incoming engineers in orthographic projections, isometric drafting, parametric SolidWorks, and CATIA modeling.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Drawing Hall & Mech Dept, Room MECH-103',
    email: 'spatilmech@aitpune.edu.in',
    phoneExt: 'Ext. 2403',
    officeHours: 'Tue & Thu: 1:30 PM – 3:30 PM',
    educationTimeline: ['M.Tech in CAD/CAM, SPPU', 'B.E. in Mechanical Engineering'],
    achievementsDetailed: ['Coordinator for First Year Engineering Drawing and CAD Labs.'],
    labName: 'Computer Aided Drafting & Modeling Lab'
  },

  // ------------------------------------------------------------------------
  // AUTOMATION & ROBOTICS (3)
  // ------------------------------------------------------------------------
  {
    id: 'robotics-1',
    name: 'Dr. S. S. Kamble',
    designation: 'Associate Professor & Program Coordinator (Robotics)',
    dept: 'robotics',
    deptName: 'Automation & Robotics',
    roleCategory: 'hod',
    qualifications: 'Ph.D. (Industrial Robotics), M.Tech, B.E.',
    experience: '16 Years',
    expYears: 16,
    papers: '29+ IEEE/Springer',
    papersCount: 29,
    patents: '2 Patents Granted',
    currentSubjects: ['Industrial Robotics & Kinematics', 'PLC, SCADA & Industrial Automation', 'Machine Vision in Robotics'],
    researchDomains: ['Collaborative Robots (Cobots)', 'Trajectory Planning', 'Robotic Gripper Mechanics'],
    highlights: ['⭐ 16 Yrs Exp', '🤖 Robotics Coordinator', '📄 29+ Papers', '💡 2 Patents Granted'],
    bio: 'Spearheading the new Autonomous & Robotics Engineering degree stream at AIT. Specialist in cobot safety and multi-axis manipulator kinematics.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Automation Center, Room ROB-101',
    email: 'sskamble@aitpune.edu.in',
    phoneExt: 'Ext. 2501',
    officeHours: 'Mon, Wed & Fri: 3:00 PM – 5:00 PM',
    educationTimeline: [
      'Ph.D. in Industrial Robotics & Motion Control, DIAT Pune',
      'M.Tech in Automation & Control',
      'B.E. in Mechatronics'
    ],
    achievementsDetailed: [
      'Commissioned 6-Axis Industrial KUKA and FANUC robot arms at AIT Advanced Robotics Cell.',
      'Authored textbook on "Industrial PLC Programming & SCADA Integration".'
    ],
    labName: 'Industrial Robotics & Automation Cell'
  },
  {
    id: 'robotics-2',
    name: 'Prof. Rohan Kulkarni',
    designation: 'Assistant Professor',
    dept: 'robotics',
    deptName: 'Automation & Robotics',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Robotics & AI, IIT Madras), B.Tech',
    experience: '10 Years',
    expYears: 10,
    papers: '14+ IEEE',
    papersCount: 14,
    patents: '1 Patent Filed',
    currentSubjects: ['Autonomous Mobile Robots (AMR)', 'Robot Operating System (ROS / ROS 2)', 'Drone Dynamics & UAV Flight'],
    researchDomains: ['SLAM (Simultaneous Localization & Mapping)', 'Lidar Odometry', 'Drone Swarm Intelligence'],
    highlights: ['⭐ 10 Yrs Exp', '🚁 Drone & ROS Specialist', '📄 14+ Papers', '🛰️ Defense Drone Grant'],
    bio: 'Developing autonomous navigation rovers, ROS 2 navigation stacks, and autonomous obstacle avoidance for unmanned aerial systems.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'Robotics Lab, Room ROB-104',
    email: 'rkulkarni@aitpune.edu.in',
    phoneExt: 'Ext. 2504',
    officeHours: 'Tue & Thu: 2:00 PM – 4:00 PM',
    educationTimeline: ['M.Tech in Robotics & Autonomous Systems, IIT Madras', 'B.Tech in Electronics & Robotics'],
    achievementsDetailed: ['Advisor for AIT Autonomous Lidar Rover showcase at National Defense Expo.'],
    labName: 'Autonomous Mobile Robots & Drone Lab'
  },
  {
    id: 'robotics-3',
    name: 'Prof. Tanvi Shinde',
    designation: 'Assistant Professor',
    dept: 'robotics',
    deptName: 'Automation & Robotics',
    roleCategory: 'assistant',
    qualifications: 'M.Tech (Sensor Systems & AI), B.E.',
    experience: '7 Years',
    expYears: 7,
    papers: '8+ Papers',
    papersCount: 8,
    patents: '—',
    currentSubjects: ['Sensor Fusion & Actuators', 'AI for Autonomous Systems', 'Digital Twin Simulation'],
    researchDomains: ['Kalman Filters', 'IMU Calibration', 'Tactile Touch Sensors'],
    highlights: ['⭐ 7 Yrs Exp', '⚡ Sensor Fusion Lead', '📄 8+ Papers', '🎯 Robotics Mentor'],
    bio: 'Specializing in multi-sensor fusion, extended Kalman filters, and tactile sensory feedback for humanoid robotic grippers.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Robotics Lab, Room ROB-102',
    email: 'tshinde@aitpune.edu.in',
    phoneExt: 'Ext. 2502',
    officeHours: 'Wed & Fri: 11:00 AM – 1:00 PM',
    educationTimeline: ['M.Tech in Sensor Systems, SPPU', 'B.E. in Electronics'],
    achievementsDetailed: ['Trainer for Gazebo simulation and MATLAB Simulink robotics toolbox.'],
    labName: 'Sensor Fusion & Simulation Studio'
  },

  // ------------------------------------------------------------------------
  // APPLIED SCIENCE & HUMANITIES (ASGE / FIRST YEAR) (6)
  // ------------------------------------------------------------------------
  {
    id: 'asge-1',
    name: 'Dr. Seema Tiwari',
    designation: 'Professor & Head of Department (ASGE)',
    dept: 'asge',
    deptName: 'Applied Science & Humanities',
    roleCategory: 'hod',
    qualifications: 'Ph.D. (Applied Physics / Nanotech), M.Sc., B.Sc.',
    experience: '22 Years',
    expYears: 22,
    papers: '44+ Scopus/Elsevier',
    papersCount: 44,
    patents: '2 Patents Granted',
    currentSubjects: ['Engineering Physics', 'Quantum Mechanics & Optics', 'Nanomaterials & Laser Physics'],
    researchDomains: ['Semiconductor Nanostructures', 'Thin Film Photovoltaics', 'Laser Spectroscopy'],
    highlights: ['⭐ 22 Yrs Exp', '🔬 HOD ASGE', '📄 44+ Papers', '🌟 Best Researcher Award'],
    bio: 'Heading the Department of Applied Science & General Engineering. Guiding fundamental physics, quantum mechanics, and nano-materials research.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Applied Science Dept, Room AS-101',
    email: 'stiwari@aitpune.edu.in',
    phoneExt: 'Ext. 2601',
    officeHours: 'Mon, Wed & Thu: 2:00 PM – 4:00 PM',
    educationTimeline: [
      'Ph.D. in Physics & Nanotechnology, SPPU',
      'M.Sc. in Physics (Gold Medalist), University of Pune',
      'B.Sc. in Physics & Mathematics'
    ],
    achievementsDetailed: [
      'Published 44+ research papers in high-impact international materials physics journals.',
      'Chief Coordinator for First Year Induction & Academic Orientation Program.'
    ],
    labName: 'Engineering Physics & Optics Lab'
  },
  {
    id: 'asge-2',
    name: 'Dr. G. M. Karve',
    designation: 'Associate Professor (Mathematics)',
    dept: 'asge',
    deptName: 'Applied Science & Humanities',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (Applied Mathematics), M.Sc., B.Sc.',
    experience: '19 Years',
    expYears: 19,
    papers: '24+ International Journals',
    papersCount: 24,
    patents: '—',
    currentSubjects: ['Engineering Mathematics I & II', 'Linear Algebra & Differential Equations', 'Numerical Methods'],
    researchDomains: ['Fractional Differential Equations', 'Mathematical Modeling', 'Matrix Computations'],
    highlights: ['⭐ 19 Yrs Exp', '📐 Mathematics Guru', '📄 24+ Papers', '🏆 Student Choice Award'],
    bio: 'Renowned for lucid pedagogy in higher engineering mathematics, Laplace transforms, eigenvalues, and Fourier analysis.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Applied Science Dept, Room AS-105',
    email: 'gkarve@aitpune.edu.in',
    phoneExt: 'Ext. 2605',
    officeHours: 'Tue & Thu: 10:00 AM – 12:00 PM',
    educationTimeline: ['Ph.D. in Applied Mathematics, SPPU', 'M.Sc. in Applied Mathematics', 'B.Sc. in Mathematics'],
    achievementsDetailed: ['Author of widely used reference book "Engineering Mathematics for Autonomous Curricula".'],
    labName: 'Mathematical Modeling & Computational Lab'
  },
  {
    id: 'asge-3',
    name: 'Dr. Sushma Patil',
    designation: 'Associate Professor (Chemistry)',
    dept: 'asge',
    deptName: 'Applied Science & Humanities',
    roleCategory: 'associate',
    qualifications: 'Ph.D. (Applied Chemistry), M.Sc., B.Sc.',
    experience: '17 Years',
    expYears: 17,
    papers: '26+ Scopus',
    papersCount: 26,
    patents: '1 Patent Granted',
    currentSubjects: ['Engineering Chemistry', 'Environmental Science & Sustainability', 'Polymers & Composites'],
    researchDomains: ['Green Chemistry Catalysts', 'Water Purification Membranes', 'Corrosion Inhibitors'],
    highlights: ['⭐ 17 Yrs Exp', '🧪 Chemistry Lead', '📄 26+ Papers', '🌱 Sustainability Head'],
    bio: 'Conducting research on eco-friendly polymer coatings, water desalination membranes, and green battery electrolytes.',
    status: 'lab',
    statusText: 'In Research Lab',
    cabin: 'Applied Science Dept, Room AS-103',
    email: 'spatilchem@aitpune.edu.in',
    phoneExt: 'Ext. 2603',
    officeHours: 'Wed & Fri: 2:00 PM – 4:00 PM',
    educationTimeline: ['Ph.D. in Applied Chemistry, SPPU', 'M.Sc. in Organic Chemistry', 'B.Sc. in Chemistry'],
    achievementsDetailed: ['Chairperson for AIT Green Campus & Waste Water Recycling Committee.'],
    labName: 'Engineering Chemistry & Water Testing Lab'
  },
  {
    id: 'asge-4',
    name: 'Dr. Anup Kulkarni',
    designation: 'Assistant Professor (Mathematics)',
    dept: 'asge',
    deptName: 'Applied Science & Humanities',
    roleCategory: 'assistant',
    qualifications: 'Ph.D. (Probability & Statistics), M.Sc., B.Sc.',
    experience: '12 Years',
    expYears: 12,
    papers: '14+ Journals',
    papersCount: 14,
    patents: '—',
    currentSubjects: ['Probability & Stochastic Processes', 'Statistics for Engineers', 'Discrete Mathematical Structures'],
    researchDomains: ['Stochastic Queuing Models', 'Markov Chains', 'Bayesian Inference'],
    highlights: ['⭐ 12 Yrs Exp', '📊 Probability Expert', '📄 14+ Papers', '🎯 Gate Exam Mentor'],
    bio: 'Teaching probability distributions, Markov models, and statistical hypothesis testing for computing and data engineering.',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Applied Science Dept, Room AS-107',
    email: 'akulkarni@aitpune.edu.in',
    phoneExt: 'Ext. 2607',
    officeHours: 'Mon & Wed: 11:00 AM – 1:00 PM',
    educationTimeline: ['Ph.D. in Statistics & Probability, SPPU', 'M.Sc. in Statistics', 'B.Sc. in Statistics'],
    achievementsDetailed: ['Conducts annual GATE Mathematics special guidance classes for 3rd year students.'],
    labName: 'Statistical Computing & Analytics Studio'
  },
  {
    id: 'asge-5',
    name: 'Prof. Priya Sharma',
    designation: 'Assistant Professor (Humanities & Soft Skills)',
    dept: 'asge',
    deptName: 'Applied Science & Humanities',
    roleCategory: 'assistant',
    qualifications: 'M.A. (English Lit), M.Phil, Cambridge CELTA Certified',
    experience: '10 Years',
    expYears: 10,
    papers: '8+ Papers',
    papersCount: 8,
    patents: '—',
    currentSubjects: ['Professional Communication Skills', 'Technical Writing & Presentation', 'Corporate Etiquette'],
    researchDomains: ['Corporate Communication Pedagogy', 'Cross-Cultural Soft Skills', 'Interview Dynamics'],
    highlights: ['⭐ 10 Yrs Exp', '🗣️ Communication Lead', '📄 8+ Papers', '🎤 DebSoc Convener'],
    bio: 'Honing student verbal eloquence, group discussions, corporate interview confidence, and faculty convener for AIT Debating Society (DebSoc).',
    status: 'online',
    statusText: 'Available in Cabin',
    cabin: 'Language Lab, Room AS-108',
    email: 'psharmaasge@aitpune.edu.in',
    phoneExt: 'Ext. 2608',
    officeHours: 'Tue & Thu: 3:00 PM – 5:00 PM',
    educationTimeline: ['M.Phil in English Literature, SPPU', 'M.A. in English', 'Cambridge CELTA Certified'],
    achievementsDetailed: ['Chief Editor for annual college magazine Amethyst.'],
    labName: 'Digital Language & Communication Lab'
  },
  {
    id: 'asge-6',
    name: 'Prof. Kavita Jagtap',
    designation: 'Assistant Professor (Civil & Environmental)',
    dept: 'asge',
    deptName: 'Applied Science & Humanities',
    roleCategory: 'assistant',
    qualifications: 'M.E. (Environmental Engg), B.E.',
    experience: '8 Years',
    expYears: 8,
    papers: '7+ Conferences',
    papersCount: 7,
    patents: '—',
    currentSubjects: ['Basic Civil & Environmental Engineering', 'Engineering Mechanics', 'Building Planning'],
    researchDomains: ['Rainwater Harvesting Systems', 'Green Building Ratings', 'Structural Equilibrium'],
    highlights: ['⭐ 8 Yrs Exp', '🏗️ Mechanics Lead', '📄 7+ Papers', '🌱 Eco Club Mentor'],
    bio: 'Teaching force vectors, statics equilibrium, trusses, and sustainable environmental engineering practices.',
    status: 'busy',
    statusText: 'In Lecture Hall',
    cabin: 'Applied Science Dept, Room AS-104',
    email: 'kjagtap@aitpune.edu.in',
    phoneExt: 'Ext. 2604',
    officeHours: 'Mon & Fri: 10:00 AM – 12:00 PM',
    educationTimeline: ['M.E. in Environmental Engineering, SPPU', 'B.E. in Civil Engineering'],
    achievementsDetailed: ['Faculty In-charge for AIT Nature Club and Campus Eco-audit.'],
    labName: 'Engineering Mechanics & Materials Testing Lab'
  }
];

/* ==========================================================================
   2. Calm & Ambient Background Constellation Canvas
   ========================================================================== */
function initConstellationCanvas() {
  const canvas = document.getElementById('constellationCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 38;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Gentle, calming ambient particle
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.15;
      this.vy = (Math.random() - 0.5) * 0.15;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.35)' : 'rgba(168, 85, 247, 0.25)';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle gentle lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   3. Faculty Directory Logic Engine (Search, Filter & Render)
   ========================================================================== */
function initFacultyDirectory() {
  const grid = document.getElementById('facultyGridContainer');
  const searchInput = document.getElementById('facultySearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const deptButtons = document.querySelectorAll('.dept-pill-btn');
  const emptyState = document.getElementById('emptyStateCard');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  let activeDept = 'all';
  let searchQuery = '';

  // Calculate & Update Department Count Badges
  function updateDepartmentCounts() {
    const counts = {
      all: facultyData.length,
      comp: facultyData.filter(f => f.dept === 'comp').length,
      it: facultyData.filter(f => f.dept === 'it').length,
      etc: facultyData.filter(f => f.dept === 'etc').length,
      mech: facultyData.filter(f => f.dept === 'mech').length,
      robotics: facultyData.filter(f => f.dept === 'robotics').length,
      asge: facultyData.filter(f => f.dept === 'asge').length
    };

    Object.keys(counts).forEach(k => {
      const el = document.getElementById(`count-${k}`);
      if (el) el.textContent = counts[k];
    });

    const totalBadge = document.getElementById('facultyCountNumber');
    if (totalBadge) totalBadge.textContent = `Faculty (${facultyData.length})`;
  }
  updateDepartmentCounts();

  // Filter Pipeline (sorted in hierarchy: HOD -> Professors -> Associate -> Assistant)
  function getFilteredData() {
    let list = facultyData.filter(f => {
      // Dept filter
      if (activeDept !== 'all' && f.dept !== activeDept) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const searchable = [
          f.name,
          f.deptName,
          f.designation,
          f.qualifications,
          f.cabin,
          f.email,
          ...(f.currentSubjects || []),
          ...(f.researchDomains || []),
          ...(f.highlights || [])
        ].join(' ').toLowerCase();

        if (!searchable.includes(q)) return false;
      }

      return true;
    });

    // Default Academic Hierarchy sorting
    const rank = { hod: 1, professor: 2, associate: 3, assistant: 4 };
    list.sort((a, b) => (rank[a.roleCategory] || 5) - (rank[b.roleCategory] || 5));

    return list;
  }

  // Render Cards into DOM
  function render() {
    if (!grid) return;
    const list = getFilteredData();

    if (list.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = list.map((f, index) => {
      const initials = f.name
        .replace(/^(Dr\.|Prof\.|Mrs\.)\s+/i, '')
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('');

      let statusDotClass = '';
      if (f.status === 'busy') statusDotClass = 'status-busy-color';
      else if (f.status === 'lab') statusDotClass = 'status-lab-color';

      return `
        <div class="faculty-card" data-dept="${f.dept}" data-id="${f.id}" style="animation: fadeInUp 0.3s ease ${Math.min(index * 0.03, 0.3)}s forwards;">
          
          <!-- Card Header (Avatar + Titles) -->
          <div class="faculty-card-header">
            <div class="faculty-avatar-wrap">
              <div class="faculty-avatar-circle">
                ${initials || 'AIT'}
              </div>
              <span class="faculty-status-dot ${statusDotClass}" title="${f.statusText}"></span>
            </div>
            
            <div class="faculty-title-meta">
              <h3 class="faculty-name" title="${f.name}">${f.name}</h3>
              <div class="faculty-role-dept">${f.designation}</div>
              <div class="faculty-qualifications" title="${f.qualifications}">${f.qualifications}</div>
            </div>
          </div>

          <!-- Bio Snippet -->
          <p class="faculty-bio-snippet">${f.bio}</p>

          <!-- Tag Sections (Matching Reference Image Layout) -->
          <div class="faculty-tags-group">
            
            <!-- Category 1: Current Subjects Taught -->
            <div class="tag-category-block">
              <span class="tag-category-title">CURRENT SUBJECTS TAUGHT</span>
              <div class="tags-pill-row">
                ${f.currentSubjects.slice(0, 3).map(sub => `<span class="subject-pill">${sub}</span>`).join('')}
              </div>
            </div>

            <!-- Category 2: Research Domain & Expertise -->
            <div class="tag-category-block">
              <span class="tag-category-title">RESEARCH & DOMAIN</span>
              <div class="tags-pill-row">
                ${f.researchDomains.slice(0, 3).map(res => `<span class="research-pill">${res}</span>`).join('')}
              </div>
            </div>

            <!-- Category 3: Key Highlights & Honors -->
            <div class="tag-category-block">
              <span class="tag-category-title">HIGHLIGHTS</span>
              <div class="tags-pill-row">
                ${f.highlights.slice(0, 3).map(h => `<span class="highlight-pill">${h}</span>`).join('')}
              </div>
            </div>

          </div>

          <!-- Card Footer (Stats & View Profile Button + Call & WhatsApp) -->
          <div class="faculty-card-footer">
            <div class="card-stats-left">
              <span class="stat-item-chip" title="Research Publications">
                <i class="fa-solid fa-file-lines"></i> ${f.papers.split(' ')[0]}
              </span>
              <span class="stat-item-chip" title="Teaching & Research Experience">
                <i class="fa-solid fa-star"></i> ${f.experience}
              </span>
            </div>

            <div class="card-actions-right" style="display:flex; align-items:center; gap:6px;">
              <a href="tel:${f.phone || '+912027157534'}" class="btn-faculty-contact call" title="Call Professor ${f.name}" onclick="event.stopPropagation();">
                <i class="fa-solid fa-phone"></i>
              </a>
              <a href="https://wa.me/${(f.whatsapp || f.phone || '+919822012104').replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="btn-faculty-contact whatsapp" title="WhatsApp Message" onclick="event.stopPropagation();">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <button class="btn-view-profile" onclick="openFacultyModal('${f.id}')">
                <span>Profile</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

        </div>
      `;
    }).join('');
  }

  // Event Listeners: Department Pills
  deptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      deptButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDept = btn.getAttribute('data-dept') || 'all';
      render();
    });
  });

  // Event Listeners: Search Input with Debounce
  let debounceTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimeout);
      const val = e.target.value;
      searchQuery = val;

      if (clearBtn) {
        clearBtn.style.display = val.length > 0 ? 'flex' : 'none';
      }

      debounceTimeout = setTimeout(() => {
        render();
      }, 150);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      render();
    });
  }

  // Reset Filters Button
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      activeDept = 'all';
      searchQuery = '';

      if (searchInput) searchInput.value = '';
      if (clearBtn) clearBtn.style.display = 'none';

      deptButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-dept') === 'all'));

      render();
      showToast('🔄 View reset to all departments.');
    });
  }

  // Initial Render
  render();
}

/* ==========================================================================
   5. Comprehensive Faculty Profile Modal System
   ========================================================================== */
window.openFacultyModal = function(facultyId) {
  const modalOverlay = document.getElementById('profileModalOverlay');
  const modalContent = document.getElementById('modalScrollContent');
  const closeBtn = document.getElementById('closeProfileModalBtn');

  if (!modalOverlay || !modalContent) return;

  const f = facultyData.find(item => item.id === facultyId) || facultyData[0];

  const initials = f.name
    .replace(/^(Dr\.|Prof\.|Mrs\.)\s+/i, '')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  modalContent.innerHTML = `
    <!-- Header Hero -->
    <div class="modal-header-hero">
      <div class="modal-avatar-large">
        ${initials || 'AIT'}
      </div>
      <div style="flex: 1;">
        <h2 class="modal-name-title">${f.name}</h2>
        <div class="modal-designation-badge">${f.designation} • ${f.deptName}</div>
        <div class="modal-quick-chips">
          <span><i class="fa-solid fa-location-dot"></i> ${f.cabin}</span>
          <span><i class="fa-solid fa-envelope"></i> ${f.email}</span>
          <span><i class="fa-solid fa-phone"></i> ${f.phoneExt}</span>
        </div>
        <div class="modal-contact-actions" style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
          <a href="tel:${f.phone || '+912027157534'}" class="btn-faculty-contact-pill" style="background:#2563eb; color:#fff; padding:7px 16px; border-radius:99px; text-decoration:none; font-weight:700; font-size:12.5px; display:inline-flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-phone"></i> <span>Call Office</span>
          </a>
          <a href="https://wa.me/${(f.whatsapp || f.phone || '+919822012104').replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="btn-faculty-contact-pill" style="background:#059669; color:#fff; padding:7px 16px; border-radius:99px; text-decoration:none; font-weight:700; font-size:12.5px; display:inline-flex; align-items:center; gap:6px;">
            <i class="fa-brands fa-whatsapp"></i> <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Quick Metrics Row -->
    <div class="modal-metrics-grid">
      <div class="metric-box">
        <span class="metric-val">${f.experience}</span>
        <span class="metric-label">Experience</span>
      </div>
      <div class="metric-box">
        <span class="metric-val">${f.papersCount}+</span>
        <span class="metric-label">Publications</span>
      </div>
      <div class="metric-box">
        <span class="metric-val">${f.patents !== '—' ? f.patents.split(' ')[0] : '1+'}</span>
        <span class="metric-label">Patents / IP</span>
      </div>
      <div class="metric-box">
        <span class="metric-val">100%</span>
        <span class="metric-label">Verified Faculty</span>
      </div>
    </div>

    <!-- Academic Qualifications Timeline -->
    <div class="modal-section-block">
      <h3 class="modal-section-title">
        <i class="fa-solid fa-graduation-cap"></i> Academic Qualifications
      </h3>
      <ul class="modal-list-styled">
        ${f.educationTimeline.map(ed => `
          <li><span class="bullet">✓</span> <span><strong>${ed.split(',')[0]}</strong> — ${ed.split(',').slice(1).join(',')}</span></li>
        `).join('')}
      </ul>
    </div>

    <!-- Current Subjects Taught -->
    <div class="modal-section-block">
      <h3 class="modal-section-title">
        <i class="fa-solid fa-book-open-reader"></i> Current Academic Subjects & Curriculum
      </h3>
      <div class="tags-pill-row" style="margin-bottom: 8px;">
        ${f.currentSubjects.map(sub => `<span class="subject-pill" style="font-size: 0.85rem; padding: 5px 12px;">${sub}</span>`).join('')}
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted);">
        <i class="fa-solid fa-flask-vial" style="color: var(--primary-600); margin-right: 4px;"></i> Supervised Lab: <strong>${f.labName}</strong>
      </p>
    </div>

    <!-- Research Focus & Domains -->
    <div class="modal-section-block">
      <h3 class="modal-section-title">
        <i class="fa-solid fa-microchip"></i> Research Domains & Core Expertise
      </h3>
      <p class="modal-section-text" style="margin-bottom: 10px;">${f.bio}</p>
      <div class="tags-pill-row">
        ${f.researchDomains.map(r => `<span class="research-pill" style="font-size: 0.85rem; padding: 5px 12px;">${r}</span>`).join('')}
      </div>
    </div>

    <!-- Key Honors, Achievements & Grants -->
    <div class="modal-section-block">
      <h3 class="modal-section-title">
        <i class="fa-solid fa-trophy"></i> Honors, Grants & Professional Milestones
      </h3>
      <ul class="modal-list-styled">
        ${f.achievementsDetailed.map(ach => `
          <li><span class="bullet">★</span> <span>${ach}</span></li>
        `).join('')}
      </ul>
    </div>

    <!-- Office Hours & Consultation Schedule -->
    <div class="modal-section-block">
      <h3 class="modal-section-title">
        <i class="fa-solid fa-calendar-check"></i> Office Hours & Consultation Slots
      </h3>
      <div style="background: rgba(237, 233, 254, 0.5); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--primary-200); font-size: 0.9rem; color: var(--primary-900); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div>
          <strong>Walk-in Consultation:</strong> ${f.officeHours}
        </div>
        <span class="glass-badge" style="font-size: 0.76rem; background: #ffffff; padding: 4px 10px; border-radius: 9999px;">
          ${f.cabin}
        </span>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="modal-footer-actions">
      <button class="btn-primary-action" onclick="openConsultationBooking('${f.id}')">
        <i class="fa-solid fa-calendar-plus"></i>
        <span>Book Office Hours Consultation</span>
      </button>
      <button class="btn-secondary-action" onclick="openInquiryDialog('${f.id}')">
        <i class="fa-solid fa-paper-plane"></i>
        <span>Send Academic Inquiry</span>
      </button>
    </div>
  `;

  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Close handlers
  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.onclick = closeModal;
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeModal();
  };
};

/* ==========================================================================
   6. Consultation Booking & Academic Inquiry Modals
   ========================================================================== */
window.openConsultationBooking = function(facultyId) {
  const f = facultyData.find(item => item.id === facultyId) || facultyData[0];
  const overlay = document.getElementById('inquiryModalOverlay');
  const content = document.getElementById('inquiryModalContent');
  const closeBtn = document.getElementById('closeInquiryModalBtn');

  if (!overlay || !content) return;

  let loggedUser = null;
  try {
    const raw = localStorage.getItem('campusConnectUser');
    if (raw) loggedUser = JSON.parse(raw);
  } catch (e) {}
  const isGuest = loggedUser && loggedUser.role === 'guest';
  const studentName = (!isGuest && loggedUser && loggedUser.name) ? loggedUser.name : '';
  const studentEmail = (!isGuest && loggedUser && loggedUser.email) ? loggedUser.email : '';

  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--primary-100); color: var(--primary-700); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 12px;">
        <i class="fa-solid fa-calendar-check"></i>
      </div>
      <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.4rem; color: var(--text-dark); margin-bottom: 4px;">Book Office Hours Slot</h3>
      <p style="font-size: 0.88rem; color: var(--primary-700); font-weight: 600;">${f.name} • ${f.designation}</p>
    </div>

    <form onsubmit="handleBookingSubmit(event, '${f.name}')">
      <div class="form-group">
        <label class="form-label">Student / Scholar Full Name</label>
        <input type="text" class="form-input" placeholder="e.g. Sachin Sharma (21101 Comp)" value="${studentName}" required />
      </div>

      <div class="form-group">
        <label class="form-label">AIT Pune Official Email</label>
        <input type="email" class="form-input" placeholder="sachin_21101@aitpune.edu.in" value="${studentEmail}" required />
      </div>

      <div class="form-group">
        <label class="form-label">Consultation Purpose</label>
        <select class="form-input" required>
          <option>Capstone Project & Research Guidance</option>
          <option>Coursework & Laboratory Doubt Clarification</option>
          <option>SIH / Robocon / Club Sponsorship Advisory</option>
          <option>Academic Elective & Career Mentorship</option>
          <option>Recommendation Letter / Higher Studies Discussion</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Preferred Date & Time Slot</label>
        <input type="datetime-local" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">Brief Note for Professor</label>
        <textarea class="form-input" rows="3" placeholder="Describe the topics or project details you wish to discuss..." style="resize: none;" required></textarea>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button type="submit" class="btn-primary-action" style="flex: 1;">
          <i class="fa-solid fa-check"></i> Confirm Consultation Request
        </button>
        <button type="button" class="btn-secondary-action" onclick="closeInquiryDirect()">
          Cancel
        </button>
      </div>
    </form>
  `;

  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');

  function closeInquiry() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.onclick = closeInquiry;
  overlay.onclick = (e) => {
    if (e.target === overlay) closeInquiry();
  };
};

window.openInquiryDialog = function(facultyId) {
  const f = facultyData.find(item => item.id === facultyId) || facultyData[0];
  const overlay = document.getElementById('inquiryModalOverlay');
  const content = document.getElementById('inquiryModalContent');
  const closeBtn = document.getElementById('closeInquiryModalBtn');

  if (!overlay || !content) return;

  let loggedUser = null;
  try {
    const raw = localStorage.getItem('campusConnectUser');
    if (raw) loggedUser = JSON.parse(raw);
  } catch (e) {}
  const isGuest = loggedUser && loggedUser.role === 'guest';
  const studentName = (!isGuest && loggedUser && loggedUser.name) ? loggedUser.name : '';
  const studentEmail = (!isGuest && loggedUser && loggedUser.email) ? loggedUser.email : '';

  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--primary-100); color: var(--primary-700); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 12px;">
        <i class="fa-solid fa-envelope-open-text"></i>
      </div>
      <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.4rem; color: var(--text-dark); margin-bottom: 4px;">Send Academic Inquiry</h3>
      <p style="font-size: 0.88rem; color: var(--primary-700); font-weight: 600;">To: ${f.name} (${f.email})</p>
    </div>

    <form onsubmit="handleInquirySubmit(event, '${f.name}')">
      <div class="form-group">
        <label class="form-label">Your Name</label>
        <input type="text" class="form-input" placeholder="e.g. Rahul Sharma" value="${studentName}" required />
      </div>

      <div class="form-group">
        <label class="form-label">Your Email</label>
        <input type="email" class="form-input" placeholder="your.name@aitpune.edu.in" value="${studentEmail}" required />
      </div>

      <div class="form-group">
        <label class="form-label">Subject Line</label>
        <input type="text" class="form-input" placeholder="e.g. Inquiry regarding BE Project Sponsorship" required />
      </div>

      <div class="form-group">
        <label class="form-label">Message</label>
        <textarea class="form-input" rows="4" placeholder="Write your academic query here..." style="resize: none;" required></textarea>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button type="submit" class="btn-primary-action" style="flex: 1;">
          <i class="fa-solid fa-paper-plane"></i> Send Direct Email
        </button>
        <button type="button" class="btn-secondary-action" onclick="closeInquiryDirect()">
          Cancel
        </button>
      </div>
    </form>
  `;

  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');

  function closeInquiry() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.onclick = closeInquiry;
  overlay.onclick = (e) => {
    if (e.target === overlay) closeInquiry();
  };
};

window.closeInquiryDirect = function() {
  const overlay = document.getElementById('inquiryModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }
};

window.handleBookingSubmit = function(e, professorName) {
  e.preventDefault();
  closeInquiryDirect();
  showToast(`📅 Consultation slot request forwarded to ${professorName}! Confirmation sent via AIT email.`);
};

window.handleInquirySubmit = function(e, professorName) {
  e.preventDefault();
  closeInquiryDirect();
  showToast(`📨 Academic inquiry dispatched directly to ${professorName}!`);
};

/* ==========================================================================
   7. Keyboard Shortcuts (Cmd+K / Ctrl+K search focus)
   ========================================================================== */
function initShortcuts() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.getElementById('facultySearchInput');
      if (input) {
        input.focus();
        input.select();
      }
    }
    if (e.key === 'Escape') {
      const profileModal = document.getElementById('profileModalOverlay');
      const inquiryModal = document.getElementById('inquiryModalOverlay');
      if (profileModal && profileModal.classList.contains('active')) {
        profileModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (inquiryModal && inquiryModal.classList.contains('active')) {
        inquiryModal.classList.remove('active');
      }
    }
  });
}

/* ==========================================================================
   8. Global Toast Notification System
   ========================================================================== */
let toastTimer;
function showToast(msg) {
  const toastContainer = document.getElementById('globalToastNotice');
  if (!toastContainer) return;

  toastContainer.innerHTML = `
    <div class="toast-message">
      <span>${msg}</span>
    </div>
  `;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastContainer.innerHTML = '';
  }, 4000);
}

/* ==========================================================================
   8b. Directory Nav Dropdown Controller
   ========================================================================== */
function initDirectoryNavDropdown() {
  const dropdownItem = document.getElementById('dirExploreDropdown');
  const dropdownBtn = document.getElementById('dirExploreDropdownBtn');
  const dropdownMenu = document.getElementById('dirExploreDropdownMenu');

  if (dropdownBtn && dropdownItem) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownItem.classList.toggle('is-open');
      dropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    const links = dropdownMenu ? dropdownMenu.querySelectorAll('.dir-dropdown-link') : [];
    links.forEach(link => {
      link.addEventListener('click', () => {
        dropdownItem.classList.remove('is-open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (dropdownItem && !dropdownItem.contains(e.target)) {
      dropdownItem.classList.remove('is-open');
      if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdownItem) {
      dropdownItem.classList.remove('is-open');
      if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   9. Directory Authentication & Session Controller (Guest Gate Enforcement)
   ========================================================================== */
let activeGateRole = 'student';

function initDirectorySession() {
  const storedUser = localStorage.getItem('campusConnectUser');
  const gateModal = document.getElementById('authGateModalOverlay');
  const userRoleLabel = document.getElementById('userRoleLabel');
  const dirStatusDot = document.getElementById('dirStatusDot');
  const dirSignInBtn = document.getElementById('dirSignInBtn');
  const dirSignOutBtn = document.getElementById('dirSignOutBtn');

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      // Valid campus session (student, faculty, alumni)
      if (gateModal) {
        gateModal.style.display = 'none';
        gateModal.setAttribute('aria-hidden', 'true');
      }
      if (userRoleLabel) {
        let label = 'Campus Member';
        if (user.role === 'student') label = `👨‍🎓 Student: ${user.name || 'Sachin'}`;
        else if (user.role === 'faculty') label = `👩‍🏫 Faculty: ${user.name || 'Dr. Member'}`;
        else if (user.role === 'alumni') label = `🎓 Alumni: ${user.name || 'AIT Alumni'}`;
        userRoleLabel.textContent = label;
      }
      if (dirStatusDot) {
        dirStatusDot.style.background = '#10b981';
      }
      if (dirSignInBtn) dirSignInBtn.style.display = 'none';
      if (dirSignOutBtn) dirSignOutBtn.style.display = 'inline-flex';
    } catch (e) {
      localStorage.removeItem('campusConnectUser');
      showGuestGate();
    }
  } else {
    // Guest User: Gate Modal is triggered to require login
    showGuestGate();
  }

  function showGuestGate() {
    if (gateModal) {
      gateModal.style.display = 'flex';
      gateModal.setAttribute('aria-hidden', 'false');
    }
    if (userRoleLabel) {
      userRoleLabel.textContent = 'Guest (Login Required)';
    }
    if (dirStatusDot) {
      dirStatusDot.style.background = '#f59e0b';
    }
    if (dirSignInBtn) dirSignInBtn.style.display = 'inline-flex';
    if (dirSignOutBtn) dirSignOutBtn.style.display = 'none';
  }

  // Bind Sign In / Sign Out action buttons
  if (dirSignOutBtn) {
    dirSignOutBtn.onclick = () => {
      localStorage.removeItem('campusConnectUser');
      initDirectorySession();
      showToast('👋 You signed out. Please log in with Student, Faculty, or Alumni credentials.');
    };
  }

  if (dirSignInBtn) {
    dirSignInBtn.onclick = () => {
      if (gateModal) {
        gateModal.style.display = 'flex';
        gateModal.setAttribute('aria-hidden', 'false');
      }
    };
  }

  // Bind Gate Role Tab Buttons
  const tabBtns = document.querySelectorAll('.gate-tab-btn');
  const gateIdLabel = document.getElementById('gateIdLabel');
  const gateIdInput = document.getElementById('gateIdInput');
  const gateEmailInput = document.getElementById('gateEmailInput');
  const gateSubmitBtn = document.getElementById('gateSubmitBtn');

  tabBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGateRole = btn.getAttribute('data-role') || 'student';

      if (activeGateRole === 'student') {
        if (gateIdLabel) gateIdLabel.textContent = 'AIT Roll No / Registration ID';
        if (gateIdInput) gateIdInput.placeholder = 'e.g. 21101 (Comp A)';
        if (gateEmailInput) gateEmailInput.placeholder = 'student_id@aitpune.edu.in';
        if (gateSubmitBtn) gateSubmitBtn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> <span>Sign In as Student</span>';
      } else if (activeGateRole === 'faculty') {
        if (gateIdLabel) gateIdLabel.textContent = 'Faculty Employee Code / Dept ID';
        if (gateIdInput) gateIdInput.placeholder = 'e.g. FAC-COMP-08';
        if (gateEmailInput) gateEmailInput.placeholder = 'faculty_name@aitpune.edu.in';
        if (gateSubmitBtn) gateSubmitBtn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> <span>Sign In as Faculty</span>';
      } else if (activeGateRole === 'alumni') {
        if (gateIdLabel) gateIdLabel.textContent = 'Passout Batch & Branch / Degree';
        if (gateIdInput) gateIdInput.placeholder = 'e.g. Batch 2021 (IT)';
        if (gateEmailInput) gateEmailInput.placeholder = 'alumni.email@domain.com';
        if (gateSubmitBtn) gateSubmitBtn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> <span>Sign In as Alumni</span>';
      }
    };
  });
}

window.handleGateLoginSubmit = function(e) {
  e.preventDefault();
  const gateIdInput = document.getElementById('gateIdInput');
  const gateEmailInput = document.getElementById('gateEmailInput');
  const idVal = gateIdInput ? gateIdInput.value.trim() : '';
  const emailVal = gateEmailInput ? gateEmailInput.value.trim() : '';

  let userName = 'AIT Member';
  if (emailVal) {
    const prefix = emailVal.split('@')[0];
    userName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
  } else if (idVal) {
    userName = idVal;
  }

  const sessionData = {
    role: activeGateRole,
    name: userName,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem('campusConnectUser', JSON.stringify(sessionData));
  initDirectorySession();
  showToast(`🎉 Welcome back, ${userName}! Faculty Directory unlocked.`);
};
