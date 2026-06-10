import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "../types";

// Import jest-dom matchers so they are registered
import "@testing-library/jest-dom";

describe("TodoItem component", () => {
  const mockTodo: Todo = {
    id: "1",
    text: "Review pull request",
    completed: false,
    createdAt: Date.now(),
  };

  test("renders todo item text and pending status", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Review pull request")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("calls onToggle when checkbox clicked", async () => {
    let toggledId = "";
    const handleToggle = (id: string) => {
      toggledId = id;
    };

    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={handleToggle}
        onDelete={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(toggledId).toBe("1");
  });

  test("calls onDelete when delete button clicked", async () => {
    let deletedId = "";
    const handleDelete = (id: string) => {
      deletedId = id;
    };

    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={handleDelete}
      />
    );

    const deleteBtn = screen.getByRole("button", { name: /delete task/i });
    await user.click(deleteBtn);

    expect(deletedId).toBe("1");
  });

  test("renders completed state with line-through and completed status", () => {
    const completedTodo = { ...mockTodo, completed: true };

    render(
      <TodoItem
        todo={completedTodo}
        onToggle={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Completed")).toBeInTheDocument();
    const textSpan = screen.getByText("Review pull request");
    expect(textSpan.className).toContain("line-through");
  });
});
