# Project Guidelines

## Architecture

- This is a Next.js application using the App Router with TypeScript and Tailwind CSS
- Use React Server Components by default; only add "use client" when the component needs interactivity (event handlers, useState, useEffect)
- All components go in `src/components/`, one component per file, named with PascalCase (e.g., `TodoItem.tsx`)
- Shared types go in `src/types/index.ts`
- Keep page components thin — they compose components, they don't contain business logic

## TypeScript

- Strict TypeScript everywhere — no `any`, no `as` escape hatches
- Define explicit interfaces for all data structures (e.g., `interface Todo { id: string; title: string; completed: boolean }`)
- Use `React.FC` sparingly; prefer explicit prop types: `function TodoItem({ todo }: { todo: Todo })`

## Code Quality

- Plan your approach before writing code. Think through the component hierarchy and data flow first
- Handle loading and error states explicitly — never leave the user staring at a blank screen
- Use semantic HTML elements (`<main>`, `<section>`, `<ul>`, `<button>`) not generic `<div>` soup
- Add ARIA labels to interactive elements. Ensure full keyboard navigation (Tab, Enter, Escape)
- Extract reusable logic into custom hooks in `src/hooks/`

## Styling

- Use Tailwind CSS utility classes for styling
- Keep class lists readable — extract complex combinations into component-level variables if needed
- Ensure responsive design: mobile-first, test at 375px and 1024px breakpoints

## Testing

- Write unit tests alongside components using Jest and React Testing Library
- Test files go next to the component: `TodoItem.test.tsx` beside `TodoItem.tsx`
- Test behavior, not implementation — test what the user sees and does, not internal state
