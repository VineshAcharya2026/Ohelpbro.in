import type { Metadata } from "next";
import { FadeIn } from "@/components/shared/FadeIn";
import { SITE_NAME, COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME} — how we collect, use, and protect your data.`,
};

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold text-primary mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              Last updated: December 31, 2026
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Information We Collect
              </h2>
              <p>
                When you use {SITE_NAME}, operated by {COMPANY_NAME}, we may
                collect personal information including your name, email address,
                phone number, company name, and service preferences when you
                submit forms on our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Process your service inquiries and registrations</li>
                <li>Connect you with appropriate service professionals</li>
                <li>Communicate with you about our services</li>
                <li>Improve our website and service offerings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Information Sharing
              </h2>
              <p>
                We do not sell your personal information. We may share your
                details with verified service professionals solely for the
                purpose of fulfilling your service requests. We may also disclose
                information when required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to
                protect your personal information against unauthorized access,
                alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Cookies
              </h2>
              <p>
                Our website may use cookies and similar technologies to enhance
                your browsing experience. You can control cookie preferences
                through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                information. To exercise these rights, please contact us through
                our{" "}
                <a href="/contact" className="text-accent hover:underline">
                  Contact page
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will
                be posted on this page with an updated revision date.
              </p>
            </section>

            <p className="text-sm italic">
              [Placeholder content — client to replace with final legal copy]
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
