"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
// Floating buttons and accessibility toolbar removed per client request - can be re-enabled later
// import { FloatingButtons } from "@/components/ui/floating-buttons";
// import { AccessibilityToolbar } from "@/components/ui/accessibility-toolbar";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    // Admin pages get no header, footer, or floating buttons
    return <>{children}</>;
  }

  // Public pages get the full layout (simplified per client request)
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      {/* FloatingButtons and AccessibilityToolbar removed - can be re-enabled later */}
    </>
  );
}
