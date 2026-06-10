"use client";

import React from "react";
import { Priority } from "../types";

interface FilterBarProps {
  categories: string[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  activePriority: Priority | null;
  onSelectPriority: (priority: Priority | null) => void;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  sortBy: string;
  onChangeSort: (criteria: string) => void;
  categoryColors?: Record<string, string>;
}

export function FilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  activePriority,
  onSelectPriority,
  searchQuery,
  onChangeSearch,
  sortBy,
  onChangeSort,
  categoryColors = {},
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 w-full bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onChangeSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder-neutral-400 focus:outline-none focus:border-primary-500 custom-input-focus transition duration-150 ease"
          aria-label="Search tasks"
        />
        <svg
          className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
          Categories
        </span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => onSelectCategory(null)}
            className={`text-xs font-semibold px-3.5 py-2 rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeCategory === null
                ? "bg-primary-500 text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const catColor = categoryColors[cat] || "#78716C";
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-2 rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? "bg-primary-500 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {/* Dot indicator */}
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/20"
                  style={{ backgroundColor: catColor }}
                />
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Priority Filters & Sort Order */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        {/* Priority Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Priority:
          </span>
          <div className="flex items-center gap-1">
            {(["low", "medium", "high"] as const).map((pri) => {
              const isActive = activePriority === pri;
              const priColors = {
                low: isActive ? "bg-stone-550 text-white shadow-sm" : "bg-neutral-150 text-stone-600 hover:bg-neutral-200",
                medium: isActive ? "bg-amber-550 text-white shadow-sm" : "bg-neutral-150 text-amber-700 hover:bg-neutral-200",
                high: isActive ? "bg-red-550 text-white shadow-sm" : "bg-neutral-150 text-red-600 hover:bg-neutral-200",
              };
              return (
                <button
                  key={pri}
                  onClick={() => onSelectPriority(isActive ? null : pri)}
                  className={`text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded cursor-pointer transition-all duration-150 ${priColors[pri]}`}
                >
                  {pri}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value)}
            className="bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-primary-500 transition cursor-pointer"
            aria-label="Sort options"
          >
            <option value="manual">Manual (Drag & Drop)</option>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="priority-desc">High Priority First</option>
            <option value="dueDate-asc">Closest Due Date</option>
          </select>
        </div>
      </div>
    </div>
  );
}
