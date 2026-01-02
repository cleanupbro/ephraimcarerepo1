#!/bin/bash
# EPHRAIM CARE - Automated Deployment Script
# Usage: ./scripts/deploy.sh [message]

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project root
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   EPHRAIM CARE DEPLOYMENT SCRIPT      ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Check git status
echo -e "${YELLOW}[1/7] Checking git status...${NC}"
BRANCH=$(git branch --show-current)
echo "Current branch: $BRANCH"

if [ "$BRANCH" != "main" ]; then
    echo -e "${RED}ERROR: Not on main branch. Switch to main first.${NC}"
    exit 1
fi

# Step 2: Check for changes
echo -e "${YELLOW}[2/7] Checking for changes...${NC}"
CHANGES=$(git status --porcelain)
if [ -z "$CHANGES" ]; then
    echo "No changes to commit."
    NEEDS_COMMIT=false
else
    echo "Changes detected:"
    git status --short
    NEEDS_COMMIT=true
fi

# Step 3: Run build
echo -e "${YELLOW}[3/7] Running build test...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed. Fix errors before deploying.${NC}"
    exit 1
fi

# Step 4: Commit changes
if [ "$NEEDS_COMMIT" = true ]; then
    echo -e "${YELLOW}[4/7] Committing changes...${NC}"

    # Get commit message
    if [ -n "$1" ]; then
        COMMIT_MSG="$1"
    else
        COMMIT_MSG="Deploy: $(date '+%Y-%m-%d %H:%M')"
    fi

    git add .
    git commit -m "$COMMIT_MSG

🤖 Generated with Claude Code" || true
    echo -e "${GREEN}✓ Changes committed${NC}"
else
    echo -e "${YELLOW}[4/7] Skipping commit (no changes)${NC}"
fi

# Step 5: Pull remote changes
echo -e "${YELLOW}[5/7] Pulling remote changes...${NC}"
if git pull origin main --rebase; then
    echo -e "${GREEN}✓ Synced with remote${NC}"
else
    echo -e "${RED}Merge conflicts detected. Resolve and run again.${NC}"
    exit 1
fi

# Step 6: Push to GitHub
echo -e "${YELLOW}[6/7] Pushing to GitHub...${NC}"
if git push origin main; then
    echo -e "${GREEN}✓ Pushed to GitHub${NC}"
else
    echo -e "${RED}Push failed.${NC}"
    exit 1
fi

# Step 7: Generate report
echo -e "${YELLOW}[7/7] Generating deployment report...${NC}"

COMMIT_HASH=$(git rev-parse --short HEAD)
COMMIT_MSG=$(git log -1 --pretty=%B | head -1)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   DEPLOYMENT SUCCESSFUL               ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Commit:     ${BLUE}$COMMIT_HASH${NC}"
echo -e "Message:    $COMMIT_MSG"
echo -e "Branch:     main"
echo -e "Time:       $TIMESTAMP"
echo ""
echo -e "URLs:"
echo -e "  Preview:    ${BLUE}https://ephraimcarerepo1.vercel.app${NC}"
echo -e "  Production: ${BLUE}https://www.ephraimcare.com.au${NC}"
echo -e "  GitHub:     ${BLUE}https://github.com/cleanupbro/ephraimcarerepo1${NC}"
echo ""
echo -e "${YELLOW}Vercel will auto-deploy. Check dashboard for status.${NC}"
echo ""

# Save report to file
cat > "$PROJECT_ROOT/LAST_DEPLOY.md" << EOF
# Last Deployment

- **Status:** ✅ SUCCESS
- **Commit:** $COMMIT_HASH
- **Message:** $COMMIT_MSG
- **Branch:** main
- **Time:** $TIMESTAMP

## URLs
- Preview: https://ephraimcarerepo1.vercel.app
- Production: https://www.ephraimcare.com.au
- GitHub: https://github.com/cleanupbro/ephraimcarerepo1

## Verification Checklist
- [ ] Homepage loads
- [ ] Service pages work
- [ ] Referral form submits
- [ ] Contact form submits
- [ ] Images load correctly
EOF

echo -e "${GREEN}Report saved to LAST_DEPLOY.md${NC}"
