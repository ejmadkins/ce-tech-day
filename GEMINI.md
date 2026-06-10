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

## Design System (CRITICAL)

This project has a mandatory design system served via MCP. You MUST query it before writing ANY styles.

1. ALWAYS call `get_design_tokens` FIRST — before writing any CSS, Tailwind classes, or inline styles
2. ALWAYS call `get_component_spec` for every UI component you build (button, card, input, checkbox, badge)
3. Apply these tokens consistently — do NOT use default Tailwind colors or arbitrary values
4. Do NOT guess at colors, spacing, or typography. The MCP server is the single source of truth
5. If you skip the MCP query, the styling WILL be wrong

## Workflow

When building features, follow this process:

1. **Plan first** — Think through the component hierarchy and data flow before writing code
2. **Query the design system** — Get design tokens and component specs from the MCP server
3. **Build components** — Use the `frontend-engineer` skill for component architecture, TypeScript patterns, accessibility, and styling guidance
4. **Write tests** — Use the `test-engineer` skill to add tests for every component
5. **Verify visually** — Start the local development server (if not already running) and use the `chrome-devtools` MCP server tools (like `navigate_page` and `take_screenshot`) to inspect the app and ensure everything looks visually pleasing and adheres to the design tokens.
6. **Deploy & Verify** — Use the `deploy` skill for deploying, inspecting, and running verification checks on Google Cloud Run using the Cloud Run MCP server.

Always activate the relevant skill before starting each phase.

