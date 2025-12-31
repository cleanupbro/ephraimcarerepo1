# EPHRAIM CARE - HANDOFF DOCUMENT
> Complete project ready for client handoff
> Date: December 31, 2025

---

## LIVE URLS

| Resource | URL |
|----------|-----|
| **Website** | https://ephraimcarerepo1.vercel.app |
| **Admin Dashboard** | https://ephraimcarerepo1.vercel.app/admin |
| **GitHub Repo** | https://github.com/cleanupbro/Ephraimcarerepo |

---

## ADMIN LOGIN

```
Email: admin@ephraimcare.com.au
Password: admin123
```

---

## WHAT'S WORKING ✅

### Frontend (22 Pages)
- [x] Homepage with hero, services, testimonials
- [x] About page
- [x] Services listing page
- [x] 8 individual service pages
- [x] Referral form with validation
- [x] Contact form with validation
- [x] Privacy Policy
- [x] Terms of Service
- [x] Complaints page

### Interactive Features
- [x] WhatsApp floating button with quick messages
- [x] Interactive service area map (Western Sydney)
- [x] Video welcome section (placeholder ready for YouTube)
- [x] Google Reviews with real review link
- [x] NDIS Calculator
- [x] Service Quiz

### Admin Dashboard
- [x] Admin login (demo credentials)
- [x] Dashboard with stats overview
- [x] **Referrals inbox** - View all referrals
- [x] **Contacts inbox** - View all contact submissions
- [x] Status updates for referrals/contacts
- [x] Mobile responsive

### Backend APIs
- [x] `/api/referrals` - GET/POST/PATCH
- [x] `/api/contacts` - GET/POST/PATCH
- [x] `/api/stats` - Dashboard statistics
- [x] `/api/notify` - SMS/WhatsApp notifications

### Integrations
- [x] Forms submit to n8n webhooks
- [x] Forms submit to internal API (for admin)
- [x] SMS notifications via Twilio
- [x] WhatsApp notifications via Meta API

---

## ENVIRONMENT VARIABLES

### Currently Set (Developer Keys)
These are temporary and will be replaced with client's keys.

```env
# Site
NEXT_PUBLIC_SITE_URL=https://ephraimcarerepo1.vercel.app

# Webhooks
WEBHOOK_REFERRAL=https://nioctibinu.online/webhook/ephraim/referral
WEBHOOK_CONTACT=https://nioctibinu.online/webhook/ephraim/contact

# Twilio (Your keys - replace with client's)
TWILIO_ACCOUNT_SID=ACcab17ff...
TWILIO_AUTH_TOKEN=49ecf08c...
TWILIO_PHONE_NUMBER=+15556323714
ADMIN_NOTIFY_PHONE=+61451918884

# WhatsApp (Your keys - replace with client's)
WHATSAPP_PHONE_ID=849886178205365
WHATSAPP_BUSINESS_ID=2326166361168426
WHATSAPP_ACCESS_TOKEN=EAAZAo7uc...
```

### Client Needs to Provide
1. **Twilio Account** - For SMS notifications
2. **WhatsApp Business** - For WhatsApp notifications
3. **GoDaddy Login** - To connect ephraimcare.com.au domain
4. **Welcome Video** - YouTube URL for video section

---

## DOMAIN SETUP (When Ready)

1. Login to GoDaddy with client credentials
2. Go to DNS settings for ephraimcare.com.au
3. Add these records:
   - **A Record**: @ → 76.76.21.21
   - **CNAME**: www → cname.vercel-dns.com
4. In Vercel, add domain ephraimcare.com.au
5. SSL will auto-configure

---

## HOW TO UPDATE

### Add Welcome Video
1. Edit `/src/components/sections/video-welcome.tsx`
2. Change line 11: `const VIDEO_URL: string | null = null;`
3. To: `const VIDEO_URL = "https://www.youtube.com/embed/VIDEO_ID";`

### Update Phone Number
1. Edit `/src/data/navigation.ts`
2. Change `phone` and `phoneHref` values

### Update Address
1. Edit `/src/data/navigation.ts`
2. Change `address` value

### Add Google Reviews API
1. Get Google Places API key
2. Add to Vercel env vars as `GOOGLE_PLACES_API_KEY`
3. Implement live review fetching

---

## FILE STRUCTURE

```
web/
├── src/
│   ├── app/
│   │   ├── page.tsx ............. Homepage
│   │   ├── referrals/page.tsx ... Referral form
│   │   ├── contact/page.tsx ..... Contact form
│   │   ├── admin/
│   │   │   ├── page.tsx ......... Dashboard
│   │   │   ├── referrals/page.tsx Referrals inbox
│   │   │   ├── contacts/page.tsx. Contacts inbox
│   │   │   └── login/page.tsx ... Login
│   │   └── api/
│   │       ├── referrals/route.ts
│   │       ├── contacts/route.ts
│   │       ├── stats/route.ts
│   │       └── notify/route.ts
│   ├── components/
│   ├── lib/
│   │   └── db.ts ................ Database layer
│   └── data/
├── skills/ ...................... Claude Code skills
├── HANDOFF.md ................... THIS FILE
└── .env.local ................... Environment vars
```

---

## SUPPORT

**Developer:** OpBros Automation
**Email:** support@opbros.online
**GitHub:** @cleanupbro

---

## WHAT'S NOT INCLUDED (Future)

- [ ] Real database (currently in-memory)
- [ ] Production authentication (JWT)
- [ ] Email automation
- [ ] Appointment calendar sync
- [ ] Team management
- [ ] Analytics dashboard
- [ ] Review management

These can be added in a future phase.

---

*Handoff complete. Client can start using the website immediately.*
