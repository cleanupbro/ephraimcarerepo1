"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { services } from "@/data/services";
import { contactInfo } from "@/data/navigation";
import {
  CheckCircle,
  Phone,
  FileText,
  UserCheck,
  Shield,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const WEBHOOK_URL = "https://nioctibinu.online/webhook/ephraim/referral";

const steps = [
  {
    icon: FileText,
    title: "Complete the Form",
    description: "Fill out the referral form with participant details",
  },
  {
    icon: UserCheck,
    title: "We'll Make Contact",
    description: "Our team will reach out within 24-48 hours",
  },
  {
    icon: Shield,
    title: "Consultation",
    description: "We'll discuss needs and create a support plan",
  },
];

export default function ReferralsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      participant: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        dob: formData.get("dob"),
        ndisNumber: formData.get("ndisNumber"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        suburb: formData.get("suburb"),
      },
      services: {
        fundingType: formData.get("fundingType"),
        selectedServices: formData.getAll("services"),
        goals: formData.get("goals"),
      },
      referrer: {
        role: formData.get("referrerRole"),
        name: formData.get("referrerName"),
        organisation: formData.get("referrerOrg"),
        phone: formData.get("referrerPhone"),
        email: formData.get("referrerEmail"),
      },
      consent: formData.get("consent") === "on",
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
        participantFirstName: data.participant.firstName,
        participantLastName: data.participant.lastName,
        participantPhone: data.participant.phone,
        participantEmail: data.participant.email,
        ndisNumber: data.participant.ndisNumber,
        suburb: data.participant.suburb,
        selectedServices: data.services.selectedServices,
        goals: data.services.goals,
        referrerName: data.referrer.name,
        referrerRole: data.referrer.role,
        referrerOrganisation: data.referrer.organisation,
        referrerPhone: data.referrer.phone,
        referrerEmail: data.referrer.email,
        submittedAt: data.submittedAt,
      };

      const apiPromise = fetch("/api/referrals", {
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

  // Success state
  if (isSubmitted) {
    return (
      <>
        {/* Success Hero */}
        <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-primary-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl mx-auto px-6"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <PartyPopper className="w-6 h-6 text-secondary" />
                <span className="text-lg font-semibold text-secondary">
                  Referral Submitted!
                </span>
                <PartyPopper className="w-6 h-6 text-secondary transform scale-x-[-1]" />
              </div>

              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                Thank You for Your Referral
              </h1>

              <p className="text-xl text-neutral-600 mb-8">
                We&apos;ve received your referral and our team will contact you within{" "}
                <span className="font-semibold text-primary">24-48 hours</span>.
              </p>

              {/* What happens next */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-lg mb-8 text-left">
                <h3 className="font-bold text-neutral-900 mb-4">What Happens Next?</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <span className="text-neutral-600">
                      Our team will review your referral and prepare for your consultation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <span className="text-neutral-600">
                      We&apos;ll call or email to schedule a convenient time to discuss your needs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <span className="text-neutral-600">
                      Together, we&apos;ll create a personalized support plan
                    </span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={contactInfo.phoneHref}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Confetti animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            >
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    y: -20,
                    x: `${Math.random() * 100}vw`,
                    opacity: 1,
                    rotate: 0,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{
                    y: "100vh",
                    opacity: 0,
                    rotate: Math.random() * 360
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    ease: "linear",
                    delay: Math.random() * 0.5
                  }}
                  className="absolute w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: ["#2E7D6B", "#E8A54B", "#4CAF50", "#2196F3", "#9C27B0"][Math.floor(Math.random() * 5)]
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="section-sm bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-6">
              <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-primary-800">
                Simple Referral Process
              </span>
            </span>

            <h1 className="text-balance">Make a Referral</h1>

            <p className="mt-4 text-xl text-neutral-600">
              Whether you&apos;re a support coordinator, family member, or referring
              yourself, we make it easy to get started with Ephraim Care.
            </p>

            {/* Quick contact */}
            <div className="mt-6 flex items-center gap-4 text-neutral-600">
              <span>Prefer to call?</span>
              <a
                href={contactInfo.phoneHref}
                className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-800"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 bg-white border-b border-neutral-200">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary mb-1">
                      Step {index + 1}
                    </div>
                    <h3 className="font-semibold text-neutral-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Referral Form */}
      <section className="section bg-neutral-50">
        <div className="container-narrow">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Referral Form
            </h2>
            <p className="text-neutral-600 mb-8">
              Please complete all required fields. We will contact you within
              24-48 hours.
            </p>

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

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Participant Details */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
                  Participant Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    placeholder="Participant's first name"
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    placeholder="Participant's last name"
                    required
                  />
                  <Input
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    required
                  />
                  <Input
                    label="NDIS Number"
                    name="ndisNumber"
                    placeholder="e.g., 123456789"
                    helperText="7-10 digit NDIS participant number"
                    required
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="0400 000 000"
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="participant@email.com"
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Suburb"
                      name="suburb"
                      placeholder="e.g., Liverpool"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
                  Services Required
                </h3>

                <div>
                  <label className="mb-2 block text-base font-medium text-neutral-900">
                    Funding Type <span className="text-error">*</span>
                  </label>
                  <select
                    name="fundingType"
                    className="flex h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select funding type
                    </option>
                    <option value="agency">Agency Managed</option>
                    <option value="plan">Plan Managed</option>
                    <option value="self">Self Managed</option>
                    <option value="unsure">Not Sure</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-base font-medium text-neutral-900">
                    Services Interested In
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-primary-300 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={service.id}
                          className="w-5 h-5 rounded border-neutral-300 text-primary focus:ring-primary"
                        />
                        <span className="text-neutral-700">{service.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="goals"
                    className="mb-2 block text-base font-medium text-neutral-900"
                  >
                    Support Goals (Optional)
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    rows={4}
                    className="flex w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about the participant's goals and what support they're looking for..."
                  />
                </div>
              </div>

              {/* Referrer Details */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
                  Your Details (Referrer)
                </h3>

                <div>
                  <label className="mb-2 block text-base font-medium text-neutral-900">
                    Your Role <span className="text-error">*</span>
                  </label>
                  <select
                    name="referrerRole"
                    className="flex h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="self">Self-referral (I am the participant)</option>
                    <option value="family">Family Member / Carer</option>
                    <option value="coordinator">Support Coordinator</option>
                    <option value="lac">LAC (Local Area Coordinator)</option>
                    <option value="healthcare">Healthcare Professional</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Your Name"
                    name="referrerName"
                    placeholder="Your full name"
                  />
                  <Input
                    label="Organisation (if applicable)"
                    name="referrerOrg"
                    placeholder="Your organisation"
                  />
                  <Input
                    label="Your Phone"
                    name="referrerPhone"
                    type="tel"
                    placeholder="0400 000 000"
                  />
                  <Input
                    label="Your Email"
                    name="referrerEmail"
                    type="email"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Consent */}
              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <span className="text-neutral-700">
                    I confirm that the participant has given consent to share
                    their information with Ephraim Care for the purpose of
                    receiving support services. I understand that all information
                    provided will be handled in accordance with the{" "}
                    <Link href="/privacy-policy" className="text-primary">
                      Privacy Policy
                    </Link>
                    . <span className="text-error">*</span>
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Submit Referral
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <a href={contactInfo.phoneHref}>
                    <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                    Call Instead
                  </a>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
