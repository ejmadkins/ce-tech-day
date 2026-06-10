import { useState, useEffect } from "react";
import { Todo, Priority, Recurrence } from "../types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activePriority, setActivePriority] = useState<Priority | null>(null);
  const [sortBy, setSortBy] = useState<string>("manual"); // Default to manual/drag-and-drop for premium feel!

  // Category Colors State
  const [categoryColors, setCategoryColors] = useState<Record<string, string>>({
    General: "#78716C",
    Work: "#D97706",
    Personal: "#2563EB",
    Health: "#10B981",
    Fitness: "#06B6D4",
    Shopping: "#DB2777",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ce-tech-day-todos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const migrated = parsed.map((todo: any) => ({
            id: todo.id,
            text: todo.text,
            completed: !!todo.completed,
            priority: todo.priority || "low",
            category: todo.category || "General",
            dueDate: todo.dueDate || undefined,
            recurrence: todo.recurrence || "none",
            createdAt: todo.createdAt || Date.now(),
          }));
          setTodos(migrated);
        }
      } catch (e) {
        console.error("Failed to parse saved todos", e);
      }
    }

    const savedColors = localStorage.getItem("ce-tech-day-category-colors");
    if (savedColors) {
      try {
        setCategoryColors(JSON.parse(savedColors));
      } catch (e) {
        console.error("Failed to parse category colors", e);
      }
    }

    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever todos change, but only after hydration
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("ce-tech-day-todos", JSON.stringify(todos));
    }
  }, [todos, isHydrated]);

  const updateCategoryColor = (category: string, color: string) => {
    setCategoryColors((prev) => {
      const next = { ...prev, [category]: color };
      localStorage.setItem("ce-tech-day-category-colors", JSON.stringify(next));
      return next;
    });
  };

  const addTodo = (
    text: string,
    priority: Priority = "low",
    category: string = "General",
    dueDate?: string,
    recurrence: Recurrence = "none"
  ) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    
    // Ensure default color for new category if not already defined
    const catName = category.trim() || "General";
    if (!categoryColors[catName]) {
      // Pick a semi-random elegant color if none exists
      const colors = ["#8B5CF6", "#EC4899", "#3B82F6", "#14B8A6", "#F59E0B"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      updateCategoryColor(catName, randomColor);
    }

    const newTodo: Todo = {
      id: typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 9),
      text: trimmed,
      completed: false,
      priority,
      category: catName,
      dueDate: dueDate || undefined,
      recurrence,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const nextCompleted = !todo.completed;

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t))
    );

    // If a recurring task is completed, schedule the next occurrence
    if (nextCompleted && todo.recurrence && todo.recurrence !== "none") {
      const baseline = todo.dueDate ? new Date(todo.dueDate) : new Date();
      
      // Prevent "Invalid Date" errors
      const safeBaseline = isNaN(baseline.getTime()) ? new Date() : baseline;
      const nextDue = new Date(safeBaseline);

      if (todo.recurrence === "daily") {
        nextDue.setDate(nextDue.getDate() + 1);
      } else if (todo.recurrence === "weekly") {
        nextDue.setDate(nextDue.getDate() + 7);
      } else if (todo.recurrence === "monthly") {
        nextDue.setMonth(nextDue.getMonth() + 1);
      }

      const formattedNextDue = nextDue.toISOString().split("T")[0];
      addTodo(
        todo.text,
        todo.priority,
        todo.category,
        formattedNextDue,
        todo.recurrence
      );
    }
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const reorderTodos = (activeId: string, overId: string) => {
    setTodos((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === activeId);
      const newIndex = prev.findIndex((t) => t.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const result = Array.from(prev);
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      return result;
    });
  };

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Dynamic Categories list derived from current tasks + static defaults
  const defaultCategories = ["General", "Work", "Personal", "Health", "Fitness", "Shopping"];
  const categories = Array.from(
    new Set([...defaultCategories, ...todos.map((t) => t.category)])
  );

  // Computed Filtered & Sorted list
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || todo.category === activeCategory;
    const matchesPriority = !activePriority || todo.priority === activePriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  if (sortBy !== "manual") {
    filteredTodos.sort((a, b) => {
      if (sortBy === "date-desc") {
        return b.createdAt - a.createdAt;
      }
      if (sortBy === "date-asc") {
        return a.createdAt - b.createdAt;
      }
      if (sortBy === "priority-desc") {
        const priorityWeights = { high: 3, medium: 2, low: 1 };
        return priorityWeights[b.priority] - priorityWeights[a.priority];
      }
      if (sortBy === "dueDate-asc") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
    });
  }

  return {
    todos,
    filteredTodos,
    isHydrated,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    totalCount,
    completedCount,
    completionPercentage,
    categories,
    activeCategory,
    setActiveCategory,
    activePriority,
    setActivePriority,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    categoryColors,
    updateCategoryColor,
    reorderTodos,
  };
}
