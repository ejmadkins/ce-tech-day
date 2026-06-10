# Demo Talk Track

Target: under 12 minutes. Times are approximate.

---

## Opening (0:00 - 0:30)

"Antigravity coding tools are incredible — you give them a prompt, they write code, it works. But there's a gap between 'it works' and 'I'd ship this.' Today I'm going to show you how to close that gap using three features of Antigravity CLI: rules, skills, and MCP servers. Same prompt, three times, three very different results."

---

## Stage 1: Yolo (0:30 - 3:00)

### Before running (0:30 - 1:00)

"Let's start with the baseline. I have a fresh Next.js project — nothing special, just what you get from create-next-app."

```bash
./reset.sh 1
```

"No GEMINI.md, no skills, no configuration. Just a blank canvas and a prompt."

### Run the agent (1:00 - 1:15)

```bash
agy --dangerously-skip-permissions --model "gemini-2.5-flash" -i "build me a todo app with add, complete, and delete functionality"
```

"Notice the `--dangerously-skip-permissions` and `-i` flags — that is our interactive 'yolo' launch. It's going to approve actions but let us interact as it works."

### [WHILE BUILDING] (1:15 - 2:15)

Watch the agent work for a moment, then:

"So what's happening here is Antigravity has no context about our project. It doesn't know our standards, our conventions, how we like to structure code. It's making every decision on its own."

"This is what most people do the first time they try an AI coding tool — give it a prompt and hope for the best. And it will work. The question is: is it any good?"

If the agent is still going:

"You can see it's putting everything into one file. Inline styles. No component separation. It's doing what any developer would do under time pressure with no guidance — just get it done."

### After it finishes (2:15 - 3:00)

```bash
bun dev
```

"It works! We've got add, complete, delete. But look at this code."

Open `src/app/page.tsx` and point out:
- "Everything in one file"
- "`any` types everywhere"
- "Inline styles — no Tailwind"
- "No accessibility — try tabbing through this"
- "Default browser checkboxes"

"Would you approve this in a code review? Would you ship this? This is what I call Antigravity slop — technically functional, practically useless."

---

## Stage 2: Skills (3:00 - 6:00)

### Before running (3:00 - 3:45)

```bash
./reset.sh 2
```

"Same starting point, but now we've added two things."

Open `GEMINI.md`:

"First, GEMINI.md — this is always-on project context. Think of it as the conductor. It tells Antigravity: here's our project structure, and here's the workflow — plan first, then build components using the frontend-engineer skill, then write tests using the test-engineer skill."

Open `.agents/skills/` directory:

"Second, skills. These are on-demand specialists that activate when they're needed."

Open `.agents/skills/frontend-engineer/SKILL.md`:

"The frontend-engineer skill packages everything a senior frontend dev knows — component architecture, TypeScript patterns, accessibility requirements, styling conventions."

Open `.agents/skills/test-engineer/SKILL.md`:

"The test-engineer skill packages testing expertise — what to test, how to use React Testing Library, testing patterns."

"Different team members can own different skills. Your accessibility lead writes the a11y guidance. Your test lead writes the testing patterns. It's institutional knowledge, packaged and reusable."

### Run the agent (3:45 - 4:00)

```bash
agy --dangerously-skip-permissions --model "gemini-2.5-flash" -i "build me a todo app with add, complete, and delete functionality"
```

"Notice we are still using our interactive flag, but now it's going to use our project guidelines to plan first before editing."

### [WHILE BUILDING] (4:00 - 5:15)

"Notice it's planning before it writes code. It's thinking about the component hierarchy."

"Watch the skills activate — the frontend-engineer skill kicks in when it starts building components. It knows to create separate files, use proper TypeScript interfaces, add ARIA labels."

If agent is still going:

"The key insight here is that we didn't write more code. We didn't add any dependencies. We just told Antigravity how our team works. That's it. A few markdown files."

"Think about onboarding. When a new developer joins your team, you don't hand them a blank editor and say 'good luck.' You give them your coding standards, your patterns, your conventions. Skills are the same thing — but for your Antigravity tools."

### After it finishes (5:15 - 6:00)

```bash
bun dev
```

"Same app, but look at the code."

Quick tour:
- "`src/components/` — separate files for each component"
- "`src/types/` — proper TypeScript interfaces"
- "`src/hooks/` — custom hook for state management"
- "ARIA labels on every interactive element — try tabbing through"
- "Still looks generic — default Tailwind blue — but the engineering is solid"

