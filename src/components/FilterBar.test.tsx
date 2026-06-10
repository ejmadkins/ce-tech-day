import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FilterBar } from "./FilterBar";

import "@testing-library/jest-dom";

describe("FilterBar component", () => {
  const defaultProps = {
    categories: ["General", "Work", "Personal"],
    activeCategory: null,
    onSelectCategory: () => {},
    activePriority: null,
    onSelectPriority: () => {},
    searchQuery: "",
    onChangeSearch: () => {},
    sortBy: "date-desc",
    onChangeSort: () => {},
  };

  test("renders search input, category chips, and sort dropdown", () => {
    render(<FilterBar {...defaultProps} />);

    expect(screen.getByPlaceholderText("Search tasks...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Work" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /sort options/i })).toBeInTheDocument();
  });

  test("calls onSelectCategory when a category chip is clicked", async () => {
    let selectedCategory: string | null = "initial";
    const handleSelectCategory = (cat: string | null) => {
      selectedCategory = cat;
    };

    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} onSelectCategory={handleSelectCategory} />);

    const workChip = screen.getByRole("button", { name: "Work" });
    await user.click(workChip);
    expect(selectedCategory).toBe("Work");

    const allChip = screen.getByRole("button", { name: "All" });
    await user.click(allChip);
    expect(selectedCategory).toBeNull();
  });

  test("calls onChangeSearch when text is typed", async () => {
    const user = userEvent.setup();
    
    function StatefulWrapper() {
      const [query, setQuery] = React.useState("");
      return (
        <FilterBar
          {...defaultProps}
          searchQuery={query}
          onChangeSearch={setQuery}
        />
      );
    }

    render(<StatefulWrapper />);

    const searchInput = screen.getByPlaceholderText("Search tasks...");
    await user.type(searchInput, "Meeting");
    expect(searchInput).toHaveValue("Meeting");
  });
});
