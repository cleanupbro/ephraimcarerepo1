# Ephraim Care — AI Assistant Configuration
> Universal config for Claude Code, Gemini, and any AI assistant
> Version: 3.0 | Last Updated: January 12, 2026

---

## QUICK START (Read This First)

1. **Read this file** (AI.md) — understand the project
2. **Read HANDOFF.md** — session state from last AI
3. **Read TASKS.md** — what to work on
4. **For deep reference** → docs/PROJECT.md

---

## PROJECT IDENTITY

| Field | Value |
|-------|-------|
| **Project** | Ephraim Care |
| **Type** | NDIS Disability Support Provider Website |
| **Status** | LIVE in Production |
| **Domain** | ephraimcare.com.au |
| **Owner** | Meshach (Western Sydney) |
| **Developer** | OpBros Automation (theopbros.ai@gmail.com) |
| **GitHub** | github.com/cleanupbro/ephraimcarerepo1 |

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
ephraim-care-app/src/
├── app/ ..................... Next.js App Router pages
│   ├── page.tsx ............. Homepage
│   ├── about/
│   ├── contact/
│   ├── services/
│   │   └── [slug]/ .......... Dynamic service pages
│   ├── referrals/
│   ├── admin/ ............... Admin dashboard (10 pages)
│   │   ├── page.tsx ......... Dashboard
│   │   ├── login/
│   │   ├── referrals/
│   │   ├── contacts/
│   │   ├── participants/
│   │   ├── appointments/
│   │   ├── incidents/
│   │   ├── handovers/
│   │   └── staff/
│   └── api/ ................. API routes (12 endpoints)
│       ├── referrals/
│       ├── contacts/
│       ├── participants/
│       ├── appointments/
│       ├── incidents/
│       ├── handovers/
│       ├── progress-notes/
│       ├── staff/
│       ├── stats/
│       ├── notify/
│       ├── review/
│       └── auth/
├── components/
│   ├── ui/ .................. Button, Card, Input, Dialog, etc.
│   ├── layout/ .............. Header, Footer, Nav, AdminNav
│   ├── sections/ ............ Hero, ServicesGrid, CTA, FAQ
│   ├── animations/ .......... FadeIn, StaggerContainer, CountUp
│   └── admin/ ............... StatsCard, ReferralCard, etc.
├── data/
│   ├── services.ts .......... 8 NDIS services
│   ├── navigation.ts ........ Nav structure
│   └── faq.ts ............... FAQ content
├── hooks/ ................... Custom React hooks
├── lib/
│   ├── supabase.ts .......... Supabase client
│   └── utils.ts ............. Utility functions (cn, etc.)
└── types/ ................... TypeScript types
```

---

## KEY COMMANDS

```bash
# Navigate to app
cd ~/Desktop/ephraim-care/ephraim-care-app

# Development
npm run dev          # Start dev server (port 3000)
npm run build        # Production build (MUST pass before deploy)
npm run lint         # Check for errors
npm run start        # Run production build locally

# Deployment (Vercel auto-deploys from main)
git add -A
git commit -m "feat: description"
git push origin main

