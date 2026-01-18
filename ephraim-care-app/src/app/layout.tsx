import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { SkipLink } from "@/components/accessibility/skip-link";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";

// Primary font - Montserrat (In4Care style)
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

// Secondary font - Inter (for UI elements)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ephraimcare.com.au"),
  title: {
    default: "NDIS Provider Liverpool | Western & Southwestern Sydney | Ephraim Care",
    template: "%s | Ephraim Care",
  },
  description:
    "Quality NDIS support services in Liverpool, Prestons, Fairfield & Western/Southwestern Sydney. Personal care, SIL, community participation, transport & group activities. Call 0451 918 884.",
  keywords: [
    "NDIS provider Liverpool",
    "NDIS services Western Southwestern Sydney",
    "disability support Liverpool NSW",
    "NDIS support worker Liverpool",
    "NDIS personal care Western Southwestern Sydney",
    "supported independent living Liverpool",
    "NDIS community participation Sydney",
    "NDIS transport assistance Liverpool",
    "disability services Prestons",
    "NDIS Fairfield",
    "NDIS Lurnea",
    "24 hour disability support Liverpool",
    "NDIS provider near me",
    "NDIS plan management Western Southwestern Sydney",
  ],
  authors: [{ name: "Ephraim Care" }],
  creator: "Ephraim Care",
  publisher: "Ephraim Care",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://ephraimcare.com.au",
    siteName: "Ephraim Care",
    title: "Ephraim Care | NDIS Provider Liverpool & Western/Southwestern Sydney",
    description:
      "Quality NDIS support services in Liverpool & Western/Southwestern Sydney. Personal care, SIL, community participation & more. Call 0451 918 884.",
    images: [
      {
        url: "/images/ndis/Hero-Image.png",
        width: 1200,
        height: 630,
        alt: "Ephraim Care - NDIS Support Services Liverpool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ephraim Care | NDIS Provider Liverpool",
    description:
      "Quality NDIS support services in Liverpool & Western/Southwestern Sydney. Call 0451 918 884.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add when you have it
  },
};

// JSON-LD Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ephraimcare.com.au",
  name: "Ephraim Care",
  description:
    "Quality NDIS support services in Liverpool & Western/Southwestern Sydney. Personal care, supported independent living, community participation, transport & group activities.",
  url: "https://ephraimcare.com.au",
  telephone: "+61451918884",
  email: "info@ephraimcare.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "22 Dobell Road",
    addressLocality: "Prestons",
    addressRegion: "NSW",
    postalCode: "2170",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.9425,
    longitude: 150.8633,
  },
  areaServed: [
    { "@type": "City", name: "Liverpool" },
    { "@type": "City", name: "Prestons" },
    { "@type": "City", name: "Fairfield" },
    { "@type": "City", name: "Lurnea" },
    { "@type": "City", name: "Cabramatta" },
    { "@type": "City", name: "Wetherill Park" },
    { "@type": "AdministrativeArea", name: "Western Sydney" },
    { "@type": "AdministrativeArea", name: "Southwestern Sydney" },
  ],
  openingHours: "Mo-Fr 09:00-17:00",
  priceRange: "$$",
  image: "https://ephraimcare.com.au/images/logo/ephraim-care-logo.png",
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "NDIS Support Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Personal Care",
          description: "Assistance with daily personal needs including showering, grooming, and medication support.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Supported Independent Living (SIL)",
          description: "24/7 support to live independently in your own home or shared accommodation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Community Participation",
          description: "Support to engage in social activities and community programs.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Travel & Transport",
          description: "Safe and reliable transport assistance for appointments and activities.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/logo/ephraim-care-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ephraim Admin" />
        <meta name="theme-color" content="#2E7D6B" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SkipLink />
        <ConditionalLayout>{children}</ConditionalLayout>

        {/* ElevenLabs Voice AI Widget */}
        <ElevenLabsWidget />
      </body>
    </html>
  );
}
// Build v2.0.0 - Rebranding with warm colors, PRESTONS address, ABN, NDIS ID
