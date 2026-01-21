"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations";

export function TrustSignals() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#F5FAFA] to-white relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-10">
          <h2 className="heading-accent">
            Why Choose <span className="accent">Ephraim Care</span>
          </h2>
        </FadeIn>

        {/* NDIS Badges - Official logos only */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="bg-neutral-50 rounded-lg px-8 py-5 border border-neutral-200">
              <Image
                src="/images/ndis/I-love-NDIS.webp"
                alt="I Love NDIS - Supporting people with disability in Western Sydney"
                width={140}
                height={50}
                className="object-contain h-12 w-auto"
              />
            </div>
            <div className="bg-neutral-50 rounded-lg px-8 py-5 border border-neutral-200">
              <Image
                src="/images/ndis/ndis-logo.png"
                alt="Registered NDIS Provider"
                width={120}
                height={50}
                className="object-contain h-12 w-auto"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
