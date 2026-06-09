# Stage 3: MCP Design System — Presenter Notes

## What you're looking at

The same todo app with the same skills from Stage 2, but now the frontend-engineer skill queries a design system MCP server before making any styling decisions.

## What changed from Stage 2

- **MCP servers**:
  - **Design System** (`mcp-server/index.js`) — serves design tokens and component specs via `get_design_tokens` and `get_component_spec` tools.
  - **Chrome DevTools** (`chrome-devtools-mcp`) — allows the agent to launch/control the browser and visually verify UI changes.
- **.antigravity.md** — adds design system queries as step 2 and visual verification via browser as step 5 in the workflow.
- **Frontend-engineer skill** — updated to always query the design-system MCP before choosing colors, spacing, or styles.
- **`.agents/mcp_config.json`** — configures the MCP server connections.

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

## Key talking points

"The AI didn't guess at colors — it asked. The MCP server is the bridge between your design team's decisions and the AI's output."

"Three layers working together: .antigravity.md orchestrates the workflow, skills provide expert guidance, and MCP connects to your real systems. That's the difference between AI-generated code and AI-assisted production code."
