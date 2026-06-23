import React, { useState, useEffect, useRef } from "react";
import { useSystem } from "../SystemContext";
import { useFileSystem } from "../FileSystemContext";

export function NeuralShell() {
  const { systemAccent, setSystemAccent, isMuted, playSound } = useSystem();
  const { fs, writeFile } = useFileSystem();
  const [history, setHistory] = useState<string[]>([
    "AURA SECURE CLI MATRIX [Version 3.0.0]",
    "(c) Chavva Akshay Kumar Reddy. All neural rights reserved.",
    "Connecting node socket...",
    "Node handshake verified at 12ms.",
    "Type 'help' to view all system commands.",
    ""
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmdStr = inputVal.trim();
    const parts = cmdStr.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");
    playSound("click");

    const nextHistory = [...history, `guest@aura-os:~$ ${cmdStr}`];

    switch (command) {
      case "help":
        nextHistory.push(
          "Available System Commands:",
          "  help           Display this reference menu",
          "  ls             List sandboxed directories and files in VFS",
          "  cat <file>     Print a text file's contents to the terminal",
          "  echo <t> > <f> Write text strings to the Downloads folder",
          "  neofetch       Fetch detailed system host architecture specs",
          "  skills         Display core developer expertise arrays",
          "  projects       Display key production highlights",
          "  theme <color>  Dynamically shift desktop accent (e.g. lime, coral, sky, pink, gold, mint)",
          "  matrix         Initiate advanced terminal green rain streamsaver",
          "  cowsay <msg>   Have a cybernetic cow announce your neural speech",
          "  weather        Ping real-time weather grid for Neo-Aero City",
          "  fortune        Obtain developer/cyberpunk zen matrix prophecy quotes",
          "  beep           Synthesize high-frequency digital alert tone",
          "  clear          Purge command logs",
          ""
        );
        break;
      case "ls":
        const docs = fs.children["Documents"]?.type === "directory" ? Object.keys((fs.children["Documents"] as any).children) : [];
        const dls = fs.children["Downloads"]?.type === "directory" ? Object.keys((fs.children["Downloads"] as any).children) : [];
        const code = fs.children["Source_Code"]?.type === "directory" ? Object.keys((fs.children["Source_Code"] as any).children) : [];
        const sys = fs.children["System_Drive"]?.type === "directory" ? Object.keys((fs.children["System_Drive"] as any).children) : [];
        
        nextHistory.push(
          "📁 /Documents:",
          ...docs.map(name => `  📄 ${name}`),
          "📁 /Downloads (Drop destination):",
          ...dls.map(name => `  📄 ${name}`),
          "📁 /Source_Code:",
          ...code.map(name => `  📄 ${name}`),
          "📁 /System_Drive:",
          ...sys.map(name => `  📄 ${name}`),
          ""
        );
        break;
      case "cat":
        if (!arg) {
          nextHistory.push("Usage: cat <filename>", "");
          break;
        }
        let foundContent: string | null = null;
        Object.values(fs.children).forEach((node) => {
          if (node.type === "directory" && (node as any).children[arg]?.type === "text") {
            foundContent = (node as any).children[arg].content;
          }
        });
        if (foundContent !== null) {
          nextHistory.push(...(foundContent as string).split("\n"), "");
        } else {
          nextHistory.push(`[ERROR] File not found or binary type: "${arg}"`, "");
        }
        break;
      case "echo":
        const echoMatch = arg.match(/(.*?)\s*>\s*([a-zA-Z0-9_\-\.]+)/);
        if (echoMatch) {
          const content = echoMatch[1].trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
          const filename = echoMatch[2].trim();
          writeFile(["Root", "Downloads"], filename, content, "text");
          nextHistory.push(`[SUCCESS] Wrote to /Downloads/${filename}`, "");
        } else {
          nextHistory.push("Usage: echo \"message\" > filename.txt", "");
        }
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "neofetch":
        nextHistory.push(
          "   .-----------.   OS: Aura OS Neural V3.0",
          "  /   _     _   \\  Agent: Chavva Akshay Kumar Reddy",
          " /   (o)   (o)   \\ Kernel: DevCore v3.0.12-x64",
          " |     __ _      | Up-time: 98.4% Nominal",
          " \\      \\_/     /  CPU: Intel GenAI 12-Core Core-Synapse",
          "  \\___________/    RAM: 24.2 GB / 64 GB",
          "                   Shell: Neural ZSH",
          ""
        );
        break;
      case "skills":
        nextHistory.push(
          "TECHNICAL EXPERTISE MATRIX:",
          "  - Frontend: React, Next.js, TypeScript, TailwindCSS, Framer Motion, Vanilla CSS",
          "  - Backend: Node.js, Express, Go, Python, PostgreSQL, MongoDB, GraphQL",
          "  - Intelligence: Google GenAI, LangChain, Neural Agents",
          "  - DevOps: Docker, AWS, GitHub Actions, CI/CD",
          ""
        );
        break;
      case "projects":
        nextHistory.push(
          "HIGHLIGHT PROJECTS:",
          "  - GLYCOS AI (Client-side metabolic intelligence platform)",
          "  - SYNTEX AI (Next-gen interactive AI compiler studio & IDE)",
          "  - Learn-Flow (AI-powered course creation and LMS platform)",
          "  - Student Grievance System (Institutional ticket routing platform)",
          ""
        );
        break;
      case "cowsay":
        const msg = arg || "Aura OS is absolutely spectacular!";
        const dashes = "-".repeat(msg.length + 2);
        nextHistory.push(
          `  ${dashes}`,
          `  < ${msg} >`,
          `  ${dashes}`,
          "         \\   ^__^",
          "          \\  (oo)\\_______",
          "             (__)\\       )\\/\\",
          "                 ||----w |",
          "                 ||     ||",
          ""
        );
        break;
      case "weather":
        nextHistory.push(
          "--- METEOROLOGY GRID RADAR ---",
          "Location: Neo-Aero Cyber City",
          "Condition: Acid Rain / Neon Fog",
          "Temp: 21°C",
          "Neural Sync: 99.7%",
          "Wind Speed: 24 km/h Cyber-gusts",
          ""
        );
        break;
      case "fortune":
        const fortunes = [
          "Prophecy: You are one commit away from transforming web design paradigms.",
          "Prophecy: A robust codebase brings peace of mind. Refactor with pride.",
          "Prophecy: AI will not replace you. A developer utilizing AI agents will.",
          "Prophecy: The matrix reveals 99% probability of project deployment success!"
        ];
        nextHistory.push(fortunes[Math.floor(Math.random() * fortunes.length)], "");
        break;
      case "theme":
        const validAccents: Record<string, string> = {
          lime: "#E8FF47",
          coral: "#FF6B6B",
          sky: "#7EB8FF",
          pink: "#FFB8FF",
          gold: "#FFD700",
          mint: "#00F5C3"
        };
        if (validAccents[arg.toLowerCase()]) {
          setSystemAccent(validAccents[arg.toLowerCase()]);
          nextHistory.push(`[SUCCESS] Global theme accent color successfully set to ${arg.toUpperCase()}!`, "");
        } else {
          nextHistory.push(
            `[ERROR] Unknown accent style: "${arg}"`,
            "Choose from: lime, coral, sky, pink, gold, mint",
            ""
          );
        }
        break;
      case "beep":
        playSound("open");
        nextHistory.push("Beep command dispatched.", "");
        break;
      case "matrix":
        setIsMatrixActive(true);
        nextHistory.push("Launching matrix code screen...", "");
        setTimeout(() => {
          setIsMatrixActive(false);
          setHistory((prev) => [...prev, "Matrix stream complete.", ""]);
        }, 4000);
        break;
      default:
        nextHistory.push(
          `Shell: Command not found: "${command}".`,
          "Type 'help' to see all available commands.",
          ""
        );
    }

    setHistory(nextHistory);
    setInputVal("");
  };

  if (isMatrixActive) {
    return <MatrixStreams close={() => setIsMatrixActive(false)} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#030712]/95 text-green-400 font-mono text-[11px] p-4 rounded-xl border border-green-500/20 shadow-inner h-[320px]">
      <div className="flex-1 overflow-y-auto pr-2 space-y-1">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-green-500/10 pt-2 mt-2">
        <span className="text-emerald-500 font-bold shrink-0">guest@aura-os:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent border-0 text-green-300 focus:outline-none focus:ring-0 p-0 font-mono text-[11px]"
          autoFocus
        />
      </form>
    </div>
  );
}

// Matrix Falling Characters Overlay
export function MatrixStreams({ close }: { close: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 350;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).map(() => 1);

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-[320px] bg-black rounded-xl overflow-hidden cursor-pointer" onClick={close}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[9px] font-mono text-green-500 border border-green-500/20">
        CLICK TO RETURN
      </div>
    </div>
  );
}
export default NeuralShell;
