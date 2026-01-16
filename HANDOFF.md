# HANDOFF — Ephraim Care
> Session state for AI continuity
> Last Updated: January 16, 2026
> Session: #25

---

## LAST SESSION SUMMARY (#24 - January 16, 2026)

### What Was Done
- [x] v2.3.1 deployed - Capitalized slogan "Embracing Differences"
- [x] Fixed Vercel deployment (auto-deploy was stuck, triggered via API)
- [x] Complete workspace restructuring for AI-agnostic operation
- [x] Created AI_CONFIG/ directory (UNIVERSAL.md, CLAUDE.md, GEMINI.md)
- [x] Created skills/ directory with 11 auto-invoke skill files
- [x] Created .secrets/ directory for API keys (gitignored)
- [x] Created MEMORY.md and CLIENT_SUMMARY.md
- [x] Updated .gitignore to exclude .secrets/

### Workspace Now 100% Self-Contained
- No external _CENTRAL/ references
- Works with Claude OR Gemini
- All API keys in local .secrets/
- Auto-sync skill for session continuity

---

## CURRENT STATE

### Build Status
```
Last Build: PASSED
Version: v2.3.1
Pages: 44
API Routes: 12
Errors: 0
```

### Git Status
```
Branch: main
Latest Commit: [pending commit of restructuring]
Slogan: "Embracing Differences" (capitalized)
```

### Deployment
```
Production: https://www.ephraimcare.com.au
Vercel URL: https://ephraim-care-app.vercel.app
Status: LIVE - v2.3.1 deployed via API
Vercel: Auto-deploys from main (API fallback available)
GitHub: github.com/cleanupbro/ephraimcarerepo1
```

---

## NEW PROJECT STRUCTURE

```
ephraim-care/
├── MEMORY.md ................ Standalone workspace memory
├── CLIENT_SUMMARY.md ........ Client handoff document
├── HANDOFF.md ............... This file
├── TASKS.md ................. Work queue
├── AI_CONFIG/
│   ├── UNIVERSAL.md ......... Shared AI context
│   ├── CLAUDE.md ............ Claude-specific config
│   └── GEMINI.md ............ Gemini-specific config
├── .secrets/ ................ API keys (gitignored)
│   ├── KEYS.md .............. Dev/personal keys
│   └── CLIENT_KEYS.md ....... Client keys (GoDaddy)
├── skills/ .................. Auto-invoke skill system
│   ├── SKILLS_INDEX.md ...... Master registry with triggers
│   ├── sync.md .............. Auto-sync (runs after every action)
│   ├── deploy.md ............ Deploy to production
│   ├── client-change.md ..... Handle client requests
│   ├── bug-fix.md ........... Debug issues
│   ├── code-review.md ....... Review before commits
│   ├── database.md .......... Supabase operations
│   ├── new-feature.md ....... Build new features
│   ├── testing.md ........... Verify functionality
│   ├── docs.md .............. Documentation updates
│   ├── domain.md ............ DNS/GoDaddy config
│   └── backup.md ............ Save workspace state
├── docs/ .................... Documentation
├── directives/ .............. Workflow SOPs
├── executors/ ............... Bash scripts
└── ephraim-care-app/ ........ Next.js application
```

---

## SESSION #25 — START HERE

### Read Order for AI
1. MEMORY.md (workspace memory)
2. HANDOFF.md (this file)
3. TASKS.md (if work to do)
4. skills/SKILLS_INDEX.md (auto-invoke patterns)

### If Working Locally
```bash
cd ~/Desktop/ephraim-care/ephraim-care-app
npm run dev
# Server at http://localhost:3000
```

### Auto-Invoke Skills
The AI should auto-invoke skills based on trigger patterns:
- "deploy" → skills/deploy.md
- "client wants" → skills/client-change.md
- "error/bug" → skills/bug-fix.md
- Before commits → skills/code-review.md (implicit)

---

## CONTEXT FOR NEXT AI

- **v2.3.1 is current** - slogan "Embracing Differences"
- **Workspace restructured** - 100% self-contained
- **No external references** - everything is LOCAL
- Domain configured: www.ephraimcare.com.au ✅
- Git repo at ephraim-care/ level (not ephraim-care-app/)
- Vercel API deployment works when auto-deploy fails
- Build passes, production is live

---

## NOTES

- 44 pages total (8 public + 8 services + 10 admin + extras)
- 12 API endpoints
- Supabase for database
- n8n for automation at nioctibinu.online
- Telegram notifications working
- Vercel API token in .secrets/KEYS.md

---

*Update this file at the end of every session.*
