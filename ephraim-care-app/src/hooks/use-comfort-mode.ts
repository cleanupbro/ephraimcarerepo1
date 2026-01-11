"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ephraim-comfort-mode";

export function useComfortMode() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "enabled") {
      setIsEnabled(true);
      document.documentElement.classList.add("comfort-mode");
    }
    setIsLoaded(true);
  }, []);

  const toggle = useCallback(() => {
    setIsEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem(STORAGE_KEY, newValue ? "enabled" : "disabled");

      if (newValue) {
        document.documentElement.classList.add("comfort-mode");
      } else {
        document.documentElement.classList.remove("comfort-mode");
      }

      return newValue;
    });
  }, []);

  return { isEnabled, toggle, isLoaded };
}
