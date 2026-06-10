"use client";

import React from "react";
import { TaskHeader } from "@/components/TaskHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const {
    todos,
    isHydrated,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    totalCount,
    completedCount,
    completionPercentage,
  } = useTodos();

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-primary-200">
      <div className="w-full max-w-xl flex flex-col gap-6">
        {/* Main Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 ease">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <TaskHeader />

            {/* Input field */}
            <TodoInput onAddTodo={addTodo} />

            {/* Progress bar */}
            {isHydrated && totalCount > 0 && (
              <ProgressBar
                completedCount={completedCount}
                totalCount={totalCount}
                percentage={completionPercentage}
              />
            )}

            {/* Todo List */}
            {isHydrated ? (
              <div className="flex flex-col gap-4">
                <TodoList
                  todos={todos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />

                {/* Clear completed button / Footer stats */}
                {totalCount > 0 && (
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-sm text-neutral-500">
                    <span>
                      {completedCount} of {totalCount} completed
                    </span>
                    {completedCount > 0 && (
                      <button
                        onClick={clearCompleted}
                        className="text-primary-600 hover:text-primary-700 font-medium transition duration-150 ease focus:outline-none focus:underline cursor-pointer"
                      >
                        Clear completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // Loading state during client hydration
              <div className="flex flex-col gap-3 py-12 items-center justify-center text-neutral-400">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent" />
                <p className="text-sm">Loading your tasks...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
