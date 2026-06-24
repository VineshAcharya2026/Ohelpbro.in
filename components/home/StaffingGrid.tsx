import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { HOME_STAFFING_SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function StaffingGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="Manpower Staffing Services" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {HOME_STAFFING_SERVICES.map((service, index) => (
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
            <Link href="/staffing">View All Staffing Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
