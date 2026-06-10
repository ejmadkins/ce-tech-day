import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ProgressBar } from "./ProgressBar";

import "@testing-library/jest-dom";

describe("ProgressBar component", () => {
  test("renders completion statistics and percentage", () => {
    render(<ProgressBar completedCount={2} totalCount={5} percentage={40} />);

    expect(screen.getByText("2 of 5 tasks (40%)")).toBeInTheDocument();
    
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
    expect(progressbar.getAttribute("aria-valuenow")).toBe("40");
  });

  test("handles zero total tasks gracefully", () => {
    render(<ProgressBar completedCount={0} totalCount={0} percentage={0} />);

    expect(screen.getByText("0 of 0 tasks (0%)")).toBeInTheDocument();
    
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar.getAttribute("aria-valuenow")).toBe("0");
  });
});
