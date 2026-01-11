# Notifications Integration
> Multi-channel notification system

---

## Active Channels

### Telegram
- **Status:** Active
- **Usage:** Admin alerts for referrals/contacts
- **Config:**
  ```
  TELEGRAM_BOT_TOKEN=[bot token]
  TELEGRAM_CHAT_ID=[chat id]
  ```

### SMS (Twilio)
- **Status:** Configured
- **Usage:** Client notifications
- **Config:**
  ```
  TWILIO_ACCOUNT_SID=[sid]
  TWILIO_AUTH_TOKEN=[token]
  TWILIO_FROM_NUMBER=[number]
  ```

---

## Pending Channels

### WhatsApp Business
- **Status:** Awaiting credentials
- **Usage:** Client reminders

### Email (Gmail SMTP)
- **Status:** Awaiting app password
- **Usage:** Formal communications

---

## Notification Triggers

| Event | Telegram | SMS | WhatsApp |
|-------|----------|-----|----------|
| New referral | Yes | Optional | - |
| New contact | Yes | - | - |
| Appointment reminder | - | Yes | Pending |
| Incident alert | Yes | Yes | - |

---

## API Endpoint

```
POST /api/notify

Body:
{
  "channel": "telegram" | "sms",
  "message": "string",
  "phone": "string" (for SMS)
}
```

---

## Adding New Channels

1. Get API credentials
2. Add to `.env.local`
3. Add to Vercel env vars
4. Update `/api/notify` route
5. Test notification
