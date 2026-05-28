import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CodeReviewArena } from "./CodeReviewArena";
import { Starsfield } from "./Starsfield";
import { ThreeDDigitalClock } from "./ThreeDDigitalClock";

import { useSystem } from "./SystemContext";
import { useFileSystem } from "./FileSystemContext";
import { KineticHeader } from "./KineticHeader";
import { WindowChrome } from "./WindowChrome";
import { RotorCarousel } from "./RotorCarousel";

import { APPS, WindowState } from "./apps/appConfig";
import { NeuralShell } from "./apps/NeuralShell";
import { MatrixExplorer } from "./apps/MatrixExplorer";
import { BeatsPlayer } from "./apps/BeatsPlayer";
import { SystemMonitor } from "./apps/SystemMonitor";
import { PaintStudio } from "./apps/PaintStudio";
import { CyberCalculator } from "./apps/CyberCalculator";
import { DashboardPanel } from "./apps/DashboardPanel";

interface AeroOSProps {
  onCloseOS: () => void;
  renderSkills: () => React.ReactNode;
  renderProjects: () => React.ReactNode;
  renderEducation: () => React.ReactNode;
  renderChatBot: () => React.ReactNode;
}

export function AeroOS({
  onCloseOS,
  renderSkills,
  renderProjects,
  renderEducation,
  renderChatBot,
}: AeroOSProps) {
  const { systemAccent, setSystemAccent, isMuted, toggleMute, playSound } = useSystem();
  const { writeFile } = useFileSystem();
  
  const [bootStep, setBootStep] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(15);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [activeSettingCategory, setActiveSettingCategory] = useState("appearance");
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Spotlight HUD Command search state
  const [isHudOpen, setIsHudOpen] = useState(false);
  const [hudQuery, setHudQuery] = useState("");
  const [hudSelectedIndex, setHudSelectedIndex] = useState(0);

  // Snap indicator state
  const [snapPreview, setSnapPreview] = useState<"left" | "right" | "full" | null>(null);

  // Spotlight Keyboard HUD Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsHudOpen((prev) => !prev);
        setHudQuery("");
        setHudSelectedIndex(0);
        playSound("open");
      }
      if (e.key === "Escape") {
        setIsHudOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playSound]);

  const desktopRef = useRef<HTMLDivElement>(null);

  const bootLogs = [
    "INITIALIZING AURA_OS CORE KERNEL V3.0.0...",
    "VERIFYING MOUNTED FILESYSTEMS — DIGITAL SECTOR ONLINE",
    "STARFIELD PRELOAD ENGINE: 60 FPS CAP ACTIVE",
    "ESTABLISHING NEURAL LINK TO DEVCORE INTELLIGENCE CORE",
    "VERIFYING B.TECH ACADEMICS [2024 – 2028] — DETECTED",
    "COMPILING TECHNICAL STACK MATRIX — 47 MODULES",
    "COGNITIVE AI REVIEWER — READY",
    "SYNAPSE ROUTER ONLINE — 12 NODE APPS MOUNTED",
    "3D ROTOR CAROUSEL ENGINE INITIALIZED",
    "WELCOME. CHAVVA AKSHAY KUMAR REDDY. CORE OS ONLINE.",
  ];

  // Boot sequence timer logic
  useEffect(() => {
    if (bootStep < bootLogs.length) {
      const timer = setTimeout(() => setBootStep((p) => p + 1), bootStep === 0 ? 200 : 280);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsBooting(false);
        playSound("boot");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [bootStep]);

  // Initial Window States
  const [windows, setWindows] = useState<Record<string, WindowState>>({});

  // Dynamic responsive window size calculation on mount
  useEffect(() => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const safeWidth = (desired: number) => Math.min(desired, screenW - 32);
    const safeHeight = (desired: number) => Math.min(desired, screenH - 120);

    setWindows({
      skills:    { id: "skills",    title: "Technical Stack & Skill Matrix",         isOpen: false, isMinimized: false, isMaximized: false, x: 16,  y: 40,  width: safeWidth(760), height: safeHeight(480), zIndex: 1 },
      projects:  { id: "projects",  title: "Selected Projects",                       isOpen: false, isMinimized: false, isMaximized: false, x: 24,  y: 60,  width: safeWidth(820), height: safeHeight(520), zIndex: 2 },
      education: { id: "education", title: "Academic & Hackathon Timeline",           isOpen: false, isMinimized: false, isMaximized: false, x: 32,  y: 80,  width: safeWidth(720), height: safeHeight(460), zIndex: 3 },
      arena:     { id: "arena",     title: "AI Code Reviewer Arena",                  isOpen: false, isMinimized: false, isMaximized: false, x: 40,  y: 100, width: safeWidth(880), height: safeHeight(560), zIndex: 4 },
      chat:      { id: "chat",      title: "AI Representative Chat Terminal",         isOpen: false, isMinimized: false, isMaximized: false, x: 48,  y: 120, width: safeWidth(460), height: safeHeight(540), zIndex: 5 },
      dashboard: { id: "dashboard", title: "Aura System Diagnostics & Preferences",  isOpen: false, isMinimized: false, isMaximized: false, x: 56,  y: 140, width: safeWidth(520), height: safeHeight(530), zIndex: 6 },
      terminal:  { id: "terminal",  title: "Secure Neural CLI Shell",                 isOpen: false, isMinimized: false, isMaximized: false, x: 64,  y: 160, width: safeWidth(600), height: safeHeight(420), zIndex: 7 },
      explorer:  { id: "explorer",  title: "Matrix Directory System",                 isOpen: false, isMinimized: false, isMaximized: false, x: 72,  y: 180, width: safeWidth(700), height: safeHeight(460), zIndex: 8 },
      music:     { id: "music",     title: "Synapse Beats Lo-Fi Console",             isOpen: false, isMinimized: false, isMaximized: false, x: 80,  y: 200, width: safeWidth(440), height: safeHeight(480), zIndex: 9 },
      monitor:   { id: "monitor",   title: "System Performance Pulse Monitor",        isOpen: false, isMinimized: false, isMaximized: false, x: 88,  y: 220, width: safeWidth(620), height: safeHeight(460), zIndex: 10 },
      paint:     { id: "paint",     title: "Aero Cybernetic Paint Studio",             isOpen: false, isMinimized: false, isMaximized: false, x: 96,  y: 240, width: safeWidth(500), height: safeHeight(460), zIndex: 11 },
      calc:      { id: "calc",      title: "Matrix Cybernetic Calculator",            isOpen: false, isMinimized: false, isMaximized: false, x: 104, y: 260, width: safeWidth(340), height: safeHeight(440), zIndex: 12 },
    });
  }, []);

  const [starfieldSettings, setStarfieldSettings] = useState({
    starCount: 150,
    speed: 0.02,
    spread: 2.6,
    focal: 0.8,
    twinkle: 0.9,
    trail: 0.05,
    starSize: 1.6,
    bgColor: "#000000",
    starColor: "#E8FF47",
    color1: "#E8FF47",
    color2: "#FF6B6B",
    color3: "#7EB8FF",
    color4: "#FFB8FF",
    randomColors: true,
    galaxyMode: true,
    followCursor: true,
    direction: "none" as const,
  });

  const openApp = (id: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZ },
    }));
    setActiveWindowId(id);
  };

  const closeApp = (id: string) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isOpen: false } }));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeApp = (id: string) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isMinimized: true } }));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const maximizeApp = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
  };

  const focusApp = (id: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: false, zIndex: nextZ },
    }));
    setActiveWindowId(id);
  };

  const getHudItems = () => {
    const items: Array<{
      type: "app" | "accent" | "vfs" | "math";
      title: string;
      subtitle: string;
      action: () => void;
      badge?: string;
    }> = [];

    const trimmed = hudQuery.trim();

    // 1. Dynamic Interactive Calculator
    if (trimmed && /^[0-9+\-*/().\s]+$/.test(trimmed)) {
      try {
        const result = new Function(`return ${trimmed}`)();
        if (typeof result === "number" && !isNaN(result)) {
          items.push({
            type: "math",
            title: `Dynamic Math Result: ${result}`,
            subtitle: `Evaluated expression: ${trimmed}`,
            badge: "MATH",
            action: () => {
              navigator.clipboard.writeText(String(result));
              setToastMsg(`📋 Copied result "${result}" to clipboard!`);
              setTimeout(() => setToastMsg(""), 3000);
              setIsHudOpen(false);
            }
          });
        }
      } catch (e) {}
    }

    // 2. VFS Quick Writing Commands (touch / write)
    if (trimmed.startsWith("touch ") || trimmed.startsWith("write ")) {
      const parts = trimmed.split(" ");
      const isTouch = parts[0] === "touch";
      const filename = parts[1] || "untitled.txt";
      const content = parts.slice(2).join(" ") || "Empty draft.";
      items.push({
        type: "vfs",
        title: isTouch ? `touch ${filename}` : `write ${filename}`,
        subtitle: isTouch ? `Create empty file in VFS` : `Write file content: "${content}"`,
        badge: "VFS WRITE",
        action: () => {
          writeFile(["Root"], filename, isTouch ? "" : content, "text");
          playSound("boot");
          setToastMsg(`📝 Created VFS file "${filename}" in Root!`);
          setTimeout(() => setToastMsg(""), 3000);
          setIsHudOpen(false);
        }
      });
    }

    // 3. Launching desktop applications
    APPS.forEach((app) => {
      if (!hudQuery || app.name.toLowerCase().includes(hudQuery.toLowerCase()) || app.label.toLowerCase().includes(hudQuery.toLowerCase())) {
        items.push({
          type: "app",
          title: `Launch ${app.name}`,
          subtitle: `${app.label} — ${app.sublabel}`,
          badge: "APP",
          action: () => {
            openApp(app.id);
            setIsHudOpen(false);
          }
        });
      }
    });

    // 4. Accent Theme Switching
    const themeColors = [
      { name: "Neon Lime", code: "#E8FF47" },
      { name: "Cyber Punk Red", code: "#FF6B6B" },
      { name: "Neon Cyan", code: "#00E5FF" },
      { name: "Violet Glow", code: "#FFB8FF" },
      { name: "Matrix Emerald", code: "#00FFB8" },
      { name: "Sunset Orange", code: "#FFA500" },
    ];
    themeColors.forEach((col) => {
      const label = `Set accent: ${col.name}`;
      if (!hudQuery || label.toLowerCase().includes(hudQuery.toLowerCase())) {
        items.push({
          type: "accent",
          title: label,
          subtitle: `Apply ${col.name} (${col.code}) globally`,
          badge: "THEME",
          action: () => {
            setSystemAccent(col.code);
            playSound("click");
            setIsHudOpen(false);
          }
        });
      }
    });

    return items;
  };

  const hudItems = getHudItems();

  const handleHudKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHudSelectedIndex((prev) => (prev + 1) % hudItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHudSelectedIndex((prev) => (prev - 1 + hudItems.length) % hudItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (hudItems[hudSelectedIndex]) {
        hudItems[hudSelectedIndex].action();
      }
    }
  };

  const snapWindow = (id: string, side: "left" | "right" | "full") => {
    if (!desktopRef.current) return;
    const rect = desktopRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    setWindows((prev) => {
      const win = prev[id];
      if (side === "left") {
        return {
          ...prev,
          [id]: { ...win, isMaximized: false, x: 0, y: 0, width: w / 2, height: h },
        };
      } else if (side === "right") {
        return {
          ...prev,
          [id]: { ...win, isMaximized: false, x: w / 2, y: 0, width: w / 2, height: h },
        };
      } else {
        return {
          ...prev,
          [id]: { ...win, isMaximized: true },
        };
      }
    });
  };

  const handleDragUpdate = (clientX: number, clientY: number, isDragging: boolean) => {
    if (!isDragging) {
      setSnapPreview(null);
      return;
    }
    if (clientX < 30) {
      setSnapPreview("left");
    } else if (clientX > window.innerWidth - 30) {
      setSnapPreview("right");
    } else if (clientY < 30) {
      setSnapPreview("full");
    } else {
      setSnapPreview(null);
    }
  };

  const handleDragEnd = (id: string, clientX: number, clientY: number) => {
    if (clientX < 30) {
      snapWindow(id, "left");
    } else if (clientX > window.innerWidth - 30) {
      snapWindow(id, "right");
    } else if (clientY < 30) {
      snapWindow(id, "full");
    }
    setSnapPreview(null);
  };

  const minimizeAllApps = () => {
    setWindows((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        next[k] = { ...next[k], isMinimized: true };
      });
      return next;
    });
    setActiveWindowId(null);
  };

  const isLight = starfieldSettings.bgColor === "#ffffff";
  const hasOpenWindow = Object.values(windows).some((w) => w.isOpen && !w.isMinimized);

  // --- BOOT SCREEN FLOW ---
  if (isBooting) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center font-mono overflow-hidden">
        <Starsfield
          starCount={200}
          speed={0.08}
          spread={2.8}
          focal={0.7}
          twinkle={0.8}
          trail={0.06}
          starSize={3}
          bgColor="#000000"
          starColor="#E8FF47"
          color1="#E8FF47"
          color2="#FF6B6B"
          color3="#7EB8FF"
          color4="#FFB8FF"
          randomColors={true}
          followCursor={true}
        >
          <div className="w-full max-w-[480px] p-8 animate-fadeIn">
            <div className="mb-8 flex items-center gap-4">
              <svg width="42" height="42" viewBox="0 0 100 100" className="shrink-0 animate-[spin_12s_linear_infinite]" style={{ filter: "drop-shadow(0 0 8px rgba(232, 255, 71, 0.45))" }}>
                <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="#E8FF47" strokeWidth="3" fill="none" />
                <path d="M 32 70 L 50 25 L 68 70" stroke="#E8FF47" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 42 50 L 58 50 M 50 43 L 64 33 M 50 53 L 66 69" stroke="#E8FF47" strokeWidth="4" strokeLinecap="round" fill="none" />
                <circle cx="50" cy="25" r="2.5" fill="#ffffff" />
              </svg>
              <div>
                <div className="text-[12px] font-bold tracking-[0.25em] text-white font-mono uppercase" style={{ color: "#E8FF47" }}>AKR NEURAL OS</div>
                <div className="text-[8px] tracking-[0.38em] uppercase text-white/40 font-mono mt-0.5">Aero Workstation Core</div>
              </div>
            </div>

            <div
              className="w-full p-5 h-[240px] overflow-y-auto space-y-2 text-[11px] leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {bootLogs.slice(0, bootStep).map((log, idx) => {
                const isDone =
                  log.includes("ONLINE") ||
                  log.includes("WELCOME") ||
                  log.includes("READY") ||
                  log.includes("ACTIVE");
                const isTitle = log.includes("INITIALIZING") || log.includes("WELCOME");
                return (
                  <div
                    key={idx}
                    className="flex gap-3 items-start animate-fadeIn"
                    style={{
                      color: isTitle
                        ? "#E8FF47"
                        : isDone
                        ? "rgba(232,255,71,0.7)"
                        : "rgba(255,255,255,0.35)",
                    }}
                  >
                    <span className="shrink-0 opacity-50">{isDone ? "✓" : "›"}</span>
                    <span>{log}</span>
                  </div>
                );
              })}
              {bootStep < bootLogs.length && (
                <div className="flex gap-3 items-center" style={{ color: "#E8FF47" }}>
                  <span className="shrink-0 opacity-50">›</span>
                  <span className="w-2 h-4 animate-pulse" style={{ background: "#E8FF47" }} />
                </div>
              )}
            </div>

            <div className="mt-6 h-[1px] w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${(bootStep / bootLogs.length) * 100}%`,
                  background: "#E8FF47",
                }}
              />
            </div>
            <div
              className="mt-2 text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {Math.round((bootStep / bootLogs.length) * 100)}% — INITIALIZING
            </div>
          </div>
        </Starsfield>
      </div>
    );
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleFileDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (!files.length) return;

    playSound("boot");

    for (const file of files) {
      const reader = new FileReader();
      const isImg = file.type.startsWith("image/");

      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          // Write directly to standard virtual Downloads folder
          writeFile(["Root", "Downloads"], file.name, result, isImg ? "image" : "text");
          
          // Display a gorgeous neon desktop toast notification
          setToastMsg(`📥 Imported "${file.name}" to Downloads folder!`);
          setTimeout(() => setToastMsg(""), 4550);
        }
      };

      if (isImg) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  // --- DESKTOP LAYOUT ---
  return (
    <div
      className="fixed inset-0 z-50 w-full h-full overflow-hidden flex flex-col font-mono select-none transition-colors duration-700"
      style={{ backgroundColor: starfieldSettings.bgColor }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
    >
      {/* Viewport Drag Overlay */}
      {isDraggingFile && (
        <div 
          className="absolute inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none transition-all duration-300 animate-fadeIn"
          style={{
            background: "rgba(8, 8, 8, 0.72)",
            backdropFilter: "blur(16px)",
            border: `4px dashed ${systemAccent}`,
            margin: "12px",
            borderRadius: "24px"
          }}
        >
          <div className="text-center space-y-4 max-w-md p-8 bg-black/60 border border-white/5 rounded-3xl backdrop-blur-md shadow-2xl">
            <div className="text-4xl animate-bounce">📥</div>
            <h3 className="text-lg font-bold tracking-widest text-white uppercase font-mono">
              Drop Files to VFS
            </h3>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider leading-relaxed">
              Drop text (.txt, .md) or image (.png, .jpg, .webp) files to sync them directly to the sandbox <span style={{ color: systemAccent }}>Root / Downloads</span> directory.
            </p>
          </div>
        </div>
      )}

      {/* Dynamic Desktop Toast Alert */}
      {toastMsg && (
        <div 
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-full font-mono text-[10px] font-bold tracking-[0.15em] uppercase shadow-2xl flex items-center gap-3 border transition-all duration-300 animate-slideDown"
          style={{
            background: "rgba(10, 10, 10, 0.9)",
            borderColor: `${systemAccent}55`,
            color: systemAccent,
            boxShadow: `0 24px 60px -12px rgba(0,0,0,0.6), 0 0 30px -10px ${systemAccent}44`,
            backdropFilter: "blur(12px)"
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none z-0">
        <Starsfield {...starfieldSettings} />
      </div>

      <KineticHeader />

      <div ref={desktopRef} className="flex-1 relative overflow-hidden">
        {/* Snap Preview Ghost Outline Overlay */}
        <AnimatePresence>
          {snapPreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute pointer-events-none z-[40]"
              style={{
                top: 0,
                bottom: 0,
                left: snapPreview === "right" ? "50%" : 0,
                width: snapPreview === "full" ? "100%" : "50%",
                background: `${systemAccent}10`,
                border: `2px dashed ${systemAccent}45`,
                backdropFilter: "blur(4px)",
                boxShadow: `0 0 30px ${systemAccent}15`,
              }}
            />
          )}
        </AnimatePresence>
        {/* Glassmorphic Workspace Shortcuts (Left Side) */}
        {!hasOpenWindow && (
          <div className="absolute top-24 sm:top-28 left-4 sm:left-8 right-4 sm:right-auto flex flex-row sm:flex-col flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 z-10 select-none animate-fadeIn">
            {[
              { id: "explorer", label: "Matrix Files", emoji: "📂", color: "#FFA500" },
              { id: "terminal", label: "Neural Shell", emoji: "⚡", color: "#00FFB8" },
              { id: "paint", label: "Paint Studio", emoji: "🎨", color: "#E8FF47" },
              { id: "calc", label: "Calculator", emoji: "🧮", color: "#00E5FF" },
              { id: "music", label: "Synapse Beats", emoji: "🎵", color: "#FF66CC" },
              { id: "monitor", label: "Task Manager", emoji: "📊", color: "#00E5FF" },
            ].map((shortcut) => (
              <button
                key={shortcut.id}
                onClick={() => {
                  playSound("open");
                  openApp(shortcut.id);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-2xl w-[74px] hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer group"
              >
                <span 
                  className="mb-1.5 transition-transform group-hover:scale-110 duration-200 flex items-center justify-center"
                  style={{ color: shortcut.color }}
                >
                  {APPS.find((app) => app.id === shortcut.id)?.icon || shortcut.emoji}
                </span>
                <span
                  className="text-[8px] font-bold uppercase tracking-wider font-mono text-center leading-normal"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {shortcut.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Floating Workspace Telemetry Widgets (Right Side) */}
        {!hasOpenWindow && (
          <div className="hidden md:flex absolute top-28 right-8 flex flex-col gap-5 z-10 select-none w-52 animate-fadeIn">
            {/* Real-time resource Telemetry widget */}
            <div
              className="rounded-2xl p-4 flex flex-col gap-3"
              style={{
                background: "rgba(8,8,8,0.4)",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[8px] font-bold tracking-widest text-[#00E5FF]/60 uppercase">
                  Telemetry Pulse
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-2 text-[9.5px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>CPU STACK</span>
                  <span className="text-white font-bold">14% ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>RAM TOTAL</span>
                  <span className="text-white font-bold">24.2 GB</span>
                </div>
                <div className="flex justify-between">
                  <span>PING LATENCY</span>
                  <span className="text-emerald-400 font-bold">12ms</span>
                </div>
              </div>
            </div>

            {/* Matrix Calendar Widget */}
            <div
              className="rounded-2xl p-4 flex flex-col gap-3"
              style={{
                background: "rgba(8,8,8,0.4)",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[8px] font-bold tracking-widest text-[#FF6B6B]/60 uppercase">
                  Neural Calendar
                </span>
                <span className="text-[9px] text-[#FF6B6B]/60">UTC</span>
              </div>
              <div className="text-center font-mono">
                <div className="text-2xl font-bold tracking-wider text-slate-100">
                  {new Date()
                    .toLocaleDateString(undefined, { day: "2-digit", month: "short" })
                    .toUpperCase()}
                </div>
                <div className="text-[9px] text-slate-400 tracking-[0.2em] uppercase mt-1">
                  {new Date().toLocaleDateString(undefined, { weekday: "long" })}
                </div>
              </div>
            </div>
          </div>
        )}

        <RotorCarousel
          openApp={openApp}
          windows={windows}
          starfieldSettings={starfieldSettings}
          minimizeAllApps={minimizeAllApps}
        />

        {/* --- START MENU --- */}
        <AnimatePresence>
          {isStartMenuOpen && (
            <>
              <div className="absolute inset-0 z-20" onClick={() => setIsStartMenuOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-20 left-8 z-30 pointer-events-auto w-[360px]"
                style={{
                  background: "rgba(8,8,8,0.96)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "20px",
                  backdropFilter: "blur(40px)",
                  boxShadow: "0 40px 80px -20px rgba(0,0,0,0.9)",
                }}
              >
                <div className="p-5 max-h-[380px] overflow-y-auto scrollbar-thin">
                  <div
                    className="text-[9px] tracking-[0.35em] uppercase mb-4"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    Pinned Applications
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {APPS.map((app) => (
                      <button
                        key={app.id}
                        onClick={() => {
                          playSound("open");
                          openApp(app.id);
                          setIsStartMenuOpen(false);
                        }}
                        className="flex flex-col items-center gap-2 p-3 transition-all cursor-pointer rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${app.accent}0d`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${app.accent}33`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                        }}
                      >
                        <div style={{ color: app.accent }}>{app.icon}</div>
                        <span
                          className="text-[8px] font-bold uppercase tracking-wider text-center"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          {app.id}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span
                      className="text-[9px] tracking-wider uppercase"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      DevCore Connected
                    </span>
                  </div>
                  <button
                    onClick={onCloseOS}
                    className="text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer bg-transparent"
                    style={{ color: "#FF5F57", border: "1px solid rgba(255,95,87,0.3)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,95,87,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    Shut Down
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* --- APP WINDOWS --- */}
        <AnimatePresence>
          {Object.values(windows).map((win) => {
            if (!win.isOpen || win.isMinimized) return null;
            return (
              <WindowChrome
                key={win.id}
                win={win}
                onClose={() => closeApp(win.id)}
                onMinimize={() => minimizeApp(win.id)}
                onMaximize={() => maximizeApp(win.id)}
                onFocus={() => focusApp(win.id)}
                onSnap={(side) => snapWindow(win.id, side)}
                onResize={(w, h) => {
                  setWindows((prev) => ({
                    ...prev,
                    [win.id]: { ...prev[win.id], width: w, height: h },
                  }));
                }}
                onDragUpdate={(clientX, clientY, isDragging) => handleDragUpdate(clientX, clientY, isDragging)}
                onDragEnd={(clientX, clientY) => handleDragEnd(win.id, clientX, clientY)}
                desktopRef={desktopRef}
              >
                {win.id === "skills" && renderSkills()}
                {win.id === "projects" && renderProjects()}
                {win.id === "education" && renderEducation()}
                {win.id === "arena" && <CodeReviewArena />}
                {win.id === "chat" && <div className="h-full max-h-[480px]">{renderChatBot()}</div>}
                {win.id === "terminal" && <NeuralShell />}
                {win.id === "explorer" && <MatrixExplorer />}
                {win.id === "music" && <BeatsPlayer />}
                {win.id === "monitor" && (
                  <SystemMonitor
                    windows={windows}
                    minimizeApp={minimizeApp}
                    focusApp={focusApp}
                    closeApp={closeApp}
                  />
                )}
                {win.id === "paint" && <PaintStudio />}
                {win.id === "calc" && <CyberCalculator />}
                {win.id === "dashboard" && (
                  <DashboardPanel
                    starfieldSettings={starfieldSettings}
                    setStarfieldSettings={setStarfieldSettings}
                    activeSettingCategory={activeSettingCategory}
                    setActiveSettingCategory={setActiveSettingCategory}
                  />
                )}
              </WindowChrome>
            );
          })}
        </AnimatePresence>
      </div>

      {/* --- BOTTOM DOCK --- */}
      <div className="relative z-[100] shrink-0">
        <div
          className="absolute bottom-5 left-6 flex items-center gap-3 px-4 py-2.5 rounded-2xl"
          style={{
            background: isLight ? "rgba(255,255,255,0.8)" : "rgba(8,8,8,0.85)",
            border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
          }}
        >
          <button
            onClick={() => {
              playSound("click");
              setIsStartMenuOpen(!isStartMenuOpen);
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border-0"
            style={{
              background: `${systemAccent}15`,
              border: `1px solid ${systemAccent}33`,
              color: systemAccent,
              fontSize: "14px",
            }}
            title="Start Menu"
          >
            ⬡
          </button>

          <button
            onClick={() => {
              playSound("click");
              setIsHudOpen(true);
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border-0"
            style={{
              background: `rgba(255,255,255,0.05)`,
              border: `1px solid rgba(255,255,255,0.1)`,
              color: "#ffffff",
            }}
            title="Launch Command HUD (Ctrl+K)"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: systemAccent }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            onClick={toggleMute}
            className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/20 bg-white/5 cursor-pointer text-[12px] hover:scale-105"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            style={{ color: isMuted ? "#FF5F57" : systemAccent }}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "12px" }}>
            <ThreeDDigitalClock />
          </div>
          <button
            onClick={onCloseOS}
            className="text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer bg-transparent"
            style={{ color: "#FF5F57", border: "1px solid rgba(255,95,87,0.25)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,95,87,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Exit OS
          </button>
        </div>

        {(() => {
          const running = Object.values(windows).filter((w) => w.isOpen);
          if (!running.length) return null;
          return (
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-2xl max-w-[50vw] overflow-x-auto scrollbar-none"
              style={{
                background: isLight ? "rgba(255,255,255,0.8)" : "rgba(8,8,8,0.85)",
                border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(24px)",
              }}
            >
              {running.map((app, idx) => {
                const appConfig = APPS.find((a) => a.id === app.id);
                const isMin = app.isMinimized;
                const isFocused = activeWindowId === app.id;
                return (
                  <React.Fragment key={app.id}>
                    {idx > 0 && (
                      <div
                        className="w-px h-4 shrink-0"
                        style={{
                          background: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)",
                        }}
                      />
                    )}
                    <button
                      onClick={() => {
                        playSound("click");
                        if (isMin) {
                          setWindows((prev) => ({
                            ...prev,
                            [app.id]: { ...prev[app.id], isMinimized: false },
                          }));
                          setActiveWindowId(app.id);
                        } else if (isFocused) {
                          minimizeApp(app.id);
                        } else {
                          focusApp(app.id);
                        }
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 border-0"
                      style={{
                        background: isFocused
                          ? `${appConfig?.accent || systemAccent}15`
                          : "transparent",
                        border: isFocused
                          ? `1px solid ${appConfig?.accent || systemAccent}35`
                          : "1px solid transparent",
                      }}
                    >
                      <div
                        style={{
                          color: isMin
                            ? isLight
                              ? "rgba(0,0,0,0.25)"
                              : "rgba(255,255,255,0.25)"
                            : appConfig?.accent || systemAccent,
                        }}
                      >
                        {appConfig?.icon &&
                          React.cloneElement(appConfig.icon as React.ReactElement<any>, {
                            width: 14,
                            height: 14,
                          })}
                      </div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          color: isMin
                            ? isLight
                              ? "rgba(0,0,0,0.3)"
                              : "rgba(255,255,255,0.3)"
                            : isLight
                            ? "#000"
                            : "#fff",
                        }}
                      >
                        {app.id}
                      </span>
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ background: isMin ? "rgba(255,255,255,0.2)" : "#28C840" }}
                      />
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* --- COMMAND HUD SPOTLIGHT OVERLAY --- */}
      <AnimatePresence>
        {isHudOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsHudOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-[540px] rounded-2xl overflow-hidden shadow-2xl border"
              style={{
                background: isLight ? "rgba(255,255,255,0.92)" : "rgba(10,10,15,0.94)",
                borderColor: `${systemAccent}40`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${systemAccent}15`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input header */}
              <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: systemAccent }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  autoFocus
                  type="text"
                  placeholder="Type to search apps, set accents, run VFS write commands..."
                  value={hudQuery}
                  onChange={(e) => {
                    setHudQuery(e.target.value);
                    setHudSelectedIndex(0);
                  }}
                  onKeyDown={handleHudKeyDown}
                  className="w-full bg-transparent border-none outline-none text-[13px] font-medium"
                  style={{
                    color: isLight ? "#1a1a1a" : "#ffffff",
                  }}
                />
                <span className="text-[9px] px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.08)", color: isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}>ESC</span>
              </div>

              {/* Items List */}
              <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                {hudItems.length > 0 ? (
                  hudItems.map((item, index) => {
                    const isSel = index === hudSelectedIndex;
                    return (
                      <div
                        key={index}
                        onClick={item.action}
                        onMouseEnter={() => setHudSelectedIndex(index)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                        style={{
                          background: isSel
                            ? `${systemAccent}15`
                            : "transparent",
                          border: isSel
                            ? `1px solid ${systemAccent}30`
                            : "1px solid transparent",
                        }}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="text-[12px] font-bold tracking-wide"
                            style={{
                              color: isSel
                                ? isLight ? "#000" : "#fff"
                                : isLight ? "#333" : "rgba(255,255,255,0.85)",
                            }}
                          >
                            {item.title}
                          </span>
                          <span
                            className="text-[10px] font-mono tracking-tight opacity-60"
                            style={{
                              color: isLight ? "#666" : "rgba(255,255,255,0.5)",
                            }}
                          >
                            {item.subtitle}
                          </span>
                        </div>

                        {item.badge && (
                          <span
                            className="text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider"
                            style={{
                              background: isSel
                                ? `${systemAccent}30`
                                : "rgba(255,255,255,0.05)",
                              color: isSel
                                ? systemAccent
                                : isLight ? "#666" : "rgba(255,255,255,0.4)",
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-[11px] font-mono" style={{ color: isLight ? "#888" : "rgba(255,255,255,0.3)" }}>
                    No matching commands found.
                  </div>
                )}
              </div>

              {/* HUD footer */}
              <div className="flex items-center justify-between px-4 py-2 text-[9px] font-mono border-t" style={{ borderColor: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", color: isLight ? "#666" : "rgba(255,255,255,0.4)" }}>
                <span className="flex items-center gap-1">
                  <span>Use</span>
                  <span className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↑↓</span>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>Press</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↵ Enter</span>
                  <span>to launch</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default AeroOS;
