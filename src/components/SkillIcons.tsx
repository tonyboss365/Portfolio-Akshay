import React from "react";

// Brand-colored, high-fidelity SVGs for the skills
export const SKILL_ICONS: Record<string, React.ReactNode> = {
  "Python": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M11.966 2.004c-2.316.002-4.407.25-5.352.616-.944.367-1.637 1.077-1.928 2.054-.316 1.066-.316 2.21-.316 3.493v1.17h7.91v1.11H4.37v2.34c0 1.282.022 2.454.337 3.52.291.977.984 1.687 1.928 2.054.945.366 3.036.614 5.352.616h.4v-2.736h-4.32a1.6 1.6 0 0 1-1.6-1.6v-2.34H16.32v-3.9H8.41V8.14h4.32a1.6 1.6 0 0 1 1.6 1.6v2.34h2.34c1.283 0 2.454.022 3.52.337.977.291 1.687.984 2.054 1.928.366.945.614 3.036.616 5.352v.4c.002-2.316-.25-4.407-.616-5.352-.367-.944-1.077-1.637-2.054-1.928-1.066-.316-2.21-.316-3.493-.316h-1.17V8.911h-7.91v-1.11h7.91V5.461c0-1.283-.022-2.454-.337-3.52-.291-.977-.984-1.687-1.928-2.054-.945-.366-3.036-.614-5.352-.616h-.4z" fill="#3776AB" />
    </svg>
  ),
  "Java": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M1.972 17.728c0 1.936 3.464 3.504 7.736 3.504s7.736-1.568 7.736-3.504c0-1.224-1.392-2.312-3.608-2.92.32-.44.592-.936.784-1.488 2.096.528 3.528 1.496 3.528 2.656 0 1.936-3.464 3.504-7.736 3.504S2.7 18.232 2.7 16.296c0-1.128 1.344-2.072 3.32-2.6-1.24-.76-2.144-1.928-2.584-3.488-1.576.712-2.464 1.704-2.464 2.808v4.712zm10.744-8.88c0 1.936-1.568 3.504-3.504 3.504S5.708 10.784 5.708 8.848s1.568-3.504 3.504-3.504c1.928 0 3.504 1.568 3.504 3.504zm-1.128 0c0-1.312-1.064-2.376-2.376-2.376s-2.376 1.064-2.376 2.376c0 1.304 1.064 2.376 2.376 2.376s2.376-1.072 2.376-2.376z" fill="#007396" />
    </svg>
  ),
  "C": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 14.54c-.95.73-2.22 1.16-3.69 1.16-3.21 0-5.59-2.38-5.59-5.7s2.38-5.7 5.59-5.7c1.47 0 2.74.43 3.69 1.16l-1.63 2.14c-.58-.45-1.28-.7-2.06-.7-1.84 0-3.18 1.34-3.18 3.1s1.34 3.1 3.18 3.1c.78 0 1.48-.25 2.06-.7l1.63 2.14z" fill="#00599C" />
    </svg>
  ),
  "JavaScript": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path d="M19.98 17.8c-.28 1.45-1.3 2.38-2.9 2.38-2.05 0-3.1-1.12-3.1-3.26v-.12h1.8v.16c0 1.05.5 1.55 1.3 1.55.76 0 1.12-.34 1.12-.9 0-.6-.35-.88-1.3-1.3l-.68-.28c-1.3-.57-2.08-1.3-2.08-2.82 0-1.8 1.38-2.83 3.13-2.83 1.83 0 2.87 1.04 2.87 2.65h-1.85c-.03-.7-.38-1.07-1.02-1.07-.63 0-.96.3-.96.8 0 .54.3.77 1.05 1.1l.66.27c1.54.67 2.3 1.3 2.3 2.86v.02zM10.96 11.23v5.66c0 1.63-1.04 2.4-2.58 2.4-1.33 0-2.2-.6-2.5-1.83h1.83c.18.57.54.83 1.07.83.6 0 .9-.35.9-1.06v-6h1.28z" fill="#000000" />
    </svg>
  ),
  "TypeScript": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path d="M20 17.5c0 1.5-1.2 2.5-2.8 2.5-1.8 0-2.8-1-2.8-3.1v-.1h1.8v.1c0 1.1.5 1.5 1.1 1.5.6 0 1-.3 1-.9 0-.6-.3-.8-1.2-1.2l-.7-.3c-1.2-.5-1.9-1.2-1.9-2.7 0-1.7 1.2-2.7 2.8-2.7 1.7 0 2.7 1 2.7 2.5h-1.8c0-.7-.3-1-1-1s-.9.3-.9.8c0 .5.3.7 1 .9l.7.3c1.3.6 2 1.2 2 2.7v.1zM13.6 11.2h-3v8.8h-1.8v-8.8h-3V9.6h7.8v1.6z" fill="#FFFFFF" />
    </svg>
  ),
  "HTML": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M1.5 22L0 0h24l-1.5 22L12 24 1.5 22z" fill="#E34F26" />
      <path d="M12 21.8l7.8-2.1 1.2-14.7H12v16.8z" fill="#EF652A" />
      <path d="M6 10h6V8H3.8L4.2 3.6h15.6l-.3 3.6H12v2h7.3l-.7 7.7L12 18.8l-6.6-1.9L5 11h2l.4 4.5 4.6 1.3 4.6-1.3.4-4.5H6v-1z" fill="#FFFFFF" />
    </svg>
  ),
  "CSS": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M1.5 22L0 0h24l-1.5 22L12 24 1.5 22z" fill="#1572B6" />
      <path d="M12 21.8l7.8-2.1 1.2-14.7H12v16.8z" fill="#33A9DC" />
      <path d="M17.6 10.4h-5.6V8.4H18l.3-3.6H6.1L6.7 9h11l-.3 3.6H12v2h5.2l-.5 5.6L12 21.3l-4.7-1.3-.3-3.6h2l.2 2 2.8.8 2.8-.8.3-3.6h-5.6v-2h6l.1-2.4z" fill="#FFFFFF" />
    </svg>
  ),
  "React.js": (
    <svg className="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(0, 12, 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60, 12, 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120, 12, 12)" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    </svg>
  ),
  "Next.js": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#000000" />
      <path d="M19.5 19.5L9 6.5H7.5v11h1.5v-8.5l9 11.5c.5-.4 1-.8 1.5-1z" fill="#FFFFFF" />
      <rect x="15" y="6.5" width="1.5" height="11" fill="#FFFFFF" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 6.036c-2.402 0-4.337.818-5.804 2.455C4.729 10.127 4 12.355 4 15.174c0 3.23 1.343 5.485 4.029 6.764 1.396.666 3.037 1 4.922 1 2.392 0 4.316-.8 5.772-2.4 1.455-1.6 2.183-3.8 2.183-6.6 0-3.328-1.365-5.617-4.097-6.867-1.39-.637-3.003-.956-4.809-.956zm6.273 6.945c0 1.956-.516 3.424-1.547 4.402-.977.93-2.28 1.395-3.906 1.395-1.312 0-2.4-.23-3.26-.69C8.36 17.447 7.7 16.036 7.7 13.856c0-2.008.533-3.528 1.6-4.56C10.33 8.27 11.666 7.75 13.3 7.75c1.24 0 2.27.228 3.09.684 1.25.684 1.883 2.102 1.883 4.547z" fill="#38BDF8" />
    </svg>
  ),
  "Node.js": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm7.3 14.1l-7.3 4.1-7.3-4.1V8.9l7.3-4.1 7.3 4.1v7.2z" fill="#339933" />
      <path d="M12 6.5L6.5 9.6v4.8L12 17.5l5.5-3.1V9.6L12 6.5zm4 7.2l-4 2.2-4-2.2v-3.4l4-2.2 4 2.2v3.4z" fill="#339933" />
    </svg>
  ),
  "Express.js": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="3" fill="#000000" />
      <text x="3" y="16" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">ex</text>
    </svg>
  ),
  "FastAPI": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 0L1.5 9.5h7.5L3.5 24 22.5 11h-9.5L12 0z" fill="#009688" />
    </svg>
  ),
  "MySQL": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2v-2h2v2z" fill="#00758F" />
    </svg>
  ),
  "MongoDB": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 1.5C12 1.5 6 7.5 6 12.5s4 7.5 6 10c2-2.5 6-5 6-10s-6-11-6-11zm0 18.5c-.8-1.5-3-4-3-7.5 0-3 1.8-5.5 3-7.5 1.2 2 3 4.5 3 7.5 0 3.5-2.2 6-3 7.5z" fill="#47A248" />
    </svg>
  ),
  "SQLite": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm8 14.5L12 20l-8-3.5V8.5L12 5l8 3.5v8z" fill="#003B57" />
    </svg>
  ),
  "Git": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M23.3 11.5L12.5.7c-.5-.5-1.3-.5-1.8 0L9 2.4l3.1 3.1c.3-.1.7-.1 1 0 .6.3.9.9.9 1.6 0 .7-.3 1.3-.9 1.6-.3.2-.7.2-1 0L9 5.6V15c.3.1.6.3.8.6.6.6.6 1.5 0 2.1s-1.5.6-2.1 0c-.6-.6-.6-1.5 0-2.1.2-.2.5-.4.8-.5V9.6c-.3-.1-.6-.3-.8-.6L4.6 5.9c-.5-.5-.5-1.3 0-1.8L.7 10.7c-.5.5-.5 1.3 0 1.8l10.8 10.8c.5.5 1.3.5 1.8 0l10-10c.5-.5.5-1.3 0-1.8z" fill="#F05032" />
    </svg>
  ),
  "GitHub": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  "VS Code": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M23.9 6.5l-2.6-2.4c-.4-.4-1-.4-1.4 0L12 12.1 4.1 4.1c-.4-.4-1-.4-1.4 0L.1 6.5c-.2.2-.2.5 0 .7l7.8 7.8-7.8 7.8c-.2.2-.2.5 0 .7l2.6 2.4c.4.4 1 .4 1.4 0l7.9-8 7.9 8c.4.4 1 .4 1.4 0l2.6-2.4c.2-.2.2-.5 0-.7l-7.8-7.8 7.8-7.8c.2-.2.2-.5 0-.7z" fill="#007ACC" />
    </svg>
  ),
  "Vercel": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 22h20L12 2z" />
    </svg>
  )
};

