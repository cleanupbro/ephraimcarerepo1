"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Calendar, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { getServiceBySlug, getRelatedServices } from "@/data/services";
import { CTABanner } from "@/components/sections/cta-banner";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/animations";
import { motion } from "motion/react";
import { contactInfo } from "@/data/navigation";
import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/ui/image-gallery";

interface ServicePageClientProps {
  slug: string;
}

const steps = [
  {
    number: "1",
    title: "Enquire",
    description: "Contact us to discuss your needs",
    color: "bg-blue-100 text-blue-600",
  },
  {
    number: "2",
    title: "Meet",
    description: "We'll arrange a consultation",
    color: "bg-green-100 text-green-600",
  },
  {
    number: "3",
    title: "Plan",
    description: "Together we'll create your support plan",
    color: "bg-purple-100 text-purple-600",
  },
  {
    number: "4",
    title: "Start",
    description: "Begin receiving quality support",
    color: "bg-secondary-100 text-secondary-600",
  },
];

export function ServicePageClient({ slug }: ServicePageClientProps) {
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(slug, 3);
  const serviceImage = images.services[slug as keyof typeof images.services];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="container-wide py-4">
          <Link
            href="/services"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-primary no-underline group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="section bg-gradient-to-b from-[#E8F5F3] to-[#F5FAFA] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-100 rounded-full opacity-50 blur-3xl" />
        </div>

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <FadeIn direction="left">
              <h1 className="text-balance">{service.name}</h1>

              <p className="mt-6 text-xl text-neutral-600">
                {service.longDescription}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group shadow-lg shadow-primary/20">
                  <Link href="/referrals">
                    <Calendar className="mr-2 h-5 w-5" />
                    Make a Referral
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={contactInfo.phoneHref}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call {contactInfo.phone}
                  </a>
                </Button>
              </div>
            </FadeIn>

            {/* Image */}
            <FadeIn direction="right" delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                  src={serviceImage?.image || images.hero.main}
                  alt={serviceImage?.alt || service.name}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section bg-gradient-to-b from-[#F5FAFA] to-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeIn>
              <h2>What We Offer</h2>
              <p className="mt-4 text-lg text-neutral-600">
                Our {service.name.toLowerCase()} service is designed to support
                your individual needs and help you achieve your goals.
              </p>

              <ul className="mt-8 space-y-4">
                {service.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors"
                  >
                    <CheckCircle
                      className="h-6 w-6 text-primary flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-lg text-neutral-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </FadeIn>

            {/* How it Works */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 border border-primary-100 shadow-lg">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  How It Works
                </h3>
                <StaggerContainer staggerDelay={0.1} className="space-y-6">
                  {steps.map((step) => (
                    <StaggerItem key={step.number}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors"
                      >
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${step.color} flex items-center justify-center font-bold text-lg`}>
                          {step.number}
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 text-lg">
                            {step.title}
                          </h4>
                          <p className="text-neutral-600">{step.description}</p>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="section bg-gradient-to-b from-white to-neutral-50">
          <div className="container-wide">
            <FadeIn className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary mb-4">
                <Images className="w-8 h-8" />
              </div>
              <h2>Gallery</h2>
              <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                See how we support our participants with {service.name.toLowerCase()}
              </p>
            </FadeIn>
            <ImageGallery
              images={[service.image, ...service.gallery]}
              serviceName={service.name}
            />
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="section bg-gradient-to-b from-white to-[#F5FAFA]">
        <div className="container-wide">
          <FadeIn className="text-center mb-12">
            <h2>Related Services</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Explore more ways we can support you
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((related) => {
              const relatedImage = images.services[related.slug as keyof typeof images.services];

              return (
                <StaggerItem key={related.id}>
                  <ScaleOnHover scale={1.03}>
                    <Link
                      href={`/services/${related.slug}`}
                      className="group block rounded-2xl border border-neutral-200 bg-white hover:border-primary-300 hover:shadow-xl transition-all no-underline overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedImage?.image || images.hero.main}
                          alt={relatedImage?.alt || related.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary transition-colors">
                          {related.name}
                        </h3>
                        <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                          {related.description}
                        </p>
                        <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-800">
                          Learn more
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </ScaleOnHover>
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
