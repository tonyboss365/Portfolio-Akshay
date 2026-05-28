import React from "react";
import { motion } from "motion/react";
import { useSystem } from "./SystemContext";
import { APPS, WindowState } from "./apps/appConfig";

interface WindowChromeProps {
  win: WindowState;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onSnap: (side: "left" | "right" | "full") => void;
  onResize?: (width: number, height: number) => void;
  onDragUpdate?: (clientX: number, clientY: number, isDragging: boolean) => void;
  onDragEnd?: (clientX: number, clientY: number) => void;
  desktopRef: React.RefObject<HTMLDivElement | null>;
}

export function WindowChrome({
  win,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onSnap,
  onResize,
  onDragUpdate,
  onDragEnd,
  desktopRef,
}: WindowChromeProps) {
  const { systemAccent, playSound } = useSystem();
  const app = APPS.find((a) => a.id === win.id);
  const cardAccent = app?.accent || systemAccent;

  const MotionDiv = motion.div as any;

  // Custom multi-input Corner Resize Handler
  const handleResizeMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const startX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const startY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const initialW = typeof win.width === "number" ? win.width : parseInt(String(win.width)) || 600;
    const initialH = typeof win.height === "number" ? win.height : parseInt(String(win.height)) || 400;

    const handleMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = "touches" in moveEvent ? moveEvent.touches[0].clientX : (moveEvent as MouseEvent).clientX;
      const currentY = "touches" in moveEvent ? moveEvent.touches[0].clientY : (moveEvent as MouseEvent).clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      // Minimum bounds constraints: 300px width, 200px height
      const nextW = Math.max(300, initialW + deltaX);
      const nextH = Math.max(200, initialH + deltaY);

      if (onResize) {
        onResize(nextW, nextH);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
  };

  return (
    <MotionDiv
      initial={{ scale: 0.92, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0, y: 20 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      drag={!win.isMaximized}
      dragMomentum={false}
      dragConstraints={desktopRef}
      dragHandleClassName="window-drag-handle"
      onClick={onFocus}
      onDrag={(event: any, info: any) => {
        if (onDragUpdate) {
          onDragUpdate(info.point.x, info.point.y, true);
        }
      }}
      onDragEnd={(event: any, info: any) => {
        if (onDragEnd) {
          onDragEnd(info.point.x, info.point.y);
        }
        if (onDragUpdate) {
          onDragUpdate(0, 0, false);
        }
      }}
      className={`absolute flex flex-col overflow-hidden ${
        win.isMaximized ? "!top-0 !left-0 !w-full !h-full rounded-none border-0" : "rounded-2xl"
      }`}
      style={{
        top: win.isMaximized ? 0 : (typeof win.y === "number" ? `min(${win.y}px, calc(100vh - 120px))` : win.y),
        left: win.isMaximized ? 0 : (typeof win.x === "number" ? `min(${win.x}px, calc(100vw - 80px))` : win.x),
        width: win.isMaximized ? "100%" : (typeof win.width === "number" ? `min(${win.width}px, 100vw)` : win.width),
        height: win.isMaximized ? "100%" : (typeof win.height === "number" ? `min(${win.height}px, 100vh - 80px)` : win.height),
        zIndex: win.zIndex,
        background: "rgba(8,8,8,0.94)",
        border: `1px solid rgba(255,255,255,0.07)`,
        boxShadow: "0 40px 100px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
        backdropFilter: "blur(40px)",
      }}
    >
      <div
        onDoubleClick={(e) => {
          e.stopPropagation();
          playSound("click");
          onMaximize();
        }}
        className="window-drag-handle flex items-center justify-between px-4 py-3 shrink-0 cursor-move select-none"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound("close");
              onClose();
            }}
            className="w-3 h-3 rounded-full border-0 cursor-pointer transition-all hover:scale-110"
            style={{ background: "#FF5F57" }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound("click");
              onMinimize();
            }}
            className="w-3 h-3 rounded-full border-0 cursor-pointer transition-all hover:scale-110"
            style={{ background: "#FEBC2E" }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound("click");
              onMaximize();
            }}
            className="w-3 h-3 rounded-full border-0 cursor-pointer transition-all hover:scale-110"
            style={{ background: "#28C840" }}
          />
          <span
            className="text-[11px] font-mono ml-2 tracking-wider uppercase"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {win.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!win.isMaximized && (
            <div className="flex items-center gap-1 bg-white/5 border border-white/5 rounded px-1.5 py-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSound("click");
                  onSnap("left");
                }}
                title="Snap Left"
                className="text-[9px] text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer p-0 font-bold"
              >
                ◧
              </button>
              <span className="text-white/10 text-[9px]">|</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSound("click");
                  onSnap("right");
                }}
                title="Snap Right"
                className="text-[9px] text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer p-0 font-bold"
              >
                ◨
              </button>
              <span className="text-white/10 text-[9px]">|</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSound("click");
                  onSnap("full");
                }}
                title="Snap Full"
                className="text-[9px] text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer p-0 font-bold"
              >
                ◰
              </button>
            </div>
          )}
          <div
            className="text-[8px] font-mono tracking-[0.25em] uppercase px-2 py-1 rounded-md"
            style={{
              color: cardAccent,
              border: `1px solid ${cardAccent}33`,
              background: `${cardAccent}0d`,
            }}
          >
            {win.id}
          </div>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-5 animate-fadeIn"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}
      >
        {children}
      </div>

      {/* Bottom-Right Double-Stripe Corner Resize Handle */}
      {!win.isMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          onTouchStart={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-5.5 h-5.5 cursor-se-resize z-50 flex items-end justify-end p-1 select-none"
          title="Drag to resize window"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/20 hover:text-white transition-colors">
            <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="10" y1="5.5" x2="5.5" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
          </svg>
        </div>
      )}
    </MotionDiv>
  );
}
export default WindowChrome;
