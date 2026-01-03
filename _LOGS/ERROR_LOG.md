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

### ERROR-002
Date: 2026-01-03 14:30
Type: Deployment
File: N/A (Vercel)
Error: GitHub push did not trigger Vercel auto-deploy - old commit deployed
Status: RESOLVED
Fix Applied: Manually triggered deployment via Vercel API with gitSource
Lesson: Always verify Vercel deployment matches latest GitHub commit. Use API trigger if auto-deploy fails.

---

### ERROR-003
Date: 2026-01-03 14:25
Type: API
File: .env.local (Twilio)
Error: Twilio SMS returns 401 Unauthorized
Status: OPEN
Fix Applied: N/A
Lesson: Twilio auth tokens expire or get regenerated. Always test API before deployment. Keep tokens in sync.

---

### ERROR-004
Date: 2026-01-03 14:20
Type: Build
File: npm cache
Error: EACCES permission denied on ~/.npm/_cacache - corrupted npm cache
Status: OPEN (Workaround applied)
Fix Applied: Used Vercel API deployment instead of npx vercel
Lesson: If npm cache corrupts, use `sudo rm -rf ~/.npm/_cacache` or alternative deployment methods.

---

*Updated automatically by FixAgent and LearnAgent*
