# Done For The Day - Sealed Universe Protocol

> End-of-session handoff routine for seamless AI continuity
> Priority: CRITICAL

---

## Triggers

Run this protocol when user says:
- "done for the day"
- "done for today"
- "done"
- "end session"
- "wrap up"

---

## Protocol Steps

```
1. DISPLAY SESSION SUMMARY (visual box)

2. UPDATE PROTOCOL FILES
   ├── STATUS.md → Rewrite with current state + next priorities
   ├── LOG.md → Append session entry
   └── PLAN.md → Update checkboxes if milestones completed

3. COMMIT & PUSH
   ├── git add .
   ├── git commit -m "session(YYYY-MM-DD): [summary]"
   └── git push origin main

4. CONFIRM
   └── Display commit hash + "Safe to close"
```

---

## Step 1: Visual Session Summary

**Display this FIRST:**

```
╔══════════════════════════════════════════════════════════════╗
║                    SESSION SUMMARY                           ║
╠══════════════════════════════════════════════════════════════╣
║ Date: [YYYY-MM-DD]                                           ║
║ Project: EphraimCare                                         ║
╠══════════════════════════════════════════════════════════════╣
║ COMPLETED:                                                   ║
║ ├── 1. [task 1]                                             ║
║ ├── 2. [task 2]                                             ║
║ └── 3. [task n]                                             ║
╠══════════════════════════════════════════════════════════════╣
║ FILES CHANGED: [count]                                       ║
╠══════════════════════════════════════════════════════════════╣
║ NEXT SESSION:                                                ║
║ └── [Priority task for next session]                        ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Step 2: Update STATUS.md

**Rewrite the entire file:**

```markdown
# STATUS: EphraimCare
*Last Sync: [YYYY-MM-DD HH:MM]*

## ACTIVE FOCUS
- **Last Completed**: [What was just finished]
- **Next Priority**: [What to do next session]
- **Blockers**: [Any blockers, or "None"]

## LAST SESSION ([YYYY-MM-DD])
- [Bullet 1 of what was done]
- [Bullet 2 of what was done]
- [Bullet 3 if applicable]

## NEXT SESSION PRIORITIES
1. [First priority]
2. [Second priority if known]

## CRITICAL RULES
1. **Boundaries**: This folder is a sealed universe.
2. **Structure**: Product → `src/`, Bots → `agents/`
3. **Memory**: Read this file first. Never trust chat history.
4. **Deploy**: Auto-deploys from `main` via Vercel.

## QUICK REFERENCE
| Key | Value |
|-----|-------|
| Live URL | https://www.ephraimcare.com.au |
| Admin | https://www.ephraimcare.com.au/admin |
| Build | `cd src && npm run build` |
| Dev | `cd src && npm run dev` |
```

---

## Step 3: Append to LOG.md

**Add these lines at the end:**

```markdown
[YYYY-MM-DD HH:MM] | SESSION END | [Brief 5-10 word summary]
[YYYY-MM-DD HH:MM] | COMPLETED | [Comma-separated list of tasks]
[YYYY-MM-DD HH:MM] | NEXT | [Priority for next session]
```

---

## Step 4: Update PLAN.md (if needed)

Check if any roadmap items were completed. If so, change `[ ]` to `[x]`.

---

## Step 5: Commit & Push

```bash
# Stage all changes
git add .

# Commit with session summary
git commit -m "$(cat <<'EOF'
session(YYYY-MM-DD): [brief summary]

Completed:
- [task 1]
- [task 2]

Next: [priority for next session]

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"

# Push to remote
git push origin main
```

---

## Step 6: Confirm

Display:
```
✅ Session saved to GitHub
   Commit: [hash]
   Files changed: [count]

Safe to close. Next AI will pick up from STATUS.md.
```

---

## Important: Gathering Session Context

Before running this protocol, Claude must:

1. **Review conversation** - What tasks were discussed/completed?
2. **Check git status** - What files were modified?
3. **Ask user** - "What should be the priority for next session?" (if unclear)

---

## Why This Matters

| Problem | Solution |
|---------|----------|
| Context lost between sessions | STATUS.md captures state |
| AI doesn't know what happened | LOG.md has full history |
| Forgot what's next | NEXT SESSION PRIORITIES in STATUS.md |
| Work not saved | Auto-commits and pushes to GitHub |

---

## Example

**User:** "done for the day"

**Claude displays:**
```
╔══════════════════════════════════════════════════════════════╗
║                    SESSION SUMMARY                           ║
╠══════════════════════════════════════════════════════════════╣
║ Date: 2026-01-21                                             ║
║ Project: EphraimCare                                         ║
╠══════════════════════════════════════════════════════════════╣
║ COMPLETED:                                                   ║
║ ├── 1. Implemented Sealed Universe Protocol                 ║
║ ├── 2. Flattened src/ structure                             ║
║ ├── 3. Updated README.md                                    ║
║ └── 4. Created done-for-day protocol                        ║
╠══════════════════════════════════════════════════════════════╣
║ FILES CHANGED: 8                                             ║
╠══════════════════════════════════════════════════════════════╣
║ NEXT SESSION:                                                ║
║ └── Client requests / maintenance                           ║
╚══════════════════════════════════════════════════════════════╝

Saving to GitHub...
```

**Then Claude:**
1. Rewrites STATUS.md
2. Appends to LOG.md
3. Commits: `session(2026-01-21): Sealed Universe Protocol implementation`
4. Pushes to main
5. Reports: "✅ Session saved. Commit abc1234."

---

## Related

- `backup.md` - Manual backup trigger
- `sync.md` - Sync between local and GitHub
- `deploy.md` - Deploy to Vercel
- `ops/checkpoint.sh` - Quick checkpoint script
