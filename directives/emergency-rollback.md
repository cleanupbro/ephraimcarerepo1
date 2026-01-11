# Directive: Emergency Rollback

## Goal
Quickly revert production to a working state.

## When to Use
- Production is broken
- Critical bug discovered
- Urgent need to undo deployment

## Steps

### 1. Identify Last Good Commit
```bash
cd ~/Desktop/ephraim-care/ephraim-care-app
git log --oneline -10
```
Find the commit hash before the problem.

### 2. Revert (Quick - Single Commit)
```bash
git revert HEAD --no-edit
git push origin main
```

### 3. Revert (Multiple Commits)
```bash
git revert <commit-hash>..HEAD --no-edit
git push origin main
```

### 4. Verify Rollback
- Wait for Vercel deployment (2-3 min)
- Check production site
- Verify issue is resolved

### 5. Log Incident
Update `logs/errors.md` with:
- Date/time
- What went wrong
- How it was fixed

## Do NOT
- Force push to main
- Delete commits
- Panic

## After Rollback
1. Investigate root cause
2. Fix in a branch
3. Test thoroughly
4. Deploy fix when ready
