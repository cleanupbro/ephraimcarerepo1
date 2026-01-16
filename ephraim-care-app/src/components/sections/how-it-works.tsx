"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { contactInfo } from "@/data/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "motion/react";

const steps = [
  {
    title: "Get in Touch",
    description: "Contact us for a free, no-obligation chat about your needs. We will answer all your questions.",
    highlight: "Free consultation",
  },
  {
    title: "Share Your Goals",
    description: "Tell us about your NDIS plan and what you want to achieve. We will help you understand your options.",
    highlight: "Personalized plan",
  },
  {
    title: "Meet Your Team",
    description: "We will match you with support workers who understand your needs and share your interests.",
    highlight: "Matched support",
  },
  {
    title: "Start Your Journey",
    description: "Begin receiving quality support tailored to help you achieve your goals and live your best life.",
    highlight: "Ongoing support",
  },
];

export function HowItWorks() {
  return (
    <section className="section bg-gradient-to-b from-[#F5FAFA] to-[#E8F5F3] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-balance">How It Works</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Getting started with Ephraim Care is easy. We guide you through every step
            to ensure you receive the support you need.
          </p>
        </FadeIn>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

          <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StaggerItem key={step.title}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all h-full cursor-default"
                >
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Highlight tag */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    {step.highlight}
                  </div>

                  {/* Arrow connector for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* CTA */}
        <FadeIn delay={0.5} className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-primary-50 border border-primary-100">
            <p className="text-neutral-700 font-medium">
              Ready to take the first step?
            </p>
            <div className="flex gap-3">
              <Button asChild className="group">
                <Link href="/referrals">
                  Make a Referral
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={contactInfo.phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
