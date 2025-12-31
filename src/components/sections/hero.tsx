"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { contactInfo } from "@/data/navigation";
import { images } from "@/data/images";
import { FadeIn, Floating, StaggerContainer, StaggerItem } from "@/components/animations";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-[90vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full opacity-40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-100 rounded-full opacity-40 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full opacity-30 blur-3xl" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("${images.patterns.dots}")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 md:py-20">
          {/* Content */}
          <div>
            <StaggerContainer className="space-y-6">
              {/* Trust badge - PROMINENT */}
              <StaggerItem>
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary-800 shadow-lg shadow-primary/30 border-2 border-primary-300">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full animate-ping" />
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full" />
                  </div>
                  <span className="text-base font-bold text-white tracking-wide">
                    Registered NDIS Provider
                  </span>
                </div>
              </StaggerItem>

              {/* Main heading */}
              <StaggerItem>
                <h1 className="text-balance leading-tight">
                  Reliable Homecare Support for{" "}
                  <span className="text-primary relative">
                    NDIS Participants
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10C50 4 150 2 298 10" stroke="#E8A54B" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
              </StaggerItem>

              {/* Subheading */}
              <StaggerItem>
                <p className="text-xl text-neutral-600 max-w-xl">
                  Compassionate, person-centred disability and mental health support
                  services across Western Sydney. We help you achieve your goals
                  and live your best life.
                </p>
              </StaggerItem>

              {/* Location tag */}
              <StaggerItem>
                <div className="flex items-center gap-3 text-neutral-600">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
                    <span className="text-lg">📍</span>
                  </div>
                  <span className="text-sm font-medium">Serving Liverpool, Parramatta, Penrith & Western Sydney</span>
                </div>
              </StaggerItem>

              {/* CTA Buttons */}
              <StaggerItem>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button asChild size="lg" className="group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    <Link href="/referrals">
                      Make a Referral
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group bg-white/80 backdrop-blur hover:bg-white">
                    <Link href="/contact">
                      Book Free Consultation
                    </Link>
                  </Button>
                </div>
              </StaggerItem>

              {/* Quick contact */}
              <StaggerItem>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-neutral-200">
                  <span className="text-sm text-neutral-500">Questions? Call us:</span>
                  <a
                    href={contactInfo.phoneHref}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 font-semibold text-white hover:from-green-500 hover:to-emerald-600 transition-all shadow-md no-underline"
                  >
                    <span className="text-lg">📞</span>
                    {contactInfo.phone}
                  </a>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Hero Image */}
          <FadeIn direction="right" delay={0.3} className="relative">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-white">
                <Image
                  src={images.hero.main}
                  alt={images.hero.alt}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
              </div>

              {/* Floating cards */}
              <Floating duration={4} distance={8}>
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl">✅</span>
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">100%</p>
                      <p className="text-xs text-neutral-500">Client Satisfaction</p>
                    </div>
                  </div>
                </div>
              </Floating>

              <Floating duration={5} distance={10}>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl">💝</span>
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">8 Services</p>
                      <p className="text-xs text-neutral-500">Comprehensive Care</p>
                    </div>
                  </div>
                </div>
              </Floating>

            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path fill="#ffffff" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,74.7C840,75,960,53,1080,42.7C1200,32,1320,32,1380,32L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z" />
        </svg>
      </div>
    </section>
  );
}
