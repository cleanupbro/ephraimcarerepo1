# Ephraim Care — Universal AI Configuration
> Shared context for ALL AI engines (Claude, Gemini, etc.)
> Version: 1.0 | Last Updated: January 16, 2026

---

## QUICK START

1. Read this file (UNIVERSAL.md) — understand the project
2. Read MEMORY.md — workspace state
3. Read HANDOFF.md — session continuity
4. Check TASKS.md — work queue

---

## PROJECT IDENTITY

| Field | Value |
|-------|-------|
| **Project** | Ephraim Care |
| **Type** | NDIS Disability Support Provider Website |
| **Status** | LIVE in Production |
| **Domain** | www.ephraimcare.com.au |
| **Version** | v2.3.1 |
| **Owner** | Meshach (Western Sydney) |
| **Developer** | OpBros Automation (theopbros.ai@gmail.com) |
| **GitHub** | github.com/cleanupbro/ephraimcarerepo1 |

---

## URLS

| Environment | URL |
|-------------|-----|
| **Production** | https://www.ephraimcare.com.au |
| **Admin** | https://www.ephraimcare.com.au/admin |
| **Preview** | https://ephraim-care-app.vercel.app |
| **GitHub** | https://github.com/cleanupbro/ephraimcarerepo1 |
| **n8n** | https://nioctibinu.online |
| **Supabase** | https://supabase.com/dashboard/project/esyxitvlgknqhaunlfbg |

---

## TECH STACK

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 14.2.35 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.x |
| UI Components | Radix UI + CVA | Latest |
| Animations | Motion | Latest |
| Database | Supabase (PostgreSQL) | - |
| Auth | Supabase Auth | - |
| Hosting | Vercel | - |
| Automation | n8n | Self-hosted |
| Notifications | Telegram, Twilio SMS | - |

---

## PROJECT STRUCTURE

```
ephraim-care/
├── MEMORY.md ................ Workspace memory (read first)
├── CLIENT_SUMMARY.md ........ Client handoff document
├── HANDOFF.md ............... Session continuity
├── TASKS.md ................. Work queue
├── AI_CONFIG/
│   ├── UNIVERSAL.md ......... This file
│   ├── CLAUDE.md ............ Claude-specific
│   └── GEMINI.md ............ Gemini-specific
├── .secrets/ ................ API keys (gitignored)
├── skills/ .................. Auto-invoke skill system
├── docs/ .................... Documentation
├── directives/ .............. Workflow SOPs
├── executors/ ............... Bash scripts
└── ephraim-care-app/ ........ Next.js application
    └── src/, public/, configs
```

---

## CRITICAL RULES

### NDIS Compliance (Legal Requirement)
- **NEVER use:** "NDIS Approved", "NDIS Permitted", "NDIS Certified"
- **ALWAYS use:** "Registered NDIS Provider"
- **Penalty:** Up to $16,000,000 AUD fine

### Development Rules
1. **Always run `npm run build`** before committing — must pass with 0 errors
2. **Never hardcode API keys** — use .env.local or .secrets/
3. **Ask before deleting files** — especially in src/
4. **Git repo is at ephraim-care/ level**, not ephraim-care-app/
5. **Update MEMORY.md** after significant changes

---

## KEY COMMANDS

```bash
# Navigate to app
cd ~/Desktop/ephraim-care/ephraim-care-app

# Development
npm run dev          # Start dev server (port 3000)
npm run build        # Production build (MUST pass before deploy)
npm run lint         # Check for errors

# Deployment (Vercel auto-deploys from main)
git add -A
git commit -m "feat: description"
git push origin main
```

---

## DESIGN SYSTEM

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary (Teal) | #00BFA5 | Buttons, links, accents |
| Mint Light | #F5FAFA | Section backgrounds |
| Mint Medium | #E8F5F3 | Gradient endpoints |
| Secondary (Orange) | #FF9800 | CTAs, highlights |

### Slogan
> "Embracing Differences"

---

## CONTACTS

| Role | Contact |
|------|---------|
| Client | Meshach — 0451 918 884 |
| Business Email | info@ephraimcare.com.au |
| Developer | theopbros.ai@gmail.com |

---

## SELF-CONTAINMENT

This workspace is **100% self-contained**:
- All context in local files (MEMORY.md, HANDOFF.md)
- All API keys in .secrets/ (gitignored)
- No external _CENTRAL/ references
- Works with Claude OR Gemini

---

*This file provides shared context for any AI. For AI-specific instructions, see CLAUDE.md or GEMINI.md.*
