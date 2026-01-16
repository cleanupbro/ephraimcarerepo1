# Ephraim Care — Gemini Configuration
> Gemini-specific instructions and optimizations
> Last Updated: January 16, 2026

---

## READ FIRST

Before this file, read:
1. `AI_CONFIG/UNIVERSAL.md` — shared project context
2. `MEMORY.md` — workspace state
3. `HANDOFF.md` — session continuity

---

## GEMINI-SPECIFIC NOTES

### Context Window Management
- Gemini has different context limits than Claude
- For large file operations, process in chunks
- Summarize findings before moving to next task

### File Operations
Use standard file operations:
- Read files before editing
- Make incremental changes
- Test after each modification

### Code Generation
- Follow existing patterns in codebase
- Match TypeScript conventions
- Use Tailwind classes (not inline styles)

---

## CURRENT STATE

### Last Known State
- **Version:** v2.3.1
- **Status:** Build PASSED, Production LIVE
- **Last Action:** Deployed slogan fix via Vercel API
- **Slogan:** "Embracing Differences"

### Git Status
```
Branch: main
Latest Commit: 01db0d6
Remote: Synced with origin/main
```

---

## WORKFLOW FOR GEMINI

### Starting a Session
1. Read UNIVERSAL.md (project context)
2. Read MEMORY.md (current state)
3. Read HANDOFF.md (what was done)
4. Check TASKS.md (what to do)

### Making Changes
1. Navigate to `~/Desktop/ephraim-care/ephraim-care-app`
2. Make code changes
3. Run `npm run build` — must pass
4. Commit with descriptive message
5. Push to main branch

### Ending a Session
1. Verify build passes
2. Update MEMORY.md with current state
3. Update HANDOFF.md with session summary
4. Commit any pending changes

---

## KEY DIFFERENCES FROM CLAUDE

| Capability | Claude | Gemini |
|------------|--------|--------|
| MCP Tools | Full access | Limited |
| Browser Control | Playwright MCP | Manual |
| Git Operations | /commit skill | Standard git |
| Code Review | /code-review | Manual review |
| Multi-file edits | /ralph-loop | Sequential |

### Compensating Strategies
- **No MCP:** Use standard bash commands
- **No skills:** Follow `directives/*.md` manually
- **No browser:** Use curl for API calls
- **No auto-review:** Manually check code quality

---

## DIRECTIVES TO FOLLOW

When specific tasks arise, read these files:
- Deploy: `directives/deploy.md`
- Bug fix: `directives/bug-fix.md`
- Client change: `directives/client-change.md`
- Code review: `directives/code-review.md`
- New feature: `directives/new-feature.md`

---

## VERCEL DEPLOYMENT

### Manual Deployment
If Vercel auto-deploy fails:

```bash
# Check deployment status
curl -s "https://api.vercel.com/v6/deployments?projectId=prj_NAdt7XKrxBZ5V5o4r9M98pUPAwBJ&limit=5" \
  -H "Authorization: Bearer [TOKEN_FROM_SECRETS]"

# Trigger deployment
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer [TOKEN_FROM_SECRETS]" \
  -H "Content-Type: application/json" \
  -d '{"name":"ephraim-care-app","project":"prj_NAdt7XKrxBZ5V5o4r9M98pUPAwBJ","target":"production","projectSettings":{"rootDirectory":"ephraim-care-app"},"gitSource":{"type":"github","repoId":1125568259,"ref":"main"}}'
```

Get token from `.secrets/KEYS.md`

---

*Gemini-specific config. For shared context, see UNIVERSAL.md.*
