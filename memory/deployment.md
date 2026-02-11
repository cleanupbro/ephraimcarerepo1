# Deployment

## GitHub
- **Repository:** https://github.com/cleanupbro/ephraimcarerepo1
- **Default branch:** main
- **Branch strategy:** main = production

## Vercel
- **Framework:** Next.js
- **Build command:** `cd src && npm run build`
- **Output directory:** `src/.next`
- **Root directory:** `src/`

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
