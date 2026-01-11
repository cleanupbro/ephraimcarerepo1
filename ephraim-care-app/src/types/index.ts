/**
 * @file Ephraim Care - Shared Types
 * @description Central type definitions for the entire application
 * @searchable types, interfaces, Service, NavItem, FormData
 */

// =============================================================================
// SERVICE TYPES
// =============================================================================

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  seoTitle: string;
  seoDescription: string;
}

export type ServiceSlug =
  | 'personal-care'
  | 'community-care'
  | 'travel-care'
  | 'group-activities'
  | 'life-skills'
  | 'household-tasks'
  | 'plan-management'
  | 'psychosocial-recovery';

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface ReferralFormData {
  // Participant Details
  firstName: string;
  lastName: string;
  dob: string;
  ndisNumber: string;
  phone: string;
  email?: string;
  suburb: string;

  // Services
  fundingType: 'Agency Managed' | 'Plan Managed' | 'Self Managed' | 'Not Sure';
  services: ServiceSlug[];
  goals?: string;

  // Referrer
  referrerRole: string;
  referrerName?: string;
  referrerOrg?: string;
  referrerPhone?: string;
  referrerEmail?: string;

  // Consent
  consent: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: 'email' | 'phone';
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

export interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// =============================================================================
// BUSINESS TYPES
// =============================================================================

export interface BusinessInfo {
  name: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  admin: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Ephraim Care',
  phone: '0451 918 884',
  email: 'info@ephraimcare.com.au',
  website: 'ephraimcare.com.au',
  location: 'Western Sydney, NSW',
  admin: 'Meshach',
};

// =============================================================================
// ACCESSIBILITY TYPES
// =============================================================================

export interface ComfortModeState {
  enabled: boolean;
  toggle: () => void;
}

// =============================================================================
// SEO TYPES
// =============================================================================

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
}
