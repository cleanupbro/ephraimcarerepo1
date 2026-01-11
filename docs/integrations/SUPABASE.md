# Supabase Integration
> Database and authentication setup

---

## Overview

| Item | Value |
|------|-------|
| **Project** | esyxitvlgknqhaunlfbg |
| **Dashboard** | https://supabase.com/dashboard/project/esyxitvlgknqhaunlfbg |
| **Region** | Southeast Asia |

---

## Tables

### Active Tables
- `referrals` — Website referral submissions
- `contacts` — Contact form submissions
- `participants` — NDIS participants
- `appointments` — Scheduled appointments

### Pending Tables
- `incident_reports` — NDIS incident reports
- `shift_handovers` — Staff handover notes
- `progress_notes` — Daily progress notes
- `staff_members` — Staff directory

---

## Authentication

Using Supabase Auth for admin login:
- Email/password authentication
- Session management
- Protected routes via middleware

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://esyxitvlgknqhaunlfbg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon key]
SUPABASE_SERVICE_ROLE_KEY=[service role key]
```

---

## Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

---

## Common Queries

### Get all referrals
```typescript
const { data, error } = await supabase
  .from('referrals')
  .select('*')
  .order('created_at', { ascending: false })
```

### Insert new contact
```typescript
const { data, error } = await supabase
  .from('contacts')
  .insert([{ name, email, message }])
```
