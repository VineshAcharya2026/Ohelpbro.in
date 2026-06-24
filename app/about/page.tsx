import type { Metadata } from "next";
import Image from "next/image";
import { Building2, HeartHandshake } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${COMPANY_NAME} and Ohelpbro — your trusted platform for cleaning and manpower staffing services.`,
};

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              About Ohelpbro
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {COMPANY_NAME} is a technology-driven platform that connects you
              with trusted professionals for your cleaning services, maintenance
              and manpower staffing services. We&apos;re simplifying the
              services by ensuring reliable, high-quality and transparent
              services, every single time.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-border/50">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-accent/10 text-accent mb-6">
                <Building2 className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Client Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Delivering trusted, high-quality deep cleaning, maintenance and
                manpower staffing services for housekeeping. Empowering consumers
                with convenience, reliability, and care.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-border/50">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-accent/10 text-accent mb-6">
                <HeartHandshake className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                We Support
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bringing convenience in all our services and ensuring care,
                trust, and efficiency in every work that we render.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-16 relative h-64 md:h-80 rounded-xl overflow-hidden max-w-5xl mx-auto">
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80"
              alt="Professional team at work"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
