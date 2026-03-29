"use client";

import { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      className="group flex items-center gap-4 rounded-xl border border-stone-200 bg-white
                 px-5 py-4 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2
                    transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-100
                    ${
                      todo.completed
                        ? "border-amber-500 bg-amber-500"
                        : "border-stone-300 hover:border-amber-400"
                    }`}
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
      >
        {todo.completed && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      <span
        className={`flex-1 text-base transition-colors duration-150 ${
          todo.completed ? "text-stone-400 line-through" : "text-stone-900"
        }`}
      >
        {todo.title}
      </span>

      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
          todo.completed
            ? "bg-green-50 text-green-700"
            : "bg-amber-100 text-amber-800"
        }`}
      >
        {todo.completed ? "Done" : "Pending"}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-stone-400
                   opacity-0 group-hover:opacity-100
                   hover:bg-red-50 hover:text-red-600
                   focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                   transition-all duration-150"
        aria-label={`Delete "${todo.title}"`}
      >
        Delete
      </button>
    </li>
  );
}
