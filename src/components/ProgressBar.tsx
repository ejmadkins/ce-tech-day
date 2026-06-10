"use client";

import React from "react";

interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export function ProgressBar({ completedCount, totalCount, percentage }: ProgressBarProps) {
  return (
    <div className="w-full" aria-label="Task completion progress">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-600">
          Progress
        </span>
        <span className="text-sm font-semibold text-primary-700 bg-primary-100 px-2.5 py-0.5 rounded-full">
          {completedCount} of {totalCount} tasks ({percentage}%)
        </span>
      </div>
      <div 
        className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
