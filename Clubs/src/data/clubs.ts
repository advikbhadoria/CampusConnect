export interface Member {
  name: string;
  branch: string;
  year?: string;
  role?: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export interface InterviewRound {
  role: string;
  criteria: string;
  dates: string;
  venue: string;
  link?: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  isUpcoming: boolean;
  description?: string;
  eligibility?: string;
  rules?: string[];
  registrationSteps?: string[];
  registrationLink?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  tagline: string;
  logoUrl?: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
    discord?: string;
    nexus?: string;
  };
  secretaries: Member[];
  jointSecs: Member[];
  beMembers: Member[];
  teMembers: Member[];
  recruitmentStatus: 'Open' | 'Closed';
  interviews: InterviewRound[];
  events: ClubEvent[];
  achievements: Achievement[];
  news: NewsItem[];
  keyActivities: { title: string; description: string; imageUrl: string; eligibility?: string; rules?: string[]; registrationSteps?: string[]; registrationLink?: string; }[];
  themeColor: string;
}

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User&background=f1f5f9&color=94a3b8&rounded=true&size=128";

const generateMocks = (role: string, count: number = 5): Member[] => {
  const branches = ["Comp A", "Comp B", "IT A", "IT B", "E&TC A", "E&TC B", "Mech", "ARE"];
  
  return Array.from({ length: count }).map((_, i) => ({
    name: `${role} ${i + 1}`,
    branch: branches[Math.floor(Math.random() * branches.length)],
    role,
    avatarUrl: DEFAULT_AVATAR
  }));
};

