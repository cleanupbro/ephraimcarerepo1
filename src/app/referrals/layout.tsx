import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDIS Referral Form Liverpool | Ephraim Care",
  description:
    "Make an NDIS referral in Liverpool & Western Sydney. Quick and easy online form. Self-referrals, support coordinators, and healthcare professionals welcome. Call 0451 918 884.",
  keywords: [
    "NDIS referral Liverpool",
    "NDIS referral form Sydney",
    "refer NDIS participant",
    "NDIS self referral",
    "disability support referral Western Sydney",
    "NDIS intake form",
  ],
  openGraph: {
    title: "NDIS Referral Form | Ephraim Care Liverpool",
    description:
      "Make an NDIS referral in Liverpool & Western Sydney. Quick online form for participants, families, and support coordinators.",
    url: "https://ephraimcare.com.au/referrals",
  },
};

export default function ReferralsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
