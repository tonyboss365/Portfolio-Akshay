import React, { useRef, useState, useEffect } from "react";
import { useSystem } from "../SystemContext";
import { useFileSystem } from "../FileSystemContext";

export function PaintStudio() {
  const { systemAccent, playSound } = useSystem();
  const { writeFile } = useFileSystem();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState(systemAccent);
  const [penSize, setPenSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 460;
    canvas.height = 240;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Update penColor if systemAccent changes and eraser is not active
  useEffect(() => {
    if (!isEraser) {
      setPenColor(systemAccent);
    }
  }, [systemAccent, isEraser]);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    playSound("click");
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = isEraser ? "#ffffff" : penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    playSound("close");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    playSound("open");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "aero_masterpiece.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const saveToVFS = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playSound("boot");
    const base64Data = canvas.toDataURL("image/png");
    const name = `artwork_${Date.now().toString().slice(-4)}.png`;
    
    // Writes directly to the sandboxed Downloads folder in IndexedDB
    writeFile(["Root", "Downloads"], name, base64Data, "image");

    setSaveSuccessMsg(`🎨 Saved to VFS: /Downloads/${name}`);
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  const PALETTE = [
    systemAccent,
    "#FF6B6B",
    "#00F5C3",
    "#FF66CC",
    "#FFD700",
    "#7EB8FF",
    "#000000",
  ];

  return (
    <div className="flex flex-col h-full bg-[#0d0d14] rounded-xl p-4 text-white font-sans text-xs min-h-[370px] justify-between">
      {/* Colors & Size Controls */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 rounded-xl p-2 mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          {PALETTE.map((c) => (
            <button
              key={c}
              onClick={() => {
                playSound("click");
                setPenColor(c);
                setIsEraser(false);
              }}
              className="w-5 h-5 rounded-full border transition-all cursor-pointer"
              style={{
                background: c,
                borderColor: penColor === c && !isEraser ? "#ffffff" : "transparent",
                transform: penColor === c && !isEraser ? "scale(1.15)" : "scale(1)",
              }}
            />
          ))}
          <button
            onClick={() => {
              playSound("click");
              setIsEraser(true);
            }}
            className={`px-2 py-0.5 border text-[9px] font-bold rounded cursor-pointer ${
              isEraser ? "border-white bg-white/20" : "border-slate-700 bg-transparent text-slate-400"
            }`}
          >
            🧽 ERASER
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-slate-500 font-mono">SIZE: {penSize}px</span>
            <input
              type="range"
              min="1"
              max="20"
              value={penSize}
              onChange={(e) => setPenSize(parseInt(e.target.value))}
              className="w-16 h-1 appearance-none bg-slate-800 cursor-pointer rounded"
              style={{ accentColor: systemAccent }}
            />
          </div>
        </div>
      </div>

      {/* Drawing Canvas */}
      <div className="flex-1 bg-white border border-slate-800 rounded-xl overflow-hidden cursor-crosshair min-h-[180px]">
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          className="w-full h-full block bg-white"
        />
      </div>

      {/* VFS Success Alert Banner */}
      {saveSuccessMsg && (
        <div className="mt-2 p-2 bg-green-950/40 border border-green-800/40 rounded-xl text-green-400 font-mono text-[9px] text-center uppercase tracking-widest animate-pulse shrink-0">
          {saveSuccessMsg}
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between gap-2 mt-3 shrink-0">
        <button
          onClick={clearCanvas}
          className="px-2.5 py-1.5 border border-slate-800 hover:border-slate-600 bg-transparent rounded-lg text-slate-400 hover:text-white cursor-pointer text-[9px] uppercase font-bold transition-all"
        >
          🗑 CLEAR
        </button>

        <div className="flex gap-2">
          <button
            onClick={saveToVFS}
            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 text-white font-bold cursor-pointer text-[9px] uppercase transition-all"
          >
            💾 SAVE TO VFS
          </button>
          <button
            onClick={saveDrawing}
            className="px-3 py-1.5 rounded-lg text-slate-900 font-bold cursor-pointer text-[9px] uppercase transition-all"
            style={{ background: systemAccent }}
          >
            📥 DOWNLOAD
          </button>
        </div>
      </div>
    </div>
  );
}
export default PaintStudio;
