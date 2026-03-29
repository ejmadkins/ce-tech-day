# Project Context

This is a Next.js application using the App Router with TypeScript, Tailwind CSS, and Bun.

## Runtime

This project uses **Bun** as the runtime and package manager. Always use bun commands:
- `bun dev` — start the dev server
- `bun test` — run tests (bun has a built-in Jest-compatible test runner)
- `bun install` — install dependencies

Do not use npm, yarn, or pnpm.

## Project Structure

- `src/components/` — React components, one per file, PascalCase naming
- `src/types/` — Shared TypeScript interfaces and types
- `src/hooks/` — Custom React hooks for reusable logic
- `src/app/` — Next.js App Router pages and layouts

## Design System

This project has a design system served via MCP. Before building any UI:

1. Query the `design-system` MCP server using `get_design_tokens` for colors, typography, spacing, border radius, and shadows
2. Use `get_component_spec` for specific component styling (button, card, input, checkbox, badge)
3. Apply these tokens consistently — do not use default Tailwind colors or arbitrary values

## Workflow

When building features, follow this process:

1. **Plan first** — Think through the component hierarchy and data flow before writing code
2. **Query the design system** — Get design tokens and component specs from the MCP server
3. **Build components** — Use the `frontend-engineer` skill for component architecture, TypeScript patterns, accessibility, and styling guidance
4. **Write tests** — Use the `test-engineer` skill to add tests for every component
5. **Verify visually** — Start the dev server with `bun dev`, then use Playwright to open http://localhost:3000, take a screenshot, and verify the UI matches the design system tokens

Always activate the relevant skill before starting each phase.
