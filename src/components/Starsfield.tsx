import React, { useRef, useEffect, useCallback, useState } from "react";

// --- Const Constants matching the reference core ---
const Z_NEAR = 0.12;
const Z_FAR = 0.98;
const OFFSCREEN_MARGIN = 50;

interface ColorRGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  px: number | null;
  py: number | null;
  phase: number;
  twinkle: number;
  size: number;
  cr: number;
  cg: number;
  cb: number;
}

export interface StarsfieldProps {
  starCount?: number;
  speed?: number;
  spread?: number;
  focal?: number;
  twinkle?: number;
  trail?: number;
  starSize?: number;
  bgColor?: string;
  starColor?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  fadeInRange?: number;
  reverseFly?: boolean;
  followCursor?: boolean;
  galaxyMode?: boolean;
  direction?: "none" | "left" | "right" | "top" | "bottom";
  randomColors?: boolean;
  children?: React.ReactNode;
}

// ---------- Helper Utils ----------
function saturate(t: number): number {
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

function smooth01(t: number): number {
  return t * t * (3 - 2 * t);
}

// Robust color parsing (caches results for high performance)
function parseColor(input: string): ColorRGB {
  const c = (input || "#000000").trim().toLowerCase();
  if (c[0] === "#") {
    const h = c.slice(1);
    if (h.length === 3 || h.length === 4) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      const a = h.length === 4 ? parseInt(h[3] + h[3], 16) / 255 : 1;
      return { r, g, b, a };
    }
    if (h.length === 6 || h.length === 8) {
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
      return { r, g, b, a };
    }
  }
  const m = c.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+)\s*)?\)/);
  if (m) {
    const r = Math.max(0, Math.min(255, Number(m[1])));
    const g = Math.max(0, Math.min(255, Number(m[2])));
    const b = Math.max(0, Math.min(255, Number(m[3])));
    const a = m[4] !== undefined ? Math.max(0, Math.min(1, Number(m[4]))) : 1;
    return { r, g, b, a };
  }
  return { r: 255, g: 255, b: 255, a: 1 };
}

