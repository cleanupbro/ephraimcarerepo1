# Decisions Log

> Append-only log. Never delete entries. Mark outdated with `[OUTDATED]`.

## 2026-02-12 — Workspace Restructure
**Decision:** Restructure project into standard workspace layout with `memory/`, `skills/`, `api-keys/`, and unified agent config files (AGENTS.md, CLAUDE.md, GEMINI.md).
**Reasoning:** Standardize workspace for multi-agent collaboration (Claude Code + Antigravity), improve session continuity, make repo presentable for client portfolio.
**Impact:** All legacy files (`STATUS.md`, `LOG.md`, `PLAN.md`) migrated into new structure. `agents/` renamed to `skills/`.

## 2026-01-21 — Sealed Universe Protocol
**Decision:** Enforce sealed universe — all project context lives within this repository only.
**Reasoning:** Prevent context leaks across sessions and agents. Memory stays in `./`.
**Impact:** STATUS.md, LOG.md, PLAN.md became the canonical state files.

## 2026-01-21 — Flatten src/ Structure
**Decision:** Moved main app code directly into `src/` with `package.json` at `src/` level.
**Reasoning:** Simplified project structure from nested `ephraim-care-app/` subdirectory.
**Impact:** Build commands now run from `cd src && npm run build`.

## 2026-01-21 — Phase 4 Complete
**Decision:** Marked front-end design phase as complete (v2.3.1).
**Reasoning:** All 9 pages verified HTTP 200, responsive design, accessibility, SEO meta tags complete.
**Impact:** Ready for Phase 5 (Database & Backend Enhancement).

## 2026-02-12 — Prestons SEO Transformation
**Decision:** Start "Local SEO Domination" strategy with a dedicated `/prestons` landing page and 0.9 sitemap priority.
**Reasoning:** "NDIS Provider Prestons" is the highest value keyword for the business location. Generic service pages don't rank as well as dedicated location pages for local queries.
**Impact:** Created `src/app/prestons`, updated global JSON-LD, added footer link.

## 2026-02-12 — Remove n8n from Frontend
**Decision:** Removed n8n webhook calls from `contact` and `referral` forms.
**Reasoning:** Dual-submission (API + n8n) was redundant and fragile. API route now handles everything (Supabase + Notification logic).
**Impact:** Simplified form logic, fixed lint errors, localized failure points to backend only.

## 2026-02-12 — Remove Legacy Admin Portal
**Decision:** Deleted `src/app/admin`, `middleware.ts`, and internal `api/` routes (staff, appointments, etc.).
**Reasoning:** User confirmed this repo is strict "Public Marketing / Leads Only". Admin portal exists in a separate application.
**Impact:** Reduced codebase size, removed auth middleware complexity, eliminated risk of exposing admin logic in public repo.

## 2026-02-12 — "NDIS Near Me" Optimization
**Decision:** Updated Homepage metadata and copy to explicit target "NDIS provider near me" intent.
**Reasoning:** User request + high intent search query. "Near me" queries require relevant text on the page, not just proximity.
**Impact:** Added keywords to `page.tsx` and "Find a provider near you" text to Hero and Service Map.

## 2026-02-16 — Client Handover (Public Website Only)
**Decision:** Created `client-handover/` folder with 4 non-technical documents for client (Meshach).
**Reasoning:** Client receives handover today. He does not need the codebase — only needs links, how-it-works explanation, and support contact info. Admin/staff portals are separate projects.
**Impact:** Folder contains WELCOME.md, WEBSITE-LINKS.md, HOW-IT-WORKS.md, SUPPORT.md. No credentials or technical jargon.

## 2026-02-16 — Prestons 404 Root Cause
**Decision:** Identified that the Prestons 404 is caused by a canceled Vercel deployment, not missing code.
**Reasoning:** Code exists on GitHub (`origin/main` matches local at `eea3cf3`). The last Vercel deployment (2026-02-11) was canceled from the dashboard. A fresh deploy is needed.
**Impact:** Need to trigger Vercel redeploy via dashboard or push a new commit.
