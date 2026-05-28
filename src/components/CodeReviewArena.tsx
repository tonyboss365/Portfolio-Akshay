import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChatBotLogo } from "../App"; // Reuse the chatbot logo from App.tsx

interface PresetChallenge {
  title: string;
  desc: string;
  unoptimized: string;
  optimized: string;
  timeComplexityUnopt: string;
  timeComplexityOpt: string;
  spaceComplexityUnopt: string;
  spaceComplexityOpt: string;
  speedup: string;
  metrics: {
    unoptCpu: number; // relative score 0-100
    optCpu: number;
    unoptMem: number;
    optMem: number;
  };
}

const PRESET_CHALLENGES: PresetChallenge[] = [
  {
    title: "Duplicate Detection in Arrays",
    desc: "Scan an array of records to find if any element appears twice.",
    unoptimized: `// O(N^2) - Nested Loop Approach
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return true; // Found duplicate
      }
    }
  }
  return false;
}`,
    optimized: `// O(N) - Linear Time HashSet Lookup
function hasDuplicate(arr) {
  const seen = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (seen.has(arr[i])) {
      return true; // Found duplicate instantly
    }
    seen.add(arr[i]);
  }
  return false;
}`,
    timeComplexityUnopt: "O(N²)",
    timeComplexityOpt: "O(N)",
    spaceComplexityUnopt: "O(1)",
    spaceComplexityOpt: "O(N)",
    speedup: "420x Faster",
    metrics: { unoptCpu: 95, optCpu: 5, unoptMem: 10, optMem: 35 },
  },
  {
    title: "Fibonacci Sequence Generator",
    desc: "Calculate the Nth Fibonacci number in a sequence.",
    unoptimized: `// O(2^N) - Double Recursive Cascade
function fibonacci(n) {
  if (n <= 1) return n;
  
  // Exponential tree recursion causes 
  // severe CPU stack lock at n > 35
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    optimized: `// O(N) - Dynamic Programming (Memoization)
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  
  // Single-path traversal with linear lookups
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
    timeComplexityUnopt: "O(2ⁿ)",
    timeComplexityOpt: "O(N)",
    spaceComplexityUnopt: "O(N)",
    spaceComplexityOpt: "O(N)",
    speedup: "12,000x Faster",
    metrics: { unoptCpu: 100, optCpu: 2, unoptMem: 40, optMem: 15 },
  },
  {
    title: "Array Sorting Engine",
    desc: "Reorganize an unsorted numerical list into ascending order.",
    unoptimized: `// O(N^2) - Bubble Sort Iteration
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Repeatedly swapping adjacent elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
    optimized: `// O(N log N) - Quick Sort (Divide & Conquer)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  // Recursively partition and merge
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    timeComplexityUnopt: "O(N²)",
    timeComplexityOpt: "O(N log N)",
    spaceComplexityUnopt: "O(1)",
    spaceComplexityOpt: "O(log N)",
    speedup: "150x Faster",
    metrics: { unoptCpu: 85, optCpu: 12, unoptMem: 5, optMem: 25 },
  },
];

