# Demo Talk Track

Target: under 12 minutes. Times are approximate.

---

## Opening (0:00 - 0:30)

"AI coding tools are incredible — you give them a prompt, they write code, it works. But there's a gap between 'it works' and 'I'd ship this.' Today I'm going to show you how to close that gap using three features of Antigravity CLI: rules, skills, and MCP servers. Same prompt, three times, three very different results."

---

## Stage 1: The Yolo (0:30 - 3:00)

### Before running (0:30 - 1:00)

"Let's start with the baseline. I have a fresh Next.js project — nothing special, just what you get from create-next-app."

```bash
./reset.sh 1
```

"No .antigravity.md, no skills, no configuration. Just a blank canvas and a prompt."

### Run the agent (1:00 - 1:15)

```bash
agy --dangerously-skip-permissions "build me a todo app with add, complete, and delete functionality"
```

"Notice the `-y` flag — that's yolo mode. It's going to auto-approve everything and just go."

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

"Would you approve this in a code review? Would you ship this? This is what I call AI slop — technically functional, practically useless."

---

## Stage 2: Skills (3:00 - 6:00)

### Before running (3:00 - 3:45)

```bash
./reset.sh 2
```

"Same starting point, but now we've added two things."

Open `.antigravity.md`:

"First, .antigravity.md — this is always-on project context. Think of it as the conductor. It tells the AI: here's our project structure, and here's the workflow — plan first, then build components using the frontend-engineer skill, then write tests using the test-engineer skill."

Open `.agents/skills/` directory:

"Second, skills. These are on-demand specialists that activate when they're needed."

Open `.agents/skills/frontend-engineer/SKILL.md`:

"The frontend-engineer skill packages everything a senior frontend dev knows — component architecture, TypeScript patterns, accessibility requirements, styling conventions."

Open `.agents/skills/test-engineer/SKILL.md`:

"The test-engineer skill packages testing expertise — what to test, how to use React Testing Library, testing patterns."

"Different team members can own different skills. Your accessibility lead writes the a11y guidance. Your test lead writes the testing patterns. It's institutional knowledge, packaged and reusable."

### Run the agent (3:45 - 4:00)

```bash
agy "build me a todo app with add, complete, and delete functionality"
```

"Same prompt. No `-y` this time — we want it to plan first."

### [WHILE BUILDING] (4:00 - 5:15)

"Notice it's planning before it writes code. It's thinking about the component hierarchy."

"Watch the skills activate — the frontend-engineer skill kicks in when it starts building components. It knows to create separate files, use proper TypeScript interfaces, add ARIA labels."

If agent is still going:

"The key insight here is that we didn't write more code. We didn't add any dependencies. We just told the AI how our team works. That's it. A few markdown files."

"Think about onboarding. When a new developer joins your team, you don't hand them a blank editor and say 'good luck.' You give them your coding standards, your patterns, your conventions. Skills are the same thing — but for your AI tools."

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

"Same prompt, dramatically better code. The AI activated the right specialist at the right time."

---

## Stage 3: MCP (6:00 - 9:00)

### Before running (6:00 - 7:00)

```bash
./reset.sh 3
```

"We've got great code now, but it still looks like every other Tailwind app. In production, you have a design system — brand colors, typography, spacing rules. How do you get the AI to follow it?"

Open `.agents/mcp_config.json`:

"MCP — Model Context Protocol. It lets the AI connect to external tools and systems. Here we've configured two MCP servers: one for our design system, and another for Chrome DevTools. This second server gives the agent eyes — it can run a browser, navigate to our local app, and take screenshots to visually inspect its work."

Open `mcp-server/index.js` and scroll through:

"This is a simple Node.js server that exposes two tools. `get_design_tokens` returns our color palette, typography, spacing — everything the AI needs to style components correctly. `get_component_spec` returns specific styling for buttons, cards, inputs, checkboxes."

Point at the color values:

"Amber primary, warm stone text, off-white background. This isn't Tailwind blue — this is our brand."

Open `.antigravity.md`:

".antigravity.md now has two new steps in the workflow: query the design system before building, and visually verify the app in the browser after building. And the frontend-engineer skill tells the agent to always check the design tokens and then verify they look correct in the browser."

"The AI doesn't guess at colors — it asks, and it checks its work."

### Run the agent (7:00 - 7:15)

```bash
agy "build me a todo app with add, complete, and delete functionality. You MUST query the design-system MCP server for all styling decisions"
```

### [WHILE BUILDING] (7:15 - 8:15)

"Watch for the MCP tool calls — you'll see it query `get_design_tokens` and `get_component_spec`. It's pulling our actual design system before writing any CSS. And once it's done building, it will launch a browser via Chrome DevTools, navigate to localhost, and take a screenshot to make sure everything rendered correctly."

"This is where it gets powerful. Those MCP servers connect the AI to our real systems and tools — design tokens, testing runners, browser viewport. Any system your team uses can become a tool the AI queries or controls."

If agent is still going:

"Think about what this means for your workflow. Your design team updates the design system, and every AI-assisted build automatically uses the latest tokens. No copy-pasting hex codes. No 'which blue are we using again?' The single source of truth is the MCP server."

"And this isn't limited to design. You could have an MCP server that serves your API contract, so the AI generates correct fetch calls. Or one that serves your database schema, so it writes correct queries. The pattern is the same."

### After it finishes (8:15 - 9:00)

```bash
bun dev
```

"Look at that. Warm amber palette, custom checkboxes, progress bar — this looks like it was built by a team with a style guide. Because it was."

Quick visual comparison:
- "Stage 1: generic, sloppy, one file"
- "Stage 2: well-engineered, but still looks like a template"
- "Stage 3: branded, polished, production-ready"

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
agy "deploy the app to google cloud run using the cloud-run mcp server, and then run tests to make sure everything is up and running as expected"
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

"**.antigravity.md** — the conductor. Always-on project context that defines your workflow."

"**Skills** — the specialists. On-demand expertise from your team, activated when needed."

"**MCP** — the bridge. Connects the AI to your real systems — design tokens today, API schemas tomorrow."

"The difference between AI-generated code and production code isn't the AI — it's what you give it to work with. Thanks."

---

## If Things Go Wrong

If the agent hangs or produces something broken at any stage:

"Let me show you what this typically produces —"

```bash
./reset.sh X-backup   # where X is 1, 2, 3, or 4
bun dev
```

Continue with the talk track as normal. The backup has the same code you'd walk through.
