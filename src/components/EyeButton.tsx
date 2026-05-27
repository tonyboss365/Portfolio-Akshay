import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Link } from "react-router-dom";

export interface EyeButtonProps {
  text?: string;
  link?: string;
  buttonColor?: string; // e.g. "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
  textColor?: string;    // e.g. "text-white"
  padding?: string;      // e.g. "px-6 py-3.5"
  radius?: string;       // e.g. "rounded-full"
  eyeColor?: string;     // e.g. "bg-white"
  pupilColor?: string;   // e.g. "bg-[#1a1a1a]" or "text-red-500" for Love Mode
  eyeCount?: 1 | 2;
  eyeSize?: number;      // e.g. 36
  pupilSize?: number;    // e.g. 14
  eyeGap?: number;       // e.g. 8
  speed?: number;        // scale of spring responsiveness (0.05 - 1.0)
  range?: number;        // maximum offset radius of pupil
  blinking?: boolean;
  blinkingIntensity?: number; // scale multiplier of blink length
  loveMode?: boolean;    // pupils transform into neon beating hearts
  minimal?: boolean;     // bypasses button wrappers and renders raw eyes
  onClick?: () => void;
}

export function EyeButton({
  text = "Don't Look Away...",
  link,
  buttonColor = "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  textColor = "text-white",
  padding = "px-6 py-3.5",
  radius = "rounded-full",
  eyeColor = "bg-white",
  pupilColor = "bg-[#1a1a1a]",
  eyeCount = 2,
  eyeSize = 36,
  pupilSize = 14,
  eyeGap = 8,
  speed = 0.15,
  range = 8,
  blinking = true,
  blinkingIntensity = 1.0,
  loveMode = false,
  minimal = false,
  onClick,
}: EyeButtonProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  
  // Refs for tracking eye positions
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);

  // Pupil offsets motion values
  const p1x = useMotionValue(0);
  const p1y = useMotionValue(0);
  const p2x = useMotionValue(0);
  const p2y = useMotionValue(0);

  // Dynamic spring setup scaled to speed prop
  const springStiffness = Math.max(50, speed * 600);
  const springDamping = Math.max(10, 25 - speed * 15);
  
  const springConfig = {
    stiffness: springStiffness,
    damping: springDamping,
    mass: 0.8,
  };

  const smoothP1x = useSpring(p1x, springConfig);
  const smoothP1y = useSpring(p1y, springConfig);
  const smoothP2x = useSpring(p2x, springConfig);
  const smoothP2y = useSpring(p2y, springConfig);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const trackEye = (
        eyeRef: React.RefObject<HTMLDivElement | null>,
        mx: typeof p1x,
        my: typeof p1y
      ) => {
        if (!eyeRef.current) return;
        const rect = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = mouseX - eyeCenterX;
        const dy = mouseY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Clamp inside custom range
        const maxOffset = Math.min(distance, range);
        
        mx.set(Math.cos(angle) * maxOffset);
        my.set(Math.sin(angle) * maxOffset);
      };

      trackEye(eye1Ref, p1x, p1y);
      if (eyeCount === 2) {
        trackEye(eye2Ref, p2x, p2y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [eyeCount, range, p1x, p1y, p2x, p2y]);

  // Periodic blinking scheduler
  useEffect(() => {
    if (!blinking) return;

    let timeoutId: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      
      timeoutId = setTimeout(() => {
        setIsBlinking(false);
        // Reschedule next blink
        const nextTime = 2500 + Math.random() * 4000;
        timeoutId = setTimeout(triggerBlink, nextTime);
      }, 150 * blinkingIntensity);
    };

    const initialTime = 2500 + Math.random() * 3000;
    timeoutId = setTimeout(triggerBlink, initialTime);

    return () => clearTimeout(timeoutId);
  }, [blinking, blinkingIntensity]);

  // Eye Sclera render
  const renderEye = (eyeRef: React.RefObject<HTMLDivElement | null>, sx: any, sy: any) => {
    return (
      <div
        ref={eyeRef}
        style={{
          width: `${eyeSize}px`,
          height: `${eyeSize}px`,
        }}
        className={`relative rounded-full border border-gray-300/40 dark:border-slate-800/80 shadow-inner flex items-center justify-center overflow-hidden transition-colors duration-300 ${eyeColor}`}
      >
        {/* Animated Sclera / Eyelid scale */}
        <motion.div
          animate={{ scaleY: isBlinking ? 0.08 : 1 }}
          transition={{ duration: 0.12, ease: "easeInOut" }}
          style={{ originY: 0.5 }}
          className="w-full h-full flex items-center justify-center relative"
        >
          {/* Animated Pupil */}
          <motion.div
            style={{
              x: sx,
              y: sy,
              width: `${pupilSize}px`,
              height: `${pupilSize}px`,
            }}
            className="absolute flex items-center justify-center select-none"
          >
            {loveMode ? (
              // Glowing Neon Heart
              <motion.svg
                viewBox="0 0 24 24"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="w-full h-full text-red-500 fill-red-500 drop-shadow-[0_0_2px_rgba(239,68,68,0.7)] cursor-pointer"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
            ) : (
              // Standard Rounded Pupil
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
                className={`rounded-full shadow-md ${pupilColor}`}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    );
  };

  if (minimal) {
    return (
      <div 
        style={{ gap: `${eyeGap}px` }} 
        className="flex items-center justify-center select-none"
      >
        {renderEye(eye1Ref, smoothP1x, smoothP1y)}
        {eyeCount === 2 && renderEye(eye2Ref, smoothP2x, smoothP2y)}
      </div>
    );
  }

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-3 border border-black/5 dark:border-white/5 shadow-md hover:shadow-lg font-mono font-bold text-xs sm:text-sm select-none cursor-pointer transition-all duration-300 ${padding} ${radius} ${buttonColor} ${textColor}`}
    >
      <span>{text}</span>
      
      {/* Eyes Container */}
      <div 
        style={{ gap: `${eyeGap}px` }} 
        className="flex items-center justify-center"
      >
        {renderEye(eye1Ref, smoothP1x, smoothP1y)}
        {eyeCount === 2 && renderEye(eye2Ref, smoothP2x, smoothP2y)}
      </div>
    </motion.div>
  );

  if (link) {
    if (link.startsWith("/")) {
      return (
        <Link to={link} className="inline-block">
          {content}
        </Link>
      );
    }
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button ref={buttonRef as any} onClick={onClick} className="inline-block bg-transparent p-0 border-0 outline-none">
      {content}
    </button>
  );
}
