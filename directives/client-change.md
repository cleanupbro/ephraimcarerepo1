# Directive: Client-Requested Change

## Goal
Implement a change requested by the client.

## Steps

### 1. Clarify the Request
Before coding:
- What exactly needs to change?
- Which page/component?
- Any specific requirements?

### 2. Find the File
- Pages: `src/app/[route]/page.tsx`
- Components: `src/components/[category]/[name].tsx`
- Data: `src/data/[file].ts`

### 3. Make the Change
- Minimal, focused changes
- Keep existing patterns
- Don't refactor unrelated code

### 4. Test Locally
```bash
npm run dev
```
- Verify change looks correct
- Check mobile view
- Check for errors

### 5. Build Verify
```bash
npm run build
```
Must pass.

### 6. Log the Change
Update `docs/client/FEEDBACK.md` with:
- Date
- What was requested
- What was changed
- Status: Complete

### 7. Deploy
Follow: directives/deploy.md

### 8. Notify Client
Inform client the change is live.

## Edge Cases

### Unclear Request
Ask for clarification. Don't guess.

### Large Request
Estimate time and confirm before starting.