# Quick deploy script
./executors/deploy.sh
```

---

## CRITICAL RULES

### NDIS Compliance (Legal Requirement)
- **NEVER use:** "NDIS Approved", "NDIS Permitted", "NDIS Certified"
- **ALWAYS use:** "Registered NDIS Provider"
- **Penalty:** Up to $16,000,000 AUD fine

### Development Rules
1. **Always run `npm run build` before committing** — must pass with 0 errors
2. **Never hardcode API keys** — use .env.local
3. **Ask before deleting files** — especially in src/
4. **Keep components reusable** — don't duplicate code
5. **Update HANDOFF.md at session end**

### Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use Tailwind for styling (no inline styles)
- Import paths: `@/components/...`, `@/lib/...`, etc.

---

## DESIGN SYSTEM

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary (Teal) | #00BFA5 | Buttons, links, accents |
| Primary Dark | #004D45 | Hover states |
| Secondary (Orange) | #FF9800 | CTAs, highlights |
| Accent (Coral) | #E91E63 | Special elements |
| Success | #10B981 | Confirmations |
| Error | #EF4444 | Errors, warnings |
| Warning | #F59E0B | Cautions |

### Typography
- **Headings:** font-bold, tracking-tight
- **Body:** text-gray-600 (light mode)
- **Links:** text-primary hover:underline

---

## CONTACTS

| Role | Contact |
|------|---------|
| Client | Meshach — 0451 918 884 |
| Business Email | info@ephraimcare.com.au |
| Admin Email | admin@ephraimcare.com.au |
| Developer | theopbros.ai@gmail.com |

---

## SESSION WORKFLOW

### Starting a Session
1. Read AI.md (this file)
2. Read HANDOFF.md (last session state)
3. Read TASKS.md (priorities)
4. Say: "Ready to continue. Last session: [summary]. What should I work on?"

### During a Session
- Make changes incrementally
- Test with `npm run dev`
- Commit frequently with descriptive messages

### Ending a Session
1. Run `npm run build` — verify it passes
2. Update HANDOFF.md with:
   - What was done
   - What's in progress
   - What's blocked
   - What's next
3. Commit changes
4. Say: "Session complete. Updated HANDOFF.md."

---

## DOCUMENTATION MAP

| Need | Read |
|------|------|
| Full technical details | docs/PROJECT.md |
| API endpoints | docs/technical/API_REFERENCE.md |
| Component library | docs/technical/COMPONENTS.md |
| Database schema | docs/technical/DATABASE.md |
| Deployment process | docs/guides/DEPLOYMENT.md |
| Client summary | docs/client/SUMMARY.md |
| Workflow SOPs | directives/*.md |
| Scripts | executors/*.sh |

---

## AI INTEROPERABILITY

This config works for **both Claude and Gemini**. Both AIs:
- Read this same AI.md file
- Update the same HANDOFF.md
- Follow the same workflows
- Use the same directives

**Switching AIs:** Just start a new session. The incoming AI reads HANDOFF.md and continues seamlessly.

---

## INSTALLED PLUGINS

| Plugin | Command | When to Use |
|--------|---------|-------------|
| **Ralph Wiggum** | `/ralph-loop "task"` | Large multi-file changes, migrations, refactors |
| **Commit Commands** | `/commit` | Smart git commits |
| **Code Review** | `/code-review` | Before deploying, after changes |
| **Frontend Design** | (automatic) | Building UI components |
| **Feature Dev** | `/feature-dev` | New features with full workflow |
| **Security Guidance** | (automatic) | Monitors for vulnerabilities |
| **PR Review** | `/pr-review-toolkit:review-pr` | Reviewing pull requests |
| **Hookify** | `/hookify` | Create custom rules |

### Ralph Loop Examples

**Mobile optimize admin:**
```bash
/ralph-loop "Mobile-optimize all admin pages. Check each page in /src/app/admin/, add responsive classes, test, commit. Output DONE when complete." --max-iterations 25 --completion-promise "DONE"
```

**Fix all TypeScript errors:**
```bash
/ralph-loop "Fix all TypeScript errors. Run npm run build, fix each error one by one, commit after each fix. Output FIXED when build passes." --max-iterations 30 --completion-promise "FIXED"
```

### Plugin Rules

**Always Use:**
- `/commit` instead of manual git commits
- `/code-review` before any deployment
- Security Guidance is always active (automatic)

**Use Ralph Loop For:**
- Any task touching 5+ files
- Mobile optimization passes
- Bulk refactors
- Adding features across multiple pages

**Never Use Ralph Loop For:**
- Quick single-file edits
- Debugging (unpredictable iterations)
- Tasks without clear completion criteria

---

## AUTONOMOUS AGENT BEHAVIOR

### Core Principle
Claude should **proactively use skills, spawn sub-agents, and break down tasks** without being asked. Every task is an opportunity for autonomous execution.

### Auto-Skill Invocation Rules

**ALWAYS automatically invoke relevant skills/plugins when you detect:**

| Trigger | Action |
|---------|--------|
| Task mentions 3+ files | Use `/ralph-loop` for autonomous iteration |
| Any git operation needed | Use `/commit` instead of manual git |
| Code changes complete | Run `/code-review` automatically |
| New feature requested | Start `/feature-dev` workflow |
| Reading large codebase | Spawn Explorer sub-agent |
| TODO list with 3+ items | Break into sub-agents |
| Build/deploy mentioned | Follow `directives/deploy.md` |
| Error encountered | Follow `directives/bug-fix.md` |
| Client feedback received | Follow `directives/client-change.md` |

### Sub-Agent Spawning

**For any task list, TODO, or multi-step work — spawn sub-agents:**

```
TASK: "Mobile optimize admin pages"

