# Deployment Guide
> How to deploy Ephraim Care to production

---

## Overview

Ephraim Care uses:
- **GitHub** for version control
- **Vercel** for hosting (auto-deploys from main branch)

---

## Automatic Deployment

When you push to the `main` branch, Vercel automatically:
1. Detects the push
2. Runs `npm run build`
3. Deploys if successful
4. Updates the live site

---

## Manual Deployment Steps

### 1. Verify Build

```bash
cd ~/Desktop/ephraim-care/ephraim-care-app
npm run build
```

Must pass with 0 errors.

### 2. Commit Changes

```bash
git add -A
git commit -m "feat: description of changes"
```

### 3. Push to GitHub

```bash
git push origin main
```

### 4. Monitor Deployment

- Go to Vercel dashboard
- Watch build progress
- Check for errors

### 5. Verify Live Site

- Visit https://www.ephraimcare.com.au
- Test the changes
- Check browser console for errors

---

## Using the Deploy Script

```bash
cd ~/Desktop/ephraim-care
./executors/deploy.sh
```

This script:
1. Runs build
2. Runs lint
3. Commits changes
4. Pushes to GitHub
5. Logs deployment

---

## Rollback

If something goes wrong:

```bash
git revert HEAD
git push origin main
```

See: directives/emergency-rollback.md

---

## Environment Variables

Vercel environment variables are set in the Vercel dashboard.

Required variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID
