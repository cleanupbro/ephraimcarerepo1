# Ephraim Care — Claude Code Configuration
> Claude-specific instructions and optimizations
> Last Updated: January 16, 2026

---

## READ FIRST

Before this file, read:
1. `AI_CONFIG/UNIVERSAL.md` — shared project context
2. `MEMORY.md` — workspace state
3. `HANDOFF.md` — session continuity

---

## CLAUDE-SPECIFIC FEATURES

### MCP Servers Available
- **Playwright** — Browser automation, screenshots, testing
- **n8n** — Workflow automation
- **Greptile** — Code search and PR reviews
- **Context7** — Documentation lookup
- **Stripe** — Payment integration
- **Firebase** — Backend services
- **Pinecone** — Vector database
- **Memory** — Knowledge graph

### Preferred Tool Usage
1. **File operations** — Use Read, Edit, Write (not bash cat/sed)
2. **Search** — Use Grep, Glob (not bash grep/find)
3. **Exploration** — Use Task tool with Explore agent
4. **Git commits** — Use /commit skill
5. **Code review** — Use /code-review skill

### Auto-Invoke Skills
When detecting patterns, automatically use:
- "deploy", "push", "go live" → Follow deploy workflow
- "client wants", "change request" → Follow client-change workflow
- "error", "bug", "fix" → Follow bug-fix workflow
- Before any commit → Run code review

---

## PLUGINS AVAILABLE

| Plugin | Command | Purpose |
|--------|---------|---------|
| Commit Commands | `/commit` | Smart git commits |
| Code Review | `/code-review` | Review before deploy |
| Feature Dev | `/feature-dev` | New feature workflow |
| PR Review | `/review-pr` | Pull request review |
| Ralph Loop | `/ralph-loop` | Multi-file changes |

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

## WORKSPACE CONVENTIONS

### Commit Messages
Use conventional commits:
```
feat(scope): description    # New feature
fix(scope): description     # Bug fix
docs(scope): description    # Documentation
refactor(scope): description # Code refactor
```

### File Naming
- Components: PascalCase (e.g., `ServicesGrid.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Pages: lowercase with hyphens (e.g., `about/page.tsx`)

### Import Paths
Use aliases: `@/components/...`, `@/lib/...`, `@/data/...`

---

## PROACTIVE BEHAVIORS

**Always do these automatically:**
1. Run `npm run build` after code changes
2. Check for TypeScript errors before committing
3. Update MEMORY.md at natural break points
4. Suggest next steps after completing a task
5. Warn about NDIS compliance issues

---

## VERCEL DEPLOYMENT

### API Deployment (when auto-deploy fails)
```bash
# Use this JSON payload
{
  "name": "ephraim-care-app",
  "project": "prj_NAdt7XKrxBZ5V5o4r9M98pUPAwBJ",
  "target": "production",
  "projectSettings": {"rootDirectory": "ephraim-care-app"},
  "gitSource": {
    "type": "github",
    "repoId": 1125568259,
    "ref": "main"
  }
}
```

### API Token
Use token from `.secrets/KEYS.md` (EPHRAIM_VERCEL_FULL_ACCESS)

---

*Claude-specific config. For shared context, see UNIVERSAL.md.*
