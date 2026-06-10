# Stage 3: Interactive Alignment, Planning & Goals — Presenter Notes

## What you're looking at

In this stage, we pivot away from the simple "code-generation" prompts of Stages 1 and 2 to demonstrate the true power of **Antigravity (`agy`)** as a full-fledged agentic engineering partner. 

We showcase three key agentic capabilities:
1. **Interactive Alignment (`-i` / Grill-Me)**: How `agy` interviews the developer to establish a precise product spec and design agreement instead of guessing.
2. **Structured Planning (`/planning` skill)**: How `agy` generates a complete, checkable architectural blueprint before writing code.
3. **Goal-Driven Execution (`/goal` skill)**: How `agy` autonomously executes the approved plan, modifies code, writes unit tests, and self-corrects any errors until the goal is fully accomplished.

---

## What changed from Stage 2

- **Active Collaboration**: No longer just executing one-off text prompts.
- **Interactive Prompts**: Using `agy -i` to prompt a question-and-answer dialogue.
- **Architectural Blueprints**: `stage_3_implementation_plan.md` featuring Mermaid system architecture diagrams, custom hooks, and state mappings.
- **Advanced Core Application**: A beautifully crafted, premium, self-contained task workstation with categories, priorities, overdue warning highlights, custom filters, and a real-time productivity stats dashboard.
- **High-Coverage Testing**: 20 comprehensive unit tests passing with zero errors.

---

## Live Demo Flow & Script

### 1. Reset and Show the Clean Stage
- **Action**: Switch to Stage 3:
  ```bash
  ./reset.sh 3
  ```
- **Talk Track**:
  > "We are starting Stage 3 clean. The reset script sets up the workspace and prints our target prompt. But instead of running a non-interactive `-p` command like we did before, we are going to start a dialogue."

### 2. Trigger Interactive Alignment (`agy -i`)
- **Action**: Run the interactive CLI:
  ```bash
  agy --dangerously-skip-permissions --model "Gemini 3.5 Flash (Low)" -i
  ```
  Then type `/grill-me` or enter your prompt inside the chat to initiate the alignment interview.
- **Talk Track**:
  > "Notice how Antigravity doesn't just start spitting out code. It halts, analyzes the request, and starts grilling me. It asks: *'What default categories should we support?'*, *'How should we style overdue warnings?'*, and *'Do we need local storage migrations?'* 
  > 
  > This is **Interactive Alignment**. In a real-world project, this prevents alignment gaps and ensures the agent builds exactly what the developer intends."

### 3. The Blueprint Planning Phase
- **Action**: Show the audience the plan file:
  ```bash
  cat stage_3_implementation_plan.md
  ```
- **Talk Track**:
  > "Once we align on the answers, Antigravity generates an **Implementation Plan**. This isn't code yet; it's a structural blueprint. It contains a Mermaid diagram of the component hierarchy, hook state changes, and testing specifications. 
  > 
  > We approve the plan first. If we don't like the architecture, we change it here. It treats coding like a professional engineering practice, not a game of guess-and-check."

### 4. Goal-Driven Execution
- **Action**: Run the execution loop in interactive mode:
  ```bash
  agy --dangerously-skip-permissions --model "Gemini 3.5 Flash (Low)" -i "implement the detailed architecture plan we aligned on including categories, priorities, due dates, filters, and dynamic metrics, and verify with tests"
  ```
- **Talk Track**:
  > "Now, Antigravity enters **Goal Execution** mode. It acts autonomously. It pulls in the `frontend-engineer` skill, modifies state, builds the `FilterBar` and `DashboardStats` components, and updates the unit tests.
  > 
  > If it makes a syntax mistake or a test fails, you will see it read the terminal output and **fix its own bugs** in real-time. It doesn't stop until the entire goal is met."

### 5. Visual Wow & Proof of Correctness
- **Action**: Run unit tests and start the dev server:
  ```bash
  bun test
  bun dev
  ```
- **Talk Track**:
  > "Let's run the tests. Look at that—20 out of 20 tests pass completely green! 
  > 
  > Now let's open `http://localhost:3000`. We have a fully featured, stunning Amber-themed workstation. We can add priorities, set due dates, watch overdue indicators alert us, filter by tags, and track our productivity in real-time. 
  > 
  > That is the power of Antigravity: interactive alignment, rigorous planning, and flawless autonomous execution."