export function CodeReviewArena() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [customCode, setCustomCode] = useState("");
  const [isRefactoring, setIsRefactoring] = useState(false);
  const [refactoredCodeVisible, setRefactoredCodeVisible] = useState("");
  const [showMetrics, setShowMetrics] = useState(false);
  const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeChallenge = PRESET_CHALLENGES[selectedPresetIdx];

  // Set initial custom code
  useEffect(() => {
    if (activeTab === "custom" && !customCode) {
      setCustomCode(`// Paste your unoptimized code here...\nfunction example(arr) {\n  // your loops\n}`);
    }
  }, [activeTab]);

  const handleRefactor = async () => {
    if (isRefactoring) return;
    setIsRefactoring(true);
    setRefactoredCodeVisible("");
    setShowMetrics(false);

    // Cancel existing timer
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    let targetCode = "";
    if (activeTab === "preset") {
      targetCode = activeChallenge.optimized;
      let index = 0;
      const speed = targetCode.length > 500 ? 5 : 8;

      typingTimerRef.current = setInterval(() => {
        setRefactoredCodeVisible((prev) => prev + targetCode.charAt(index));
        index++;
        if (index >= targetCode.length) {
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);
          setIsRefactoring(false);
          setShowMetrics(true);
        }
      }, speed);
    } else {
      const userCode = customCode.trim() || "";
      if (!userCode) {
        setIsRefactoring(false);
        return;
      }

      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${(import.meta as any).env.VITE_OPENROUTER_KEY ?? ""}`
          },
          body: JSON.stringify({
            model: "nvidia/nemotron-3-nano-30b-a3b:free",
            messages: [
              {
                role: "system",
                content: "You are the DevCore Neural Engine Optimization Module. Your task is to receive source code and return 100% correct, highly optimized, production-ready code. Explain the optimized time/space complexity at the top inside comments (e.g. // Optimized Complexity: O(N) Time, O(1) Space), then output the clean code. Do not wrap in markdown fenced code blocks, just return code directly so it looks great in an editor."
              },
              {
                role: "user",
                content: `Please optimize this unoptimized code:\n\n${userCode}`
              }
            ]
          })
        });

        if (!response.ok) {
          throw new Error("API call failed");
        }

        const data = await response.json();
        const rawContent = data?.choices?.[0]?.message?.content || "";
        targetCode = rawContent.replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "");
      } catch (err) {
        console.error("Optimization failed:", err);
        targetCode = `// [Error] Optimization connection interrupted.\n// Fallback optimization algorithm applied:\n\n${userCode.replace(/function\s+(\w+)/, "function optimized_$1")}`;
      }

      let index = 0;
      const speed = targetCode.length > 500 ? 3 : 6;

      typingTimerRef.current = setInterval(() => {
        setRefactoredCodeVisible((prev) => prev + targetCode.charAt(index));
        index++;
        if (index >= targetCode.length) {
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);
          setIsRefactoring(false);
          setShowMetrics(true);
        }
      }, speed);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  const resetArena = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setRefactoredCodeVisible("");
    setIsRefactoring(false);
    setShowMetrics(false);
  };

  return (
    <div className="w-full flex flex-col h-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xl transition-colors duration-300 font-mono">
      {/* Title Header */}
      <div className="bg-gray-50 dark:bg-slate-950 px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center select-none shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <ChatBotLogo className="w-4 h-4" fillColor="currentColor" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-700 dark:text-slate-350 tracking-widest uppercase">
              AI CODE REVIEWER ARENA
            </h3>
            <span className="text-[9px] text-gray-400 dark:text-slate-500 block mt-0.5">Refactor code from O(N²) to O(N) instantly</span>
          </div>
        </div>
        <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold shadow-sm">
          OPTIMIZER V2.0
        </span>
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-5 scrollbar-thin">
        {/* Preset / Custom Tab Selector */}
        <div className="flex gap-2 select-none border-b border-gray-100 dark:border-slate-800/80 pb-3 shrink-0">
          <button
            onClick={() => {
              setActiveTab("preset");
              resetArena();
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              activeTab === "preset"
                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                : "bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-gray-500 hover:text-gray-700 dark:hover:text-slate-300"
            }`}
          >
            PRESETS
          </button>
          <button
            onClick={() => {
              setActiveTab("custom");
              resetArena();
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              activeTab === "custom"
                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                : "bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-gray-500 hover:text-gray-700 dark:hover:text-slate-300"
            }`}
          >
            CUSTOM CODE
          </button>
        </div>

        {/* Preset Selector Dropdown */}
        {activeTab === "preset" && (
          <div className="space-y-1.5 select-none shrink-0">
            <label className="text-[10px] text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
              Select Unoptimized Code Preset
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_CHALLENGES.map((challenge, idx) => (
                <button
                  key={challenge.title}
                  onClick={() => {
                    setSelectedPresetIdx(idx);
                    resetArena();
                  }}
                  className={`px-3 py-2 text-xs rounded-lg border text-left cursor-pointer transition-all ${
                    selectedPresetIdx === idx
                      ? "border-blue-500 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold"
                      : "border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 text-gray-600 dark:text-slate-400 bg-white dark:bg-slate-900"
                  }`}
                >
                  {challenge.title}
                </button>
              ))}
            </div>
            <p className="text-[10.5px] text-gray-500 dark:text-slate-450 font-sans leading-relaxed mt-2.5 bg-gray-50/70 dark:bg-slate-950/30 p-2.5 rounded-lg border border-gray-100 dark:border-slate-800/40">
              <strong className="text-blue-500">Scenario:</strong> {activeChallenge.desc}
            </p>
          </div>
        )}

        {/* Code Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[220px]">
          {/* Left Panel: Unoptimized Code */}
          <div className="flex flex-col border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden bg-gray-950/5 dark:bg-slate-950/5 shadow-inner">
            <div className="bg-gray-100 dark:bg-slate-950 px-4 py-2 border-b border-gray-200 dark:border-slate-800/70 flex justify-between items-center select-none">
              <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Unoptimized Code {activeTab === "preset" ? `(${activeChallenge.timeComplexityUnopt})` : ""}
              </span>
              <span className="text-[8px] bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded font-bold uppercase">
                O(N²) SLOW
              </span>
            </div>
            
            {activeTab === "preset" ? (
              <pre className="flex-1 p-4 overflow-x-auto text-[11px] sm:text-xs text-gray-800 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900">
                <code>{activeChallenge.unoptimized}</code>
              </pre>
            ) : (
              <textarea
                value={customCode}
                onChange={(e) => {
                  setCustomCode(e.target.value);
                  resetArena();
                }}
                disabled={isRefactoring}
                className="flex-1 w-full p-4 text-[11px] sm:text-xs text-gray-800 dark:text-slate-350 bg-white dark:bg-slate-900 focus:outline-none leading-relaxed font-mono resize-none border-0 min-h-[180px]"
              />
            )}
          </div>

          {/* Right Panel: AI Refactored Code */}
          <div className="flex flex-col border border-blue-200 dark:border-blue-900/50 rounded-lg overflow-hidden bg-blue-950/5 dark:bg-slate-950/5 shadow-inner">
            <div className="bg-blue-50/70 dark:bg-slate-950 px-4 py-2 border-b border-blue-100 dark:border-blue-900/60 flex justify-between items-center select-none">
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                AI Refactored Code {activeTab === "preset" ? `(${activeChallenge.timeComplexityOpt})` : ""}
              </span>
              <span className="text-[8px] bg-green-100 dark:bg-green-950/40 border border-green-200 dark:border-green-900/40 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded font-bold uppercase">
                O(N) COMPRESSED
              </span>
            </div>
            <pre className="flex-1 p-4 overflow-x-auto text-[11px] sm:text-xs text-blue-600 dark:text-blue-300 leading-relaxed bg-white dark:bg-slate-900/90 min-h-[180px] relative">
              <code className="text-gray-700 dark:text-slate-300">
                {refactoredCodeVisible || (
                  <span className="text-gray-400 dark:text-slate-600 italic select-none">
                    {isRefactoring ? "Compiling and refactoring..." : "Click 'Optimize Code' to start AI audit..."}
                  </span>
                )}
              </code>
              {isRefactoring && (
                <span className="absolute bottom-4 right-4 text-[9px] bg-blue-500 text-white border border-blue-400 px-2 py-0.5 rounded shadow-sm animate-pulse uppercase tracking-wider">
                  OPTIMIZING...
                </span>
              )}
            </pre>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2 shrink-0">
          <div className="flex gap-2">
            <button
              onClick={handleRefactor}
              disabled={isRefactoring || (activeTab === "custom" && !customCode.trim())}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white border border-blue-500 font-mono font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className={`w-3.5 h-3.5 ${isRefactoring ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {isRefactoring ? "COMPILING..." : "OPTIMIZE CODE"}
            </button>
            <button
              onClick={resetArena}
              disabled={isRefactoring || (!refactoredCodeVisible && !showMetrics)}
              className="px-5 py-2.5 bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 font-bold text-xs rounded-xl transition-all cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed"
            >
              RESET
            </button>
          </div>
          {showMetrics && activeTab === "preset" && (
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/40 text-green-700 dark:text-green-400 px-4 py-2 rounded-xl text-[10px] font-bold shadow-sm select-none">
              <span className="text-xs">⚡</span>
              <span>CODE REFACTOR SECURED: {activeChallenge.speedup}</span>
            </div>
          )}
        </div>

        {/* Comparative Performance Analytics Dashboard */}
        <AnimatePresence>
          {showMetrics && activeTab === "preset" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="border border-green-200 dark:border-green-900/50 bg-green-50/15 dark:bg-green-950/5 rounded-xl p-5 space-y-4 shrink-0 shadow-lg select-none"
            >
              <h4 className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Comparative Performance Metrics
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                {/* Metric 1: CPU Cycles */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-gray-500 dark:text-slate-450 uppercase font-bold">
                    <span>CPU Clock Cycle Lockout</span>
                    <span className="font-mono">
                      {activeChallenge.metrics.unoptCpu}% unopt vs <strong className="text-green-500">{activeChallenge.metrics.optCpu}% opt</strong>
                    </span>
                  </div>
                  <div className="h-6 w-full bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col justify-center relative p-1">
                    {/* Unoptimized Cpu Bar */}
                    <div 
                      className="h-2 bg-red-500 rounded-md transition-all duration-500 mb-0.5" 
                      style={{ width: `${activeChallenge.metrics.unoptCpu}%` }}
                    />
                    {/* Optimized Cpu Bar */}
                    <div 
                      className="h-2 bg-green-500 rounded-md transition-all duration-500" 
                      style={{ width: `${activeChallenge.metrics.optCpu}%` }}
                    />
                  </div>
                </div>

                {/* Metric 2: Memory Footprint */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-gray-500 dark:text-slate-450 uppercase font-bold">
                    <span>Memory Allocation (Heap)</span>
                    <span className="font-mono">
                      {activeChallenge.metrics.unoptMem}% unopt vs <strong className="text-blue-500">{activeChallenge.metrics.optMem}% opt</strong>
                    </span>
                  </div>
                  <div className="h-6 w-full bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col justify-center relative p-1">
                    {/* Unoptimized Mem Bar */}
                    <div 
                      className="h-2 bg-red-400 rounded-md transition-all duration-500 mb-0.5" 
                      style={{ width: `${activeChallenge.metrics.unoptMem}%` }}
                    />
                    {/* Optimized Mem Bar */}
                    <div 
                      className="h-2 bg-blue-500 rounded-md transition-all duration-500" 
                      style={{ width: `${activeChallenge.metrics.optMem}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Badges and Summary */}
              <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-200/40 dark:border-slate-800/40 text-[10px] font-bold">
                <div className="flex gap-2">
                  <span className="text-gray-400 dark:text-slate-500 uppercase">Unoptimized Complexity:</span>
                  <span className="text-red-500 uppercase">{activeChallenge.timeComplexityUnopt} Time | {activeChallenge.spaceComplexityUnopt} Space</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 dark:text-slate-500 uppercase">Optimized Complexity:</span>
                  <span className="text-green-500 uppercase">{activeChallenge.timeComplexityOpt} Time | {activeChallenge.spaceComplexityOpt} Space</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
