#!/bin/bash
# executor: db-migrate
# purpose: Run database migrations (placeholder - uses Supabase dashboard)
# usage: ./executors/db-migrate.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "=========================================="
echo "  DATABASE MIGRATION GUIDE"
echo "=========================================="
echo ""
echo -e "${YELLOW}Note: Ephraim Care uses Supabase for database.${NC}"
echo -e "${YELLOW}Migrations are run via the Supabase Dashboard.${NC}"
echo ""
echo -e "${BLUE}Steps to migrate:${NC}"
echo ""
echo "1. Open Supabase Dashboard:"
echo "   https://supabase.com/dashboard"
echo ""
echo "2. Select the Ephraim Care project"
echo ""
echo "3. Go to SQL Editor"
echo ""
echo "4. Run your migration SQL"
echo ""
echo "5. Verify in Table Editor"
echo ""
echo "6. Update docs/technical/DATABASE.md"
echo ""
echo -e "${GREEN}For detailed steps, see:${NC}"
echo "   directives/database-migration.md"
echo ""
echo "=========================================="

# Check for migration files
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MIGRATIONS_DIR="$PROJECT_ROOT/ephraim-care-app/supabase/migrations"

if [[ -d "$MIGRATIONS_DIR" ]]; then
    echo ""
    echo "Found migration files:"
    ls -la "$MIGRATIONS_DIR"
else
    echo ""
    echo "No local migration files found."
    echo "Create them in: ephraim-care-app/supabase/migrations/"
fi
