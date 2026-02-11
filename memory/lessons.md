# Lessons Learned

> Append-only log. Never delete entries. Mark outdated with `[OUTDATED]`.

## 2026-01-21 — Tailwind CSS Path Fix
**Context:** After flattening `src/` structure, Tailwind stopped applying styles.
**Problem:** Tailwind `content` paths still pointed to old `./src/*` pattern.
**Fix:** Updated `tailwind.config.ts` content paths to `./*`.
**Rule:** Always update Tailwind content paths after any structural change.

## 2026-01-21 — Session Continuity
**Context:** Context lost between AI sessions.
**Problem:** New session AI didn't know what was done previously.
**Fix:** Created STATUS.md + LOG.md protocol for end-of-session saves.
**Rule:** Always update state files before ending a session.
