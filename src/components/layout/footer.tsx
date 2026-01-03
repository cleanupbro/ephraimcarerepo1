"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";
import { contactInfo, companyInfo } from "@/data/navigation";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "NDIS", href: "/ndis" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white pb-24 md:pb-0">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block no-underline">
            <div className="bg-white rounded-lg p-3 transition-transform duration-300 hover:scale-105">
              <Image
                src="/images/logo/ephraim-care-logo-full.png"
                alt="Ephraim Care"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white hover:underline underline-offset-4 no-underline text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
          <a
            href={contactInfo.phoneHref}
            className="flex items-center gap-2 text-white/80 hover:text-white no-underline transition-colors duration-200"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm">{contactInfo.phone}</span>
          </a>
          <span className="text-white/30 hidden sm:inline">|</span>
          <a
            href={contactInfo.emailHref}
            className="flex items-center gap-2 text-white/80 hover:text-white no-underline transition-colors duration-200"
          >
            <Mail className="h-4 w-4" />
            <span className="text-sm">{contactInfo.email}</span>
          </a>
        </div>

        {/* Badges Section */}
        <div className="flex justify-center items-center gap-6 mb-10">
          <a
            href="https://www.ndis.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg p-2 transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/images/ndis/ndis-logo.png"
              alt="NDIS - National Disability Insurance Scheme"
              width={80}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </a>
          <a
            href="https://www.ndis.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg p-2 transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/images/ndis/I-love-NDIS.webp"
              alt="I Love NDIS"
              width={100}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 no-underline transition-all duration-200"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 no-underline transition-all duration-200"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-6" />

        {/* Bottom Section */}
        <div className="text-center space-y-2">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} Ephraim Care Pty Ltd. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            ABN: {companyInfo.abn}
          </p>
          <p className="text-white/30 text-xs pt-2">
            Website by{" "}
            <a
              href="mailto:theopbros.ai@gmail.com"
              className="text-white/40 hover:text-white/60 no-underline transition-colors duration-200"
            >
              theopbros.ai@gmail.com
            </a>
          </p>
        </div>

        {/* Staff Portal Link */}
        <div className="flex justify-center mt-8">
          <Link
            href="/admin/login"
            className="text-white/30 hover:text-white/50 text-xs no-underline transition-colors duration-200"
          >
            Staff Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
