"use client";

import React, { useState } from "react";
import { Todo } from "../types";

interface DashboardStatsProps {
  todos: Todo[];
  categoryColors?: Record<string, string>;
}

export function DashboardStats({ todos, categoryColors = {} }: DashboardStatsProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const ratio = total > 0 ? completed / total : 0;
  const percentage = Math.round(ratio * 100);

  // Overdue count calculation
  const overdueCount = todos.filter((todo) => {
    if (todo.completed || !todo.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(todo.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }).length;

  // Priority counts (pending tasks)
  const pendingTodos = todos.filter((t) => !t.completed);
  const highCount = pendingTodos.filter((t) => t.priority === "high").length;
  const mediumCount = pendingTodos.filter((t) => t.priority === "medium").length;
  const lowCount = pendingTodos.filter((t) => t.priority === "low").length;

  // Calculate category stats
  const categoryCounts: Record<string, number> = {};
  todos.forEach((todo) => {
    categoryCounts[todo.category] = (categoryCounts[todo.category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name,
      count,
      color: categoryColors[name] || "#78716C",
    }))
    .sort((a, b) => b.count - a.count);

  // Productivity State / Badge
  let productivityGrade = "Resting";
  let gradeColor = "text-neutral-500 bg-neutral-100";

  if (total > 0) {
    if (ratio === 1) {
      productivityGrade = "Elite";
      gradeColor = "text-success bg-[#DCFCE7] border border-green-200 animate-bounce";
    } else if (ratio >= 0.7) {
      productivityGrade = "Focused";
      gradeColor = "text-primary-700 bg-primary-100 border border-primary-200";
    } else if (ratio >= 0.3) {
      productivityGrade = "Active";
      gradeColor = "text-amber-700 bg-amber-100 border border-amber-200";
    }
  }

  // Interactive state for SVG elements
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // SVG circular properties
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ratio * circumference;

  return (
    <div className="flex flex-col gap-6 w-full" aria-label="Task metrics dashboard">
      {/* 3-Column Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric Card 1: Completion Progress (Interactive Donut) */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4">
          <div className="flex flex-col justify-between h-full py-1">
            <div>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                Productivity State
              </span>
              <span className="text-2xl font-black text-neutral-800 tracking-tight">
                {percentage}% Done
              </span>
            </div>
            <span className={`text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full inline-block mt-2 self-start ${gradeColor}`}>
              {productivityGrade}
            </span>
          </div>

          {/* Interactive SVG Circular Donut Chart */}
          <div 
            className="relative w-20 h-20 flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setHoveredSlice("progress")}
            onMouseLeave={() => setHoveredSlice(null)}
          >
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
              {/* Background Circle */}
              <circle
                cx="45"
                cy="45"
                r={radius}
                className="stroke-neutral-100 fill-none"
                strokeWidth="8"
              />
              {/* Foreground Completion Circle */}
              {total > 0 && (
                <circle
                  cx="45"
                  cy="45"
                  r={radius}
                  className="stroke-primary-500 fill-none transition-all duration-500 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{
                    filter: hoveredSlice === "progress" ? "drop-shadow(0 0 3px rgba(245,158,11,0.4))" : "none",
                    stroke: hoveredSlice === "progress" ? "#D97706" : "#F59E0B"
                  }}
                />
              )}
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-sm font-black text-neutral-800">
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Metric Card 2: Urgent & Overdue Alerts */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4">
          <div className="flex flex-col justify-between h-full py-1">
            <div>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                Urgent & Overdue
              </span>
              <span className={`text-2xl font-black tracking-tight ${overdueCount > 0 ? "text-danger" : "text-neutral-800"}`}>
                {overdueCount} Overdue
              </span>
            </div>
            <span className={`text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full inline-block mt-2 self-start ${
              overdueCount > 0 ? "text-danger bg-red-100 border border-red-200 animate-pulse" : "text-neutral-500 bg-stone-100"
            }`}>
              {overdueCount > 0 ? "Action Required" : "All Caught Up"}
            </span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-150">
            <svg
              className={`w-10 h-10 ${overdueCount > 0 ? "text-danger" : "text-neutral-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Metric Card 3: Priority Heat breakdown */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">
            Pending Priorities
          </span>
          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center flex-1 bg-red-50/50 hover:bg-red-50 border border-red-100 rounded-lg py-1.5 transition">
              <span className="text-[0.65rem] font-extrabold text-red-600 uppercase tracking-wider mb-0.5">High</span>
              <span className="text-lg font-black text-red-700">{highCount}</span>
            </div>
            <div className="flex flex-col items-center flex-1 bg-amber-50/50 hover:bg-amber-50 border border-amber-100 rounded-lg py-1.5 transition">
              <span className="text-[0.65rem] font-extrabold text-amber-600 uppercase tracking-wider mb-0.5">Med</span>
              <span className="text-lg font-black text-amber-700">{mediumCount}</span>
            </div>
            <div className="flex flex-col items-center flex-1 bg-stone-50 hover:bg-stone-100 border border-stone-150 rounded-lg py-1.5 transition">
              <span className="text-[0.65rem] font-extrabold text-stone-500 uppercase tracking-wider mb-0.5">Low</span>
              <span className="text-lg font-black text-stone-700">{lowCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Category Bar Chart (only render if there are categories with tasks) */}
      {categoryData.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col gap-3">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
            Category Breakdown (Task Volume)
          </span>
          <div className="flex flex-col gap-2.5">
            {categoryData.slice(0, 5).map((cat) => {
              const maxCount = Math.max(...categoryData.map(c => c.count));
              const widthPercentage = maxCount > 0 ? (cat.count / maxCount) * 100 : 0;
              return (
                <div key={cat.name} className="flex items-center gap-3 w-full">
                  <span className="text-xs font-bold text-neutral-700 w-20 truncate" title={cat.name}>
                    {cat.name}
                  </span>
                  <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden relative group">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${widthPercentage}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                  <span className="text-xs font-extrabold text-neutral-500 w-6 text-right">
                    {cat.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
