"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "61451918884"; // Ephraim Care phone
const DEFAULT_MESSAGE = "Hi! I'm interested in Ephraim Care's NDIS services. Can you help me?";

interface QuickMessage {
  label: string;
  message: string;
  emoji: string;
}

const quickMessages: QuickMessage[] = [
  {
    label: "General Enquiry",
    message: "Hi! I'd like to learn more about your NDIS services.",
    emoji: "👋",
  },
  {
    label: "Make a Referral",
    message: "Hi! I'd like to make a referral for NDIS support services.",
    emoji: "📋",
  },
  {
    label: "Book Consultation",
    message: "Hi! I'd like to book a free consultation to discuss my support needs.",
    emoji: "📅",
  },
  {
    label: "Urgent Support",
    message: "Hi! I need urgent assistance with NDIS support services.",
    emoji: "🚨",
  },
];

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button - positioned above mobile call bar on mobile */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Popup Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="fixed bottom-36 right-4 md:bottom-24 md:right-8 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#25D366] p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Ephraim Care</h3>
                    <p className="text-sm text-white/80">Typically replies instantly</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4">
                <p className="text-sm text-neutral-600 mb-4">
                  Hi there! 👋 How can we help you today?
                </p>

                <div className="space-y-2">
                  {quickMessages.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => openWhatsApp(item.message)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:border-[#25D366] hover:bg-green-50 transition-all text-left group"
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-sm font-medium text-neutral-700 group-hover:text-[#25D366]">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom message input */}
                <button
                  onClick={() => openWhatsApp(DEFAULT_MESSAGE)}
                  className="w-full mt-4 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] transition-colors"
                >
                  Start Chat
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pulse animation on button */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-30 pointer-events-none">
          <span className="absolute w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </div>
      )}
    </>
  );
}
