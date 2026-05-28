import React from "react";

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: string | number;
  height: string | number;
  zIndex: number;
}

export interface AppConfig {
  id: string;
  name: string;
  label: string;
  sublabel: string;
  accent: string;
  bg: string;
  icon: React.ReactNode;
}

export const APPS: AppConfig[] = [
  {
    id: "skills",
    name: "Skills Vault",
    label: "TECHNICAL",
    sublabel: "01 — EXPERTISE",
    accent: "#E8FF47",
    bg: "linear-gradient(135deg, #0f0f0f 0%, #1a1a0a 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L2 16l14 14 14-14L16 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16 7L7 16l9 9 9-9-9-9z" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="16" cy="16" r="3.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "projects",
    name: "Code Pipeline",
    label: "PROJECTS",
    sublabel: "02 — BUILDS",
    accent: "#FF6B6B",
    bg: "linear-gradient(135deg, #0f0505 0%, #1a0808 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 10l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 22h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M26 6h-6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <circle cx="21" cy="11" r="2.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "education",
    name: "Intel Matrix",
    label: "EDUCATION",
    sublabel: "03 — ACADEMICS",
    accent: "#7EB8FF",
    bg: "linear-gradient(135deg, #05080f 0%, #080d1a 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon points="16,4 30,11 16,18 2,11" stroke="currentColor" strokeWidth="2" />
        <path d="M6 13v7.5c0 3.5 4.5 5.5 10 5.5s10-2 10-5.5V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="30" y1="11" x2="30" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="30" cy="21" r="2.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "arena",
    name: "Code Arena",
    label: "REVIEW",
    sublabel: "04 — AI JUDGE",
    accent: "#B8FFB8",
    bg: "linear-gradient(135deg, #050f05 0%, #081a08 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L4 9v9c0 6.6 5.1 11 12 12.5 6.9-1.5 12-5.9 12-12.5V9L16 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 8v14M11 15h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
        <circle cx="16" cy="15" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "chat",
    name: "Cognitive AI",
    label: "NEURAL CHAT",
    sublabel: "05 — AI AGENT",
    accent: "#FFB8FF",
    bg: "linear-gradient(135deg, #0f050f 0%, #1a081a 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4c-6.6 0-12 4.5-12 10 0 3.2 1.8 6.1 4.8 7.8L7 27l5.5-2.8c1.1.5 2.3.8 3.5.8 6.6 0 12-4.5 12-10S22.6 4 16 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="2" fill="currentColor" />
        <circle cx="16" cy="14" r="2" fill="currentColor" />
        <circle cx="20" cy="14" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    id: "dashboard",
    name: "System",
    label: "SETTINGS",
    sublabel: "06 — CONTROL",
    accent: "#FFD700",
    bg: "linear-gradient(135deg, #0f0e05 0%, #1a1a08 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="5.5" stroke="currentColor" strokeWidth="2.2" />
        <path d="M16 2v4M16 26v4M2 16h4M26 16h4M6 6l3.5 3.5M22.5 22.5l3.5 3.5M6 26l3.5-3.5M22.5 9.5l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "terminal",
    name: "Neural Shell",
    label: "CLI TERMINAL",
    sublabel: "07 — SHELL",
    accent: "#00FFB8",
    bg: "linear-gradient(135deg, #020f0a 0%, #051a14 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="4" width="26" height="24" rx="3.5" stroke="currentColor" strokeWidth="2" />
        <polyline points="7,10 13,16 7,22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="15" y1="22" x2="25" y2="22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "explorer",
    name: "Matrix Files",
    label: "FILE SYSTEM",
    sublabel: "08 — EXPLORER",
    accent: "#FFA500",
    bg: "linear-gradient(135deg, #0f0e02 0%, #1a1905 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M3 6a2 2 0 0 1 2-2h6.5l3 3.5H27a2 2 0 0 1 2 2v16.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M3 11.5h26" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
        <rect x="7" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <line x1="16" y1="16" x2="25" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="16" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      </svg>
    )
  },
  {
    id: "music",
    name: "Synapse Beats",
    label: "NEURAL MUSIC",
    sublabel: "09 — BEATS",
    accent: "#FF66CC",
    bg: "linear-gradient(135deg, #12020e 0%, #1c0517 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="9" cy="22" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="23" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M14 22V6l14-3v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11.5l14-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "monitor",
    name: "Pulse Monitor",
    label: "TASK MANAGER",
    sublabel: "10 — SYSTEM",
    accent: "#00E5FF",
    bg: "linear-gradient(135deg, #020e14 0%, #051821 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="4" width="26" height="24" rx="3.5" stroke="currentColor" strokeWidth="2" />
        <path d="M6 16h3.5l2.5-8.5 3.5 17 3-11.5 2 3H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "paint",
    name: "Aero Paint",
    label: "CREATIVE",
    sublabel: "11 — CANVAS",
    accent: "#E8FF47",
    bg: "linear-gradient(135deg, #0d0f02 0%, #171a05 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M12 28a6 6 0 1 0-6-6v6h6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 22L22 6l4 4L10 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 6l-2-2-4 4 2 2 4-4z" fill="currentColor" opacity="0.8" />
      </svg>
    )
  },
  {
    id: "calc",
    name: "Matrix Calc",
    label: "NUMERICS",
    sublabel: "12 — CALC",
    accent: "#00E5FF",
    bg: "linear-gradient(135deg, #020f14 0%, #051921 100%)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="3.5" stroke="currentColor" strokeWidth="2" />
        <line x1="4" y1="11" x2="28" y2="11" stroke="currentColor" strokeWidth="1.8" />
        <rect x="8" y="15" width="3" height="3" rx="0.8" fill="currentColor" />
        <rect x="14" y="15" width="3" height="3" rx="0.8" fill="currentColor" />
        <rect x="20" y="15" width="3" height="3" rx="0.8" fill="currentColor" />
        <rect x="8" y="21" width="3" height="3" rx="0.8" fill="currentColor" />
        <rect x="14" y="21" width="3" height="3" rx="0.8" fill="currentColor" />
        <rect x="20" y="21" width="3" height="3" rx="0.8" fill="currentColor" />
      </svg>
    )
  }
];
