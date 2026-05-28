import React, { useState } from "react";
import { useSystem } from "../SystemContext";

export function CyberCalculator() {
  const { systemAccent, playSound } = useSystem();
  const [display, setDisplay] = useState("0");
  const [aiMessage, setAiMessage] = useState("");

  const handleKeyPress = (val: string) => {
    playSound("click");
    setAiMessage("");
    if (display === "Error" || display === "0") {
      if (["+", "-", "*", "/"].includes(val)) return;
      setDisplay(val);
    } else {
      setDisplay((prev) => prev + val);
    }
  };

  const handleClear = () => {
    playSound("close");
    setDisplay("0");
    setAiMessage("");
  };

  const handleCalculate = () => {
    playSound("open");
    try {
      const cleanExpr = display.replace(/[^0-9+\-*/.]/g, "");
      const res = Function(`"use strict"; return (${cleanExpr})`)();
      setDisplay(Number(res).toString());
    } catch (e) {
      setDisplay("Error");
    }
  };

  const handleHex = () => {
    playSound("click");
    try {
      const num = parseInt(display, 10);
      if (isNaN(num)) {
        setDisplay("Error");
      } else {
        setDisplay("0x" + num.toString(16).toUpperCase());
      }
    } catch (e) {
      setDisplay("Error");
    }
  };

  const handleBin = () => {
    playSound("click");
    try {
      const num = parseInt(display, 10);
      if (isNaN(num)) {
        setDisplay("Error");
      } else {
        setDisplay(num.toString(2));
      }
    } catch (e) {
      setDisplay("Error");
    }
  };

  const handleAiPredict = () => {
    playSound("open");
    const messages = [
      "AURA AI: 99.8% probability of great success for Akshay!",
      "AURA AI: Code is highly optimized. Enterprise ready.",
      "AURA AI: Matrix link secured. Developer talent score: 10/10.",
      "AURA AI: Cybernetic handshake complete. Success inbound!",
    ];
    setAiMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const KEYS = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  return (
    <div className="flex flex-col h-full bg-[#050c12]/95 border border-slate-800 rounded-xl p-5 text-white font-mono text-xs h-[360px] justify-between">
      <div className="bg-slate-950/80 border border-slate-850 p-3 rounded-lg text-right text-base font-bold text-slate-100 font-mono tracking-widest min-h-[44px] break-all">
        {display}
      </div>

      {aiMessage ? (
        <div className="my-1.5 p-2 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-lg text-[9px] text-[#00E5FF] leading-snug animate-pulse">
          {aiMessage}
        </div>
      ) : (
        <div className="h-6" />
      )}

      <div className="grid grid-cols-4 gap-1.5 my-1.5">
        <button
          onClick={handleHex}
          className="py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded cursor-pointer text-[9px]"
        >
          HEX
        </button>
        <button
          onClick={handleBin}
          className="py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded cursor-pointer text-[9px]"
        >
          BIN
        </button>
        <button
          onClick={handleClear}
          className="py-1 border border-[#FF6B6B]/40 bg-transparent text-[#FF6B6B] hover:bg-[#FF6B6B]/10 font-bold rounded cursor-pointer text-[9px]"
        >
          CLEAR
        </button>
        <button
          onClick={handleAiPredict}
          className="py-1 font-bold rounded cursor-pointer text-[9px] text-[#00e5ff] border border-[#00e5ff]/40 bg-transparent hover:bg-[#00e5ff]/10"
        >
          🔮 AI
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1.5 flex-1 max-h-[220px]">
        {KEYS.map((k) => (
          <button
            key={k}
            onClick={() => (k === "=" ? handleCalculate() : handleKeyPress(k))}
            className="flex items-center justify-center p-2 text-[11px] font-bold rounded-lg border transition-all cursor-pointer"
            style={{
              background: k === "=" ? systemAccent : "rgba(255,255,255,0.03)",
              color: k === "=" ? "#000" : "#fff",
              borderColor: k === "=" ? systemAccent : "rgba(255,255,255,0.06)",
            }}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
export default CyberCalculator;
