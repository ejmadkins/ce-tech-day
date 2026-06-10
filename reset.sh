#!/bin/bash
# Demo Reset Script
# Usage: ./reset.sh <stage>
# Stages: 1, 2, 3, 4, 1-backup, 2-backup, 3-backup, 4-backup

set -e

STAGE=$1

if [ -z "$STAGE" ]; then
  echo "Usage: ./reset.sh <1|2|3|4|1-backup|2-backup|3-backup|4-backup>"
  echo ""
  echo "Stages:"
  echo "  1          Stage 1: Yolo mode (bare Next.js, no AI config)"
  echo "  2          Stage 2: Skills + Plan mode (GEMINI.md)"
  echo "  3          Stage 3: MCP design system server"
  echo "  4          Stage 4: Cloud Run Deployment"
  echo "  1-backup   Pre-generated Stage 1 output"
  echo "  2-backup   Pre-generated Stage 2 output"
  echo "  3-backup   Pre-generated Stage 3 output"
  echo "  4-backup   Pre-generated Stage 4 output"
  exit 1
fi

# Map stage number to branch name
case "$STAGE" in
  1)         BRANCH="stage-1-yolo" ;;
  2)         BRANCH="stage-2-skills" ;;
  3)         BRANCH="stage-3-grill" ;;
  4)         BRANCH="stage-4-deploy" ;;
  1-backup)  BRANCH="stage-1-backup" ;;
  2-backup)  BRANCH="stage-2-backup" ;;
  3-backup)  BRANCH="stage-3-grill-backup" ;;
  4-backup)  BRANCH="stage-4-backup" ;;
  *)
    echo "Error: Unknown stage '${STAGE}'"
    echo "Usage: ./reset.sh <1|2|3|4|1-backup|2-backup|3-backup|4-backup>"
    exit 1
    ;;
esac

# Verify branch exists locally or on remote
if ! git show-ref --verify --quiet "refs/heads/${BRANCH}" && ! git show-ref --verify --quiet "refs/remotes/origin/${BRANCH}"; then
  echo "Error: Branch '${BRANCH}' does not exist"
  exit 1
fi

echo ""
echo "Resetting to ${BRANCH}..."
echo ""

# Kill any running Next.js dev server
pkill -f "next dev" 2>/dev/null || true

# Kill any running MCP servers or watchdogs from previous runs
pkill -f "mcp-server/index.js" 2>/dev/null || true
pkill -f "chrome-devtools-mcp" 2>/dev/null || true

# Kill any orphaned non-interactive agy processes (sparing the active interactive -i session)
pgrep -f "agy" | while read -r pid; do
  if [ "$pid" != "$$" ] && [ "$pid" != "$PPID" ]; then
    cmd=$(ps -p "$pid" -o args= 2>/dev/null || true)
    if echo "$cmd" | grep -q "agy" && ! echo "$cmd" | grep -q -- "-i"; then
      kill -9 "$pid" 2>/dev/null || true
    fi
  fi
done


# Back up Stage 3 generated app if transitioning to Stage 4 or Stage 4-backup
PRESERVE_SRC=false
if [ "$STAGE" = "4" ] || [ "$STAGE" = "4-backup" ]; then
  if [ -d "src" ]; then
    echo "Backing up Stage 3 generated app in src/..."
    rm -rf /tmp/stage3_src_backup 2>/dev/null || true
    cp -r src /tmp/stage3_src_backup
    PRESERVE_SRC=true
  fi
  rm -rf /tmp/stage3_plans_backup 2>/dev/null || true
  mkdir -p /tmp/stage3_plans_backup
  cp *plan*.md /tmp/stage3_plans_backup/ 2>/dev/null || true
  cp *plan*.txt /tmp/stage3_plans_backup/ 2>/dev/null || true
fi

# Discard any changes and switch branch
git checkout -- . 2>/dev/null || true
git clean -fd 2>/dev/null || true
git checkout "${BRANCH}"

# Restore Stage 3 generated app if backed up
if [ "$PRESERVE_SRC" = true ] && [ -d "/tmp/stage3_src_backup" ]; then
  echo "Restoring Stage 3 generated app into src/ for deployment..."
  rm -rf src
  cp -r /tmp/stage3_src_backup src
  rm -rf /tmp/stage3_src_backup
fi
if [ -d "/tmp/stage3_plans_backup" ] && [ "$(ls -A /tmp/stage3_plans_backup 2>/dev/null)" ]; then
  cp -r /tmp/stage3_plans_backup/* . 2>/dev/null || true
  rm -rf /tmp/stage3_plans_backup
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
bun install --silent

# Install MCP server deps if present
if [ -f "mcp-server/package.json" ]; then
  echo "Installing MCP server dependencies..."
  cd mcp-server && bun install --silent && cd ..
fi

# Automatically configure GenAI & Vertex AI environment variables for local runs and builds
echo "Setting up local GenAI and Vertex credentials in .env..."
cat <<EOF > .env
GOOGLE_GENAI_USE_VERTEXAI=true
GOOGLE_CLOUD_PROJECT=ejmadkins-summit26-agy
GOOGLE_CLOUD_LOCATION=us-central1
GEMINI_MODEL=gemini-2.5-flash
EOF
cp .env .env.production
echo ""
echo "==============================="
echo "  Ready for Stage ${STAGE}!"
echo "==============================="
echo ""

case "$STAGE" in
  1)
    echo "Prompt: agy --dangerously-skip-permissions --model \"gemini-2.5-flash\" -i \"build me a todo app with add, complete, and delete functionality\""
    ;;
  2)
    echo "Prompt: agy --dangerously-skip-permissions --model \"gemini-2.5-flash\" -i \"build me a todo app with add, complete, and delete functionality\""
    ;;
  3)
    echo "Prompt: agy --dangerously-skip-permissions --model \"gemini-2.5-flash\" -i"
    echo ""
    echo "Prompts to enter inside the interactive CLI session:"
    echo "  1. Q&A Interactive Alignment:"
    echo "     let's refine and improve our todo app by adding categories, priorities, due dates, and a stats dashboard"
    echo ""
    echo "  2. Goal Execution (implements your aligned plan autonomously):"
    echo "     implement the detailed architecture plan we aligned on including categories, priorities, due dates, filters, and dynamic metrics, and verify with tests"
    ;;
  4)
    echo "Prompt: agy --dangerously-skip-permissions --model \"gemini-2.5-flash\" -i \"deploy our application to Cloud Run\""
    ;;
  *-backup)
    echo "Run: bun dev"
    echo "This is the pre-generated backup output."
    ;;
esac

echo ""
