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

## Workflow

When building features, follow this process:

1. **Plan first** — Think through the component hierarchy and data flow before writing code
2. **Build components** — Use the `frontend-engineer` skill for component architecture, TypeScript patterns, accessibility, and styling guidance
3. **Write tests** — Use the `test-engineer` skill to add tests for every component

Always activate the relevant skill before starting each phase.
