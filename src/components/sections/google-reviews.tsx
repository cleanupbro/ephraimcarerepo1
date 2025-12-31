"use client";

import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

// Static reviews data (can be replaced with Google Places API later)
const reviews = [
  {
    id: 1,
    author: "Jennifer L.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    date: "2 weeks ago",
    text: "Ephraim Care has been a blessing for our family. The support workers are professional, caring, and always go the extra mile. Highly recommend!",
  },
  {
    id: 2,
    author: "Marcus T.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    date: "1 month ago",
    text: "Outstanding service! They truly understand the meaning of person-centred care. My son looks forward to his sessions every week.",
  },
  {
    id: 3,
    author: "Amara K.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    date: "1 month ago",
    text: "As a support coordinator, I refer many clients to Ephraim Care. They consistently deliver quality support and excellent communication.",
  },
  {
    id: 4,
    author: "David C.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    date: "2 months ago",
    text: "The team at Ephraim Care helped me regain my independence. They are patient, understanding, and genuinely care about my wellbeing.",
  },
];

const overallRating = {
  score: 5.0,
  total: 47,
};

export function GoogleReviews() {
  return (
    <section className="section bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
            ⭐ Google Reviews
          </span>
          <h2 className="text-balance">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Real reviews from real families and participants we have had the privilege to support.
          </p>
        </FadeIn>

        {/* Overall Rating Card */}
        <FadeIn delay={0.1} className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Google Logo */}
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-neutral-900">
                    {overallRating.score}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-600 text-sm">
                  Based on {overallRating.total} reviews
                </p>
              </div>
            </div>

            <a
              href="https://search.google.com/local/writereview?placeid=ChIJrTLr-Bk1KWsRKNpGLfaSwxU"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-800 font-medium text-sm"
            >
              See all reviews on Google
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>

        {/* Reviews Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map((review) => (
            <StaggerItem key={review.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-neutral-900">
                        {review.author}
                      </h4>
                      <span className="text-xs text-neutral-500">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-neutral-600 text-sm leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Google attribution */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-100">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-xs text-neutral-500">
                    Posted on Google
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Write a Review CTA */}
        <FadeIn delay={0.3} className="text-center mt-12">
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJrTLr-Bk1KWsRKNpGLfaSwxU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-neutral-900 font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all shadow-lg"
          >
            <Star className="w-5 h-5" />
            Write a Review
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
