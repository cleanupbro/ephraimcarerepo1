"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComfortModeToggle } from "@/components/accessibility/comfort-mode-toggle";
import { mainNavigation, contactInfo } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-300",
        isScrolled
          ? "border-neutral-200 shadow-md"
          : "border-transparent"
      )}
    >
      <div className="container-wide">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-14" : "h-18"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center no-underline hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo/ephraim-care-logo.png"
              alt="Ephraim Care - Registered NDIS Provider Liverpool NSW"
              width={180}
              height={60}
              className={cn(
                "transition-all duration-300 object-contain",
                isScrolled ? "h-10 w-auto md:h-12" : "h-12 w-auto md:h-14"
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
            {mainNavigation.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "inline-flex items-center px-4 font-medium text-neutral-700 hover:text-[#1565C0] rounded-lg hover:bg-[#E3F2FD] transition-colors",
                        isScrolled ? "py-1.5 text-sm" : "py-2 text-base"
                      )}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      onMouseEnter={() => setServicesOpen(true)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform",
                          servicesOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {/* Dropdown */}
                    <div
                      className={cn(
                        "absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
                        servicesOpen && "opacity-100 visible"
                      )}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-base text-neutral-700 hover:text-[#1565C0] hover:bg-[#E3F2FD] rounded-lg no-underline transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-4 font-medium text-neutral-700 hover:text-[#1565C0] rounded-lg hover:bg-[#E3F2FD] no-underline transition-colors",
                      isScrolled ? "py-1.5 text-sm" : "py-2 text-base"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Phone - visible on larger screens */}
            <a
              href={contactInfo.phoneHref}
              className={cn(
                "hidden md:flex items-center space-x-2 text-[#1565C0] font-medium hover:text-[#0D47A1] no-underline transition-all",
                isScrolled ? "text-sm" : "text-base"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>{contactInfo.phone}</span>
            </a>

            {/* Comfort Mode Toggle */}
            <ComfortModeToggle />

            {/* CTA Button - visible on larger screens */}
            <Button
              asChild
              size={isScrolled ? "sm" : "default"}
              className="hidden sm:inline-flex transition-all"
            >
              <Link href="/referrals">Make Referral</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              className={cn(
                "lg:hidden inline-flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-all",
                isScrolled ? "h-8 w-8" : "h-10 w-10"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden border-t border-neutral-200 py-4"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1">
              {mainNavigation.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <div className="px-4 py-2 text-sm font-semibold text-neutral-500 uppercase tracking-wide">
                        {item.label}
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-base text-neutral-700 hover:text-[#1565C0] hover:bg-[#E3F2FD] no-underline"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-base font-medium text-neutral-700 hover:text-[#1565C0] hover:bg-[#E3F2FD] no-underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 px-4 space-y-3">
              <a
                href={contactInfo.phoneHref}
                className="flex items-center space-x-2 text-primary font-medium"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{contactInfo.phone}</span>
              </a>
              <Button asChild className="w-full">
                <Link href="/referrals">Make Referral</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
