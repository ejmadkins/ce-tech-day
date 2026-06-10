"use client";

import React from "react";
import { Todo } from "../types";

interface DashboardStatsProps {
  todos: Todo[];
}

export function DashboardStats({ todos }: DashboardStatsProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  
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

  // Streak or overall grade calculation
  let productivityGrade = "Resting";
  let gradeColor = "text-neutral-500 bg-neutral-100";
  const ratio = total > 0 ? completed / total : 0;

  if (total > 0) {
    if (ratio === 1) {
      productivityGrade = "Elite";
      gradeColor = "text-success bg-[#DCFCE7]";
    } else if (ratio >= 0.7) {
      productivityGrade = "Focused";
      gradeColor = "text-primary-700 bg-primary-100";
    } else if (ratio >= 0.3) {
      productivityGrade = "Active";
      gradeColor = "text-amber-700 bg-amber-100";
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full" aria-label="Task metrics dashboard">
      {/* Productivity Meter */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow transition duration-200 flex flex-col justify-between">
        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
          Productivity State
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${gradeColor}`}>
            {productivityGrade}
          </span>
          <span className="text-2xl font-extrabold text-neutral-800">
            {total > 0 ? Math.round(ratio * 100) : 0}%
          </span>
        </div>
      </div>

      {/* Overdue Alert Panel */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow transition duration-200 flex flex-col justify-between">
        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
          Urgent & Overdue
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
            overdueCount > 0 ? "text-danger bg-red-100" : "text-neutral-500 bg-neutral-100"
          }`}>
            {overdueCount > 0 ? "Action Required" : "All Caught Up"}
          </span>
          <span className={`text-2xl font-extrabold ${overdueCount > 0 ? "text-danger" : "text-neutral-800"}`}>
            {overdueCount}
          </span>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow transition duration-200 flex flex-col justify-between">
        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
          Pending Priorities
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center flex-1">
            <span className="text-xs font-bold text-red-600 mb-0.5">High</span>
            <span className="text-lg font-extrabold text-neutral-800">{highCount}</span>
          </div>
          <div className="w-px h-8 bg-neutral-200" />
          <div className="flex flex-col items-center flex-1">
            <span className="text-xs font-bold text-amber-600 mb-0.5">Med</span>
            <span className="text-lg font-extrabold text-neutral-800">{mediumCount}</span>
          </div>
          <div className="w-px h-8 bg-neutral-200" />
          <div className="flex flex-col items-center flex-1">
            <span className="text-xs font-bold text-stone-500 mb-0.5">Low</span>
            <span className="text-lg font-extrabold text-neutral-800">{lowCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
