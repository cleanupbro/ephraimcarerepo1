"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Heart, Shield, Users, Award, Target } from "lucide-react";
import { images } from "@/data/images";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/animations";
import { motion } from "motion/react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "Every interaction is guided by genuine care and empathy.",
    gradient: "from-red-400 to-rose-500",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest ethical standards in all we do.",
    gradient: "from-secondary-400 to-secondary-600",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building meaningful connections and social inclusion.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to delivering quality support every day.",
    gradient: "from-yellow-400 to-orange-500",
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
    <section className="section bg-gradient-to-b from-[#F0FAF8] to-[#F5FAFA] relative overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-neutral-100 max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-md">
                    <Heart className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="font-bold text-neutral-900">Our Promise</div>
                </div>
                <p className="text-sm text-neutral-600">
                  Dignified care that empowers independence
                </p>
              </motion.div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-white" aria-hidden="true" />
                  <div>
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-xs text-purple-100">Years Experience</div>
                  </div>
                </div>
              </motion.div>
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
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
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

        {/* Values grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {values.map((value) => {
            return (
              <StaggerItem key={value.title}>
                <ScaleOnHover scale={1.03}>
                  <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <value.icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
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
