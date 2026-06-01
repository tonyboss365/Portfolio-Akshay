import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RESUME_DATA } from "../data";
import { getSkillIcon } from "./SkillIcons";

// Custom vector icons for target personas
const RecruiterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const FounderIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const TechLeadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const AcademicIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

export function EnterpriseDashboard() {
  // Goal matcher active tab state
  const [activeTab, setActiveTab] = useState<"recruiter" | "founder" | "lead" | "scholar">("recruiter");
  
  // Custom interactive switches
  const [overclock, setOverclock] = useState(false);
  const [quantumCore, setQuantumCore] = useState(true);
  const [neuralSync, setNeuralSync] = useState(false);
  
  // Animated circular telemetry indicators
  const [threadLoad, setThreadLoad] = useState(38);
  const [apiLatency, setApiLatency] = useState(115);
  
  // Simulated console logs streaming state
  const [logs, setLogs] = useState<Array<{ time: string; msg: string; type: "system" | "model" | "metric" | "net" }>>([
    { time: "10:32:05", msg: "Telemetry server initialized...", type: "system" },
    { time: "10:32:06", msg: "DevCore Neural Engine cluster mapping resolved.", type: "model" },
    { time: "10:32:08", msg: "Education records parsed: KL University (GPA: 9.8)", type: "metric" },
    { time: "10:32:10", msg: "Secure database handshake completed successfully.", type: "system" }
  ]);
  const [isStreaming, setIsStreaming] = useState(true);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Dynamically fluctuate gauge indicators
  useEffect(() => {
    const interval = setInterval(() => {
      if (overclock) {
        setThreadLoad(prev => Math.min(98, Math.max(90, prev + (Math.random() * 4 - 2))));
        setApiLatency(prev => Math.min(38, Math.max(12, prev + (Math.random() * 6 - 3))));
      } else {
        setThreadLoad(prev => Math.min(44, Math.max(34, prev + (Math.random() * 2 - 1))));
        setApiLatency(prev => Math.min(145, Math.max(105, prev + (Math.random() * 10 - 5))));
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [overclock]);

  // Adjust gauge default states instantly on switch toggling
  useEffect(() => {
    if (overclock) {
      setThreadLoad(92);
      setApiLatency(18);
    } else {
      setThreadLoad(38);
      setApiLatency(115);
    }
  }, [overclock]);

  // Telemetry real-time log event stream generator
  useEffect(() => {
    if (!isStreaming) return;

    const logPool = [
      { msg: "Supabase connection active, caching pool checked.", type: "system" },
      { msg: "Skill detail indexing: TypeScript/React/FastAPI models compiled.", type: "metric" },
      { msg: "GDG Hack Ananta participant profile authenticated.", type: "metric" },
      { msg: "DevCore stream latency calibrated.", type: "net" },
      { msg: "Simulated load: 456 queries parsed.", type: "net" },
      { msg: "DevCore model pipeline loaded.", type: "model" },
      { msg: "Active project routing validated.", type: "system" },
      { msg: "Apple Intelligence aurora mesh gradient rendered.", type: "system" },
      { msg: "Smart India Hackathon credentials checked.", type: "metric" },
      { msg: "Interactive system dials calibrated at 60fps.", type: "system" }
    ];

    const interval = setInterval(() => {
      const timeStr = new Date().toTimeString().split(" ")[0];
      const randomEvent = logPool[Math.floor(Math.random() * logPool.length)];
      
      setLogs(prev => {
        const next = [...prev, { time: timeStr, ...randomEvent }];
        // Limit log overflow
        if (next.length > 30) next.shift();
        return next as typeof prev;
      });
    }, overclock ? 800 : 2500);

    return () => clearInterval(interval);
  }, [isStreaming, overclock]);

  // Scroll terminal logs automatically to the bottom on fresh logs
  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Trigger manual developer event log injection
  const injectDeveloperLog = () => {
    const timeStr = new Date().toTimeString().split(" ")[0];
    setLogs(prev => [
      ...prev,
      { time: timeStr, msg: "Manual Developer Event Injected: Core thread calibrated.", type: "system" }
    ]);
  };

  // Matcher configurations
  const matcherContent = {
    recruiter: {
      headline: "Rapid Technical Evaluation for Engineering Recruiters",
      highlights: [
        { label: "B.Tech CSE GPA", value: "9.8 / 10.0" },
        { label: "Competitive Solving", value: "LeetCode & CodeChef Active" },
        { label: "Core Expertise", value: "React, TypeScript, Node.js, Python" }
      ],
      description: "Akshay is an institutional-grade full-stack developer with a passion for clean architectures. He specializes in React, high-performance APIs, and AI integrations.",
      actionText: "Tell me about Akshay's academic achievements",
      targetQuery: "Tell me about Akshay's academic achievements, courses, and marks for his B.Tech in CSE.",
      recommendedProj: "Learn-Flow"
    },
    founder: {
      headline: "Accelerated Custom AI Platforms for SaaS Founders",
      highlights: [
        { label: "AI Handshake", value: "DevCore Neural Engine Integration" },
        { label: "Streaming Backend", value: "FastAPI, WebSockets, REST APIs" },
        { label: "Data Architecture", value: "PostgreSQL, MySQL, MongoDB" }
      ],
      description: "Akshay rapidly builds scalable SaaS architectures. From real-time analytical portals like RevIntel to AI Sentinel engines, he translates complex algorithms into slick UI platforms.",
      actionText: "Tell me about Akshay's SaaS capabilities",
      targetQuery: "Tell me about Akshay's experience building SaaS applications, APIs, and real-time streaming components.",
      recommendedProj: "AweTales Sentinel"
    },
    lead: {
      headline: "Technical Stack Handshake for R&D Leads",
      highlights: [
        { label: "Code Quality", value: "Strict Type Safety & OOP Principles" },
        { label: "DevOps & Cloud", value: "Vercel, Railway, Git Workflows" },
        { label: "Robust Data structures", value: "Optimized time complexity solves" }
      ],
      description: "Akshay maintains production-grade codebase standards. He utilizes type-safe architectures, modular custom wrappers, and structured layouts built for seamless scaling.",
      actionText: "Audit Akshay's coding profiles",
      targetQuery: "Tell me about Akshay's coding profile on LeetCode and CodeChef, and his scores.",
      recommendedProj: "Campus Share"
    },
    scholar: {
      headline: "Academic Track Record & Hackathon Standings",
      highlights: [
        { label: "B.Tech CGPA", value: "9.8 / 10.0" },
        { label: "Top Standing", value: "KL University Core Scholar" },
        { label: "Team Hackathons", value: "GDG Hack Ananta, SIH Participant" }
      ],
      description: "Akshay shines in competitive team hackathons. He combines theoretical computer science structures with high-speed prototyping skills, solving national level challenges.",
      actionText: "Explore hackathon achievements",
      targetQuery: "Tell me about Akshay's participation in national level hackathons like Smart India Hackathon and GDG Hack Ananta.",
      recommendedProj: "Learn-Flow"
    }
  };

  // Circular gauge parameter calculations
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (threadLoad / 100) * circumference;

  return (
    <section className="mt-20 space-y-8 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-950/40 px-2 py-0.5 rounded-sm uppercase tracking-wider">Enterprise Stack</span>
          <h2 className="text-xl font-bold mt-1 text-[#1a1a1a] dark:text-slate-100 font-sans tracking-tight">Apple Intelligence Telemetry Control Center</h2>
        </div>
        
        {/* Manual developer event injection button */}
        <button
          onClick={injectDeveloperLog}
          className="px-3.5 py-1.5 border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 font-mono text-[10px] rounded-xl transition-all cursor-pointer shadow-sm text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          Inject Event Log +
        </button>
      </div>

      {/* Main glassmorphic widget grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: System Telemetry Switches & Dials (5 cols) */}
        <div className="lg:col-span-5 bg-white/40 dark:bg-[#0c1220]/40 backdrop-blur-xl border border-gray-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/[0.02] transition-all flex flex-col justify-between gap-6 relative overflow-hidden group">
          {/* Subtle Ambient Apple Aurora glow inside border when overclocked */}
          {overclock && (
            <div className="absolute inset-0 border border-transparent bg-gradient-to-r from-blue-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl opacity-100 transition-opacity blur-[1px] pointer-events-none -z-10" />
          )}

          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
              SYSTEM DIALS & SWITCHES
            </h3>

            {/* Core Toggles list */}
            <div className="space-y-3.5">
              
              {/* Toggle 1: Overclock AI */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50/70 dark:bg-slate-950/20 border border-gray-100/50 dark:border-slate-850/30 rounded-xl transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">Overclock AI Speed</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">Accelerates stream latency and logger trace speeds</p>
                </div>
                <button
                  onClick={() => setOverclock(!overclock)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                    overclock ? "bg-orange-500" : "bg-gray-200 dark:bg-slate-800"
                  }`}
                >
                  <motion.div
                    layout
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ x: overclock ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Toggle 2: Quantum Core */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50/70 dark:bg-slate-950/20 border border-gray-100/50 dark:border-slate-850/30 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">Quantum Storage Core</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">Enables active vector pipeline cache indexing</p>
                </div>
                <button
                  onClick={() => setQuantumCore(!quantumCore)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                    quantumCore ? "bg-blue-600" : "bg-gray-200 dark:bg-slate-800"
                  }`}
                >
                  <motion.div
                    layout
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ x: quantumCore ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Toggle 3: Security Shield */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50/70 dark:bg-slate-950/20 border border-gray-100/50 dark:border-slate-850/30 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">Neural Sync Shield</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">Filters LLM hallucination and pre-calibrates system GPA</p>
                </div>
                <button
                  onClick={() => setNeuralSync(!neuralSync)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer ${
                    neuralSync ? "bg-emerald-500" : "bg-gray-200 dark:bg-slate-800"
                  }`}
                >
                  <motion.div
                    layout
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ x: neuralSync ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

            </div>
          </div>

          {/* Dials Gauge Metrics Container */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-slate-850/60 pt-4">
            
            {/* Dial 1: Thread Load */}
            <div className="flex flex-col items-center p-3 bg-gray-50/30 dark:bg-slate-950/10 border border-gray-100/30 dark:border-slate-850/20 rounded-xl text-center">
              <div className="relative w-18 h-18">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="36" cy="36" r={radius} className="stroke-gray-100 dark:stroke-slate-800" strokeWidth="6" fill="transparent" />
                  <motion.circle
                    cx="36"
                    cy="36"
                    r={radius}
                    className={overclock ? "stroke-orange-500" : "stroke-blue-600"}
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-gray-800 dark:text-slate-200 font-mono leading-none">{Math.round(threadLoad)}%</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase mt-2 tracking-wider">THREAD LOAD</span>
            </div>

            {/* Dial 2: AI Latency */}
            <div className="flex flex-col items-center p-3 bg-gray-50/30 dark:bg-slate-950/10 border border-gray-100/30 dark:border-slate-850/20 rounded-xl text-center justify-between">
              <div className="flex-1 flex flex-col justify-center">
                <motion.span
                  key={apiLatency}
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-xl font-bold font-mono leading-none ${
                    overclock ? "text-emerald-500" : "text-blue-500"
                  }`}
                >
                  {Math.round(apiLatency)}ms
                </motion.span>
                <span className="text-[8px] text-gray-400 font-mono mt-1 uppercase">Neural latency</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase mt-2 tracking-wider">AI LATENCY</span>
            </div>

          </div>

        </div>

        {/* Right Side: Interactive Goal Matcher (7 cols) */}
        <div className="lg:col-span-7 bg-white/40 dark:bg-[#0c1220]/40 backdrop-blur-xl border border-gray-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between gap-5 font-mono">
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              📂 DYNAMIC AI CONFIGURATOR & PROJECT MATCHER
            </h3>

            {/* Interactive Picker Selector Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-gray-100/60 dark:bg-slate-950/50 rounded-xl border border-gray-200/30 dark:border-slate-800/30 select-none">
              
              <button
                onClick={() => setActiveTab("recruiter")}
                className={`py-2 px-1 text-[9px] sm:text-[10px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeTab === "recruiter"
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/40 dark:border-slate-700/50"
                    : "text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-350"
                }`}
              >
                <RecruiterIcon />
                <span className="hidden sm:inline">RECRUITER</span>
              </button>

              <button
                onClick={() => setActiveTab("founder")}
                className={`py-2 px-1 text-[9px] sm:text-[10px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeTab === "founder"
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/40 dark:border-slate-700/50"
                    : "text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-350"
                }`}
              >
                <FounderIcon />
                <span className="hidden sm:inline">FOUNDER</span>
              </button>

              <button
                onClick={() => setActiveTab("lead")}
                className={`py-2 px-1 text-[9px] sm:text-[10px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeTab === "lead"
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/40 dark:border-slate-700/50"
                    : "text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-350"
                }`}
              >
                <TechLeadIcon />
                <span className="hidden sm:inline">TECH LEAD</span>
              </button>

              <button
                onClick={() => setActiveTab("scholar")}
                className={`py-2 px-1 text-[9px] sm:text-[10px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeTab === "scholar"
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/40 dark:border-slate-700/50"
                    : "text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-350"
                }`}
              >
                <AcademicIcon />
                <span className="hidden sm:inline">SCHOLAR</span>
              </button>

            </div>

            {/* Custom Interactive Highlight Results card */}
            <div className="bg-gray-50/50 dark:bg-slate-950/10 border border-gray-100/50 dark:border-slate-850/30 p-4 rounded-xl space-y-3">
              <h4 className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide leading-tight">
                {matcherContent[activeTab].headline}
              </h4>
              
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-450 font-sans leading-relaxed">
                {matcherContent[activeTab].description}
              </p>

              {/* Mapped customized metrics */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {matcherContent[activeTab].highlights.map((h, i) => (
                  <div key={i} className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-lg flex flex-col gap-0.5 justify-center">
                    <span className="text-[8px] text-gray-400 uppercase leading-none truncate">{h.label}</span>
                    <span className="text-[9px] font-bold text-gray-800 dark:text-slate-200 leading-tight truncate">{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-gray-100 dark:border-slate-850/60">
            <span className="text-[9px] text-gray-400 font-mono">
              💡 Recommended Project: <strong className="text-gray-600 dark:text-slate-200">{matcherContent[activeTab].recommendedProj}</strong>
            </span>
            <button
              onClick={() => {
                const event = new CustomEvent("trigger-ai-chat", { detail: matcherContent[activeTab].targetQuery });
                window.dispatchEvent(event);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-[10px] rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
            >
              🚀 {matcherContent[activeTab].actionText} →
            </button>
          </div>

        </div>

      </div>

      {/* Dynamic Scrolling Production Telemetry Console Card */}
      <div className="bg-gray-950 dark:bg-black/95 border border-gray-800 dark:border-slate-900 rounded-2xl p-5 shadow-2xl font-mono text-[10px] leading-relaxed relative overflow-hidden">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-gray-850 pb-3 mb-3 select-none">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-gray-450 ml-2 uppercase font-bold tracking-widest text-[9px]">LIVE TELEMETRY STREAM</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-2 py-0.5 rounded text-[8px] font-bold border transition-colors cursor-pointer ${
                isStreaming
                  ? "border-amber-500/35 bg-amber-950/20 text-amber-400 hover:bg-amber-900/30"
                  : "border-emerald-500/35 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/30"
              }`}
            >
              {isStreaming ? "PAUSE STREAM" : "PLAY STREAM"}
            </button>
            <button
              onClick={() => setLogs([])}
              className="px-2 py-0.5 border border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-400 hover:text-white rounded text-[8px] font-bold transition-colors cursor-pointer"
            >
              CLEAR
            </button>
          </div>
        </div>

        {/* Telemetry Logger Box */}
        <div className="max-h-[140px] overflow-y-auto space-y-1.5 scrollbar-thin select-text">
          <AnimatePresence initial={false}>
            {logs.map((log, index) => {
              const typeColor =
                log.type === "system"
                  ? "text-blue-400"
                  : log.type === "model"
                  ? "text-purple-400"
                  : log.type === "net"
                  ? "text-orange-400"
                  : "text-emerald-400";
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 hover:bg-white/[0.02] py-0.5 px-1 rounded transition-colors"
                >
                  <span className="text-gray-600 shrink-0">{log.time}</span>
                  <span className={`font-bold shrink-0 uppercase text-[9px] ${typeColor}`}>
                    [{log.type || "SYS"}]
                  </span>
                  <span className="text-gray-350">{log.msg}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={consoleBottomRef} />
        </div>

      </div>

    </section>
  );
}
