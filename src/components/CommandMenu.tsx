import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { RESUME_DATA } from "../data";

interface CommandItem {
  icon: string; // key matching SVG icon map
  label: string;
  category: "Navigation" | "Ask AI Agent" | "Quick Action";
  action: () => void;
  shortcut?: string;
}

// Clean Apple/Google-grade minimal SVG outline icons (Replacing all emojis)
function getCommandIcon(iconType: string, isSelected: boolean) {
  const baseClass = `w-4 h-4 transition-colors duration-200 ${
    isSelected 
      ? "text-white" 
      : "text-blue-600 dark:text-blue-400 group-hover:text-blue-500"
  }`;
  switch (iconType) {
    case "home":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case "bolt":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "code":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "graduation":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      );
    case "ai":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "theme":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    case "resume":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "email":
      return (
        <svg className={baseClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle Command Menu via Cmd+K or Ctrl+K or custom global event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleTrigger = () => {
      setIsOpen(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-command-menu", handleTrigger);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-command-menu", handleTrigger);
    };
  }, []);

  // Reset focus when opening
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const commandItems: CommandItem[] = [
    // Navigation
    {
      icon: "home",
      label: "Go to Home Page",
      category: "Navigation",
      action: () => {
        navigate("/");
        closeMenu();
      },
      shortcut: "G H",
    },
    {
      icon: "bolt",
      label: "Explore Skills Overview",
      category: "Navigation",
      action: () => {
        navigate("/skills");
        closeMenu();
      },
      shortcut: "G S",
    },
    {
      icon: "code",
      label: "View Custom Projects Portfolio",
      category: "Navigation",
      action: () => {
        navigate("/projects");
        closeMenu();
      },
      shortcut: "G P",
    },
    {
      icon: "graduation",
      label: "View Education & Hackathons",
      category: "Navigation",
      action: () => {
        navigate("/education");
        closeMenu();
      },
      shortcut: "G E",
    },
    // Ask AI Prompts
    {
      icon: "ai",
      label: "Ask AI about Learn-Flow AI Platform",
      category: "Ask AI Agent",
      action: () => {
        window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: "Tell me about Learn-Flow" }));
        closeMenu();
      },
      shortcut: "A L",
    },
    {
      icon: "ai",
      label: "Ask AI about B.Tech CSE GPA (9.77)",
      category: "Ask AI Agent",
      action: () => {
        window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: "What is his B.Tech GPA?" }));
        closeMenu();
      },
      shortcut: "A G",
    },
    {
      icon: "ai",
      label: "Ask AI about Hackathon achievements",
      category: "Ask AI Agent",
      action: () => {
        window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: "Show hackathon achievements" }));
        closeMenu();
      },
      shortcut: "A H",
    },
    {
      icon: "ai",
      label: "Ask AI about coding profiles (LeetCode & CodeChef)",
      category: "Ask AI Agent",
      action: () => {
        window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: "Explore coding profiles" }));
        closeMenu();
      },
      shortcut: "A C",
    },
    // Quick Actions
    {
      icon: "theme",
      label: "Toggle Dark / Light Mode Theme",
      category: "Quick Action",
      action: () => {
        window.dispatchEvent(new CustomEvent("trigger-theme-toggle"));
        closeMenu();
      },
      shortcut: "T M",
    },
    {
      icon: "resume",
      label: "Download Professional Resume (PDF)",
      category: "Quick Action",
      action: () => {
        const link = document.createElement("a");
        link.href = "/Akshay_resume.pdf";
        link.download = "Akshay_Kumar_Reddy_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        closeMenu();
      },
      shortcut: "D R",
    },
    {
      icon: "email",
      label: "Copy Professional Email Address",
      category: "Quick Action",
      action: () => {
        navigator.clipboard.writeText(RESUME_DATA.contact.email);
        alert("Email copied to clipboard!");
        closeMenu();
      },
      shortcut: "C E",
    },
  ];

  // Filter commands by search term
  const filteredItems = commandItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Handle keyboard events inside menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Scroll active item into view natively (highly optimized, zero lag)
  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      const activeElement = listElement.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Global toggle button overlay clue (Clickable) */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-200 dark:border-slate-800 px-3.5 py-2 rounded-full shadow-md hover:shadow-lg text-[10px] font-mono text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all select-none cursor-pointer"
        title="Open Command Spotlight (⌘K)"
      >
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        <span>Open Spotlight</span>
        <kbd className="bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 px-1.5 py-0.5 rounded text-[9px] font-sans font-bold shadow-inner text-gray-500 dark:text-slate-350">⌘K</kbd>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 select-none">
            {/* Backdrop: Ultra smooth EaseOutExpo ease */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 bg-[#070b15]/30 dark:bg-black/60 backdrop-blur-[8px] cursor-pointer"
            />

            {/* Menu Panel: High-fidelity Glassmorphic look + Snap transitions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-white/60 dark:bg-slate-955/50 backdrop-blur-2xl border border-white/20 dark:border-slate-850/40 rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col font-mono"
            >
              {/* Input Area */}
              <div className="flex items-center gap-3.5 px-5 py-4 border-b border-gray-200/30 dark:border-slate-800/30">
                {/* Sleek SVG search icon instead of emoji */}
                <svg className="w-4 h-4 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or query..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-0 text-[#1a1a1a] dark:text-slate-100 text-sm focus:outline-none placeholder-gray-450 dark:placeholder-gray-600 font-sans"
                />
                <button
                  onClick={closeMenu}
                  className="text-[10px] bg-gray-100/70 dark:bg-slate-900/60 hover:bg-gray-200/80 dark:hover:bg-slate-800 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-350 px-2 py-1 rounded border border-gray-200/50 dark:border-slate-800 cursor-pointer transition-colors duration-150 flex items-center justify-center min-w-[24px]"
                >
                  <span className="sm:hidden font-sans font-bold">✕</span>
                  <span className="hidden sm:inline">ESC</span>
                </button>
              </div>

              {/* Items List */}
              <div
                ref={listRef}
                className="max-h-[340px] overflow-y-auto p-2 space-y-1 bg-gray-50/10 dark:bg-slate-950/10 scroll-smooth"
              >
                {filteredItems.length > 0 ? (
                  (() => {
                    let currentCategory = "";
                    return filteredItems.map((item, index) => {
                      const showCategory = item.category !== currentCategory;
                      if (showCategory) {
                        currentCategory = item.category;
                      }

                      const isSelected = index === selectedIndex;

                      return (
                        <div key={item.label} className="relative">
                          {showCategory && (
                            <div className="px-3 pt-3 pb-1 text-[9px] font-bold text-blue-600/85 dark:text-blue-400 uppercase tracking-widest">
                              {item.category}
                            </div>
                          )}
                          <button
                            data-index={index}
                            onClick={item.action}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left cursor-pointer transition-all duration-100 ${
                              isSelected
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                                : "text-gray-700 dark:text-slate-350 hover:bg-gray-100/60 dark:hover:bg-slate-800/60"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-4 h-4 select-none">
                                {getCommandIcon(item.icon, isSelected)}
                              </span>
                              <span className="font-sans font-medium">
                                {item.label}
                              </span>
                            </div>
                            
                            {item.shortcut && (
                              <span
                                className={`text-[9px] font-sans font-bold px-2 py-0.5 rounded transition-colors duration-100 ${
                                  isSelected
                                    ? "bg-blue-700/80 dark:bg-blue-800/80 text-blue-200 border border-blue-800/60"
                                    : "bg-gray-100 dark:bg-slate-900/60 text-gray-400 dark:text-slate-500 border border-gray-200/50 dark:border-slate-800/60"
                                }`}
                              >
                                {item.shortcut}
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    });
                  })()
                ) : (
                  <div className="p-2 space-y-2">
                    <div className="px-3 pt-2 pb-1 text-[9px] font-bold text-blue-600/85 dark:text-blue-400 uppercase tracking-widest">
                      AI Search Assistant
                    </div>
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent("trigger-ai-chat", { detail: search }));
                        closeMenu();
                      }}
                      className="w-full flex items-center justify-between px-3 py-3 bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-400 rounded-xl text-xs text-left border border-blue-100/40 dark:border-blue-900/30 transition-all cursor-pointer group shadow-sm relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        {/* Custom minimal AI SVG icon replacing emoji */}
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span className="font-sans font-medium">
                          Ask AI Representative about <strong className="font-mono text-blue-600 dark:text-blue-400 group-hover:text-white">"{search}"</strong>
                        </span>
                      </div>
                      <span className="text-[9px] font-sans font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 group-hover:bg-blue-700 group-hover:text-white px-2 py-0.5 rounded border border-blue-200/50 dark:border-blue-800/40 relative z-10">
                        ASK AI
                      </span>
                    </button>
                    <div className="px-4 py-4 text-center text-[10px] text-gray-400 dark:text-slate-500 font-sans">
                      No matching page commands found for "{search}"
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 border-t border-gray-200/25 dark:border-slate-800/25 bg-gray-50/30 dark:bg-slate-950/30 flex justify-between items-center text-[10px] text-gray-400 dark:text-slate-500 select-none">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <span className="text-[12px]">↑↓</span> Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 px-1 py-0.5 rounded font-sans font-bold">↵</kbd> Select
                  </span>
                </div>
                <span>Chavva Akshay Kumar Reddy</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
