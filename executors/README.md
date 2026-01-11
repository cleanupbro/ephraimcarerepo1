# Executors

Deterministic shell scripts for automated tasks.

## What Are Executors?

Executors are **shell scripts** that perform specific, repeatable tasks. They:
- Take defined inputs
- Produce predictable outputs
- Handle errors gracefully
- Log their actions

## Available Executors

| Script | Purpose | Usage |
|--------|---------|-------|
| `deploy.sh` | Full deployment pipeline | `./executors/deploy.sh` |
| `backup.sh` | Create git backup branch | `./executors/backup.sh` |
| `health-check.sh` | Verify system health | `./executors/health-check.sh` |
| `db-migrate.sh` | Run database migrations | `./executors/db-migrate.sh` |
| `reset-dev.sh` | Reset development environment | `./executors/reset-dev.sh` |

## How to Use

```bash
# Make executable (first time only)
chmod +x executors/*.sh

# Run from project root
./executors/deploy.sh
```

## Creating New Executors

Use this template:
```bash
#!/bin/bash
# executor: [name]
# purpose: [what it does]
# usage: ./executors/[name].sh [args]

set -e  # Exit on error

# Configuration
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$PROJECT_ROOT/ephraim-care-app"
LOG_FILE="$PROJECT_ROOT/logs/[name].log"

# Functions
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Main
log "Starting [name]..."
# Your logic here
log "Completed [name]"
```

## Relationship to Directives

- **Directives** = What to do (instructions)
- **Executors** = How to do it (scripts)

Directives provide context and decision trees. Executors handle the mechanical work.

## Error Handling

All executors:
1. Use `set -e` to exit on first error
2. Log to `logs/` directory
3. Return meaningful exit codes
4. Print status messages
