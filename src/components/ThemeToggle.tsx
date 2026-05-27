import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  variant?: "switch" | "button";
  size?: "sm" | "md" | "lg";
}

export function ThemeToggle({ variant = "switch", size = "md" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Sync theme to root HTML element and LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark) ? "dark" : "light";
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Listen to system theme preference changes dynamically
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        const nextTheme = e.matches ? "dark" : "light";
        setTheme(nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  // Handle toggling the theme manually
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Trigger a custom event to notify other components (like CommandMenu) if needed
    window.dispatchEvent(new CustomEvent("theme-changed", { detail: nextTheme }));
  };

  // Register window-level toggle hooks for the command menu spotlight integration
  useEffect(() => {
    const handleToggleCommand = () => {
      toggleTheme();
    };
    window.addEventListener("trigger-theme-toggle", handleToggleCommand);
    return () => window.removeEventListener("trigger-theme-toggle", handleToggleCommand);
  }, [theme]);

  const isDark = theme === "dark";

  // Sizing definitions
  const sizeClasses = {
    sm: variant === "switch" ? "w-11 h-6 p-0.5" : "w-8 h-8",
    md: variant === "switch" ? "w-14 h-7.5 p-1" : "w-9.5 h-9.5",
    lg: variant === "switch" ? "w-18 h-10 p-1.5" : "w-12 h-12",
  };

  const handleSizeClasses = {
    sm: "w-5 h-5",
    md: "w-5.5 h-5.5",
    lg: "w-7 h-7",
  };

  if (variant === "button") {
    return (
      <motion.button
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`${sizeClasses[size]} flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-700/60 shadow-sm transition-colors cursor-pointer select-none`}
        title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0.9 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-lg flex items-center justify-center"
        >
          {isDark ? (
            // Premium Moon SVG
            <svg className="w-5 h-5 text-indigo-400 fill-indigo-400" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // Premium Sun SVG
            <svg className="w-5 h-5 text-amber-500 fill-amber-100" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </motion.div>
      </motion.button>
    );
  }

  // Switch Style: Premium sliding pill
  return (
    <div
      onClick={toggleTheme}
      className={`${sizeClasses[size]} rounded-full bg-gray-200 dark:bg-slate-800 border border-gray-300/40 dark:border-slate-700/40 flex items-center cursor-pointer relative shadow-inner select-none transition-colors duration-300`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        animate={{ x: isDark ? (size === "lg" ? 28 : size === "md" ? 24 : 18) : 0 }}
        className={`${handleSizeClasses[size]} rounded-full bg-white dark:bg-slate-900 border border-gray-300/20 dark:border-slate-800 shadow-md flex items-center justify-center`}
      >
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            // Moon Icon inside handle
            <svg className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // Sun Icon inside handle
            <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
