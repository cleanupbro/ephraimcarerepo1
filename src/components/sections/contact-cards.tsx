"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { contactInfo } from "@/data/navigation";

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
    color: "from-primary to-primary-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: contactInfo.email,
    href: contactInfo.emailHref,
    color: "from-secondary to-secondary-600",
  },
  {
    icon: MapPin,
    title: "Location",
    value: `${contactInfo.suburb}`,
    href: null,
    color: "from-primary to-primary-600",
  },
  {
    icon: Clock,
    title: "Hours",
    value: contactInfo.hours,
    href: null,
    color: "from-secondary to-secondary-600",
  },
];

export function ContactCards() {
  return (
    <section className="section-lg bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-wide">
        <FadeIn className="text-center mb-12">
          <span className="badge-primary mb-4">Get In Touch</span>
          <h2>Contact Us</h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            We&apos;re here to help. Reach out through any of these channels.
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactCards.map((card) => {
            const Icon = card.icon;
            const Wrapper = card.href ? motion.a : motion.div;
            const wrapperProps = card.href ? { href: card.href } : {};

            return (
              <StaggerItem key={card.title}>
                <Wrapper
                  {...wrapperProps}
                  className="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all cursor-pointer no-underline group"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Circular icon */}
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    {card.title}
                  </h3>

                  {/* Value */}
                  <p className="text-neutral-600 group-hover:text-primary transition-colors text-sm md:text-base">
                    {card.value}
                  </p>
                </Wrapper>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
