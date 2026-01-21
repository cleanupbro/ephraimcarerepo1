"use client";

import { useEffect } from "react";

/**
 * Live Chat Widget using Tawk.to (free)
 *
 * To enable:
 * 1. Sign up at https://www.tawk.to/
 * 2. Create a new property for Ephraim Care
 * 3. Copy your Property ID and Widget ID
 * 4. Replace the placeholder values below
 *
 * The chat widget will appear as a floating button in the bottom-right corner.
 */

// TODO: Replace with actual Tawk.to credentials
const TAWK_PROPERTY_ID = "YOUR_PROPERTY_ID";
const TAWK_WIDGET_ID = "YOUR_WIDGET_ID";
const IS_ENABLED = false; // Set to true when credentials are added

export function LiveChat() {
  useEffect(() => {
    if (!IS_ENABLED) return;

    // Load Tawk.to script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(script);
    };
  }, []);

  // Return null - the widget is injected by Tawk.to script
  return null;
}

/**
 * Alternative: Crisp Chat (also free tier available)
 *
 * To use Crisp instead:
 * 1. Sign up at https://crisp.chat/
 * 2. Get your Website ID from Settings > Website Settings
 * 3. Replace the code above with:
 *
 * useEffect(() => {
 *   window.$crisp = [];
 *   window.CRISP_WEBSITE_ID = "YOUR_WEBSITE_ID";
 *
 *   const script = document.createElement("script");
 *   script.src = "https://client.crisp.chat/l.js";
 *   script.async = true;
 *   document.head.appendChild(script);
 * }, []);
 */
