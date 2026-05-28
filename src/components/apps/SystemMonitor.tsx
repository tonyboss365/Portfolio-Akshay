import React, { useState, useEffect } from "react";
import { useSystem } from "../SystemContext";
import { WindowState } from "./appConfig";

interface SystemMonitorProps {
  windows: Record<string, WindowState>;
  minimizeApp: (id: string) => void;
  focusApp: (id: string) => void;
  closeApp: (id: string) => void;
}

export function SystemMonitor({
  windows,
  minimizeApp,
  focusApp,
  closeApp,
}: SystemMonitorProps) {
  const { playSound } = useSystem();
  const [cpuHistory, setCpuHistory] = useState<number[]>([
    15, 20, 18, 22, 28, 24, 30, 26, 25, 22, 28, 30, 24, 28, 34,
  ]);
  const [networkSpeed, setNetworkSpeed] = useState(14);

  useEffect(() => {
    const timer = setInterval(() => {
      const activeWindowCount = Object.values(windows).filter(
        (w) => w.isOpen && !w.isMinimized
      ).length;
      const baseCpu = 12 + activeWindowCount * 8;
      const randomCpu = Math.floor(Math.random() * 12 + baseCpu);
      setCpuHistory((prev) => [...prev.slice(1), randomCpu]);
      setNetworkSpeed(Math.floor(Math.random() * 6 + 10));
    }, 1500);
    return () => clearInterval(timer);
  }, [windows]);

  const activeProcessList = Object.values(windows).filter((w) => w.isOpen);

  const pathD = cpuHistory
    .map((val, idx) => {
      const x = (idx / (cpuHistory.length - 1)) * 360;
      const y = 80 - (val / 100) * 80;
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col h-full bg-[#020e14]/95 border border-[#00E5FF]/20 rounded-xl p-5 text-white font-sans text-xs h-[360px] justify-between overflow-y-auto scrollbar-thin">
      <div className="grid grid-cols-3 gap-3 shrink-0">
        <div className="bg-[#00E5FF]/5 border border-[#00E5FF]/10 rounded-xl p-2 text-center">
          <div className="text-[8px] text-slate-500 uppercase font-mono">CPU Core Load</div>
          <div className="text-base font-bold text-[#00E5FF] font-mono mt-1">
            {cpuHistory[cpuHistory.length - 1]}%
          </div>
        </div>
        <div className="bg-[#00E5FF]/5 border border-[#00E5FF]/10 rounded-xl p-2 text-center">
          <div className="text-[8px] text-slate-500 uppercase font-mono">Mem Gauge</div>
          <div className="text-base font-bold text-[#00E5FF] font-mono mt-1">24.2 GB</div>
        </div>
        <div className="bg-[#00E5FF]/5 border border-[#00E5FF]/10 rounded-xl p-2 text-center">
          <div className="text-[8px] text-slate-500 uppercase font-mono">Synapse Ping</div>
          <div className="text-base font-bold text-emerald-400 font-mono mt-1">
            {networkSpeed}ms
          </div>
        </div>
      </div>

      <div className="bg-slate-950/80 border border-[#00E5FF]/10 rounded-xl p-3 my-3 h-28 flex flex-col justify-between relative shrink-0">
        <div className="absolute top-2 left-3 text-[7.5px] font-mono text-[#00E5FF]/60 uppercase tracking-widest">
          Aura Diagnostic Telemetry Grid
        </div>
        <div className="flex-1 w-full flex items-center justify-center mt-2">
          <svg viewBox="0 0 360 80" className="w-full h-[64px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="20" x2="360" y2="20" stroke="rgba(0,229,255,0.06)" strokeWidth="1" />
            <line x1="0" y1="40" x2="360" y2="40" stroke="rgba(0,229,255,0.06)" strokeWidth="1" />
            <line x1="0" y1="60" x2="360" y2="60" stroke="rgba(0,229,255,0.06)" strokeWidth="1" />

            <path d={`${pathD} L 360 80 L 0 80 Z`} fill="url(#chartGrad)" />
            <path d={pathD} stroke="#00E5FF" strokeWidth="2" fill="none" className="transition-all duration-500" />
          </svg>
        </div>
      </div>

      <div className="flex-1 space-y-1.5 max-h-[120px] overflow-y-auto scrollbar-thin pr-1">
        <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wider pl-1 mb-1">
          Active Thread Pool Processes ({activeProcessList.length})
        </div>
        {activeProcessList.length === 0 ? (
          <div className="text-center text-slate-650 py-4 font-mono text-[9px]">
            No Active App Processes
          </div>
        ) : (
          activeProcessList.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between px-3 py-1.5 bg-[#00E5FF]/5 border border-[#00E5FF]/10 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-tight text-slate-200">
                  {app.id}
                </span>
                <span className="text-[8px] font-mono text-slate-500">
                  PID: {Math.floor(Math.random() * 2000 + 4000)}
                </span>
              </div>
              <button
                onClick={() => {
                  playSound("close");
                  closeApp(app.id);
                }}
                className="px-2 py-0.5 border border-[#FF6B6B]/40 hover:border-[#FF6B6B] bg-transparent text-[#FF6B6B] text-[8px] font-bold uppercase rounded-md cursor-pointer transition-all active:scale-95"
              >
                KILL TASK
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default SystemMonitor;
