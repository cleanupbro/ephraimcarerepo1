# Skills Registry — Auto-Invocation Rules
> Master index of all skills with trigger patterns
> Last Updated: January 16, 2026

---

## HOW THIS WORKS

When user says something, match against trigger patterns below.
If match found → automatically follow that skill's workflow.
User does NOT need to name the skill explicitly.

---

## AUTO-INVOKE MATRIX

| Skill File | Trigger Patterns | Priority |
|------------|------------------|----------|
| `sync.md` | After ANY action, before closing | 🔴 Critical |
| `deploy.md` | "deploy", "push", "go live", "ship it" | 🔴 High |
| `client-change.md` | "client wants", "client asked", "change request", screenshots | 🔴 High |
| `bug-fix.md` | "error", "bug", "not working", "broken", "fix" | 🔴 High |
| `code-review.md` | Before ANY git commit (implicit) | 🔴 High |
| `database.md` | "table", "migration", "supabase", "schema" | 🟡 Medium |
| `new-feature.md` | "add", "create", "build", "implement" | 🟡 Medium |
| `testing.md` | "test", "verify", "check if", "make sure" | 🟢 Low |
| `docs.md` | "document", "readme", "explain" | 🟢 Low |
| `domain.md` | "domain", "DNS", "GoDaddy" | 🟢 Low |
| `backup.md` | "backup", "save state", "snapshot" | 🟢 Low |

---

## PRIORITY RULES

1. **Critical** — Always run (sync after every action)
2. **High** — Run immediately when triggered
3. **Medium** — Run when explicitly requested or implied
4. **Low** — Run when specifically mentioned

If multiple skills match, execute highest priority first.
High priority skills can chain to medium/low after completion.

---

## IMPLICIT TRIGGERS

These skills run without explicit mention:
- **sync.md** — After EVERY change, before session end
- **code-review.md** — Before ANY git commit

---

## SKILL FILE FORMAT

Each skill follows this structure:

```markdown
# [Skill Name]

## Triggers
- Pattern 1
- Pattern 2

## Pre-Flight Checks
1. Verify X
2. Check Y

## Steps
1. Do this
2. Then this
3. Verify

## If Failed
1. Rollback
2. Notify user

## Success Message
"Confirmation to show user"
```

---

## QUICK REFERENCE

| Task | Skill to Use |
|------|--------------|
| Push to production | deploy.md |
| Client feedback/screenshots | client-change.md |
| Something broken | bug-fix.md |
| New feature request | new-feature.md |
| Database changes | database.md |
| Domain/DNS issues | domain.md |
| Save current state | sync.md |

---

*For individual skill details, see the corresponding .md file.*
