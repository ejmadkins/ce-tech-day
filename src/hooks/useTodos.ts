import { useState, useEffect } from "react";
import { Todo, Priority } from "../types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activePriority, setActivePriority] = useState<Priority | null>(null);
  const [sortBy, setSortBy] = useState<string>("date-desc");

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
            createdAt: todo.createdAt || Date.now(),
          }));
          setTodos(migrated);
        }
      } catch (e) {
        console.error("Failed to parse saved todos", e);
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

  const addTodo = (
    text: string,
    priority: Priority = "low",
    category: string = "General",
    dueDate?: string
  ) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 9),
      text: trimmed,
      completed: false,
      priority,
      category: category.trim() || "General",
      dueDate: dueDate || undefined,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Dynamic Categories list derived from current tasks + static defaults
  const defaultCategories = ["General", "Work", "Personal", "Health", "Shopping"];
  const categories = Array.from(
    new Set([...defaultCategories, ...todos.map((t) => t.category)])
  );

  // Computed Filtered & Sorted list
  const filteredTodos = todos
    .filter((todo) => {
      const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !activeCategory || todo.category === activeCategory;
      const matchesPriority = !activePriority || todo.priority === activePriority;
      return matchesSearch && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
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
  };
}
