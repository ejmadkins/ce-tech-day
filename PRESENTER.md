# Stage 3: MCP Design System — Presenter Notes

## What you're looking at

The same todo app, same code quality as Stage 2, but now visually polished with a branded design system served via MCP.

## Visual result

- Warm amber/stone palette — immediately recognizable as "not default Tailwind"
- Amber-tinted background (`#FFFBEB`)
- Custom checkbox with amber check and animated SVG
- Progress bar showing completion percentage
- "Task Manager" badge in the header
- Delete buttons fade in on hover (opacity transition)
- Dashed border empty state with clipboard icon
- Everything feels cohesive and intentional

## Code improvements to point out

1. **Same structure as Stage 2** — the code architecture didn't change
2. **Design tokens applied** — amber-500 primary, stone text colors, amber-50 background
3. **Polished interactions** — hover reveals, progress animations, focus rings in amber
4. **Custom checkbox** — SVG checkmark, amber-500 fill, proper ARIA role
5. **Progress bar** — visual indicator of completion with smooth transitions
6. **Brand personality** — "What's on your plate?" heading, Task Manager badge

## Key talking point

"Same prompt, same code quality, but now the AI queried our design system via MCP before building. It didn't guess at colors — it asked. This is the difference between AI-generated code and AI-assisted production code. The MCP server is the bridge between your design team's decisions and the AI's output."
