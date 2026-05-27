/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { RESUME_DATA } from "./data";
import { getSkillIcon } from "./components/SkillIcons";
import { DotFieldLoader } from "./components/DotFieldLoader";


// ── Skills Details Dictionary ─────────────────────────────────────────
const SKILLS_DETAILS: Record<string, string> = {
  "Python": "Expertise in building AI/ML predictive analytics, natural language processing applications, and backend RESTful APIs using FastAPI and Flask.",
  "Java": "Solid understanding of Object-Oriented Programming (OOP) architectures, multithreading, JDBC connectivity, and desktop applications using Java Swing.",
  "C": "Deep foundational knowledge of low-level systems programming, pointers, manual memory allocation, and high-performance algorithms.",
  "JavaScript": "Proficient in modern ES6+, async/await paradigms, dynamic DOM manipulation, and interactive stateful client-side architectures.",
  "TypeScript": "Expert in type-safe development, robust interface architectures, strict compile-time checks, and building scalable full-stack applications.",
  "HTML": "Deep expertise in semantic HTML5 structure, search engine optimization (SEO) standard tags, accessibility (ARIA), and structured DOM hierarchies.",
  "CSS": "Advanced layouts utilizing modern CSS Grid and Flexbox, custom variables, keyframe animations, responsive media queries, and transition states.",
  "React.js": "Expert in component lifecycle management, React Hooks, virtual DOM diffing, and performance-focused single-page application (SPA) architectures.",
  "Next.js": "Skilled in hybrid layouts, Server-Side Rendering (SSR), Static Site Generation (SSG), search engine crawler optimization, and route-based code splitting.",
  "Tailwind CSS": "Expertise in utility-first design systems, tailored responsive classes, dynamic custom themes, and creating pixel-perfect fluid components.",
  "Node.js": "Proficient in scalable non-blocking event-driven runtime environments, asynchronous server architectures, and npm dependency workflows.",
  "Express.js": "Experience building clean RESTful routing pipelines, custom security middleware, user session handling, and database integration layers.",
  "FastAPI": "Highly experienced in asynchronous Python APIs, automated OpenAPI Swagger generations, Pydantic data schemas, and high-speed data delivery.",
  "REST APIs": "Expertise in robust server communications, HTTP verb standards, token auth protocols, error handling status codes, and optimized payloads.",
  "WebSockets": "Advanced implementation of real-time bi-directional streaming, live push analytics notification pipelines, and persistent chat sessions.",
  "MySQL": "Expert in relational schema designs, complex JOIN queries, subqueries, primary/foreign indexing, transactional safety, and query plan analysis.",
  "MongoDB": "Proficient in document storage architecture, flexible schemas, dynamic aggregation pipeline queries, and unstructured data handling.",
  "SQLite": "Lightweight client-side relational storage management, transaction locks, robust local data caching, and rapid prototyping workflows.",
  "Firebase": "Proficient in Google Firebase's real-time NoSQL database, Firestore cloud storage, Firebase Authentication, and serverless Cloud Functions for building scalable mobile and web backends.",
  "Supabase": "Experienced with Supabase as an open-source PostgreSQL-backed Backend-as-a-Service — covering row-level security, real-time subscriptions, edge functions, and seamless authentication flows.",
  "NumPy": "Proficient in large-scale multi-dimensional array and matrix computations, vectorizations, and advanced mathematical scripting.",
  "Pandas": "Expertise in high-performance data manipulation, exploratory data analysis (EDA), cleaning null sets, and aggregating tabular datasets.",
  "Scikit-learn": "Experienced in training classification and regression ML models, feature engineering, cross-validation tuning, and churn analytics.",
  "Machine Learning": "Strong grasp of algorithmic architectures including decision trees, linear regressions, clustering models, and analytical forecasting.",
  "Git": "Expert in decentralized version control, resolving merge conflicts, git rebase/cherry-pick commands, and branch flow management.",
  "GitHub": "Proficient in collaborative development workflows, pull request code reviews, release tags, and automated task management.",
  "VS Code": "Advanced customization of workspaces, local history reviews, terminal configurations, and extension-rich debugging setups.",
  "Vercel": "Seamless deployment pipeline integrations, environment variable management, serverless function routing, and edge-side asset delivery.",
  "Render": "Cloud hosting configuration for web application servers, persistent disk mounts, background workers, and PostgreSQL databases.",
  "Railway": "Dynamic cloud database provisioning, high-availability deployments, zero-downtime server updates, and log stream auditing."
};

function getSkillExplanation(skillName: string): string {
  if (SKILLS_DETAILS[skillName]) return SKILLS_DETAILS[skillName];
  
  // Fuzzy matching fallback
  const lower = skillName.toLowerCase();
  for (const [key, value] of Object.entries(SKILLS_DETAILS)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return value;
    }
  }
  
  return `Strong technical expertise in ${skillName}, applying best practices, design patterns, and efficient problem-solving paradigms to build robust projects.`;
}

