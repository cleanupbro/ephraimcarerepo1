"use client";

import Image from "next/image";
import { StaggerContainer, StaggerItem, CountUp, FadeIn } from "@/components/animations";
import { motion } from "motion/react";
import { Award, Heart, MapPin } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "100",
    suffix: "%",
    label: "NDIS Registered",
    description: "Fully compliant provider",
  },
  {
    icon: Heart,
    value: "8",
    suffix: "+",
    label: "Core Services",
    description: "Comprehensive care options",
  },
  {
    icon: MapPin,
    value: "3",
    suffix: "+",
    label: "Locations",
    description: "Western & Southwestern Sydney",
  },
];

export function TrustSignals() {
  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="heading-accent">
            Why Choose <span className="accent">Ephraim Care</span>
          </h2>
        </FadeIn>

        {/* Stats Grid - In4Care style with circular icons */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <motion.div
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Circular Icon - Blue background */}
                  <div className="icon-circle mx-auto mb-6 group-hover:bg-secondary transition-colors duration-300">
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Value with counter animation */}
                  <div className="text-h2 font-extrabold text-neutral-900 mb-2">
                    <CountUp
                      end={parseInt(stat.value)}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-h5 font-semibold text-neutral-800 mb-1">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-body-sm text-neutral-600">
                    {stat.description}
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* NDIS Badges Row */}
        <FadeIn delay={0.5} className="mt-16 pt-8 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="bg-white rounded-md px-6 py-4 shadow-card">
              <Image
                src="/images/ndis/I-love-NDIS.webp"
                alt="I Love NDIS - Supporting people with disability in Western Sydney"
                width={140}
                height={50}
                className="object-contain h-12 w-auto"
              />
            </div>
            <div className="bg-white rounded-md px-6 py-4 shadow-card">
              <Image
                src="/images/ndis/ndis-logo.png"
                alt="NDIS Logo"
                width={120}
                height={50}
                className="object-contain h-12 w-auto"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
