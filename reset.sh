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
  3)         BRANCH="stage-3-mcp" ;;
  4)         BRANCH="stage-4-deploy" ;;
  1-backup)  BRANCH="stage-1-backup" ;;
  2-backup)  BRANCH="stage-2-backup" ;;
  3-backup)  BRANCH="stage-3-backup" ;;
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


# Discard any changes and switch branch
git checkout -- . 2>/dev/null || true
git clean -fd 2>/dev/null || true
git checkout "${BRANCH}"

# Install dependencies
echo ""
echo "Installing dependencies..."
bun install --silent

# Install MCP server deps if present
if [ -f "mcp-server/package.json" ]; then
  echo "Installing MCP server dependencies..."
  cd mcp-server && bun install --silent && cd ..
fi

echo ""
echo "==============================="
echo "  Ready for Stage ${STAGE}!"
echo "==============================="
echo ""

case "$STAGE" in
  1)
    echo "Prompt: agy --dangerously-skip-permissions --model \"Gemini 3.5 Flash (Low)\" -i \"build me a todo app with add, complete, and delete functionality\""
    ;;
  2)
    echo "Prompt: agy -i \"build me a todo app with add, complete, and delete functionality\""
    ;;
  3)
    echo "Prompt: agy -i \"build me a todo app with add, complete, and delete functionality following our design system\""
    ;;
  4)
    echo "Prompt: agy -i \"deploy our application to Cloud Run\""
    ;;
  *-backup)
    echo "Run: bun dev"
    echo "This is the pre-generated backup output."
    ;;
esac

echo ""
