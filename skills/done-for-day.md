# Done For The Day Skill

> End-of-session backup routine - saves everything to GitHub
> Priority: CRITICAL

---

## Triggers

Say any of these to run the full backup routine:
- "done for the day"
- "done for today"
- "save everything"
- "end session"

---

## What Happens Automatically

```
1. UPDATE WORKSPACE FILES
   ├── MEMORY.md → Current state, version, last action
   ├── HANDOFF.md → Session summary, files changed
   ├── CLIENT_SUMMARY.md → If client work was done
   └── AI_CONFIG/*.md → Update state sections

2. STAGE ALL CHANGES
   └── git add -A

3. COMMIT WITH SESSION SUMMARY
   └── git commit -m "session(YYYY-MM-DD): [summary of work done]"

4. PUSH TO GITHUB
   └── git push origin main

5. CONFIRM BACKUP
   └── "Session saved to GitHub. Commit: [hash]"
```

---

## Steps

### 1. Update Memory Files

Update MEMORY.md with:
- **Date:** [today's date]
- **Action:** [summary of session work]
- **Files:** [list of modified files]
- **State:** [build status]
- **Next:** [what to do next session]

### 2. Update Handoff

Update HANDOFF.md with:
- Session number (increment)
- What was done this session
- Files modified
- Context for next AI

### 3. Check for Uncommitted Changes

```bash
git status
```

If changes exist, proceed. If no changes, report "No changes to commit."

### 4. Stage All Changes

```bash
git add -A
```

### 5. Create Session Commit

```bash
git commit -m "$(cat <<'EOF'
session(YYYY-MM-DD): [session summary]

Changes:
- [bullet point changes]

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### 6. Push to GitHub

```bash
git push origin main
```

### 7. Confirm Backup

Report to user:
- Commit hash
- Number of files changed
- GitHub is now synced

---

## Success Message

```
Session saved to GitHub
Commit: [hash]
Files backed up: [count]
GitHub synced. Safe to close.
```

---

## Why This Matters

| Problem | Solution |
|---------|----------|
| Forgot to commit changes | Auto-commits on "done for the day" |
| Lost work between sessions | Everything pushed to GitHub |
| Context lost for next session | MEMORY.md and HANDOFF.md updated |
| No record of what was done | Commit message documents session |

---

## Example Usage

**User says:** "done for the day"

**Claude does:**
1. Updates MEMORY.md with today's work
2. Updates HANDOFF.md with session summary
3. Runs `git add -A`
4. Commits: `session(2026-01-16): GitHub version control brain implementation`
5. Pushes to origin main
6. Reports: "Session saved. Commit abc1234. 5 files backed up."

---

## Related Skills

- `backup.md` - Manual backup trigger
- `sync.md` - Sync between local and GitHub
- `deploy.md` - Deploy to Vercel
