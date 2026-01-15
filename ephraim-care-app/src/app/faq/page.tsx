"use client";

import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { FAQ } from "@/components/sections/faq";
import { CTABanner } from "@/components/sections/cta-banner";
import { FadeIn } from "@/components/animations";
import { motion } from "motion/react";

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[50vh] py-12 md:py-16">
            {/* Left Column - Text Content */}
            <FadeIn className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary shadow-lg mb-6">
                <HelpCircle className="h-5 w-5 text-white" aria-hidden="true" />
                <span className="text-sm font-semibold text-white">
                  Common Questions
                </span>
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="text-neutral-900">Frequently Asked</span>
                <br />
                <span className="text-secondary">Questions</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600">
                Find answers to common questions about our NDIS support services
                and how we can help you achieve your goals.
              </p>

              {/* NDIS Logos */}
              <div className="mt-8 flex items-center gap-6">
                <div className="bg-white rounded-xl p-3 shadow-lg border border-neutral-100">
                  <Image
                    src="/images/ndis/I-love-NDIS.webp"
                    alt="I Love NDIS"
                    width={100}
                    height={50}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="bg-white rounded-xl p-3 shadow-lg border border-neutral-100">
                  <Image
                    src="/images/ndis/ndis-logo.png"
                    alt="Registered NDIS Provider"
                    width={100}
                    height={50}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>
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
                    src="/images/services/group-activities/NDIS-Disability-Support-Services-scaled.jpg"
                    alt="NDIS disability support services - participants and support workers"
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
            <path fill="#FFFFFF" d="M0,40 C150,80 350,0 500,40 C650,80 750,20 900,40 C1050,60 1200,30 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Banner */}
      <CTABanner />
    </>
  );
}
