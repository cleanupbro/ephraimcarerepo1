#!/bin/bash
# executor: deploy
# purpose: Full deployment pipeline - build, verify, commit, push
# usage: ./executors/deploy.sh [commit-message]

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$PROJECT_ROOT/ephraim-care-app"
LOG_FILE="$PROJECT_ROOT/logs/deployments.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log() {
    echo -e "${GREEN}[DEPLOY]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

log_deployment() {
    echo "" >> "$LOG_FILE"
    echo "## Deployment - $TIMESTAMP" >> "$LOG_FILE"
    echo "- Status: $1" >> "$LOG_FILE"
    echo "- Commit: $2" >> "$LOG_FILE"
    echo "- Message: $3" >> "$LOG_FILE"
}

# Main
log "Starting deployment pipeline..."

# Step 1: Check working directory
cd "$APP_DIR" || error "Cannot access app directory"
log "Working in: $APP_DIR"

# Step 2: Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    log "Found uncommitted changes"
else
    warn "No changes to deploy"
    exit 0
fi

# Step 3: Run build
log "Running production build..."
if npm run build; then
    log "Build successful"
else
    error "Build failed - fix errors before deploying"
fi

# Step 4: Get commit message
COMMIT_MSG="${1:-Auto-deploy: $(date '+%Y-%m-%d %H:%M')}"
log "Commit message: $COMMIT_MSG"

# Step 5: Stage and commit
log "Staging changes..."
git add -A

log "Creating commit..."
git commit -m "$COMMIT_MSG

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

COMMIT_HASH=$(git rev-parse --short HEAD)
log "Committed: $COMMIT_HASH"

# Step 6: Push to remote
log "Pushing to origin/main..."
git push origin main

# Step 7: Log deployment
log_deployment "SUCCESS" "$COMMIT_HASH" "$COMMIT_MSG"

log "Deployment complete!"
log "Vercel will auto-deploy from main branch"
log "Check: https://vercel.com/dashboard"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  DEPLOYMENT SUCCESSFUL${NC}"
echo -e "${GREEN}  Commit: $COMMIT_HASH${NC}"
echo -e "${GREEN}========================================${NC}"
