import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import React from "react";
import { DashboardStats } from "./DashboardStats";
import { Todo } from "../types";

import "@testing-library/jest-dom";

describe("DashboardStats component", () => {
  test("renders empty state metrics correctly", () => {
    render(<DashboardStats todos={[]} />);

    expect(screen.getByText("Productivity State")).toBeInTheDocument();
    expect(screen.getByText("Urgent & Overdue")).toBeInTheDocument();
    expect(screen.getByText("Pending Priorities")).toBeInTheDocument();
    expect(screen.getByText("Resting")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  test("calculates completed ratios and urgency metrics properly", () => {
    const mockTodos: Todo[] = [
      {
        id: "1",
        text: "Completed high priority task",
        completed: true,
        priority: "high",
        category: "Work",
        createdAt: Date.now(),
      },
      {
        id: "2",
        text: "Pending medium task",
        completed: false,
        priority: "medium",
        category: "Personal",
        createdAt: Date.now(),
      },
      {
        id: "3",
        text: "Overdue pending high task",
        completed: false,
        priority: "high",
        category: "Work",
        dueDate: "2020-01-01", // Long overdue
        createdAt: Date.now(),
      },
    ];

    render(<DashboardStats todos={mockTodos} />);

    // 1 completed / 3 total = 33% (Productivity ratio) -> state is Active
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("33%")).toBeInTheDocument();

    // Overdue count should be 1 (task 3)
    const urgentSection = screen.getByText("Urgent & Overdue").parentElement;
    expect(urgentSection).toHaveTextContent("1");
    expect(screen.getByText("Action Required")).toBeInTheDocument();

    // Pending priority counts should be High: 1, Med: 1, Low: 0
    const pendingSection = screen.getByText("Pending Priorities").parentElement;
    expect(pendingSection).toHaveTextContent("High1");
    expect(pendingSection).toHaveTextContent("Med1");
  });
});
