import React, { useState, useEffect } from "react";

// 5x7 Dot Matrix Binary Patterns for numbers 0-9 and colon
const LED_PATTERNS: Record<string, string[]> = {
  "0": [
    "11111",
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "11111"
  ],
  "1": [
    "00100",
    "01100",
    "00100",
    "00100",
    "00100",
    "00100",
    "01110"
  ],
  "2": [
    "11111",
    "00001",
    "00001",
    "11111",
    "10000",
    "10000",
    "11111"
  ],
  "3": [
    "11111",
    "00001",
    "00001",
    "11111",
    "00001",
    "00001",
    "11111"
  ],
  "4": [
    "10001",
    "10001",
    "10001",
    "11111",
    "00001",
    "00001",
    "00001"
  ],
  "5": [
    "11111",
    "10000",
    "10000",
    "11111",
    "00001",
    "00001",
    "11111"
  ],
  "6": [
    "11111",
    "10000",
    "10000",
    "11111",
    "10001",
    "10001",
    "11111"
  ],
  "7": [
    "11111",
    "00001",
    "00010",
    "00100",
    "01000",
    "01000",
    "01000"
  ],
  "8": [
    "11111",
    "10001",
    "10001",
    "11111",
    "10001",
    "10001",
    "11111"
  ],
  "9": [
    "11111",
    "10001",
    "10001",
    "11111",
    "00001",
    "00001",
    "11111"
  ],
  ":": [
    "00000",
    "00100",
    "00000",
    "00000",
    "00000",
    "00100",
    "00000"
  ],
  " ": [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000"
  ]
};

// Micro-scale Dot Matrix Digit Renderer
function LedDigit({ char, activeColor = "#ffffff", glowColor = "#ff5722" }: { char: string; activeColor?: string; glowColor?: string }) {
  const pattern = LED_PATTERNS[char] || LED_PATTERNS[" "];

  return (
    <div className="grid grid-cols-5 gap-[1px] p-[1px] w-[14px] h-[20px] select-none shrink-0">
      {pattern.map((row, rIdx) =>
        row.split("").map((dot, dIdx) => {
          const isActive = dot === "1";
          return (
            <div
              key={`${rIdx}-${dIdx}`}
              className="w-[1.8px] h-[1.8px] rounded-full transition-all duration-150"
              style={{
                backgroundColor: isActive ? activeColor : "rgba(255,255,255,0.015)",
                boxShadow: isActive 
                  ? `0 0 3px ${glowColor}, 0 0 6px ${glowColor}` 
                  : "none"
              }}
            />
          );
        })
      )}
    </div>
  );
}

export function ThreeDDigitalClock() {
  const [colonVisible, setColonVisible] = useState(true);
  const [timeString, setTimeString] = useState("12:00");

  // Smooth Colon Blink
  useEffect(() => {
    const interval = setInterval(() => {
      setColonVisible((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Time Tracker Loop (IST by default, HH:MM format)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const parts = formatter.formatToParts(now);

      let hh = parts.find(p => p.type === "hour")?.value || "12";
      const mm = parts.find(p => p.type === "minute")?.value || "00";

      if (hh.length === 1) hh = "0" + hh;
      setTimeString(`${hh}:${mm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center bg-black/85 dark:bg-slate-950/90 border border-slate-200/10 dark:border-slate-800/40 rounded-xl px-2 py-1.5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.85)] shrink-0 overflow-hidden relative">
      {/* Subtle segment texture backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:6px_6px] pointer-events-none opacity-20" />

      {/* Tiny Glowing LED Matrix */}
      <div className="flex items-center gap-[2px] z-10">
        {timeString.split("").map((char, index) => {
          if (char === ":") {
            return (
              <div key={index} className="w-[6px] flex justify-center shrink-0">
                <LedDigit char={colonVisible ? ":" : " "} activeColor="#ffffff" glowColor="#ff5722" />
              </div>
            );
          }
          return <LedDigit key={index} char={char} activeColor="#ffffff" glowColor="#ff5722" />;
        })}
      </div>
    </div>
  );
}
