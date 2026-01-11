"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Users } from "lucide-react";
import { teamMembers } from "@/data/team";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export function Team() {
  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Our Team
          </span>
          <h2 className="text-balance">Meet the People Who Care</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Our dedicated team brings together experience, compassion, and a genuine
            desire to make a difference in the lives of those we support.
          </p>
        </FadeIn>

        {/* Team Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <StaggerItem key={member.name}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />

                  {/* Emoji badge */}
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                    <span className="text-xl">{member.emoji}</span>
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{member.name}</h3>
                    <p className="text-white/80 text-sm">{member.role}</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="p-4">
                  <p className="text-neutral-600 text-sm line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn delay={0.3} className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-primary-50 border border-primary-100">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-neutral-900">
                Want to join our team?
              </p>
              <p className="text-sm text-neutral-600">
                We are always looking for compassionate support workers.
              </p>
            </div>
            <a
              href="/contact"
              className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-800 transition-colors shadow-lg shadow-primary/20 whitespace-nowrap"
            >
              Get in Touch
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
