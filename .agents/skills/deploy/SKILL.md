---
name: deploy
description: Use this skill when deploying or managing Google Cloud Run services. Provides detailed guidance on using the Cloud Run MCP server and verified tests.
---

# Deploy & Verify Skill

You are a Google Cloud Run and Model Context Protocol (MCP) Architect. Follow this guidance to deploy, inspect, and verify Next.js applications using the Cloud Run MCP server.

## 🚀 Cloud Run MCP Server Integration

The `cloud-run` MCP server provides a standardized, agent-native interface to manage Cloud Run deployments without relying on shell commands.

### Core MCP Tools
*   `list_services(projectId, region)`: Lists all active services in the specified project and region.
*   `get_service(projectId, region, serviceName)`: Retrieves configuration, active URL, and deployment status.
*   `get_service_log(projectId, region, serviceName, limit)`: Fetches container logs and errors.
*   `deploy_service_from_image(projectId, region, serviceName, image, ...)`: Deploys a pre-built container from Artifact Registry.

---

## 📋 Deployment Workflow using MCP

When executing Stage 4 deployments or diagnostic reviews:

### Step 1: Discover & Verify
Before provisioning, inspect the existing environment using MCP tools to avoid collisions:
1. Use `list_services` to verify if a service named `todo-app` already exists in `us-central1`.
2. Retrieve the active configuration of any existing instance with `get_service`.

### Step 2: Source Code Packaging & Deployment
Since our application is vibe-coded locally:
1. Verify the project compiled successfully locally using `bun run build`.
2. Initiate deployment. (If deploying from source, ensure the buildpack triggers a Next.js production build using Bun).

### Step 3: Deployment Monitoring & Details
1. Monitor the service until it changes to a ready/serving state.
2. Call `get_service` to extract the live, active `uri` of the service.
3. Call `get_service_log` with a limit of `50` to verify the container startup logs are healthy.

---

## 🧪 Post-Deployment Verification Tests

Always run these verification tests immediately after deployment to ensure zero friction:

### Test A: HTTP Content & Brand Verification
Verify that the service is serving our premium To-Do app rather than the Next.js default starter page:
```bash
curl -s <SERVICE_URL> | grep -E -q "What's on your plate\?|What&#x27;s on your plate\?" && echo "✅ Brand check passed!" || echo "❌ Brand check failed!"
```

### Test B: Next.js Production Hydration Check
Verify that CSS styles and critical static chunks are resolved correctly by fetching the main page and searching for Turbopack/Next assets:
```bash
curl -s <SERVICE_URL> | grep -q "next/static" && echo "✅ Next.js optimization check passed!" || echo "❌ Next.js optimization check failed!"
```

### Test C: Container Startup Log Audit
Check the service log via MCP to ensure there are no silent runtime errors (e.g., uncaught exceptions or missing modules):
1. Query `get_service_log` via the MCP server.
2. Verify the log contains Next.js startup messages:
   * `✓ Ready in`
   * `▲ Next.js`
   * `Starting production server...`
