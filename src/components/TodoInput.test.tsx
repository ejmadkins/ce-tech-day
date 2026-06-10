import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { TodoInput } from "./TodoInput";

import "@testing-library/jest-dom";

describe("TodoInput component", () => {
  test("renders input field and submit button", () => {
    render(<TodoInput onAddTodo={() => {}} />);

    expect(screen.getByPlaceholderText("Add a new task...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });

  test("submits input text and clears input on submit", async () => {
    let addedText = "";
    const handleAddTodo = (text: string) => {
      addedText = text;
    };

    const user = userEvent.setup();
    render(<TodoInput onAddTodo={handleAddTodo} />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const button = screen.getByRole("button", { name: /add task/i });

    // Button should be disabled initially
    expect(button).toBeDisabled();

    // Type text
    await user.type(input, "Complete design spec");
    expect(input).toHaveValue("Complete design spec");
    expect(button).not.toBeDisabled();

    // Submit
    await user.click(button);
    expect(addedText).toBe("Complete design spec");
    
    // Input should be cleared and focused
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
  });
});
