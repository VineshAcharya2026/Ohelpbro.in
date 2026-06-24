import type { Metadata } from "next";
import { FadeIn } from "@/components/shared/FadeIn";
import { SITE_NAME, COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using ${SITE_NAME} services.`,
};

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold text-primary mb-8">
            Terms & Conditions
          </h1>
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              Last updated: December 31, 2026
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the {SITE_NAME} website and services
                operated by {COMPANY_NAME}, you agree to be bound by these Terms
                and Conditions. If you do not agree with any part of these terms,
                please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Services
              </h2>
              <p>
                {SITE_NAME} provides a platform connecting customers with
                professional cleaning and manpower staffing service providers. We
                facilitate bookings and registrations but act as an intermediary
                between service providers and customers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. User Responsibilities
              </h2>
              <p>
                Users agree to provide accurate information when registering or
                submitting inquiries. You are responsible for maintaining the
                confidentiality of any account credentials and for all activities
                under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Service Bookings
              </h2>
              <p>
                Service availability, pricing, and scheduling are subject to
                confirmation. {COMPANY_NAME} reserves the right to modify or
                cancel services with reasonable notice. Cancellation policies will
                be communicated at the time of booking.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Limitation of Liability
              </h2>
              <p>
                {COMPANY_NAME} shall not be liable for any indirect, incidental,
                or consequential damages arising from the use of our platform or
                services. Our liability is limited to the extent permitted by
                applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with
                the laws of India. Any disputes shall be subject to the exclusive
                jurisdiction of the courts in Bangalore, Karnataka.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Contact
              </h2>
              <p>
                For questions regarding these Terms & Conditions, please contact
                us through our{" "}
                <a href="/contact" className="text-accent hover:underline">
                  Contact page
                </a>
                .
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
