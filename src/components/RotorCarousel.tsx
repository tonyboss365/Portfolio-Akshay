import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useSystem } from "./SystemContext";
import { APPS, WindowState } from "./apps/appConfig";

interface RotorCarouselProps {
  openApp: (id: string) => void;
  windows: Record<string, WindowState>;
  starfieldSettings: any;
  minimizeAllApps: () => void;
}

export function RotorCarousel({
  openApp,
  windows,
  starfieldSettings,
  minimizeAllApps,
}: RotorCarouselProps) {
  const { systemAccent, playSound } = useSystem();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const lastInteractTime = useRef(Date.now());

  // 1. Motion value to track raw drag translation
  const dragX = useMotionValue(0);

  // 2. High-fidelity spring configurations (heavy mass with perfect damping)
  const springConfig = { damping: 25, stiffness: 90, mass: 1.4 };
  const smoothX = useSpring(dragX, springConfig);

  const hasOpenWindow = Object.values(windows).some((w) => w.isOpen && !w.isMinimized);

  // 3. Gentle auto-rotation loop when idle and not viewing a window
  useEffect(() => {
    if (hasOpenWindow) return;
    let active = true;
    let frameId: number;

    const autoRotate = () => {
      if (!active) return;
      // Auto-rotate continuously unless the user is actively dragging or interacting
      // Resumes smoothly after a brief 2-second idle window
      if (!isInteracting.current && Date.now() - lastInteractTime.current > 2000) {
        dragX.set(dragX.get() - 0.28);
      }
      frameId = requestAnimationFrame(autoRotate);
    };

    frameId = requestAnimationFrame(autoRotate);

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
  }, [hasOpenWindow, dragX]);

  const FAN_SPREAD = 32; // Luxury editorial spread angle
  const RADIUS = 260; // Deep 3D perspective radius
  const isLight = starfieldSettings.bgColor === "#ffffff";

  // Drag handlers using Framer Motion drag info
  const handleDragStart = () => {
    isInteracting.current = true;
  };

  const handleDrag = (event: any, info: any) => {
    isInteracting.current = true;
    dragX.set(dragX.get() + info.delta.x * 0.7); // High-precision responsive drag multiplier
  };

  const handleDragEnd = (event: any, info: any) => {
    isInteracting.current = false;
    lastInteractTime.current = Date.now();
    const velocity = info.velocity.x;
    // Premium spring inertia projection
    dragX.set(dragX.get() + velocity * 0.16);
  };

  const handleMouseDown = () => {
    isInteracting.current = true;
  };

  const handleMouseUp = () => {
    isInteracting.current = false;
    lastInteractTime.current = Date.now();
  };

  return (
    <motion.div
      ref={containerRef}
      className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        hasOpenWindow
          ? "bottom-20 right-10 w-52 h-52 z-[99] scale-[0.38] origin-bottom-right opacity-80 hover:opacity-100 hover:scale-[0.48] cursor-pointer"
          : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] z-10"
      }`}
      style={{ perspective: hasOpenWindow ? "600px" : "1400px" }}
      onClick={
        hasOpenWindow
          ? (e) => {
              e.stopPropagation();
              playSound("click");
              minimizeAllApps();
            }
          : undefined
      }
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ transformStyle: "preserve-3d" }}
        drag={!hasOpenWindow ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {APPS.map((app, index) => {
          const baseAngle = index * FAN_SPREAD;

          // Convert smooth pixel drag into rotational degrees
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(smoothX, (val) => baseAngle + val * 0.22);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const x = useTransform(rotateY, (r) => Math.sin((r * Math.PI) / 180) * RADIUS);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const z = useTransform(rotateY, (r) => Math.cos((r * Math.PI) / 180) * RADIUS);

          // Luxury depth fading and scaling
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(z, [-RADIUS, RADIUS], [0.15, 1.0]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(z, [-RADIUS, RADIUS], [0.72, 1.1]);

          // Make the card face the camera directly by neutralizing Y-rotation
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const faceAngle = useTransform(rotateY, (r) => -r);

          const win = windows[app.id];
          const isRunning = win?.isOpen;
          const isHovered = hoveredId === app.id;

          const MotionDiv = motion.div as any;

          return (
            <MotionDiv
              key={app.id}
              onMouseEnter={() => !hasOpenWindow && setHoveredId(app.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (hasOpenWindow) {
                  playSound("click");
                  minimizeAllApps();
                  return;
                }
                playSound("open");
                openApp(app.id);
              }}
              className="absolute"
              style={{
                x,
                z,
                rotateY: faceAngle,
                transformStyle: "preserve-3d",
                zIndex: index + 10,
                opacity,
                scale,
              }}
            >
              {/* Luxury Glassmorphic Rotor Card */}
              <div
                className={`relative overflow-hidden transition-all duration-300 ${
                  hasOpenWindow ? "w-[70px] h-[96px] rounded-xl" : "w-[180px] sm:w-[210px] h-[270px] sm:h-[320px] rounded-3xl"
                }`}
                style={{
                  background: isLight
                    ? "rgba(255,255,255,0.92)"
                    : "rgba(10,10,10,0.85)",
                  border: isHovered && !hasOpenWindow
                    ? `1px solid ${app.accent}`
                    : isLight
                    ? "1px solid rgba(0,0,0,0.08)"
                    : "1px solid rgba(255,255,255,0.05)",
                  boxShadow: !hasOpenWindow
                    ? isLight
                      ? `0 24px 60px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02)`
                      : `0 32px 80px -16px rgba(0,0,0,0.8), 0 0 40px -15px ${app.accent}22`
                    : "none",
                  transform: isHovered && !hasOpenWindow ? "translateY(-10px)" : "none",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px]"
                  style={{ background: app.accent }}
                />

                {/* Subtle Luxury Noise grid texture */}
                {!hasOpenWindow && !isLight && (
                  <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 18px, ${app.accent} 18px, ${app.accent} 19px), repeating-linear-gradient(90deg, transparent, transparent 18px, ${app.accent} 18px, ${app.accent} 19px)`,
                    }}
                  />
                )}

                {!hasOpenWindow && (
                  <div className="flex flex-col h-full p-5 relative z-10">
                    <div className="flex items-center justify-between mb-auto">
                      <div>
                        <div
                          className="text-[8px] font-mono font-bold tracking-[0.25em] uppercase mb-0.5"
                          style={{ color: app.accent }}
                        >
                          {app.sublabel}
                        </div>
                        <div
                          className="text-[8px] font-mono tracking-[0.12em] uppercase"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {app.label}
                        </div>
                      </div>
                      {isRunning && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: app.accent }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center flex-1 my-4">
                      <div
                        className="transition-all duration-300"
                        style={{
                          color: app.accent,
                          transform: isHovered ? "scale(1.1) rotate(6deg)" : "scale(1)",
                        }}
                      >
                        {app.icon}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <h4
                        className="text-sm font-bold tracking-tight mb-3 leading-tight text-center"
                        style={{
                          color: isLight ? "#111" : "#fff",
                          fontFamily: "'Outfit', 'DM Sans', sans-serif",
                          fontSize: "12px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {app.name}
                      </h4>
                      <div
                        className="w-full py-2 text-center rounded-xl text-[8px] font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300"
                        style={{
                          background: `${app.accent}12`,
                          border: `1px solid ${app.accent}35`,
                          color: app.accent,
                        }}
                      >
                        {isRunning ? "FOCUS →" : "LAUNCH →"}
                      </div>
                    </div>
                  </div>
                )}

                {hasOpenWindow && (
                  <div className="flex flex-col items-center justify-center h-full gap-1.5 p-2">
                    <div style={{ color: app.accent }}>
                      {React.cloneElement(app.icon as React.ReactElement<any>, { width: 18, height: 18 })}
                    </div>
                    <div
                      className="text-[6px] font-mono font-bold tracking-wider text-center uppercase"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {app.id}
                    </div>
                  </div>
                )}
              </div>
            </MotionDiv>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
export default RotorCarousel;
