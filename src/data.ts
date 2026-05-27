export const RESUME_DATA = {
  name: "Chavva Akshay Kumar Reddy",
  role: "Software Engineering — Front-end Development — AI and Data Analytics",
  contact: {
    email: "akshay.shashank.brahma@gmail.com",
    phone: "+91 9652439730",
    linkedin: "linkedin.com/in/akshay-kumar-reddy-chavva-0a43b1381",
    github: "github.com/tonyboss365"
  },
  summary: "Computer Science and Engineering student with a CGPA of 9.77. Experienced in building AI-powered systems and full-stack web applications using Python, Java, React, and FastAPI. Developed deployed platforms including real-time AI conversation analytics and customer behavior dashboards.",
  education: [
    { school: "KL University, Hyderabad", degree: "B.Tech in Computer Science and Engineering", duration: "2024 – Present", gpa: "9.77 / 10", url: "https://www.kluniversity.in/" },
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
      name: "Learn-Flow",
      desc: "AI-Powered Course Creation & Learning Platform",
      longDesc: "An institutional-grade, AI-powered course creation and learning management platform built to optimize both student and instructor workflows. Features a highly contextual AI tutor, robust quiz engines with analytics, an advanced 5-step guided course creation wizard with automated AI copy generators, and seamless role-based authentication.",
      tech: ["React", "Supabase", "NVIDIA Nemotron", "OpenRouter", "Tailwind CSS", "PostgreSQL"],
      github: "github.com/tonyboss365/Learn-Flow",
      live: "learn-flow-kappa.vercel.app",
      image: "/learn-flow-preview.png",
      features: [
        "Personalized Student Dashboard with lesson tracking & AI recommendations",
        "Contextual AI Tutor (Chat) powered by NVIDIA Nemotron via OpenRouter",
        "5-step guided Instructor Course Creation Wizard with video uploads",
        "Quiz Engine with timed MCQs, instant scoring, and performance analytics",
        "Auto-generated Course Completion Certificates with verification codes",
        "Secure role-based access routing & Session persistence via Supabase"
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
