import { motion } from "motion/react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { CommandMenu } from "./CommandMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/skills", label: "SKILLS" },
    { path: "/projects", label: "PROJECTS" },
    { path: "/education", label: "EDUCATION" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0b0f19] text-[#1a1a1a] dark:text-slate-100 p-4 sm:p-16 relative overflow-x-hidden transition-colors duration-300">
      {/* Dynamic Background Mesh elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/10 dark:bg-blue-950/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-50/10 dark:bg-indigo-950/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Global Command Menu */}
      <CommandMenu />

      <header className="max-w-5xl mx-auto mb-12">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/80 dark:border-slate-800 pb-5 font-mono text-xs select-none">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-2.5 sm:px-4 py-1.5 sm:py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg font-bold text-[10px] sm:text-xs ${
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-[#1a1a1a]/60 dark:text-slate-400"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-blue-50/70 dark:bg-slate-800 border border-blue-100/30 dark:border-slate-700/30 rounded-lg -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Custom Light/Dark Mode Switch Switcher */}
            <ThemeToggle variant="switch" size="md" />

            {/* Clickable Search Spotlight trigger button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.dispatchEvent(new CustomEvent("trigger-command-menu"))}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700/60 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/20 dark:hover:bg-slate-700/40 text-[9px] sm:text-[10px] text-gray-400 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-mono cursor-pointer shadow-sm select-none"
              title="Search commands (⌘K)"
            >
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-gray-400 dark:text-slate-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
              </span>
              <kbd className="hidden sm:inline-block bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 px-1 py-0.2 rounded font-sans font-bold shadow-sm text-[9px]">⌘K</kbd>
            </motion.button>

            <div className="hidden lg:flex items-center gap-2 text-[10px] text-gray-400 dark:text-slate-400 bg-gray-50 dark:bg-slate-800 border border-gray-200/60 dark:border-slate-700/60 px-3 py-1.5 rounded-xl font-mono">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span>Interactive Stack Connected</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative max-w-5xl mx-auto">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
