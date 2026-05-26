import { motion } from "motion/react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] p-8 sm:p-16">
      <nav className="flex gap-8 mb-12 border-b border-gray-200 pb-4 font-mono text-xs text-[#1a1a1a]/60">
        {[
          { path: "/", label: "HOME" },
          { path: "/skills", label: "SKILLS" },
          { path: "/projects", label: "PROJECTS" },
          { path: "/education", label: "EDUCATION" },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`hover:text-blue-600 transition-colors ${location.pathname === link.path ? "text-blue-600 font-bold" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
