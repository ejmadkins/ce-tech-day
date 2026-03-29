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
        className="flex flex-col items-center justify-center py-12 text-gray-400"
        aria-label="Empty todo list"
      >
        <p className="text-lg">No todos yet</p>
        <p className="text-sm">Add one above to get started</p>
      </section>
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <section aria-label="Todo list">
      <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
        <span>
          {completedCount} of {todos.length} completed
        </span>
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
