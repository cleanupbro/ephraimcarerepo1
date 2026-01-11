import { createBrowserClient } from '@supabase/ssr'

// Client-side Supabase client for use in React components
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Export a singleton instance for convenience
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient()
  }
  return supabaseInstance
}

// Type definitions for database tables
export type ReferralStatus = 'new' | 'contacted' | 'in_progress' | 'approved' | 'declined'
export type ContactStatus = 'unread' | 'read' | 'responded'
export type ParticipantStatus = 'active' | 'inactive' | 'waitlist'
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show'
export type FundingType = 'plan-managed' | 'self-managed' | 'agency-managed'

export interface Referral {
  id: string
  first_name: string
  last_name: string
  phone: string | null
  email: string | null
  ndis_number: string | null
  dob: string | null
  suburb: string | null
  services: string[]
  funding_type: FundingType | null
  goals: string | null
  referrer_name: string | null
  referrer_role: string | null
  referrer_org: string | null
  referrer_phone: string | null
  referrer_email: string | null
  status: ReferralStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  name: string
  email: string | null
  phone: string | null
  message: string | null
  status: ContactStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Participant {
  id: string
  first_name: string
  last_name: string
  phone: string | null
  email: string | null
  ndis_number: string | null
  dob: string | null
  address: string | null
  suburb: string | null
  plan_start_date: string | null
  plan_end_date: string | null
  plan_budget: number | null
  services: string[]
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  status: ParticipantStatus
  notes: string | null
  referral_id: string | null
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  participant_id: string | null
  participant_name: string | null
  date: string
  start_time: string
  end_time: string | null
  service: string | null
  worker: string
  location: string | null
  status: AppointmentStatus
  reminded: boolean
  notes: string | null
  created_at: string
  updated_at: string
}

export interface ServiceLog {
  id: string
  participant_id: string | null
  appointment_id: string | null
  date: string
  service: string | null
  hours: number | null
  notes: string | null
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string | null
  role: 'admin' | 'viewer'
  created_at: string
}

// Database type for Supabase client
export interface Database {
  public: {
    Tables: {
      referrals: {
        Row: Referral
        Insert: Omit<Referral, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Referral, 'id' | 'created_at' | 'updated_at'>>
      }
      contacts: {
        Row: Contact
        Insert: Omit<Contact, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Contact, 'id' | 'created_at' | 'updated_at'>>
      }
      participants: {
        Row: Participant
        Insert: Omit<Participant, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Participant, 'id' | 'created_at' | 'updated_at'>>
      }
      appointments: {
        Row: Appointment
        Insert: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Appointment, 'id' | 'created_at' | 'updated_at'>>
      }
      service_logs: {
        Row: ServiceLog
        Insert: Omit<ServiceLog, 'id' | 'created_at'>
        Update: Partial<Omit<ServiceLog, 'id' | 'created_at'>>
      }
      admin_users: {
        Row: AdminUser
        Insert: Omit<AdminUser, 'id' | 'created_at'>
        Update: Partial<Omit<AdminUser, 'id' | 'created_at'>>
      }
    }
  }
}
