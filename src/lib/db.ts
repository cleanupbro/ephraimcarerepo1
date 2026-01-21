/**
 * Simple Database Layer for Ephraim Care
 * Uses in-memory storage for MVP
 * Replace with Supabase/Firebase when ready
 */

export interface Referral {
  id: string;
  participantName: string;
  participantPhone: string;
  participantEmail: string;
  ndisNumber: string;
  suburb: string;
  services: string[];
  referrerName: string;
  referrerRole: string;
  referrerOrg: string;
  referrerPhone: string;
  referrerEmail: string;
  goals: string;
  status: "new" | "contacted" | "in_progress" | "approved" | "declined";
  createdAt: string;
  notes: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "unread" | "read" | "responded";
  createdAt: string;
}

// In-memory storage (resets on deploy - replace with real DB later)
const referrals: Referral[] = [];
const contacts: Contact[] = [];

// ============================================
// REFERRALS
// ============================================

export async function getReferrals(): Promise<Referral[]> {
  return referrals.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getReferralById(id: string): Promise<Referral | null> {
  return referrals.find((r) => r.id === id) || null;
}

export async function addReferral(data: Partial<Referral>): Promise<Referral> {
  const newReferral: Referral = {
    id: `REF-${Date.now()}`,
    participantName: data.participantName || "Unknown",
    participantPhone: data.participantPhone || "",
    participantEmail: data.participantEmail || "",
    ndisNumber: data.ndisNumber || "",
    suburb: data.suburb || "",
    services: data.services || [],
    referrerName: data.referrerName || "",
    referrerRole: data.referrerRole || "",
    referrerOrg: data.referrerOrg || "",
    referrerPhone: data.referrerPhone || "",
    referrerEmail: data.referrerEmail || "",
    goals: data.goals || "",
    status: "new",
    createdAt: new Date().toISOString(),
    notes: "",
  };
  referrals.unshift(newReferral);
  return newReferral;
}

export async function updateReferral(
  id: string,
  updates: Partial<Referral>
): Promise<Referral | null> {
  const index = referrals.findIndex((r) => r.id === id);
  if (index === -1) return null;
  referrals[index] = { ...referrals[index], ...updates };
  return referrals[index];
}

// ============================================
// CONTACTS
// ============================================

export async function getContacts(): Promise<Contact[]> {
  return contacts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getContactById(id: string): Promise<Contact | null> {
  return contacts.find((c) => c.id === id) || null;
}

export async function addContact(data: Partial<Contact>): Promise<Contact> {
  const newContact: Contact = {
    id: `CON-${Date.now()}`,
    name: data.name || "Unknown",
    email: data.email || "",
    phone: data.phone || "",
    message: data.message || "",
    status: "unread",
    createdAt: new Date().toISOString(),
  };
  contacts.unshift(newContact);
  return newContact;
}

export async function updateContact(
  id: string,
  updates: Partial<Contact>
): Promise<Contact | null> {
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...updates };
  return contacts[index];
}

// ============================================
// STATS
// ============================================

export async function getStats() {
  const now = new Date();
  const thisMonth = referrals.filter((r) => {
    const created = new Date(r.createdAt);
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  });

  return {
    totalReferrals: referrals.length,
    newReferrals: referrals.filter((r) => r.status === "new").length,
    approvedReferrals: referrals.filter((r) => r.status === "approved").length,
    totalContacts: contacts.length,
    unreadContacts: contacts.filter((c) => c.status === "unread").length,
    thisMonthReferrals: thisMonth.length,
  };
}
