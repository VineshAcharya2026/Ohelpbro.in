import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CONTACT_INFO } from "@/lib/constants";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ohelpbro for cleaning and manpower staffing services. Reach us via phone, email, or WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              We&apos;d love to hear from you. Fill out the form or reach us
              directly.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-xl shadow-md p-8 border border-border/50">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-primary rounded-xl shadow-md p-8 text-primary-foreground">
              <h2 className="text-2xl font-semibold mb-8">Get in Touch</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Address</p>
                    <p className="text-primary-foreground/80">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                      className="text-primary-foreground/80 hover:text-white transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-primary-foreground/80 hover:text-white transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-medium mb-4">Chat with us on WhatsApp</p>
                <WhatsAppButton variant="icon" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
