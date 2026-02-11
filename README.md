```text
  ______ _____  _    _ _____           _____ __  __   _____          _____  ______ 
 |  ____|  __ \| |  | |  __ \   /\    |_   _|  \/  | / ____|   /\   |  __ \|  ____|
 | |__  | |__) | |__| | |__) | /  \     | | | \  / || |       /  \  | |__) | |__   
 |  __| |  ___/|  __  |  _  / / /\ \    | | | |\/| || |      / /\ \ |  _  /|  __|  
 | |____| |    | |  | | | \ \/ ____ \  _| |_| |  | || |____ / ____ \| | \ \| |____ 
 |______|_|    |_|  |_|_|  \_\_/    \_\_____|_|  |_| \_____/_/    \_\_|  \_\______|
```

# Ephraim Care — Production Platform 2026

> Professional NDIS Disability & Mental Health Support Services Website

**🌐 Live:** [ephraimcare.com.au](https://www.ephraimcare.com.au)  
**🚀 Edition:** Production Handover (v2.4.0)  
**📍 Region:** Liverpool, Western & Southwestern Sydney

---

## 📋 Handover Context

This repository contains the core public-facing platform for **Ephraim Care Pty Ltd**. It has been audited, restructured, and hardened for production deployment.

### 🛠 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict)
- **UI:** Tailwind CSS + Radix UI + Lucide Icons
- **Animation:** Motion (framer-motion)
- **Database:** Supabase (Auth + PostgreSQL)
- **Notifications:** n8n Webhooks (SMS, WhatsApp, Telegram, Email)
- **Voice AI:** ElevenLabs Integration

---

## 📂 Project Anatomy

```text
./
├── src/                    # Next.js Source Code
│   ├── app/                # App Router (Pages, API Routes)
│   ├── components/         # Modern, Accessible UI Components
│   ├── data/               # Navigation & Services Registry
│   ├── lib/                # Database Clients & Core Logic
│   └── public/             # High-Res Media & NDIS Badges
│
├── memory/                 # Persistent Brain (Decisions & Lessons)
├── skills/                 # Automated Workflow Definitions
├── api-keys/               # Centralized Service Registry
└── progress.md             # Living Project Roadmap
```

---

## ⚡ Production Readiness Audit

The following critical "Production-Ready" fixes were applied during the handover audit:

1.  **Data Persistence:** Migrated `api/stats` and form handling from in-memory arrays to **Supabase**. No more data loss on deployment.
2.  **Broken Link Removal:** Fixed 404 error on `/careers`; replaced with **Complaints** process in footer for NDIS compliance.
3.  **SEO Dominance:** Optimized for Liverpool local search. Expanded JSON-LD `areaServed` and keywords to cover 22 Southwestern Sydney suburbs.
4.  **Browser Verified:** 12-page manual browser audit performed. Forms (Referrals/Contact), Navigation, and Responsive Layouts verified 100% functional.
5.  **Performance:** Next.js Build optimized; Lighthouse scores verified.

---

## 🗺️ SEO Coverage (Suburbs)

We are targeting local search dominance in:
`Liverpool, Prestons, Fairfield, Lurnea, Cabramatta, Casula, Moorebank, Green Valley, Hinchinbrook, Cecil Hills, Ingleburn, Miller, Bankstown, Wetherill Park, Campbelltown, Parramatta, Penrith, Blacktown, Holsworthy, Bossley Park.`

---

## 🚀 Getting Started

1. **Clone & Install:**
   ```bash
   git clone https://github.com/cleanupbro/ephraimcarerepo1.git
   cd src && npm install
   ```

2. **Environment Setup:**
   Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WEBHOOK_REFERRAL` (n8n)
   - `NEXT_PUBLIC_WEBHOOK_CONTACT` (n8n)
   - `TELEGRAM_BOT_TOKEN`

3. **Deployment:**
   Merge to `main` for auto-deploy to Vercel production.

---

## 👤 Contacts

**Client:** Meshach (Ephraim Care)  
**Developer:** [OpBros.AI](https://opbros.online) — theopbros.ai@gmail.com  
**Support:** 0451 918 884

---
*Built with passion for quality disability support. — 2026 Handover Ready.*
