# Environment Variables
> Required environment variables (no values)

---

## Supabase

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |

---

## Telegram

| Variable | Description |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Telegram bot API token |
| `TELEGRAM_CHAT_ID` | Chat ID for notifications |

---

## Twilio (SMS)

| Variable | Description |
|----------|-------------|
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_FROM_NUMBER` | Twilio phone number |

---

## n8n

| Variable | Description |
|----------|-------------|
| `N8N_WEBHOOK_URL` | Base URL for n8n webhooks |

---

## Optional

| Variable | Description |
|----------|-------------|
| `WHATSAPP_API_TOKEN` | WhatsApp Business API (pending) |
| `GMAIL_APP_PASSWORD` | Gmail SMTP (pending) |

---

## Local Setup

1. Copy `.env.example` to `.env.local`
2. Fill in values from secure storage
3. Never commit `.env.local`

---

## Vercel Setup

1. Go to Vercel dashboard
2. Project → Settings → Environment Variables
3. Add each variable
4. Redeploy to apply
