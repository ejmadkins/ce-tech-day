"use client";

import React from "react";
import { TaskHeader } from "@/components/TaskHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { FilterBar } from "@/components/FilterBar";
import { DashboardStats } from "@/components/DashboardStats";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const {
    todos,
    filteredTodos,
    isHydrated,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    totalCount,
    completedCount,
    completionPercentage,
    categories,
    activeCategory,
    setActiveCategory,
    activePriority,
    setActivePriority,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    categoryColors,
    updateCategoryColor,
    reorderTodos,
  } = useTodos();

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 selection:bg-primary-200">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        
        {/* Main Content Dashboard Container */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 ease flex flex-col gap-6">
          
          {/* 1. Header Row */}
          <TaskHeader />

          {/* 2. Stats & Analytics Panel */}
          {isHydrated && (
            <DashboardStats todos={todos} categoryColors={categoryColors} />
          )}

          {/* 3. Task Input Composer */}
          <TodoInput
            onAddTodo={addTodo}
            categoryColors={categoryColors}
            onUpdateCategoryColor={updateCategoryColor}
          />

          {/* 4. Filters, Searches, and Sorts */}
          {isHydrated && totalCount > 0 && (
            <FilterBar
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              activePriority={activePriority}
              onSelectPriority={setActivePriority}
              searchQuery={searchQuery}
              onChangeSearch={setSearchQuery}
              sortBy={sortBy}
              onChangeSort={setSortBy}
              categoryColors={categoryColors}
            />
          )}

          {/* 5. Progress Indicator */}
          {isHydrated && totalCount > 0 && (
            <ProgressBar
              completedCount={completedCount}
              totalCount={totalCount}
              percentage={completionPercentage}
            />
          )}

          {/* 6. List section */}
          {isHydrated ? (
            <div className="flex flex-col gap-4">
              
              {/* Actual Todo List using filtered items */}
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                categoryColors={categoryColors}
                sortBy={sortBy}
                onReorder={reorderTodos}
              />

              {/* List Footer metadata and clean up */}
              {totalCount > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-sm text-neutral-500">
                  <span>
                    Showing {filteredTodos.length} of {totalCount} tasks
                  </span>
                  {completedCount > 0 && (
                    <button
                      onClick={clearCompleted}
                      className="text-primary-600 hover:text-primary-700 font-semibold transition duration-150 ease focus:outline-none focus:underline cursor-pointer"
                    >
                      Clear completed
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Spinner skeleton during localStorage loads
            <div className="flex flex-col gap-3 py-16 items-center justify-center text-neutral-400">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent" />
              <p className="text-sm font-medium">Loading your productivity workstation...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
