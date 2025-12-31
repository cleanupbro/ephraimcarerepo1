"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Play, X, Volume2, VolumeX } from "lucide-react";
import { FadeIn } from "@/components/animations";

// Placeholder video - replace with actual Meshach welcome video
// Set VIDEO_URL to YouTube embed URL when ready, e.g., "https://www.youtube.com/embed/VIDEO_ID"
const VIDEO_URL: string | null = null;
const THUMBNAIL_URL = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80";

export function VideoWelcome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // If no video URL, show placeholder with instructions
  const hasVideo = VIDEO_URL !== null;

  return (
    <section className="section bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
              <Play className="w-4 h-4" />
              Meet Our Team
            </span>

            <h2 className="text-balance">
              A Personal Welcome from{" "}
              <span className="text-primary">Ephraim Care</span>
            </h2>

            <p className="mt-6 text-lg text-neutral-600">
              We believe in the power of genuine connection. Watch our founder
              share the vision behind Ephraim Care and our commitment to
              providing compassionate, person-centred support.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xl">🤝</span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Person-Centred Care</p>
                  <p className="text-sm text-neutral-600">Your goals, your choices, your life</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
                  <span className="text-xl">💪</span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Building Independence</p>
                  <p className="text-sm text-neutral-600">Supporting you to live your best life</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xl">❤️</span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Genuine Compassion</p>
                  <p className="text-sm text-neutral-600">We care about you as a person</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Video Player */}
          <FadeIn delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
              {/* Thumbnail / Player */}
              <div className="relative aspect-video bg-neutral-900">
                {!isPlaying ? (
                  <>
                    {/* Thumbnail */}
                    <Image
                      src={THUMBNAIL_URL}
                      alt="Welcome video thumbnail"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

                    {/* Play Button */}
                    <motion.button
                      onClick={() => hasVideo && setIsPlaying(true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="relative">
                        {/* Pulse rings */}
                        <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDelay: "0.5s" }} />

                        <div className="relative w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <Play className="w-8 h-8 ml-1 text-primary group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </motion.button>

                    {/* Coming Soon overlay if no video */}
                    {!hasVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/80">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                            <Play className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Welcome Video Coming Soon</h3>
                          <p className="text-neutral-300 text-sm">
                            A personal message from our founder will be added here
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Duration badge */}
                    {hasVideo && (
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm font-medium rounded-lg">
                        2:30
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Video iframe - replace with actual video embed */}
                    <iframe
                      src={`${VIDEO_URL}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />

                    {/* Controls overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => setIsPlaying(false)}
                          className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Caption */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white rounded-xl shadow-lg border border-neutral-200">
                <p className="text-sm font-medium text-neutral-900 whitespace-nowrap">
                  🎥 Watch our 2-minute welcome video
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
