# Claude Code Plugins Guide
> Official plugins installed for this project

---

## Installed Plugins

| Plugin | Command | Purpose |
|--------|---------|---------|
| **Ralph Wiggum** | `/ralph-loop "task"` | Autonomous iteration loops |
| **Commit Commands** | `/commit` | Smart git commits |
| **Code Review** | `/code-review` | Multi-agent code review |
| **Frontend Design** | (automatic) | High-quality UI |
| **Feature Dev** | `/feature-dev` | Full feature workflow |
| **Security Guidance** | (automatic) | Vulnerability detection |
| **PR Review** | `/pr-review-toolkit:review-pr` | PR reviews |
| **Hookify** | `/hookify` | Custom behavioral rules |

---

## Installation

```bash
# Add marketplace
/plugin marketplace add anthropics/claude-plugins-official

# Install all
/plugin install ralph-wiggum@claude-plugins-official
/plugin install commit-commands@claude-plugins-official
/plugin install code-review@claude-plugins-official
/plugin install frontend-design@claude-plugins-official
/plugin install feature-dev@claude-plugins-official
/plugin install security-guidance@claude-plugins-official
/plugin install pr-review-toolkit@claude-plugins-official
/plugin install hookify@claude-plugins-official
```

---

## Ralph Wiggum Examples

### Mobile Optimization
```bash
/ralph-loop "Mobile-optimize all admin pages. Output DONE when complete." --max-iterations 25 --completion-promise "DONE"
```

### Fix Build Errors
```bash
/ralph-loop "Fix all TypeScript errors. Output FIXED when build passes." --max-iterations 20 --completion-promise "FIXED"
```

### Add Loading States
```bash
/ralph-loop "Add Suspense + loading.tsx to every page. Output COMPLETE when done." --max-iterations 20 --completion-promise "COMPLETE"
```

---

## When to Use Each Plugin

- **/commit** — Always use instead of manual git commits
- **/code-review** — Before any deployment
- **/ralph-loop** — Tasks touching 5+ files
- **/feature-dev** — New features requiring planning

---

## Plugin Rules

**DO:**
- Use Ralph for bulk operations
- Run code review before deploy
- Use commit commands for smart messages

**DON'T:**
- Use Ralph for debugging
- Skip code review
- Mix manual and plugin commits
