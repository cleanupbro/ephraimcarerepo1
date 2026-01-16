"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "motion/react";

export function ServicesGrid() {
  return (
    <section className="section bg-gradient-to-b from-[#F5FAFA] to-white relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Section header - Clean Professional Style */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Our Services
          </span>
          <h2 className="heading-accent">
            What <span className="accent">We Offer</span>
          </h2>
          <p className="mt-6 text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Comprehensive NDIS support services tailored to your individual needs.
            We help you achieve your goals and live life on your terms.
          </p>
        </FadeIn>

        {/* Services grid - Clean Card Design */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.slice(0, 6).map((service) => {
            return (
              <StaggerItem key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full no-underline"
                >
                  <motion.div
                    className={cn(
                      "relative p-8 rounded-2xl bg-white border border-neutral-200 h-full",
                      "transition-all duration-300",
                      "hover:shadow-[0_20px_50px_-12px_rgba(0,128,128,0.25)] hover:-translate-y-2 hover:border-primary"
                    )}
                  >
                    {/* Title */}
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors mb-4">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Learn more link */}
                    <div className="mt-6 flex items-center text-primary font-semibold group-hover:text-primary-700">
                      <span>Learn More</span>
                      <ArrowRight
                        className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2"
                        aria-hidden="true"
                      />
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* View all services button - Pill style */}
        <FadeIn delay={0.5} className="mt-16 text-center">
          <Link
            href="/services"
            className="btn-pill-primary inline-flex items-center gap-2 group"
          >
            <span>View All Services</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        {/* Additional services note */}
        <FadeIn delay={0.6} className="mt-8 text-center">
          <p className="text-neutral-500 text-body-sm">
            We offer 8+ specialized services to support your NDIS journey
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
