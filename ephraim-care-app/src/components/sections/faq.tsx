"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { faqItems } from "@/data/faq";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Common Questions
          </span>
          <h2 className="text-balance">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Find answers to common questions about our services and the NDIS.
            Can&apos;t find what you&apos;re looking for? Contact us!
          </p>
        </FadeIn>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <StaggerContainer staggerDelay={0.1} className="space-y-4">
            {faqItems.map((item, index) => (
              <StaggerItem key={index}>
                <div
                  className={`bg-white rounded-2xl border transition-all duration-300 ${
                    openIndex === index
                      ? "border-primary-300 shadow-lg"
                      : "border-neutral-200 hover:border-primary-200 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                    aria-expanded={openIndex === index}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="font-semibold text-neutral-900 text-base md:text-lg pr-4">
                        {item.question}
                      </span>
                    </div>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        openIndex === index
                          ? "bg-primary text-white"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {openIndex === index ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                          <div className="pl-12 border-l-2 border-primary-200">
                            <p className="text-neutral-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* CTA */}
        <FadeIn delay={0.3} className="text-center mt-12">
          <p className="text-neutral-600 mb-4">
            Still have questions? We are here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-800 transition-colors shadow-lg shadow-primary/20"
          >
            <span>💬</span>
            Contact Us
          </a>
        </FadeIn>
      </div>

      {/* Schema.org FAQ Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
