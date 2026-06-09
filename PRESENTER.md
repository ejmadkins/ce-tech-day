# Presenter Master Guide: "From Yolo to Production"

This master guide walks you through the comprehensive end-to-end setup and stage progression for the **"From Yolo to Production"** Next.js demo.

---

## 🚀 Pre-Demo Setup (Essential)

Before presenting, make sure your Google Cloud project is fully prepared. Running this script once ensures that all required APIs are active, IAM policies are correctly configured, and permission blockers (such as Cloud Build GCS access issues) are resolved.

Run the setup script from the repository root:
```bash
./deploy.sh [YOUR_PROJECT_ID]
```

> [!NOTE]
> * If no project ID is provided, the script automatically detects your active `gcloud` configuration project.
> * This script is a **setup helper** to prepare the sandbox environment. During Stage 4 of the actual demo, you will show how to deploy and manage services elegantly using the **Cloud Run MCP server**.

---

## 🎮 Stage-by-Stage Progression

Each stage is mapped to a Git branch. You can reset to any stage instantly using the `./reset.sh` script:

### Stage 1: Yolo Mode (Bare Next.js)
* **Reset Command**: `./reset.sh 1` (or `./reset.sh 1-backup` for pre-generated code)
* **Goal**: Prompt the AI to build a basic To-Do app with zero guardrails.
* **Prompt**: 
  ```text
  agy --dangerously-skip-permissions "build me a todo app with add, complete, and delete functionality"
  ```
* **Key Talking Points**:
  * The AI builds a single, large file with generic/plain styling.
  * No component architecture, no strict types, and zero tests.
  * Highlight the risk of "vibe-coding" without organizational standards.

---

### Stage 2: Guided Mode (Skills + Plan)
* **Reset Command**: `./reset.sh 2` (or `./reset.sh 2-backup` for pre-generated code)
* **Goal**: Enable specialized guidelines (skills) and structured workflow planning.
* **Prompt**: 
  ```text
  agy "build me a todo app with add, complete, and delete functionality"
  ```
* **Key Talking Points**:
  * **Structured Plan**: The agent first generates an implementation plan (`.antigravity.md`) before writing any code.
  * **Expert Guidance**: The agent uses the `frontend-engineer` skill for clean component separation and strict types, and the `test-engineer` skill for automatic unit test coverage.

---

### Stage 3: Enterprise Design System (MCP + Browser Verification)
* **Reset Command**: `./reset.sh 3` (or `./reset.sh 3-backup` for pre-generated code)
* **Goal**: Force the AI to adhere to an enterprise design system served via MCP.
* **Prompt**: 
  ```text
  agy "build me a todo app with add, complete, and delete functionality following our design system"
  ```
* **Key Talking Points**:
  * **Zero Guesswork**: The agent is blocked from styling until it queries the design system MCP server via `get_design_tokens` and `get_component_spec`.
  * **Premium Aesthetics**: It produces a stunning, warm amber-tinted interface, custom checkbox SVG animations, and completion progress bars.
  * **Visual Feedback**: The agent runs the browser using the `chrome-devtools` MCP server, taking screenshots to visually verify colors and layouts.

---

### Stage 4: Production Deployment (Cloud Run MCP Integration)
* **Reset Command**: `./reset.sh 4` (or `./reset.sh 4-backup` for pre-generated code)
* **Goal**: Provision, manage, and verify a Google Cloud Run service directly via the Cloud Run MCP server.
* **Prompt**:
  ```text
  agy "deploy our application to Cloud Run"
  ```
* **Key Talking Points**:
  * **Agent-Native Control**: No more running manual `gcloud` shell commands. The agent uses the `cloud-run` MCP server tools (like `list_services` and `deploy_service_from_image`) to manage infrastructure.
  * **Deploy Skill**: The agent activates the `deploy` skill, providing robust architectural guidance on project discovery, image-to-service mapping, and automated post-deployment checks.

---

## 🧪 Post-Deployment Verification Tests

Once Stage 4 completes, use the following verified tests from our `deploy` skill to demonstrate a zero-friction deployment to the audience:

### Test 1: Brand Verification
Verify the container serves your customized, polished design rather than the generic Next.js starting template:
```bash
curl -s <YOUR_SERVICE_URL> | grep -E -q "What's on your plate\?|What&#x27;s on your plate\?" && echo "✅ Brand check passed!" || echo "❌ Brand check failed!"
```

### Test 2: Asset Optimization Check
Verify that Turbopack / Next.js static assets and CSS files compile and resolve correctly:
```bash
curl -s <YOUR_SERVICE_URL> | grep -q "next/static" && echo "✅ Asset optimization check passed!" || echo "❌ Asset optimization check failed!"
```

### Test 3: Live Service Log Audit
Directly query container logs from the MCP server to ensure zero node startup failures:
1. Ask the agent: *"Show me the container startup logs for our service."*
2. Verify the log returns:
   * `✓ Ready in`
   * `Starting production server...`
