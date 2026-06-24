import type { Metadata } from "next";
import Image from "next/image";
import { DETAILED_STAFFING_SERVICES } from "@/lib/constants";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata: Metadata = {
  title: "Manpower Staffing Services",
  description:
    "Trained personnel for housekeeping, security, office helpers, kitchen staff, and complete manpower outsourcing solutions.",
};

export default function StaffingPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Manpower Staffing Services
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              We offer trained personnel for residential/commercial housekeeping
              services where we focus on total manpower supply services that add
              enhanced cleaning in residences/commercial. Our professional staff
              employs a variety of services which include cleaning services, deep
              cleaning services and carefully managed home services including daily
              cleaning. We always operate under standards to ensure your
              home/commercial space is maintained to the highest standards without
              the stress of doing it yourself. Choose us to avail the best and
              most professional residential/commercial housekeeping services that
              can change the way of staffing.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {DETAILED_STAFFING_SERVICES.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.1}>
              <div
                id={service.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border/50 h-full flex flex-col scroll-mt-24"
              >
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h2 className="text-xl font-semibold text-primary mb-3">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
