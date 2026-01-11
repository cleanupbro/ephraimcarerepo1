export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Supported Independent Living (SIL)", href: "/services/supported-independent-living" },
      { label: "Personal Care", href: "/services/personal-care" },
      { label: "Travel & Transport", href: "/services/travel-transport" },
      { label: "Community Participation", href: "/services/community-participation" },
      { label: "Life Skills Development", href: "/services/life-skills" },
      { label: "Household Tasks", href: "/services/household-tasks" },
      { label: "Social Participation", href: "/services/social-participation" },
      { label: "Group & Centre Activities", href: "/services/group-activities" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Referrals", href: "/referrals" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  services: [
    { label: "Supported Independent Living", href: "/services/supported-independent-living" },
    { label: "Personal Care", href: "/services/personal-care" },
    { label: "Community Participation", href: "/services/community-participation" },
    { label: "Travel & Transport", href: "/services/travel-transport" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Make a Referral", href: "/referrals" },
    { label: "Contact Us", href: "/contact" },
    { label: "Complaints Process", href: "/complaints" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

export const contactInfo = {
  phone: "0451 918 884",
  phoneHref: "tel:+61451918884",
  email: "info@ephraimcare.com.au",
  emailHref: "mailto:info@ephraimcare.com.au",
  address: "Factory 1A, 9 Lyn Parade",
  suburb: "PRESTONS NSW 2170",
  location: "Prestons, NSW",
  hours: "Monday - Friday: 8am - 6pm",
};

// Company legal details
export const companyInfo = {
  legalName: "Ephraim Care Pty Ltd",
  tradingName: "EPHRAIM CARE PTY LTD",
  abn: "76 685 693 565",
  ndisRegistrationId: "4-LHGEUPM",
  address: {
    street: "Factory 1A, 9 Lyn Parade",
    suburb: "PRESTONS",
    state: "NSW",
    postcode: "2170",
    full: "Factory 1A, 9 Lyn Parade, PRESTONS NSW 2170",
  },
};
