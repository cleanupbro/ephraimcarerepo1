import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { footerNavigation, contactInfo, companyInfo } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pb-24 md:pb-8">
      <div className="container-wide py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block no-underline bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors">
              <Image
                src="/logo.png"
                alt="Ephraim Care - Reliable Homecare Support"
                width={160}
                height={60}
                className="object-contain"
              />
            </Link>

            {/* NDIS Badges */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logos/i-heart-ndis.svg"
                  alt="I Heart NDIS - Supporting people with disability"
                  width={100}
                  height={30}
                  className="bg-white rounded px-2 py-1"
                />
              </div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
                <span className="text-sm font-medium text-primary-300">
                  Registered NDIS Provider
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                NDIS Registration: {companyInfo.ndisRegistrationId}
              </p>
            </div>

            <div className="mt-6 space-y-3 text-neutral-300">
              <a
                href={contactInfo.phoneHref}
                className="flex items-center space-x-3 hover:text-white no-underline transition-colors"
              >
                <Phone className="h-5 w-5 text-primary-400" aria-hidden="true" />
                <span>{contactInfo.phone}</span>
              </a>
              <a
                href={contactInfo.emailHref}
                className="flex items-center space-x-3 hover:text-white no-underline transition-colors"
              >
                <Mail className="h-5 w-5 text-primary-400" aria-hidden="true" />
                <span>{contactInfo.email}</span>
              </a>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <span>{contactInfo.address}</span>
                  <br />
                  <span>{contactInfo.suburb}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary-400" aria-hidden="true" />
                <span>{contactInfo.hours}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-primary-400" aria-hidden="true" />
                <span>ABN: {companyInfo.abn}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-300 hover:text-white no-underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-primary-400 hover:text-primary-300 no-underline transition-colors"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-300 hover:text-white no-underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Get Started
            </h3>
            <p className="text-neutral-300 mb-4">
              Ready to discuss your support needs? Book a free consultation
              with our team.
            </p>
            <Link
              href="/referrals"
              className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-primary text-white font-semibold hover:bg-[#1565C0] no-underline transition-colors"
            >
              Make a Referral
            </Link>
          </div>
        </div>

        {/* Admin Login - Separate row for visibility */}
        <div className="mt-12 pt-6 border-t border-neutral-800">
          <div className="flex justify-center mb-6">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-800 hover:bg-[#1565C0] text-neutral-300 hover:text-white text-sm no-underline transition-all border border-neutral-700 hover:border-[#1565C0]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Staff & Admin Login
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Ephraim Care. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-neutral-400 hover:text-white text-sm no-underline transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