"Same prompt, dramatically better code. Antigravity activated the right specialist at the right time."

---

## Stage 3: Interactive Alignment, Planning & Goals (6:00 - 9:00)

### Before running (6:00 - 7:00)

```bash
./reset.sh 3
```

"We've got great, well-engineered code now. But in real life, engineering standards are only half the battle. A key part of engineering is *alignment*. Developers don't just write code from a single-line prompt; they co-create specifications with product managers, UX designers, and architects. How do we do that with an agent?"

"That's where interactive alignment comes in. We can have Antigravity actively 'grill' us—asking clarifying questions, making architectural suggestions, and co-creating a structured design plan *before* executing the goals."

### Run the agent (7:00 - 7:15)

```bash
agy --dangerously-skip-permissions --model "gemini-2.5-flash" -i
```

"Notice we are launching an interactive CLI session with `-i`. This starts a real-time, bi-directional partnership."

### Interactive Alignment & Execution (7:15 - 8:15)

"Once inside, we prompt:"
```text
let's refine and improve our todo app by adding categories, priorities, due dates, and a stats dashboard
```

"Watch how the agent responds. Instead of blindly writing code, it starts an interview. It asks about our schema, our category options, how we want to compute metrics, and our UI layout preferences."

"This is a collaborative planning session. Once we agree and align, the agent co-creates a detailed architecture plan."

"Then we give it the green light to execute the aligned plan autonomously:"
```text
implement the detailed architecture plan we aligned on including categories, priorities, due dates, filters, and dynamic metrics, and verify with tests
```

"Now, the agent shifts into **Goal mode**. It executes the entire aligned plan autonomously, creating new components, custom hooks, and verifying every single change with a suite of automated unit tests."

### After it finishes (8:15 - 9:00)

```bash
bun dev
```

"Let's see what was generated."

Quick visual and code tour:
- "Look at this UI: dynamic completion progress bar, filter chips for categories (Work, Personal, Shopping), urgent task indicators, and a beautiful stats dashboard summarizing our productivity!"
- "Let's check the code: everything is modular, typed with TypeScript, fully responsive, and completely covered by unit tests!"
- "This isn't just an app built from a generic prompt. It's a customized, production-grade productivity workstation co-designed with our agent."

---

## Stage 4: Deploy and Verify (9:00 - 11:30)

### Before running (9:00 - 9:45)

```bash
./reset.sh 4
```

"Now we have a production-ready app locally. The next logical step is getting it in front of users. We're going to deploy this to Google Cloud Run."

"We've added another MCP server to our configuration: the Google Cloud Run MCP server. This gives the agent direct access to provision infrastructure, deploy containers, and manage services in GCP, all without us having to write Terraform or click through the Cloud Console."

### Run the agent (9:45 - 10:00)

```bash
agy --dangerously-skip-permissions --model "gemini-2.5-flash" -i "deploy our application to Cloud Run"
```

### [WHILE DEPLOYING] (10:00 - 11:00)

"The agent is now using the Cloud Run MCP server to containerize our application and deploy it. You can see it interacting with the GCP API directly."

"Once the deployment finishes, the agent doesn't just stop. The prompt asked it to run tests to ensure it's up and running. It's going to hit the live URL, verify the service is responding, and confirm the deployment was truly successful."

If the agent is still going:

"This is the power of extending the agent's capabilities. It's not just a code generator anymore; it's an operator. We went from generating code to testing it locally, and now we are orchestrating cloud infrastructure."

### After it finishes (11:00 - 11:30)

"The deployment is complete and the tests have passed. Let's open the live URL."

Open the Cloud Run URL in the browser.

"There it is, live on the internet. Fully functional, following our design system, deployed to production."

---

## Closing (11:30 - 12:00)

"Three layers, same prompt, three very different results:"

"**GEMINI.md** — the conductor. Always-on project context that defines your workflow."

"**Skills** — the specialists. On-demand expertise from your team, activated when needed."

"**MCP** — the bridge. Connects Antigravity to your real systems — design tokens today, API schemas tomorrow."

"The difference between Antigravity-generated code and production code isn't Antigravity — it's what you give it to work with. Thanks."

---

## If Things Go Wrong

If the agent hangs or produces something broken at any stage:

"Let me show you what this typically produces —"

```bash
./reset.sh X-backup   # where X is 1, 2, 3, or 4
bun dev
```

Continue with the talk track as normal. The backup has the same code you'd walk through.
