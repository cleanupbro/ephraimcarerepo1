import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CTABanner } from "@/components/sections/cta-banner";
import { Team } from "@/components/sections/team";
import {
  Heart,
  Shield,
  Users,
  Award,
  CheckCircle,
  Target,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ephraim Care - a registered NDIS provider in Western Sydney dedicated to compassionate, person-centred disability and mental health support.",
};

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We approach every individual with genuine care, empathy, and understanding. Your wellbeing is at the heart of everything we do.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We uphold the highest ethical standards and are transparent in all our interactions. Trust is the foundation of our relationships.",
  },
  {
    icon: Users,
    title: "Inclusion",
    description:
      "We believe everyone deserves to be part of their community. We work to break down barriers and create meaningful connections.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We are committed to continuous improvement and delivering the highest quality support to help you achieve your goals.",
  },
  {
    icon: Target,
    title: "Person-Centred",
    description:
      "Your goals, your choices, your life. We tailor our support to your individual needs and respect your autonomy.",
  },
  {
    icon: Sparkles,
    title: "Empowerment",
    description:
      "We focus on building your skills and independence, supporting you to live the life you choose.",
  },
];

const commitments = [
  "Provide safe, high-quality support services",
  "Respect your dignity and privacy at all times",
  "Listen to your feedback and continuously improve",
  "Maintain full NDIS compliance and best practices",
  "Employ trained, screened support workers",
  "Respond promptly to your concerns and needs",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-6">
              <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-primary-800">
                Registered NDIS Provider
              </span>
            </span>

            <h1 className="text-balance">About Ephraim Care</h1>

            <p className="mt-6 text-xl text-neutral-600">
              We are a Western Sydney-based NDIS provider dedicated to delivering
              compassionate, person-centred support services. Our name reflects
              our commitment to fruitfulness and growth in the lives of those we
              serve.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2>Our Story</h2>
              <p className="mt-4 text-lg text-neutral-600">
                Ephraim Care was founded on the belief that everyone deserves
                access to quality support that honours their dignity and
                empowers their independence.
              </p>
              <p className="mt-4 text-neutral-600">
                Based in Western Sydney, we understand the diverse needs of our
                local community. Our team brings together experience, compassion,
                and a genuine desire to make a positive difference in people&apos;s
                lives.
              </p>
              <p className="mt-4 text-neutral-600">
                Whether you need assistance with daily living, support to
                connect with your community, or help managing your mental health
                recovery, we are here to walk alongside you on your journey.
              </p>

              <Button asChild className="mt-6">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>

            {/* Team caring image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/services/community-participation/community.webp"
                alt="Ephraim Care team providing compassionate support to participants"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section bg-neutral-50">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2>Our Values</h2>
            <p className="mt-4 text-lg text-neutral-600">
              These core values guide everything we do and shape how we deliver
              support to our participants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 border border-neutral-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-neutral-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <Team />

      {/* Our Commitment */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2>Our Commitment to You</h2>
              <p className="mt-4 text-lg text-neutral-600">
                When you choose Ephraim Care, you can expect a partner who is
                genuinely invested in your success and wellbeing.
              </p>

              <ul className="mt-6 space-y-4">
                {commitments.map((commitment, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle
                      className="h-6 w-6 text-primary flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-neutral-700">{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
              <h3 className="text-2xl font-bold text-neutral-900">
                NDIS Quality & Safeguards
              </h3>
              <p className="mt-4 text-neutral-600">
                As a registered NDIS provider, we meet all requirements set by
                the NDIS Quality and Safeguards Commission. This means you can
                trust that our services meet the highest standards of quality
                and safety.
              </p>
              <ul className="mt-4 space-y-2 text-neutral-700">
                <li>• NDIS Worker Screening compliance</li>
                <li>• Working With Children Checks</li>
                <li>• Comprehensive staff training</li>
                <li>• Regular quality audits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
