"use client";

import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
        <p className="mt-2 text-gray-500">Keep track of your tasks</p>
      </header>

      <div className="space-y-6">
        <AddTodo onAdd={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </main>
  );
}
