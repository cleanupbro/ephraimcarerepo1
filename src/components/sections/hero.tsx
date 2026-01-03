"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MapPin, Search, Heart, Star, Users, Shield } from "lucide-react";
import { contactInfo } from "@/data/navigation";
import { FadeIn, Floating, StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "motion/react";
import { useState } from "react";

export function Hero() {
  const [suburb, setSuburb] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to services with location filter
    window.location.href = `/services?location=${encodeURIComponent(suburb)}`;
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Full-width background image with Ken Burns */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero/main-hero.png"
            alt="Professional NDIS disability support services in Western Sydney"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        {/* Gradient overlay - dark left, transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        {/* Additional teal overlay for brand color */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent mix-blend-overlay" />
      </div>

      {/* Main content */}
      <div className="container-wide relative z-10 h-full">
        <div className="min-h-[90vh] flex items-center py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column - Text Content */}
            <div>
              <StaggerContainer className="space-y-8" staggerDelay={0.15}>
                {/* NDIS Badge with pulse */}
                <StaggerItem>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/95 shadow-xl backdrop-blur-sm"
                  >
                    <Image
                      src="/images/ndis/ndis-logo.png"
                      alt="NDIS"
                      width={40}
                      height={24}
                      className="object-contain"
                    />
                    <span className="text-sm font-bold text-neutral-800 tracking-wide">
                      Registered NDIS Provider
                    </span>
                    <Shield className="w-4 h-4 text-primary" />
                  </motion.div>
                </StaggerItem>

                {/* Main Heading - Large Impact */}
                <StaggerItem>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-extrabold leading-[1.05] tracking-tight">
                    <span className="text-white drop-shadow-lg">Empowering You</span>
                    <br />
                    <span className="text-white drop-shadow-lg">to Live </span>
                    <span className="text-secondary drop-shadow-lg">Your</span>
                    <br />
                    <span className="text-secondary drop-shadow-lg">Best Life</span>
                  </h1>
                </StaggerItem>

                {/* Subheading */}
                <StaggerItem>
                  <p className="text-xl sm:text-2xl text-white/90 max-w-xl leading-relaxed font-medium drop-shadow">
                    Compassionate, person-centred disability and mental health
                    support services across Western Sydney.
                  </p>
                </StaggerItem>

                {/* Service Location Finder - LiveBetter style */}
                <StaggerItem>
                  <form onSubmit={handleSearch} className="max-w-md">
                    <div className="flex gap-2 p-2 bg-white rounded-full shadow-2xl">
                      <div className="flex-1 flex items-center gap-3 pl-4">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                        <input
                          type="text"
                          placeholder="Enter your suburb or postcode"
                          value={suburb}
                          onChange={(e) => setSuburb(e.target.value)}
                          className="flex-1 bg-transparent border-0 text-neutral-800 placeholder-neutral-500 focus:outline-none text-base"
                        />
                      </div>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-700 text-white font-semibold rounded-full transition-all duration-300 shadow-button hover:shadow-xl"
                      >
                        <Search className="w-4 h-4" />
                        <span className="hidden sm:inline">Find Services</span>
                      </button>
                    </div>
                    <p className="text-white/70 text-sm mt-3 pl-2">
                      Servicing Liverpool, Parramatta, Penrith & all of Western Sydney
                    </p>
                  </form>
                </StaggerItem>

                {/* CTA Buttons */}
                <StaggerItem>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      asChild
                      size="lg"
                      className="group bg-secondary hover:bg-secondary-600 text-white rounded-full px-8 py-7 text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
                    >
                      <Link href="/referrals">
                        Start Your Journey
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="group rounded-full px-8 py-7 text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-neutral-900 bg-transparent transition-all"
                    >
                      <Link href={contactInfo.phoneHref}>
                        <Phone className="mr-2 h-5 w-5" />
                        {contactInfo.phone}
                      </Link>
                    </Button>
                  </div>
                </StaggerItem>

                {/* Trust stats row */}
                <StaggerItem>
                  <div className="flex flex-wrap gap-8 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">100%</p>
                        <p className="text-white/70 text-sm">Satisfaction</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">5-Star</p>
                        <p className="text-white/70 text-sm">Reviews</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">24/7</p>
                        <p className="text-white/70 text-sm">Support</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Right Column - Floating feature card */}
            <div className="hidden lg:flex justify-end">
              <FadeIn direction="right" delay={0.5}>
                <Floating duration={6} distance={15}>
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                        <Heart className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900">Your Family</h3>
                        <p className="text-primary font-semibold">Our Care</p>
                      </div>
                    </div>
                    <p className="text-neutral-600 mb-6">
                      We treat every participant like family. Our dedicated support workers
                      are committed to helping you achieve your goals.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-neutral-700">
                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Personalized Care Plans</span>
                      </div>
                      <div className="flex items-center gap-3 text-neutral-700">
                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Trained NDIS Workers</span>
                      </div>
                      <div className="flex items-center gap-3 text-neutral-700">
                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Local Western Sydney Team</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-neutral-200">
                      <Link
                        href="/about"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary-700 text-white font-semibold rounded-full transition-colors no-underline"
                      >
                        Learn About Us
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Floating>
              </FadeIn>
            </div>
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
