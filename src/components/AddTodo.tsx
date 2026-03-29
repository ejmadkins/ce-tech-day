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
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-base
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                   transition-colors"
        aria-label="Add a new todo"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Add
      </button>
    </form>
  );
}
