"use client";

import Image from "next/image";
import { StaggerContainer, StaggerItem, CountUp, FadeIn } from "@/components/animations";
import { motion } from "motion/react";

const stats = [
  {
    emoji: "✅",
    value: "100",
    suffix: "%",
    label: "NDIS Registered",
    description: "Fully compliant provider",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    emoji: "💝",
    value: "8",
    suffix: "+",
    label: "Core Services",
    description: "Comprehensive care options",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    emoji: "📍",
    value: "3",
    suffix: "+",
    label: "Locations",
    description: "Across Western Sydney",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    emoji: "⭐",
    value: "5",
    suffix: ".0",
    label: "Star Rating",
    description: "Client satisfaction",
    gradient: "from-yellow-400 to-orange-500",
  },
];

export function TrustSignals() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-700/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container-wide relative z-10">
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => {
            return (
              <StaggerItem key={stat.label}>
                <motion.div
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Emoji Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <span className="text-3xl" role="img" aria-hidden="true">{stat.emoji}</span>
                  </div>

                  {/* Value with counter animation */}
                  <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                    <CountUp
                      end={parseInt(stat.value)}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-lg font-semibold text-white/90 mb-1">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-primary-200">
                    {stat.description}
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* NDIS Badges Row */}
        <FadeIn delay={0.5} className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="bg-white rounded-lg px-4 py-2">
              <Image
                src="/images/ndis/I-love-NDIS.webp"
                alt="I Love NDIS - Supporting people with disability in Western Sydney"
                width={120}
                height={40}
                className="object-contain h-10 w-auto"
              />
            </div>
            <div className="bg-white rounded-lg px-4 py-2">
              <Image
                src="/images/ndis/ndis-logo.png"
                alt="NDIS Logo"
                width={100}
                height={40}
                className="object-contain h-10 w-auto"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
    </section>
  );
}