export const CLUBS: Club[] = [
  {
    id: "cycling-club",
    name: "AIT Cycling Club",
    category: "Sports & Fitness",
    tagline: "Promotes fitness and community through regular cycling meetups and long rides.",
    logoUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=150&h=150&fit=crop&q=80",
    themeColor: "emerald",
    socials: { instagram: "@ait_cycling_club", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Kshitij Kumar", role: "Secretary", branch: "ARE", avatarUrl: DEFAULT_AVATAR },
      { name: "Anshika Yadav", role: "Secretary", branch: "ARE", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary", 2),
    beMembers: generateMocks("BE Mentor", 2),
    teMembers: generateMocks("TE Member", 4),
    recruitmentStatus: "Open",
    interviews: [
      { role: "Rider & Trail Coordinator", criteria: "Passion for cycling, fitness & trail exploration", dates: "12-14 Oct", venue: "Sports Complex", link: "https://aitnexus.in" }
    ],
    keyActivities: [
      {
        title: "Weekend rides",
        description: "Regular weekend morning rides exploring scenic routes around Dighi Hills, Alandi, and scenic outskirts of Pune.",
        imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
        eligibility: "Open to all students with a bicycle (geared or non-geared).",
        rules: [
          "Helmets and front/tail lights are strictly mandatory for all riders",
          "Follow the ride marshals and maintain single file formation on main roads",
          "Carry minimum 1L water bottle and essential hydration",
          "Pre-ride safety check conducted 15 minutes before roll-out"
        ],
        registrationSteps: [
          "Sign up on the AIT Nexus cycling portal (aitnexus.in)",
          "Assemble at the Main Gate at 05:30 AM on ride morning",
          "Complete pre-ride check-in with the club secretaries"
        ],
        registrationLink: "https://aitnexus.in"
      },
      {
        title: "Long-distance trails",
        description: "Endurance-building long distance trails (60km - 100km) to Lonavala, Lavasa, and Panshet Dam designed to push stamina.",
        imageUrl: "https://images.unsplash.com/photo-1534787238916-9ac68dba0314?w=800&q=80",
        eligibility: "Open to students who have completed at least two regular weekend rides.",
        rules: [
          "Geared cycle in certified roadworthy condition required",
          "Support vehicle protocol and GPS route tracking must be adhered to",
          "Mandatory rest and hydration stops every 15km",
          "Emergency contact information must be provided in registration"
        ],
        registrationSteps: [
          "Register on AIT Nexus (aitnexus.in) under Endurance Trails",
          "Complete pre-trail safety inspection with club mechanics",
          "Attend pre-ride route briefing on Friday evening"
        ],
        registrationLink: "https://aitnexus.in"
      },
      {
        title: "Cycling awareness events",
        description: "Campus cyclothons and green mobility workshops promoting eco-friendly transportation, bicycle maintenance, and active lifestyle.",
        imageUrl: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80",
        eligibility: "Open to all AIT students, faculty members, and resident campus staff.",
        rules: [
          "Free participation for all campus residents with valid college ID",
          "Prizes awarded for highest cumulative mileage and best maintained cycle",
          "Follow designated campus safety loops and marshal signals"
        ],
        registrationSteps: [
          "Register online at aitnexus.in",
          "Collect your rider bib number from the Sports Ground registration booth",
          "Line up at the starting arch by 06:45 AM"
        ],
        registrationLink: "https://aitnexus.in"
      }
    ],
    events: [
      { id: "cyc1", title: "Sunday Sunrise Ride to Dighi Hills", date: "2026-10-10", time: "05:30 AM", venue: "Main Gate", isUpcoming: true, description: "A 25km scenic ride with refreshments at the summit.", eligibility: "Open to all", rules: ["Helmet mandatory", "Carry water"], registrationSteps: ["Register on AIT Nexus"], registrationLink: "https://aitnexus.in" }
    ],
    achievements: [
      { id: "a1", title: "Pune to Lonavala 120km Ride", description: "Successfully completed a 120km round trip endurance trail.", date: "2025-08-15" }
    ],
    news: [
      { id: "n1", title: "New Bicycles Added to Campus Fleet", date: "2026-09-01", content: "College added 10 new geared cycles for members available on aitnexus.in." }
    ]
  },
  {
    id: "cultural-board",
    name: "Cultural Board",
    category: "Cultural & Arts",
    tagline: "Oversees cultural clubs, and promotes art, creativity and cultural expression through events and perfomances.",
    logoUrl: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=150&h=150&fit=crop&q=80",
    themeColor: "fuchsia",
    socials: { instagram: "@culturalboard_ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Abhay Singh", role: "Secretary", branch: "E&TC A", avatarUrl: DEFAULT_AVATAR },
      { name: "Himanshi Pathak", role: "Secretary", branch: "Comp A", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary", 2),
    beMembers: generateMocks("BE Mentor", 2),
    teMembers: generateMocks("TE Member", 4),
    recruitmentStatus: "Open",
    interviews: [
      { role: "Cultural Event Lead / Coordinator", criteria: "Creativity, stagecraft & event management skills", dates: "14-16 Oct", venue: "Raman Theatre / Open Amphitheatre", link: "https://aitnexus.in" }
    ],
    keyActivities: [
      {
        title: "Annual cultural fest",
        description: "The flagship annual multi-day cultural festival featuring inter-branch competitions, concerts, celebrity performances, and dance showcases.",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
        eligibility: "Open to all registered AIT students across all branches and academic years.",
        rules: [
          "Valid college ID is mandatory for venue entry and backstage access",
          "Competitive entries must be registered on AIT Nexus 48 hours in advance",
          "Adhere strictly to designated time limits and performance ethics",
          "Original musical arrangements and theatrical scripts receive bonus scoring"
        ],
        registrationSteps: [
          "Visit the Cultural Board portal on AIT Nexus (aitnexus.in)",
          "Select your event category (Music, Dance, Drama, Fine Arts)",
          "Upload team roster, technical rider, and soundtrack files",
          "Attend stage technical rehearsals at the Open Amphitheatre"
        ],
        registrationLink: "https://aitnexus.in"
      },
      {
        title: "Talent nights",
        description: "Intimate acoustic and open-mic evenings celebrating student singing, stand-up comedy, poetry, and diverse artistic expressions.",
        imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
        eligibility: "Open to all students, faculty members, and campus staff.",
        rules: [
          "Solo and duet performances allocated 5-7 minutes time slot",
          "Backing music tracks must be submitted via AIT Nexus 24 hours prior",
          "Maintain decorum and supportive sportsmanship towards fellow performers",
          "Content must be respectful and compliant with campus cultural guidelines"
        ],
        registrationSteps: [
          "Submit your act details on AIT Nexus (aitnexus.in)",
          "Attend a quick 2-minute slot allocation briefing with the secretaries",
          "Report backstage 15 minutes before your scheduled performance slot"
        ],
        registrationLink: "https://aitnexus.in"
      },
      {
        title: "Inter-college cultural events",
        description: "Representing AIT Pune at premier national university cultural fests with college sponsorship and mentor coaching.",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
        eligibility: "Selected members and finalists from intra-college cultural rounds and verified club leads.",
        rules: [
          "Academic attendance requirement of 75% minimum must be met",
          "Contingent members must wear official AIT representation attire",
          "Strict adherence to host institute rules and travel guidelines"
        ],
        registrationSteps: [
          "Participate in the Cultural Board internal screening auditions",
          "Complete official contingent registry on AIT Nexus (aitnexus.in)",
          "Receive approved academic attendance duty leave and travel schedule"
        ],
        registrationLink: "https://aitnexus.in"
      }
    ],
    events: [
      { id: "cult1", title: "Aakriti 2026 Cultural Fest Auditions", date: "2026-10-25", time: "05:00 PM", venue: "Open Amphitheatre", isUpcoming: true, description: "Campus-wide auditions for the annual festival.", eligibility: "Open to all students", rules: ["Valid ID required"], registrationSteps: ["Register on AIT Nexus"], registrationLink: "https://aitnexus.in" }
    ],
    achievements: [
      { id: "ca1", title: "Best Cultural Contingent Trophy 2025", description: "Won 1st prize at Inter-University Youth Festival.", date: "2025-12-10" }
    ],
    news: [
      { id: "cn1", title: "Auditions Open for Annual Cult Fest 2026", date: "2026-09-10", content: "Registrations are now live for dance, music, and theatre on aitnexus.in." }
    ]
  },
  {
    id: "cp-club",
    name: "Competitive Programming (CP) Club",
    category: "Technical & Coding",
    tagline: "Focused training and practice for programming contests and technical interviews.",
    socials: { instagram: "@coding_cell_ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Sahil Kumar", branch: "Comp A", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Radhika Dodain", branch: "E&TC B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Interest in competitive programming", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "CODEFT 4.0", description: "Join us for CODEFT 4.0, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "CRACK 5.1", description: "Join us for CRACK 5.1, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "CRACK 5.2", description: "Join us for CRACK 5.2, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "indigo",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "ecell",
    name: "E-Cell",
    category: "Innovation & Robotics",
    tagline: "Promotes entrepreneurship, innovation and startup culture among students.",
    socials: { instagram: "@ecell_ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Samiksha Sharma", branch: "Comp A", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Entrepreneurial mindset", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Startup bootcamp", description: "Join us for Startup bootcamp, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Pitch deck workshop", description: "Join us for Pitch deck workshop, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Incubation support", description: "Join us for Incubation support, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "amber",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "gdg",
    name: "GDG AIT Pune",
    category: "Technical & Coding",
    tagline: "Community-driven developer group focused on practical developer skills and technology learning.",
    socials: { instagram: "@gdsc_aitpune", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Peush Yadav", branch: "E&TC B", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Palak Kumara", branch: "IT B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Enthusiasm for Google tech", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Frontend jams", description: "Join us for Frontend jams, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Backend jams", description: "Join us for Backend jams, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "FSOC", description: "Join us for FSOC, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "blue",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "gdxr",
    name: "GDXR",
    category: "Technical & Coding",
    tagline: "Dedicated to game development, AR/VR technologies and immersive experiences.",
    socials: { instagram: "@gdxr_ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Apoorva", branch: "ARE", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Anjali", branch: "ARE", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "GameJam", description: "Join us for GameJam, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "XR workshop", description: "Join us for XR workshop, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Dev Sprints", description: "Join us for Dev Sprints, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "purple",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "isdf",
    name: "ISDF",
    category: "Technical & Coding",
    tagline: "Focuses on cybersecurity, ethical hacking, and digital forensics skills.",
    socials: { instagram: "@isdf_ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Kumari Priyanshu", branch: "Comp B", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Gaurav Chand", branch: "ARE", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Basic networking knowledge", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "CTF challenges", description: "Join us for CTF challenges, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Cybersecurity workshops", description: "Join us for Cybersecurity workshops, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Forensics lab training", description: "Join us for Forensics lab training, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "slate",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "magboard",
    name: "Magboard",
    category: "Media & Publications",
    tagline: "Manages college magazine, newsletter writing, and creative editorial work.",
    socials: { instagram: "@magboard", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Adarsh Rana", branch: "Comp A", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Srinidhi Shettigar", branch: "ARE", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "College magazine", description: "Join us for College magazine, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Newsletter editing", description: "Join us for Newsletter editing, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Writing competitions", description: "Join us for Writing competitions, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "fuchsia",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "natures-club",
    name: "Nature's Club",
    category: "Social & Welfare",
    tagline: "Encourages environmental conversation, sustainability, and nature awareness.",
    socials: { instagram: "@ait_nature_club", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Mohit Sharma", branch: "IT B", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Rashika", branch: "TE ARE", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Passion for nature", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Plantation drives", description: "Join us for Plantation drives, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Nature walks", description: "Join us for Nature walks, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Eco-awareness campaigns", description: "Join us for Eco-awareness campaigns, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "teal",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "nss",
    name: "NSS",
    category: "Social & Welfare",
    tagline: "A volunteer organisation dedicated to social service and community development.",
    socials: { instagram: "@ait__nss_rotaract_club", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Sahil Yadav", branch: "IT A", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Pooja Kumari", branch: "Comp B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "Blood donation camps", description: "Join us for Blood donation camps, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Cleanliness drives", description: "Join us for Cleanliness drives, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Social outreach programs", description: "Join us for Social outreach programs, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "blue",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "oss",
    name: "OSS Club",
    category: "Technical & Coding",
    tagline: "Encouraging students to contribute to open source projects and learn collaborative software development.",
    socials: { instagram: "@ossclub.ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Anmol Singh", branch: "IT B", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Yashika Yadav", branch: "ARE", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Git/GitHub basics", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "INNERVE", description: "Join us for INNERVE, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "FSOC", description: "Join us for FSOC, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Graphica", description: "Join us for Graphica, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "sky",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "pr-cell",
    name: "PR Cell",
    category: "Media & Publications",
    tagline: "Handles campus branding, outreach, media communication and media coordination.",
    socials: { instagram: "@ait_pr_cell", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Lucky Dhami", branch: "IT B", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Faiza Fatima", branch: "Comp B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "Campus outreach", description: "Join us for Campus outreach, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Event promotions", description: "Join us for Event promotions, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Media coordination", description: "Join us for Media coordination, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "pink",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "rnd",
    name: "R&D Cell",
    category: "Innovation & Robotics",
    tagline: "Encourages research-thinking, publication, and innovation-driven projects.",
    socials: { instagram: "@research_and_development_cell", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Sumit Attri", branch: "E&TC A", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Dishti Pal", branch: "E&TC A", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Interest in research", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Research paper workshops", description: "Join us for Research paper workshops, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Project mentorship", description: "Join us for Project mentorship, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Publication guidance", description: "Join us for Publication guidance, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "indigo",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "technical-board",
    name: "Technical Board",
    category: "Technical & Coding",
    tagline: "Central body managing all technical clubs and driving innovation, tech events, and project-based learning across the institute.",
    socials: { instagram: "@aittechnicalboard", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Ajay Singh Tomar", branch: "IT A", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Simran", branch: "IT B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "Institute tech fest", description: "Join us for Institute tech fest, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Inter-club hackathons", description: "Join us for Inter-club hackathons, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Technical workshops & seminars", description: "Join us for Technical workshops & seminars, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "violet",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "sports-club",
    name: "Sports Club",
    category: "Sports & Fitness",
    tagline: "Drives fitness and sportsmanship through campus sports activities and inter college tournaments.",
    socials: { instagram: "@aitsportsclub", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Himanshu Ranjan", branch: "ARE", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Ayesha Bisht", branch: "IT B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Sports background", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Inter college tournaments", description: "Join us for Inter college tournaments, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Campus sports activities", description: "Join us for Campus sports activities, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "orange",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "cear",
    name: "CEAR",
    category: "Innovation & Robotics",
    tagline: "Centre of Excellence for AI & Robotics - hands-on exploration of artificial intelligence, machine learning and robotics through projects and workshops.",
    socials: { instagram: "@robotics.club_ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Tejas Jape", branch: "Mech", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Pragati", branch: "E&TC B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "AI/ML workshops", description: "Join us for AI/ML workshops, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Robotics projects", description: "Join us for Robotics projects, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Hands-on exploration", description: "Join us for Hands-on exploration, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "cyan",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "spiritual",
    name: "Spiritual Club",
    category: "Social & Welfare",
    tagline: "Encourages mindfulness, inner well-being and holistic personal growth on campus.",
    socials: { instagram: "@ait_spiritual_club", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Gaurav", branch: "E&TC B", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Komal Devi", branch: "Comp B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Open mindedness", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Mindfulness sessions", description: "Join us for Mindfulness sessions, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Well-being seminars", description: "Join us for Well-being seminars, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "amber",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "fine-arts",
    name: "Fine Arts Club",
    category: "Cultural & Arts",
    tagline: "A creative space for painting, sketching and visual arts across the campus community.",
    socials: { instagram: "@fine._.arts._.ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Nishant Nehra", branch: "E&TC B", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Pooja C V", branch: "Mech", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Portfolio review", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Painting exhibitions", description: "Join us for Painting exhibitions, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Sketching workshops", description: "Join us for Sketching workshops, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "pink",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "ddq",
    name: "DDQ Club",
    category: "Cultural & Arts",
    tagline: "Builds public speaking, critical thinking, and stage presence through debates, quizzes and theatre.",
    socials: { instagram: "@ddqclub", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Harshika Tyagi", branch: "Mech", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "Debates", description: "Join us for Debates, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Quizzes", description: "Join us for Quizzes, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Theatre", description: "Join us for Theatre, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "blue",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "radio",
    name: "Radio Club",
    category: "Media & Publications",
    tagline: "Runs campus radio, podcasts and audio storytelling for the student community.",
    socials: { instagram: "@radioraaga", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Satyam Tripathi", branch: "Mech", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Sweta Dalal", branch: "ARE", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Voice modulation test", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Campus radio", description: "Join us for Campus radio, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Podcasts", description: "Join us for Podcasts, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Audio storytelling", description: "Join us for Audio storytelling, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "purple",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "ev-cell",
    name: "EV Cell",
    category: "Innovation & Robotics",
    tagline: "Explores electric vehicle technology, sustainable mobility, and hands-on EV projects.",
    socials: { instagram: "@evclub_ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Anshu Yadav", branch: "Mech", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "EV technology research", description: "Join us for EV technology research, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Sustainable mobility", description: "Join us for Sustainable mobility, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Hands-on EV projects", description: "Join us for Hands-on EV projects, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "emerald",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "film",
    name: "Film Club",
    category: "Media & Publications",
    tagline: "For filmmaking enthusiasts - cinematography, editing and short-film storytelling.",
    socials: { instagram: "@filmclub_ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Ayush Chahar", branch: "IT A", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Neha Biswas", branch: "Comp A", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Editing/Shooting skills", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Cinematography", description: "Join us for Cinematography, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Editing", description: "Join us for Editing, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Short-film storytelling", description: "Join us for Short-film storytelling, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "rose",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "press",
    name: "Press & News Cell",
    category: "Media & Publications",
    tagline: "Covers campus happenings through student journalism, reporting and news coverage.",
    socials: { instagram: "Coming soon", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Lakkireddy Yagneswar Reddy", branch: "Comp B", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Debdutta Roy", branch: "IT B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "Student journalism", description: "Join us for Student journalism, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Reporting", description: "Join us for Reporting, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "News coverage", description: "Join us for News coverage, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "slate",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "social-media",
    name: "Social Media Cell",
    category: "Media & Publications",
    tagline: "Manages the institutes social presence with content, campaigns and community engagement.",
    socials: { instagram: "@ait_social_media_cell", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Manasi", branch: "Comp B", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Deepanshu Singh Shekhawat", branch: "E&TC B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Content creation experience", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Content management", description: "Join us for Content management, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Campaigns", description: "Join us for Campaigns, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Community engagement", description: "Join us for Community engagement, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "pink",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "sae",
    name: "SAE - AIT Collegiate Club",
    category: "Innovation & Robotics",
    tagline: "Automotive and mechanical engineering club participating in SAE design and build competitions.",
    socials: { instagram: "Coming soon", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Ramswaroop Swami", branch: "Mech", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "SAE design", description: "Join us for SAE design, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Build competitions", description: "Join us for Build competitions, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "sky",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "cidc",
    name: "CIDC",
    category: "Innovation & Robotics",
    tagline: "College innovation development club - Nurtures innovation and problem solving through student-led projects and prototyping.",
    socials: { instagram: "@cidc.ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Abhay Singh", branch: "IT B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Innovative ideas", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Student-led projects", description: "Join us for Student-led projects, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Prototyping", description: "Join us for Prototyping, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Problem solving", description: "Join us for Problem solving, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "amber",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "astronomy",
    name: "Astronomy Club",
    category: "Technical & Coding",
    tagline: "For sky gazers and space enthusiasts - observation sessions, astrophysics and cosmic curiosity.",
    socials: { instagram: "@astro.club_ait", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Ishaan M", branch: "ARE", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Manisha", branch: "IT B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "Observation sessions", description: "Join us for Observation sessions, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Astrophysics", description: "Join us for Astrophysics, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Cosmic curiosity", description: "Join us for Cosmic curiosity, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "indigo",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "drone",
    name: "Drone Club",
    category: "Innovation & Robotics",
    tagline: "Hands-on drone building, aerial technology and UAV applications.",
    socials: { instagram: "Coming soon", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Mantu Dutta", branch: "E&TC", role: "Secretary", avatarUrl: DEFAULT_AVATAR },
      { name: "Swasti Yadav", branch: "TE Mech", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Open",
    interviews: [{ role: "FE Member / Joint Secretary", criteria: "Drone basics", dates: "Upcoming", venue: "TBD" }],
    keyActivities: [
      { title: "Drone building", description: "Join us for Drone building, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Aerial technology", description: "Join us for Aerial technology, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "UAV applications", description: "Join us for UAV applications, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "sky",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  },
  {
    id: "music-dance",
    name: "Music & Dance Club",
    category: "Cultural & Arts",
    tagline: "Bring music and dance to campus through performance, jams and cultural showcases.",
    socials: { instagram: "Coming soon", nexus: "https://aitnexus.in" },
    secretaries: [
      { name: "Mysaraa Acharya", branch: "E&TC B", role: "Secretary", avatarUrl: DEFAULT_AVATAR }
    ],
    jointSecs: generateMocks("Joint Secretary"),
    beMembers: generateMocks("BE Mentor"),
    teMembers: generateMocks("TE Member"),
    recruitmentStatus: "Closed",
    interviews: [],
    keyActivities: [
      { title: "Performances", description: "Join us for Performances, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Jams", description: "Join us for Jams, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      },
      { title: "Cultural showcases", description: "Join us for Cultural showcases, an exciting initiative to collaborate and learn.", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60",
        eligibility: "Open to all students.",
        rules: ["Must carry college ID", "Pre-registration is required"],
        registrationSteps: ["Fill the google form", "Join the community group"],
        registrationLink: "https://docs.google.com/forms"
      }
    ],
    themeColor: "rose",
    events: [
      { id: "ev1", title: "Monthly Orientation", date: "2026-10-05", time: "05:00 PM", venue: "Main Auditorium", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev2", title: "Guest Lecture Series", date: "2026-10-12", time: "11:00 AM", venue: "Seminar Hall 2", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev3", title: "Weekly Meetup", date: "2026-10-18", time: "04:30 PM", venue: "Club Room", isUpcoming: true,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      },
      { id: "ev4", title: "Project Review", date: "2026-09-28", time: "02:00 PM", venue: "Lab 1", isUpcoming: false,
        description: "Join us for this exciting event where you will learn new skills and connect with peers.",
        eligibility: "Open to all AIT students from FE to BE.",
        rules: ["Bring your ID card", "Maintain discipline", "Be punctual"],
        registrationSteps: ["Fill the form below", "Join the WhatsApp group", "Show up on time!"],
        registrationLink: "https://docs.google.com/forms"
      }
    ], achievements: [], news: []
  }
];

export const CATEGORIES = [
  "All",
  "Technical & Coding",
  "Innovation & Robotics",
  "Media & Publications",
  "Cultural & Arts",
  "Sports & Fitness",
  "Social & Welfare"
];
