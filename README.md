# Ephraim Care

> NDIS Disability & Mental Health Support Services — Western & Southwestern Sydney

**🌐 Live:** [ephraimcare.com.au](https://www.ephraimcare.com.au) · **Version:** 2.3.1

---

## Overview

Professional website for **Ephraim Care Pty Ltd**, an NDIS-registered provider delivering compassionate, person-centred disability and mental health support. Built with Next.js 14, TypeScript, and Tailwind CSS.

### Services

| Service | Description |
|---------|-------------|
| Daily Living Support | Assistance with everyday tasks and routines |
| Community Participation | Social engagement and community access |
| Supported Independent Living | 24/7 supported accommodation |
| Psychosocial Recovery | Mental health recovery support |
| Transport Services | Safe travel to appointments and activities |
| Personal Care | Hygiene, grooming, and personal assistance |
| Short-Term Accommodation | Respite and temporary housing |
| Group Activities | Structured social programs |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 + Radix UI |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Automation | n8n (webhooks) |
| Voice AI | ElevenLabs |

---

## Project Structure

```
./
├── src/                    Next.js application
│   ├── app/                App Router pages & API routes
│   ├── components/         React components
│   ├── data/               Static content & service data
│   ├── lib/                Utilities & Supabase client
│   ├── hooks/              Custom React hooks
│   ├── types/              TypeScript definitions
│   └── public/             Static assets
│
├── memory/                 Persistent project context
├── skills/                 Agent skills & workflows
├── api-keys/               API key registry (no values)
├── docs/                   Architecture & documentation
└── ops/                    Deployment & operations scripts
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/cleanupbro/ephraimcarerepo1.git
cd ephraimcarerepo1/src

# Install
npm install

# Configure
cp .env.example .env.local
# Fill in values — see api-keys/registry.md

# Run
npm run dev
```

Open [localhost:3000](http://localhost:3000)

---

## Key Features

- ✅ 8 NDIS service pages with detailed descriptions
- ✅ Online referral and contact forms
- ✅ Automated notifications via n8n webhooks
- ✅ ElevenLabs Voice AI assistant
- ✅ NDIS Funding Calculator
- ✅ Mobile-first responsive design
- ✅ SEO optimized with sitemap
- ✅ Accessibility compliant (ARIA, skip links)

---

## Deployment

Auto-deploys from `main` via **Vercel**.

| Environment | URL |
|-------------|-----|
| Production | [ephraimcare.com.au](https://www.ephraimcare.com.au) |

---

## Contact

**Ephraim Care Pty Ltd**
📞 0426 800 901 · ✉️ contact@ephraimcare.com.au
📍 Western & Southwestern Sydney, NSW

---

*Built by [OpBros.AI](https://opbros.online)*
