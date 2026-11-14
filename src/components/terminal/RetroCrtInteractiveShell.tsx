"use client";

import React, { useState, useEffect, useRef } from "react";

export interface RetroCrtInteractiveShellProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const RetroCrtInteractiveShell: React.FC<RetroCrtInteractiveShellProps> = ({
  isOpen,
  onClose,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "init-1",
      command: "",
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-[#5DD62C] font-bold">LUTFAN COSMIC OS // BOOT OK [ROM v2.4]</p>
          <p className="text-white/60">Connected to local CRT core. Type <span className="text-[#5DD62C] font-semibold underline">help</span> to view available secret commands.</p>
        </div>
      ),
    },
  ]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Focus input automatically when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Scroll to bottom on new log
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Matrix Digital Rain Animation
  useEffect(() => {
    if (!isMatrixMode || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const chars = "010101ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }).map(() => 1);

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(6, 11, 6, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#5DD62C";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMatrixMode]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    // Save to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    // Audio click trigger
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }

    const lower = cmd.toLowerCase();
    let response: React.ReactNode = null;

    if (lower === "help") {
      response = (
        <div className="space-y-1.5 text-xs text-white/80 py-1">
          <p className="text-[#5DD62C] font-semibold">AVAILABLE COMMANDS:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-2">
            <p><span className="text-[#5DD62C] font-bold">help</span> — List secret terminal commands</p>
            <p><span className="text-[#5DD62C] font-bold">skills</span> — Visual breakdown of full-stack stack</p>
            <p><span className="text-[#5DD62C] font-bold">matrix</span> — Toggle falling green digital rain</p>
            <p><span className="text-[#5DD62C] font-bold">sudo</span> — Attempt root administrative privilege</p>
            <p><span className="text-[#5DD62C] font-bold">about</span> — Quick bio &amp; developer identity</p>
            <p><span className="text-[#5DD62C] font-bold">projects</span> — View top repositories &amp; links</p>
            <p><span className="text-[#5DD62C] font-bold">coffee</span> — Open Buy Me a Coffee link</p>
            <p><span className="text-[#5DD62C] font-bold">clear</span> — Purge terminal history screen</p>
            <p><span className="text-[#5DD62C] font-bold">exit</span> — Shut down CRT terminal shell</p>
          </div>
        </div>
      );
    } else if (lower === "skills") {
      response = (
        <div className="space-y-2 text-xs py-1">
          <p className="text-[#5DD62C] font-bold">LUTFAN // TECHNICAL ARSENAL ARCHITECTURE:</p>
          <div className="space-y-1.5 pl-2 font-mono text-[11px]">
            <p><span className="text-white/60">[01] FRONTEND:</span> React, Next.js 14/15, TypeScript, TailwindCSS, GSAP, Framer Motion</p>
            <p><span className="text-white/60">[02] SPATIAL/3D:</span> Three.js, React Three Fiber, GLSL Shaders, Procedural Voxels</p>
            <p><span className="text-white/60">[03] BACKEND:</span> Node.js, Express, Python, FastAPI, REST Contracts, Webhooks</p>
            <p><span className="text-white/60">[04] DATA/ML:</span> NumPy, Pandas, Matplotlib, PyTorch Autograd, PostgreSQL, MongoDB</p>
            <p><span className="text-white/60">[05] DEVOPS:</span> Docker, Git Workflows, Linux Shell, OWASP Defense Standards</p>
          </div>
        </div>
      );
    } else if (lower === "matrix") {
      setIsMatrixMode((prev) => !prev);
      response = (
        <p className="text-[#5DD62C] font-mono text-xs">
          {isMatrixMode ? "[-] Matrix rain deactivated." : "[+] Matrix digital rain engaged. Type 'matrix' again to toggle."}
        </p>
      );
    } else if (lower.startsWith("sudo")) {
      response = (
        <div className="text-xs text-amber-400 font-mono py-1">
          <p>⚠️ Permission denied: nice try! 😉</p>
          <p className="text-white/60 text-[11px] mt-0.5">Guest privileges enforced. The universe remains immutable.</p>
        </div>
      );
    } else if (lower === "about") {
      response = (
        <div className="text-xs text-white/80 space-y-1 py-1">
          <p className="text-[#5DD62C] font-bold">LUTFAN MOHAMMED ASIF</p>
          <p>Computer Science Student &amp; Full-Stack Developer in Karnataka, India.</p>
          <p className="text-white/60">Crafting accessible learning tools, procedural 3D systems, and high-performance web applications.</p>
        </div>
      );
    } else if (lower === "projects") {
      response = (
        <div className="space-y-1.5 text-xs text-white/80 py-1">
          <p className="text-[#5DD62C] font-semibold">NOTABLE WORKS &amp; REPOSITORIES:</p>
          <div className="space-y-1 pl-2">
            <p>• <a href="https://github.com/luthfan-tech/Adaptlearn.git" target="_blank" rel="noreferrer" className="text-[#5DD62C] underline hover:text-white">AdaptLearn</a> — Adaptive learning system with Bayesian Knowledge Tracing</p>
            <p>• <a href="https://github.com/luthfan-tech/python-libs.git" target="_blank" rel="noreferrer" className="text-[#5DD62C] underline hover:text-white">python-libs</a> — NumPy, Pandas, Matplotlib &amp; PyTorch ML sprint</p>
            <p>• <a href="https://github.com/luthfan-tech/30-day-fullstack-challenge.git" target="_blank" rel="noreferrer" className="text-[#5DD62C] underline hover:text-white">30-day-fullstack-challenge</a> — End-to-end full-stack engineering curriculum</p>
            <p>• <a href="https://github.com/luthfan-tech/100-python-programs.git" target="_blank" rel="noreferrer" className="text-[#5DD62C] underline hover:text-white">100-python-programs</a> — Algorithmic logic and data structure suite</p>
          </div>
        </div>
      );
    } else if (lower === "coffee") {
      response = (
        <div className="text-xs text-white/80 py-1">
          <p>☕ Buy Me a Coffee: <a href="https://buymeacoffee.com/luthfanmakl" target="_blank" rel="noreferrer" className="text-[#5DD62C] underline font-bold">buymeacoffee.com/luthfanmakl ↗</a></p>
          <p className="text-white/60">Support creative development and open-source builds.</p>
        </div>
      );
    } else if (lower === "clear") {
      setLogs([]);
      setInputVal("");
      return;
    } else if (lower === "exit" || lower === "close" || lower === "quit") {
      onClose();
      return;
    } else {
      response = (
        <p className="text-xs text-rose-400 font-mono">
          Command not found: &apos;{cmd}&apos;. Type <span className="text-[#5DD62C] underline">help</span> for available commands.
        </p>
      );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}-${Math.random()}`,
        command: cmd,
        output: response,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputVal(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal("");
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Retro CRT Physical Monitor Bezel */}
      <div className="relative w-full max-w-3xl rounded-3xl border-4 border-[#242A24] bg-[#161C16] p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(93,214,44,0.15)] flex flex-col">
        {/* CRT Top Bar / Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#5DD62C] animate-ping" />
            <span className="font-bold tracking-wider text-white uppercase">
              RETRO CRT CORE // SHELL v1.984
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline text-white/50 text-[10px]">
              INTERACTIVE EASTER EGG CONSOLE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMatrixMode(!isMatrixMode)}
              className={`px-2.5 py-0.5 rounded text-[10px] font-mono border transition-all ${
                isMatrixMode
                  ? "bg-[#5DD62C] text-[#060B06] border-[#5DD62C] font-bold"
                  : "bg-white/5 border-white/20 text-white/70 hover:text-white"
              }`}
            >
              MATRIX RAIN
            </button>
            <button
              onClick={onClose}
              className="h-6 w-6 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-xs text-white hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* CRT Curved Screen Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="relative h-[340px] sm:h-[420px] w-full rounded-2xl bg-[#060B06] border border-[#5DD62C]/30 p-4 font-mono overflow-y-auto flex flex-col justify-between shadow-inner select-text cursor-text"
          style={{
            boxShadow: "inset 0 0 25px rgba(0, 0, 0, 0.95), inset 0 0 15px rgba(93, 214, 44, 0.15)",
          }}
        >
          {/* Matrix Digital Rain Canvas Overlay */}
          {isMatrixMode && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none opacity-40 z-0"
            />
          )}

          {/* CRT Scanline Filter Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))",
              backgroundSize: "100% 3px, 3px 100%",
            }}
          />

          {/* Output Buffer Logs */}
          <div className="relative z-20 space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                {log.command && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#5DD62C] font-bold">lutfan@cosmic-pc:~$</span>
                    <span className="text-white font-semibold">{log.command}</span>
                  </div>
                )}
                <div>{log.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Interactive Shell Input Line */}
          <form
            onSubmit={handleCommandSubmit}
            className="relative z-20 mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs"
          >
            <span className="text-[#5DD62C] font-bold shrink-0">
              lutfan@cosmic-pc:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder-white/20 caret-[#5DD62C]"
              placeholder="type help, skills, matrix, sudo..."
              autoFocus
            />
            <span className="h-4 w-2 bg-[#5DD62C] animate-pulse shrink-0" />
          </form>
        </div>

        {/* CRT Bottom Bezel Accent & Power LED */}
        <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-mono text-white/40">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] shadow-[0_0_8px_#5DD62C]" />
            <span>TERMINAL RUNNING ON PORT 3000 // HIT ESC TO EXIT</span>
          </div>
          <span>MEMORY: 640K OK</span>
        </div>
      </div>
    </div>
  );
};
