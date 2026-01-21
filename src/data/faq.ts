import { LucideIcon, HelpCircle, Rocket, Briefcase, DollarSign, Users, MapPin, FileText, Star } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
  icon: LucideIcon;
}

export const faqItems: FAQItem[] = [
  {
    icon: HelpCircle,
    question: "What is the NDIS and am I eligible?",
    answer:
      "The National Disability Insurance Scheme (NDIS) provides funding for Australians under 65 with a permanent and significant disability. To be eligible, you must be an Australian citizen or permanent resident, under 65 when you first apply, and have a disability that significantly impacts your daily life. Contact us for a free eligibility check.",
  },
  {
    icon: Rocket,
    question: "How do I get started with Ephraim Care?",
    answer:
      "Getting started is easy! Simply contact us via phone, email, or our referral form. We will arrange a free consultation to understand your needs, discuss your goals, and explain how we can support you. There is no obligation, and we guide you through every step.",
  },
  {
    icon: Briefcase,
    question: "What services does Ephraim Care offer?",
    answer:
      "We offer a comprehensive range of NDIS support services including Personal Care, Community Access, Travel Support, Group Activities, Life Skills Development, Household Tasks, Plan Management, and Psychosocial Recovery Coaching. All services are tailored to your individual needs and goals.",
  },
  {
    icon: DollarSign,
    question: "How much do your services cost?",
    answer:
      "Our services are funded through your NDIS plan, so there is typically no out-of-pocket cost for participants. We charge according to the NDIS Price Guide and can help you understand how your funding can be used. We also offer Plan Management to help you maximize your budget.",
  },
  {
    icon: Users,
    question: "Can I choose my own support worker?",
    answer:
      "Absolutely! We believe in person-centred care. You can meet potential support workers and choose the team members you feel most comfortable with. We carefully match participants with workers based on skills, personality, and shared interests.",
  },
  {
    icon: MapPin,
    question: "What areas do you service?",
    answer:
      "We proudly serve Western & Southwestern Sydney including Liverpool, Parramatta, Penrith, Blacktown, Campbelltown, Fairfield, and surrounding areas. If you are unsure whether we service your location, please contact us and we will do our best to accommodate you.",
  },
  {
    icon: FileText,
    question: "How do I make a referral?",
    answer:
      "You can make a referral through our website referral form, by calling us directly, or by emailing us. Referrals can be made by participants themselves, family members, support coordinators, or healthcare professionals. We respond to all referrals within 24 hours.",
  },
  {
    icon: Star,
    question: "What makes Ephraim Care different from other providers?",
    answer:
      "Ephraim Care is built on principles of faith, compassion, and genuine service. We offer truly person-centred care with a culturally diverse team, flexible scheduling, and a commitment to helping you achieve your goals. We treat every participant like family.",
  },
];
