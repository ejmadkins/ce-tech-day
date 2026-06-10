"use client";

import React, { useState, useRef } from "react";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddTodo(trimmed);
    setText("");
    
    // Manage focus: return focus to input after adding a todo
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full bg-white border border-neutral-300 text-neutral-900 rounded-lg px-4 py-2.5 text-base placeholder-neutral-400 focus:outline-none focus:border-primary-500 custom-input-focus transition duration-150 ease"
          aria-label="New task description"
        />
      </div>
      <button
        type="submit"
        disabled={!text.trim()}
        className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-5 py-2.5 text-sm tracking-wide transition duration-150 ease flex items-center gap-1.5 custom-button-primary-focus focus:outline-none"
        aria-label="Add task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Task
      </button>
    </form>
  );
}
