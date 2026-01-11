# Directive: Add New Feature

## Goal
Implement a new feature following project patterns.

## Steps

### 1. Understand the Feature
- What does it do?
- What pages/components affected?
- Any new data needed?

### 2. Plan Implementation
- List files to create/modify
- Identify dependencies
- Estimate scope

### 3. Create Components
Follow existing patterns:
- Use TypeScript
- Use Tailwind for styling
- Import from `@/components/ui/`

### 4. Create API Routes (if needed)
Location: `src/app/api/[endpoint]/route.ts`
- Handle GET/POST/PATCH
- Validate inputs
- Return proper responses

### 5. Update Database (if needed)
- Create migration in Supabase
- Document in DATABASE.md

### 6. Test Locally
```bash
npm run dev
```
Test all functionality.

### 7. Build Verify
```bash
npm run build
```
Must pass with 0 errors.

### 8. Code Review
Follow: directives/code-review.md

### 9. Deploy
Follow: directives/deploy.md

## Checklist
- [ ] Feature implemented
- [ ] Tests pass
- [ ] Build passes
- [ ] Documentation updated
- [ ] Deployed
