# Agent Rules

> **GitHub:** https://github.com/cleanupbro/ephraimcarerepo1

## Navigation

Every folder and subfolder has a `README.md`. Read it before working in that folder.

## Memory

Persistent memory lives in `memory/`. It survives session exits and restarts.

### On Session Start (mandatory)

1. Read all files in `memory/`
2. Read `progress.md`
3. Check `skills/README.md` for available skills
4. Check `api-keys/README.md` for available API configs
5. You now have full context. Begin work.

### On Session End (mandatory)

1. Update `progress.md`
2. Append decisions to `memory/decisions.md`
3. Append lessons to `memory/lessons.md`
4. Update `memory/stack.md` or `memory/deployment.md` if changed

### Memory Rules

- Never delete entries — append only
- Mark outdated entries with `[OUTDATED]`
- Every entry must have a date

## Skills

Skills live in `skills/`. They teach agents how to do specific tasks.

Each skill is a folder with a `SKILL.md` file containing instructions. Legacy workflow `.md` files also live in `skills/`.

To use a skill:
1. On session start, scan `skills/README.md` for available skills
2. When a task matches a skill's description, load that skill's `SKILL.md`
3. Follow the skill's workflow

## API Keys

API key documentation lives in `api-keys/registry.md`.
**Never store actual key values in any file.** Only names, purposes, and where to get them.
Actual values go in `.env` files and platform dashboards.

## Absolute Rules

- Never modify: `.git/`, `.env*`, `.vercel/`, `node_modules/`, lock files
- Never hardcode secrets — use `.env`
- Never push or deploy without explicit approval
- If uncertain, ask — don't guess
