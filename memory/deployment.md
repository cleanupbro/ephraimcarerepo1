# Deployment

## GitHub
- **Repository:** https://github.com/cleanupbro/ephraimcarerepo1
- **Default branch:** main
- **Branch strategy:** main = production

## Vercel
- **Project name:** ephraim-care-app (NOT ephraimcarerepo1)
- **Project ID:** prj_NAdt7XKrxBZ5V5o4r9M98pUPAwBJ
- **Team:** sams-projects-3dc6d62d
- **Framework:** Next.js
- **Build command:** `npm run build` (Vercel auto-detects Next.js)
- **Root directory:** `src` (updated 2026-02-16 from `ephraim-care-app`)
- **Node.js:** 24.x

## Environment Variables (Required in Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TELEGRAM_BOT_TOKEN` (Required for notifications)
- `TELEGRAM_CHAT_ID` (Required for notifications)

## Domain
- **Registrar:** GoDaddy
- **Domain:** ephraimcare.com.au
- **DNS:** CNAME → cname.vercel-dns.com

## Live URLs
| Environment | URL | Branch |
|-------------|-----|--------|
| Production | https://www.ephraimcare.com.au | main |
| Preview | Auto-generated | any PR |

## Verify Commands
```bash
git remote get-url origin
cd src && npm run build
```
