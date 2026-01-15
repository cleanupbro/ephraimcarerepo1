"use client";

import Image from "next/image";
import { CTABanner } from "@/components/sections/cta-banner";
import { TrustSignals } from "@/components/sections/trust-signals";
import { FadeIn } from "@/components/animations";
import { motion } from "motion/react";

const values = [
  {
    title: "Compassion",
    description:
      "We approach every individual with genuine care, empathy, and understanding. Your wellbeing is at the heart of everything we do.",
  },
  {
    title: "Integrity",
    description:
      "We uphold the highest ethical standards and are transparent in all our interactions. Trust is the foundation of our relationships.",
  },
  {
    title: "Inclusion",
    description:
      "We believe everyone deserves to be part of their community. We work to break down barriers and create meaningful connections.",
  },
  {
    title: "Excellence",
    description:
      "We are committed to continuous improvement and delivering the highest quality support to help you achieve your goals.",
  },
  {
    title: "Person-Centred",
    description:
      "Your goals, your choices, your life. We tailor our support to your individual needs and respect your autonomy.",
  },
  {
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
      {/* Hero - Clean Professional Style */}
      <section className="relative overflow-hidden bg-white">
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[50vh] py-12 md:py-16">
            {/* Left Column - Text Content */}
            <FadeIn className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="text-neutral-900">About</span>
                <br />
                <span className="text-secondary">Ephraim Care</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600">
                We are a Western Sydney-based NDIS provider dedicated to delivering
                compassionate, person-centred support services. Our name reflects
                our commitment to fruitfulness and growth in the lives of those we
                serve.
              </p>
            </FadeIn>

            {/* Right Column - Hero Image with Ken Burns Effect */}
            <FadeIn direction="right" delay={0.3} className="flex justify-center lg:justify-end">
              <div
                className="relative overflow-hidden shadow-2xl"
                style={{
                  width: "clamp(250px, 35vw, 380px)",
                  height: "clamp(250px, 35vw, 380px)",
                  borderRadius: "350px",
                }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/hero/hero-ndis.jpg"
                    alt="Caring NDIS support workers with participants"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/10 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
            <path fill="#F5FAFA" d="M0,40 C150,80 350,0 500,40 C650,80 750,20 900,40 C1050,60 1200,30 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Why Choose Ephraim Care - Moved from Homepage */}
      <TrustSignals />

      {/* Our Story - Hidden until client provides story content
      <section className="section bg-gradient-to-b from-[#F0FAF8] to-white">
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
      */}

      {/* Our Values */}
      <section className="section bg-white">
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
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-[0_10px_40px_-10px_rgba(0,128,128,0.2)] hover:border-primary/30 transition-all duration-300"
                >
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

      {/* Meet The Team - Hidden until client provides team info/videos
      <Team />
      */}

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
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
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
