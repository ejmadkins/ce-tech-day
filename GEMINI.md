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

Always activate the relevant skill before starting each phase.

## ADK AI Sidekick Integration (CRITICAL FOR STAGE 4)

This project has a pre-built, production-grade **Agent Development Kit (ADK)** backend API route at `src/app/api/agent/route.ts`.

When instructed to augment our application with an AI assistant, AI sidebar, or ADK agent, you MUST leverage this pre-built route instead of writing a new backend. Your task is to implement the **AI Sidekick Sidebar** on the frontend:

1. **Collapsible Slide-out Sidebar (`src/components/AgentSidebar.tsx`)**:
   - Lies on the right side of the screen, sliding in/out from the right with smooth animations using `transitions.normal`.
   - Uses design tokens for colors, typography, spacing, border radius, and shadows (ALWAYS query MCP server first!).
   - Styled perfectly according to the design system (e.g. background `#FFFFFF`, border `1px solid #D6D3D1`, primary gold details `#F59E0B`).
   - Includes a sleek chat log, scrollable message container, micro-animations, input text field, and quick-suggestion chips (e.g., "Summarize my tasks", "Plan summer vacation").

2. **State & Event Integration**:
   - Wire the sidebar to the `useTodos` hook: send the current `todos` list along with the user's chat `message` as JSON in a `POST` request to `/api/agent`.
   - When the backend returns the response, update the client's `todos` with the updated list returned by the agent (`res.todos`), and display the agent's text response (`res.response`). This makes the user list react in real-time as the agent works!
   - Place a sleek "AI Sidekick" chat toggle button in the header (`src/components/TaskHeader.tsx`).

3. **Verifying with Tests**:
   - Write unit tests using `test-engineer` skills to ensure the sidebar can toggle, receive input, and send requests.

