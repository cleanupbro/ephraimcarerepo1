import type { Metadata } from "next";
import Link from "next/link";
import { contactInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using Ephraim Care's NDIS support services.",
};

export default function TermsOfServicePage() {
  return (
    <article className="section bg-white">
      <div className="container-narrow prose prose-neutral max-w-none">
        <h1>Terms of Service</h1>
        <p className="lead text-neutral-600">
          Last updated: January 2025
        </p>

        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of Ephraim Care&apos;s
          services. By engaging our services, you agree to these Terms.
        </p>

        <h2>1. About Our Services</h2>
        <p>
          Ephraim Care is a registered NDIS provider offering disability and
          mental health support services in Western Sydney. Our services are
          provided in accordance with:
        </p>
        <ul>
          <li>The National Disability Insurance Scheme Act 2013</li>
          <li>NDIS Practice Standards and Quality Indicators</li>
          <li>NDIS Code of Conduct</li>
          <li>Relevant state and federal legislation</li>
        </ul>

        <h2>2. Service Agreements</h2>
        <p>
          Before commencing services, we will provide you with a Service
          Agreement that outlines:
        </p>
        <ul>
          <li>The supports to be delivered</li>
          <li>Pricing and payment arrangements</li>
          <li>Cancellation policy</li>
          <li>Responsibilities of both parties</li>
          <li>How to provide feedback or make complaints</li>
        </ul>

        <h2>3. Your Responsibilities</h2>
        <p>As a participant, you agree to:</p>
        <ul>
          <li>Provide accurate information about your support needs</li>
          <li>Treat our staff with respect and dignity</li>
          <li>Give reasonable notice for cancellations (24-48 hours)</li>
          <li>Inform us of any changes to your NDIS plan or circumstances</li>
          <li>Maintain a safe environment for service delivery</li>
        </ul>

        <h2>4. Our Responsibilities</h2>
        <p>We commit to:</p>
        <ul>
          <li>Provide safe, high-quality support services</li>
          <li>Respect your rights, dignity, and privacy</li>
          <li>Employ qualified and screened support workers</li>
          <li>Respond promptly to your concerns</li>
          <li>Maintain compliance with NDIS requirements</li>
          <li>Keep you informed about your services</li>
        </ul>

        <h2>5. Cancellation Policy</h2>
        <p>
          We require reasonable notice for cancellations to allow us to reassign
          our support workers:
        </p>
        <ul>
          <li>
            <strong>Standard supports:</strong> 24 hours notice
          </li>
          <li>
            <strong>Group activities:</strong> 48 hours notice
          </li>
        </ul>
        <p>
          Short notice cancellations may be charged at up to 100% of the service
          fee, in accordance with NDIS pricing arrangements.
        </p>

        <h2>6. Pricing</h2>
        <p>
          Our services are priced in accordance with the NDIS Price Guide and
          Support Catalogue. Specific pricing will be outlined in your Service
          Agreement.
        </p>

        <h2>7. Privacy</h2>
        <p>
          Your personal information is handled in accordance with our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> and the Privacy Act
          1988.
        </p>

        <h2>8. Complaints</h2>
        <p>
          We welcome feedback and are committed to resolving any concerns. Please
          see our <Link href="/complaints">Complaints Process</Link> for details
          on how to lodge a complaint.
        </p>

        <h2>9. Termination</h2>
        <p>
          Either party may terminate services by providing reasonable written
          notice (usually 2 weeks). We may terminate services immediately in
          cases of:
        </p>
        <ul>
          <li>Safety concerns for staff or participants</li>
          <li>Serious breach of these Terms</li>
          <li>Fraudulent claims or conduct</li>
        </ul>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Ephraim Care&apos;s liability is
          limited to re-supplying the services or refunding the price paid for
          services.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. We will notify you of
          significant changes and obtain your agreement to continue services.
        </p>

        <h2>12. Governing Law</h2>
        <p>
          These Terms are governed by the laws of New South Wales, Australia.
        </p>

        <h2>Contact Us</h2>
        <p>For questions about these Terms:</p>
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

        <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
          <p className="text-sm text-neutral-600 mb-0">
            <Link href="/contact">Contact us</Link> if you have any questions
            about these Terms of Service.
          </p>
        </div>
      </div>
    </article>
  );
}
