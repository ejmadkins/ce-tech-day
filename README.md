# AI Coding Demo: From Yolo to Production

A live demo showing how Antigravity coding tools go from generating "slop" to production-quality code by progressively adding skills, plan mode, and MCP servers.

## Quick Start

```bash
bun install
./reset.sh 1    # Start at Stage 1
```

## Demo Script

### Stage 1: Yolo (~2-3 min)

No Antigravity guidance. Just let it rip.

```bash
./reset.sh 1
agy --dangerously-skip-permissions "build me a todo app with add, complete, and delete functionality"
bun dev
```

**Point out:** Everything in one file, `any` types, inline styles, no accessibility, generic look.

**Punchline:** "It works! But would you ship this?"

### Stage 2: Planning and Skills (~2-3 min)

Add GEMINI.md as the conductor + two Antigravity CLI skills (frontend-engineer, test-engineer).

```bash
./reset.sh 2
agy "build me a todo app with add, complete, and delete functionality"
bun dev
```

**Point out:** GEMINI.md orchestrates the workflow. Skills activate on demand — frontend-engineer for components/a11y, test-engineer for tests. Show the `.agents/skills/` directory.

**Punchline:** "GEMINI.md is the conductor. Skills are the specialists. Antigravity activates the right expert at the right time."

### Stage 3: MCP (~2-3 min)

Add a design system MCP server and a Chrome DevTools MCP server. Skills now query real systems and verify UI visually.

```bash
./reset.sh 3
agy "build me a todo app with add, complete, and delete functionality. You MUST query the design-system MCP server for all styling decisions"
bun dev
```

**Point out:** Branded amber/stone palette, custom checkboxes, progress bar. The frontend-engineer skill queried the MCP server for design tokens, and visually verified the UI using Chrome DevTools.

**Punchline:** "Three layers: GEMINI.md orchestrates, skills provide expertise, MCP connects to real systems. Antigravity didn't guess at colors — it asked, and then it verified the browser."

### Stage 4: Deploy and Verify (~2-3 min)

Deploy the application to Google Cloud Run using the Cloud Run MCP server and run verification tests.

```bash
./reset.sh 4
agy "deploy the app to google cloud run using the cloud-run mcp server, and then run tests to make sure everything is up and running as expected"
```

**Point out:** The agent provisions infrastructure and pushes the container. It then tests the live deployment URL to verify the service is running.

**Punchline:** "We've gone from a local blank canvas to a branded, tested, and deployed application—all by orchestrating the right tools with the right skills."

## Fallback

If live coding goes sideways, use backup branches with pre-generated output:

```bash
./reset.sh 1-backup   # Pre-generated Stage 1 output
./reset.sh 2-backup   # Pre-generated Stage 2 output
./reset.sh 3-backup   # Pre-generated Stage 3 output
./reset.sh 4-backup   # Pre-generated Stage 4 output
bun dev
```

Each backup branch includes a `PRESENTER.md` with talking points.

## Branch Structure

| Branch | Contents |
|--------|----------|
| `main` | This README + reset script |
| `stage-1-yolo` | Bare Next.js boilerplate |
| `stage-2-skills` | Boilerplate + GEMINI.md + `.agents/skills/` (frontend-engineer, test-engineer) |
| `stage-3-mcp` | Boilerplate + GEMINI.md + skills + MCP design system server |
| `stage-4-deploy` | Boilerplate + GEMINI.md + skills + MCP servers + setup for Cloud Run deployment |
| `stage-1-backup` | Pre-generated yolo output |
| `stage-2-backup` | Pre-generated skills output |
| `stage-3-backup` | Pre-generated MCP output |
| `stage-4-backup` | Pre-generated deployment output |

## Tech Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Bun (runtime + package manager)
- MCP server (`@modelcontextprotocol/sdk`) for design system
