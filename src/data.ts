export const RESUME_DATA = {
  name: "Chavva Akshay Kumar Reddy",
  role: "Software Engineering — Front-end Development — AI and Data Analytics",
  contact: {
    email: "akshay.shashank.brahma@gmail.com",
    phone: "+91 9652439730",
    linkedin: "linkedin.com/in/akshay-kumar-reddy-chavva-0a43b1381",
    github: "github.com/tonyboss365"
  },
  summary: "Computer Science and Engineering student with a CGPA of 9.8. Experienced in building AI-powered systems and full-stack web applications using Python, Java, React, and FastAPI. Developed deployed platforms including real-time AI conversation analytics and customer behavior dashboards.",
  education: [
    { school: "KL University, Hyderabad", degree: "B.Tech in Computer Science and Engineering", duration: "2024 – 2028", gpa: "9.8 / 10", url: "https://www.kluniversity.in/" },
    { school: "Narayana Junior College", degree: "Intermediate (MPC)", duration: "2022 – 2024", gpa: "97.4%", url: "https://www.narayanagroup.com/" },
    { school: "Ravindra Bharathi High School", degree: "SSC", duration: "2022", gpa: "10 / 10", url: "https://rbschools.in/" }
  ],
  skills: {
    programming: ["Python", "Java", "C", "JavaScript", "TypeScript"],
    frontend: ["HTML", "CSS", "React.js", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets"],
    databases: ["MySQL", "MongoDB", "SQLite", "Firebase", "Supabase"],
    ai_data: ["NumPy", "Pandas", "Scikit-learn", "Machine Learning"],
    tools: ["Git", "GitHub", "VS Code", "Vercel", "Render", "Railway"],
    core_cs: ["Data Structures", "Algorithms", "Object-Oriented Programming", "DBMS", "Operating Systems", "Computer Networks"]
  },
  projects: [
    {
      name: "Richard Mille RM 53-02 Showcase",
      desc: "Highly immersive, cinema-grade digital product showcase for the iconic Richard Mille RM 53-02 Tourbillon Sapphire.",
      longDesc: "A highly immersive, cinema-grade digital product showcase for the iconic Richard Mille RM 53-02 Tourbillon Sapphire. Engineered with a philosophy matching the timepiece itself, the application pushes modern web boundaries through performance-optimized web standards.",
      tech: ["HTML5 Canvas", "Web Audio API", "CSS Blend", "GSAP", "TypeScript"],
      live: "rm-designer-website.vercel.app",
      image: "/placeholder.svg",
      features: [
        "Immersive 360° Watch Scrubbing: Utilizes a custom 360-frame canvas animation engine with linear interpolation (LERP) that rotates the sapphire watch body based on scroll velocity.",
        "Multilayered Ambient Soundscapes: Dynamic Web Audio API controller that crossfades audio streams based on scroll depth to replicate deep sea descent.",
        "Cinematic Visual Polish: Responsive widescreen letterbox framing, magnetic custom cursor lens with difference blend modes, and dynamic scanline overlays.",
        "Smooth Mobile Responsiveness: Compact HUD overlays, dual-column metrics grid, proper click focus handling, and layout flow avoiding overlaps."
      ]
    },
    {
      name: "Learn-Flow",
      desc: "AI-Powered Course Creation & Learning Platform",
      longDesc: "An institutional-grade, AI-powered course creation and learning management platform built to optimize both student and instructor workflows. Features a highly contextual AI tutor, robust quiz engines with analytics, an advanced 5-step guided course creation wizard with automated AI copy generators, and seamless role-based authentication.",
      tech: ["React", "Supabase", "DevCore Neural Engine", "Tailwind CSS", "PostgreSQL"],
      github: "github.com/tonyboss365/Learn-Flow",
      live: "learn-flow-kappa.vercel.app",
      image: "/learn-flow-preview.png",
      features: [
        "Personalized Student Dashboard with lesson tracking & AI recommendations",
        "Contextual AI Tutor (Chat) powered by proprietary DevCore Neural Engine Integration",
        "5-step guided Instructor Course Creation Wizard with video uploads",
        "Quiz Engine with timed MCQs, instant scoring, and performance analytics",
        "Auto-generated Course Completion Certificates with verification codes",
        "Secure role-based access routing & Session persistence via Supabase"
      ]
    },
    {
      name: "GLYCOS AI",
      desc: "Client-Side Metabolic Intelligence Platform",
      longDesc: "A client-side metabolic intelligence platform designed to compute susceptibility indexes using standardized multivariate logistic regression. The engine operates entirely in the browser, featuring clinical text parsing, an in-browser Gradient Descent solver, and interactive visualization charts.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Logistic Regression", "Gradient Descent", "Chart.js"],
      github: "github.com/tonyboss365/GLYCOS.ai",
      live: "glycos-ai.vercel.app",
      image: "/placeholder.svg",
      features: [
        "In-Browser ML Calibration Dashboard with a Batch Gradient Descent solver trained on the Pima Indians Cohort",
        "Multivariate Logistic Regression Solver with standard z-score standardized parameters",
        "NLP Clinical Parser utilizing custom regex mappings to extract values from unstructured text reports",
        "Interactive visualization suite featuring risk score gauges, biomarker contributions charts, and probability bell curves",
        "AI Consultation Desk featuring a contextual chatbot for clinical guidance"
      ]
    },
    {
      name: "SYNTEX AI",
      desc: "Next-Gen Interactive AI Compiler Studio & IDE",
      longDesc: "A premium, high-performance compiler workspace and interactive visual environment. Developed to bridge the gap between AI-driven assistance and classical compiler construction, it provides a visually stunning, reactive dashboard to write, parse, optimize, and translate code in real-time.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Compiler Pipeline", "OpenRouter API", "GitHub Models"],
      github: "github.com/tonyboss365/SYNTEX-AI",
      live: "syntex-ai.vercel.app",
      image: "/placeholder.svg",
      features: [
        "Advanced Compiler Pipeline featuring lexical analysis, AST generation, semantic validation, optimization passes, and sandboxed execution",
        "Multi-Tab File Manager supporting dynamic file creation, removal, and active tab tracking",
        "AI Diagnostic Panel offering real-time code analysis, structural correction proposals, and auto-apply code refactoring",
        "Context-Aware SYNTEX Chat linked to the active file, selected tab, or entire workspace context",
        "Premium interactive UI with cursor-tracking light-following hover borders and subtle micro-grain background noise"
      ]
    },
    {
      name: "ORB Chronicles",
      desc: "Cinematic Interactive Solar System Explorer",
      longDesc: "A high-fidelity cinematic digital chronicle. An interactive architecture of gravity designed to chart planetary nodes and orbital telemetry in extreme brutalist contrast.",
      tech: ["WebGL", "Three.js", "Web Audio API", "Video Scrub API", "CSS Blend"],
      live: "orb-designer-solar-system.vercel.app",
      image: "/orb-preview.png",
      features: [
        "Camera-driven descent through a generative 3D procedural space helix.",
        "Nine monochromatic planetary cards with structured facts drawer.",
        "Frame-scrubbed full-screen 3D solar flare gas simulation via scroll.",
        "Magnetic cursor ring with mix-blend-mode difference inversion over panels.",
        "Procedural soundscape with synthesized space chimes and static ripples.",
        "Glassmorphic slide-in panels presenting deep space telemetry and facts."
      ]
    },
    {
      name: "FEDF Front-End Projects",
      desc: "Interactive front-end mini-games, dynamic tools, and UI templates.",
      longDesc: "A collection of basic front-end development mini-projects featuring interactive JavaScript mini-games, dynamic randomness tools, a multi-purpose math calculator, and modern custom authentication templates, all optimized for responsive performance and hosted via GitHub Pages.",
      tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      github: "github.com/tonyboss365/fedf-projects",
      live: "tonyboss365.github.io/fedf-projects",
      image: "/placeholder.svg",
      features: [
        "Mini Games built with interactive, state-driven vanilla JS logic",
        "Fun with Randomness generators and probability calculators",
        "Multi-Calculator utility featuring clean input layout & operations",
        "Modern, responsive custom login and sign-up Authentication UI templates"
      ]
    },
    {
      name: "AweTales Sentinel",
      desc: "Real-Time AI Conversation Intelligence System",
      longDesc: "A production-grade AI platform that monitors and analyzes conversations in real-time. Leverages FastAPI WebSockets for live data streaming, integrates multiple LLM APIs for sentiment analysis and intent detection, and surfaces actionable insights through an interactive dashboard.",
      tech: ["FastAPI", "WebSockets", "LLM APIs", "Python", "React"],
      github: "github.com/tonyboss365/awetales-sentinel",
      live: "awetales-sentinel.vercel.app/login",
      image: "/placeholder.svg",
      features: ["Real-time sentiment analysis", "Multi-LLM integration", "Live WebSocket streaming", "Interactive analytics dashboard"]
    },
    {
      name: "RevIntel",
      desc: "Customer Churn Analytics Platform",
      longDesc: "An end-to-end analytics platform that predicts customer churn using machine learning models trained on behavioral data. Features interactive data visualizations, cohort analysis, and revenue forecasting to help businesses retain customers proactively.",
      tech: ["Analytics", "Churn Prediction", "Python", "Scikit-learn", "React"],
      github: "github.com/tonyboss365/revintel-platform",
      live: "revintel-platform.vercel.app",
      image: "/placeholder.svg",
      features: ["ML-powered churn prediction", "Cohort analysis", "Revenue forecasting", "Interactive visualizations"]
    },
    {
      name: "Campus Share",
      desc: "Student Resource Sharing Platform",
      longDesc: "A full-stack collaborative platform enabling students to share notes, assignments, and study materials securely. Built with React and robust authentication, it features real-time updates, file versioning, and course-based organization.",
      tech: ["React", "Authentication", "Node.js", "MongoDB"],
      github: "github.com/tonyboss365/campus-share",
      live: "campus-share-eight.vercel.app",
      image: "/placeholder.svg",
      features: ["Secure file sharing", "Real-time collaboration", "Course-based organization", "Version control"]
    },
    {
      name: "Peer-to-Peer File Sharing",
      desc: "Browser-based peer-to-peer file transfer",
      longDesc: "A serverless file transfer application that uses WebRTC for direct browser-to-browser communication. Files are transferred end-to-end encrypted without touching a server, with Socket.IO handling peer discovery and signaling.",
      tech: ["WebRTC", "Socket.IO", "JavaScript", "Node.js"],
      github: "github.com/tonyboss365/p2p-sharing",
      image: "/p2p-preview.png",
      aiImage: true,
      features: ["End-to-end encryption", "Zero server storage", "Real-time transfer progress", "Multi-file support"]
    },
    {
      name: "Library Management System",
      desc: "Database-driven book management",
      longDesc: "A robust desktop-grade library management application with full CRUD operations. Features member management, book cataloging, loan tracking, overdue notifications, and comprehensive reporting — all backed by a normalized MySQL database.",
      tech: ["Java", "MySQL", "JDBC", "Swing"],
      image: "/library-preview.png",
      aiImage: true,
      features: ["Book catalog management", "Member loan tracking", "Overdue notifications", "Reporting & analytics"]
    },
    {
      name: "CFO Helper",
      desc: "Financial Analytics Tool",
      longDesc: "An interactive financial analytics tool designed for CFOs and financial analysts. Provides budget planning, cash flow projections, scenario modeling, and KPI dashboards in a clean, responsive interface that requires no backend infrastructure.",
      tech: ["Interactive UI", "JavaScript", "Chart.js"],
      github: "github.com/tonyboss365/CFO-HELPER",
      live: "tonyboss365.github.io/CFO-HELPER",
      image: "/cfo-preview.png",
      features: ["Budget planning", "Cash flow projection", "Scenario modeling", "KPI dashboards"]
    },
    {
      name: "Student Grievance Management System",
      desc: "System for managing student grievances",
      longDesc: "A full-stack institutional platform for managing student grievances end-to-end. Features role-based access (Student, Staff, Admin), automated ticket routing, email notifications, SLA tracking, and a powerful admin analytics dashboard.",
      tech: ["Node.js", "Express", "MySQL", "React"],
      github: "github.com/tonyboss365/Student-Grivence-Management",
      live: "student-grivence-management.onrender.com",
      image: "/placeholder.svg",
      features: ["Role-based access control", "Automated ticket routing", "SLA tracking", "Admin analytics"]
    }
  ],
  hackathons: [
    "Rampage Hackathon — KLH University",
    "AI Summit Hackathon — Telangana’s Largest AI Hackathon",
    "Hack Ananta — Google Developer Groups Hackathon",
    "Smart India Hackathon (SIH) 2025 — National Level Participant",
    "Smart India Hackathon (SIH) 2024 — National Level Participant"
  ],
  coursework: [
    "Data Structures", "Object-Oriented Programming", "Database Management Systems", "Operating Systems",
    "Artificial Intelligence and Machine Learning", "Linear Algebra and Calculus", "Discrete Mathematics", "Probability and Statistics"
  ],
  interests: [
    "Front-end Development", "Artificial Intelligence", "Data Analytics", "Financial Technology (FinTech)", "Product Development", 
    "Technology Marketing", "AI-Assisted Coding", "Digital Content Creation (Photo & Video Editing)", "Rapid Prototyping"
  ],
  codingProfiles: [
    { name: "LeetCode", url: "https://leetcode.com/u/IJLMMOwY4o", username: "IJLMMOwY4o", detail: "Active Problem Solver" },
    { name: "CodeChef", url: "https://codechef.com/users/klh2420030604", username: "klh2420030604", detail: "Competitive Programmer" },
    { name: "GitHub", url: "https://github.com/tonyboss365", username: "tonyboss365", detail: "Open Source Contributor" }
  ]
};
