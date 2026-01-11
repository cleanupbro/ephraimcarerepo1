"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import { contactInfo } from "@/data/navigation";
import { FadeIn, Floating } from "@/components/animations";
import { motion } from "motion/react";

const benefits = [
  "Free initial consultation",
  "No obligation assessment",
  "Quick response time",
];

export function CTABanner() {
  return (
    <section className="section bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary-700/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <FadeIn direction="left">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/90">Available for new participants</span>
              </motion.div>

              <h2 className="text-white text-balance text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-xl text-primary-100 max-w-lg">
                Take the first step towards quality NDIS support. Book a free consultation
                with our friendly team today.
              </p>

              {/* Benefits */}
              <div className="mt-6 flex flex-wrap gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-2 text-white/90"
                  >
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1565C0] hover:bg-[#E3F2FD] shadow-xl shadow-black/20 group"
                >
                  <Link href="/referrals">
                    <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                    Make a Referral
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur"
                >
                  <a href={contactInfo.phoneHref}>
                    <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                    Call {contactInfo.phone}
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Floating card */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative">
              <Floating duration={5} distance={15}>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  {/* Contact card */}
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-secondary to-secondary-600 flex items-center justify-center mb-6 shadow-lg">
                      <MessageCircle className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      Free Consultation
                    </h3>
                    <p className="text-primary-100 mb-6">
                      Speak with our care coordinators about your needs
                    </p>

                    {/* Contact info */}
                    <div className="space-y-4">
                      <a
                        href={contactInfo.phoneHref}
                        className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors no-underline"
                      >
                        <Phone className="w-5 h-5 text-secondary" />
                        <span className="text-white font-semibold">{contactInfo.phone}</span>
                      </a>

                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-3 p-4 rounded-xl bg-secondary hover:bg-[#1565C0] transition-colors no-underline"
                      >
                        <Calendar className="w-5 h-5 text-white" />
                        <span className="text-white font-semibold">Book Online</span>
                      </Link>
                    </div>

                    {/* Operating hours */}
                    <p className="mt-6 text-sm text-primary-200">
                      Mon-Fri: 8am-6pm • Sat: 9am-2pm
                    </p>
                  </div>
                </div>
              </Floating>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400/30 rounded-full blur-2xl" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
