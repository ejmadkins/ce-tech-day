# AI Coding Demo: From Yolo to Production

A live demo showing how AI coding tools go from generating "slop" to production-quality code by progressively adding skills, plan mode, and MCP servers.

## Quick Start

```bash
bun install
./reset.sh 1    # Start at Stage 1
```

## Demo Script

### Stage 1: The Yolo (~2-3 min)

No AI guidance. Just let it rip.

```bash
./reset.sh 1
gemini -y "build me a todo app with add, complete, and delete functionality"
bun dev
```

**Point out:** Everything in one file, `any` types, inline styles, no accessibility, generic look.

**Punchline:** "It works! But would you ship this?"

### Stage 2: The Guided (~2-3 min)

Add GEMINI.md as the conductor + two Gemini CLI skills (frontend-engineer, test-engineer).

```bash
./reset.sh 2
gemini "build me a todo app with add, complete, and delete functionality"
bun dev
```

**Point out:** GEMINI.md orchestrates the workflow. Skills activate on demand — frontend-engineer for components/a11y, test-engineer for tests. Show the `.gemini/skills/` directory.

**Punchline:** "GEMINI.md is the conductor. Skills are the specialists. The AI activates the right expert at the right time."

### Stage 3: The Production (~2-3 min)

Add a design system MCP server. Skills now query real systems.

```bash
./reset.sh 3
gemini "build me a todo app with add, complete, and delete functionality. You MUST query the design-system MCP server for all styling decisions"
bun dev
```

**Point out:** Branded amber/stone palette, custom checkboxes, progress bar. The frontend-engineer skill queried the MCP server for design tokens before styling.

**Punchline:** "Three layers: GEMINI.md orchestrates, skills provide expertise, MCP connects to real systems. The AI didn't guess at colors — it asked."

## Fallback

If live coding goes sideways, use backup branches with pre-generated output:

```bash
./reset.sh 1-backup   # Pre-generated Stage 1 output
./reset.sh 2-backup   # Pre-generated Stage 2 output
./reset.sh 3-backup   # Pre-generated Stage 3 output
bun dev
```

Each backup branch includes a `PRESENTER.md` with talking points.

## Branch Structure

| Branch | Contents |
|--------|----------|
| `main` | This README + reset script |
| `stage-1-yolo` | Bare Next.js boilerplate |
| `stage-2-skills` | Boilerplate + GEMINI.md + `.gemini/skills/` (frontend-engineer, test-engineer) |
| `stage-3-mcp` | Boilerplate + GEMINI.md + skills + MCP design system server |
| `stage-1-backup` | Pre-generated yolo output |
| `stage-2-backup` | Pre-generated skills output |
| `stage-3-backup` | Pre-generated MCP output |

## Tech Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Bun (runtime + package manager)
- MCP server (`@modelcontextprotocol/sdk`) for design system
