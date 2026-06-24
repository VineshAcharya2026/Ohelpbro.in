import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";

export function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to simplify your cleaning and staffing needs?
          </h2>
          <Button asChild size="lg" variant="default">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
