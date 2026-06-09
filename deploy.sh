#!/bin/bash
# Demo Deployment Script
# Usage: ./deploy.sh [project_id]

set -e

PROJECT_ID=$1

# If project ID is not provided as an argument, try reading from GCP_PROJECT environment variable
if [ -z "$PROJECT_ID" ]; then
  PROJECT_ID=$GCP_PROJECT
fi

# If still not found, try getting the active gcloud configured project
if [ -z "$PROJECT_ID" ]; then
  echo "No project ID provided as parameter or environment variable. Attempting to detect active gcloud project..."
  PROJECT_ID=$(gcloud config get-value project 2>/dev/null || true)
fi

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
  echo "❌ Error: Google Cloud Project ID is required."
  echo "Usage: ./deploy.sh <project_id>"
  echo "Alternatively, set the GCP_PROJECT environment variable or run 'gcloud config set project <project_id>'."
  exit 1
fi

echo "=================================================="
echo " 🚀 Deploying To-Do App to Google Cloud Run"
echo " Project ID : $PROJECT_ID"
echo " Region     : us-central1"
echo "=================================================="
echo ""

# 1. Ensure required APIs are enabled (non-destructively)
echo "Step 1: Enabling required Google Cloud APIs..."
gcloud services enable \
  serviceusage.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudresourcemanager.googleapis.com \
  cloudbuild.googleapis.com \
  --project="$PROJECT_ID"

# 2. Automatically configure GCS and Cloud Build permissions for default Compute service account
echo "Step 2: Resolving Service Account IAM Bindings..."
echo "Detecting project number..."
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
COMPUTE_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

echo "Checking and configuring IAM roles for default Compute Engine Service Account ($COMPUTE_SA)..."
ROLES=(
  "roles/storage.objectViewer"
  "roles/logging.logWriter"
  "roles/artifactregistry.reader"
  "roles/artifactregistry.writer"
)

for ROLE in "${ROLES[@]}"; do
  echo "Granting role: $ROLE..."
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$COMPUTE_SA" \
    --role="$ROLE" \
    --quiet >/dev/null || echo "Could not bind role $ROLE (it might already be bound or permissions are insufficient)."
done

# 3. Trigger the deploy
echo ""
echo "Step 3: Triggering Cloud Run source-to-service deployment..."
gcloud run deploy todo-app \
  --source . \
  --project "$PROJECT_ID" \
  --region us-central1 \
  --allow-unauthenticated

echo ""
echo "=================================================="
echo " 🎉 Deployment Finished Successfully!"
echo "=================================================="
