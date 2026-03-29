# Stage 2: Skills + Plan Mode — Presenter Notes

## What you're looking at

The same todo app, but generated with GEMINI.md coding standards and plan mode enabled.

## Visual result

- Clean layout with proper spacing
- Default Tailwind blue/gray palette (still generic, but well-executed)
- Proper focus rings on interactive elements
- Status badges (Done/Pending) on each todo
- Completion counter
- Empty state with helpful message
- Looks like a well-built tutorial project

## Code improvements to point out

1. **Separated components** — `AddTodo.tsx`, `TodoItem.tsx`, `TodoList.tsx` in `src/components/`
2. **TypeScript interfaces** — `Todo` type in `src/types/index.ts`, no `any` anywhere
3. **Custom hook** — `useTodos.ts` extracts state logic, making it testable
4. **Accessibility** — ARIA labels on every interactive element, semantic HTML (`<main>`, `<section>`, `<ul>`)
5. **Keyboard navigation** — form submission, focus management after adding todos
6. **`crypto.randomUUID()`** — proper unique IDs instead of `Date.now()`
7. **Disabled state** — Add button disabled when input is empty

## Key talking point

"Same prompt, same model, dramatically better code. The only difference? A GEMINI.md file that told the AI how your team works. Skills and plan mode turn AI from a junior dev into one that follows your standards."
