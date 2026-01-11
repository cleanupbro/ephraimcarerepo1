import type { Metadata } from "next";
import Link from "next/link";
import { contactInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Ephraim Care's privacy policy outlines how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="section bg-white">
      <div className="container-narrow prose prose-neutral max-w-none">
        <h1>Privacy Policy</h1>
        <p className="lead text-neutral-600">
          Last updated: January 2025
        </p>

        <p>
          Ephraim Care (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting
          your privacy. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our services.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Name, date of birth, address,
            phone number, email address, NDIS number
          </li>
          <li>
            <strong>Health Information:</strong> Disability-related information,
            support needs, medical history relevant to service delivery
          </li>
          <li>
            <strong>Service Information:</strong> Records of services provided,
            progress notes, incident reports
          </li>
          <li>
            <strong>Financial Information:</strong> NDIS plan details, funding
            information, invoicing records
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Deliver NDIS support services tailored to your needs</li>
          <li>Communicate with you about your services</li>
          <li>Process claims and manage your NDIS funding</li>
          <li>Meet our legal and regulatory obligations</li>
          <li>Improve our services and operations</li>
          <li>Respond to complaints and feedback</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We may share your information with:
        </p>
        <ul>
          <li>The National Disability Insurance Agency (NDIA)</li>
          <li>Other service providers involved in your care (with consent)</li>
          <li>Government agencies as required by law</li>
          <li>Professional advisors (accountants, lawyers)</li>
        </ul>
        <p>
          We will not sell or rent your personal information to third parties.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement appropriate security measures to protect your information,
          including:
        </p>
        <ul>
          <li>Secure storage systems with encryption</li>
          <li>Access controls and authentication</li>
          <li>Staff training on privacy and confidentiality</li>
          <li>Regular security reviews and updates</li>
        </ul>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information (subject to legal requirements)</li>
          <li>Withdraw consent for certain uses of your information</li>
          <li>Lodge a complaint about our handling of your information</li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain your information for as long as necessary to provide services
          and meet our legal obligations. NDIS records are retained for a minimum
          of 7 years as required by law.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          We provide services to participants of all ages. For participants under
          18, we obtain consent from a parent or guardian before collecting
          personal information.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you
          of any material changes by posting the new policy on our website.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or wish to exercise
          your rights, please contact us:
        </p>
        <ul>
          <li>
            Phone:{" "}
            <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
          </li>
          <li>
            Email:{" "}
            <a href={contactInfo.emailHref}>{contactInfo.email}</a>
          </li>
        </ul>

        <p>
          If you are not satisfied with our response, you can lodge a complaint
          with the Office of the Australian Information Commissioner (OAIC) at{" "}
          <a
            href="https://www.oaic.gov.au"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.oaic.gov.au
          </a>
          .
        </p>

        <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
          <p className="text-sm text-neutral-600 mb-0">
            <Link href="/contact">Contact us</Link> if you have any questions
            about this Privacy Policy.
          </p>
        </div>
      </div>
    </article>
  );
}
