-- =============================================
-- EPHRAIM CARE - SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: referrals
-- =============================================
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  ndis_number TEXT,
  dob DATE,
  suburb TEXT,
  services TEXT[] DEFAULT '{}',
  funding_type TEXT CHECK (funding_type IN ('plan-managed', 'self-managed', 'agency-managed')),
  goals TEXT,
  referrer_name TEXT,
  referrer_role TEXT,
  referrer_org TEXT,
  referrer_phone TEXT,
  referrer_email TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'approved', 'declined')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: contacts
-- =============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: participants
-- =============================================
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  ndis_number TEXT UNIQUE,
  dob DATE,
  address TEXT,
  suburb TEXT,
  plan_start_date DATE,
  plan_end_date DATE,
  plan_budget DECIMAL(10,2),
  services TEXT[] DEFAULT '{}',
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'waitlist')),
  notes TEXT,
  referral_id UUID REFERENCES referrals(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: appointments
-- =============================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  participant_name TEXT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  service TEXT,
  worker TEXT DEFAULT 'Meshach',
  location TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  reminded BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: service_logs
-- =============================================
CREATE TABLE IF NOT EXISTS service_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  service TEXT,
  hours DECIMAL(4,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: admin_users
-- =============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES for faster queries
-- =============================================
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON referrals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_participants_status ON participants(status);
CREATE INDEX IF NOT EXISTS idx_participants_ndis ON participants(ndis_number);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_participant ON appointments(participant_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_service_logs_participant ON service_logs(participant_id);
CREATE INDEX IF NOT EXISTS idx_service_logs_date ON service_logs(date);

-- =============================================
-- TRIGGERS for updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_referrals_updated_at
  BEFORE UPDATE ON referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participants_updated_at
  BEFORE UPDATE ON participants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies: Allow authenticated users to do everything (admin only system)
-- For referrals
CREATE POLICY "Allow authenticated full access to referrals" ON referrals
  FOR ALL USING (auth.role() = 'authenticated');

-- For public inserts (from website forms)
CREATE POLICY "Allow public insert to referrals" ON referrals
  FOR INSERT WITH CHECK (true);

-- For contacts
CREATE POLICY "Allow authenticated full access to contacts" ON contacts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public insert to contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- For participants
CREATE POLICY "Allow authenticated full access to participants" ON participants
  FOR ALL USING (auth.role() = 'authenticated');

-- For appointments
CREATE POLICY "Allow authenticated full access to appointments" ON appointments
  FOR ALL USING (auth.role() = 'authenticated');

-- For service_logs
CREATE POLICY "Allow authenticated full access to service_logs" ON service_logs
  FOR ALL USING (auth.role() = 'authenticated');

-- For admin_users
CREATE POLICY "Allow authenticated full access to admin_users" ON admin_users
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- INITIAL DATA: Create admin user
-- =============================================
INSERT INTO admin_users (email, name, role)
VALUES ('admin@ephraimcare.com.au', 'Meshach', 'admin')
ON CONFLICT (email) DO NOTHING;

-- =============================================
-- VIEWS for dashboard stats
-- =============================================
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM referrals) as total_referrals,
  (SELECT COUNT(*) FROM referrals WHERE status = 'new') as new_referrals,
  (SELECT COUNT(*) FROM referrals WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)) as referrals_this_month,
  (SELECT COUNT(*) FROM contacts WHERE status = 'unread') as unread_contacts,
  (SELECT COUNT(*) FROM participants WHERE status = 'active') as active_participants,
  (SELECT COUNT(*) FROM appointments WHERE date >= CURRENT_DATE AND status = 'scheduled') as upcoming_appointments,
  (SELECT COUNT(*) FROM appointments WHERE date = CURRENT_DATE AND status = 'scheduled') as appointments_today;

-- =============================================
-- DONE! Schema created successfully.
-- =============================================
