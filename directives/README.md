# Directives

Standard Operating Procedures (SOPs) for common workflows.

## What Are Directives?

Directives are **human-readable instructions** that any AI assistant can follow. They define:
- **Goal**: What we're trying to achieve
- **When to Use**: Trigger conditions
- **Steps**: Sequential instructions
- **Edge Cases**: What to do when things go wrong

## Available Directives

| Directive | Purpose |
|-----------|---------|
| `deploy.md` | Production deployment workflow |
| `code-review.md` | Pre-deploy code quality check |
| `new-feature.md` | Adding new functionality |
| `bug-fix.md` | Fixing bugs safely |
| `client-change.md` | Implementing client requests |
| `incident-report.md` | NDIS incident documentation |
| `database-migration.md` | Schema changes |
| `emergency-rollback.md` | Revert production issues |

## How to Use

1. Identify which directive matches your task
2. Read the directive file
3. Follow steps in order
4. Check edge cases if something goes wrong

## Creating New Directives

Use this template:
```markdown
# Directive: [Name]

## Goal
[What this directive achieves]

## When to Use
- [Trigger condition 1]
- [Trigger condition 2]

## Steps

### 1. [Step Name]
[Instructions]

### 2. [Step Name]
[Instructions]

## Edge Cases

### [Scenario]
[How to handle it]
```

## Relationship to Executors

- **Directives** = What to do (instructions)
- **Executors** = How to do it (scripts)

Directives may reference executors for automated steps.
