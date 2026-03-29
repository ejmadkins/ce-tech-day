"use client";

import { Todo } from "@/types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <section
        className="flex flex-col items-center justify-center rounded-xl border border-dashed
                   border-stone-300 py-16 text-stone-400"
        aria-label="Empty todo list"
      >
        <svg
          className="mb-4 h-12 w-12 text-stone-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-lg font-medium text-stone-500">No tasks yet</p>
        <p className="mt-1 text-sm">Add your first task above to get started</p>
      </section>
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;
  const progressPercent =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <section aria-label="Todo list">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-stone-600">
          {completedCount} of {todos.length} completed
        </span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-medium text-stone-500">
            {progressPercent}%
          </span>
        </div>
      </div>
      <ul className="space-y-2" role="list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