export function Starsfield({
  starCount = 300,
  speed = 0.1,
  spread = 2,
  focal = 0.6,
  twinkle = 0.3,
  trail = 0.3,
  starSize = 0.5,
  bgColor = "#000000",
  starColor = "#FFFFFF",
  color1 = "#FF0000",
  color2 = "#00FF00",
  color3 = "#0000FF",
  color4 = "#FFFF00",
  fadeInRange = 0.3,
  reverseFly = false,
  followCursor = false,
  galaxyMode = false,
  direction = "none",
  randomColors = false,
  children,
}: StarsfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const [isInView, setIsInView] = useState(true);

  // Mouse coordinates tracking
  const followTargetRef = useRef({ x: 0, y: 0 });
  const followRef = useRef({ x: 0, y: 0 });

  // 3D Parallax tilt rotation angles
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Sync settings ref
  const settingsRef = useRef({
    starCount,
    speed,
    spread,
    focal,
    twinkle,
    trail,
    starSize,
    bgColor,
    starColor,
    color1,
    color2,
    color3,
    color4,
    fadeInRange,
    reverseFly,
    followCursor,
    galaxyMode,
    direction,
    randomColors,
  });

  useEffect(() => {
    settingsRef.current = {
      starCount,
      speed,
      spread,
      focal,
      twinkle,
      trail,
      starSize,
      bgColor,
      starColor,
      color1,
      color2,
      color3,
      color4,
      fadeInRange,
      reverseFly,
      followCursor,
      galaxyMode,
      direction,
      randomColors,
    };
  }, [
    starCount,
    speed,
    spread,
    focal,
    twinkle,
    trail,
    starSize,
    bgColor,
    starColor,
    color1,
    color2,
    color3,
    color4,
    fadeInRange,
    reverseFly,
    followCursor,
    galaxyMode,
    direction,
    randomColors,
  ]);

  // Cache pre-parsed colors
  const colorCacheRef = useRef<{ bg: ColorRGB; star: ColorRGB; palette: ColorRGB[] }>({
    bg: parseColor(bgColor),
    star: parseColor(starColor),
    palette: [parseColor(color1), parseColor(color2), parseColor(color3), parseColor(color4)],
  });

  useEffect(() => {
    colorCacheRef.current = {
      bg: parseColor(bgColor),
      star: parseColor(starColor),
      palette: [parseColor(color1), parseColor(color2), parseColor(color3), parseColor(color4)],
    };
  }, [bgColor, starColor, color1, color2, color3, color4]);

  // --- Visibility check using IntersectionObserver (0% CPU background optimization) ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // --- Resize Handler ---
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const w = Math.max(1, parent.clientWidth);
    const h = Math.max(1, parent.clientHeight);

    // Limit device pixel ratio to 2 for crisp resolution without performance drag
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.resetTransform?.();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  // Respawns individual star
  const respawnStar = useCallback(
    (
      s: Star,
      w: number,
      h: number,
      f: number,
      reversed: boolean,
      sprd: number,
      sz: number,
      baseCol: ColorRGB,
      useRand: boolean,
      pal: ColorRGB[],
      zOverride?: number
    ) => {
      const z = zOverride ?? (reversed ? Z_NEAR : Z_FAR);
      const halfW = w / 2;
      const halfH = h / 2;
      const sx = (Math.random() * 2 - 1) * (halfW * sprd + OFFSCREEN_MARGIN);
      const sy = (Math.random() * 2 - 1) * (halfH * sprd + OFFSCREEN_MARGIN);
      s.z = z;
      s.x = (sx * z) / f;
      s.y = (sy * z) / f;
      s.px = null;
      s.py = null;
      s.phase = Math.random() * Math.PI * 2;
      s.twinkle = 0.5 + Math.random() * 1.5;
      s.size = sz * (0.6 + Math.random() * 0.8);

      if (useRand) {
        const randIdx = Math.floor(Math.random() * 4);
        const c = pal[randIdx] || baseCol;
        s.cr = c.r;
        s.cg = c.g;
        s.cb = c.b;
      } else {
        s.cr = baseCol.r;
        s.cg = baseCol.g;
        s.cb = baseCol.b;
      }
    },
    []
  );

  // Initialize stars pool
  const initStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = Math.max(1, canvas.clientWidth);
    const h = Math.max(1, canvas.clientHeight);
    const { focal: fProp, spread: sProp, starSize: szProp, starCount: countProp, randomColors: randProp } = settingsRef.current;
    
    // Auto-adjust star count on mobile
    const adjustedCount = w < 640 ? Math.floor(countProp / 2) : countProp;

    const f = Math.min(w, h) * fProp;
    const baseCol = colorCacheRef.current.star;
    const pal = colorCacheRef.current.palette;

    const arr: Star[] = new Array(adjustedCount).fill(0).map(() => {
      const s: Star = {
        x: 0,
        y: 0,
        z: 0.5,
        px: null,
        py: null,
        phase: 0,
        twinkle: 1,
        size: szProp,
        cr: baseCol.r,
        cg: baseCol.g,
        cb: baseCol.b,
      };

      const z = Z_NEAR + Math.random() * (Z_FAR - Z_NEAR);
      s.z = z;
      const worldW = (w * z) / f;
      const worldH = (h * z) / f;
      s.x = (Math.random() - 0.5) * worldW * sProp;
      s.y = (Math.random() - 0.5) * worldH * sProp;
      s.phase = Math.random() * Math.PI * 2;
      s.twinkle = 0.5 + Math.random() * 1.5;
      s.size = szProp * (0.6 + Math.random() * 0.8);

      if (randProp) {
        const randIdx = Math.floor(Math.random() * 4);
        const c = pal[randIdx] || baseCol;
        s.cr = c.r;
        s.cg = c.g;
        s.cb = c.b;
      } else {
        s.cr = baseCol.r;
        s.cg = baseCol.g;
        s.cb = baseCol.b;
      }

      return s;
    });

    starsRef.current = arr;
  }, []);

  // Frame Draw logic (Highly optimized)
  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, now: number, dt: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const baseCx = w / 2;
      const baseCy = h / 2;

      const {
        speed: speedProp,
        spread: spreadProp,
        focal: focalProp,
        twinkle: twinkleProp,
        trail: trailProp,
        starSize: sizeProp,
        fadeInRange: fadeProp,
        reverseFly: revProp,
        galaxyMode: galProp,
        direction: dirProp,
        followCursor: followProp,
        randomColors: randProp,
      } = settingsRef.current;

      const { bg, star, palette } = colorCacheRef.current;

      // 1. Clear Screen or draw trail blur
      ctx.globalCompositeOperation = "source-over";
      if (trailProp > 0.01) {
        const clearA = (1 - Math.min(0.95, Math.max(0, trailProp))) * bg.a;
        ctx.fillStyle = `rgba(${bg.r}, ${bg.g}, ${bg.b}, ${clearA})`;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      // 2. Camera Coordinates / Gravity
      let camX = baseCx;
      let camY = baseCy;
      if (followProp) {
        const follow = followRef.current;
        const target = followTargetRef.current;
        const k = dt > 0 ? Math.min(1, dt * 6) : 0;
        follow.x += (target.x - follow.x) * k;
        follow.y += (target.y - follow.y) * k;
        const followAmount = 0.2;
        camX = baseCx - follow.x * w * followAmount;
        camY = baseCy - follow.y * h * followAmount;
      } else {
        followRef.current.x = 0;
        followRef.current.y = 0;
      }

      const f = Math.min(w, h) * focalProp;
      const speedFactor = dt * speedProp * 0.7 * (revProp ? 1 : -1);
      const twinkleSpeed = now * 0.0015;
      const depthSpan = Z_FAR - Z_NEAR;
      const range = Math.max(0.05, Math.min(fadeProp, depthSpan));
      const invRange = 1 / range;

      const starPaths: Array<{ x: number; y: number; size: number; alpha: number; r: number; g: number; b: number }> = [];

      const rgbaCache = randProp ? null : new Map<number, string>();
      const getCachedColor = (alpha: number, r: number, g: number, b: number) => {
        if (!rgbaCache) return `rgba(${r},${g},${b},${alpha})`;
        const key = Math.round(alpha * 1000);
        if (!rgbaCache.has(key)) {
          rgbaCache.set(key, `rgba(${star.r},${star.g},${star.b},${alpha})`);
        }
        return rgbaCache.get(key)!;
      };

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Z-Depth advancement
        s.z += speedFactor;
        if ((!revProp && s.z <= Z_NEAR) || (revProp && s.z >= Z_FAR)) {
          respawnStar(s, w, h, f, revProp, spreadProp, sizeProp, star, randProp, palette);
          continue;
        }

        // Drifts & Galaxy Rotation
        if (galProp) {
          const dx = s.x;
          const dy = s.y;
          const r = Math.sqrt(dx * dx + dy * dy);
          if (r > 1e-4) {
            const angle = Math.atan2(dy, dx);
            const spinDir = revProp ? -1 : 1;
            const spinSpeed = Math.max(0.1, speedProp * 1.2);
            const newAngle = angle + spinDir * spinSpeed * dt;
            s.x = Math.cos(newAngle) * r;
            s.y = Math.sin(newAngle) * r;
          }
        } else if (dirProp !== "none") {
          const driftBase = speedProp * 0.7;
          const drift = driftBase * dt;
          if (dirProp === "left") s.x -= drift;
          else if (dirProp === "right") s.x += drift;
          else if (dirProp === "top") s.y -= drift;
          else if (dirProp === "bottom") s.y += drift;
        }

        const invz = 1 / s.z;
        const x2d = s.x * f * invz + camX;
        const y2d = s.y * f * invz + camY;

        // Respawn if drifted offscreen
        if (
          x2d < -OFFSCREEN_MARGIN ||
          x2d > w + OFFSCREEN_MARGIN ||
          y2d < -OFFSCREEN_MARGIN ||
          y2d > h + OFFSCREEN_MARGIN
        ) {
          respawnStar(s, w, h, f, revProp, spreadProp, sizeProp, star, randProp, palette);
          continue;
        }

        const twk = Math.max(
          0,
          Math.min(1, 0.65 + twinkleProp * 0.35 * Math.sin(s.phase + twinkleSpeed * s.twinkle))
        );
        const tFar = (Z_FAR - s.z) * invRange;
        const tNear = (s.z - Z_NEAR) * invRange;
        const appear = smooth01(saturate(tFar)) * smooth01(saturate(tNear));
        const perspectiveSize = s.size * invz;
        const size = perspectiveSize * appear;
        const baseAlpha = Math.min(1, (0.15 + twk * 0.85) * star.a);
        const alpha = baseAlpha * appear;

        if (size < 0.1 || alpha < 0.01) {
          continue;
        }

        const sr = randProp ? s.cr : star.r;
        const sg = randProp ? s.cg : star.g;
        const sb = randProp ? s.cb : star.b;

        // Keep float coordinates for smooth, pixel-perfect motion
        starPaths.push({ x: x2d, y: y2d, size, alpha, r: sr, g: sg, b: sb });
      }

      // Draw all processed star particles
      for (let i = 0; i < starPaths.length; i++) {
        const st = starPaths[i];
        ctx.fillStyle = getCachedColor(st.alpha, st.r, st.g, st.b);

        // --- Optimisation ("snoo optimization"): fillRect is ~10x faster than arc(), but draw glowing soft firefly spheres for larger particles ---
        if (st.size < 2.2) {
          ctx.fillRect(st.x - st.size / 2, st.y - st.size / 2, st.size, st.size);
        } else {
          const grad = ctx.createRadialGradient(st.x, st.y, 0, st.x, st.y, st.size * 0.5);
          grad.addColorStop(0, `rgba(${st.r}, ${st.g}, ${st.b}, ${st.alpha})`);
          grad.addColorStop(0.35, `rgba(${st.r}, ${st.g}, ${st.b}, ${st.alpha * 0.7})`);
          grad.addColorStop(1, `rgba(${st.r}, ${st.g}, ${st.b}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
    [respawnStar]
  );

  // Core Animation Loop Hook
  useEffect(() => {
    resize();
    initStars();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Zero CPU optimization: completely skip drawing when component is offscreen
    if (!isInView) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    lastTimeRef.current = performance.now();

    const loop = () => {
      const now = performance.now();
      // Cap delta time to prevent speed spikes during heavy frames
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      drawFrame(ctx, canvas, now, dt);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      initStars();
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("resize", onResize);
    };
  }, [isInView, resize, initStars, drawFrame]);

  // React to touch/pointer movements to drive dynamic gravity fields and 3D tilt parallax
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const nx = (event.clientX - rect.left) / rect.width;
      const ny = (event.clientY - rect.top) / rect.height;

      if (settingsRef.current.followCursor) {
        // Map coords to [-1.0, 1.0] range
        followTargetRef.current.x = (nx - 0.5) * 2;
        followTargetRef.current.y = (ny - 0.5) * 2;
      }

      // Calculate 3D Parallax tilt based on cursor coordinates
      // Max tilt: rotateX = 14 degrees, rotateY = 14 degrees
      const tX = (ny - 0.5) * -14;
      const tY = (nx - 0.5) * 14;
      setTilt({ x: tX, y: tY });
    };

    const handlePointerLeave = () => {
      followTargetRef.current.x = 0;
      followTargetRef.current.y = 0;
      setTilt({ x: 0, y: 0 });
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        background: bgColor,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "block",
          pointerEvents: "auto",
        }}
      />
      {children && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none", // Let pointer interactions pass down to the canvas
            zIndex: 10,
          }}
        >
          <div
            style={{
              pointerEvents: "auto", // Re-enable pointer operations inside the actual interactive layout
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.15s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
