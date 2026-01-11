# n8n Integration
> Workflow automation setup

---

## Overview

| Item | Value |
|------|-------|
| **Instance** | https://nioctibinu.online |
| **Status** | Self-hosted |

---

## Active Webhooks

### Referral Webhook
- **URL:** https://nioctibinu.online/webhook/ephraim/referral
- **Trigger:** Form submission
- **Actions:**
  1. Log to Supabase
  2. Send Telegram notification
  3. Send SMS (optional)

### Contact Webhook
- **URL:** https://nioctibinu.online/webhook/ephraim/contact
- **Trigger:** Form submission
- **Actions:**
  1. Log to Supabase
  2. Send Telegram notification

---

## Pending Workflows

| Workflow | Trigger | Status |
|----------|---------|--------|
| Daily Summary | Scheduled (8am) | Pending |
| Appointment Reminder | 24hr before | Pending |
| Incident Alert | High severity | Pending |
| Credential Expiry | 30 days before | Pending |

---

## Notification Channels

### Telegram
- Bot token configured
- Chat ID for admin group

### SMS (Twilio)
- Account SID configured
- Auth token set
- From number set

### WhatsApp (Pending)
- Awaiting API credentials

---

## Creating New Workflows

1. Access n8n at https://nioctibinu.online
2. Create new workflow
3. Add webhook trigger
4. Configure actions
5. Activate workflow
6. Update API route to call webhook
