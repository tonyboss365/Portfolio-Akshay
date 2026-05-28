import React, { useState, useEffect } from "react";
import { useSystem } from "./SystemContext";

export function KineticHeader() {
  const { systemAccent } = useSystem();
  const [displayText, setDisplayText] = useState("AURA NEURAL SYSTEM V3.0");
  const fullText = "AURA NEURAL SYSTEM V3.0";

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setDisplayText(
        fullText.split("").map((char, index) => {
          if (index < count) return char;
          if (char === " ") return " ";
          const glyphs = "X_/#@$*+-<>[]{}0123456789";
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        }).join("")
      );
      count += 0.6;
      if (count >= fullText.length + 1) {
        clearInterval(interval);
        setDisplayText(fullText);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none z-10">
      <div
        className="font-mono text-[11px] font-bold tracking-[0.35em] uppercase"
        style={{ color: systemAccent }}
      >
        {displayText}
      </div>
      <div className="text-[9px] font-mono tracking-[0.2em] mt-1.5 opacity-40" style={{ color: systemAccent }}>
        DRAG CARDS TO ROTATE · CLICK TO LAUNCH
      </div>
    </div>
  );
}
export default KineticHeader;
