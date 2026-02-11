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
