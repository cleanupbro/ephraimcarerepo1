"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contactInfo } from "@/data/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  MessageSquare,
  Loader2,
  CheckCircle,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const WEBHOOK_URL = "https://nioctibinu.online/webhook/ephraim/contact";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      submittedAt: new Date().toISOString(),
    };

    try {
      // Submit to n8n webhook
      const webhookPromise = fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Submit to internal API (for admin dashboard)
      const apiData = {
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        phone: data.phone,
        message: `${data.subject ? `[${data.subject}] ` : ""}${data.message}`,
      };

      const apiPromise = fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      // Wait for both
      await Promise.all([webhookPromise, apiPromise]);

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="section-sm bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-balance">Contact Us</h1>
            <p className="mt-4 text-xl text-neutral-600">
              We would love to hear from you. Get in touch to discuss how we can
              support your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Get in Touch
              </h2>
              <p className="mt-4 text-neutral-600">
                Our friendly team is here to answer your questions and help you
                get started with Ephraim Care.
              </p>

              <div className="mt-8 space-y-6">
                <a
                  href={contactInfo.phoneHref}
                  className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors no-underline"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Phone</h3>
                    <p className="text-primary font-medium">
                      {contactInfo.phone}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      Call us for immediate assistance
                    </p>
                  </div>
                </a>

                <a
                  href={contactInfo.emailHref}
                  className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors no-underline"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Email</h3>
                    <p className="text-primary font-medium">
                      {contactInfo.email}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      We&apos;ll respond within 24 hours
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      Service Area
                    </h3>
                    <p className="text-neutral-700">{contactInfo.location}</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      Including Liverpool, Parramatta, Penrith and surrounds
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      Office Hours
                    </h3>
                    <p className="text-neutral-700">{contactInfo.hours}</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      Support services available 7 days
                    </p>
                  </div>
                </div>
              </div>

              {/* Calendly CTA */}
              <div className="mt-8 p-6 rounded-2xl bg-primary-50 border border-primary-100">
                <div className="flex items-start gap-4">
                  <Calendar className="h-8 w-8 text-primary flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      Book a Free Consultation
                    </h3>
                    <p className="text-neutral-600 mt-1">
                      Schedule a time that works for you to discuss your support
                      needs with our team.
                    </p>
                    <Button asChild className="mt-4">
                      <a
                        href="https://calendly.com/ephraimcare/consultation"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book Consultation
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>

                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquare className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h2 className="text-2xl font-bold text-neutral-900">
                        Send us a Message
                      </h2>
                    </div>

                    {/* Error Alert */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                        >
                          <p className="font-medium">{error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          name="firstName"
                          placeholder="Your first name"
                          required
                        />
                        <Input
                          label="Last Name"
                          name="lastName"
                          placeholder="Your last name"
                          required
                        />
                      </div>

                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />

                      <Input
                        label="Phone"
                        name="phone"
                        type="tel"
                        placeholder="0400 000 000"
                      />

                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2 block text-base font-medium text-neutral-900"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          className="flex h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select a subject
                          </option>
                          <option value="general">General Enquiry</option>
                          <option value="services">Service Information</option>
                          <option value="referral">Make a Referral</option>
                          <option value="feedback">Feedback</option>
                          <option value="complaint">Lodge a Complaint</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-base font-medium text-neutral-900"
                        >
                          Message <span className="text-error">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className="flex w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="How can we help you?"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-neutral-500 text-center">
                        By submitting this form, you agree to our{" "}
                        <Link href="/privacy-policy" className="text-primary">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
