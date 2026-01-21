import type { Metadata } from "next";
import Link from "next/link";
import { contactInfo } from "@/data/navigation";
import {
  Phone,
  Mail,
  FileText,
  Clock,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Complaints Process",
  description:
    "Learn how to provide feedback or lodge a complaint with Ephraim Care. We are committed to resolving your concerns.",
};

const steps = [
  {
    number: "1",
    title: "Tell Us",
    description:
      "Contact us by phone, email, or in writing to share your concern. You can also ask someone to complain on your behalf.",
  },
  {
    number: "2",
    title: "We Listen",
    description:
      "We will acknowledge your complaint within 2 business days and assign a staff member to investigate.",
  },
  {
    number: "3",
    title: "We Investigate",
    description:
      "We will look into your concern fairly and thoroughly, keeping you informed throughout the process.",
  },
  {
    number: "4",
    title: "We Respond",
    description:
      "We aim to resolve complaints within 21 days. We will explain our findings and any actions taken.",
  },
];

export default function ComplaintsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-sm bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-balance">Complaints & Feedback</h1>
            <p className="mt-4 text-xl text-neutral-600">
              We value your feedback and are committed to resolving any concerns
              you may have. Your feedback helps us improve our services.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2>Our Commitment</h2>
              <p className="mt-4 text-lg text-neutral-600">
                At Ephraim Care, we take all complaints seriously and are
                committed to handling them fairly, efficiently, and
                confidentially.
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>You will not be treated unfairly for making a complaint</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Your complaint will be handled confidentially</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>You can have an advocate support you</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>We will keep you informed throughout the process</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>You can escalate externally if not satisfied</span>
                </li>
              </ul>
            </div>

            {/* Contact options */}
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">
                How to Make a Complaint
              </h3>

              <div className="space-y-4">
                <a
                  href={contactInfo.phoneHref}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 transition-colors no-underline"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900 block">Call Us</span>
                    <span className="text-primary">{contactInfo.phone}</span>
                  </div>
                </a>

                <a
                  href={contactInfo.emailHref}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 transition-colors no-underline"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900 block">Email Us</span>
                    <span className="text-primary">{contactInfo.email}</span>
                  </div>
                </a>

                <Link
                  href="/contact"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 transition-colors no-underline"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900 block">
                      Online Form
                    </span>
                    <span className="text-neutral-600">Submit via our contact page</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section bg-neutral-50">
        <div className="container-wide">
          <h2 className="text-center mb-12">Our Complaints Process</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 border border-neutral-200"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-neutral-600">
            <Clock className="h-5 w-5" aria-hidden="true" />
            <span>Most complaints are resolved within 21 days</span>
          </div>
        </div>
      </section>

      {/* External Options */}
      <section className="section bg-white">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2>Not Satisfied?</h2>
            <p className="mt-4 text-lg text-neutral-600">
              If you are not satisfied with how we have handled your complaint,
              you can contact these external bodies:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50">
              <h3 className="font-semibold text-neutral-900 mb-2">
                NDIS Quality and Safeguards Commission
              </h3>
              <p className="text-neutral-600 mb-4">
                The independent regulator for NDIS providers.
              </p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>
                  <strong>Phone:</strong> 1800 035 544
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://www.ndiscommission.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center"
                  >
                    ndiscommission.gov.au
                    <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50">
              <h3 className="font-semibold text-neutral-900 mb-2">
                Disability Advocacy Service
              </h3>
              <p className="text-neutral-600 mb-4">
                Free advocacy support to help with complaints.
              </p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>
                  <strong>Phone:</strong> 1800 800 110
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://www.disabilityadvocacynsw.org.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center"
                  >
                    disabilityadvocacynsw.org.au
                    <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              We encourage you to speak with us first, but you have the right to
              contact external bodies at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
