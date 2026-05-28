import { motion } from "motion/react";
import { RESUME_DATA } from "../data";
import { EyeButton } from "./EyeButton";

export function Header({ onLaunchOS }: { onLaunchOS?: () => void }) {
  return (
    <header className="border-b border-gray-200 dark:border-slate-800 pb-12 mb-16">
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-slate-400 font-mono mb-8 select-none">
        {/* Playful Floating Eyes (Top-Left of Home) */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <EyeButton
            minimal
            eyeCount={2}
            eyeSize={18}
            pupilSize={7}
            eyeGap={4.5}
            range={4}
            speed={0.2}
            blinking
            loveMode={false}
            eyeColor="bg-white dark:bg-slate-900"
            pupilColor="bg-slate-950 dark:bg-slate-100"
          />
          <span className="text-[10px] text-gray-400 dark:text-slate-500 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1">
            always watching...
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onLaunchOS && (
            <button
              onClick={onLaunchOS}
              className="flex items-center gap-1.5 px-3 py-1 bg-blue-600/10 hover:bg-blue-600 dark:bg-blue-500/10 dark:hover:bg-blue-500 text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white border border-blue-500/35 hover:border-blue-500 rounded-full text-[10px] font-mono font-bold cursor-pointer transition-all hover:scale-105 active:scale-[0.98] mr-2 shadow-sm uppercase tracking-wider"
              title="Launch AeroOS Desktop Layout"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-ping" />
              ⚡ Launch AeroOS
            </button>
          )}
          <a
            href={`mailto:${RESUME_DATA.contact.email}`}
            title={`Email: ${RESUME_DATA.contact.email}`}
            className="flex items-center justify-center w-7 h-7 rounded-sm border border-gray-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 bg-white dark:bg-slate-900 text-[#1a1a1a]/70 dark:text-slate-350 hover:shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a
            href={`https://${RESUME_DATA.contact.linkedin}`}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn Profile"
            className="flex items-center justify-center w-7 h-7 rounded-sm border border-gray-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 bg-white dark:bg-slate-900 text-[#1a1a1a]/70 dark:text-slate-350 hover:shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href={`tel:${RESUME_DATA.contact.phone}`}
            title={`Phone: ${RESUME_DATA.contact.phone}`}
            className="flex items-center justify-center w-7 h-7 rounded-sm border border-gray-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 bg-white dark:bg-slate-900 text-[#1a1a1a]/70 dark:text-slate-350 hover:shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <a
            href={`https://${RESUME_DATA.contact.github}`}
            target="_blank"
            rel="noreferrer"
            title="GitHub Profile"
            className="flex items-center justify-center w-7 h-7 rounded-sm border border-gray-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 bg-white dark:bg-slate-900 text-[#1a1a1a]/70 dark:text-slate-350 hover:shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl xs:text-5xl sm:text-7xl font-bold text-[#1a1a1a] dark:text-slate-100 mb-6 font-retro tracking-wide leading-none select-none uppercase">
          <span className="text-blue-600 dark:text-blue-500">CHAVVA AKSHAY</span><br />
          KUMAR REDDY
          <span className="text-blue-600 dark:text-blue-500 animate-retro-blink ml-2">█</span>
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-6">
          <div className="flex flex-wrap gap-3 text-[11px] sm:text-sm text-[#1a1a1a]/70 dark:text-slate-400 font-mono">
            <span className="border-b border-[#1a1a1a]/30 dark:border-slate-800/80">Software Engineering</span>
            <span className="border-b border-[#1a1a1a]/30 dark:border-slate-800/80">Front-end Development</span>
            <span className="border-b border-[#1a1a1a]/30 dark:border-slate-800/80">AI & Data Analytics</span>
          </div>
          <a
            href="/Akshay_resume.pdf"
            download="Akshay_Kumar_Reddy_Resume.pdf"
            className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all text-xs font-mono font-bold rounded-sm shadow-sm select-none"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            DOWNLOAD RESUME
          </a>
        </div>
      </motion.div>
    </header>
  );
}
