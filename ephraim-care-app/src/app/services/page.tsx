"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { services } from "@/data/services";
import { images } from "@/data/images";
import { CTABanner } from "@/components/sections/cta-banner";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "motion/react";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#FDF2E6" }}>
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh] py-12 md:py-16 lg:py-20">
            {/* Left Column - Text Content */}
            <FadeIn className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0088CC] shadow-lg mb-6">
                <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
                <span className="text-sm font-semibold text-white">
                  8 Core Service Areas
                </span>
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="text-neutral-900">Our NDIS</span>
                <br />
                <span className="text-[#0088CC]">Support Services</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600">
                Comprehensive, person-centred support tailored to your individual
                needs and goals. We work with you to achieve greater independence
                and quality of life.
              </p>
            </FadeIn>

            {/* Right Column - Hero Image with Ken Burns Effect */}
            <FadeIn direction="right" delay={0.3} className="flex justify-center lg:justify-end">
              <div
                className="relative overflow-hidden shadow-2xl"
                style={{
                  width: "clamp(280px, 40vw, 450px)",
                  height: "clamp(280px, 40vw, 450px)",
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
                    src="/images/hero/hero-backup-1.jpg"
                    alt="NDIS support services in Western Sydney"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0088CC]/10 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,40 C150,80 350,0 500,40 C650,80 750,20 900,40 C1050,60 1200,30 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Services List */}
      <section className="section bg-white">
        <div className="container-wide">
          <StaggerContainer staggerDelay={0.1} className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              const serviceImage = images.services[service.slug as keyof typeof images.services];

              return (
                <StaggerItem key={service.id}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={cn(
                      "grid lg:grid-cols-2 gap-8 items-center p-8 rounded-3xl border border-neutral-200 overflow-hidden",
                      isEven ? "bg-white hover:shadow-xl" : "bg-neutral-50 hover:shadow-xl"
                    )}
                  >
                    <div className={cn(!isEven && "lg:order-2")}>
                      {/* Service image */}
                      <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                        <Image
                          src={serviceImage?.image || images.hero.main}
                          alt={serviceImage?.alt || service.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                        {/* Icon overlay */}
                        <div
                          className={cn(
                            "absolute bottom-4 left-4 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg",
                            service.color === "primary"
                              ? "bg-primary text-white"
                              : "bg-secondary text-white"
                          )}
                        >
                          <Icon className="h-7 w-7" aria-hidden="true" />
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-neutral-900">
                        {service.name}
                      </h2>

                      <p className="mt-3 text-lg text-neutral-600">
                        {service.longDescription}
                      </p>

                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center mt-4 text-lg font-semibold text-primary hover:text-primary-800 group no-underline"
                      >
                        Learn more about {service.shortName}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>

                    <div className={cn(!isEven && "lg:order-1")}>
                      <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                        <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          What we offer:
                        </h3>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.05 * i }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-neutral-700">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
