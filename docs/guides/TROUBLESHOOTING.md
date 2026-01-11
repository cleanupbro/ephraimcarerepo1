# Troubleshooting Guide
> Common issues and solutions

---

## Build Errors

### "Module not found"

**Cause:** Missing dependency or wrong import path.

**Fix:**
1. Check import path is correct
2. Run `npm install`
3. Check for typos

### TypeScript Errors

**Cause:** Type mismatch or missing types.

**Fix:**
1. Read the error message
2. Add proper types
3. Check `@/types/` for existing types

---

## Runtime Errors

### "Hydration mismatch"

**Cause:** Server/client content differs.

**Fix:**
1. Wrap dynamic content in `useEffect`
2. Use `suppressHydrationWarning` for dates
3. Check for browser-only code

### API Errors

**Cause:** Missing env vars or wrong endpoint.

**Fix:**
1. Check `.env.local` has all variables
2. Verify Supabase credentials
3. Check network tab in browser

---

## Deployment Issues

### Build Fails on Vercel

**Cause:** Usually env vars or dependency issues.

**Fix:**
1. Check Vercel logs
2. Verify env vars are set in Vercel dashboard
3. Run `npm run build` locally first

### Site Not Updating

**Cause:** Cache or failed deployment.

**Fix:**
1. Hard refresh (Cmd+Shift+R)
2. Check Vercel dashboard for deploy status
3. Verify push was successful

---

## Database Issues

### Connection Failed

**Cause:** Wrong credentials or network issue.

**Fix:**
1. Verify SUPABASE_URL is correct
2. Check SUPABASE_ANON_KEY
3. Test in Supabase dashboard

---

## Getting Help

1. Check error message carefully
2. Search in logs/errors.md
3. Contact: theopbros.ai@gmail.com