// ── Markdown-like Formatted Message Renderer ───────────────────────────
function FormattedMessage({ text, onCloseChat }: { text: string; onCloseChat?: () => void }) {
  const navigate = useNavigate();
  const lines = text.split("\n");

  return (
    <div className="space-y-2 font-sans text-xs sm:text-sm text-[#1a1a1a]/95 dark:text-slate-300 leading-relaxed">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        
        // Skip markdown block ticks, placeholders, dividers
        if (
          trimmed.startsWith("```") || 
          trimmed === "[SUGGESTIONS]" || 
          trimmed === "--" || 
          trimmed === "---" || 
          trimmed === ""
        ) {
          return null;
        }

        // Process [NAVIGATE: /route] tags
        if (trimmed.startsWith("[NAVIGATE:") && trimmed.endsWith("]")) {
          const route = trimmed.slice(trimmed.indexOf(":") + 1, -1).trim();
          let label = "Explore Section";
          let icon = "⚡";
          
          if (route === "/education") {
            label = "Jump to Education & Hackathons Timeline";
            icon = "🎓";
          } else if (route === "/skills") {
            label = "Explore Technical Stack & Skills Overview";
            icon = "🛠️";
          } else if (route === "/projects") {
            label = "Explore Selected Custom Projects Portfolio";
            icon = "💻";
          } else if (route === "/") {
            label = "Go back to Home Page";
            icon = "🏠";
          }

          return (
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              key={lineIdx}
              onClick={() => {
                navigate(route);
                if (onCloseChat) onCloseChat();
              }}
              className="mt-3 w-full flex items-center justify-between p-3.5 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white rounded-xl text-xs font-mono font-bold cursor-pointer border border-blue-500 dark:border-blue-600 shadow-md transition-all select-none gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm select-none">{icon}</span>
                <span className="font-sans font-bold text-left">{label}</span>
              </div>
              <span className="text-[9px] font-sans font-bold bg-blue-700 dark:bg-blue-800 text-blue-100 border border-blue-800 px-2 py-0.5 rounded shadow-sm shrink-0">
                REDIRECT →
              </span>
            </motion.button>
          );
        }

        // Handle headers (### or ## or #)
        if (trimmed.startsWith("###") || trimmed.startsWith("##") || trimmed.startsWith("#")) {
          const cleanText = trimmed.replace(/^#+\s*/, "");
          return (
            <h4 key={lineIdx} className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 font-mono mt-4 mb-1.5 uppercase tracking-wider">
              {cleanText}
            </h4>
          );
        }

        // Handle clean headers that are just bolded (e.g. **CONCLUSION**) on a line by itself
        if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.includes(" ", trimmed.length - 3) && trimmed.length < 30) {
          const cleanText = trimmed.slice(2, -2).trim();
          return (
            <h4 key={lineIdx} className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 font-mono mt-4 mb-1.5 uppercase tracking-wider">
              {cleanText}
            </h4>
          );
        }
        
        // Handle bullet points
        const isBullet = trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.startsWith("•");
        const content = isBullet ? trimmed.substring(1).trim() : line;
        
        if (content.trim() === "" || content.trim() === "--") {
          return null;
        }
        
        // Process bold (**...**) within the line
        const parts = content.split(/(\*\*.*?\*\*)/g);
        const processedContent = parts.map((part, partIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            const innerText = part.slice(2, -2);
            return (
              <strong key={partIdx} className="text-blue-600 dark:text-blue-400 font-bold font-mono">
                {innerText}
              </strong>
            );
          }
          return <span key={partIdx}>{part}</span>;
        });

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex gap-2 pl-2">
              <span className="text-blue-500 dark:text-blue-400 font-bold select-none">•</span>
              <p className="flex-1">{processedContent}</p>
            </div>
          );
        }

        return (
          <p key={lineIdx} className="min-h-[1em]">
            {processedContent}
          </p>
        );
      })}
    </div>
  );
}


