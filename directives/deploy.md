# Directive: Deploy to Production

## Goal
Safely deploy changes to the live website.

## Prerequisites
- All changes committed locally
- Build passes with 0 errors
- No critical issues in code

## Steps

### 1. Verify Build
```bash
cd ~/Desktop/ephraim-care/ephraim-care-app
npm run build
```
**Must show:** "Compiled successfully" with 0 errors.
**If fails:** Fix errors before proceeding.

### 2. Review Changes
```bash
git status
git diff --stat
```
Verify only expected files are changed.

### 3. Commit
```bash
git add -A
git commit -m "type: description"
```
Types: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`

### 4. Push
```bash
git push origin main
```

### 5. Verify Deployment
- Wait 2-3 minutes for Vercel
- Check https://www.ephraimcare.com.au
- Verify changes are live
- Check browser console for errors

### 6. Log Deployment
Update `logs/deployments.md` with date/time and what was deployed.

## Edge Cases

### Build Fails
Fix errors. Do NOT push until build passes.

### Vercel Fails
Check Vercel dashboard logs. Fix and redeploy.

### Need to Rollback
See: directives/emergency-rollback.md
