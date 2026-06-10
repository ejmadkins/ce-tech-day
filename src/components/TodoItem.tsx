"use client";

import React from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // Check if task is overdue
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
      return { text: `Due ${formattedDate}`, isOverdue: false };
    }

    if (due < today) {
      return { text: `Overdue (${formattedDate})`, isOverdue: true };
    }

    if (due.getTime() === today.getTime()) {
      return { text: "Due Today", isOverdue: false, isToday: true };
    }

    return { text: `Due ${formattedDate}`, isOverdue: false };
  };

  const dueStatus = getDueDateStatus();

  // Priority color map
  const priorityStyles = {
    low: "bg-neutral-100 text-neutral-600 border border-neutral-200",
    medium: "bg-amber-50 text-amber-700 border border-amber-200",
    high: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <li className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease gap-3">
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
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
          <div className="w-5 h-5 border-2 border-neutral-300 rounded peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-100 transition-all duration-150 ease-out flex items-center justify-center peer-checked:animate-checkbox-pop">
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
          <span className={`text-base font-medium break-all select-none transition-all duration-200 ${
            todo.completed ? "text-neutral-400 line-through decoration-neutral-300" : "text-neutral-900"
          }`}>
            {todo.text}
          </span>
          
          {/* Category & Due Date Row */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Category Tag */}
            <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 uppercase tracking-wide">
              {todo.category}
            </span>

            {/* Priority Tag */}
            <span className={`text-[0.68rem] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${priorityStyles[todo.priority]}`}>
              {todo.priority}
            </span>

            {/* Due Date Indicator */}
            {dueStatus && (
              <span className={`text-xs ${
                dueStatus.isOverdue
                  ? "text-danger font-bold animate-pulse"
                  : dueStatus.isToday && !todo.completed
                  ? "text-amber-600 font-bold"
                  : "text-neutral-500 font-medium"
              }`}>
                • {dueStatus.text}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto border-t sm:border-t-0 border-neutral-100 pt-3 sm:pt-0 pl-1 sm:pl-0">
        {/* Status Badge */}
        {todo.completed ? (
          <span className="text-[0.75rem] font-medium px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] transition duration-150">
            Completed
          </span>
        ) : (
          <span className="text-[0.75rem] font-medium px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] transition duration-150">
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
            strokeWidth={2}
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
