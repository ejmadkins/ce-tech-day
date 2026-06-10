"use client";

import React, { useState, useRef } from "react";
import { Priority, Recurrence } from "../types";

interface TodoInputProps {
  onAddTodo: (
    text: string,
    priority: Priority,
    category: string,
    dueDate?: string,
    recurrence?: Recurrence
  ) => void;
  categoryColors?: Record<string, string>;
  onUpdateCategoryColor?: (category: string, color: string) => void;
}

export function TodoInput({ onAddTodo, categoryColors = {}, onUpdateCategoryColor = () => {} }: TodoInputProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [recurrence, setRecurrence] = useState<Recurrence>("none");
  const inputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const activeCategoryName = category.trim() || "General";
  const currentCategoryColor = categoryColors[activeCategoryName] || "#78716C";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTodo(
      trimmed,
      priority,
      activeCategoryName,
      dueDate || undefined,
      recurrence
    );
    
    // Reset inputs
    setText("");
    setPriority("low");
    setCategory("");
    setDueDate("");
    setRecurrence("none");

    // Manage focus
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateCategoryColor(activeCategoryName, e.target.value);
  };

  const isFormActive = text.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full bg-stone-50/50 border border-neutral-200 rounded-2xl p-5 transition-all duration-300">
      {/* Primary Input Area */}
      <div className="flex gap-3 w-full">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-white border border-neutral-300 text-neutral-900 rounded-xl px-4 py-2.5 text-base placeholder-neutral-400 focus:outline-none focus:border-primary-500 custom-input-focus transition duration-150 ease"
          aria-label="New task description"
        />
        
        {/* Submit button on desktop */}
        <button
          type="submit"
          disabled={!text.trim()}
          className="hidden sm:flex bg-primary-500 hover:bg-primary-600 active:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl px-5 py-2.5 text-sm tracking-wide transition duration-150 ease items-center gap-1.5 custom-button-primary-focus focus:outline-none cursor-pointer"
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
      </div>

      {/* Expandable Options Panel */}
      <div className={`flex flex-col gap-4 border-t border-dashed border-neutral-200 pt-3.5 transition-all duration-300 ${
        isFormActive ? "opacity-100" : "opacity-80"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Priority Toggles */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
              Priority:
            </span>
            <div className="flex items-center gap-1">
              {(["low", "medium", "high"] as const).map((pri) => {
                const isActive = priority === pri;
                const priColors = {
                  low: isActive ? "bg-stone-600 text-white shadow-sm" : "bg-white border border-neutral-350 text-stone-600 hover:bg-neutral-100",
                  medium: isActive ? "bg-amber-500 text-white shadow-sm" : "bg-white border border-neutral-350 text-amber-700 hover:bg-neutral-100",
                  high: isActive ? "bg-red-500 text-white shadow-sm" : "bg-white border border-neutral-350 text-red-600 hover:bg-neutral-100",
                };
                return (
                  <button
                    type="button"
                    key={pri}
                    onClick={() => setPriority(pri)}
                    className={`text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded transition-all duration-150 cursor-pointer ${priColors[pri]}`}
                  >
                    {pri}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Input & Picker */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
              Category:
            </span>
            <div className="flex items-center gap-2 relative">
              {/* Color Picker Bubble */}
              <button
                type="button"
                onClick={() => colorInputRef.current?.click()}
                className="w-5 h-5 rounded-full border border-neutral-300 shadow-sm transition hover:scale-110 cursor-pointer flex-shrink-0"
                style={{ backgroundColor: currentCategoryColor }}
                title="Change category color"
                aria-label="Change category color"
              />
              <input
                ref={colorInputRef}
                type="color"
                value={currentCategoryColor}
                onChange={handleColorChange}
                className="sr-only"
              />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Work, Shopping"
                className="bg-white border border-neutral-300 text-neutral-900 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary-500 transition w-full sm:w-36"
                aria-label="Task category"
              />
            </div>
          </div>
        </div>

        {/* Second Row: Due Date & Recurrence */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Date Picker */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
                Due:
              </span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-white border border-neutral-300 text-neutral-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary-500 transition w-full sm:w-36 cursor-pointer"
                aria-label="Due date"
              />
            </div>

            {/* Recurrence Dropdown */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
                Repeat:
              </span>
              <select
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value as Recurrence)}
                className="bg-white border border-neutral-300 text-neutral-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-primary-500 transition w-full sm:w-32 cursor-pointer font-medium"
                aria-label="Task recurrence"
              >
                <option value="none">Does not repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Submit button on mobile */}
          <button
            type="submit"
            disabled={!text.trim()}
            className="sm:hidden bg-primary-500 hover:bg-primary-600 active:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl px-4 py-2 text-sm tracking-wide transition duration-150 ease flex items-center justify-center gap-1.5 custom-button-primary-focus focus:outline-none cursor-pointer"
            aria-label="Add"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
