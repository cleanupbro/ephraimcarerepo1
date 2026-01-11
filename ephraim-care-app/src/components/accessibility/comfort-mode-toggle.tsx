"use client";

import { Eye, EyeOff } from "lucide-react";
import { useComfortMode } from "@/hooks/use-comfort-mode";

export function ComfortModeToggle() {
  const { isEnabled, toggle, isLoaded } = useComfortMode();

  if (!isLoaded) {
    return (
      <div className="h-10 w-10 rounded-lg bg-neutral-100 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={
        isEnabled ? "Disable comfort mode" : "Enable comfort mode for larger text and higher contrast"
      }
      aria-pressed={isEnabled}
      title={isEnabled ? "Comfort Mode On" : "Comfort Mode Off"}
    >
      {isEnabled ? (
        <Eye className="h-5 w-5" aria-hidden="true" />
      ) : (
        <EyeOff className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
