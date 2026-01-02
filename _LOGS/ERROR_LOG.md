# ERROR LOG - Ephraim Care
> Tracking errors for learning and prevention

---

## Format

```markdown
## ERROR-XXX
Date: YYYY-MM-DD HH:MM
Type: Build|Runtime|API|Other
File: path/to/file.tsx:line
Error: Error message
Status: OPEN|RESOLVED
Fix Applied: Description of fix
Lesson: What we learned
```

---

## Errors

### ERROR-001 (Historical)
Date: 2026-01-03 10:00
Type: Security
File: src/app/api/review/route.ts:4-6
Error: API keys hardcoded in source code (DeepSeek, Gemini, Claude)
Status: RESOLVED
Fix Applied: Moved API keys to .env.local, updated route to use process.env
Lesson: NEVER hardcode API keys. Always use environment variables.

---

*Updated automatically by FixAgent and LearnAgent*
