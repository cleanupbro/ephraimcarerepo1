import { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/animations";
import { services } from "@/data/services";
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Shield,
  Users,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "NDIS Provider Prestons NSW 2170 | Disability Support Services | Ephraim Care",
  description:
    "Ephraim Care is a trusted NDIS provider based in Prestons NSW 2170. We deliver personal care, SIL, community participation, transport & group activities across Prestons and surrounding suburbs. Call 0451 918 884.",
  keywords: [
    "NDIS provider Prestons",
    "NDIS provider Prestons NSW",
    "NDIS Prestons 2170",
    "disability support Prestons",
    "disability services Prestons NSW 2170",
    "NDIS support worker Prestons",
    "NDIS personal care Prestons",
    "supported independent living Prestons",
    "SIL provider Prestons NSW",
    "NDIS community participation Prestons",
    "NDIS transport Prestons",
    "disability support near me Prestons",
    "NDIS provider 2170",
    "NDIS services 2170 postcode",
    "disability care Prestons Liverpool",
    "24 hour disability support Prestons",
    "NDIS group activities Prestons",
    "psychosocial recovery Prestons NSW",
    "NDIS respite Prestons",
    "disability home care Prestons",
  ],
  openGraph: {
    title: "NDIS Provider in Prestons NSW 2170 — Ephraim Care",
    description:
      "Trusted NDIS disability & mental health support based in Prestons 2170. Personal care, SIL, community participation & more.",
    url: "https://ephraimcare.com.au/prestons",
    type: "website",
  },
  alternates: {
    canonical: "https://ephraimcare.com.au/prestons",
  },
};

const nearbySuburbs = [
  "Liverpool",
  "Lurnea",
  "Casula",
  "Moorebank",
  "Miller",
  "Green Valley",
  "Hinchinbrook",
  "Cecil Hills",
  "Hoxton Park",
  "Cartwright",
  "Sadleir",
  "Ashcroft",
  "Busby",
  "Heckenberg",
  "Hammondville",
  "Chipping Norton",
  "Holsworthy",
  "Wattle Grove",
];

const stats = [
  { value: "8+", label: "NDIS Services" },
  { value: "2170", label: "Postcode Covered" },
  { value: "24/7", label: "Support Available" },
  { value: "100%", label: "NDIS Registered" },
];

