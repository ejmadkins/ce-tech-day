"use client";

import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="min-h-screen bg-amber-50/50">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-xs font-medium text-amber-800">
              Task Manager
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            What&apos;s on your plate?
          </h1>
          <p className="mt-2 text-stone-500">
            Stay organized, one task at a time
          </p>
        </header>

        <div className="space-y-8">
          <AddTodo onAdd={addTodo} />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </main>
    </div>
  );
}
