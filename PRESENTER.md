# Stage 1: Yolo Mode — Presenter Notes

## What you're looking at

A functional but sloppy todo app generated with zero Antigravity guidance.

## Visual result

- Plain white page with Arial font
- Generic blue "Add" button (#0070f3 — the default Vercel blue)
- Default browser checkboxes
- Red "Delete" buttons
- No hover states, no focus indicators
- Looks like a 2010 tutorial project

## Code issues to point out

1. **Everything in one file** — all logic, UI, and state in `page.tsx`
2. **`any` types everywhere** — `useState<any[]>`, function params typed as `any`
3. **Inline styles** — no Tailwind, no CSS modules, just style objects
4. **No accessibility** — no ARIA labels, no semantic HTML (just divs and spans)
5. **No error handling** — what if something goes wrong?
6. **No component separation** — impossible to test or reuse
7. **`Date.now()` for IDs** — collision risk

## Key talking point

"This is what you get when you let Antigravity loose with no guidance. It works — but it's the code equivalent of a first draft. Would you code review this? Would you ship this?"
