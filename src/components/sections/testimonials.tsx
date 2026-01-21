"use client";

import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "@/data/images";
import { FadeIn } from "@/components/animations";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "NDIS Participant",
    location: "Liverpool",
    image: images.testimonials.avatar1,
    rating: 5,
    text: "Ephraim Care has transformed my life. The support workers are incredibly kind and patient. They truly understand my needs and help me achieve my goals every day.",
    emoji: "💜",
  },
  {
    id: 2,
    name: "Michael T.",
    role: "Family Member",
    location: "Parramatta",
    image: images.testimonials.avatar2,
    rating: 5,
    text: "Finding the right care for my brother was challenging until we found Ephraim Care. Their person-centred approach and professional team give our family peace of mind.",
    emoji: "💙",
  },
  {
    id: 3,
    name: "David L.",
    role: "Support Coordinator",
    location: "Penrith",
    image: images.testimonials.avatar3,
    rating: 5,
    text: "I regularly refer clients to Ephraim Care because of their reliability and genuine commitment to participant outcomes. They always go above and beyond.",
    emoji: "💚",
  },
  {
    id: 4,
    name: "Emma J.",
    role: "NDIS Participant",
    location: "Blacktown",
    image: images.testimonials.avatar4,
    rating: 5,
    text: "The community access support I receive has opened up a whole new world for me. I now attend art classes, go shopping independently, and have made wonderful friends.",
    emoji: "🧡",
  },
  {
    id: 5,
    name: "James K.",
    role: "Parent & Carer",
    location: "Campbelltown",
    image: images.testimonials.avatar5,
    rating: 5,
    text: "As a parent of a child with autism, finding the right support was crucial. Ephraim Care's team is patient, understanding, and my son has made incredible progress with their help.",
    emoji: "💛",
  },
  {
    id: 6,
    name: "Priya S.",
    role: "NDIS Participant",
    location: "Fairfield",
    image: images.testimonials.avatar6,
    rating: 5,
    text: "The psychosocial recovery support has been life-changing. My support worker understands mental health and has helped me build confidence and independence step by step.",
    emoji: "💗",
  },
  {
    id: 7,
    name: "Robert W.",
    role: "Plan Manager",
    location: "Liverpool",
    image: images.testimonials.avatar7,
    rating: 5,
    text: "Ephraim Care stands out for their communication and professionalism. They make my job easier by providing clear reports and always putting participants first.",
    emoji: "💎",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToIndex = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <Quote className="absolute top-10 left-10 w-40 h-40 text-primary" />
          <Quote className="absolute bottom-10 right-10 w-40 h-40 text-primary rotate-180" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium mb-4">
            ⭐ Client Stories
          </span>
          <h2 className="text-balance">What People Say About Us</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Real stories from real people who have experienced the Ephraim Care difference.
          </p>
        </FadeIn>

        {/* Main Carousel */}
        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows - Desktop */}
          <button
            onClick={goToPrev}
            className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-neutral-200 items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-neutral-200 items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main testimonial display */}
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6 sm:p-8 md:p-12 border border-primary-100 shadow-xl"
              >
                {/* Emoji badge */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 text-4xl md:text-5xl opacity-20">
                  {testimonials[activeIndex].emoji}
                </div>

                {/* Quote icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                  <Quote className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 md:mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-secondary fill-secondary" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-lg sm:text-xl md:text-2xl text-neutral-700 leading-relaxed mb-6 md:mb-8">
                  &ldquo;{testimonials[activeIndex].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-base md:text-lg">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-sm md:text-base text-neutral-600">
                      {testimonials[activeIndex].role}
                    </p>
                    <p className="text-xs md:text-sm text-primary font-medium">
                      📍 {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-neutral-200 flex items-center justify-center active:bg-primary active:text-white active:border-primary transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-neutral-200 flex items-center justify-center active:bg-primary active:text-white active:border-primary transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary w-8"
                    : "bg-neutral-300 hover:bg-neutral-400 w-2.5"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-rotate indicator */}
          <div className="flex justify-center mt-4">
            <span className="text-xs text-neutral-400 flex items-center gap-2">
              {isPaused ? (
                <>⏸️ Paused - hover to pause</>
              ) : (
                <>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Auto-rotating every 5s
                </>
              )}
            </span>
          </div>
        </div>

        {/* Thumbnail strip - Tablet & Desktop */}
        <div className="hidden sm:block mt-12 md:mt-16">
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => goToIndex(index)}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border transition-all ${
                  index === activeIndex
                    ? "border-primary-300 bg-primary-50 shadow-lg ring-2 ring-primary/20"
                    : "border-neutral-200 bg-white hover:border-primary-200 hover:shadow-md"
                }`}
              >
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left hidden md:block">
                  <p className="font-semibold text-neutral-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-neutral-500">{testimonial.location}</p>
                </div>
                {index === activeIndex && (
                  <span className="text-lg">{testimonial.emoji}</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile thumbnail strip - horizontal scroll */}
        <div className="sm:hidden mt-8 -mx-4 px-4 overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max justify-start px-2">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => goToIndex(index)}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${
                  index === activeIndex
                    ? "bg-primary-50 shadow-md"
                    : "bg-white"
                }`}
              >
                <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 shadow-md ${
                  index === activeIndex ? "border-primary" : "border-white"
                }`}>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-neutral-600 font-medium max-w-[60px] truncate">
                  {testimonial.name.split(" ")[0]}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
