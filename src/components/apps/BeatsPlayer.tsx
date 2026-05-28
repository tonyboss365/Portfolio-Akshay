import React, { useState, useEffect } from "react";
import { useSystem } from "../SystemContext";

export function BeatsPlayer() {
  const { playSound } = useSystem();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [trackProgress, setTrackProgress] = useState(30);
  const visualizerBars = Array.from({ length: 18 }).map(() => Math.random() * 80 + 10);
  const [barsHeight, setBarsHeight] = useState<number[]>(visualizerBars);

  const TRACKS = [
    { title: "Lofi Cyberpunk Synapses", author: "DevCore Records", duration: "2:45" },
    { title: "Ambient Matrix Rebirth", author: "Akshay beats", duration: "3:12" },
    { title: "Chill Synthwave Pipeline", author: "Neon Rider", duration: "2:20" }
  ];

  useEffect(() => {
    if (!isPlaying) {
      setBarsHeight(Array.from({ length: 18 }).map(() => 4));
      return;
    }
    const interval = setInterval(() => {
      setBarsHeight(Array.from({ length: 18 }).map(() => Math.random() * 32 + 4));
      setTrackProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayToggle = () => {
    playSound("click");
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    playSound("click");
    setCurrentTrack((prev) => (prev === TRACKS.length - 1 ? 0 : prev + 1));
    setTrackProgress(0);
  };

  return (
    <div className="flex flex-col h-full bg-[#12020e]/95 border border-[#FF66CC]/20 rounded-xl p-5 text-white font-sans text-xs h-[360px] justify-between">
      <div className="flex flex-col items-center my-1 relative">
        <div 
          className={`w-28 h-28 rounded-full border-4 border-slate-800 bg-[#080106] flex items-center justify-center shadow-inner relative transition-transform duration-[4000ms] ease-linear ${
            isPlaying ? "rotate-[360deg] infinite animate-[spin_5s_linear_infinite]" : ""
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-[#FF66CC]/20 border-2 border-[#FF66CC] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF66CC]" />
          </div>
        </div>
        <div className="absolute top-1 right-8 text-[9px] font-mono text-[#FF66CC]/50 uppercase tracking-widest animate-pulse">
          {isPlaying ? "Sync Streaming" : "Paused"}
        </div>
      </div>

      <div className="text-center">
        <h4 className="font-bold text-slate-200 truncate text-[11px] px-2">{TRACKS[currentTrack].title}</h4>
        <p className="text-[9px] text-[#FF66CC] tracking-wider uppercase mt-0.5">{TRACKS[currentTrack].author}</p>
      </div>

      <div className="h-10 flex items-center justify-center gap-1 bg-[#ff66cc]/5 border border-[#ff66cc]/10 rounded-xl px-4 py-2 my-2">
        {barsHeight.map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-[#FF66CC]/80 to-[#FFB8FF] transition-all duration-100"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-[8px] font-mono text-slate-500">
          <span>0:{Math.floor(trackProgress * 2.4).toString().padStart(2, "0")}</span>
          <span>{TRACKS[currentTrack].duration}</span>
        </div>
        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-[#FF66CC] rounded-full" style={{ width: `${trackProgress}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-1.5 shrink-0 select-none">
        <button
          onClick={handleNext}
          className="text-lg bg-slate-900/60 hover:bg-slate-900 hover:text-[#FF66CC] w-8 h-8 rounded-full border border-[#FF66CC]/20 flex items-center justify-center cursor-pointer transition-all active:scale-95 text-slate-400"
        >
          ⏮
        </button>
        <button
          onClick={handlePlayToggle}
          className="text-xl bg-[#FF66CC] hover:bg-[#FFB8FF] text-[#12020e] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all active:scale-90 font-bold"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={handleNext}
          className="text-lg bg-slate-900/60 hover:bg-slate-900 hover:text-[#FF66CC] w-8 h-8 rounded-full border border-[#FF66CC]/20 flex items-center justify-center cursor-pointer transition-all active:scale-95 text-slate-400"
        >
          ⏭
        </button>
      </div>
    </div>
  );
}
export default BeatsPlayer;
