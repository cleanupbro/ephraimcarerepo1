"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, X } from "lucide-react";
import { contactInfo } from "@/data/navigation";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50 hidden md:block"
        >
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-16 right-0 mb-2 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden min-w-[200px]"
              >
                <div className="p-2">
                  <Link
                    href="/referrals"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E3F2FD] transition-colors group"
                    onClick={() => setIsExpanded(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 group-hover:text-[#1565C0]">
                        Make a Referral
                      </p>
                      <p className="text-xs text-neutral-500">Start your journey</p>
                    </div>
                  </Link>

                  <a
                    href={contactInfo.phoneHref}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-colors group"
                    onClick={() => setIsExpanded(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 group-hover:text-green-600">
                        Call Us Now
                      </p>
                      <p className="text-xs text-neutral-500">{contactInfo.phone}</p>
                    </div>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center gap-2 px-5 py-3.5 rounded-full shadow-xl transition-all ${
              isExpanded
                ? "bg-neutral-800 text-white hover:bg-neutral-700"
                : "bg-gradient-to-r from-primary to-primary-700 text-white hover:from-[#1565C0] hover:to-[#0D47A1]"
            }`}
          >
            {/* Pulse animation */}
            {!isExpanded && (
              <span className="absolute -top-1 -right-1 w-4 h-4">
                <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary" />
              </span>
            )}

            {isExpanded ? (
              <>
                <X className="w-5 h-5" />
                <span className="font-semibold">Close</span>
              </>
            ) : (
              <>
                <span className="text-xl">🤝</span>
                <span className="font-semibold">Get Help Now</span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
