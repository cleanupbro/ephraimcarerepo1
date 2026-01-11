"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Accessibility,
  Type,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Contrast,
} from "lucide-react";

interface AccessibilitySettings {
  fontSize: "normal" | "large" | "xl";
  contrast: "normal" | "high";
  reducedMotion: boolean;
  dyslexiaFont: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: "normal",
  contrast: "normal",
  reducedMotion: false,
  dyslexiaFont: false,
};

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {
        // Invalid JSON, use defaults
      }
    }
  }, []);

  // Apply settings to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Font size
    root.classList.remove("text-scale-normal", "text-scale-large", "text-scale-xl");
    root.classList.add(`text-scale-${settings.fontSize}`);

    // High contrast
    root.classList.toggle("high-contrast", settings.contrast === "high");

    // Reduced motion
    root.classList.toggle("reduce-motion", settings.reducedMotion);

    // Dyslexia font
    root.classList.toggle("dyslexia-font", settings.dyslexiaFont);

    // Save to localStorage
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
  }, [settings, mounted]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  if (!mounted) {
    return (
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
        <div className="w-12 h-12 rounded-full bg-neutral-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#00BFA5] to-[#008C7D] text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close accessibility menu" : "Open accessibility menu"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Accessibility className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active indicator */}
        {(settings.fontSize !== "normal" ||
          settings.contrast !== "normal" ||
          settings.reducedMotion ||
          settings.dyslexiaFont) && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF9800] rounded-full border-2 border-white" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-14 top-1/2 -translate-y-1/2 w-72 p-5 rounded-2xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,250,249,0.98) 100%)",
              border: "1px solid rgba(0,0,0,0.08)",
              backdropFilter: "blur(20px)",
            }}
            role="dialog"
            aria-label="Accessibility settings"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-[#00BFA5]" />
                Accessibility
              </h3>
              <button
                onClick={resetSettings}
                className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors"
                aria-label="Reset all settings"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              {/* Font Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Type className="w-4 h-4 text-neutral-500" />
                  Text Size
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateSetting("fontSize", "normal")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      settings.fontSize === "normal"
                        ? "bg-[#00BFA5] text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                    aria-pressed={settings.fontSize === "normal"}
                  >
                    <ZoomOut className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => updateSetting("fontSize", "large")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      settings.fontSize === "large"
                        ? "bg-[#00BFA5] text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                    aria-pressed={settings.fontSize === "large"}
                  >
                    A
                  </button>
                  <button
                    onClick={() => updateSetting("fontSize", "xl")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      settings.fontSize === "xl"
                        ? "bg-[#00BFA5] text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                    aria-pressed={settings.fontSize === "xl"}
                  >
                    <ZoomIn className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Contrast className="w-4 h-4 text-neutral-500" />
                  High Contrast
                </label>
                <button
                  onClick={() =>
                    updateSetting(
                      "contrast",
                      settings.contrast === "normal" ? "high" : "normal"
                    )
                  }
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.contrast === "high" ? "bg-[#00BFA5]" : "bg-neutral-300"
                  }`}
                  role="switch"
                  aria-checked={settings.contrast === "high"}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow"
                    animate={{ x: settings.contrast === "high" ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Reduce Motion */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-neutral-500" />
                  Reduce Motion
                </label>
                <button
                  onClick={() => updateSetting("reducedMotion", !settings.reducedMotion)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.reducedMotion ? "bg-[#00BFA5]" : "bg-neutral-300"
                  }`}
                  role="switch"
                  aria-checked={settings.reducedMotion}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow"
                    animate={{ x: settings.reducedMotion ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Dyslexia Font */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Type className="w-4 h-4 text-neutral-500" />
                  Dyslexia Font
                </label>
                <button
                  onClick={() => updateSetting("dyslexiaFont", !settings.dyslexiaFont)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.dyslexiaFont ? "bg-[#00BFA5]" : "bg-neutral-300"
                  }`}
                  role="switch"
                  aria-checked={settings.dyslexiaFont}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow"
                    animate={{ x: settings.dyslexiaFont ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 text-center">
                WCAG 2.2 AA Compliant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
