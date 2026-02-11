# API Key Registry

Master list of all API keys, tokens, and credentials this project uses.

**⚠️ NEVER put actual key values in this file. Only names and metadata.**

## Active Keys

| Service | Env Variable | Purpose | Get It From | Used In |
|---------|-------------|---------|-------------|---------|
| Supabase | `NEXT_PUBLIC_SUPABASE_URL` | Database URL | Supabase Dashboard → Settings → API | `src/lib/supabase.ts` |
| Supabase | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key | Supabase Dashboard → Settings → API | `src/lib/supabase.ts` |
| Supabase | `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin key | Supabase Dashboard → Settings → API | API routes |
| n8n | `WEBHOOK_REFERRAL` | Referral automation | n8n instance webhook node | `src/app/api/referrals/` |
| n8n | `WEBHOOK_CONTACT` | Contact automation | n8n instance webhook node | `src/app/api/contacts/` |
| Twilio | `TWILIO_ACCOUNT_SID` | SMS auth | Twilio Console | `src/app/api/notify/` |
| Twilio | `TWILIO_AUTH_TOKEN` | SMS auth | Twilio Console | `src/app/api/notify/` |
| Twilio | `TWILIO_PHONE_NUMBER` | SMS sending number | Twilio Console | `src/app/api/notify/` |
| WhatsApp | `WHATSAPP_ACCESS_TOKEN` | WhatsApp notifications | Meta Business Suite | `src/app/api/notify/` |
| Google | `GOOGLE_PLACES_API_KEY` | Live reviews | Google Cloud Console | Components |
| Vercel | `VERCEL_TOKEN` | CLI deployments | Vercel Dashboard → Settings → Tokens | `ops/deploy.sh` |

## Key Rotation Schedule

| Service | Last Rotated | Next Rotation | Rotated By |
|---------|-------------|---------------|------------|
| Supabase | Project creation | As needed | Admin |
| Twilio | TBD | TBD | Client |

## Environment Setup

```bash
# 1. Copy the template
cd src && cp .env.example .env.local

# 2. Fill in values from the sources above

# 3. For Vercel, set via dashboard or CLI:
vercel env add VARIABLE_NAME

# 4. Verify all keys are set:
grep -E "^[A-Z].*=$" .env.local  # Shows any empty keys
```

## Security Rules

1. Never commit `.env` files to Git (`.gitignore` handles this)
2. Use different keys for dev/staging/production
3. Rotate keys immediately if exposed
4. Use server-only env vars for sensitive keys (no `NEXT_PUBLIC_` prefix)
5. Revoke unused keys promptly
