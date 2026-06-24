import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { DETAILED_CLEANING_SERVICES } from "@/lib/constants";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Professional cleaning services including carpet shampooing, deep cleaning, marble polishing, post-construction cleaning, and more.",
};

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Cleaning Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional deep cleaning solutions for homes, offices, and
              commercial spaces.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-12 max-w-5xl mx-auto">
          {DETAILED_CLEANING_SERVICES.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.05}>
              <div
                id={service.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border/50 scroll-mt-24"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto md:min-h-[280px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
