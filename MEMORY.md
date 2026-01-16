# MEMORY.md — Ephraim Care Workspace
> Standalone workspace memory (100% self-contained, no external references)
> Last Updated: January 16, 2026

---

## PROJECT IDENTITY

| Field | Value |
|-------|-------|
| **Project** | Ephraim Care |
| **Type** | NDIS Disability Support Provider Website |
| **Status** | LIVE in Production |
| **Domain** | www.ephraimcare.com.au |
| **Owner** | Meshach (Western Sydney) |
| **Developer** | OpBros Automation (theopbros.ai@gmail.com) |
| **GitHub** | github.com/cleanupbro/ephraimcarerepo1 |

---

## CURRENT STATE

### Last Update
- **Date:** January 16, 2026
- **Action:** v2.3.1 deployed + complete workspace restructuring
- **Files:** 21 new files created (AI_CONFIG/, skills/, .secrets/, docs)
- **State:** Build PASSED, Production LIVE
- **Next:** Ready for new tasks

### Version History
| Version | Date | Changes |
|---------|------|---------|
| v2.3.1 | Jan 16, 2026 | Slogan capitalized "Embracing Differences" |
| v2.3.0 | Jan 16, 2026 | Slogan change, mint backgrounds |
| v2.2.2 | Jan 16, 2026 | Restored two-toned mint backgrounds |
| v2.2.1 | Jan 15, 2026 | Domain configuration complete |
| v2.1.0 | Jan 14, 2026 | Version indicator in footer |

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
Slogan: "Embracing Differences"
Workspace: Restructured (100% self-contained)
```

---

## TECH STACK

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | Radix UI + CVA |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel (auto-deploy from main) |
| Automation | n8n at nioctibinu.online |
| Notifications | Telegram, Twilio SMS |

---

## URLS

| Environment | URL |
|-------------|-----|
| **Production** | https://www.ephraimcare.com.au |
| **Admin** | https://www.ephraimcare.com.au/admin |
| **Preview** | https://ephraimcarerepo1.vercel.app |
| **GitHub** | https://github.com/cleanupbro/ephraimcarerepo1 |
| **n8n** | https://nioctibinu.online |
| **Supabase** | https://supabase.com/dashboard/project/esyxitvlgknqhaunlfbg |

---

## LESSONS LEARNED

### Do's
1. **Always run `npm run build`** before committing - must pass with 0 errors
2. **Commit frequently** with descriptive messages
3. **Update MEMORY.md** at natural break points
4. **Use mint gradient backgrounds** for visual consistency (`#F5FAFA`, `#E8F5F3`, `#F0FAF8`)
5. **Git repo is at ephraim-care/ level**, not ephraim-care-app/

### Don'ts
1. **NEVER use:** "NDIS Approved", "NDIS Permitted", "NDIS Certified" (up to $16M fine)
2. **ALWAYS use:** "Registered NDIS Provider"
3. **Never hardcode API keys** - use .env.local or .secrets/
4. **Don't delete files without asking** - especially in src/

### Known Issues
- None currently - build passing, production live

---

## WORKSPACE STRUCTURE

```
ephraim-care/
├── MEMORY.md ................ This file (standalone memory)
├── CLIENT_SUMMARY.md ........ Client handoff document
├── HANDOFF.md ............... Session state continuity
├── TASKS.md ................. Work queue
├── AI_CONFIG/
│   ├── UNIVERSAL.md ......... Shared AI context
│   ├── CLAUDE.md ............ Claude-specific config
│   └── GEMINI.md ............ Gemini-specific config
├── .secrets/ ................ API keys (gitignored)
│   ├── KEYS.md .............. Personal/dev keys
│   └── CLIENT_KEYS.md ....... Client keys (GoDaddy, etc.)
├── skills/ .................. Auto-invoke skill system
│   ├── SKILLS_INDEX.md ...... Master registry
│   └── [11 skill files]
├── docs/ .................... Documentation
├── directives/ .............. Workflow SOPs
├── executors/ ............... Bash scripts
└── ephraim-care-app/ ........ Next.js application
```

---

## CONTACTS

| Role | Contact |
|------|---------|
| Client | Meshach — 0451 918 884 |
| Business Email | info@ephraimcare.com.au |
| Admin Email | admin@ephraimcare.com.au |
| Developer | theopbros.ai@gmail.com |

---

## SELF-CONTAINMENT RULES

This workspace is **100% self-contained**:
- ❌ NO references to `_CENTRAL/` or external folders
- ❌ NO reading from shared memory files outside this folder
- ✅ All API keys in local `.secrets/` (gitignored)
- ✅ All context in this MEMORY.md
- ✅ All session state in HANDOFF.md
- ✅ Works with Claude OR Gemini

**When opening this workspace:** Read ONLY files within this folder.

---

## EMERGENCY RECOVERY

If session ended abruptly:
1. Read this MEMORY.md first
2. Read HANDOFF.md second
3. Check `git status` for uncommitted work
4. Resume from "Next" in Current State section above

---

*This is the single source of memory for this workspace. Update after every significant action.*
