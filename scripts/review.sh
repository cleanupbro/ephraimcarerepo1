#!/bin/bash
# EPHRAIM CARE - Auto Code Review
# Triggers after every build to critique changes

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Get changes info
CHANGES=$(git diff --name-only HEAD~1 2>/dev/null | tr '\n' ', ' | sed 's/,$//')
COMMIT_MSG=$(git log -1 --pretty=%B 2>/dev/null | head -1)

if [ -z "$CHANGES" ]; then
    CHANGES="No recent changes"
fi

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="No commit message"
fi

echo ""
echo -e "${CYAN}==========================================${NC}"
echo -e "${CYAN}   🔍 CODE REVIEW - $(date '+%H:%M:%S')   ${NC}"
echo -e "${CYAN}==========================================${NC}"
echo ""
echo -e "${BLUE}📁 Files:${NC} $CHANGES"
echo -e "${BLUE}📝 Commit:${NC} $COMMIT_MSG"
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ Dev server not running. Starting...${NC}"
    npm run dev &
    sleep 8
fi

# Call review API
echo -e "${YELLOW}🤖 Calling AI reviewers...${NC}"
echo ""

REVIEW_RESPONSE=$(curl -s http://localhost:3000/api/review -X POST \
  -H "Content-Type: application/json" \
  -d "{\"changes\": \"$CHANGES\", \"commit\": \"$COMMIT_MSG\"}" 2>/dev/null)

if [ -z "$REVIEW_RESPONSE" ]; then
    echo -e "${RED}❌ Review API not responding${NC}"
    exit 1
fi

# Parse and display reviews
echo "$REVIEW_RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data.get('success'):
        for review in data.get('reviews', []):
            persona = review.get('persona', 'Unknown')
            review_type = review.get('type', '')
            text = review.get('review', review.get('error', 'No review'))
            print(f'{persona} ({review_type}):')
            print(f'  \"{text}\"')
            print()

        summary = data.get('summary', {})
        print(f'📊 Summary: {summary.get(\"completed\", \"N/A\")}')
        print(f'⭐ Rating: {summary.get(\"stars\", \"N/A\")} ({summary.get(\"rating\", 0)}/5)')
    else:
        print(f'Error: {data.get(\"error\", \"Unknown error\")}')
except Exception as e:
    print(f'Parse error: {e}')
"

echo ""
echo -e "${CYAN}==========================================${NC}"
echo ""
