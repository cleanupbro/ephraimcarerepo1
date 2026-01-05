import {
  Heart,
  Users,
  Car,
  UsersRound,
  Lightbulb,
  Home,
  Handshake,
  Building2,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  ndisCode: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  features: string[];
  color: string;
  image: string;
  gallery?: string[];
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: "personal-care",
    name: "Personal Care",
    shortName: "Personal",
    slug: "personal-care",
    ndisCode: "0107",
    description:
      "Supporting your daily personal needs with dignity and respect.",
    longDescription:
      "Our Personal Care service provides compassionate support for daily living activities. We understand that everyone has unique needs, and our trained support workers are here to help you maintain your independence while ensuring your comfort and dignity.",
    icon: Heart,
    features: [
      "Assistance with showering and bathing",
      "Grooming and personal hygiene support",
      "Medication prompting and assistance",
      "Dressing and undressing assistance",
      "Toileting support",
      "Meal preparation and feeding assistance",
    ],
    color: "primary",
    image: "/images/services/personal-care/personal-care-hero.jpg",
    gallery: [
      "/images/services/personal-care/ndis-personal-care.jpg",
      "/images/services/personal-care/Personal-Care-Younified-Care.jpeg",
      "/images/services/personal-care/Development-of-Daily-Living-Skills.webp",
      "/images/services/personal-care/black-man-explaining-documents-to-senior-caucasian-woman-disability-wheelchair-both-sitting-table-home-setting-engaging-401462923.webp",
    ],
  },
  {
    id: "travel-transport",
    name: "Travel & Transport",
    shortName: "Transport",
    slug: "travel-transport",
    ndisCode: "0108",
    description:
      "Safe and reliable transport assistance for your journeys.",
    longDescription:
      "Our Travel & Transport service provides safe, reliable transport assistance to help you get where you need to go. From medical appointments to social outings, we offer different levels of support based on your needs.",
    icon: Car,
    features: [
      "Level 1: Standard transport assistance",
      "Level 2: Wheelchair accessible transport",
      "Level 3: Complex mobility support",
      "Medical appointment transport",
      "Social activity transport",
      "Shopping and errands",
    ],
    color: "secondary",
    image: "/images/services/travel-transport/transport1.webp",
    gallery: [
      "/images/services/travel-transport/transport2.jpg",
      "/images/services/travel-transport/disability-travel-and-transport-min.png",
    ],
  },
  {
    id: "supported-independent-living",
    name: "Supported Independent Living (SIL)",
    shortName: "SIL",
    slug: "supported-independent-living",
    ndisCode: "0115",
    description:
      "24/7 support to live independently in your own home or shared accommodation.",
    longDescription:
      "Supported Independent Living (SIL) provides around-the-clock support to help you live as independently as possible. Whether in your own home or shared accommodation, our dedicated team ensures you have the assistance you need while maximizing your independence and quality of life.",
    icon: Building2,
    features: [
      "24/7 on-site support available",
      "Assistance with daily living tasks",
      "Shared or individual accommodation options",
      "Skill building for independence",
      "Community access and social support",
      "Health and wellbeing monitoring",
      "Meal planning and preparation",
      "Household management support",
    ],
    color: "primary",
    image: "/images/services/supported-independent-living/sil-hero.jpg",
    gallery: [
      "/images/services/supported-independent-living/BLOG+BANNERS+-compress.webp",
      "/images/services/supported-independent-living/HOW-NDIS-PROVIDERS-AND-SIL-PROVIDERS-WORK-TOGETHER-FOR-YOUR-DISABILITY-SUPPORT-min.jpg",
      "/images/services/supported-independent-living/NDIS_Occupational_Therapy.jpg",
    ],
    featured: true,
  },
  {
    id: "community-participation",
    name: "Community Participation",
    shortName: "Community",
    slug: "community-participation",
    ndisCode: "0116",
    description:
      "Innovative programs to help you connect and participate in your community.",
    longDescription:
      "Our Innovative Community Participation programs are designed to help you engage meaningfully with your community. We create tailored opportunities for social connection, skill development, and community involvement.",
    icon: Users,
    features: [
      "Social outings and activities",
      "Community event participation",
      "Building meaningful connections",
      "Recreational activities",
      "Volunteer opportunities",
      "Interest-based group programs",
    ],
    color: "secondary",
    image: "/images/services/community-participation/community.webp",
    gallery: [
      "/images/services/community-participation/full-household-nw.jpg",
      "/images/services/community-participation/Support-Community-Auslife-Care.jpg",
      "/images/services/community-participation/What-is-NDIS-Innovative-Community-Participatio.png",
    ],
  },
  {
    id: "life-skills",
    name: "Life Skills Development",
    shortName: "Life Skills",
    slug: "life-skills",
    ndisCode: "0117",
    description:
      "Building independence through practical skill development.",
    longDescription:
      "Life Skills Development helps you gain the practical abilities you need for greater independence. Our patient support workers work with you at your own pace to build confidence in everyday tasks.",
    icon: Lightbulb,
    features: [
      "Financial literacy and budgeting",
      "Conflict resolution skills",
      "Time management",
      "Communication skills",
      "Problem-solving strategies",
      "Self-advocacy training",
    ],
    color: "primary",
    image: "/images/services/life-skills/Assistance-with-Daily-Life-NDIS_0006-1024x687.webp",
    gallery: [
      "/images/services/life-skills/at-the-beach-Disability-NDIS.jpg",
      "/images/services/life-skills/benefits-of-disability-social-support-1153x690.jpg",
    ],
  },
  {
    id: "household-tasks",
    name: "Household Tasks",
    shortName: "Household",
    slug: "household-tasks",
    ndisCode: "0120",
    description:
      "Practical support to maintain a comfortable and safe home.",
    longDescription:
      "Our Household Tasks service helps you maintain a clean, comfortable, and safe living environment. We work alongside you to manage daily household responsibilities.",
    icon: Home,
    features: [
      "General house cleaning",
      "Laundry and ironing",
      "Meal preparation",
      "Grocery shopping",
      "Light gardening",
      "Home organisation",
    ],
    color: "secondary",
    image: "/images/services/household-tasks/NDIS-Household-Tasks-support-worker-helping-participant-with-home-duties.jpeg",
    gallery: [
      "/images/services/household-tasks/NDIS-for-autism.jpg",
    ],
  },
  {
    id: "social-participation",
    name: "Social & Civic Participation",
    shortName: "Social",
    slug: "social-participation",
    ndisCode: "0125",
    description:
      "Support to engage in social activities and community life.",
    longDescription:
      "Our Social & Civic Participation service supports you to actively engage in community life. From attending local events to pursuing hobbies, we help you build connections and participate in activities that matter to you.",
    icon: Handshake,
    features: [
      "Attending community events",
      "Joining clubs and groups",
      "Social skill development",
      "Friendship building support",
      "Civic participation activities",
      "Cultural and recreational outings",
    ],
    color: "primary",
    image: "/images/services/social-participation/resized-image-32-1024x698.jpeg",
    gallery: [
      "/images/services/social-participation/ginger-woman-and-a-woman-with-disability-having-fu-2024-01-19-18-48-34-utc.webp.bv_resized_mobile.webp.bv.webp",
      "/images/services/social-participation/personal-care-thumb.jpg",
    ],
  },
  {
    id: "group-activities",
    name: "Group & Centre Activities",
    shortName: "Groups",
    slug: "group-activities",
    ndisCode: "0136",
    description:
      "Engaging centre-based programs for social connection and skill building.",
    longDescription:
      "Our Group & Centre Activities program offers centre-based activities designed to help you build skills, make friends, and have fun. From art classes to fitness programs, there is something for everyone.",
    icon: UsersRound,
    features: [
      "Art and craft sessions",
      "Fitness and movement classes",
      "Music and creative programs",
      "Cooking and life skills groups",
      "Social clubs and games",
      "Educational workshops",
    ],
    color: "secondary",
    image: "/images/services/group-activities/NDIS-Disability-Support-Services-scaled.jpg",
    gallery: [
      "/images/services/group-activities/Life-Skills-Merindah-March-2025-Betty-and-Henry-WEB-image-1024x731.jpg",
      "/images/services/group-activities/NDIS-Social-and-Community-Participation-Fund-to-Meet-People-with-Similar-Interests.png",
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((service) => service.slug === slug);
};

export const getRelatedServices = (currentSlug: string, count: number = 3): Service[] => {
  return services
    .filter((service) => service.slug !== currentSlug)
    .slice(0, count);
};

export const getFeaturedServices = (): Service[] => {
  return services.filter((service) => service.featured);
};
