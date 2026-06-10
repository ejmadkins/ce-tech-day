"use client";

import React, { useState, useEffect, useRef } from "react";

// --- Types ---
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: "work" | "personal" | "shopping" | "ideas" | "other";
  dueDate?: string;
  createdAt: number;
}

interface Toast {
  id: string;
  message: string;
  type: "add" | "complete" | "delete" | "success" | "info";
}

// --- Icons ---
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const VolumeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

const VolumeMuteIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
);

const CategoryIcon = ({ cat }: { cat: Todo["category"] }) => {
  switch (cat) {
    case "work":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4.688 4.188a1.813 1.813 0 11-2.625 0 1.813 1.813 0 012.625 0zM14 16h.01M10 16h.01" />
        </svg>
      );
    case "personal":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "shopping":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "ideas":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
  }
};

// --- Web Audio Sound Synthesizer ---
const playSynthSound = (type: "add" | "complete" | "delete" | "success") => {
  if (typeof window === "undefined") return;
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "add") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "complete") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.18); // C6
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === "delete") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "success") {
      // Fanfare chord
      const chords = [261.63, 329.63, 392.00, 523.25, 659.25];
      chords.forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = "sine";
        o.frequency.setValueAtTime(freq, now + idx * 0.05);
        g.gain.setValueAtTime(0.04, now + idx * 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.5);
        o.start(now + idx * 0.05);
        o.stop(now + idx * 0.05 + 0.5);
      });
    }
  } catch (e) {
    console.warn("Audio synthesis error: ", e);
  }
};

