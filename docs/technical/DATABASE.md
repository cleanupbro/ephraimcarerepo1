# Database Schema
> Supabase PostgreSQL schema

---

## Active Tables

### referrals
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name TEXT NOT NULL,
  participant_email TEXT,
  participant_phone TEXT,
  ndis_number TEXT,
  support_needs TEXT,
  preferred_contact TEXT,
  referrer_name TEXT,
  referrer_organisation TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### contacts
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### participants
```sql
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  ndis_number TEXT,
  address TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  support_needs TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### appointments
```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES participants(id),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Pending Tables

### incident_reports
```sql
CREATE TABLE incident_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES participants(id),
  staff_id UUID,
  incident_date TIMESTAMPTZ NOT NULL,
  severity TEXT NOT NULL, -- low, medium, high, critical
  description TEXT NOT NULL,
  actions_taken TEXT,
  follow_up_required BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### shift_handovers
```sql
CREATE TABLE shift_handovers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outgoing_staff TEXT NOT NULL,
  incoming_staff TEXT NOT NULL,
  handover_time TIMESTAMPTZ DEFAULT NOW(),
  participants_discussed TEXT[],
  notes TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### progress_notes
```sql
CREATE TABLE progress_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES participants(id),
  staff_id UUID,
  note_date DATE NOT NULL,
  content TEXT NOT NULL,
  goals_worked_on TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### staff_members
```sql
CREATE TABLE staff_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## RLS Policies

Row Level Security enabled. Only authenticated admin users can access data.
