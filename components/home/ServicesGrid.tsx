import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { HOME_CLEANING_SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function ServicesGrid() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader title="Our Cleaning Services" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {HOME_CLEANING_SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              href={service.href}
              delay={index * 0.1}
            />
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="primary">
            <Link href="/services">View All Cleaning Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
