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

Add coding standards via GEMINI.md. Enable plan mode.

```bash
./reset.sh 2
gemini "build me a todo app with add, complete, and delete functionality"
bun dev
```

**Point out:** Proper components, TypeScript interfaces, custom hooks, ARIA labels, keyboard nav.

**Punchline:** "Same prompt, dramatically better code — because we told the AI *how* we work."

### Stage 3: The Production (~2-3 min)

Connect a design system via MCP server.

```bash
./reset.sh 3
gemini "build me a todo app with add, complete, and delete functionality following our design system"
bun dev
```

**Point out:** Branded amber/stone palette, custom checkboxes, progress bar, hover animations.

**Punchline:** "Same prompt — but now the AI has access to our design system. This is production AI-assisted development."

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
| `stage-2-skills` | Boilerplate + GEMINI.md |
| `stage-3-mcp` | Boilerplate + GEMINI.md + MCP design system server |
| `stage-1-backup` | Pre-generated yolo output |
| `stage-2-backup` | Pre-generated skills output |
| `stage-3-backup` | Pre-generated MCP output |

## Tech Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Bun (runtime + package manager)
- MCP server (`@modelcontextprotocol/sdk`) for design system
