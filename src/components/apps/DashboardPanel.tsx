import React from "react";
import { useSystem } from "../SystemContext";
import { APPS } from "./appConfig";

interface DashboardPanelProps {
  starfieldSettings: any;
  setStarfieldSettings: React.Dispatch<React.SetStateAction<any>>;
  activeSettingCategory: string;
  setActiveSettingCategory: (category: string) => void;
}

export function DashboardPanel({
  starfieldSettings,
  setStarfieldSettings,
  activeSettingCategory,
  setActiveSettingCategory,
}: DashboardPanelProps) {
  const { systemAccent, setSystemAccent } = useSystem();
  const accent = APPS.find((a) => a.id === "dashboard")?.accent || "#FFD700";

  const THEMES = [
    {
      id: "mondragon",
      name: "Mondragon",
      desc: "Dark editorial",
      preview: "linear-gradient(135deg, #000 0%, #0a0a0a 100%)",
      dotColor: "#E8FF47",
      settings: {
        bgColor: "#000000",
        starColor: "#E8FF47",
        color1: "#E8FF47",
        color2: "#FF6B6B",
        color3: "#7EB8FF",
        color4: "#FFB8FF",
      },
    },
    {
      id: "day",
      name: "Daylight",
      desc: "Clean & bright",
      preview: "linear-gradient(135deg, #fff 0%, #f5f5f5 100%)",
      dotColor: "#FF5722",
      settings: {
        bgColor: "#ffffff",
        starColor: "#ff6d00",
        color1: "#ff6d00",
        color2: "#ff3d00",
        color3: "#ff9100",
        color4: "#ffab40",
      },
    },
    {
      id: "bio",
      name: "BioNight",
      desc: "Teal neural",
      preview: "linear-gradient(135deg, #090d16 0%, #04101a 100%)",
      dotColor: "#00c853",
      settings: {
        bgColor: "#090d16",
        starColor: "#00c853",
        color1: "#38bdf8",
        color2: "#818cf8",
        color3: "#00c853",
        color4: "#00e676",
      },
    },
    {
      id: "galaxy",
      name: "Nebula",
      desc: "Deep space",
      preview: "linear-gradient(135deg, #05010a 0%, #0a0014 100%)",
      dotColor: "#ff007f",
      settings: {
        bgColor: "#05010a",
        starColor: "#ff007f",
        color1: "#ff007f",
        color2: "#7f00ff",
        color3: "#00ffff",
        color4: "#00ff7f",
      },
    },
    {
      id: "nord",
      name: "Nordic",
      desc: "Arctic blue",
      preview: "linear-gradient(135deg, #2e3440 0%, #3b4252 100%)",
      dotColor: "#88c0d0",
      settings: {
        bgColor: "#2e3440",
        starColor: "#88c0d0",
        color1: "#8fbcbb",
        color2: "#88c0d0",
        color3: "#81a1c1",
        color4: "#5e81ac",
      },
    },
    {
      id: "sunset",
      name: "Solar",
      desc: "Fire & ember",
      preview: "linear-gradient(135deg, #1a0818 0%, #1a0a00 100%)",
      dotColor: "#ff3d00",
      settings: {
        bgColor: "#1a0818",
        starColor: "#ff3d00",
        color1: "#ff3d00",
        color2: "#ff007f",
        color3: "#ffab40",
        color4: "#d500f9",
      },
    },
  ];

  const ACCENTS = [
    { color: "#E8FF47", label: "Lime" },
    { color: "#FF6B6B", label: "Coral" },
    { color: "#7EB8FF", label: "Sky" },
    { color: "#FFB8FF", label: "Pink" },
    { color: "#FFD700", label: "Gold" },
    { color: "#00F5C3", label: "Mint" },
  ];

  return (
    <div className="flex h-full min-h-[400px] text-white font-sans" style={{ gap: "0" }}>
      <div
        className="w-44 shrink-0 flex flex-col py-4"
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[
          { id: "appearance", label: "Appearance", icon: "◈" },
          { id: "starfield", label: "Starfield", icon: "✦" },
          { id: "system", label: "System", icon: "⬡" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveSettingCategory(cat.id)}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-left transition-all cursor-pointer text-[11px]"
            style={{
              color: activeSettingCategory === cat.id ? accent : "rgba(255,255,255,0.35)",
              background: activeSettingCategory === cat.id ? `${accent}0d` : "transparent",
              borderLeft: activeSettingCategory === cat.id ? `2px solid ${accent}` : "2px solid transparent",
            }}
          >
            <span style={{ fontSize: "13px" }}>{cat.icon}</span>
            <span className="font-medium tracking-wide uppercase">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-7">
        {activeSettingCategory === "appearance" && (
          <>
            <div>
              <div
                className="text-[9px] tracking-[0.35em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Color Theme
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setStarfieldSettings((prev: any) => ({ ...prev, ...t.settings }));
                      setSystemAccent(t.dotColor);
                    }}
                    className="flex flex-col p-2.5 rounded-xl cursor-pointer transition-all text-left"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${
                        starfieldSettings.bgColor === t.settings.bgColor
                          ? accent + "55"
                          : "rgba(255,255,255,0.06)"
                      }`,
                    }}
                  >
                    <div
                      className="w-full h-10 rounded-lg mb-2 relative overflow-hidden"
                      style={{ background: t.preview }}
                    >
                      <div
                        className="absolute bottom-2 right-2.5 w-2.5 h-2.5 rounded-full"
                        style={{ background: t.dotColor }}
                      />
                    </div>
                    <div
                      className="text-[9px] font-bold uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="text-[8px] tracking-wider"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div
                className="text-[9px] tracking-[0.35em] uppercase mb-3"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Accent Color
              </div>
              <div className="flex items-center gap-3">
                {ACCENTS.map((a) => (
                  <button
                    key={a.color}
                    onClick={() => setSystemAccent(a.color)}
                    title={a.label}
                    className="w-7 h-7 rounded-full transition-all cursor-pointer"
                    style={{
                      background: a.color,
                      transform: systemAccent === a.color ? "scale(1.2)" : "scale(1)",
                      boxShadow: systemAccent === a.color ? `0 0 16px ${a.color}66` : "none",
                      border:
                        systemAccent === a.color
                          ? `2px solid rgba(255,255,255,0.5)`
                          : "2px solid transparent",
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {activeSettingCategory === "starfield" && (
          <>
            {[
              { key: "starCount", label: "Star Density", min: 50, max: 300, step: 10 },
              { key: "speed", label: "Warp Speed", min: 0.005, max: 0.08, step: 0.005 },
              { key: "starSize", label: "Star Size", min: 0.5, max: 4, step: 0.1 },
              { key: "twinkle", label: "Twinkle", min: 0, max: 1, step: 0.05 },
            ].map((s) => (
              <div key={s.key}>
                <div className="flex justify-between items-center mb-2">
                  <div
                    className="text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    {s.label}
                  </div>
                  <div className="text-[9px] font-mono" style={{ color: accent }}>
                    {typeof starfieldSettings[s.key] === "number"
                      ? starfieldSettings[s.key] < 1
                        ? starfieldSettings[s.key].toFixed(3)
                        : Math.round(starfieldSettings[s.key])
                      : starfieldSettings[s.key]}
                  </div>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={starfieldSettings[s.key]}
                  onChange={(e) =>
                    setStarfieldSettings((prev: any) => ({
                      ...prev,
                      [s.key]: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full h-1 appearance-none cursor-pointer rounded-full"
                  style={{ accentColor: accent }}
                />
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { key: "galaxyMode", label: "Galaxy Mode" },
                { key: "followCursor", label: "Follow Cursor" },
                { key: "randomColors", label: "Random Colors" },
              ].map((toggle) => (
                <button
                  key={toggle.key}
                  onClick={() =>
                    setStarfieldSettings((prev: any) => ({
                      ...prev,
                      [toggle.key]: !prev[toggle.key],
                    }))
                  }
                  className="px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                  style={{
                    background: starfieldSettings[toggle.key] ? `${accent}18` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      starfieldSettings[toggle.key] ? accent + "44" : "rgba(255,255,255,0.08)"
                    }`,
                    color: starfieldSettings[toggle.key] ? accent : "rgba(255,255,255,0.3)",
                  }}
                >
                  {toggle.label}
                </button>
              ))}
            </div>
          </>
        )}

        {activeSettingCategory === "system" && (
          <div className="space-y-4">
            <div
              className="p-4 rounded-xl space-y-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="text-[9px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                System Identity
              </div>
              {[
                ["OS", "Aura Neural OS v3.0"],
                ["Agent", "Chavva Akshay Kumar Reddy"],
                ["Core", "DevCore Intelligence Engine"],
                ["Status", "All Systems Nominal"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-[11px]">
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>{k}</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => {
                  setStarfieldSettings((prev: any) => ({
                    ...prev,
                    bgColor: "#000000",
                    starColor: "#E8FF47",
                    color1: "#E8FF47",
                    color2: "#FF6B6B",
                    color3: "#7EB8FF",
                    color4: "#FFB8FF",
                    starCount: 150,
                    speed: 0.02,
                    starSize: 1.6,
                  }));
                  setSystemAccent("#E8FF47");
                }}
                className="px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Reset Defaults
              </button>
              <button
                onClick={() => {
                  const speed = Math.random() * 0.06 + 0.01;
                  const size = Math.random() * 3 + 1;
                  const count = Math.floor(Math.random() * 200 + 80);
                  setStarfieldSettings((prev: any) => ({ ...prev, speed, starSize: size, starCount: count }));
                }}
                className="px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                style={{
                  background: `${accent}0d`,
                  border: `1px solid ${accent}33`,
                  color: accent,
                }}
              >
                Randomize
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default DashboardPanel;
