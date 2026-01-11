#!/bin/bash
# executor: backup
# purpose: Create a timestamped backup branch before risky operations
# usage: ./executors/backup.sh [branch-suffix]

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$PROJECT_ROOT/ephraim-care-app"
TIMESTAMP=$(date '+%Y%m%d-%H%M%S')
SUFFIX="${1:-manual}"
BRANCH_NAME="backup-${SUFFIX}-${TIMESTAMP}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[BACKUP]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Main
log "Creating backup branch: $BRANCH_NAME"

cd "$APP_DIR" || exit 1

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
log "Current branch: $CURRENT_BRANCH"

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    warn "You have uncommitted changes"
    log "Staging all changes for backup..."
    git add -A
    git commit -m "WIP: Backup checkpoint before $SUFFIX"
fi

# Create backup branch
log "Creating branch..."
git branch "$BRANCH_NAME"

# Push to remote
log "Pushing backup to remote..."
git push origin "$BRANCH_NAME"

log "Backup created successfully!"
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  BACKUP COMPLETE${NC}"
echo -e "${GREEN}  Branch: $BRANCH_NAME${NC}"
echo -e "${GREEN}  Remote: origin/$BRANCH_NAME${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "To restore from backup:"
echo "  git checkout $BRANCH_NAME"
echo ""
echo "To delete backup later:"
echo "  git branch -d $BRANCH_NAME"
echo "  git push origin --delete $BRANCH_NAME"
