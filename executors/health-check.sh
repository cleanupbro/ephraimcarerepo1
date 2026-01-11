#!/bin/bash
# executor: health-check
# purpose: Verify system health - build, dependencies, env vars
# usage: ./executors/health-check.sh

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$PROJECT_ROOT/ephraim-care-app"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0
WARN=0

check_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
    ((PASS++))
}

check_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    ((FAIL++))
}

check_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
    ((WARN++))
}

# Main
echo ""
echo "=========================================="
echo "  EPHRAIM CARE HEALTH CHECK"
echo "=========================================="
echo ""

cd "$APP_DIR" || exit 1

# Check 1: Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    check_pass "Node.js installed: $NODE_VERSION"
else
    check_fail "Node.js not found"
fi

# Check 2: npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    check_pass "npm installed: $NPM_VERSION"
else
    check_fail "npm not found"
fi

# Check 3: Dependencies
echo "Checking dependencies..."
if [[ -d "node_modules" ]]; then
    check_pass "node_modules exists"
else
    check_warn "node_modules missing - run: npm install"
fi

# Check 4: Environment file
echo "Checking environment..."
if [[ -f ".env.local" ]]; then
    check_pass ".env.local exists"

    # Check critical env vars
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        check_pass "SUPABASE_URL configured"
    else
        check_fail "SUPABASE_URL missing"
    fi

    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        check_pass "SUPABASE_ANON_KEY configured"
    else
        check_fail "SUPABASE_ANON_KEY missing"
    fi
else
    check_fail ".env.local missing"
fi

# Check 5: Git status
echo "Checking git..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    BRANCH=$(git branch --show-current)
    check_pass "Git repo initialized, branch: $BRANCH"

    if git remote -v | grep -q "origin"; then
        check_pass "Remote origin configured"
    else
        check_warn "No remote origin"
    fi
else
    check_fail "Not a git repository"
fi

# Check 6: Build test
echo "Checking build..."
if npm run build > /dev/null 2>&1; then
    check_pass "Build successful"
else
    check_fail "Build failed - run: npm run build"
fi

# Summary
echo ""
echo "=========================================="
echo "  HEALTH CHECK SUMMARY"
echo "=========================================="
echo -e "${GREEN}Passed:${NC}  $PASS"
echo -e "${YELLOW}Warnings:${NC} $WARN"
echo -e "${RED}Failed:${NC}  $FAIL"
echo "=========================================="
echo ""

if [[ $FAIL -gt 0 ]]; then
    echo -e "${RED}Health check failed. Fix issues before proceeding.${NC}"
    exit 1
else
    echo -e "${GREEN}Health check passed!${NC}"
    exit 0
fi
