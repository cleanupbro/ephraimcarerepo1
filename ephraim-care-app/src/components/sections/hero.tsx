"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { contactInfo } from "@/data/navigation";
import { StaggerContainer, StaggerItem } from "@/components/animations";
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
        {/* Gradient overlay - softer blend with mint theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a3d2e]/85 via-[#0a3d2e]/60 to-[#0a3d2e]/30" />
        {/* Additional green/mint overlay for brand color blend */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-primary/20 to-transparent" />
      </div>

      {/* Main content */}
      <div className="container-wide relative z-10 h-full">
        <div className="min-h-[90vh] flex items-center py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column - Text Content */}
            <div>
              <StaggerContainer className="space-y-8" staggerDelay={0.15}>
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
                    support services across Western & Southwestern Sydney.
                  </p>
                </StaggerItem>

                {/* Service Location Finder - Clean Professional Style */}
                <StaggerItem>
                  <form onSubmit={handleSearch} className="max-w-md">
                    <div className="flex gap-2 p-2 bg-white rounded-full shadow-2xl">
                      <div className="flex-1 flex items-center pl-5">
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
                        <span>Find Services</span>
                      </button>
                    </div>
                    <p className="text-white/70 text-sm mt-3 pl-2">
                      Servicing Liverpool, Parramatta, Penrith & Western/Southwestern Sydney
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

                {/* NDIS Registered Provider Badge */}
                <StaggerItem>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/95 shadow-xl backdrop-blur-sm"
                  >
                    <Image
                      src="/images/ndis/ndis-logo.png"
                      alt="NDIS Registered Provider"
                      width={50}
                      height={30}
                      className="object-contain"
                    />
                    <span className="text-sm font-bold text-neutral-800 tracking-wide">
                      Registered NDIS Provider
                    </span>
                  </motion.div>
                </StaggerItem>
              </StaggerContainer>
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
            fill="#F5FAFA"
            d="M0,40 C150,80 350,0 500,40 C650,80 750,20 900,40 C1050,60 1200,30 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  );
}
