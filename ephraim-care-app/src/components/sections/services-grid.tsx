"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "motion/react";
import { useState } from "react";

export function ServicesGrid() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section className="section bg-gradient-to-b from-[#F5FAFA] to-[#F0FAF8] relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Section header - In4Care style */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge-primary mb-6">
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

        {/* Services grid - 3 columns like In4Care */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.slice(0, 6).map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredService === service.id;

            return (
              <StaggerItem key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full no-underline"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <motion.div
                    className={cn(
                      "relative p-8 rounded-md bg-white border border-neutral-200 h-full",
                      "transition-all duration-300",
                      "hover:shadow-card-hover hover:-translate-y-2"
                    )}
                    whileHover={{ borderColor: "var(--primary)" }}
                  >
                    {/* Circular Icon - In4Care style */}
                    <motion.div
                      className={cn(
                        "w-[100px] h-[100px] rounded-full mx-auto mb-6",
                        "flex items-center justify-center",
                        "transition-colors duration-300",
                        isHovered ? "bg-secondary-600" : "bg-secondary"
                      )}
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        backgroundColor: isHovered ? "#52A655" : "#66BB6A"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon
                        className="h-10 w-10 text-white"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-h4 font-bold text-center text-neutral-900 group-hover:text-primary transition-colors mb-4">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-body text-neutral-600 text-center line-clamp-3">
                      {service.description}
                    </p>

                    {/* Learn more link */}
                    <div className="mt-6 flex items-center justify-center text-primary font-semibold group-hover:text-primary-700">
                      <span>Learn More</span>
                      <ArrowRight
                        className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Bottom accent bar on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-b-md"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: "left" }}
                    />
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
