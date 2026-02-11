# skills/

Agent skills library. Each subfolder contains a `SKILL.md` that agents load dynamically when relevant.

## How Skills Work

1. Agent scans this catalog on session start
2. When a task matches a skill's description, agent loads the full `SKILL.md`
3. Agent follows the skill's workflow to complete the task

## Catalog

### Meta
| Skill | What It Does |
|-------|-------------|
| `_template/` | Blank template — copy to create new skills |

### Development
| Skill | What It Does |
|-------|-------------|
| `nextjs-fullstack/` | Next.js App Router patterns, server components, API routes |
| `react-patterns/` | React component design, hooks, state management |
| `typescript-expert/` | TypeScript best practices, generics, type safety |
| `api-integration/` | REST API design, auth, rate limiting, error handling |

### Infrastructure
| Skill | What It Does |
|-------|-------------|
| `vercel-deployment/` | Vercel config, env vars, preview deployments |
| `supabase/` | Supabase Postgres, auth, RLS policies |
| `n8n-automation/` | n8n workflows, webhooks, scheduling |

### Quality & Growth
| Skill | What It Does |
|-------|-------------|
| `seo-growth/` | SEO audit, meta tags, Core Web Vitals |
| `ui-ux-design/` | Design systems, responsive design, Tailwind |
| `security/` | OWASP, input validation, secrets management |
| `testing/` | Unit, integration, e2e testing |

### Legacy Workflows
Flat `.md` files migrated from the original `agents/` directory:

| File | What It Does |
|------|-------------|
| `deploy.md` | Full deployment pipeline |
| `done-for-day.md` | End-of-session handoff protocol |
| `sync.md` | Auto-sync workspace state |
| `bug-fix.md` | Debug and fix issues |
| `new-feature.md` | Build new features |
| `code-review.md` | Pre-commit code review |
| `client-change.md` | Process client feedback |
| `database.md` | Supabase operations |
| `domain.md` | DNS/domain management |
| `github-release.md` | Create GitHub releases |
| `testing.md` | Testing checklist |
| `docs.md` | Documentation workflow |
| `backup.md` | Backup and checkpoint |
| `SKILLS_INDEX.md` | Auto-invocation rules |
