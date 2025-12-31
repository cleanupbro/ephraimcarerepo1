"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { FloatingButtons } from "@/components/ui/floating-buttons";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    // Admin pages get no header, footer, or floating buttons
    return <>{children}</>;
  }

  // Public pages get the full layout
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
