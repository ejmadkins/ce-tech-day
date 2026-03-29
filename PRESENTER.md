# Stage 2: Skills + Plan Mode — Presenter Notes

## What you're looking at

The same todo app, but generated with GEMINI.md orchestration and two Gemini CLI skills: a frontend engineer and a test engineer.

## What changed from Stage 1

- **GEMINI.md** — the conductor. Defines project context and the workflow: plan first, then build components (frontend-engineer skill), then write tests (test-engineer skill)
- **`.gemini/skills/frontend-engineer/`** — on-demand specialist for component architecture, TypeScript, accessibility, styling
- **`.gemini/skills/test-engineer/`** — on-demand specialist for testing strategy, React Testing Library patterns

## Visual result

- Clean layout with proper spacing
- Default Tailwind blue/gray palette (still generic, but well-executed)
- Proper focus rings on interactive elements
- Status badges (Done/Pending) on each todo
- Completion counter
- Empty state with helpful message

## Code improvements to point out

1. **Separated components** — `AddTodo.tsx`, `TodoItem.tsx`, `TodoList.tsx` in `src/components/`
2. **TypeScript interfaces** — `Todo` type in `src/types/index.ts`, no `any` anywhere
3. **Custom hook** — `useTodos.ts` extracts state logic, making it testable
4. **Accessibility** — ARIA labels on every interactive element, semantic HTML
5. **Keyboard navigation** — form submission, focus management after adding todos
6. **`crypto.randomUUID()`** — proper unique IDs instead of `Date.now()`

## Key talking points

"GEMINI.md is the conductor — it defines the process. Skills are the specialists. The frontend-engineer skill packages component best practices. The test-engineer skill packages testing expertise. Different team members can own different skills."

"Same prompt, same model, dramatically better code. The AI activated the right specialist at the right time."
