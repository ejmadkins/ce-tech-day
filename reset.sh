#!/bin/bash
# Demo Reset Script
# Usage: ./reset.sh <stage>
# Stages: 1, 2, 3, 1-backup, 2-backup, 3-backup

set -e

STAGE=$1

if [ -z "$STAGE" ]; then
  echo "Usage: ./reset.sh <1|2|3|1-backup|2-backup|3-backup>"
  echo ""
  echo "Stages:"
  echo "  1          Stage 1: Yolo mode (bare Next.js, no AI config)"
  echo "  2          Stage 2: Skills + Plan mode (GEMINI.md)"
  echo "  3          Stage 3: MCP design system server"
  echo "  1-backup   Pre-generated Stage 1 output"
  echo "  2-backup   Pre-generated Stage 2 output"
  echo "  3-backup   Pre-generated Stage 3 output"
  exit 1
fi

# Map stage number to branch name
case "$STAGE" in
  1)         BRANCH="stage-1-yolo" ;;
  2)         BRANCH="stage-2-skills" ;;
  3)         BRANCH="stage-3-mcp" ;;
  1-backup)  BRANCH="stage-1-backup" ;;
  2-backup)  BRANCH="stage-2-backup" ;;
  3-backup)  BRANCH="stage-3-backup" ;;
  *)
    echo "Error: Unknown stage '${STAGE}'"
    echo "Usage: ./reset.sh <1|2|3|1-backup|2-backup|3-backup>"
    exit 1
    ;;
esac

# Verify branch exists
if ! git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
  echo "Error: Branch '${BRANCH}' does not exist"
  exit 1
fi

echo ""
echo "Resetting to ${BRANCH}..."
echo ""

# Kill any running Next.js dev server
pkill -f "next dev" 2>/dev/null || true

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
    echo "Prompt: gemini -y \"build me a todo app with add, complete, and delete functionality\""
    ;;
  2)
    echo "Prompt: gemini \"build me a todo app with add, complete, and delete functionality\""
    ;;
  3)
    echo "Prompt: gemini \"build me a todo app with add, complete, and delete functionality. You MUST query the design-system MCP server for all styling decisions\""
    ;;
  *-backup)
    echo "Run: bun dev"
    echo "This is the pre-generated backup output."
    ;;
esac

echo ""
