# API Reference
> Complete API endpoint documentation

---

## Base URL
```
Production: https://www.ephraimcare.com.au/api
Development: http://localhost:3000/api
```

---

## Endpoints

### /api/referrals

| Method | Description |
|--------|-------------|
| GET | List all referrals |
| POST | Create new referral (triggers n8n) |
| PATCH | Update referral status |

**POST Body:**
```json
{
  "participantName": "string",
  "participantEmail": "string",
  "participantPhone": "string",
  "ndisNumber": "string (optional)",
  "supportNeeds": "string",
  "preferredContactMethod": "email | phone",
  "referrerName": "string (optional)",
  "referrerOrganisation": "string (optional)"
}
```

---

### /api/contacts

| Method | Description |
|--------|-------------|
| GET | List all contacts |
| POST | Create new contact (triggers n8n) |
| PATCH | Update contact status |

**POST Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string"
}
```

---

### /api/participants

| Method | Description |
|--------|-------------|
| GET | List all participants |
| POST | Create new participant |
| PATCH | Update participant |

---

### /api/appointments

| Method | Description |
|--------|-------------|
| GET | List appointments |
| POST | Create appointment |
| PATCH | Update appointment |

---

### /api/incidents

| Method | Description |
|--------|-------------|
| GET | List incident reports |
| POST | Create incident report |
| PATCH | Update incident |

---

### /api/handovers

| Method | Description |
|--------|-------------|
| GET | List shift handovers |
| POST | Create handover |
| PATCH | Update handover |

---

### /api/progress-notes

| Method | Description |
|--------|-------------|
| GET | List progress notes |
| POST | Create progress note |

---

### /api/staff

| Method | Description |
|--------|-------------|
| GET | List staff members |
| POST | Add staff member |
| PATCH | Update staff member |

---

### /api/stats

| Method | Description |
|--------|-------------|
| GET | Dashboard statistics |

**Response:**
```json
{
  "referrals": { "total": 0, "new": 0 },
  "contacts": { "total": 0, "unread": 0 },
  "participants": { "total": 0 },
  "appointments": { "upcoming": 0 }
}
```

---

### /api/notify

| Method | Description |
|--------|-------------|
| POST | Send notification |

**POST Body:**
```json
{
  "channel": "telegram | sms",
  "message": "string",
  "phone": "string (required for sms)"
}
```

---

### /api/auth/create-admin

| Method | Description |
|--------|-------------|
| POST | Create admin user |

**POST Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

---

## Authentication

Protected routes require Supabase session cookie.
Check `src/middleware.ts` for auth logic.
