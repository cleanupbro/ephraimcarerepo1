# Presenter Notes — Ephraim Care Website

> **For:** Sam (OpBros.AI) — your personal reference when presenting to Meshach
> **Date:** 16 February 2026
> **NOT for client** — this is your cheat sheet

---

## Quick Walkthrough Order

Open the live site and walk through in this order:

### 1. Homepage (ephraimcare.com.au)
- Hero banner with call-to-action buttons
- Service grid showing all 8 NDIS services with NDIS codes
- NDIS funding calculator (interactive)
- Service area map
- About preview section
- CTA banner with phone number

### 2. About (/about)
- Company story, mission, values
- Team section
- Trust signals (NDIS registered, quality standards)

### 3. Services (/services)
- All 8 services listed with icons and NDIS codes
- Click any service → dedicated service detail page with full description
- 8 individual service pages auto-generated from data

### 4. Contact (/contact)
- **DEMO THIS:** Fill out the form live — show him the notification arrives on his phone
- Fields: name, email, phone, message
- Data saves to Supabase automatically
- Notification sent via Telegram

### 5. Referrals (/referrals)
- **DEMO THIS:** Walk through the referral form
- Fields: participant details, NDIS number, support needs, coordinator info
- Same flow: saves to database → instant notification
- This is the money page — support coordinators use this

### 6. Complaints (/complaints)
- NDIS compliance requirement — every provider needs this
- Simple feedback/complaints form

### 7. Prestons (/prestons)
- **KEY SELLING POINT:** Dedicated SEO landing page
- Targeting "NDIS provider Prestons 2170" on Google
- Shows office address, services, nearby suburbs covered
- Local FAQ section
- Structured data for Google Maps / local search

### 8. FAQ (/faq)
- Common questions pre-answered
- Reduces inbound enquiries for basic stuff

### 9. Legal Pages
- Privacy Policy (/privacy) and Terms of Service (/terms)
- Standard legal pages — required for business credibility

---

## Architecture — What's Under The Hood

| Layer | Technology | What It Does |
|-------|-----------|--------------|
| Frontend | Next.js 14 + React 18 | Renders all pages, handles routing |
| Styling | Tailwind CSS + Radix UI | Design system, responsive layout, accessibility |
| Database | Supabase (PostgreSQL) | Stores form submissions (contacts, referrals) |
| Notifications | Telegram Bot API | Sends instant alerts to Meshach's phone |
| Hosting | Vercel | Auto-deploys from GitHub, global CDN, SSL |
| Domain | GoDaddy → Vercel DNS | ephraimcare.com.au with HTTPS |
| SEO | Built-in meta tags + JSON-LD | Structured data for Google ranking |
| Animations | Motion (Framer Motion) | Smooth fade-ins and transitions |
| Forms | React Hook Form + Zod | Client-side validation before submission |
| Voice AI | ElevenLabs Widget | AI voice assistant (widget embedded) |

---

## By The Numbers

| Metric | Value |
|--------|-------|
| Lines of code written | **10,660** (TypeScript, React, CSS) |
| Source files | **77** |
| React components | **36** |
| Pages | **10** (+ 8 dynamic service pages = **18 total**) |
| API routes | **4** (contacts, referrals, notifications, stats) |
| Data models | **6** (services, team, FAQ, images, navigation) |
| Git commits | **67** |
| Project duration | **48 days** (31 Dec 2025 → 16 Feb 2026) |
| Version | **v2.3.1** |

---

## Value Delivered — What This Would Cost Elsewhere

### Agency Pricing (Australia)

| Option | Typical Cost | What You'd Get |
|--------|-------------|----------------|
| Web agency (10-page NDIS site) | **$8,000 – $15,000** | Static site, basic SEO, 3-month timeline |
| Freelancer (mid-level) | **$4,000 – $8,000** | Similar scope, 1-2 month timeline |
| Wix/Squarespace DIY | **$500 – $1,500/yr** | Template site, no custom forms, no notifications, weak SEO |
| WordPress + plugins | **$2,000 – $5,000** | Needs ongoing maintenance, security updates, hosting fees |

### What Meshach Is Getting (That Agencies Don't Include)

| Feature | Agency Charges Extra? | Included Here? |
|---------|----------------------|----------------|
| Custom referral form with validation | Yes ($500-1,000) | Yes |
| Instant Telegram notifications | Yes ($300-800) | Yes |
| Database-backed form storage | Yes ($500-1,500) | Yes |
| Local SEO landing page (Prestons) | Yes ($500-1,000 per page) | Yes |
| Structured data / JSON-LD | Yes ($300-500) | Yes |
| NDIS calculator widget | Yes ($500-1,000) | Yes |
| ElevenLabs voice AI | Not offered | Yes |
| Responsive mobile design | Usually included | Yes |
| SSL / HTTPS | Usually included | Yes |
| 30-day bug fix support | Sometimes ($500+) | Yes |

### Ongoing Costs He Avoids

| Service | Typical Monthly Cost | His Cost |
|---------|---------------------|----------|
| Vercel hosting (Hobby) | $0 | **$0** |
| Supabase (Free tier) | $0 | **$0** |
| Domain (GoDaddy) | ~$3/mo | **~$3/mo** |
| Telegram notifications | $0 | **$0** |
| SSL certificate | $0 (Vercel auto) | **$0** |
| **Total monthly** | — | **~$3/mo** |

vs. typical agency ongoing costs: $50-200/mo for hosting + maintenance

### Total Value Summary

| Item | Value |
|------|-------|
| Website build (agency equivalent) | **$10,000 – $15,000** |
| Custom integrations (forms, notifications, SEO) | **$2,000 – $4,000** |
| Voice AI integration | **$1,000 – $2,000** |
| First year hosting saved | **$600 – $2,400** |
| **Total value delivered** | **$13,600 – $23,400** |

---

## Key Talking Points For The Meeting

1. **"This runs on $3/month"** — no hosting fees, no maintenance fees, no plugin subscriptions
2. **"Every form goes straight to your phone"** — show the Telegram notification live
3. **"Google can find you now"** — show the Prestons page, explain the SEO strategy
4. **"No login needed"** — the public site is maintenance-free. Changes go through us.
5. **"It's built to scale"** — when you open new locations, we add a landing page for each one (same pattern as Prestons)
6. **"Your data is yours"** — all submissions stored in Supabase, exportable anytime

---

## Things To Demo Live

1. Open homepage on phone — show responsive design
2. Fill out the Contact form — watch the Telegram notification arrive
3. Google "NDIS provider Prestons" — show ranking progress (may take 2-4 weeks)
4. Click through Services → show individual service pages with NDIS codes
5. Show the NDIS calculator on homepage

---

## Questions He Might Ask

| Question | Answer |
|----------|--------|
| "Can I update the website myself?" | No — and that's by design. It keeps the site secure and professional. Send us a message and we update it within 24-48 hours. |
| "What if the website goes down?" | Vercel has 99.99% uptime and auto-heals. If something breaks, we get alerted and fix it. |
| "Can I add more services later?" | Yes — we add them to the data file and they appear automatically on the services page. |
| "What about the admin portal?" | That's a separate project. We'll hand that over separately. |
| "What if I change my phone number?" | Send us the new number, we update it across all pages in one commit. |
| "Do I need to pay for anything monthly?" | Just the domain (~$3/mo through GoDaddy). Everything else is free tier. |
