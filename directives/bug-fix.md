# Directive: Fix a Bug

## Goal
Identify and fix a bug safely.

## Steps

### 1. Reproduce the Bug
- What are the steps to reproduce?
- What is expected behavior?
- What is actual behavior?

### 2. Identify the Cause
- Check browser console
- Check server logs
- Read error messages
- Find the problematic code

### 3. Fix the Bug
- Make minimal changes
- Don't refactor unrelated code
- Add comments if fix is non-obvious

### 4. Test the Fix
```bash
npm run dev
```
- Verify bug is fixed
- Verify no new bugs introduced

### 5. Build Verify
```bash
npm run build
```
Must pass.

### 6. Log the Fix
Update `logs/errors.md` with:
- What the bug was
- What caused it
- How it was fixed

### 7. Deploy
Follow: directives/deploy.md

## Edge Cases

### Can't Reproduce
- Get more details
- Check different browsers
- Check mobile vs desktop

### Fix Breaks Something Else
- Revert the fix
- Investigate more
- Try different approach
