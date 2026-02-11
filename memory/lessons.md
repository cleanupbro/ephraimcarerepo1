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

## 2026-02-12 — Vercel Env Vars Silent Failure
**Context:** Telegram notifications weren't working despite code being correct.
**Problem:** `TELEGRAM_BOT_TOKEN` was missing from Vercel environment variables, causing silent exit in API route.
**Fix:** Added variables to `.env.example` as a reminder. User must add them to Vercel Project Settings.
**Rule:** Always audit Vercel Project Settings > Environment Variables when adding new integrations.

## 2026-02-12 — Repo Structure Confusion
**Context:** User confused by "404 coverage" for `ephraim-care-app` subfolder.
**Problem:** Project was flattened to root, but user expected old subfolder structure.
**Fix:** Clarified that root-based structure is standard for Vercel.
**Rule:** Make sure project documentation clearly states the root directory structure.
