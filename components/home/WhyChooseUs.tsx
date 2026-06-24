import { ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/shared/FadeIn";
import { WHY_CHOOSE_US } from "@/lib/constants";

const iconMap = {
  verified: BadgeCheck,
  trusted: ShieldCheck,
  ontime: Clock,
};

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader title="Why Choose Us" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
