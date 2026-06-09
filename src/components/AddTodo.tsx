"use client";

import { useState, useRef } from "react";

interface AddTodoProps {
  onAdd: (title: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <label htmlFor="new-todo" className="sr-only">
        New todo
      </label>
      <input
        ref={inputRef}
        id="new-todo"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-3 text-base
                   text-stone-900 placeholder:text-stone-400
                   focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100
                   transition-all duration-150"
        aria-label="Add a new todo"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white
                   hover:bg-amber-600 active:bg-amber-700
                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-150"
      >
        Add Task
      </button>
    </form>
  );
}
