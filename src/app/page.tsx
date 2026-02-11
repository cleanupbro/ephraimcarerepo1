import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
// import { TrustSignals } from "@/components/sections/trust-signals"; // Moved to About page
// import { HowItWorks } from "@/components/sections/how-it-works"; // Moved to Referrals page
import { AboutPreview } from "@/components/sections/about-preview";
// import { Testimonials } from "@/components/sections/testimonials"; // Hidden until client has real testimonials
import { CTABanner } from "@/components/sections/cta-banner";
// import { FAQ } from "@/components/sections/faq"; // Moved to dedicated /faq page
// import { GoogleReviews } from "@/components/sections/google-reviews"; // Hidden until client has real reviews
// import { ServiceQuiz } from "@/components/sections/service-quiz"; // Removed per client feedback
import { NDISCalculator } from "@/components/sections/ndis-calculator";
import { ServiceMap } from "@/components/sections/service-map";
// import { VideoWelcome } from "@/components/sections/video-welcome"; // Hidden until client provides video
// import { ContactCards } from "@/components/sections/contact-cards"; // Contact info is on Contact page

// SEO Optimized Metadata for Liverpool & Western Sydney
export const metadata: Metadata = {
  title: "NDIS Provider Liverpool & Western Sydney | Ephraim Care",
  description:
    "Quality NDIS support services in Liverpool, Prestons, Fairfield & Western Sydney. Personal care, SIL, community participation, transport & more. Call 0451 918 884 for a free consultation.",
  keywords: [
    "NDIS provider near me",
    "disability support near me",
    "NDIS support worker near me",
    "NDIS provider Liverpool",
    "NDIS services Western Sydney",
    "disability support Liverpool NSW",
    "NDIS support worker Liverpool",
    "NDIS personal care Western Sydney",
    "supported independent living Liverpool",
    "NDIS community participation Sydney",
    "NDIS transport assistance Liverpool",
    "disability services Prestons",
    "NDIS Fairfield",
    "NDIS Lurnea",
    "24 hour disability support Liverpool",
  ],
  openGraph: {
    title: "Ephraim Care | NDIS Provider Liverpool & Western Sydney",
    description:
      "Quality NDIS support services in Liverpool & Western Sydney. Personal care, SIL, community participation & more. Call 0451 918 884.",
    url: "https://ephraimcare.com.au",
    siteName: "Ephraim Care",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ephraim Care | NDIS Provider Liverpool",
    description:
      "Quality NDIS support services in Liverpool & Western Sydney. Call 0451 918 884.",
  },
  alternates: {
    canonical: "https://ephraimcare.com.au",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ServiceMap />
      <AboutPreview />
      <NDISCalculator />
      <CTABanner />
    </>
  );
}
