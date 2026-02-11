# Deployment

## GitHub
- **Repository:** https://github.com/cleanupbro/ephraimcarerepo1
- **Default branch:** main
- **Branch strategy:** main = production

## Vercel
- **Framework:** Next.js
- **Build command:** `cd src && npm run build`
- **Output directory:** `src/.next`
- **Root directory:** `src/` (Note: Ensure Vercel "Root Directory" setting is `src` or `.` depending on repo setup. Currently treating `.` as root with `cd src` build cmd).

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
| Admin | https://www.ephraimcare.com.au/admin | main |
| Preview | Auto-generated | any PR |

## Verify Commands
```bash
git remote get-url origin
cd src && npm run build
```
