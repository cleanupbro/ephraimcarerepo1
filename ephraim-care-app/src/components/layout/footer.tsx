"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { contactInfo, companyInfo } from "@/data/navigation";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const supportLinks = [
  { label: "Referrals", href: "/referrals" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pb-24 md:pb-0">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Logo & Description */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block no-underline mb-4">
              <div className="bg-white rounded-lg p-3 inline-block transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/logo/ephraim-care-new-logo.png"
                  alt="Ephraim Care"
                  width={160}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Compassionate, person-centred disability and mental health support
              services across Western & Southwestern Sydney.
            </p>
            {/* NDIS Badges */}
            <div className="flex justify-center md:justify-start items-center gap-3">
              <a
                href="https://www.ndis.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-2 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/images/ndis/ndis-logo.png"
                  alt="NDIS"
                  width={60}
                  height={30}
                  className="h-7 w-auto object-contain"
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
                  width={70}
                  height={30}
                  className="h-7 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 hover:text-white text-sm no-underline transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mt-6 mb-4">
              Support
            </h4>
            <nav className="space-y-2">
              {supportLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 hover:text-white text-sm no-underline transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a
                href={contactInfo.phoneHref}
                className="flex items-center justify-center md:justify-start gap-3 text-white/60 hover:text-white no-underline transition-colors duration-200"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">{contactInfo.phone}</span>
              </a>
              <a
                href={contactInfo.emailHref}
                className="flex items-center justify-center md:justify-start gap-3 text-white/60 hover:text-white no-underline transition-colors duration-200"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">{contactInfo.email}</span>
              </a>
              <div className="flex items-start justify-center md:justify-start gap-3 text-white/60">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm">Western & SW Sydney, NSW</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start items-center gap-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 no-underline transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 no-underline transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white/40 text-xs">
              © 2026 Ephraim Care Pty Ltd. ABN: {companyInfo.abn}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="text-white/30 hover:text-white/50 text-xs no-underline transition-colors duration-200"
            >
              Staff Portal
            </Link>
            <span className="text-white/20">|</span>
            <p className="text-white/30 text-xs">
              Powered by{" "}
              <a
                href="mailto:theopbros.ai@gmail.com"
                className="text-primary/70 hover:text-primary no-underline transition-colors duration-200"
              >
                theopbros.ai@gmail.com
              </a>
              {" "}© 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
