"use client";

import React from "react";

export function TaskHeader() {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center">
        <span className="text-[0.7rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary-100 text-primary-800">
          Task Manager
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          What's on your plate?
        </h1>
        <p className="text-sm text-neutral-500">
          Simplify your day, build habits, and conquer your goals.
        </p>
      </div>
    </header>
  );
}
