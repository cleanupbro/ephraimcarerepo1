# PRD — Ephraim Care Website

## Objective

Professional, NDIS-compliant **public website** for Ephraim Care Pty Ltd — a disability and mental health support provider in Western & Southwestern Sydney. The site showcases services, handles online referrals and contact forms, and triggers automated notifications. The admin portal and backend operations live in a separate repo (`ephraimcare-portal-2026`).

## In Scope

- [x] Public website with 8 service pages
- [x] Contact and referral forms with validation
- [x] About, FAQ, complaints, privacy policy, terms pages
- [x] n8n webhook automation (form submissions → notifications)
- [x] ElevenLabs Voice AI widget
- [x] Mobile-responsive design
- [x] SEO optimization, sitemap, meta tags
- [x] Accessibility (skip links, ARIA labels)
- [ ] Form submission improvements (validation, error handling)
- [ ] Performance optimization (Core Web Vitals)

## Out of Scope

- Admin dashboard (lives in `ephraimcare-portal-2026`)
- Backend participant management
- Billing / payment processing
- Mobile native app

## Build Order

1. ~~Frontend MVP~~ ✅
2. ~~Voice AI & Automation~~ ✅
3. ~~Front-End Design Polish~~ ✅
4. Form & API improvements ← **current**
5. Performance & SEO optimization

## Success Criteria

- All pages load < 3 seconds
- Forms submit and trigger n8n webhooks correctly
- NDIS-compliant language throughout
- Mobile-first responsive design on all pages
- Zero hardcoded secrets in codebase
