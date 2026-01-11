#!/bin/bash
# executor: reset-dev
# purpose: Reset development environment to clean state
# usage: ./executors/reset-dev.sh

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$PROJECT_ROOT/ephraim-care-app"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[RESET]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Confirmation
echo ""
echo -e "${YELLOW}=========================================="
echo "  DEVELOPMENT ENVIRONMENT RESET"
echo "==========================================${NC}"
echo ""
echo "This will:"
echo "  - Delete node_modules"
echo "  - Delete .next build cache"
echo "  - Reinstall dependencies"
echo "  - NOT touch .env.local or src/"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

cd "$APP_DIR" || exit 1

# Step 1: Remove node_modules
log "Removing node_modules..."
rm -rf node_modules

# Step 2: Remove .next
log "Removing .next build cache..."
rm -rf .next

# Step 3: Clear npm cache
log "Clearing npm cache..."
npm cache clean --force

# Step 4: Reinstall dependencies
log "Installing dependencies..."
npm install

# Step 5: Verify
log "Running build test..."
if npm run build; then
    log "Build successful"
else
    echo -e "${RED}[ERROR]${NC} Build failed after reset"
    exit 1
fi

echo ""
echo -e "${GREEN}=========================================="
echo "  RESET COMPLETE"
echo "==========================================${NC}"
echo ""
echo "Development environment has been reset."
echo "Run 'npm run dev' to start development server."
