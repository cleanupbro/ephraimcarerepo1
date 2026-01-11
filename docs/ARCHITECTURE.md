# System Architecture
> High-level architecture overview

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                              │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL (Hosting)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Next.js Application                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   Public    │  │   Admin     │  │    API      │  │   │
│  │  │   Pages     │  │   Pages     │  │   Routes    │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
           ┌────────────────┼────────────────┐
           │                │                │
           ▼                ▼                ▼
┌─────────────────┐ ┌─────────────┐ ┌─────────────────┐
│    SUPABASE     │ │    N8N      │ │  NOTIFICATIONS  │
│  ┌───────────┐  │ │  Webhooks   │ │  ┌───────────┐  │
│  │ PostgreSQL│  │ │  Workflows  │ │  │ Telegram  │  │
│  │ Database  │  │ │             │ │  │ Twilio    │  │
│  ├───────────┤  │ │             │ │  │ WhatsApp  │  │
│  │   Auth    │  │ │             │ │  └───────────┘  │
│  └───────────┘  │ └─────────────┘ └─────────────────┘
└─────────────────┘
```

---

## Data Flow

### Referral Submission
```
User → Website Form → API Route → Supabase → n8n Webhook → Telegram/SMS
```

### Admin Authentication
```
Admin → Login Page → Supabase Auth → Session Cookie → Protected Routes
```

### Dashboard Stats
```
Admin Dashboard → API Route → Supabase Query → Stats Response
```

---

## Technology Decisions

| Decision | Rationale |
|----------|-----------|
| Next.js App Router | Modern routing, server components, better performance |
| TypeScript | Type safety, better DX, fewer bugs |
| Tailwind CSS | Utility-first, fast development, consistent design |
| Supabase | PostgreSQL + Auth + Realtime in one service |
| Vercel | Seamless Next.js deployment, auto-scaling |
| n8n | Self-hosted workflow automation, no per-run costs |

---

## Security Model

- **Authentication:** Supabase Auth with email/password
- **Authorization:** Middleware protects /admin routes
- **API Security:** Server-side validation, no exposed keys
- **Data Protection:** RLS policies in Supabase
