"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { contactInfo } from "@/data/navigation";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
  },
  {
    icon: Mail,
    title: "Email",
    value: contactInfo.email,
    href: contactInfo.emailHref,
  },
  {
    icon: MapPin,
    title: "Location",
    value: `${contactInfo.suburb}, NSW`,
    href: null,
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: contactInfo.hours,
    href: null,
  },
];

export function ContactCards() {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        {/* Section header */}
        <FadeIn className="text-center mb-12">
          <span className="text-body-lg text-neutral-500 uppercase tracking-wider mb-4 block">
            Contact Us
          </span>
          <h2 className="heading-accent">
            Get <span className="accent">In Touch</span>
          </h2>
        </FadeIn>

        {/* Contact cards grid - In4Care style */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactCards.map((card) => {
            const Icon = card.icon;
            const Wrapper = card.href ? motion.a : motion.div;
            const wrapperProps = card.href ? { href: card.href } : {};

            return (
              <StaggerItem key={card.title}>
                <Wrapper
                  {...wrapperProps}
                  className="flex flex-col items-center text-center p-8 rounded-md bg-white border border-neutral-200 hover:border-primary hover:shadow-card-hover transition-all cursor-pointer no-underline group"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Circular icon - In4Care style */}
                  <div className="icon-circle mb-6 group-hover:bg-secondary transition-colors duration-300">
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-h5 font-bold text-neutral-900 mb-2">
                    {card.title}
                  </h3>

                  {/* Value */}
                  <p className="text-body text-neutral-600 group-hover:text-primary transition-colors">
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
