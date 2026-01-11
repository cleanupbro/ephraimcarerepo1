"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";
import { contactInfo } from "@/data/navigation";
import Link from "next/link";

export function MobileCallButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          {/* Options panel */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white border-t border-neutral-200 shadow-2xl p-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={contactInfo.phoneHref}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                  >
                    <Phone className="w-6 h-6" />
                    <span className="font-semibold text-sm">Call Now</span>
                    <span className="text-xs opacity-90">{contactInfo.phone}</span>
                  </a>
                  <Link
                    href="/referrals"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-primary to-primary-700 text-white"
                    onClick={() => setShowOptions(false)}
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span className="font-semibold text-sm">Referral</span>
                    <span className="text-xs opacity-90">Make a referral</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main bottom bar */}
          <div className="bg-gradient-to-r from-primary to-primary-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="text-white font-semibold text-sm">Need Support?</p>
                <p className="text-primary-100 text-xs">We are here to help</p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={contactInfo.phoneHref}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1565C0] font-bold hover:bg-[#E3F2FD] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium text-sm">Call</span>
              </a>
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-neutral-900 hover:bg-[#1565C0] hover:text-white font-bold transition-colors"
              >
                <span className="font-semibold text-sm">
                  {showOptions ? "Close" : "Get Help"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
