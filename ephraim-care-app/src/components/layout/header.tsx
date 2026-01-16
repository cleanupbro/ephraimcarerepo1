"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { mainNavigation, contactInfo } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-all duration-300",
        isScrolled && "shadow-sm border-b border-neutral-200"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-20" : "h-[100px] lg:h-[120px]"
          )}
        >
          {/* Logo Section - Icon + Text */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline hover:opacity-90 transition-opacity"
          >
            {/* Logo Icon */}
            <div className="relative flex-shrink-0">
              <Image
                src="/images/logo/ephraim-care-new-logo.png"
                alt="Ephraim Care"
                width={50}
                height={50}
                className={cn(
                  "object-contain transition-all duration-300",
                  isScrolled ? "w-10 h-10" : "w-[50px] h-[50px]"
                )}
                priority
              />
            </div>
            {/* Text Logo */}
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-bold tracking-wide text-black transition-all duration-300",
                  isScrolled ? "text-lg" : "text-xl lg:text-2xl"
                )}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                EPHRAIM CARE
              </span>
              <span
                className={cn(
                  "text-neutral-600 transition-all duration-300 hidden sm:block",
                  isScrolled ? "text-xs" : "text-sm"
                )}
              >
                embracing differences
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center"
            aria-label="Main navigation"
          >
            {mainNavigation.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "inline-flex items-center px-6 py-2 font-medium transition-colors",
                        isActive(item.href)
                          ? "text-secondary"
                          : "text-black hover:text-secondary"
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
                    {/* Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute left-0 top-full pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
                        servicesOpen && "opacity-100 visible"
                      )}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-neutral-100 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-5 py-3 text-sm no-underline transition-colors",
                              isActive(child.href)
                                ? "text-secondary bg-secondary-50"
                                : "text-black hover:text-secondary hover:bg-secondary-50"
                            )}
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
                      "inline-flex items-center px-6 py-2 font-medium no-underline transition-colors relative",
                      isActive(item.href)
                        ? "text-secondary"
                        : "text-black hover:text-secondary"
                    )}
                  >
                    {item.label}
                    {/* Active underline indicator */}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-secondary" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Phone Number - Desktop */}
            <a
              href={contactInfo.phoneHref}
              className={cn(
                "hidden md:flex items-center gap-2 font-semibold no-underline transition-colors",
                "text-secondary hover:text-secondary-600"
              )}
            >
              <Phone
                className={cn(
                  "transition-all duration-300",
                  isScrolled ? "h-4 w-4" : "h-5 w-5"
                )}
                aria-hidden="true"
              />
              <span className={cn(isScrolled ? "text-sm" : "text-base")}>
                {contactInfo.phone}
              </span>
            </a>


            {/* Get Started Button - Desktop */}
            <Link
              href="/referrals"
              className={cn(
                "hidden sm:inline-flex items-center justify-center font-semibold rounded-full no-underline transition-all duration-300",
                "bg-secondary text-white hover:bg-black",
                isScrolled
                  ? "px-5 py-2 text-sm"
                  : "px-6 py-2.5 text-base"
              )}
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={cn(
                "lg:hidden inline-flex items-center justify-center rounded-lg border transition-all",
                "border-neutral-200 text-black hover:bg-neutral-50",
                isScrolled ? "h-9 w-9" : "h-10 w-10"
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
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav
            className="border-t border-neutral-200 py-4"
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
                          className={cn(
                            "block px-4 py-3 text-base no-underline transition-colors",
                            isActive(child.href)
                              ? "text-secondary bg-secondary-50 font-medium"
                              : "text-black hover:text-secondary hover:bg-secondary-50"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-base font-medium no-underline transition-colors",
                        isActive(item.href)
                          ? "text-secondary border-l-4 border-secondary bg-secondary-50"
                          : "text-black hover:text-secondary hover:bg-secondary-50"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Footer Actions */}
            <div className="mt-6 px-4 space-y-4 border-t border-neutral-100 pt-4">
              <a
                href={contactInfo.phoneHref}
                className="flex items-center gap-2 text-secondary font-semibold no-underline"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span>{contactInfo.phone}</span>
              </a>
              <Link
                href="/referrals"
                className="block w-full text-center py-3 px-6 rounded-full font-semibold no-underline transition-colors bg-secondary text-white hover:bg-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