export default function Home() {
  // --- States ---
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");
  const [category, setCategory] = useState<Todo["category"]>("work");
  const [dueDate, setDueDate] = useState("");

  // Filter/Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "active" | "completed">("all");
  const [sortBy, setSortBy] = useState<"date" | "priority" | "dueDate">("date");

  // UX states
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newlyAddedId, setNewlyAddedId] = useState<string | null>(null);

  // Canvas ref for Confetti
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- Mounting & Load LocalStorage ---
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("aerotask_todos");
    const soundSetting = localStorage.getItem("aerotask_sound");

    if (soundSetting !== null) {
      setSoundEnabled(soundSetting === "true");
    }

    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    } else {
      // High-quality mock data
      const initialMock: Todo[] = [
        {
          id: "mock-1",
          text: "🚀 Launch AeroTask dashboard with custom synthesized sounds",
          completed: true,
          priority: "high",
          category: "work",
          createdAt: Date.now() - 3600000 * 24, // 1 day ago
          dueDate: new Date().toISOString().split("T")[0],
        },
        {
          id: "mock-2",
          text: "💡 Design system layout for the next milestone architecture",
          completed: false,
          priority: "medium",
          category: "ideas",
          createdAt: Date.now() - 3600000 * 5, // 5 hours ago
          dueDate: new Date(Date.now() + 3600000 * 24).toISOString().split("T")[0],
        },
        {
          id: "mock-3",
          text: "🛒 Buy premium single-origin dark roast coffee beans",
          completed: false,
          priority: "low",
          category: "shopping",
          createdAt: Date.now() - 3600000 * 2, // 2 hours ago
        },
        {
          id: "mock-4",
          text: "🏃‍♂️ Evening stretch routine and 5k recovery run",
          completed: false,
          priority: "medium",
          category: "personal",
          createdAt: Date.now() - 1800000, // 30 mins ago
        },
      ];
      setTodos(initialMock);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("aerotask_todos", JSON.stringify(todos));
    }
  }, [todos, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("aerotask_sound", String(soundEnabled));
    }
  }, [soundEnabled, isMounted]);

  // --- Confetti celebration trigger ---
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      color: string;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ["#6366f1", "#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"];

    // Launch from both bottom corners for extra flare!
    for (let i = 0; i < 60; i++) {
      // Left side
      particles.push({
        x: 0,
        y: canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 12 + 4,
        speedY: -Math.random() * 18 - 10,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
      });

      // Right side
      particles.push({
        x: canvas.width,
        y: canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
        speedX: -Math.random() * 12 - 4,
        speedY: -Math.random() * 18 - 10,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
      });
    }

    let animationId: number;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.35; // gravity
        p.speedX *= 0.98; // air friction
        p.rotation += p.rotationSpeed;

        if (p.y < canvas.height + 20 && p.x > -20 && p.x < canvas.width + 20) {
          active = true;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        // Draw squares and diamonds
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (active) {
        animationId = requestAnimationFrame(update);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    update();
  };

  // --- Handlers ---
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      priority,
      category,
      dueDate: dueDate || undefined,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setNewlyAddedId(newTodo.id);
    setText("");
    setDueDate("");

    if (soundEnabled) playSynthSound("add");
    addToast("New task created!", "add");

    setTimeout(() => {
      setNewlyAddedId(null);
    }, 600);
  };

  const handleToggleComplete = (id: string) => {
    const isNowCompleted = !todos.find((t) => t.id === id)?.completed;

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: isNowCompleted } : t))
    );

    if (isNowCompleted) {
      if (soundEnabled) playSynthSound("complete");
      addToast("Task completed! Keep it up!", "complete");

      // Celebrate if it completes all remaining tasks or hits a target
      const completedCount = todos.filter((t) => t.completed).length + 1;
      const totalCount = todos.length;

      if (completedCount === totalCount && totalCount > 0) {
        setTimeout(() => {
          if (soundEnabled) playSynthSound("success");
          addToast("🎉 Epic! All tasks accomplished!", "success");
          triggerConfetti();
        }, 400);
      }
    } else {
      addToast("Task marked active", "info");
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    if (soundEnabled) playSynthSound("delete");
    addToast("Task removed.", "delete");

    setTimeout(() => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setDeletingId(null);
    }, 300); // Wait for fade-out animation to complete
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      setTodos([]);
      addToast("All tasks cleared", "delete");
      if (soundEnabled) playSynthSound("delete");
    }
  };

  // Toast Helper
  const addToast = (message: string, type: Toast["type"]) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // --- Filters, Searches, and Sorts ---
  const filteredTodos = todos
    .filter((todo) => {
      // 1. Filter by Query
      if (searchQuery.trim() !== "") {
        return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .filter((todo) => {
      // 2. Filter by Tab
      if (filterTab === "active") return !todo.completed;
      if (filterTab === "completed") return todo.completed;
      return true;
    })
    .sort((a, b) => {
      // 3. Sort logic
      if (sortBy === "priority") {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      // default 'date' (newest first)
      return b.createdAt - a.createdAt;
    });

  // --- Statistics ---
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Is Overdue Helper
  const isOverdue = (todo: Todo) => {
    if (todo.completed || !todo.dueDate) return false;
    const today = new Date().toISOString().split("T")[0];
    return todo.dueDate < today;
  };

  // Category Theme Colors Helper
  const getCategoryStyles = (cat: Todo["category"]) => {
    switch (cat) {
      case "work":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "personal":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "shopping":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "ideas":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/10 blur-[120px] pointer-events-none" />

      {/* Celebration Confetti Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50 w-full h-full" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 w-full z-10 flex-grow flex flex-col">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 border-b border-slate-800/60 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                AeroTask
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                Elevate your focus, master your day.
              </p>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
                soundEnabled
                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm shadow-indigo-500/5 hover:bg-indigo-500/20"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
              }`}
              title={soundEnabled ? "Mute Sounds" : "Unmute Sounds"}
            >
              {soundEnabled ? <VolumeIcon /> : <VolumeMuteIcon />}
              <span className="hidden sm:inline">{soundEnabled ? "Sound On" : "Muted"}</span>
            </button>

            {totalCount > 0 && (
              <button
                onClick={handleClearAll}
                className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all duration-200"
              >
                Clear All
              </button>
            )}
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-grow">
          
          {/* Left Column: Form & Analytics (Grid 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Analytics Card */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Task Performance
              </h2>
              
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                    {completionRate}%
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Completion rate achieved</p>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs text-slate-400 font-medium">Completed / Total</span>
                  <span className="text-xl font-bold text-slate-200">
                    {completedCount} <span className="text-slate-500">/</span> {totalCount}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-6 relative">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionRate}%` }}
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/50">
                  <span className="text-xs text-slate-400 block mb-1">Active Tasks</span>
                  <span className="text-lg font-bold text-slate-200">{pendingCount}</span>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/50">
                  <span className="text-xs text-slate-400 block mb-1">Total Created</span>
                  <span className="text-lg font-bold text-slate-200">{totalCount}</span>
                </div>
              </div>
            </div>

            {/* Create Task Card */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6">
              <h2 className="text-lg font-bold text-slate-100 mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                Create New Task
              </h2>

              <form onSubmit={handleAdd} className="flex flex-col gap-5">
                {/* Text input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="todo-text" className="text-xs font-semibold text-slate-400">
                    What needs to be done?
                  </label>
                  <input
                    id="todo-text"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g. Design app flow interfaces..."
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Priority Selection */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400">Set Priority</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(["low", "medium", "high"] as Todo["priority"][]).map((p) => {
                      const isActive = priority === p;
                      let colorClasses = "";
                      if (p === "low") {
                        colorClasses = isActive
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                          : "border-slate-800 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400";
                      } else if (p === "medium") {
                        colorClasses = isActive
                          ? "bg-amber-500/20 text-amber-400 border-amber-500"
                          : "border-slate-800 text-slate-400 hover:border-amber-500/30 hover:text-amber-400";
                      } else {
                        colorClasses = isActive
                          ? "bg-rose-500/20 text-rose-400 border-rose-500"
                          : "border-slate-800 text-slate-400 hover:border-rose-500/30 hover:text-rose-400";
                      }

                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all duration-200 ${colorClasses}`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Category Selection */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400">Select Tag/Category</span>
                  <div className="flex flex-wrap gap-2">
                    {(["work", "personal", "shopping", "ideas", "other"] as Todo["category"][]).map((cat) => {
                      const isActive = category === cat;
                      let borderStyle = "";
                      if (cat === "work") borderStyle = "hover:text-indigo-400 active:text-indigo-400";
                      if (cat === "personal") borderStyle = "hover:text-sky-400 active:text-sky-400";
                      if (cat === "shopping") borderStyle = "hover:text-emerald-400 active:text-emerald-400";
                      if (cat === "ideas") borderStyle = "hover:text-amber-400 active:text-amber-400";
                      if (cat === "other") borderStyle = "hover:text-slate-300 active:text-slate-300";

                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium capitalize transition-all duration-200 ${
                            isActive
                              ? cat === "work"
                                ? "bg-indigo-500/20 text-indigo-400 border-indigo-500"
                                : cat === "personal"
                                ? "bg-sky-500/20 text-sky-400 border-sky-500"
                                : cat === "shopping"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                                : cat === "ideas"
                                ? "bg-amber-500/20 text-amber-400 border-amber-500"
                                : "bg-slate-400/20 text-slate-300 border-slate-400"
                              : `bg-slate-950/40 border-slate-800 text-slate-400 ${borderStyle}`
                          }`}
                        >
                          <CategoryIcon cat={cat} />
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Due Date picker */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="due-date" className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <CalendarIcon /> Optional Due Date
                  </label>
                  <input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 [color-scheme:dark]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 text-sm"
                >
                  <PlusIcon /> Add Task
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Filters and Task List (Grid 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Toolbar: Search, Tabs, Sorting */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-md p-4 flex flex-col gap-4">
              
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search tasks by description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-200 text-sm"
                />
              </div>

              {/* Filters & Sorting Split */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Custom Tab Segmented Control */}
                <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800/80 w-full sm:w-auto">
                  {(["all", "active", "completed"] as const).map((tab) => {
                    const isActive = filterTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setFilterTab(tab)}
                        className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-200 ${
                          isActive
                            ? "bg-slate-800 text-white shadow-sm"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* Sort Option */}
                <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
                  <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Sort by</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all duration-200"
                  >
                    <option value="date">Date Created</option>
                    <option value="priority">Priority</option>
                    <option value="dueDate">Due Date</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="flex flex-col gap-3 min-h-[300px]">
              {filteredTodos.length === 0 ? (
                // Beautiful interactive empty state
                <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-800/80 rounded-2xl bg-slate-900/10 min-h-[350px] animate-fade-in">
                  <div className="relative w-20 h-20 mb-6 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-800">
                    <svg className="w-10 h-10 text-indigo-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200">
                    {searchQuery.trim() !== ""
                      ? "No matching results found"
                      : filterTab === "completed"
                      ? "No completed tasks yet"
                      : filterTab === "active"
                      ? "All caught up! Zero active tasks."
                      : "No tasks recorded yet"}
                  </h3>
                  <p className="text-sm text-slate-400 max-w-sm mt-2 font-medium">
                    {searchQuery.trim() !== ""
                      ? "Try tweaking your filters or adjusting your keywords."
                      : filterTab === "completed"
                      ? "Complete some of your active tasks and watch them stack up here."
                      : filterTab === "active"
                      ? "Take some rest or sketch out your next grand idea."
                      : "Create your first task using the card panel on the left to begin your journey."}
                  </p>
                  {searchQuery.trim() !== "" && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-5 px-4.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-all duration-200"
                    >
                      Clear Search Bar
                    </button>
                  )}
                </div>
              ) : (
                filteredTodos.map((todo) => {
                  const isPendingDelete = deletingId === todo.id;
                  const isNewlyAdded = newlyAddedId === todo.id;
                  const overdue = isOverdue(todo);

                  return (
                    <div
                      key={todo.id}
                      className={`relative flex items-center justify-between gap-4 p-4.5 rounded-2xl border transition-all duration-300 ease-out ${
                        isPendingDelete
                          ? "opacity-0 translate-x-12 scale-95 pointer-events-none duration-300"
                          : isNewlyAdded
                          ? "animate-scale-up-bounce border-indigo-500/30 bg-indigo-500/[0.03]"
                          : "border-slate-800 bg-slate-900/20 hover:bg-slate-900/50 hover:border-slate-700/60"
                      } ${todo.completed ? "border-slate-900/60 bg-slate-950/20" : ""}`}
                    >
                      {/* Left Block: Checkbox, Text, Meta */}
                      <div className="flex items-start gap-4 flex-grow min-w-0">
                        {/* Custom Interactive Checkbox */}
                        <button
                          onClick={() => handleToggleComplete(todo.id)}
                          className={`mt-1.5 flex-shrink-0 w-5.5 h-5.5 rounded-lg border transition-all duration-200 flex items-center justify-center ${
                            todo.completed
                              ? "bg-gradient-to-tr from-indigo-500 to-fuchsia-500 border-transparent text-white scale-100 shadow-sm shadow-indigo-500/10 hover:brightness-110"
                              : "border-slate-600 bg-slate-950 text-transparent hover:border-indigo-400"
                          }`}
                          title={todo.completed ? "Mark Incomplete" : "Mark Complete"}
                        >
                          <CheckIcon />
                        </button>

                        {/* Text & Meta info */}
                        <div className="flex flex-col gap-1.5 min-w-0 flex-grow">
                          <p
                            className={`text-sm md:text-base font-medium break-words leading-relaxed transition-all duration-300 ${
                              todo.completed
                                ? "text-slate-500 line-through decoration-indigo-500/50 decoration-2"
                                : "text-slate-200"
                            }`}
                          >
                            {todo.text}
                          </p>

                          {/* Metadata row */}
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
                            {/* Category Badge */}
                            <span
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getCategoryStyles(
                                todo.category
                              )}`}
                            >
                              <CategoryIcon cat={todo.category} />
                              {todo.category}
                            </span>

                            {/* Priority Badge */}
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                                todo.priority === "high"
                                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                  : todo.priority === "medium"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              }`}
                            >
                              {todo.priority}
                            </span>

                            {/* Due Date Indicator */}
                            {todo.dueDate && (
                              <span
                                className={`flex items-center gap-1 font-semibold ${
                                  overdue
                                    ? "text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 animate-pulse"
                                    : "text-slate-400"
                                }`}
                                title={overdue ? "Overdue Task!" : "Due Date"}
                              >
                                <CalendarIcon />
                                <span>
                                  {overdue ? "Overdue: " : ""}
                                  {new Date(todo.dueDate).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    timeZone: "UTC",
                                  })}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Block: Actions */}
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 flex-shrink-0"
                        title="Delete Task"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notifications Container */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50 pointer-events-none max-w-sm w-full px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-xl text-slate-100 animate-slide-in-right max-w-full"
          >
            <div
              className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                toast.type === "add"
                  ? "bg-indigo-400"
                  : toast.type === "complete"
                  ? "bg-emerald-400"
                  : toast.type === "delete"
                  ? "bg-red-400"
                  : toast.type === "success"
                  ? "bg-fuchsia-400"
                  : "bg-sky-400"
              }`}
            />
            <p className="text-xs md:text-sm font-semibold leading-none">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Modern, Beautiful Footer */}
      <footer className="w-full border-t border-slate-900 py-6 text-center text-slate-500 text-xs font-semibold z-10">
        <p>© {new Date().getFullYear()} AeroTask Dashboard • Synthesized Audio Enabled</p>
      </footer>
    </div>
  );
}
