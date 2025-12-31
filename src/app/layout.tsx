import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/accessibility/skip-link";
import { FloatingButtons } from "@/components/ui/floating-buttons";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ephraimcare.com.au"),
  title: {
    default: "Ephraim Care | Registered NDIS Provider Western Sydney",
    template: "%s | Ephraim Care",
  },
  description:
    "Ephraim Care provides reliable NDIS disability and mental health support services in Western Sydney. Registered NDIS Provider offering personal care, community access, plan management and more.",
  keywords: [
    "NDIS",
    "NDIS provider",
    "disability support",
    "Western Sydney",
    "mental health",
    "psychosocial recovery",
    "plan management",
    "personal care",
    "community access",
    "Liverpool",
    "Parramatta",
    "Penrith",
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
    title: "Ephraim Care | Reliable Homecare Support",
    description: "Registered NDIS Provider in Western Sydney",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="font-sans antialiased">
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
// Build v2.0.0 - Rebranding with warm colors, PRESTONS address, ABN, NDIS ID
