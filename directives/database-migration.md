# Directive: Database Migration

## Goal
Safely modify database schema.

## Steps

### 1. Plan the Change
- What tables affected?
- What columns added/modified/removed?
- Any data migration needed?

### 2. Test Locally First
- Create SQL in Supabase SQL editor
- Run on test data
- Verify results

### 3. Document the Migration
Add to `docs/technical/DATABASE.md`:
- New table/column schema
- Purpose of change
- Date of migration

### 4. Apply to Production
- Run migration in Supabase dashboard
- Verify table structure

### 5. Update API Routes
If API changes needed:
- Update relevant route handlers
- Test API responses

### 6. Update Types
If TypeScript types change:
- Update `src/types/`
- Run build to verify

### 7. Deploy Application
Follow: directives/deploy.md

## Rollback Plan
Before migrating, know how to undo:
- Keep original schema documented
- Test rollback query if destructive

## Edge Cases

### Migration Fails
- Check error message
- Verify SQL syntax
- Check permissions