export default function PrestonsPage() {
  return (
    <>
      {/* JSON-LD for Prestons location */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Ephraim Care — NDIS Provider Prestons",
            description:
              "Trusted NDIS disability and mental health support provider based in Prestons NSW 2170. Delivering personal care, SIL, community participation, transport and group activities.",
            url: "https://ephraimcare.com.au/prestons",
            telephone: "+61451918884",
            email: "contact@ephraimcare.com.au",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Factory 1A, 9 Lyn Parade",
              addressLocality: "Prestons",
              addressRegion: "NSW",
              postalCode: "2170",
              addressCountry: "AU",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -33.9437,
              longitude: 150.8694,
            },
            hasMap: "https://maps.google.com/?q=3VCP%2BPV+Prestons+NSW",
            areaServed: [
              {
                "@type": "City",
                name: "Prestons",
              },
              {
                "@type": "City",
                name: "Liverpool",
              },
              {
                "@type": "City",
                name: "Lurnea",
              },
              {
                "@type": "City",
                name: "Casula",
              },
              {
                "@type": "City",
                name: "Moorebank",
              },
              {
                "@type": "City",
                name: "Miller",
              },
              {
                "@type": "City",
                name: "Green Valley",
              },
            ],
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
            priceRange: "NDIS Funded",
            sameAs: [
              "https://www.facebook.com/ephraimcare",
              "https://www.instagram.com/ephraimcare",
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A6E5C] via-[#0D8B73] to-[#10A88A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-wide relative z-10 py-16 md:py-24">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-[#FFD700]" />
              <span className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider">
                Based in Prestons NSW 2170
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Trusted NDIS Provider in{" "}
              <span className="text-[#FFD700]">Prestons</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Ephraim Care is proudly headquartered in Prestons, NSW 2170. We
              deliver compassionate, person-centred disability and mental health
              support to participants across Prestons and the greater Liverpool
              area.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/referrals"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0A6E5C] font-bold rounded-xl hover:bg-[#FFD700] hover:text-[#0A6E5C] transition-all shadow-xl"
              >
                Make a Referral
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                <Phone className="h-5 w-5" />
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <FadeIn key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0A6E5C]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Prestons Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container-wide">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Ephraim Care in Prestons?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              As a Prestons-based NDIS provider, we understand the unique needs
              of our local community and deliver support with a personal touch.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Locally Based in Prestons 2170",
                description:
                  "Our office is right here at Factory 1A, 9 Lyn Parade, Prestons. We're your neighbours — not a faraway call centre.",
              },
              {
                icon: Clock,
                title: "24/7 Support Available",
                description:
                  "Round-the-clock disability support for Prestons residents. We're always here when you need us, day or night.",
              },
              {
                icon: Shield,
                title: "Fully NDIS Registered",
                description:
                  "We meet all NDIS Quality and Safeguards Commission standards, ensuring the highest quality of care for Prestons participants.",
              },
              {
                icon: Heart,
                title: "Person-Centred Approach",
                description:
                  "Every support plan is tailored to your unique goals. We listen first, then build a plan that works for YOU.",
              },
              {
                icon: Users,
                title: "Experienced Support Workers",
                description:
                  "Our team of trained, compassionate support workers live and work in the Prestons and Liverpool community.",
              },
              {
                icon: Star,
                title: "Community Connected",
                description:
                  "Deep relationships with local services, GPs, allied health providers, and community groups across the 2170 postcode.",
              },
            ].map((item) => (
              <FadeIn
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#E8F5F3] rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-[#0A6E5C]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NDIS Services Available in Prestons
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver a full range of NDIS-funded disability support services
              to participants in Prestons NSW 2170 and surrounding suburbs.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#0A6E5C] hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 bg-[#E8F5F3] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0A6E5C] transition-colors">
                  <service.icon className="h-5 w-5 text-[#0A6E5C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#0A6E5C] transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {service.description}
                </p>
                <span className="text-xs font-mono text-gray-400">
                  NDIS Code: {service.ndisCode}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Suburbs */}
      <section className="bg-[#0A6E5C] py-16 md:py-20">
        <div className="container-wide">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Also Serving Suburbs Near Prestons
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Based in Prestons 2170, we provide NDIS support across all nearby
              suburbs in the Liverpool and Southwestern Sydney region.
            </p>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-3">
            {nearbySuburbs.map((suburb) => (
              <span
                key={suburb}
                className="px-5 py-2.5 bg-white/10 backdrop-blur text-white rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors"
              >
                {suburb}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-wide">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started in Prestons?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you&apos;re a participant, family member, or support
              coordinator in Prestons NSW 2170 — we&apos;re here to help. Get in
              touch today for a free consultation.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#0A6E5C]" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Call us</div>
                    <a
                      href="tel:0451918884"
                      className="font-bold text-gray-900 hover:text-[#0A6E5C]"
                    >
                      0451 918 884
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#0A6E5C]" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Visit us</div>
                    <span className="font-bold text-gray-900 text-sm">
                      9 Lyn Parade, Prestons
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#0A6E5C]" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Hours</div>
                    <span className="font-bold text-gray-900">
                      24/7 Support
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/referrals"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A6E5C] text-white font-bold rounded-xl hover:bg-[#085C4D] transition-colors shadow-lg"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Make a Referral
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#0A6E5C] text-[#0A6E5C] font-bold rounded-xl hover:bg-[#E8F5F3] transition-colors"
                >
                  Send a Message
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section — SEO-rich */}
      <section className="py-16 md:py-20">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              NDIS in Prestons — Frequently Asked Questions
            </h2>
          </FadeIn>

          {[
            {
              q: "Is Ephraim Care based in Prestons NSW 2170?",
              a: "Yes. Ephraim Care is headquartered at Factory 1A, 9 Lyn Parade, Prestons NSW 2170. We are a local NDIS-registered provider serving the Prestons community and surrounding suburbs.",
            },
            {
              q: "What NDIS services do you provide in Prestons?",
              a: "We provide Personal Care, Supported Independent Living (SIL), Community Participation, Travel & Transport, Life Skills Development, Household Tasks, Social Participation, and Group Activities — all NDIS funded.",
            },
            {
              q: "Do I need an NDIS plan to access services in Prestons?",
              a: "Yes, you need an active NDIS plan with relevant funding categories. If you're unsure, we can help you understand your plan and connect you with support coordinators in the Prestons area.",
            },
            {
              q: "What suburbs near Prestons do you cover?",
              a: "We serve Prestons, Liverpool, Lurnea, Casula, Moorebank, Miller, Green Valley, Hinchinbrook, Cecil Hills, Hoxton Park, Cartwright, Sadleir, Ashcroft, Busby, and all suburbs in the 2170 postcode and wider Liverpool LGA.",
            },
            {
              q: "How do I make an NDIS referral in Prestons?",
              a: "You can refer yourself or a participant by visiting our online referral form, calling us on 0451 918 884, or visiting our Prestons office. We accept self-referrals, support coordinator referrals, and LAC referrals.",
            },
          ].map((faq, i) => (
            <FadeIn key={i} className="mb-6">
              <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.q}</h3>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
              </details>
            </FadeIn>
          ))}

          {/* FAQ JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is Ephraim Care based in Prestons NSW 2170?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Ephraim Care is headquartered at Factory 1A, 9 Lyn Parade, Prestons NSW 2170. We are a local NDIS-registered provider serving the Prestons community and surrounding suburbs.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What NDIS services do you provide in Prestons?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "We provide Personal Care, Supported Independent Living (SIL), Community Participation, Travel & Transport, Life Skills Development, Household Tasks, Social Participation, and Group Activities — all NDIS funded.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Do I need an NDIS plan to access services in Prestons?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, you need an active NDIS plan with relevant funding categories. If you're unsure, we can help you understand your plan and connect you with support coordinators in the Prestons area.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What suburbs near Prestons do you cover?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "We serve Prestons, Liverpool, Lurnea, Casula, Moorebank, Miller, Green Valley, Hinchinbrook, Cecil Hills, Hoxton Park, Cartwright, Sadleir, Ashcroft, Busby, and all suburbs in the 2170 postcode and wider Liverpool LGA.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I make an NDIS referral in Prestons?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "You can refer yourself or a participant by visiting our online referral form, calling us on 0451 918 884, or visiting our Prestons office. We accept self-referrals, support coordinator referrals, and LAC referrals.",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>
    </>
  );
}
