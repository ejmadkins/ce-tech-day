import { describe, expect, test, beforeEach } from "bun:test";
import { renderHook, act } from "@testing-library/react";
import { useTodos } from "./useTodos";

// Mock localStorage for the test runner environment
class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

// Assign mock to global
if (typeof global !== "undefined" && !global.localStorage) {
  Object.defineProperty(global, "localStorage", {
    value: new LocalStorageMock(),
    writable: true,
  });
}

describe("useTodos hook", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test("should initialize with an empty array", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.completedCount).toBe(0);
    expect(result.current.completionPercentage).toBe(0);
  });

  test("should add a todo item", () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo("Buy groceries");
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].text).toBe("Buy groceries");
    expect(result.current.todos[0].completed).toBe(false);
    expect(result.current.totalCount).toBe(1);
    expect(result.current.completedCount).toBe(0);
  });

  test("should toggle a todo item completed status", () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo("Wash the car");
    });

    const id = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].completed).toBe(true);
    expect(result.current.completedCount).toBe(1);
    expect(result.current.completionPercentage).toBe(100);

    act(() => {
      result.current.toggleTodo(id);
    });

    expect(result.current.todos[0].completed).toBe(false);
    expect(result.current.completedCount).toBe(0);
    expect(result.current.completionPercentage).toBe(0);
  });

  test("should delete a todo item", () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo("Task to delete");
    });

    const id = result.current.todos[0].id;

    act(() => {
      result.current.deleteTodo(id);
    });

    expect(result.current.todos).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  test("should clear completed todos", () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo("Task 1");
      result.current.addTodo("Task 2");
    });

    // Task 2 is at index 0, Task 1 is at index 1 because we prepend new todos
    const id1 = result.current.todos[1].id; 

    act(() => {
      result.current.toggleTodo(id1);
    });

    expect(result.current.completedCount).toBe(1);

    act(() => {
      result.current.clearCompleted();
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].text).toBe("Task 2");
  });

  test("should handle priority, categorization, and due dates", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Urgent server fix", "high", "Work", "2026-12-31");
    });

    const added = result.current.todos[0];
    expect(added.text).toBe("Urgent server fix");
    expect(added.priority).toBe("high");
    expect(added.category).toBe("Work");
    expect(added.dueDate).toBe("2026-12-31");
  });

  test("should filter and sort todos dynamically", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Bake cake", "low", "Personal");
      result.current.addTodo("Submit report", "high", "Work");
      result.current.addTodo("Buy fruits", "medium", "Shopping");
    });

    expect(result.current.todos.length).toBe(3);
    expect(result.current.filteredTodos.length).toBe(3);

    // Test priority sorting (high weight = 3, medium = 2, low = 1)
    act(() => {
      result.current.setSortBy("priority-desc");
    });
    expect(result.current.filteredTodos[0].text).toBe("Submit report"); // High
    expect(result.current.filteredTodos[1].text).toBe("Buy fruits");    // Medium
    expect(result.current.filteredTodos[2].text).toBe("Bake cake");     // Low

    // Test category filter
    act(() => {
      result.current.setActiveCategory("Work");
    });
    expect(result.current.filteredTodos.length).toBe(1);
    expect(result.current.filteredTodos[0].text).toBe("Submit report");

    // Test text search
    act(() => {
      result.current.setActiveCategory(null);
      result.current.setSearchQuery("Buy");
    });
    expect(result.current.filteredTodos.length).toBe(1);
    expect(result.current.filteredTodos[0].text).toBe("Buy fruits");
  });

  test("should support custom category color updates", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.categoryColors.Work).toBe("#D97706"); // Initial default color

    act(() => {
      result.current.updateCategoryColor("Work", "#FF0000");
    });

    expect(result.current.categoryColors.Work).toBe("#FF0000");
  });

  test("should reschedule a recurring task daily", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Daily workout", "medium", "Health", "2026-06-10", "daily");
    });

    expect(result.current.todos.length).toBe(1);
    const id = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(id);
    });

    // Toggle completes the old one AND spawns a new one for tomorrow!
    expect(result.current.todos.length).toBe(2);
    const pendingWorkout = result.current.todos.find(t => !t.completed);
    expect(pendingWorkout).toBeDefined();
    expect(pendingWorkout?.text).toBe("Daily workout");
    expect(pendingWorkout?.dueDate).toBe("2026-06-11");
    expect(pendingWorkout?.recurrence).toBe("daily");
  });

  test("should allow manual reordering of todos", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Task A");
      result.current.addTodo("Task B");
    });

    // Task B is at index 0, Task A is at index 1 due to prepending
    const idB = result.current.todos[0].id;
    const idA = result.current.todos[1].id;

    act(() => {
      result.current.reorderTodos(idB, idA);
    });

    expect(result.current.todos[0].id).toBe(idA);
    expect(result.current.todos[1].id).toBe(idB);
  });
});
