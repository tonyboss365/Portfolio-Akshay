import React, { useState } from "react";
import { EyeButton } from "./EyeButton";

export function EyePlayground() {
  // Customizable properties state
  const [text, setText] = useState("Look at my portfolio...");
  const [buttonColor, setButtonColor] = useState("bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600");
  const [textColor, setTextColor] = useState("text-white");
  const [padding, setPadding] = useState("px-7 py-4.5");
  const [radius, setRadius] = useState("rounded-full");
  const [eyeColor, setEyeColor] = useState("bg-white");
  const [pupilColor, setPupilColor] = useState("bg-slate-950");
  const [eyeCount, setEyeCount] = useState<1 | 2>(2);
  const [eyeSize, setEyeSize] = useState(36);
  const [pupilSize, setPupilSize] = useState(14);
  const [eyeGap, setEyeGap] = useState(8);
  const [speed, setSpeed] = useState(0.2);
  const [range, setRange] = useState(10);
  const [blinking, setBlinking] = useState(true);
  const [blinkingIntensity, setBlinkingIntensity] = useState(1.0);
  const [loveMode, setLoveMode] = useState(false);

  // Copy code helper
  const [copied, setCopied] = useState(false);
  const codeSnippet = `<EyeButton
  text="${text}"
  eyeCount={${eyeCount}}
  eyeSize={${eyeSize}}
  pupilSize={${pupilSize}}
  eyeGap={${eyeGap}}
  range={${range}}
  speed={${speed}}
  blinking={${blinking}}
  blinkingIntensity={${blinkingIntensity}}
  loveMode={${loveMode}}
  buttonColor="${buttonColor}"
  radius="${radius}"
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden mt-10 transition-colors duration-300 font-mono">
      {/* Visual Header */}
      <div className="bg-gray-50 dark:bg-slate-950 px-6 py-4.5 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
          <h3 className="text-xs sm:text-sm font-bold tracking-wider text-gray-700 dark:text-slate-350">
            EYE-TRACKING BUTTON PLAYGROUND
          </h3>
        </div>
        <span className="text-[9px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-450 border border-blue-100 dark:border-blue-900 px-2 py-0.5 rounded uppercase tracking-wider">
          Interactive Lab
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Render Sandbox Area */}
        <div className="p-8 sm:p-12 flex flex-col justify-center items-center bg-gray-50/50 dark:bg-slate-950/20 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-slate-800 min-h-[300px]">
          <div className="text-center space-y-2 mb-8 select-none">
            <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest block">
              Live Preview (Move your cursor!)
            </span>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 font-sans max-w-xs leading-relaxed">
              Watch the pupils respond instantly to your pointer movements. Toggle **Love Mode** to morph standard pupils into beating hearts!
            </p>
          </div>

          <div className="relative p-6 flex justify-center items-center">
            <EyeButton
              text={text}
              buttonColor={buttonColor}
              textColor={textColor}
              padding={padding}
              radius={radius}
              eyeColor={eyeColor}
              pupilColor={pupilColor}
              eyeCount={eyeCount}
              eyeSize={eyeSize}
              pupilSize={pupilSize}
              eyeGap={eyeGap}
              speed={speed}
              range={range}
              blinking={blinking}
              blinkingIntensity={blinkingIntensity}
              loveMode={loveMode}
            />
          </div>

          {/* Love Mode Quick Trigger Badge */}
          <button
            onClick={() => setLoveMode((prev) => !prev)}
            className={`mt-10 px-3.5 py-1.5 rounded-full border text-[10px] flex items-center gap-1.5 transition-all select-none cursor-pointer ${
              loveMode
                ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 shadow-sm"
                : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-100"
            }`}
          >
            <span>💖</span>
            <span>{loveMode ? "Disable Love Mode" : "Enable Love Mode"}</span>
          </button>
        </div>

        {/* Configuration Controls Area */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 max-h-[640px] overflow-y-auto">
          <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest select-none">
            CUSTOMIZATION CONTROLS
          </h4>

          {/* Properties Grid */}
          <div className="space-y-4">
            {/* Label input */}
            <div>
              <label className="text-[10px] text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Button Label text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Edit label text..."
                className="w-full text-xs font-sans px-3 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 rounded-lg placeholder-gray-400"
              />
            </div>

            {/* Layout Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Eye Count
                </label>
                <div className="flex gap-1.5">
                  {[1, 2].map((num) => (
                    <button
                      key={num}
                      onClick={() => setEyeCount(num as 1 | 2)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs cursor-pointer ${
                        eyeCount === num
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-100"
                      }`}
                    >
                      {num} {num === 1 ? "Eye" : "Eyes"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Blinking
                </label>
                <div className="flex gap-1.5">
                  {[true, false].map((state) => (
                    <button
                      key={state.toString()}
                      onClick={() => setBlinking(state)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs cursor-pointer ${
                        blinking === state
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-100"
                      }`}
                    >
                      {state ? "On" : "Off"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Slider Properties */}
            <div className="space-y-3 pt-2">
              {/* Eye Size */}
              <div>
                <div className="flex justify-between text-[10px] text-gray-500 dark:text-slate-400 mb-1">
                  <span className="uppercase tracking-wider">Eye Size</span>
                  <span>{eyeSize}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={eyeSize}
                  onChange={(e) => setEyeSize(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Pupil Size */}
              <div>
                <div className="flex justify-between text-[10px] text-gray-500 dark:text-slate-400 mb-1">
                  <span className="uppercase tracking-wider">Pupil Size</span>
                  <span>{pupilSize}px</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="28"
                  value={pupilSize}
                  onChange={(e) => setPupilSize(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Eye Gap */}
              {eyeCount === 2 && (
                <div>
                  <div className="flex justify-between text-[10px] text-gray-500 dark:text-slate-400 mb-1">
                    <span className="uppercase tracking-wider">Eye Spacing</span>
                    <span>{eyeGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    value={eyeGap}
                    onChange={(e) => setEyeGap(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              )}

              {/* Range */}
              <div>
                <div className="flex justify-between text-[10px] text-gray-500 dark:text-slate-400 mb-1">
                  <span className="uppercase tracking-wider">Tracking Range</span>
                  <span>{range}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={range}
                  onChange={(e) => setRange(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Speed */}
              <div>
                <div className="flex justify-between text-[10px] text-gray-500 dark:text-slate-400 mb-1">
                  <span className="uppercase tracking-wider">Spring Speed</span>
                  <span>{speed.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Presets and Options */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[10px] text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Button Theme
                </label>
                <select
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                  className="w-full text-xs bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-200 px-2 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Dynamic Blue</option>
                  <option value="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">Forest Emerald</option>
                  <option value="bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600">Golden Amber</option>
                  <option value="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">Cyber Indigo</option>
                  <option value="bg-slate-950 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700">Onyx Dark</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Button Radius
                </label>
                <select
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full text-xs bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-200 px-2 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="rounded-full">Fully Rounded</option>
                  <option value="rounded-xl">Semi Rounded (Large)</option>
                  <option value="rounded-md">Standard Rounded</option>
                  <option value="rounded-sm">Retro Sharp</option>
                </select>
              </div>
            </div>
          </div>

          {/* Copyable Code Snippet Block */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-1.5 select-none">
              <span className="text-[9px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                GENERATED CODE
              </span>
              <button
                onClick={copyCode}
                className="text-[10px] text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-bold tracking-wider cursor-pointer"
              >
                {copied ? "COPIED! ✅" : "COPY CODE"}
              </button>
            </div>
            <pre className="p-3 bg-gray-950 text-green-400 text-[10px] rounded-lg overflow-x-auto shadow-inner border border-gray-800 leading-relaxed max-w-full">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
