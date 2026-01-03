"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MapPin } from "lucide-react";
import { contactInfo } from "@/data/navigation";
import { FadeIn, Floating, StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#FDF2E6" }}>
      {/* Main content */}
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh] py-12 md:py-16 lg:py-20">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            <StaggerContainer className="space-y-6" staggerDelay={0.15}>
              {/* NDIS Badge */}
              <StaggerItem>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0088CC] shadow-lg">
                  <span className="text-sm font-semibold text-white tracking-wide">
                    Registered NDIS Provider
                  </span>
                </div>
              </StaggerItem>

              {/* Main Heading - Montserrat style large text */}
              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-neutral-900">Your Family</span>
                  <br />
                  <span className="text-[#0088CC]">Our Care</span>
                </h1>
              </StaggerItem>

              {/* Subheading */}
              <StaggerItem>
                <p className="text-lg sm:text-xl text-neutral-600 max-w-lg leading-relaxed">
                  Compassionate, person-centred disability and mental health
                  support services. We help you achieve your goals and live your best life.
                </p>
              </StaggerItem>

              {/* Location Tag */}
              <StaggerItem>
                <div className="flex items-center gap-2 text-neutral-700">
                  <div className="w-8 h-8 rounded-full bg-[#0088CC]/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#0088CC]" />
                  </div>
                  <span className="text-base font-medium">
                    Liverpool & Western Sydney
                  </span>
                </div>
              </StaggerItem>

              {/* CTA Buttons */}
              <StaggerItem>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="group bg-[#0088CC] hover:bg-[#006699] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-[#0088CC]/25 hover:shadow-xl hover:shadow-[#0088CC]/30 transition-all"
                  >
                    <Link href="/referrals">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group rounded-full px-8 py-6 text-base font-semibold border-2 border-neutral-300 hover:border-[#0088CC] hover:text-[#0088CC] bg-transparent transition-all"
                  >
                    <Link href="/services">Our Services</Link>
                  </Button>
                </div>
              </StaggerItem>

              {/* Phone CTA */}
              <StaggerItem>
                <div className="flex items-center gap-4 pt-4">
                  <a
                    href={contactInfo.phoneHref}
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-neutral-200 hover:border-[#0088CC] hover:shadow-md transition-all group no-underline"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-neutral-500 font-medium">Call us anytime</p>
                      <p className="text-base font-bold text-neutral-900">{contactInfo.phone}</p>
                    </div>
                  </a>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right Column - Circular Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <FadeIn direction="right" delay={0.3}>
              <Floating duration={6} distance={15}>
                <div className="relative">
                  {/* Main circular image container with Ken Burns Effect */}
                  <div
                    className="relative overflow-hidden shadow-2xl"
                    style={{
                      width: "clamp(320px, 45vw, 550px)",
                      height: "clamp(320px, 45vw, 550px)",
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
                        src="/images/hero/main-hero.png"
                        alt="Professional NDIS disability support services in Western Sydney"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 320px, (max-width: 1200px) 45vw, 550px"
                      />
                    </motion.div>
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0088CC]/10 to-transparent" />
                  </div>

                  {/* Decorative elements around the image */}
                  <div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-4 border-[#0088CC]/20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-4 border-secondary/30"
                    aria-hidden="true"
                  />

                  {/* Small floating accent circles */}
                  <div
                    className="absolute top-10 -left-8 w-6 h-6 rounded-full bg-[#0088CC]"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-20 -right-4 w-4 h-4 rounded-full bg-secondary"
                    aria-hidden="true"
                  />
                </div>
              </Floating>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Wave Divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,40 C150,80 350,0 500,40 C650,80 750,20 900,40 C1050,60 1200,30 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  );
}
