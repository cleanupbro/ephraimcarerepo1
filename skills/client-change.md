# Client Change Skill
> Process client feedback and change requests
> Priority: HIGH

---

## TRIGGERS

- "client wants"
- "client asked"
- "change request"
- Screenshots of desired changes
- "client feedback"
- "client said"

---

## PRE-FLIGHT CHECKS

1. [ ] Understand the exact change requested
2. [ ] Identify which files need modification
3. [ ] Check if change affects NDIS compliance
4. [ ] Verify change doesn't break existing functionality

---

## STEPS

### 1. Clarify Requirements
- What exactly does the client want?
- Is there a screenshot or reference?
- What is the current behavior vs desired behavior?

### 2. Identify Impact
```
Questions to answer:
- Which components are affected?
- Does this change the layout?
- Does it affect mobile responsiveness?
- Does it change any text (check NDIS compliance)?
```

### 3. Make Changes
- Navigate to affected files
- Make incremental changes
- Test after each modification

### 4. Build Verification
```bash
cd ~/Desktop/ephraim-care/ephraim-care-app
npm run build
```
Must complete with 0 errors.

### 5. Test Visually
- Check desktop view
- Check mobile view
- Verify change matches client expectation

### 6. Document Change
Update CLIENT_SUMMARY.md with:
- Date
- Client request
- What was done
- Version number

---

## NDIS COMPLIANCE CHECK

**NEVER use these terms:**
- "medical" / "clinical" / "therapeutic"
- "treatment" / "diagnosis"
- "cure" / "heal"

**Always use these instead:**
- "support" / "assistance" / "care"
- "participant" (not patient)
- "plan" / "goals" / "outcomes"

---

## VERIFICATION

- [ ] Change matches client request
- [ ] Build passes
- [ ] Mobile view works
- [ ] NDIS compliant language used
- [ ] CLIENT_SUMMARY.md updated

---

## IF FAILED

1. Rollback changes: `git checkout -- [file]`
2. Re-read client requirements
3. Ask for clarification if unclear
4. Try alternative approach

---

## SUCCESS MESSAGE

"Client change implemented. [Description of change]. Ready for deploy."

---

*For deployment, use deploy.md skill.*
