/* ==========================================================================
   CAMPUS CONNECT - ALUMNI DIRECTORY DATA & LOGIC
   ========================================================================== */

const ALUMNI_DATA = [
  {
    "id": "alum-1",
    "name": "Snehangshu Das",
    "degree": "B.Tech CSE - AIT Pune '21",
    "currentJob": "Senior ML Engineer at Google DeepMind",
    "company": "Google DeepMind",
    "location": "London, UK",
    "bio": "Building multimodal foundation models and sparse MoE architectures. Previously research engineer at Microsoft. Passionate about open-source AI and mentoring.",
    "accentColor": "#8b5cf6",
    "pastClubs": [
      "OSS",
      "GDG",
      "CP",
      "Robotics"
    ],
    "skills": [
      "PyTorch",
      "LLMs",
      "Distributed Systems",
      "Python"
    ],
    "postsCount": 5,
    "likesCount": 150,
    "isLiked": true,
    "followers": 650,
    "isFollowing": true,
    "domain": "AI & ML",
    "batch": 2021,
    "phone": "+91 98201 11001",
    "whatsapp": "+91 98201 11001",
    "careerTimeline": [
      {
        "role": "Senior ML Engineer",
        "company": "Google DeepMind",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Google DeepMind."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2023 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2019 - 2021",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-2",
    "name": "Priya Sharma",
    "degree": "B.Tech IT - AIT Pune '20",
    "currentJob": "Staff Software Architect at Stripe",
    "company": "Stripe",
    "location": "San Francisco, CA",
    "bio": "Designing resilient payment infrastructure processing billions in global transactions. Avid competitive programmer and distributed systems speaker.",
    "accentColor": "#f97316",
    "pastClubs": [
      "GDG",
      "CP",
      "Coding Ninjas"
    ],
    "skills": [
      "Go",
      "Kafka",
      "Kubernetes",
      "System Design"
    ],
    "postsCount": 8,
    "likesCount": 217,
    "isLiked": false,
    "followers": 792,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2020,
    "phone": "+91 98201 11002",
    "whatsapp": "+91 98201 11002",
    "careerTimeline": [
      {
        "role": "Staff Software Architect",
        "company": "Stripe",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Stripe."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2022 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2018 - 2020",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-3",
    "name": "Arjun Mehta",
    "degree": "B.Tech ECE - AIT Pune '22",
    "currentJob": "Robotics Firmware Lead at Tesla",
    "company": "Tesla Autopilot",
    "location": "Austin, TX",
    "bio": "Embedded systems and real-time control for autonomous robotics. College robotics lead who built smart campus IoT solutions and race telemetry.",
    "accentColor": "#06b6d4",
    "pastClubs": [
      "OSS",
      "Robotics",
      "Formula Student"
    ],
    "skills": [
      "C++20",
      "ROS2",
      "Embedded C",
      "RTOS"
    ],
    "postsCount": 11,
    "likesCount": 284,
    "isLiked": false,
    "followers": 934,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2022,
    "phone": "+91 98201 11003",
    "whatsapp": "+91 98201 11003",
    "careerTimeline": [
      {
        "role": "Robotics Firmware Lead",
        "company": "Tesla Autopilot",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Tesla Autopilot."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2024 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2020 - 2022",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-4",
    "name": "Ananya Kulkarni",
    "degree": "B.Tech Mech - AIT Pune '21",
    "currentJob": "Lead Product Designer at Airbnb",
    "company": "Airbnb",
    "location": "Bengaluru, India",
    "bio": "Crafting human-centered spatial UX and global design systems. Former founder of campus Design & Media club. Mentoring aspiring student product designers.",
    "accentColor": "#ec4899",
    "pastClubs": [
      "Design & Media",
      "Fine Arts",
      "Cultural Club"
    ],
    "skills": [
      "Figma",
      "Design Systems",
      "UX Research",
      "Micro-Interactions"
    ],
    "postsCount": 14,
    "likesCount": 351,
    "isLiked": false,
    "followers": 1076,
    "isFollowing": false,
    "domain": "Product & Design",
    "batch": 2021,
    "phone": "+91 98201 11004",
    "whatsapp": "+91 98201 11004",
    "careerTimeline": [
      {
        "role": "Lead Product Designer",
        "company": "Airbnb",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Airbnb."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2023 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2019 - 2021",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-5",
    "name": "Rohan Patil",
    "degree": "B.Tech CSE - AIT Pune '19",
    "currentJob": "Quantitative Researcher at Citadel",
    "company": "Citadel Securities",
    "location": "New York, NY",
    "bio": "Algorithmic high-frequency trading and statistical microstructure arbitrage. Math Olympiad medallist and founding member of campus quant society.",
    "accentColor": "#3b82f6",
    "pastClubs": [
      "Quant Club",
      "CP",
      "Math Society"
    ],
    "skills": [
      "C++",
      "Python",
      "Stochastic Calculus",
      "Time Series ML"
    ],
    "postsCount": 17,
    "likesCount": 418,
    "isLiked": true,
    "followers": 1218,
    "isFollowing": false,
    "domain": "Finance & Quant",
    "batch": 2019,
    "phone": "+91 98201 11005",
    "whatsapp": "+91 98201 11005",
    "careerTimeline": [
      {
        "role": "Quantitative Researcher",
        "company": "Citadel Securities",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Citadel Securities."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2021 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2017 - 2019",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-6",
    "name": "Ishita Desai",
    "degree": "B.Tech IT - AIT Pune '23",
    "currentJob": "Security Researcher at Cisco Talos",
    "company": "Cisco Talos",
    "location": "Singapore",
    "bio": "Zero-knowledge cryptography, malware analysis, and smart contract vulnerability auditing. DEFCON CTF finalist and active cybersecurity speaker.",
    "accentColor": "#10b981",
    "pastClubs": [
      "Cybersecurity",
      "OSS",
      "ACM"
    ],
    "skills": [
      "Rust",
      "Reverse Eng",
      "Zero Knowledge",
      "Penetration Testing"
    ],
    "postsCount": 20,
    "likesCount": 485,
    "isLiked": false,
    "followers": 1360,
    "isFollowing": true,
    "domain": "Cybersecurity",
    "batch": 2023,
    "phone": "+91 98201 11006",
    "whatsapp": "+91 98201 11006",
    "careerTimeline": [
      {
        "role": "Security Researcher",
        "company": "Cisco Talos",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Cisco Talos."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2025 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2021 - 2023",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-7",
    "name": "Vikramaditya Rathore",
    "degree": "B.Tech CSE - AIT Pune '18",
    "currentJob": "Principal Engineer at AWS Lambda",
    "company": "Amazon Web Services",
    "location": "Seattle, WA",
    "bio": "Pioneering serverless virtualization, microVM kernels, and Firecracker architectures. Built AIT's first multi-tenant cloud lab infrastructure.",
    "accentColor": "#6366f1",
    "pastClubs": [
      "OSS",
      "ACM",
      "GDG"
    ],
    "skills": [
      "Rust",
      "Linux Kernel",
      "Distributed Systems",
      "AWS"
    ],
    "postsCount": 23,
    "likesCount": 552,
    "isLiked": false,
    "followers": 1502,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2018,
    "phone": "+91 98201 11007",
    "whatsapp": "+91 98201 11007",
    "careerTimeline": [
      {
        "role": "Principal Engineer",
        "company": "Amazon Web Services",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Amazon Web Services."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2020 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2016 - 2018",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-8",
    "name": "Tanvi Saxena",
    "degree": "B.Tech IT - AIT Pune '22",
    "currentJob": "AI Research Scientist at Meta FAIR",
    "company": "Meta",
    "location": "Menlo Park, CA",
    "bio": "Specializing in self-supervised speech models and multilingual audio representation. Published at NeurIPS, ICML, and Interspeech.",
    "accentColor": "#a855f7",
    "pastClubs": [
      "OSS",
      "CP",
      "Fine Arts"
    ],
    "skills": [
      "PyTorch",
      "Audio AI",
      "Transformers",
      "CUDA"
    ],
    "postsCount": 26,
    "likesCount": 619,
    "isLiked": false,
    "followers": 1644,
    "isFollowing": false,
    "domain": "AI & ML",
    "batch": 2022,
    "phone": "+91 98201 11008",
    "whatsapp": "+91 98201 11008",
    "careerTimeline": [
      {
        "role": "AI Research Scientist",
        "company": "Meta",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Meta."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2024 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2020 - 2022",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-9",
    "name": "Devendra Singhania",
    "degree": "B.Tech Mech - AIT Pune '17",
    "currentJob": "Propulsion Systems Specialist at ISRO",
    "company": "ISRO - Indian Space Research Organisation",
    "location": "Bengaluru, India",
    "bio": "Cryogenic engine thermodynamics and stage separation dynamics for heavy-lift launch vehicles. Proud recipient of ISRO Young Scientist Commendation.",
    "accentColor": "#f59e0b",
    "pastClubs": [
      "Robotics",
      "Formula Student"
    ],
    "skills": [
      "Ansys Fluent",
      "Aerodynamics",
      "MATLAB",
      "Cryogenics"
    ],
    "postsCount": 29,
    "likesCount": 686,
    "isLiked": true,
    "followers": 1786,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2017,
    "phone": "+91 98201 11009",
    "whatsapp": "+91 98201 11009",
    "careerTimeline": [
      {
        "role": "Propulsion Systems Specialist",
        "company": "ISRO - Indian Space Research Organisation",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at ISRO - Indian Space Research Organisation."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2019 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2015 - 2017",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-10",
    "name": "Meera Krishnan",
    "degree": "B.Tech CSE - AIT Pune '20",
    "currentJob": "Staff Product Manager at Razorpay",
    "company": "Razorpay",
    "location": "Bengaluru, India",
    "bio": "Scaling fintech payment gateways, instant UPI settlements, and developer APIs. Passionate about product strategy, data-informed UX, and founder coaching.",
    "accentColor": "#ec4899",
    "pastClubs": [
      "Design & Media",
      "GDG",
      "Cultural Club"
    ],
    "skills": [
      "Product Strategy",
      "Fintech",
      "User Analytics",
      "APIs"
    ],
    "postsCount": 7,
    "likesCount": 753,
    "isLiked": false,
    "followers": 1928,
    "isFollowing": false,
    "domain": "Product & Design",
    "batch": 2020,
    "phone": "+91 98201 11010",
    "whatsapp": "+91 98201 11010",
    "careerTimeline": [
      {
        "role": "Staff Product Manager",
        "company": "Razorpay",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Razorpay."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2022 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2018 - 2020",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-11",
    "name": "Harsh Vardhan Joshi",
    "degree": "B.Tech ECE - AIT Pune '19",
    "currentJob": "Senior Hardware Engineer at Apple",
    "company": "Apple",
    "location": "Cupertino, CA",
    "bio": "Apple Silicon M-series SoC design, power management, and neural engine verification. AIT electronics topper and passionate lab instructor.",
    "accentColor": "#0ea5e9",
    "pastClubs": [
      "Robotics",
      "Quant Club"
    ],
    "skills": [
      "SystemVerilog",
      "VLSI",
      "ASIC",
      "FPGA"
    ],
    "postsCount": 10,
    "likesCount": 820,
    "isLiked": false,
    "followers": 2070,
    "isFollowing": true,
    "domain": "Hardware & Robotics",
    "batch": 2019,
    "phone": "+91 98201 11011",
    "whatsapp": "+91 98201 11011",
    "careerTimeline": [
      {
        "role": "Senior Hardware Engineer",
        "company": "Apple",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Apple."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2021 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2017 - 2019",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-12",
    "name": "Siddharth Nambiar",
    "degree": "B.Tech CSE - AIT Pune '16",
    "currentJob": "Co-Founder & CTO at NexusAI",
    "company": "NexusAI (YC S21)",
    "location": "Bengaluru, India",
    "bio": "YC alumnus building automated code migration and enterprise agents. Scaled company from seed to Series B. Angel investor in early-stage developer tools.",
    "accentColor": "#10b981",
    "pastClubs": [
      "OSS",
      "CP",
      "GDG"
    ],
    "skills": [
      "Startups",
      "System Architecture",
      "Generative AI",
      "Go"
    ],
    "postsCount": 13,
    "likesCount": 887,
    "isLiked": false,
    "followers": 2212,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2016,
    "phone": "+91 98201 11012",
    "whatsapp": "+91 98201 11012",
    "careerTimeline": [
      {
        "role": "Co-Founder & CTO",
        "company": "NexusAI (YC S21)",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at NexusAI (YC S21)."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2018 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2014 - 2016",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-13",
    "name": "Kavita Somani",
    "degree": "B.Tech IT - AIT Pune '21",
    "currentJob": "Threat Intelligence Analyst at Mandiant",
    "company": "Mandiant (Google Cloud)",
    "location": "Sydney, Australia",
    "bio": "Tracking state-sponsored APT groups, critical infrastructure ransomware, and dark web intelligence. Certified OSCP, CISSP, and passionate CTF creator.",
    "accentColor": "#f43f5e",
    "pastClubs": [
      "Cybersecurity",
      "ACM"
    ],
    "skills": [
      "Threat Hunting",
      "YARA",
      "OSINT",
      "Incident Response"
    ],
    "postsCount": 16,
    "likesCount": 954,
    "isLiked": true,
    "followers": 2354,
    "isFollowing": false,
    "domain": "Cybersecurity",
    "batch": 2021,
    "phone": "+91 98201 11013",
    "whatsapp": "+91 98201 11013",
    "careerTimeline": [
      {
        "role": "Threat Intelligence Analyst",
        "company": "Mandiant (Google Cloud)",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Mandiant (Google Cloud)."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2023 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2019 - 2021",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-14",
    "name": "Aditya Roy Chowdhury",
    "degree": "B.Tech CSE - AIT Pune '23",
    "currentJob": "Distributed Systems Engineer at Snowflake",
    "company": "Snowflake Computing",
    "location": "Pune, India",
    "bio": "Building petabyte-scale cloud data warehousing query engines and storage compression algorithms. Open source committer to Apache Iceberg.",
    "accentColor": "#3b82f6",
    "pastClubs": [
      "OSS",
      "CP"
    ],
    "skills": [
      "C++",
      "Java",
      "Database Internals",
      "Distributed Querying"
    ],
    "postsCount": 19,
    "likesCount": 1021,
    "isLiked": false,
    "followers": 2496,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2023,
    "phone": "+91 98201 11014",
    "whatsapp": "+91 98201 11014",
    "careerTimeline": [
      {
        "role": "Distributed Systems Engineer",
        "company": "Snowflake Computing",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Snowflake Computing."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2025 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2021 - 2023",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-15",
    "name": "Shruti Hegde",
    "degree": "B.Tech ECE - AIT Pune '20",
    "currentJob": "Quantitative Strategist at Goldman Sachs",
    "company": "Goldman Sachs",
    "location": "Bengaluru, India",
    "bio": "Derivatives pricing, volatility surface modelling, and algorithmic portfolio hedging. Passionate about mentoring junior engineering students into quant finance.",
    "accentColor": "#eab308",
    "pastClubs": [
      "Quant Club",
      "Math Society",
      "Cultural Club"
    ],
    "skills": [
      "Python",
      "Financial Math",
      "Risk Modeling",
      "C++"
    ],
    "postsCount": 22,
    "likesCount": 1088,
    "isLiked": false,
    "followers": 2638,
    "isFollowing": false,
    "domain": "Finance & Quant",
    "batch": 2020,
    "phone": "+91 98201 11015",
    "whatsapp": "+91 98201 11015",
    "careerTimeline": [
      {
        "role": "Quantitative Strategist",
        "company": "Goldman Sachs",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Goldman Sachs."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2022 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2018 - 2020",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-16",
    "name": "Akash Nair",
    "degree": "B.Tech CSE - AIT Pune '22",
    "currentJob": "Autonomous Vehicle Perception Engineer at Waymo",
    "company": "Waymo (Alphabet)",
    "location": "Mountain View, CA",
    "bio": "LiDAR and camera sensor fusion, 3D object detection, and occupancy flow for self-driving taxis. Author of CVPR workshop papers.",
    "accentColor": "#0284c7",
    "pastClubs": [
      "Robotics",
      "OSS"
    ],
    "skills": [
      "Computer Vision",
      "TensorRT",
      "C++",
      "PyTorch"
    ],
    "postsCount": 25,
    "likesCount": 1155,
    "isLiked": false,
    "followers": 2780,
    "isFollowing": true,
    "domain": "AI & ML",
    "batch": 2022,
    "phone": "+91 98201 11016",
    "whatsapp": "+91 98201 11016",
    "careerTimeline": [
      {
        "role": "Autonomous Vehicle Perception Engineer",
        "company": "Waymo (Alphabet)",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Waymo (Alphabet)."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2024 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2020 - 2022",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-17",
    "name": "Pooja Chhabra",
    "degree": "B.Tech IT - AIT Pune '19",
    "currentJob": "Head of Design at Zepto",
    "company": "Zepto",
    "location": "Mumbai, India",
    "bio": "Building ultra-fast 10-minute grocery delivery consumer interfaces and rider partner design systems. Featured in Top 30 Designers in Indian Tech.",
    "accentColor": "#ec4899",
    "pastClubs": [
      "Design & Media",
      "Fine Arts"
    ],
    "skills": [
      "Design Leadership",
      "Rapid Prototyping",
      "Design Ops",
      "Figma"
    ],
    "postsCount": 28,
    "likesCount": 1222,
    "isLiked": true,
    "followers": 2922,
    "isFollowing": false,
    "domain": "Product & Design",
    "batch": 2019,
    "phone": "+91 98201 11017",
    "whatsapp": "+91 98201 11017",
    "careerTimeline": [
      {
        "role": "Head of Design",
        "company": "Zepto",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Zepto."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2021 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2017 - 2019",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-18",
    "name": "Nikhil Deshmukh",
    "degree": "B.Tech Mech - AIT Pune '18",
    "currentJob": "EV Battery Thermal Lead at Tata Motors",
    "company": "Tata Motors Passenger Vehicles",
    "location": "Pune, India",
    "bio": "Designing liquid cooling circuits, phase change materials, and fire safety systems for Nexon EV and Curvv EV battery packs.",
    "accentColor": "#059669",
    "pastClubs": [
      "Formula Student",
      "Robotics"
    ],
    "skills": [
      "Thermal Management",
      "Battery Pack Design",
      "SolidWorks",
      "SimScale"
    ],
    "postsCount": 6,
    "likesCount": 1289,
    "isLiked": false,
    "followers": 3064,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2018,
    "phone": "+91 98201 11018",
    "whatsapp": "+91 98201 11018",
    "careerTimeline": [
      {
        "role": "EV Battery Thermal Lead",
        "company": "Tata Motors Passenger Vehicles",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Tata Motors Passenger Vehicles."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2020 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2016 - 2018",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-19",
    "name": "Divya Bansal",
    "degree": "B.Tech CSE - AIT Pune '24",
    "currentJob": "Software Development Engineer at Microsoft",
    "company": "Microsoft IDC",
    "location": "Hyderabad, India",
    "bio": "Working on Azure DevOps cloud pipelines, container security, and GitHub Copilot extensions. College hackathon winner and active open-source contributor.",
    "accentColor": "#6366f1",
    "pastClubs": [
      "OSS",
      "GDG",
      "CP"
    ],
    "skills": [
      "TypeScript",
      "C#",
      ".NET Core",
      "Docker"
    ],
    "postsCount": 9,
    "likesCount": 1356,
    "isLiked": false,
    "followers": 3206,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2024,
    "phone": "+91 98201 11019",
    "whatsapp": "+91 98201 11019",
    "careerTimeline": [
      {
        "role": "Software Development Engineer",
        "company": "Microsoft IDC",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Microsoft IDC."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2026 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2022 - 2024",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-20",
    "name": "Gaurav Sen",
    "degree": "B.Tech IT - AIT Pune '15",
    "currentJob": "Founder & Educator at Concept & System Design",
    "company": "InterviewReady",
    "location": "Bengaluru, India",
    "bio": "Systems architect, educator, and technical author. Taught distributed systems and microservices to over 150,000 engineers globally.",
    "accentColor": "#d97706",
    "pastClubs": [
      "CP",
      "OSS",
      "ACM"
    ],
    "skills": [
      "System Design",
      "Microservices",
      "Scalability",
      "Architecture"
    ],
    "postsCount": 12,
    "likesCount": 1423,
    "isLiked": false,
    "followers": 3348,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2015,
    "phone": "+91 98201 11020",
    "whatsapp": "+91 98201 11020",
    "careerTimeline": [
      {
        "role": "Founder & Educator",
        "company": "InterviewReady",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at InterviewReady."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2017 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2013 - 2015",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-21",
    "name": "Rhea Chatterjee",
    "degree": "B.Tech CSE - AIT Pune '21",
    "currentJob": "AI Alignment Researcher at Anthropic",
    "company": "Anthropic",
    "location": "San Francisco, CA",
    "bio": "Mechanistic interpretability of large language models, constitutional AI safeguards, and representation engineering. Graduated top of CSE class.",
    "accentColor": "#8b5cf6",
    "pastClubs": [
      "OSS",
      "CP",
      "Math Society"
    ],
    "skills": [
      "Interpretability",
      "TransformerLens",
      "Python",
      "Safety"
    ],
    "postsCount": 15,
    "likesCount": 1490,
    "isLiked": true,
    "followers": 3490,
    "isFollowing": true,
    "domain": "AI & ML",
    "batch": 2021,
    "phone": "+91 98201 11021",
    "whatsapp": "+91 98201 11021",
    "careerTimeline": [
      {
        "role": "AI Alignment Researcher",
        "company": "Anthropic",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Anthropic."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2023 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2019 - 2021",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-22",
    "name": "Manish Tiwari",
    "degree": "B.Tech ECE - AIT Pune '17",
    "currentJob": "Director of Embedded Security at Qualcomm",
    "company": "Qualcomm",
    "location": "San Diego, CA",
    "bio": "Hardware root-of-trust, secure bootloaders, and cryptographic accelerator silicon for mobile and automotive platforms.",
    "accentColor": "#dc2626",
    "pastClubs": [
      "Cybersecurity",
      "Robotics"
    ],
    "skills": [
      "Secure Boot",
      "Hardware Security",
      "ARM TrustZone",
      "Cryptanalysis"
    ],
    "postsCount": 18,
    "likesCount": 1557,
    "isLiked": false,
    "followers": 3632,
    "isFollowing": false,
    "domain": "Cybersecurity",
    "batch": 2017,
    "phone": "+91 98201 11022",
    "whatsapp": "+91 98201 11022",
    "careerTimeline": [
      {
        "role": "Director of Embedded Security",
        "company": "Qualcomm",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Qualcomm."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2019 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2015 - 2017",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-23",
    "name": "Deepika Verma",
    "degree": "B.Tech IT - AIT Pune '24",
    "currentJob": "Frontend Engineer at Vercel",
    "company": "Vercel",
    "location": "Bengaluru, India",
    "bio": "Next.js performance optimizations, Server Components, and edge compute rendering. Creator of popular open-source UI libraries and devtools.",
    "accentColor": "#0284c7",
    "pastClubs": [
      "OSS",
      "GDG",
      "Design & Media"
    ],
    "skills": [
      "Next.js",
      "React",
      "Web Vitals",
      "TypeScript"
    ],
    "postsCount": 21,
    "likesCount": 1624,
    "isLiked": false,
    "followers": 3774,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2024,
    "phone": "+91 98201 11023",
    "whatsapp": "+91 98201 11023",
    "careerTimeline": [
      {
        "role": "Frontend Engineer",
        "company": "Vercel",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Vercel."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2026 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2022 - 2024",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-24",
    "name": "Sameer Malhotra",
    "degree": "B.Tech Mech - AIT Pune '16",
    "currentJob": "Director of Aerodynamics at McLaren Racing",
    "company": "McLaren Racing",
    "location": "Woking, UK",
    "bio": "Formula 1 aerodynamic CFD, wind tunnel surface correlation, and ground effect floor vortex generation. Living his childhood dream on the F1 grid.",
    "accentColor": "#ea580c",
    "pastClubs": [
      "Formula Student",
      "Robotics"
    ],
    "skills": [
      "F1 Aerodynamics",
      "Wind Tunnel Testing",
      "OpenFOAM",
      "Carbon Composites"
    ],
    "postsCount": 24,
    "likesCount": 1691,
    "isLiked": false,
    "followers": 3916,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2016,
    "phone": "+91 98201 11024",
    "whatsapp": "+91 98201 11024",
    "careerTimeline": [
      {
        "role": "Director of Aerodynamics",
        "company": "McLaren Racing",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at McLaren Racing."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2018 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2014 - 2016",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-25",
    "name": "Aakash Banerjee",
    "degree": "B.Tech CSE - AIT Pune '20",
    "currentJob": "Senior Cloud Architect at Netflix",
    "company": "Netflix",
    "location": "Los Gatos, CA",
    "bio": "Global content delivery network (Open Connect), edge transcoding pipelines, and chaos engineering resiliency for 250M+ global streamers.",
    "accentColor": "#e11d48",
    "pastClubs": [
      "OSS",
      "GDG",
      "CP"
    ],
    "skills": [
      "Chaos Eng",
      "Cassandra",
      "AWS",
      "Golang"
    ],
    "postsCount": 27,
    "likesCount": 1758,
    "isLiked": true,
    "followers": 4058,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2020,
    "phone": "+91 98201 11025",
    "whatsapp": "+91 98201 11025",
    "careerTimeline": [
      {
        "role": "Senior Cloud Architect",
        "company": "Netflix",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Netflix."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2022 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2018 - 2020",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-26",
    "name": "Rajeshwar Varma",
    "degree": "B.Tech IT - AIT Pune '17",
    "currentJob": "Lead Infrastructure Architect at Databricks",
    "company": "Databricks",
    "location": "Amsterdam, Netherlands",
    "bio": "Apache Spark internals, lakehouse data engines, and unified governance layers. Scaling multi-cloud data planes processing exabytes daily.",
    "accentColor": "#0891b2",
    "pastClubs": [
      "OSS",
      "ACM"
    ],
    "skills": [
      "Scala",
      "Spark",
      "Kubernetes",
      "Lakehouse"
    ],
    "postsCount": 5,
    "likesCount": 1825,
    "isLiked": false,
    "followers": 4200,
    "isFollowing": true,
    "domain": "Software Eng",
    "batch": 2017,
    "phone": "+91 98201 11026",
    "whatsapp": "+91 98201 11026",
    "careerTimeline": [
      {
        "role": "Lead Infrastructure Architect",
        "company": "Databricks",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Databricks."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2019 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2015 - 2017",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-27",
    "name": "Dr. Sanjana Nair",
    "degree": "B.Tech CSE - AIT Pune '15",
    "currentJob": "Research Scientist at OpenAI",
    "company": "OpenAI",
    "location": "San Francisco, CA",
    "bio": "Reinforcement Learning from Human Feedback (RLHF), reasoning benchmarks, and agent tool use. Ph.D. in Computer Science from UC Berkeley.",
    "accentColor": "#10b981",
    "pastClubs": [
      "OSS",
      "Math Society",
      "CP"
    ],
    "skills": [
      "RLHF",
      "Deep RL",
      "Transformers",
      "Python"
    ],
    "postsCount": 8,
    "likesCount": 1892,
    "isLiked": false,
    "followers": 4342,
    "isFollowing": false,
    "domain": "AI & ML",
    "batch": 2015,
    "phone": "+91 98201 11027",
    "whatsapp": "+91 98201 11027",
    "careerTimeline": [
      {
        "role": "Research Scientist",
        "company": "OpenAI",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at OpenAI."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2017 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2013 - 2015",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-28",
    "name": "Alok Tripathi",
    "degree": "B.Tech ECE - AIT Pune '18",
    "currentJob": "Principal GPU Kernel Engineer at Nvidia",
    "company": "Nvidia",
    "location": "Santa Clara, CA",
    "bio": "CUDA kernel optimization for Blackwell & Hopper GPU architectures, Tensor Cores, and ultra-high bandwidth NVLink fabric scaling.",
    "accentColor": "#76b900",
    "pastClubs": [
      "Robotics",
      "Quant Club"
    ],
    "skills": [
      "CUDA",
      "C++",
      "GPU Arch",
      "Parallel Computing"
    ],
    "postsCount": 11,
    "likesCount": 159,
    "isLiked": false,
    "followers": 4484,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2018,
    "phone": "+91 98201 11028",
    "whatsapp": "+91 98201 11028",
    "careerTimeline": [
      {
        "role": "Principal GPU Kernel Engineer",
        "company": "Nvidia",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Nvidia."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2020 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2016 - 2018",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-29",
    "name": "Trisha Mukherjee",
    "degree": "B.Tech IT - AIT Pune '22",
    "currentJob": "Senior Backend Engineer at Uber",
    "company": "Uber Technologies",
    "location": "Bengaluru, India",
    "bio": "Dynamic surge pricing engines, geospatial clustering, and distributed dispatch algorithms. Active Women in Tech mentor and hackathon judge.",
    "accentColor": "#000000",
    "pastClubs": [
      "GDG",
      "CP",
      "Rotaract Club"
    ],
    "skills": [
      "Go",
      "Kafka",
      "Redis",
      "Distributed Systems"
    ],
    "postsCount": 14,
    "likesCount": 226,
    "isLiked": true,
    "followers": 4626,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2022,
    "phone": "+91 98201 11029",
    "whatsapp": "+91 98201 11029",
    "careerTimeline": [
      {
        "role": "Senior Backend Engineer",
        "company": "Uber Technologies",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Uber Technologies."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2024 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2020 - 2022",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-30",
    "name": "Bhavesh Patel",
    "degree": "B.Tech CSE - AIT Pune '19",
    "currentJob": "Staff Data Engineer at Swiggy",
    "company": "Swiggy",
    "location": "Bengaluru, India",
    "bio": "Real-time delivery routing, clickstream event ingestion, and real-time order tracking pipelines handling 100,000 requests per second.",
    "accentColor": "#f97316",
    "pastClubs": [
      "OSS",
      "CP"
    ],
    "skills": [
      "Flink",
      "Kafka",
      "Java",
      "ClickHouse"
    ],
    "postsCount": 17,
    "likesCount": 293,
    "isLiked": false,
    "followers": 4768,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2019,
    "phone": "+91 98201 11030",
    "whatsapp": "+91 98201 11030",
    "careerTimeline": [
      {
        "role": "Staff Data Engineer",
        "company": "Swiggy",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Swiggy."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2021 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2017 - 2019",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-31",
    "name": "Nidhi Kaushik",
    "degree": "B.Tech CSE - AIT Pune '16",
    "currentJob": "Vice President of Product at Postman",
    "company": "Postman",
    "location": "San Francisco, CA",
    "bio": "Leading developer collaboration, API governance, and AI-assisted workspace tools for over 30 million developers across the globe.",
    "accentColor": "#ff6c37",
    "pastClubs": [
      "Design & Media",
      "GDG",
      "Debating Society"
    ],
    "skills": [
      "API Design",
      "Product Strategy",
      "Developer Experience"
    ],
    "postsCount": 20,
    "likesCount": 360,
    "isLiked": false,
    "followers": 4910,
    "isFollowing": true,
    "domain": "Product & Design",
    "batch": 2016,
    "phone": "+91 98201 11031",
    "whatsapp": "+91 98201 11031",
    "careerTimeline": [
      {
        "role": "Vice President of Product",
        "company": "Postman",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Postman."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2018 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2014 - 2016",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-32",
    "name": "Rahul Somvanshi",
    "degree": "B.Tech Mech - AIT Pune '14",
    "currentJob": "Chief Aeronautical Scientist at DRDO",
    "company": "DRDO - Defence Research & Development Org",
    "location": "Hyderabad, India",
    "bio": "Hypersonic aerodynamic flutter analysis, composite materials for missile airframes, and telemetry sensors. National Defence Technology Awardee.",
    "accentColor": "#1e3a8a",
    "pastClubs": [
      "Robotics",
      "Formula Student"
    ],
    "skills": [
      "Hypersonic CFD",
      "Nastran",
      "Composite Design"
    ],
    "postsCount": 23,
    "likesCount": 427,
    "isLiked": false,
    "followers": 5052,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2014,
    "phone": "+91 98201 11032",
    "whatsapp": "+91 98201 11032",
    "careerTimeline": [
      {
        "role": "Chief Aeronautical Scientist",
        "company": "DRDO - Defence Research & Development Org",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at DRDO - Defence Research & Development Org."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2016 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2012 - 2014",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-33",
    "name": "Aniket Jadhav",
    "degree": "B.Tech IT - AIT Pune '21",
    "currentJob": "Engineering Lead at CRED",
    "company": "CRED",
    "location": "Bengaluru, India",
    "bio": "High-throughput credit card statement parsing, gamified user rewards architecture, and instant bank-to-bank settlement systems.",
    "accentColor": "#1f2937",
    "pastClubs": [
      "GDG",
      "CP Club"
    ],
    "skills": [
      "Kotlin",
      "Spring WebFlux",
      "Postgres",
      "Redis"
    ],
    "postsCount": 26,
    "likesCount": 494,
    "isLiked": true,
    "followers": 694,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2021,
    "phone": "+91 98201 11033",
    "whatsapp": "+91 98201 11033",
    "careerTimeline": [
      {
        "role": "Engineering Lead",
        "company": "CRED",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at CRED."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2023 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2019 - 2021",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-34",
    "name": "Sanya Khurana",
    "degree": "B.Tech CSE - AIT Pune '20",
    "currentJob": "Senior Cloud Security Engineer at CrowdStrike",
    "company": "CrowdStrike",
    "location": "Dublin, Ireland",
    "bio": "Cloud workload protection, Falcon kernel sensor agents, and real-time detection of container escape techniques across multi-cloud environments.",
    "accentColor": "#dc2626",
    "pastClubs": [
      "Cybersecurity",
      "OSS"
    ],
    "skills": [
      "eBPF",
      "Go",
      "Kernel Security",
      "Cloud Sec"
    ],
    "postsCount": 29,
    "likesCount": 561,
    "isLiked": false,
    "followers": 836,
    "isFollowing": false,
    "domain": "Cybersecurity",
    "batch": 2020,
    "phone": "+91 98201 11034",
    "whatsapp": "+91 98201 11034",
    "careerTimeline": [
      {
        "role": "Senior Cloud Security Engineer",
        "company": "CrowdStrike",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at CrowdStrike."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2022 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2018 - 2020",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-35",
    "name": "Vivek Ramachandran",
    "degree": "B.Tech CSE - AIT Pune '17",
    "currentJob": "Quantitative Trader at Jane Street",
    "company": "Jane Street",
    "location": "London, UK",
    "bio": "Microstructure arbitrage, automated ETF market making, and functional programming in OCaml for low-latency exchange interfaces.",
    "accentColor": "#0284c7",
    "pastClubs": [
      "Quant Club",
      "CP",
      "Math Society"
    ],
    "skills": [
      "OCaml",
      "Quantitative Trading",
      "Market Microstructure",
      "C++"
    ],
    "postsCount": 7,
    "likesCount": 628,
    "isLiked": false,
    "followers": 978,
    "isFollowing": false,
    "domain": "Finance & Quant",
    "batch": 2017,
    "phone": "+91 98201 11035",
    "whatsapp": "+91 98201 11035",
    "careerTimeline": [
      {
        "role": "Quantitative Trader",
        "company": "Jane Street",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Jane Street."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2019 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2015 - 2017",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-36",
    "name": "Meenal Sethi",
    "degree": "B.Tech IT - AIT Pune '19",
    "currentJob": "Staff UX Architect at Figma",
    "company": "Figma",
    "location": "New York, NY",
    "bio": "Canvas rendering ergonomics, multi-cursor collaborative multiplayer, and spatial typography toolkits. Design systems speaker at Config.",
    "accentColor": "#a259ff",
    "pastClubs": [
      "Design & Media",
      "Fine Arts"
    ],
    "skills": [
      "Design Systems",
      "Interaction Design",
      "Figma",
      "Design Tokens"
    ],
    "postsCount": 10,
    "likesCount": 695,
    "isLiked": false,
    "followers": 1120,
    "isFollowing": true,
    "domain": "Product & Design",
    "batch": 2019,
    "phone": "+91 98201 11036",
    "whatsapp": "+91 98201 11036",
    "careerTimeline": [
      {
        "role": "Staff UX Architect",
        "company": "Figma",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Figma."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2021 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2017 - 2019",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-37",
    "name": "Rohit Verma",
    "degree": "B.Tech ECE - AIT Pune '15",
    "currentJob": "Principal Silicon Architect at Intel Labs",
    "company": "Intel Corporation",
    "location": "Portland, OR",
    "bio": "Neuromorphic computing architecture, spiking neural networks, and energy-efficient post-CMOS silicon research. 14 granted patents.",
    "accentColor": "#0071c5",
    "pastClubs": [
      "Robotics",
      "IEEE Student Branch"
    ],
    "skills": [
      "Neuromorphic Silicon",
      "Verilog",
      "Computer Architecture"
    ],
    "postsCount": 13,
    "likesCount": 762,
    "isLiked": true,
    "followers": 1262,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2015,
    "phone": "+91 98201 11037",
    "whatsapp": "+91 98201 11037",
    "careerTimeline": [
      {
        "role": "Principal Silicon Architect",
        "company": "Intel Corporation",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Intel Corporation."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2017 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2013 - 2015",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-38",
    "name": "Parul Aggarwal",
    "degree": "B.Tech CSE - AIT Pune '22",
    "currentJob": "Lead Mobile Architect at Zomato",
    "company": "Zomato",
    "location": "Gurugram, India",
    "bio": "Architected Zomato's 60fps mobile delivery tracking, live rider telemetry animations, and instant dining reservations.",
    "accentColor": "#e23744",
    "pastClubs": [
      "GDG",
      "OSS",
      "Cultural Club"
    ],
    "skills": [
      "React Native",
      "Swift",
      "Kotlin",
      "Performance"
    ],
    "postsCount": 16,
    "likesCount": 829,
    "isLiked": false,
    "followers": 1404,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2022,
    "phone": "+91 98201 11038",
    "whatsapp": "+91 98201 11038",
    "careerTimeline": [
      {
        "role": "Lead Mobile Architect",
        "company": "Zomato",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Zomato."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2024 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2020 - 2022",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-39",
    "name": "Akhil Menon",
    "degree": "B.Tech IT - AIT Pune '18",
    "currentJob": "Forward Deployed Engineer at Palantir",
    "company": "Palantir Technologies",
    "location": "London, UK",
    "bio": "Deploying Palantir Foundry across large industrial manufacturing and healthcare networks. Specializing in ontology data pipelines and ontology modeling.",
    "accentColor": "#111827",
    "pastClubs": [
      "CP Club",
      "OSS"
    ],
    "skills": [
      "Java",
      "Distributed Data",
      "Foundry",
      "TypeScript"
    ],
    "postsCount": 19,
    "likesCount": 896,
    "isLiked": false,
    "followers": 1546,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2018,
    "phone": "+91 98201 11039",
    "whatsapp": "+91 98201 11039",
    "careerTimeline": [
      {
        "role": "Forward Deployed Engineer",
        "company": "Palantir Technologies",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Palantir Technologies."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2020 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2016 - 2018",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-40",
    "name": "Shweta Kulkarni",
    "degree": "B.Tech Mech - AIT Pune '18",
    "currentJob": "Dynamic Controls Engineer at Boston Dynamics",
    "company": "Boston Dynamics",
    "location": "Waltham, MA",
    "bio": "Whole-body balance control, hydraulic actuator modeling, and dynamic trajectory optimization for bipedal and quadrupedal robotic platforms.",
    "accentColor": "#f59e0b",
    "pastClubs": [
      "Robotics",
      "Formula Student"
    ],
    "skills": [
      "Optimal Control",
      "C++",
      "MuJoCo",
      "Robotics Dynamics"
    ],
    "postsCount": 22,
    "likesCount": 963,
    "isLiked": false,
    "followers": 1688,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2018,
    "phone": "+91 98201 11040",
    "whatsapp": "+91 98201 11040",
    "careerTimeline": [
      {
        "role": "Dynamic Controls Engineer",
        "company": "Boston Dynamics",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Boston Dynamics."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2020 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2016 - 2018",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-41",
    "name": "Deepak Rawat",
    "degree": "B.Tech CSE - AIT Pune '16",
    "currentJob": "Engineering Director at Atlassian",
    "company": "Atlassian",
    "location": "Sydney, Australia",
    "bio": "Leading global cloud multi-tenant architecture, Jira enterprise scale, and zero-downtime database sharding for 250,000+ business customers.",
    "accentColor": "#0052cc",
    "pastClubs": [
      "OSS",
      "CP",
      "GDG"
    ],
    "skills": [
      "Java",
      "AWS",
      "Engineering Management",
      "Distributed DBs"
    ],
    "postsCount": 25,
    "likesCount": 1030,
    "isLiked": true,
    "followers": 1830,
    "isFollowing": true,
    "domain": "Software Eng",
    "batch": 2016,
    "phone": "+91 98201 11041",
    "whatsapp": "+91 98201 11041",
    "careerTimeline": [
      {
        "role": "Engineering Director",
        "company": "Atlassian",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Atlassian."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2018 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2014 - 2016",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-42",
    "name": "Monalisa Das",
    "degree": "B.Tech IT - AIT Pune '23",
    "currentJob": "Generative AI Engineer at Canva",
    "company": "Canva",
    "location": "Sydney, Australia",
    "bio": "Diffusion models for text-to-graphics generation, style transfer, and spatial layout reasoning for Canva Magic Studio tools.",
    "accentColor": "#00c4cc",
    "pastClubs": [
      "OSS",
      "Design & Media"
    ],
    "skills": [
      "Diffusion Models",
      "PyTorch",
      "Wasm",
      "TypeScript"
    ],
    "postsCount": 28,
    "likesCount": 1097,
    "isLiked": false,
    "followers": 1972,
    "isFollowing": false,
    "domain": "AI & ML",
    "batch": 2023,
    "phone": "+91 98201 11042",
    "whatsapp": "+91 98201 11042",
    "careerTimeline": [
      {
        "role": "Generative AI Engineer",
        "company": "Canva",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Canva."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2025 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2021 - 2023",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-43",
    "name": "Varun Teja",
    "degree": "B.Tech CSE - AIT Pune '18",
    "currentJob": "Quantitative Developer at Two Sigma",
    "company": "Two Sigma Investments",
    "location": "New York, NY",
    "bio": "Petabyte-scale distributed market backtesting frameworks, tick data compression, and predictive alpha feature extraction pipelines.",
    "accentColor": "#3b82f6",
    "pastClubs": [
      "Quant Club",
      "CP Club"
    ],
    "skills": [
      "C++20",
      "Python",
      "High Performance Computing",
      "KDB+/Q"
    ],
    "postsCount": 6,
    "likesCount": 1164,
    "isLiked": false,
    "followers": 2114,
    "isFollowing": false,
    "domain": "Finance & Quant",
    "batch": 2018,
    "phone": "+91 98201 11043",
    "whatsapp": "+91 98201 11043",
    "careerTimeline": [
      {
        "role": "Quantitative Developer",
        "company": "Two Sigma Investments",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Two Sigma Investments."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2020 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2016 - 2018",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-44",
    "name": "Prateek Srivastava",
    "degree": "B.Tech ECE - AIT Pune '17",
    "currentJob": "Staff AI Engineer at Adobe Sensei",
    "company": "Adobe",
    "location": "Noida, India",
    "bio": "Photoshop generative fill, neural image enhancement filters, and lightweight inference runtimes on mobile hardware.",
    "accentColor": "#ff0000",
    "pastClubs": [
      "Robotics",
      "OSS"
    ],
    "skills": [
      "Deep Learning",
      "TensorRT",
      "C++",
      "Image Processing"
    ],
    "postsCount": 9,
    "likesCount": 1231,
    "isLiked": false,
    "followers": 2256,
    "isFollowing": false,
    "domain": "AI & ML",
    "batch": 2017,
    "phone": "+91 98201 11044",
    "whatsapp": "+91 98201 11044",
    "careerTimeline": [
      {
        "role": "Staff AI Engineer",
        "company": "Adobe",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Adobe."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2019 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2015 - 2017",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-45",
    "name": "Aishwarya Pillai",
    "degree": "B.Tech IT - AIT Pune '20",
    "currentJob": "Senior Machine Learning Engineer at Spotify",
    "company": "Spotify",
    "location": "Stockholm, Sweden",
    "bio": "Collaborative filtering, podcast recommendation algorithms, and reinforcement learning for home screen discovery personalization.",
    "accentColor": "#1db954",
    "pastClubs": [
      "GDG",
      "CP",
      "Cultural Club"
    ],
    "skills": [
      "Recommendation Systems",
      "PyTorch",
      "Kubeflow",
      "GCP"
    ],
    "postsCount": 12,
    "likesCount": 1298,
    "isLiked": true,
    "followers": 2398,
    "isFollowing": false,
    "domain": "AI & ML",
    "batch": 2020,
    "phone": "+91 98201 11045",
    "whatsapp": "+91 98201 11045",
    "careerTimeline": [
      {
        "role": "Senior Machine Learning Engineer",
        "company": "Spotify",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Spotify."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2022 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2018 - 2020",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-46",
    "name": "Chetan Godbole",
    "degree": "B.Tech Mech - AIT Pune '15",
    "currentJob": "Gas Turbine Aero Lead at Siemens Energy",
    "company": "Siemens Energy",
    "location": "Munich, Germany",
    "bio": "High-efficiency hydrogen gas turbine blade cooling, conjugate heat transfer (CHT) analysis, and additive metal manufacturing.",
    "accentColor": "#00646e",
    "pastClubs": [
      "Formula Student",
      "Nature Club"
    ],
    "skills": [
      "CFD",
      "Turbomachinery",
      "CHT Analysis",
      "Ansys"
    ],
    "postsCount": 15,
    "likesCount": 1365,
    "isLiked": false,
    "followers": 2540,
    "isFollowing": true,
    "domain": "Hardware & Robotics",
    "batch": 2015,
    "phone": "+91 98201 11046",
    "whatsapp": "+91 98201 11046",
    "careerTimeline": [
      {
        "role": "Gas Turbine Aero Lead",
        "company": "Siemens Energy",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Siemens Energy."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2017 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2013 - 2015",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-47",
    "name": "Riddhi Mahajan",
    "degree": "B.Tech CSE - AIT Pune '21",
    "currentJob": "Senior Growth Product Manager at HubSpot",
    "company": "HubSpot",
    "location": "Boston, MA",
    "bio": "Self-serve onboarding funnels, monetization experiments, and behavioral cohort retention modeling for HubSpot CRM.",
    "accentColor": "#ff7a59",
    "pastClubs": [
      "Design & Media",
      "E-Cell"
    ],
    "skills": [
      "Product Growth",
      "A/B Testing",
      "Mixpanel",
      "SQL"
    ],
    "postsCount": 18,
    "likesCount": 1432,
    "isLiked": false,
    "followers": 2682,
    "isFollowing": false,
    "domain": "Product & Design",
    "batch": 2021,
    "phone": "+91 98201 11047",
    "whatsapp": "+91 98201 11047",
    "careerTimeline": [
      {
        "role": "Senior Growth Product Manager",
        "company": "HubSpot",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at HubSpot."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2023 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2019 - 2021",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-48",
    "name": "Taranjeet Singh",
    "degree": "B.Tech Mech - AIT Pune '16",
    "currentJob": "Director of Supply Chain Tech at Flipkart",
    "company": "Flipkart",
    "location": "Bengaluru, India",
    "bio": "Automated guided vehicles (AGVs), automated sortation belts, and warehouse robotic telemetry across Flipkart fulfillment centers.",
    "accentColor": "#2874f0",
    "pastClubs": [
      "Robotics",
      "Formula Student"
    ],
    "skills": [
      "Warehouse Automation",
      "AGV Systems",
      "Industrial IoT"
    ],
    "postsCount": 21,
    "likesCount": 1499,
    "isLiked": false,
    "followers": 2824,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2016,
    "phone": "+91 98201 11048",
    "whatsapp": "+91 98201 11048",
    "careerTimeline": [
      {
        "role": "Director of Supply Chain Tech",
        "company": "Flipkart",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Flipkart."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2018 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2014 - 2016",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-49",
    "name": "Smriti Pandey",
    "degree": "B.Tech IT - AIT Pune '22",
    "currentJob": "Developer Relations Engineer at GitHub",
    "company": "GitHub",
    "location": "Bellevue, WA",
    "bio": "GitHub Actions ecosystem, developer tool advocacy, open-source security maintainer education, and technical conference keynote speaker.",
    "accentColor": "#24292e",
    "pastClubs": [
      "OSS Club",
      "GDG",
      "Debating Society"
    ],
    "skills": [
      "GitHub Actions",
      "Go",
      "TypeScript",
      "Public Speaking"
    ],
    "postsCount": 24,
    "likesCount": 1566,
    "isLiked": true,
    "followers": 2966,
    "isFollowing": false,
    "domain": "Software Eng",
    "batch": 2022,
    "phone": "+91 98201 11049",
    "whatsapp": "+91 98201 11049",
    "careerTimeline": [
      {
        "role": "Developer Relations Engineer",
        "company": "GitHub",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at GitHub."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2024 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2020 - 2022",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  },
  {
    "id": "alum-50",
    "name": "Gaurang Shah",
    "degree": "B.Tech ECE - AIT Pune '19",
    "currentJob": "ADAS Radar Architect at Mercedes-Benz",
    "company": "Mercedes-Benz R&D",
    "location": "Bengaluru, India",
    "bio": "Level 3 autonomous driving radar signal processing, 77 GHz imaging radar chirp sequences, and Euro NCAP safety compliance.",
    "accentColor": "#00adef",
    "pastClubs": [
      "Robotics",
      "IEEE Student Branch"
    ],
    "skills": [
      "Automotive Radar",
      "DSP",
      "MATLAB",
      "ISO 26262"
    ],
    "postsCount": 27,
    "likesCount": 1633,
    "isLiked": false,
    "followers": 3108,
    "isFollowing": false,
    "domain": "Hardware & Robotics",
    "batch": 2019,
    "phone": "+91 98201 11050",
    "whatsapp": "+91 98201 11050",
    "careerTimeline": [
      {
        "role": "ADAS Radar Architect",
        "company": "Mercedes-Benz R&D",
        "period": "2023 - Present",
        "desc": "Leading high-impact initiatives and technological innovations at Mercedes-Benz R&D."
      },
      {
        "role": "Senior Specialist",
        "company": "Industry Peer",
        "period": "2021 - 2023",
        "desc": "Advanced engineering delivery and architecture design."
      },
      {
        "role": "Core Lead",
        "company": "AIT Pune",
        "period": "2017 - 2019",
        "desc": "Active student leader and mentor across campus clubs."
      }
    ]
  }
];

// App State - versioned storage key v5 ensuring all 50+ rich alumni profiles load
const ALUMNI_STORAGE_KEY = 'campus_alumni_data_v5';
let storedAlumni = null;
try {
  const raw = localStorage.getItem(ALUMNI_STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length >= 45 && parsed[0].phone) {
      storedAlumni = parsed;
    }
  }
} catch (e) {
  console.warn("Could not read alumni localStorage", e);
}
let alumniList = storedAlumni || ALUMNI_DATA;
try {
  localStorage.setItem(ALUMNI_STORAGE_KEY, JSON.stringify(alumniList));
} catch(e) {}
let activeSearchQuery = "";
let activeDomainFilter = "all";
let activeBatchFilter = "all";
let activeClubFilter = "all";
let activeSortFilter = "followers";

// DOM Elements
const searchHeroInput = document.getElementById("searchHeroInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const heroFilterBtn = document.getElementById("heroFilterBtn");
const filterDropdownPanel = document.getElementById("filterDropdownPanel");
const heroFilterBadgeDot = document.getElementById("heroFilterBadgeDot");

const dockedFloatingBar = document.getElementById("dockedFloatingBar");
const dockedSearchInput = document.getElementById("dockedSearchInput");
const dockedFilterTrigger = document.getElementById("dockedFilterTrigger");
const dockedFilterMenu = document.getElementById("dockedFilterMenu");
const searchFilterSection = document.getElementById("searchFilterSection");

const alumniCardsGrid = document.getElementById("alumniCardsGrid");
const batchSelect = document.getElementById("batchSelect");
const clubSelect = document.getElementById("clubSelect");
const sortSelect = document.getElementById("sortSelect");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");

const profileModal = document.getElementById("profileModal");
const modalContentInner = document.getElementById("modalContentInner");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const toastBar = document.getElementById("toastBar");

// ==========================================================================
// SCROLL DETECTION: DOCK SEARCH BAR & FILTERS TO TOP-RIGHT
// ==========================================================================
function initScrollDocking() {
  window.addEventListener("scroll", () => {
    if (!searchFilterSection || !dockedFloatingBar) return;
    const rect = searchFilterSection.getBoundingClientRect();
    
    // When the hero search bar scrolls up past top threshold
    if (rect.bottom < 30) {
      dockedFloatingBar.classList.add("is-visible");
    } else {
      dockedFloatingBar.classList.remove("is-visible");
      if (dockedFilterMenu) dockedFilterMenu.classList.remove("show");
    }
  });

  // Docked Filter Trigger
  if (dockedFilterTrigger) {
    dockedFilterTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      dockedFilterMenu.classList.toggle("show");
    });
  }

  document.addEventListener("click", (e) => {
    if (dockedFilterMenu && !dockedFilterMenu.contains(e.target) && e.target !== dockedFilterTrigger) {
      dockedFilterMenu.classList.remove("show");
    }
    if (filterDropdownPanel && !filterDropdownPanel.contains(e.target) && e.target !== heroFilterBtn && !heroFilterBtn.contains(e.target)) {
      filterDropdownPanel.classList.remove("show");
      if (heroFilterBtn) heroFilterBtn.classList.remove("active");
    }
  });

  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// ==========================================================================
// SEARCH & FILTER HANDLING
// ==========================================================================
function syncSearch(query) {
  activeSearchQuery = query.trim().toLowerCase();
  if (searchHeroInput) searchHeroInput.value = query;
  if (dockedSearchInput) dockedSearchInput.value = query;
  
  if (clearSearchBtn) {
    clearSearchBtn.style.display = query ? "inline-flex" : "none";
  }

  renderCards();
}

function setDomainFilter(domain) {
  activeDomainFilter = domain;
  document.querySelectorAll(".domain-chip").forEach(chip => {
    if (chip.dataset.domain === domain) chip.classList.add("active");
    else chip.classList.remove("active");
  });

  const dDomain = document.getElementById("dockedDomainSelect");
  if (dDomain) dDomain.value = domain;

  updateFilterIndicators();
  renderCards();
}

function updateFilterIndicators() {
  const isFiltered = activeDomainFilter !== "all" || activeBatchFilter !== "all" || activeClubFilter !== "all";
  if (heroFilterBadgeDot) {
    heroFilterBadgeDot.style.display = isFiltered ? "inline-block" : "none";
  }
}

function resetAll() {
  activeSearchQuery = "";
  activeDomainFilter = "all";
  activeBatchFilter = "all";
  activeClubFilter = "all";
  activeSortFilter = "followers";

  if (searchHeroInput) searchHeroInput.value = "";
  if (dockedSearchInput) dockedSearchInput.value = "";
  if (clearSearchBtn) clearSearchBtn.style.display = "none";
  if (batchSelect) batchSelect.value = "all";
  if (clubSelect) clubSelect.value = "all";
  if (sortSelect) sortSelect.value = "followers";

  const dDomain = document.getElementById("dockedDomainSelect");
  const dBatch = document.getElementById("dockedBatch");
  const dClub = document.getElementById("dockedClub");
  const dSort = document.getElementById("dockedSort");
  if (dDomain) dDomain.value = "all";
  if (dBatch) dBatch.value = "all";
  if (dClub) dClub.value = "all";
  if (dSort) dSort.value = "followers";

  document.querySelectorAll(".domain-chip").forEach(chip => {
    if (chip.dataset.domain === "all") chip.classList.add("active");
    else chip.classList.remove("active");
  });

  updateFilterIndicators();
  showToast("Filters reset to default.");
  renderCards();
}

function getFilteredList() {
  return alumniList.filter(alumni => {
    if (activeSearchQuery) {
      const matchName = alumni.name.toLowerCase().includes(activeSearchQuery);
      const matchDegree = alumni.degree.toLowerCase().includes(activeSearchQuery);
      const matchJob = alumni.currentJob.toLowerCase().includes(activeSearchQuery);
      const matchBio = alumni.bio.toLowerCase().includes(activeSearchQuery);
      const matchClubs = alumni.pastClubs.some(c => c.toLowerCase().includes(activeSearchQuery));
      const matchSkills = alumni.skills.some(s => s.toLowerCase().includes(activeSearchQuery));

      if (!matchName && !matchDegree && !matchJob && !matchBio && !matchClubs && !matchSkills) {
        return false;
      }
    }

    if (activeDomainFilter !== "all" && alumni.domain !== activeDomainFilter) {
      return false;
    }

    if (activeBatchFilter !== "all" && alumni.batch.toString() !== activeBatchFilter) {
      return false;
    }

    if (activeClubFilter !== "all") {
      const matchClub = alumni.pastClubs.some(c => c.toLowerCase().includes(activeClubFilter.toLowerCase()));
      if (!matchClub) return false;
    }

    return true;
  }).sort((a, b) => {
    if (activeSortFilter === "followers") return b.followers - a.followers;
    if (activeSortFilter === "batch-new") return b.batch - a.batch;
    if (activeSortFilter === "batch-old") return a.batch - b.batch;
    if (activeSortFilter === "name") return a.name.localeCompare(b.name);
    return 0;
  });
}

// ==========================================================================
// RENDER COMPACT CARDS (Click anywhere on card to open detailed profile)
// ==========================================================================
function renderCards() {
  if (!alumniCardsGrid) return;
  const list = getFilteredList();

  const counterEl = document.getElementById("alumniCountBadge");
  if (counterEl) {
    counterEl.innerHTML = `<i class="fas fa-graduation-cap"></i> Alumni (${list.length * 333 || 2000})`;
  }

  if (list.length === 0) {
    alumniCardsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 18px; border: 1px dashed #e2e8f0;">
        <i class="fas fa-search" style="font-size: 2.2rem; color: #94a3b8; margin-bottom: 12px; display: block;"></i>
        <h3 style="font-family: var(--font-heading); color: #1e1b4b; font-size: 1.3rem; margin-bottom: 6px;">No Alumni Found</h3>
        <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 16px;">Try adjusting your search keywords or resetting filters.</p>
        <button class="search-submit-btn" style="margin: 0 auto;" onclick="resetAll()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  alumniCardsGrid.innerHTML = list.map(alumni => {
    return `
      <div class="alumni-card" style="--card-accent: ${alumni.accentColor || '#6d28d9'};" onclick="openProfile('${alumni.id}')" title="Tap to view full profile of ${alumni.name}">
        <div>
          <!-- Top Avatar Row with Green Indicator Dot -->
          <div class="card-avatar-row">
            <div class="avatar-container">
              <div class="avatar-circle">
                <i class="fas fa-user"></i>
              </div>
              <div class="status-indicator-dot" title="Active on Campus Connect"></div>
            </div>
          </div>

          <!-- Alumni Name & Degree Info -->
          <h3 class="alumni-name-text">${alumni.name}</h3>
          <div class="alumni-dept-text">${alumni.degree}</div>
          <div class="alumni-job-text">
            <i class="fas fa-briefcase"></i> ${alumni.currentJob}
          </div>

          <!-- PAST CLUB AFFILIATIONS (Soft Purple Badges) -->
          <div class="section-heading-caps">Past Club Affiliations</div>
          <div class="pill-group">
            ${alumni.pastClubs.map(club => `<span class="club-pill">${club}</span>`).join('')}
          </div>

          <!-- SKILLS (Soft Pink/Red Badges) -->
          <div class="section-heading-caps">Skills</div>
          <div class="pill-group">
            ${alumni.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
          </div>

          <!-- DIRECT CONTACT ACTIONS (Call, WhatsApp, View) -->
          <div class="alumni-card-actions" onclick="event.stopPropagation();">
            <a href="tel:${(alumni.phone || '+91 98201 11001').replace(/[^0-9+]/g, '')}" class="btn-alumni-action call-btn" title="Call ${alumni.name}">
              <i class="fas fa-phone-alt"></i> Call
            </a>
            <a href="https://wa.me/${(alumni.whatsapp || alumni.phone || '919820111001').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(alumni.name)},%20connecting%20via%20CampusConnect!" target="_blank" rel="noopener noreferrer" class="btn-alumni-action wa-btn" title="Chat on WhatsApp with ${alumni.name}">
              <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <button class="btn-alumni-action profile-btn" onclick="openProfile('${alumni.id}')" title="View Detailed Profile">
              <i class="fas fa-external-link-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// PROFILE MODAL (FULL BIO, STATS, FOLLOW, TIMELINE)
// ==========================================================================
function openProfile(alumniId) {
  const alumni = alumniList.find(a => a.id === alumniId);
  if (!alumni || !profileModal || !modalContentInner) return;

  const isFollowing = alumni.isFollowing;
  const isLiked = alumni.isLiked;

  modalContentInner.innerHTML = `
    <!-- Header: Avatar + Identity -->
    <div class="modal-header-row">
      <div style="display: flex; align-items: center; gap: 16px;">
        <div class="avatar-circle" style="width: 58px; height: 58px; font-size: 1.7rem;">
          <i class="fas fa-user"></i>
        </div>
        <div>
          <h2 style="font-family: var(--font-heading); color: #1e1b4b; font-size: 1.4rem; font-weight: 800;">${alumni.name}</h2>
          <div style="color: #64748b; font-size: 0.88rem; font-weight: 600;">${alumni.degree} &bull; ${alumni.location}</div>
          <div style="color: var(--brand-purple); font-size: 0.92rem; font-weight: 700; margin-top: 2px;">
            <i class="fas fa-briefcase"></i> ${alumni.currentJob}
          </div>
        </div>
      </div>
    </div>

    <!-- Full Bio of the person -->
    <p style="color: #334155; font-size: 0.93rem; line-height: 1.6; margin-top: 12px; margin-bottom: 14px;">${alumni.bio}</p>

    <!-- Modal Stats Bar & Follow Button (Posts, Likes, Followers) -->
    <div class="modal-stats-bar">
      <span class="modal-stat-item" title="Alumni Posts">
        <i class="fas fa-file-alt"></i> ${alumni.postsCount} posts
      </span>
      <span class="modal-stat-item" onclick="toggleLikeInModal('${alumni.id}')" title="Click to Like">
        <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i> ${alumni.likesCount} likes
      </span>
      <span class="modal-stat-item" title="Followers">
        <i class="fas fa-users"></i> ${formatFollowers(alumni.followers)} followers
      </span>

      <button class="modal-follow-btn ${isFollowing ? 'following' : ''}" onclick="toggleFollowInModal('${alumni.id}')">
        ${isFollowing ? '✓ Following' : '+ Follow'}
      </button>
    </div>

    <!-- Career Journey -->
    <div class="section-heading-caps" style="margin-top: 16px;">Post-College Career Journey</div>
    <div class="modal-career-timeline">
      ${alumni.careerTimeline ? alumni.careerTimeline.map(step => `
        <div>
          <div class="timeline-step-role">${step.role}</div>
          <div class="timeline-step-company">${step.company} &bull; ${step.period}</div>
          <div class="timeline-step-desc">${step.desc}</div>
        </div>
      `).join('') : '<p>Journey details coming soon.</p>'}
    </div>

    <!-- Past Club Affiliations -->
    <div class="section-heading-caps" style="margin-top: 18px;">Past College Club Affiliations</div>
    <div class="pill-group">
      ${alumni.pastClubs.map(c => `<span class="club-pill" style="font-size: 0.82rem; padding: 5px 10px;">${c}</span>`).join('')}
    </div>

    <!-- Domain Skills & Expertise -->
    <div class="section-heading-caps" style="margin-top: 14px;">Domain Skills & Expertise</div>
    <div class="pill-group">
      ${alumni.skills.map(s => `<span class="skill-pill" style="font-size: 0.82rem; padding: 5px 10px;">${s}</span>`).join('')}
    </div>

    <!-- Contact & Connect Action -->
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="tel:${(alumni.phone || '+91 98201 11001').replace(/[^0-9+]/g, '')}" class="btn-alumni-action call-btn" style="height: 38px; padding: 0 16px; font-size: 0.86rem; text-decoration: none;">
          <i class="fas fa-phone-alt"></i> Call (${alumni.phone || '+91 98201 11001'})
        </a>
        <a href="https://wa.me/${(alumni.whatsapp || alumni.phone || '919820111001').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(alumni.name)},%20connecting%20via%20CampusConnect!" target="_blank" rel="noopener noreferrer" class="btn-alumni-action wa-btn" style="height: 38px; padding: 0 16px; font-size: 0.86rem; text-decoration: none;">
          <i class="fab fa-whatsapp"></i> WhatsApp (${alumni.whatsapp || '+91 98201 11001'})
        </a>
      </div>
      <button class="search-submit-btn" onclick="showToast('Connection request sent to ${alumni.name}!'); closeProfile();">
        <i class="fas fa-paper-plane"></i> Connect
      </button>
    </div>
  `;

  profileModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProfile() {
  if (profileModal) {
    profileModal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function toggleFollowInModal(alumniId) {
  const item = alumniList.find(a => a.id === alumniId);
  if (!item) return;

  item.isFollowing = !item.isFollowing;
  if (item.isFollowing) {
    item.followers += 1;
    showToast(`You are now following ${item.name}!`);
  } else {
    item.followers -= 1;
    showToast(`Unfollowed ${item.name}.`);
  }

  saveData();
  openProfile(alumniId); // re-render modal with updated follow state
}

function toggleLikeInModal(alumniId) {
  const item = alumniList.find(a => a.id === alumniId);
  if (!item) return;

  item.isLiked = !item.isLiked;
  if (item.isLiked) {
    item.likesCount += 1;
    showToast(`Liked ${item.name}'s profile!`);
  } else {
    item.likesCount -= 1;
  }

  saveData();
  openProfile(alumniId); // re-render modal with updated likes
}

function formatFollowers(num) {
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num;
}

function saveData() {
  localStorage.setItem(ALUMNI_STORAGE_KEY, JSON.stringify(alumniList));
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(msg) {
  if (!toastBar) return;
  toastBar.textContent = msg;
  toastBar.style.display = "block";
  setTimeout(() => {
    toastBar.style.display = "none";
  }, 2600);
}

// ==========================================================================
// INITIALIZATION (Handles both loading & ready states)
// ==========================================================================
function initAlumniDirectory() {
  // Hero Search Input
  if (searchHeroInput) {
    searchHeroInput.addEventListener("input", (e) => syncSearch(e.target.value));
  }
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => syncSearch(""));
  }

  // Hero Filters Button
  if (heroFilterBtn && filterDropdownPanel) {
    heroFilterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      filterDropdownPanel.classList.toggle("show");
      heroFilterBtn.classList.toggle("active");
    });
  }

  // Docked Search Input
  if (dockedSearchInput) {
    dockedSearchInput.addEventListener("input", (e) => syncSearch(e.target.value));
  }

  // Domain Filter Chips
  document.querySelectorAll(".domain-chip").forEach(chip => {
    chip.addEventListener("click", () => setDomainFilter(chip.dataset.domain));
  });

  // Docked Domain Select
  const dDomain = document.getElementById("dockedDomainSelect");
  if (dDomain) {
    dDomain.addEventListener("change", (e) => setDomainFilter(e.target.value));
  }

  // Select Filters in Hero Filter Panel
  if (batchSelect) {
    batchSelect.addEventListener("change", (e) => {
      activeBatchFilter = e.target.value;
      const dBatch = document.getElementById("dockedBatch");
      if (dBatch) dBatch.value = e.target.value;
      updateFilterIndicators();
      renderCards();
    });
  }

  if (clubSelect) {
    clubSelect.addEventListener("change", (e) => {
      activeClubFilter = e.target.value;
      const dClub = document.getElementById("dockedClub");
      if (dClub) dClub.value = e.target.value;
      updateFilterIndicators();
      renderCards();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSortFilter = e.target.value;
      const dSort = document.getElementById("dockedSort");
      if (dSort) dSort.value = e.target.value;
      renderCards();
    });
  }

  // Docked Select Filters
  const dBatch = document.getElementById("dockedBatch");
  if (dBatch) {
    dBatch.addEventListener("change", (e) => {
      activeBatchFilter = e.target.value;
      if (batchSelect) batchSelect.value = e.target.value;
      updateFilterIndicators();
      renderCards();
    });
  }

  const dClub = document.getElementById("dockedClub");
  if (dClub) {
    dClub.addEventListener("change", (e) => {
      activeClubFilter = e.target.value;
      if (clubSelect) clubSelect.value = e.target.value;
      updateFilterIndicators();
      renderCards();
    });
  }

  const dSort = document.getElementById("dockedSort");
  if (dSort) {
    dSort.addEventListener("change", (e) => {
      activeSortFilter = e.target.value;
      if (sortSelect) sortSelect.value = e.target.value;
      renderCards();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetAll);
  }

  // Modal Close
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProfile);
  }
  if (profileModal) {
    profileModal.addEventListener("click", (e) => {
      if (e.target === profileModal) closeProfile();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProfile();
  });

  // Scroll listener for top-right docking
  initScrollDocking();

  // Initial Card Render
  renderCards();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAlumniDirectory);
} else {
  initAlumniDirectory();
}