// ── Project Thumbnail Renderer with gorgeous fallback gradients ──────
const ProjectThumbnail = ({ proj, className = "w-full h-full object-cover" }: { proj: (typeof RESUME_DATA.projects)[0]; className?: string }) => {
  const [loadError, setLoadError] = useState(false);
  const isPlaceholder = proj.image === "/placeholder.svg" || !proj.image;

  if (isPlaceholder && proj.live && !loadError) {
    const liveScreenshotUrl = `https://api.microlink.io/?url=https://${proj.live}&screenshot=true&embed=screenshot.url`;
    return (
      <img
        src={liveScreenshotUrl}
        alt={proj.name}
        className={className}
        onError={() => setLoadError(true)}
        loading="lazy"
      />
    );
  }

  if (isPlaceholder) {
    const gradients = [
      "from-blue-600 to-indigo-700",
      "from-violet-600 to-fuchsia-700",
      "from-emerald-500 to-teal-700",
      "from-rose-500 to-red-700",
      "from-cyan-500 to-blue-600"
    ];
    const hash = proj.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const selectedGradient = gradients[hash % gradients.length];

    return (
      <div className={`w-full h-full bg-gradient-to-br ${selectedGradient} flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner mb-3">
          <span className="text-xl font-mono font-bold text-white tracking-widest">{proj.name.substring(0, 2).toUpperCase()}</span>
        </div>
        <h4 className="text-white text-sm font-bold tracking-tight px-4 line-clamp-1">{proj.name}</h4>
        <p className="text-white/70 text-[10px] font-mono mt-1 px-4 line-clamp-2 leading-tight max-w-xs">{proj.desc}</p>
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 opacity-90">
          {proj.tech?.slice(0, 2).map((t) => (
            <span key={t} className="text-[8px] bg-white/15 text-white/90 px-2 py-0.5 rounded-full border border-white/10 font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <img
      src={proj.image}
      alt={proj.name}
      className={className}
    />
  );
};

// ── Custom Chat Bot Vector Logo ──────────────────────────────────────
const ChatBotLogo = ({ className = "w-6 h-6", fillColor = "currentColor" }: { className?: string; fillColor?: string }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="55" r="35" fill={fillColor} />
      <circle cx="16" cy="55" r="10" fill={fillColor} />
      <rect x="26" y="16" width="6" height="20" transform="rotate(-30 26 16)" fill={fillColor} />
      <circle cx="21" cy="14" r="7" fill={fillColor} />
      <path d="M 75,50 C 75,34 62,24 47,24 C 32,24 23,35 23,49 C 23,61 31,69 41,71 L 34,81 L 49,76 C 64,76 75,65 75,50 Z" fill="white" />
      <circle cx="43" cy="46" r="6" fill={fillColor} />
      <circle cx="61" cy="46" r="6" fill={fillColor} />
    </svg>
  );
};

// ── Page Components ───────────────────────────────────────────────────

function Home() {
  return (
    <>
      <Header />
      <section className="mt-16">
        <h2 className="text-sm font-mono text-[#1a1a1a]/50 dark:text-slate-400 uppercase mb-8 tracking-wider">Professional Summary</h2>
        <p className="text-[#1a1a1a]/85 dark:text-slate-200 leading-relaxed font-sans text-lg max-w-2xl">
          {RESUME_DATA.summary}
        </p>
      </section>

      {/* Flagship Highlight Widget */}
      <section className="mt-20 space-y-6">
        <h2 className="text-sm font-mono text-[#1a1a1a]/50 dark:text-slate-400 uppercase tracking-wider">Flagship Innovations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learn-Flow AI Platform */}
          <div className="p-8 border border-blue-500/20 dark:border-blue-500/35 bg-blue-50/10 dark:bg-slate-900/30 rounded-sm flex flex-col justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-950/40 px-2 py-0.5 rounded-sm uppercase tracking-wider">Platform Innovation</span>
              <h3 className="text-xl font-bold mt-2 text-[#1a1a1a] dark:text-slate-100">Learn-Flow AI Platform</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mt-2 font-sans leading-relaxed">
                An institutional-grade, open-source education-tech application integrating customizable lesson planning wizards and dynamic AI tutor workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link to="/projects" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-mono font-bold text-xs rounded-sm transition-all shadow-sm flex items-center justify-center cursor-pointer">
                EXPLORE
              </Link>
              <button
                onClick={() => {
                  const event = new CustomEvent("trigger-ai-chat", { detail: "Tell me about Learn-Flow" });
                  window.dispatchEvent(event);
                }}
                className="px-4 py-2 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-mono font-bold text-xs rounded-sm transition-all flex items-center justify-center cursor-pointer"
              >
                ASK AI
              </button>
            </div>
          </div>

          {/* Student Grievance Management System */}
          <div className="p-8 border border-blue-500/20 dark:border-blue-500/35 bg-blue-50/10 dark:bg-slate-900/30 rounded-sm flex flex-col justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-950/40 px-2 py-0.5 rounded-sm uppercase tracking-wider">Institutional System</span>
              <h3 className="text-xl font-bold mt-2 text-[#1a1a1a] dark:text-slate-100">Student Grievance System</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mt-2 font-sans leading-relaxed">
                A full-stack enterprise institutional platform for managing student grievances end-to-end with automated routing, email alerts, and SLA dashboards.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link to="/projects" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-mono font-bold text-xs rounded-sm transition-all shadow-sm flex items-center justify-center cursor-pointer">
                EXPLORE
              </Link>
              <button
                onClick={() => {
                  const event = new CustomEvent("trigger-ai-chat", { detail: "Tell me about Student Grievance Management System" });
                  window.dispatchEvent(event);
                }}
                className="px-4 py-2 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-mono font-bold text-xs rounded-sm transition-all flex items-center justify-center cursor-pointer"
              >
                ASK AI
              </button>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

// ── Hover Preview Skill Card ──────────────────────────────────────────
function HoverSkillCard({ skill, onClick }: { skill: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{ width: 80, height: 80 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      title={skill}
    >
      {/* Base icon card */}
      <div className={`absolute inset-0 bg-white dark:bg-slate-800 border rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-sm transition-all duration-200 z-10 ${hovered ? "border-blue-400 dark:border-blue-500 shadow-md scale-105" : "border-gray-100 dark:border-slate-700"}`}>
        <span className="text-2xl flex items-center justify-center">{getSkillIcon(skill)}</span>
        <span className="text-[9px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider text-center leading-tight px-1 line-clamp-1">{skill}</span>
      </div>

      {/* Layered hover info card — slides up */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 z-30 w-52 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 pointer-events-none"
            style={{ bottom: "calc(100% - 28px)", transformOrigin: "bottom center" }}
          >
            {/* Icon panel */}
            <div className="w-full bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center h-20 mb-3 border border-gray-100 dark:border-slate-700">
              <span className="text-4xl flex items-center justify-center">{getSkillIcon(skill)}</span>
            </div>
            {/* Info */}
            <h4 className="text-sm font-bold text-[#1a1a1a] dark:text-slate-100 leading-snug">{skill}</h4>
            <p className="text-[10px] text-gray-500 dark:text-slate-400 leading-relaxed mt-1 font-sans line-clamp-3">
              {getSkillExplanation(skill)}
            </p>
            <div className="mt-2 flex items-center gap-1 text-[9px] text-blue-500 font-mono font-bold">
              <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" /> Click to open details
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SkillsPage() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section>
      <h2 className="text-2xl font-medium mb-12 tracking-tight flex items-center gap-4 text-[#1a1a1a] dark:text-slate-100">
        <span className="text-blue-600 dark:text-blue-400">02</span> Technical Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {Object.entries(RESUME_DATA.skills).map(([category, items]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-[#e5e7eb] dark:border-slate-800 p-6 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all rounded-xl group"
          >
            <h3 className="text-xs font-mono text-[#1a1a1a]/50 dark:text-slate-400 uppercase mb-5 tracking-wider group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {category.replace(/_/g, ' ')}
            </h3>
            <div className="flex flex-wrap gap-3" style={{ isolation: "isolate" }}>
              {items.map((skill) => (
                <HoverSkillCard
                  key={skill}
                  skill={skill}
                  onClick={() => setActiveSkill(skill)}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill detail modal */}
      <AnimatePresence>
        {activeSkill && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSkill(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-[2px] z-50 cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[92vw] max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-2xl p-7 font-sans flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {getSkillIcon(activeSkill)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-blue-500 dark:text-blue-400 uppercase tracking-widest font-bold">Technology Overview</span>
                    <h3 className="font-bold text-[#1a1a1a] dark:text-slate-100 text-lg leading-tight mt-0.5">{activeSkill}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="text-gray-300 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-slate-700 hover:border-gray-400 rounded-full text-sm transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="py-2 space-y-4">
                <div className="p-4 bg-gray-50/50 dark:bg-slate-950/40 rounded-xl border border-gray-100/50 dark:border-slate-800/40">
                  <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                    {getSkillExplanation(activeSkill)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 dark:text-slate-400 bg-blue-50/20 dark:bg-blue-950/20 px-3.5 py-2.5 rounded-lg border border-blue-100/10 dark:border-blue-900/20">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  Topic verified in Chavva Akshay Kumar Reddy's active stack.
                </div>
              </div>

              {/* Footer buttons */}
              <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
                <button
                  onClick={() => setActiveSkill(null)}
                  className="px-4 py-2 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 font-mono font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  CLOSE
                </button>
                <button
                  onClick={() => {
                    const q = `Explain ${activeSkill} in depth, its core concepts, and how Chavva Akshay Kumar Reddy applies it in his projects.`;
                    setActiveSkill(null);
                    window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: q }));
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ChatBotLogo className="w-3.5 h-3.5" fillColor="white" />
                  ASK AI
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}


// ── Flip Card Grid ─────────────────────────────────────────────────────
type ProjectType = (typeof RESUME_DATA.projects)[0];

function FlipCard({ proj, onOpen }: { proj: ProjectType; onOpen: () => void }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1100px", height: "300px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={onOpen}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.52s cubic-bezier(0.4,0,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Thumbnail */}
          <div className="relative flex-shrink-0" style={{ height: "160px" }}>
            <ProjectThumbnail proj={proj} className="w-full h-full object-cover" />
            {proj.live && (
              <span className="absolute top-2 right-2 flex items-center gap-1 bg-green-500 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow">
                <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
              </span>
            )}
          </div>
          {/* Info */}
          <div className="p-4 flex flex-col flex-1 justify-between min-h-0">
            <div>
              <h3 className="font-bold text-[#1a1a1a] dark:text-slate-100 text-sm mb-0.5 line-clamp-1">{proj.name}</h3>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-mono mb-2 line-clamp-1">{proj.desc}</p>
              <div className="flex flex-wrap gap-1">
                {proj.tech?.slice(0, 3).map(t => (
                  <span key={t} className="text-[9px] bg-gray-50 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-gray-100 dark:border-slate-700 font-mono text-gray-400 dark:text-slate-400">{t}</span>
                ))}
                {proj.tech && proj.tech.length > 3 && (
                  <span className="text-[9px] bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/30 font-mono text-blue-500">+{proj.tech.length - 3}</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-300 dark:text-slate-600 border-t border-gray-100 dark:border-slate-800 pt-2 mt-2">
              <span>Hover to explore</span><span className="text-base leading-none">↺</span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl border border-blue-300/50 dark:border-blue-500/30 bg-white dark:bg-[#07101f] shadow-xl flex flex-col p-5 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-1.5 flex-shrink-0">
            <div>
              <p className="text-[8px] font-mono text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-0.5">Tech Stack</p>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug line-clamp-1">{proj.name}</h3>
            </div>
            {proj.live && (
              <span className="flex items-center gap-1 bg-green-100 dark:bg-green-500/15 border border-green-300 dark:border-green-500/30 text-green-700 dark:text-green-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ml-2">
                <span className="w-1 h-1 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" /> LIVE
              </span>
            )}
          </div>

          <p className="text-[10px] text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-2 flex-shrink-0">{proj.longDesc || proj.desc}</p>

          {/* Scrollable tech list */}
          <div className="flex-1 overflow-y-auto min-h-0 space-y-1 pr-1 scrollbar-thin">
            {proj.tech?.map(t => (
              <div key={t} className="flex items-center gap-2 text-[10px] text-gray-700 dark:text-slate-300 font-mono py-0.5">
                <span className="text-blue-500 dark:text-blue-400 font-bold flex-shrink-0">→</span>
                <span className="flex items-center gap-1.5 min-w-0">
                  <span className="flex-shrink-0">{getSkillIcon(t)}</span>
                  <span className="truncate">{t}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-3 mt-3 flex-shrink-0">
            <span className="text-[9px] text-gray-400 dark:text-slate-600 font-mono">Click to open</span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors">
              View Details →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlipCardGrid({ projects, onOpen }: { projects: ProjectType[]; onOpen: (proj: ProjectType) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((proj) => (
        <FlipCard key={proj.name} proj={proj} onOpen={() => onOpen(proj)} />
      ))}
    </div>
  );
}

// ── ProjectsPage Component ────────────────────────────────────────────
function ProjectsPage() {
  const [selectedProj, setSelectedProj] = useState<(typeof RESUME_DATA.projects)[0] | null>(null);
  const [previewTab, setPreviewTab] = useState<"preview" | "live">("preview");

  const openModal = (proj: (typeof RESUME_DATA.projects)[0]) => {
    setSelectedProj(proj);
    setPreviewTab("preview");
  };

  return (
    <section>
      <h2 className="text-2xl font-medium mb-12 tracking-tight flex items-center gap-4 text-[#1a1a1a] dark:text-slate-100">
        <span className="text-blue-600 dark:text-blue-400">03</span> Selected Projects
      </h2>

      {/* Flip card grid — React-state driven, theme-aware */}
      <FlipCardGrid projects={RESUME_DATA.projects} onOpen={openModal} />
      {/* Project modal — bigger, rounded, Preview/Live toggle */}
      <AnimatePresence>
        {selectedProj && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProj(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-[4px] z-50 cursor-pointer"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              layoutId={`project-card-${selectedProj.name}`}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-[60] flex flex-col overflow-hidden border border-gray-100 dark:border-slate-800"
              style={{ maxHeight: "92vh" }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  {selectedProj.live && (
                    <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/35 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse" />
                      LIVE
                    </span>
                  )}
                  <div>
                    <p className="text-[10px] font-mono text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-0.5">Selected Project</p>
                    <h3 className="text-xl font-bold font-sans text-[#1a1a1a] dark:text-slate-100 leading-tight">{selectedProj.name}</h3>
                    <p className="text-xs font-mono text-gray-400 mt-0.5">{selectedProj.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProj(null)}
                  className="text-gray-300 dark:text-slate-550 hover:text-gray-700 dark:hover:text-slate-300 w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-slate-700 hover:border-gray-400 rounded-full transition-all cursor-pointer text-base shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Modal Body Container */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 pt-4 pb-4 space-y-4 min-h-0 scrollbar-thin">
                {/* Preview / Live tab selector */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewTab("preview")}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-150 ${
                      previewTab === "preview"
                        ? "bg-[#1a1a1a] dark:bg-slate-800 text-white dark:text-slate-100"
                        : "text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-350 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    🖼 PREVIEW
                  </button>
                  {selectedProj.live && (
                    <button
                      onClick={() => setPreviewTab("live")}
                      className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-150 ${
                        previewTab === "live"
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                      }`}
                    >
                      ⚡ LIVE SITE
                    </button>
                  )}
                </div>

                {/* Preview area - responsive height */}
                <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-955 h-[22vh] sm:h-[42vh] shrink-0">
                  {previewTab === "preview" ? (
                    <ProjectThumbnail proj={selectedProj} className="w-full h-full object-cover" />
                  ) : (
                    <iframe
                      src={`https://${selectedProj.live}`}
                      title={selectedProj.name + " live"}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed font-sans">{selectedProj.longDesc || selectedProj.desc}</p>
                  {selectedProj.features && selectedProj.features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {selectedProj.features.slice(0, 4).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-slate-400 font-sans">
                          <span className="text-blue-400 font-bold shrink-0">•</span>
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProj.tech?.map(t => (
                      <span key={t} className="flex items-center gap-1 text-[9px] bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-2 py-0.5 rounded-full font-mono text-gray-400 dark:text-slate-400">
                        {getSkillIcon(t)}<span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-7 py-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-950/60 flex items-center justify-between shrink-0">
                <button
                  onClick={() => setSelectedProj(null)}
                  className="text-xs font-mono text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 cursor-pointer transition-colors"
                >
                  ← Close
                </button>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => {
                      const q = `Tell me about Akshay's project "${selectedProj.name}" and his role in it.`;
                      setSelectedProj(null);
                      window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: q }));
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-300 dark:hover:border-blue-800 font-bold text-xs rounded-xl transition-all font-mono cursor-pointer"
                  >
                    <ChatBotLogo className="w-3.5 h-3.5" fillColor="currentColor" />
                    Ask AI
                  </button>
                  {selectedProj.github && (
                    <a
                      href={`https://${selectedProj.github}`}
                      target="_blank" rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs rounded-xl transition-all font-mono"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {selectedProj.live && (
                    <a
                      href={`https://${selectedProj.live}`}
                      target="_blank" rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all font-mono shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}





// ── EducationPage Component ───────────────────────────────────────────
function EducationPage() {
  return (
    <section>
      <h2 className="text-2xl font-medium mb-12 tracking-tight flex items-center gap-4 text-[#1a1a1a] dark:text-slate-100">
        <span className="text-blue-600 dark:text-blue-400">04</span> Education & Activities
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Timeline details */}
        <div className="space-y-8">
          <h3 className="font-mono text-xs text-[#1a1a1a]/50 dark:text-slate-400 uppercase tracking-wider">Education Timeline</h3>
          <div className="space-y-6">
            {RESUME_DATA.education.map((edu) => (
              <div
                key={edu.school}
                onClick={() => {
                  const q = `Tell me about Akshay's academic achievements, courses, and marks at ${edu.school} for his ${edu.degree}.`;
                  window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: q }));
                }}
                className="p-5 bg-white dark:bg-slate-900 border border-[#e5e7eb] dark:border-slate-800 border-l-4 border-l-blue-500 dark:border-l-blue-500 rounded-xl hover:border-blue-400 hover:shadow-md hover:translate-x-1 transition-all shadow-sm flex flex-col justify-between gap-4 cursor-pointer group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="block font-sans font-bold text-[#1a1a1a] dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-lg transition-colors"
                    >
                      {edu.school}
                    </a>
                    <span className="text-[10px] text-blue-500 dark:text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ASK AI 🤖
                    </span>
                  </div>
                  <p className="text-xs text-[#1a1a1a]/70 dark:text-slate-355 font-mono mt-1">{edu.degree}</p>
                </div>
                <div className="flex justify-between items-center border-t border-gray-50 dark:border-slate-800/60 pt-3">
                  <p className="text-[10px] text-[#1a1a1a]/50 dark:text-slate-400 uppercase tracking-wider font-mono">{edu.duration}</p>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100/50 dark:border-blue-900/30 px-2.5 py-1 rounded-lg">
                    {edu.gpa}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profiles and Hackathons list */}
        <div className="space-y-8">
          {/* Coding Profiles widgets */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-[#1a1a1a]/50 dark:text-slate-400 uppercase tracking-wider">Coding Portals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {RESUME_DATA.codingProfiles.map((prof) => {
                const isLeet = prof.name === "LeetCode";
                const isChef = prof.name === "CodeChef";
                const badgeColor = isLeet
                  ? "border-amber-400 bg-amber-50/10 hover:border-amber-500"
                  : isChef
                  ? "border-amber-800 bg-amber-950/5 hover:border-amber-900"
                  : "border-gray-800 bg-gray-900/5 hover:border-black";
                const iconColor = isLeet ? "text-amber-500" : isChef ? "text-amber-800" : "text-gray-900 dark:text-slate-100";
                
                return (
                  <div
                    key={prof.name}
                    onClick={() => {
                      const q = `Tell me about Akshay's coding profile on ${prof.name}. What is his username, score, and accomplishments?`;
                      window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: q }));
                    }}
                    className={`p-4 border border-[#e5e7eb] dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-all shadow-sm flex flex-col justify-between gap-3 group border-b-2 hover:translate-y-[-2px] duration-200 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{prof.name}</span>
                      <span className={`${iconColor} opacity-70 group-hover:opacity-100 transition-opacity`}>
                        {getSkillIcon(prof.name)}
                      </span>
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-gray-400 dark:text-slate-400 font-bold uppercase truncate">{prof.username}</p>
                      <span className="text-[9px] font-sans text-gray-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-450 transition-colors font-medium">
                        {prof.detail}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hackathons checklist */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-[#1a1a1a]/50 dark:text-slate-400 uppercase tracking-wider">Hackathons</h3>
            <div className="space-y-3">
              {RESUME_DATA.hackathons.map((h, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const q = `Tell me about Akshay's participation in "${h}" hackathon and his contributions.`;
                    window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: q }));
                  }}
                  className="p-4 bg-white dark:bg-slate-900 border border-[#e5e7eb] dark:border-slate-800 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-400 rounded-xl hover:shadow-md transition-all shadow-sm flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full select-none group-hover:scale-125 transition-transform" />
                    <span className="text-xs sm:text-sm font-sans font-medium text-gray-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-relaxed">
                      {h}
                    </span>
                  </div>
                  <span className="text-[10px] text-blue-500 dark:text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    ASK AI 🤖
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── App Main Component ────────────────────────────────────────────────
export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Hello! I am **Akshay's AI Assistant**. I can tell you all about his work on projects like **Learn-Flow**, his **technical stack**, or **gpa and hackathons**. Ask me anything!"
    }
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Tell me about Learn-Flow",
    "What is his B.Tech GPA?",
    "Show hackathon achievements",
    "Explore coding profiles"
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat drawer
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatLoading, isChatOpen]);

  // Message submission workflow
  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || isChatLoading) return;

    const userMessage = { role: "user" as const, text: queryText };
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setIsChatLoading(true);
    setIsChatOpen(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Use an environment variable for API keys. Set VITE_OPENROUTER_KEY in your .env file.
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY ?? ""}`
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-nano-30b-a3b:free",
          messages: [
            {
              role: "system",
              content: `You are Akshay's AI Representative, a helpful, highly professional, and extremely knowledgeable AI agent representing Chavva Akshay Kumar Reddy (a B.Tech CSE student at KL University with a 9.77 GPA, expert in front-end development, AI, and developer tools).
