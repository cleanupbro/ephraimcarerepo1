# Directive: Code Review

## Goal
Ensure code quality before deployment.

## When to Use
- Before every deployment
- After significant changes
- When requested

## Steps

### 1. Run Linter
```bash
npm run lint
```
Fix any errors.

### 2. Run Build
```bash
npm run build
```
Must pass with 0 errors.

### 3. Review Changed Files
Check each file for:

**Code Quality**
- [ ] No unused imports
- [ ] No console.log in production
- [ ] No hardcoded secrets
- [ ] Proper error handling

**Security**
- [ ] No API keys in code
- [ ] Input validation
- [ ] Auth checks on protected routes

**NDIS Compliance**
- [ ] No "NDIS Approved" language
- [ ] Using "Registered NDIS Provider"

**Performance**
- [ ] Images optimized
- [ ] No unnecessary re-renders

### 4. Test Functionality
- [ ] Forms work
- [ ] Navigation works
- [ ] No console errors

## Output
Code passes all checks, ready for deployment.
