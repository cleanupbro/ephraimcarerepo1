"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/animations";
import { motion } from "motion/react";

const values = [
  {
    title: "Compassion",
    description: "Every interaction is guided by genuine care and empathy.",
  },
  {
    title: "Integrity",
    description: "We uphold the highest ethical standards in all we do.",
  },
  {
    title: "Community",
    description: "Building meaningful connections and social inclusion.",
  },
  {
    title: "Excellence",
    description: "Committed to delivering quality support every day.",
  },
];

const highlights = [
  "Person-centred approach",
  "Experienced support workers",
  "Flexible scheduling",
  "Culturally diverse team",
  "24/7 support available",
  "Family involvement welcome",
];

export function AboutPreview() {
  return (
    <section className="section bg-gradient-to-b from-white to-[#E8F5F3] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <FadeIn direction="left" className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={images.about.team}
                  alt={images.about.teamAlt}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
              </div>
            </div>
          </FadeIn>

          {/* Content side */}
          <div className="order-1 lg:order-2">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
                About Ephraim Care
              </span>
              <h2 className="text-balance">
                Care That Comes From the Heart
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                At Ephraim Care, we believe everyone deserves to live a fulfilling,
                independent life. Founded on principles of faith, compassion, and
                service, we are dedicated to supporting NDIS participants across
                Western Sydney.
              </p>
            </FadeIn>

            {/* Highlights */}
            <FadeIn delay={0.2} className="mt-6">
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-neutral-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="mt-8">
              <Button asChild size="lg" className="group shadow-lg shadow-primary/20">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </div>

        {/* Values grid - Clean cards with subtle hover glow */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {values.map((value) => {
            return (
              <StaggerItem key={value.title}>
                <ScaleOnHover scale={1.03}>
                  <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(0,128,128,0.2)] hover:border-primary/30 transition-all duration-300 h-full">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      {value.description}
                    </p>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
