# Domain/DNS Skill
> Manage domain configuration and DNS settings
> Priority: LOW

---

## TRIGGERS

- "domain"
- "DNS"
- "GoDaddy"
- "www"
- "CNAME"
- "A record"
- "SSL"

---

## PRE-FLIGHT CHECKS

1. [ ] Understand what DNS change is needed
2. [ ] Verify GoDaddy access credentials
3. [ ] Check current DNS configuration
4. [ ] Plan TTL considerations

---

## DOMAIN DETAILS

**Domain:** ephraimcare.com.au
**Registrar:** GoDaddy
**Hosting:** Vercel

**Current Configuration:**
- www.ephraimcare.com.au → Vercel (CNAME)
- ephraimcare.com.au → Redirects to www

---

## GODADDY CREDENTIALS

**Location:** `.secrets/CLIENT_KEYS.md`

```
API Key: h1eEWYWneWrG_7AG2GnHSXv48kQM561QyBa
API Secret: XNQXzQKzSWMcuRnAN2h3SR
```

---

## STEPS

### 1. Access GoDaddy DNS
- Login at: https://dcc.godaddy.com/
- Or use API for programmatic changes

### 2. Current DNS Records

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | cname.vercel-dns.com | 1 hour |
| A | @ | 76.76.21.21 | 1 hour |

### 3. Common DNS Operations

#### Add CNAME Record
```
Type: CNAME
Name: subdomain
Value: target.domain.com
TTL: 1 Hour
```

#### Add A Record
```
Type: A
Name: @
Value: IP.ADDRESS
TTL: 1 Hour
```

#### Verify Propagation
```bash
# Check DNS resolution
dig www.ephraimcare.com.au
nslookup www.ephraimcare.com.au
```

### 4. Vercel Domain Configuration
In Vercel Dashboard:
1. Go to Project Settings → Domains
2. Add domain
3. Verify DNS configuration
4. Wait for SSL certificate

---

## VERCEL DNS VALUES

For Vercel hosting, use:
- **CNAME:** cname.vercel-dns.com
- **A Record:** 76.76.21.21

---

## SSL CERTIFICATE

Vercel provides automatic SSL via Let's Encrypt.
- Certificate auto-renews
- Both www and non-www covered
- Force HTTPS enabled

---

## DNS PROPAGATION

DNS changes can take:
- Minimum: 5 minutes
- Typical: 1-4 hours
- Maximum: 48 hours

Check propagation:
- https://www.whatsmydns.net/
- https://dnschecker.org/

---

## VERIFICATION

- [ ] DNS records correct
- [ ] Domain resolves to Vercel
- [ ] SSL certificate valid
- [ ] www and non-www both work
- [ ] HTTPS forced

---

## IF FAILED

1. Check DNS record syntax
2. Wait for propagation (up to 48 hours)
3. Verify Vercel domain configuration
4. Check for conflicting records
5. Contact GoDaddy support if needed

---

## TROUBLESHOOTING

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Domain not resolving | DNS propagation | Wait 1-48 hours |
| SSL error | Certificate pending | Wait for Vercel to provision |
| Wrong content | Caching | Clear browser cache |
| Redirect loop | Conflicting settings | Check Vercel redirects |

---

## SUCCESS MESSAGE

"Domain configured: [domain]. DNS propagation may take up to 48 hours."

---

*DNS changes require patience. Allow time for propagation.*
