"use client";

import React from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  categoryColors?: Record<string, string>;
  sortBy?: string;
  onDragStart?: (e: React.DragEvent, id: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, id: string) => void;
  onDragEnd?: () => void;
}

// Helper to determine contrasting text color (black vs white)
function getContrastColor(hexColor: string) {
  const hex = hexColor.replace("#", "");
  if (hex.length !== 6) return "#1C1917";
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#1C1917" : "#FFFFFF";
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  categoryColors = {},
  sortBy = "date-desc",
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TodoItemProps) {
  // Check if task is overdue/due soon
  const getDueDateStatus = () => {
    if (!todo.dueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(todo.dueDate);
    due.setHours(0, 0, 0, 0);

    const formattedDate = due.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC"
    });

    if (todo.completed) {
      return { text: `Due ${formattedDate}`, isOverdue: false, isDueSoon: false };
    }

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (due < today) {
      return { text: `Overdue (${formattedDate})`, isOverdue: true, isDueSoon: false };
    }

    if (due.getTime() === today.getTime()) {
      return { text: "Due Today", isOverdue: false, isToday: true, isDueSoon: true };
    }

    if (diffDays > 0 && diffDays <= 2) {
      return { text: `Due in ${diffDays}d (${formattedDate})`, isOverdue: false, isDueSoon: true };
    }

    return { text: `Due ${formattedDate}`, isOverdue: false, isDueSoon: false };
  };

  const dueStatus = getDueDateStatus();
  const catColor = categoryColors[todo.category] || "#78716C";
  const catTextColor = getContrastColor(catColor);

  // Priority color map
  const priorityStyles = {
    low: "bg-stone-100 text-stone-600 border border-stone-200",
    medium: "bg-amber-50 text-amber-700 border border-amber-250",
    high: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <li
      draggable={sortBy === "manual"}
      onDragStart={(e) => onDragStart?.(e, todo.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop?.(e, todo.id)}
      onDragEnd={onDragEnd}
      className={`group flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ease gap-3 ${
        sortBy === "manual" ? "cursor-default" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Drag Handle Grip */}
        {sortBy === "manual" && (
          <div className="cursor-grab active:cursor-grabbing text-neutral-300 hover:text-neutral-500 p-1 flex-shrink-0 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 6a1 1 0 100-2 1 1 0 000 2zM7 11a1 1 0 100-2 1 1 0 000 2zM7 16a1 1 0 100-2 1 1 0 000 2zM13 6a1 1 0 100-2 1 1 0 000 2zM13 11a1 1 0 100-2 1 1 0 000 2zM13 16a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
          </div>
        )}

        {/* Custom checkbox */}
        <label className="relative flex items-center justify-center cursor-pointer select-none flex-shrink-0">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="sr-only peer"
            aria-label={`Mark "${todo.text}" as ${todo.completed ? "pending" : "complete"}`}
          />
          {/* Custom box styled according to checkpoint spec */}
          <div className="w-5 h-5 border-2 border-neutral-300 rounded-lg peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-100 transition-all duration-150 ease-out flex items-center justify-center peer-checked:animate-checkbox-pop">
            <svg
              className="w-3.5 h-3.5 text-white stroke-current stroke-[3] fill-none opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </label>
        
        {/* Text and Badges */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <span className={`text-base font-bold break-all select-none transition-all duration-200 ${
            todo.completed ? "text-neutral-400 line-through decoration-neutral-300" : "text-neutral-900"
          }`}>
            {todo.text}
          </span>
          
          {/* Category & Due Date Row */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Category Tag with Custom Color & Calculated Text Contrast */}
            <span
              className="text-[0.65rem] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm transition border border-white/10"
              style={{ backgroundColor: catColor, color: catTextColor }}
            >
              {todo.category}
            </span>

            {/* Priority Tag */}
            <span className={`text-[0.65rem] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${priorityStyles[todo.priority]}`}>
              {todo.priority}
            </span>

            {/* Recurrence Repeat Tag */}
            {todo.recurrence && todo.recurrence !== "none" && (
              <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15h-1.562" />
                </svg>
                {todo.recurrence}
              </span>
            )}

            {/* Due Date Indicator with Due Soon warnings */}
            {dueStatus && (
              <span className={`text-xs flex items-center gap-1 ${
                dueStatus.isOverdue
                  ? "text-danger font-extrabold animate-pulse"
                  : dueStatus.isDueSoon && !todo.completed
                  ? "text-amber-500 font-extrabold"
                  : "text-neutral-500 font-medium"
              }`}>
                • {dueStatus.text}
                {dueStatus.isDueSoon && !todo.completed && (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Status Badge */}
        {todo.completed ? (
          <span className="text-[0.7rem] font-extrabold px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#166534] transition duration-150 border border-green-250 uppercase tracking-wide">
            Completed
          </span>
        ) : (
          <span className="text-[0.7rem] font-extrabold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] transition duration-150 border border-amber-250 uppercase tracking-wide">
            Pending
          </span>
        )}

        {/* Delete Button - variant: danger style */}
        <button
          onClick={() => onDelete(todo.id)}
          className="opacity-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none p-1.5 text-neutral-400 hover:text-danger hover:bg-neutral-100 rounded-lg transition-all duration-150 ease cursor-pointer"
          aria-label={`Delete task "${todo.text}"`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
  );
}
