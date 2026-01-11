# Ephraim Care — Complete Project Reference

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Pages | 44 |
| API Endpoints | 12 |
| Components | 30+ |
| Build Status | Passing |
| Production URL | ephraimcare.com.au |

---

## Pages Inventory

### Public Pages (8)
| Route | Purpose |
|-------|---------|
| / | Homepage |
| /about | About us |
| /contact | Contact form |
| /services | Services overview |
| /referrals | Referral form |
| /privacy-policy | Privacy policy |
| /terms-of-service | Terms of service |
| /complaints | NDIS complaints |

### Service Pages (8)
| Route | Service |
|-------|---------|
| /services/personal-care | Personal Care |
| /services/supported-independent-living | SIL |
| /services/community-participation | Community Participation |
| /services/travel-transport | Travel & Transport |
| /services/life-skills | Life Skills Development |
| /services/household-tasks | Household Tasks |
| /services/social-participation | Social Participation |
| /services/group-activities | Group Activities |

### Admin Pages (10)
| Route | Purpose |
|-------|---------|
| /admin | Dashboard |
| /admin/login | Login |
| /admin/referrals | Manage referrals |
| /admin/contacts | Manage contacts |
| /admin/participants | Manage participants |
| /admin/participants/[id] | Participant profile |
| /admin/appointments | Appointments |
| /admin/incidents | Incident reports |
| /admin/handovers | Shift handovers |
| /admin/staff | Staff management |

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **UI:** Radix UI + CVA
- **Animations:** Motion
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Hosting:** Vercel
- **Automation:** n8n

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage |
| `src/app/admin/page.tsx` | Admin dashboard |
| `src/middleware.ts` | Auth middleware |
| `src/lib/supabase.ts` | Supabase client |
| `src/data/services.ts` | Service data |
| `src/data/navigation.ts` | Navigation data |

---

## Documentation

| Topic | File |
|-------|------|
| API Reference | docs/technical/API_REFERENCE.md |
| Components | docs/technical/COMPONENTS.md |
| Database | docs/technical/DATABASE.md |
| Environment | docs/technical/ENV_VARS.md |
| Deployment | docs/guides/DEPLOYMENT.md |
| Development | docs/guides/DEVELOPMENT.md |