export function getSkillIcon(skillName: string): React.ReactNode {
  // Direct matching
  if (SKILL_ICONS[skillName]) {
    return SKILL_ICONS[skillName];
  }

  // Key fuzzy matching
  const lower = skillName.toLowerCase();
  if (lower.includes("react")) return SKILL_ICONS["React.js"];
  if (lower.includes("next")) return SKILL_ICONS["Next.js"];
  if (lower.includes("tailwind")) return SKILL_ICONS["Tailwind CSS"];
  if (lower.includes("node")) return SKILL_ICONS["Node.js"];
  if (lower.includes("express")) return SKILL_ICONS["Express.js"];
  if (lower.includes("fastapi")) return SKILL_ICONS["FastAPI"];
  if (lower.includes("mysql")) return SKILL_ICONS["MySQL"];
  if (lower.includes("mongodb")) return SKILL_ICONS["MongoDB"];
  if (lower.includes("sqlite")) return SKILL_ICONS["SQLite"];
  if (lower.includes("git")) return SKILL_ICONS["Git"];
  if (lower.includes("github")) return SKILL_ICONS["GitHub"];
  if (lower.includes("code")) return SKILL_ICONS["VS Code"];
  if (lower.includes("vercel")) return SKILL_ICONS["Vercel"];

  // Modern clean fallback outline badge icon
  return (
    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}