AUTO-SPAWN:
├── Explorer Agent → Read all files in /src/app/admin/
├── Planner Agent → Create checklist of pages to optimize
├── Worker Agent → Execute optimization (via /ralph-loop)
├── Reviewer Agent → Run /code-review on changes
└── Deploy Agent → Follow directives/deploy.md
```

**Sub-Agent Pattern:**
```markdown
## SUB-AGENT: [Name]
**Mission:** [Single clear objective]
**Inputs:** [What it needs]
**Outputs:** [What it produces]
**Completion:** [How to know it's done]
```

### Reading Code — Always Use Explorer Pattern

**When asked to read/understand code, DON'T just read files. Instead:**

1. **Spawn Explorer Sub-Agent** with clear mission
2. **Map the structure** first (list directories)
3. **Identify key files** (entry points, configs, data)
4. **Read strategically** (not everything, just relevant)
5. **Summarize findings** before proceeding

### TODO List Auto-Execution

**When you see a TODO list or task list, AUTOMATICALLY:**

1. **Parse into discrete tasks**
2. **Prioritize by dependencies**
3. **Spawn sub-agent for each task**
4. **Execute sequentially or parallel as appropriate**
5. **Report completion status**

### Directive Auto-Following

**When context matches a directive, FOLLOW IT without being asked:**

| Context Detected | Auto-Follow |
|------------------|-------------|
| "deploy" / "push" / "ship" | → `directives/deploy.md` |
| "review" / "check code" | → `directives/code-review.md` |
| "client wants" / "feedback" | → `directives/client-change.md` |
| "error" / "broken" / "fix" | → `directives/bug-fix.md` |
| "new feature" / "add" | → `directives/new-feature.md` |
| "rollback" / "revert" | → `directives/emergency-rollback.md` |

### Proactive Behaviors (Do Without Being Asked)

**ALWAYS do these automatically:**

1. **Run `npm run build`** after any code changes
2. **Check for TypeScript errors** before committing
3. **Update HANDOFF.md** at natural break points
4. **Suggest next steps** after completing a task
5. **Warn about potential issues** (security, performance, NDIS compliance)
6. **Commit incrementally** (don't batch huge changes)

### Task Decomposition Template

**For any complex task, use this mental model:**

```
TASK RECEIVED: "[description]"

DECOMPOSITION:
├── Phase 1: Understand
│   └── Sub-agent: Explorer → Map relevant code
├── Phase 2: Plan
│   └── Sub-agent: Planner → Create step-by-step approach
├── Phase 3: Execute
│   └── Sub-agent: Worker → Make changes (use /ralph-loop if 3+ files)
├── Phase 4: Verify
│   └── Sub-agent: Tester → Run build, check for errors
├── Phase 5: Review
│   └── Sub-agent: Reviewer → Run /code-review
└── Phase 6: Complete
    └── Sub-agent: Reporter → Summarize what was done, suggest next steps
```

### Self-Correction Loop

**If something fails, AUTOMATICALLY:**

1. **Read the error** carefully
2. **Identify root cause**
3. **Apply fix**
4. **Re-run the failed step**
5. **Continue workflow**

**Don't stop and ask unless:**
- Destructive action required (deleting files)
- Ambiguous requirement (need clarification)
- External dependency (need API key, client input)

### Quick Reference: When to Auto-Act

```
╔════════════════════════════════════════════════════════════╗
║              AUTONOMOUS BEHAVIOR TRIGGERS                  ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  AUTO-USE RALPH LOOP:                                      ║
║     • 3+ files to modify                                   ║
║     • "optimize all" / "update all" / "fix all"            ║
║     • Bulk operations                                      ║
║                                                            ║
║  AUTO-USE COMMIT:                                          ║
║     • Any completed change                                 ║
║     • After each logical unit of work                      ║
║                                                            ║
║  AUTO-USE CODE-REVIEW:                                     ║
║     • Before any deploy                                    ║
║     • After significant changes                            ║
║                                                            ║
║  AUTO-SPAWN SUB-AGENTS:                                    ║
║     • TODO lists                                           ║
║     • Multi-step tasks                                     ║
║     • Complex analysis                                     ║
║                                                            ║
║  AUTO-FOLLOW DIRECTIVES:                                   ║
║     • When context matches directive trigger               ║
║     • Deploy, review, fix, client-change                   ║
║                                                            ║
║  AUTO-EXECUTE:                                             ║
║     • Build after code changes                             ║
║     • Lint before commit                                   ║
║     • Update HANDOFF.md at breaks                          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

*This file is the single source of truth. Always start here.*
