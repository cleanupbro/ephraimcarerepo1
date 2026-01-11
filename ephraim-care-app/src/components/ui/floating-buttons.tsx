"use client";

import { BackToTop } from "./back-to-top";
import { MobileCallButton } from "./mobile-call-button";
import { LiveChat } from "./live-chat";
import { WhatsAppButton } from "./whatsapp-button";

export function FloatingButtons() {
  return (
    <>
      {/* Back to top button */}
      <BackToTop />

      {/* WhatsApp Quick Chat - primary floating action */}
      <WhatsAppButton />

      {/* Mobile floating button bar */}
      <MobileCallButton />

      {/* Live Chat Widget (enable when credentials are set) */}
      <LiveChat />
    </>
  );
}
