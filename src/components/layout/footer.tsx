"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Building2, ArrowRight, Heart, Shield, Sparkles } from "lucide-react";
import { footerNavigation, contactInfo, companyInfo } from "@/data/navigation";
import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pb-24 md:pb-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#004D45] via-[#003D38] to-[#002825]" />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#00BFA5]/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-1/2 -right-20 w-80 h-80 bg-gradient-to-br from-[#FF9800]/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-[#E91E63]/15 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <div className="relative container-wide py-16 px-6">
        {/* Top Section - Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 md:p-12 mb-12 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
          }}
        >
          {/* Glass Highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Column 1: Brand & Contact */}
            <div className="space-y-6">
              {/* Logo */}
              <Link
                href="/"
                className="inline-block no-underline group"
              >
                <div className="relative bg-white/95 p-4 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                  <Image
                    src="/images/logo/ephraim-care-logo.png"
                    alt="Ephraim Care - NDIS Support Services Liverpool NSW"
                    width={160}
                    height={56}
                    className="object-contain h-14 w-auto"
                  />
                </div>
              </Link>

              {/* NDIS Badges */}
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-xl p-2 shadow-md">
                  <Image
                    src="/images/ndis/I-love-NDIS.webp"
                    alt="I Love NDIS"
                    width={90}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="bg-white rounded-xl p-2 shadow-md">
                  <Image
                    src="/images/ndis/ndis-logo.png"
                    alt="NDIS Logo"
                    width={60}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <a
                  href={contactInfo.phoneHref}
                  className="flex items-center gap-3 text-white/90 hover:text-white no-underline transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#00BFA5]/20 group-hover:bg-[#00BFA5]/30 transition-colors">
                    <Phone className="h-5 w-5 text-[#00BFA5]" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{contactInfo.phone}</span>
                </a>

                <a
                  href={contactInfo.emailHref}
                  className="flex items-center gap-3 text-white/90 hover:text-white no-underline transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FF9800]/20 group-hover:bg-[#FF9800]/30 transition-colors">
                    <Mail className="h-5 w-5 text-[#FF9800]" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{contactInfo.email}</span>
                </a>

                <div className="flex items-start gap-3 text-white/80">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#E91E63]/20 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#E91E63]" aria-hidden="true" />
                  </span>
                  <div className="pt-2">
                    <span>{contactInfo.address}</span>
                    <br />
                    <span>{contactInfo.suburb}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/80">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10">
                    <Clock className="h-5 w-5 text-white/70" aria-hidden="true" />
                  </span>
                  <span>{contactInfo.hours}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#E91E63]" aria-hidden="true" />
                Our Services
              </h3>
              <ul className="space-y-3">
                {footerNavigation.services.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white no-underline transition-all duration-300 hover:pl-2 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA5] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <li className="pt-2">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-[#00BFA5] hover:text-[#4DD4C3] no-underline transition-colors font-medium"
                  >
                    View All Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links & CTA */}
            <div className="space-y-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#00BFA5]" aria-hidden="true" />
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {footerNavigation.company.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="text-white/80 hover:text-white no-underline transition-all duration-300 hover:pl-2 flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9800] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div
                className="p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,191,165,0.15) 0%, rgba(255,152,0,0.1) 100%)',
                  border: '1px solid rgba(0,191,165,0.2)',
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00BFA5]/20 to-transparent rounded-full blur-xl" />
                <Sparkles className="h-6 w-6 text-[#FF9800] mb-3" aria-hidden="true" />
                <h4 className="text-white font-semibold mb-2">Ready to Get Started?</h4>
                <p className="text-white/70 text-sm mb-4">
                  Book a free consultation with our caring team today.
                </p>
                <Link
                  href="/referrals"
                  className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-gradient-to-r from-[#00BFA5] to-[#00A693] text-white font-semibold no-underline transition-all duration-300 hover:shadow-lg hover:shadow-[#00BFA5]/30 hover:scale-[1.02]"
                >
                  Make a Referral
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Admin Login */}
        <div className="flex justify-center mb-8">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white/60 hover:text-white text-sm no-underline transition-all duration-300 hover:bg-white/5"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Staff Portal
          </Link>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright & ABN */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <p className="text-white/50 text-sm">
                © {currentYear} Ephraim Care. All rights reserved.
              </p>
              <span className="hidden md:inline text-white/30">•</span>
              <p className="text-white/40 text-sm flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                ABN: {companyInfo.abn}
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/50 hover:text-white text-sm no-underline transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* OpBros Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 pt-6 text-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p className="text-white/30 text-xs tracking-wide">
              Website by{" "}
              <a
                href="mailto:theopbros.ai@gmail.com"
                className="text-[#FF9800]/60 hover:text-[#FF9800] no-underline transition-colors"
              >
                theopbros.ai@gmail.com
              </a>
              {" "}|{" "}
              <span className="text-[#00BFA5]/50">
                Powered by OpBros Automation
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