Your responses MUST be neat, correct, and highly detailed.
Crucial rule for formatting: Wrap all important concepts, project names, technical skills, metrics, and key statements in double asterisks **like this** to make them bold. Use headers (starting with ###) for all primary sections. The user's system will automatically highlight all bold text in blue, so make generous use of **bold highlights** for maximum impact.
Be very detailed, structured, clear, and professional in your replies.

STRICT RULE FOR PAGE NAVIGATION & REDIRECTS:
Whenever discussing topics that reside on a specific page of Akshay's portfolio (like education timeline, GPA, competitive coding, or hackathons on /education; technical stack or skill details on /skills; custom projects or repos on /projects), you MUST append a line on a brand new line by itself in the exact format:
[NAVIGATE: /route]
(e.g., [NAVIGATE: /education] or [NAVIGATE: /skills] or [NAVIGATE: /projects]). Do not wrap this tag in markdown, code blocks, or bold formatting. Always place it on its own clean line.

STRICT RULE FOR HACKATHONS & ACHIEVEMENTS:
Whenever asked about hackathons, achievements, or team events, you MUST strictly use Chavva Akshay Kumar Reddy's actual list of achievements and never hallucinate or make up generic awards:
- **Rampage Hackathon** — KLH University
- **AI Summit Hackathon** — Telangana’s Largest AI Hackathon
- **Hack Ananta** — Google Developer Groups (GDG) Hackathon
- **Smart India Hackathon (SIH) 2025** — National Level Participant
- **Smart India Hackathon (SIH) 2024** — National Level Participant

STRICT RULE FOR CODING PROFILES:
- **LeetCode**: Active Problem Solver (Username: **IJLMMOwY4o**, URL: leetcode.com/u/IJLMMOwY4o)
- **CodeChef**: Competitive Programmer (Username: **klh2420030604**, URL: codechef.com/users/klh2420030604)
- **GitHub**: Open Source Contributor (Username: **tonyboss365**, URL: github.com/tonyboss365)

Whenever asked about Akshay's flagship project, Learn-Flow, or requested for a professional summary/overview of his projects, you MUST output this precise content with these exact details and bold highlights:

### OVERVIEW
**Learn-Flow** is an **open-source** education-tech platform designed to **personalize learning pathways** for students by leveraging AI-driven content recommendations and automated progress tracking. The project aligns with Akshay's dream of a **tech career** and reflects his passion for creating intuitive, user-centric experiences.

### TECHNICAL STACK
- Front-end: **React**, **TypeScript**, **Tailwind CSS** – delivering a responsive, component-based UI that adapts to diverse devices.
- Back-end: **Node.js** with **Express.js**, handling **RESTful APIs** and **WebSocket**-based real-time updates.
- AI Engine: **Python**, **Scikit-Learn**, and **TensorFlow Lite** for predictive analytics on learner performance.
- Database: **PostgreSQL** for relational data; **Redis** for caching session metadata; **MongoDB** stores unstructured learner artifacts.
- DevOps: **Docker**, **GitHub Actions**, and **Kubernetes** for **CI/CD pipelines** and scalable deployments.

### KEY FEATURES
- **Automated Progress Tracking**: Real-time visualization of learner milestones, mastery levels, and bottlenecks.
- **Personalized Learning Paths**: Recommendation engine suggests modules based on skill gaps and past performance.
- **Gamified Feedback Loop**: Badges, streaks, and leaderboards encourage consistent engagement.
- **Collaborative Tools**: Integrated chat and study groups to foster community learning.

### IMPACT AND METRICS
- **Over 2,800 active users** across **12 academic institutions**, with an average session duration **increase of 37%** after implementing personalized pathways.
- **90% completion rate** for weekly assignments when the recommendation engine is active, compared to **62%** without it.
- Positive user feedback: **4.8/5 average rating** on usability and relevance of content suggestions.

### FUTURE ROADMAP
- Expansion of the **AI module** to include **natural language processing** for feedback summarization.
- Integration with **Learning Management Systems (LMS)** via **LTI standards**.
- Development of a **mobile companion app** using **Flutter** for on-the-go access.

At the very end of EVERY single response, you MUST append a section in the following exact format containing exactly 3 or 4 highly relevant and interesting follow-up questions for the user to ask next about Akshay's projects, technical experience, or achievements. Ensure each suggested question is brief, interesting, related to the discussion, and ends with a question mark:
[SUGGESTIONS]
- Question 1?
- Question 2?
- Question 3?`
            },
            ...updatedMessages.map((m) => ({
              role: m.role,
              content: m.text
            }))
          ]
        })
      });

      const data = await response.json();
      let replyText = data?.choices?.[0]?.message?.content || "I apologize, I encountered a connection issue. Please try again!";
      
      // Parse dynamic suggested questions block
      let nextSuggestions = [
        "Tell me about Learn-Flow",
        "What is his B.Tech GPA?",
        "Show hackathon achievements",
        "Explore coding profiles"
      ];

      const suggestionsMatch = replyText.match(/\[SUGGESTIONS\]([\s\S]*)$/i);
      if (suggestionsMatch) {
        const block = suggestionsMatch[1];
        // Strip suggestions markup out of the user visible message bubble
        replyText = replyText.replace(/\[SUGGESTIONS\][\s\S]*$/i, "").trim();

        // Extract suggested items ending with a question mark
        const lines = block.split("\n");
        const parsed = lines
          .map((line) => line.trim().replace(/^-?\s*/, ""))
          .filter((line) => line.length > 0 && line.endsWith("?"));
        
        if (parsed.length > 0) {
          nextSuggestions = parsed.slice(0, 4);
        }
      }

      setChatMessages([...updatedMessages, { role: "assistant", text: replyText }]);
      setSuggestions(nextSuggestions);
    } catch (error) {
      console.error(error);
      setChatMessages([
        ...updatedMessages,
        { role: "assistant", text: "I apologize, I encountered a connection issue. Please try again!" }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Listen to the global trigger event
  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setIsChatOpen(true);
      handleSendMessage(customEvent.detail);
    };
    window.addEventListener("trigger-ai-chat" as any, handleTrigger);
    return () => window.removeEventListener("trigger-ai-chat" as any, handleTrigger);
  }, [chatMessages, isChatLoading]);

  return (
    <BrowserRouter>
      <Layout>
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/education" element={<EducationPage />} />
          </Routes>
          <footer className="border-t border-gray-800 mt-24 pt-8 text-center text-xs text-gray-500 font-mono">
            CHAVVA AKSHAY KUMAR REDDY - 2026
          </footer>
        </div>
      </Layout>

      {/* Floating Circular Pulsar AI Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center border border-blue-500 cursor-pointer animate-pulse select-none"
          title="Ask Representative AI"
        >
          <ChatBotLogo className="w-8 h-8" fillColor="white" />
        </motion.button>
      )}

      {/* Slide-out AI Representative Chat Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-[#1a1a1a]/30 dark:bg-black/60 backdrop-blur-[1px] z-40 cursor-pointer"
            />

            {/* Chat Drawer container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white dark:bg-slate-900 border-l-0 sm:border-l-8 border-blue-600 shadow-2xl z-50 flex flex-col font-mono text-[#1a1a1a] dark:text-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-blue-600 text-white p-5 relative overflow-hidden flex flex-col gap-1 select-none">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white hover:scale-105 transition-all w-8 h-8 flex items-center justify-center border border-white/20 dark:border-white/30 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 rounded-sm cursor-pointer z-30"
                  aria-label="Close Representative Chat"
                >
                  ✕
                </button>

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <ChatBotLogo className="w-5.5 h-5.5" fillColor="white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-ping inline-block" />
                      AKSHAY'S AI REPRESENTATIVE
                    </h3>
                    <span className="text-[9px] text-blue-100 uppercase tracking-widest block mt-0.5">
                      ● ONLINE
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Telemetry Panel */}
              <div className="bg-gray-950 text-[10px] text-green-400 font-mono px-5 py-2.5 flex justify-between items-center border-b border-gray-800 dark:border-slate-900 shadow-inner select-none">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  <span>AGENT ACTIVE: PORTFOLIO CO-PILOT</span>
                </div>
                <div className="flex gap-4">
                  <span>LATENCY: 142ms</span>
                  <span>LOAD: 0.08%</span>
                </div>
              </div>

              {/* Chat History Panel */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 dark:bg-slate-950/40">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-sm p-4 text-xs sm:text-sm border shadow-sm ${
                        msg.role === "user"
                          ? "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-[#1a1a1a] dark:text-slate-100 rounded-tr-none font-mono"
                          : "bg-blue-50/30 dark:bg-slate-900/40 border-blue-100 dark:border-blue-900/30 text-[#1a1a1a] dark:text-slate-100 rounded-tl-none font-sans"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <FormattedMessage text={msg.text} onCloseChat={() => setIsChatOpen(false)} />
                      ) : (
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading state indicator */}
                {isChatLoading && (
                  <div className="flex justify-start px-2 py-1 select-none">
                    <div className="flex items-center gap-3 font-mono text-[10px] text-blue-600 dark:text-blue-400">
                      <DotFieldLoader count={28} speed={1.5} dotSize={2.0} size={28} />
                      <span className="animate-pulse tracking-widest uppercase">
                        AI compiling response...
                      </span>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Dynamic suggestion chips */}
              <div className="px-5 py-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex flex-wrap gap-2 select-none">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSendMessage(sug)}
                    className="text-[10px] font-mono bg-gray-50 dark:bg-slate-850 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-800 border border-gray-200 dark:border-slate-800 px-2.5 py-1 transition-all rounded-sm cursor-pointer text-gray-700 dark:text-slate-300"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Chat Input form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!inputValue.trim()) return;
                  handleSendMessage(inputValue);
                  setInputValue("");
                }}
                className="p-4 bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 flex gap-3"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about Akshay..."
                  disabled={isChatLoading}
                  className="flex-1 bg-white dark:bg-slate-900 border border-[#e5e7eb] dark:border-slate-800 px-4 py-2 text-xs sm:text-sm font-sans focus:outline-none focus:border-blue-500 rounded-sm placeholder-gray-400 dark:placeholder-gray-600 text-gray-900 dark:text-slate-100"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !inputValue.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs px-5 py-2 transition-all rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none shadow-sm"
                >
                  SEND
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}