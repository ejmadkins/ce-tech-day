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
});
