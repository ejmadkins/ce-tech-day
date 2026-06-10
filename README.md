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
agy --dangerously-skip-permissions --model "gemini-2.5-flash" -i "build me a todo app with add, complete, and delete functionality"
bun dev
```

**Point out:** Everything in one file, `any` types, inline styles, no accessibility, generic look.

**Punchline:** "It works! But would you ship this?"

---

### Stage 2: Planning and Skills (~2-3 min)

Add GEMINI.md as the conductor + two Antigravity CLI skills (frontend-engineer, test-engineer).

```bash
./reset.sh 2
agy --dangerously-skip-permissions --model "gemini-2.5-flash" -i "build me a todo app with add, complete, and delete functionality"
bun dev
```

**Point out:** GEMINI.md orchestrates the workflow. Skills activate on demand — frontend-engineer for components/a11y, test-engineer for tests. Show the `.agents/skills/` directory.

**Punchline:** "GEMINI.md is the conductor. Skills are the specialists. Antigravity activates the right expert at the right time."

---

### Stage 3: Interactive Alignment, Planning & Goals (~2-3 min)

Conduct an interactive alignment session with the agent to co-design and autonomously implement a premium Productivity Workstation.

```bash
./reset.sh 3
agy --dangerously-skip-permissions --model "gemini-2.5-flash" -i
```

**Inside the CLI session:**
1. **Interactive Alignment**: Prompt the agent with:
   ```text
   let's refine and improve our todo app by adding categories, priorities, due dates, and a stats dashboard
   ```
2. **Goal Execution**: Once the plan is aligned, execute it:
   ```text
   implement the detailed architecture plan we aligned on including categories, priorities, due dates, filters, and dynamic metrics, and verify with tests
   ```

**Point out:** The agent conducts a collaborative interview to align on design scope, co-create a detailed layout plan, and then implements a rich, premium layout with filters, status headers, progress bars, and stats widgets, verified by 20 unit tests.

**Punchline:** "Interactive alignment transforms the agent from a passive code generator into an active, strategic engineering partner."

---

### Stage 4: Deploy and Verify (~2-3 min)

Deploy the application to Google Cloud Run using the Cloud Run MCP server and run verification tests.

```bash
./reset.sh 4
agy --dangerously-skip-permissions --model "gemini-2.5-flash" -i "deploy our application to Cloud Run"
```

**Point out:** The agent provisions infrastructure and pushes the container using the native `cloud-run` MCP server tools. It then tests the live deployment URL to verify the service is running.

**Punchline:** "We've gone from a local blank canvas to a branded, tested, and deployed application—all by orchestrating the right tools with the right skills."

---

## Fallback

If live coding goes sideways, use backup branches with pre-generated output:

```bash
./reset.sh 1-backup   # Pre-generated Stage 1 output
./reset.sh 2-backup   # Pre-generated Stage 2 output
./reset.sh 3-backup   # Pre-generated Stage 3 output
./reset.sh 4-backup   # Pre-generated Stage 4 output
bun dev
```

Each backup branch includes a `PRESENTER.md` and `TALK_TRACK.md` with talking points.

## Branch Structure

| Branch | Contents |
|--------|----------|
| `main` | This README + reset script |
| `stage-1-yolo` | Bare Next.js boilerplate |
| `stage-2-skills` | Boilerplate + GEMINI.md + `.agents/skills/` (frontend-engineer, test-engineer) |
| `stage-3-grill` | Boilerplate + GEMINI.md + skills + Q&A interactive grill setup |
| `stage-4-deploy` | Boilerplate + GEMINI.md + skills + MCP servers + setup for Cloud Run deployment |
| `stage-1-backup` | Pre-generated yolo output |
| `stage-2-backup` | Pre-generated skills output |
| `stage-3-grill-backup` | Pre-generated alignment & goals output |
| `stage-4-backup` | Pre-generated deployment output |

## Tech Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Bun (runtime + package manager)
- MCP server (`@modelcontextprotocol/sdk`) for Cloud Run and browser control
