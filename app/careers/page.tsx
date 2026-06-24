import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CONTACT_INFO } from "@/lib/constants";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the growing Ohelpbro team. Explore career opportunities in cleaning and manpower staffing.",
};

export default function CareersPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Join Our Growing Team
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At Ohelpbro, we&apos;re building a team of passionate individuals
              who believe in delivering exceptional service. If you&apos;re
              looking for a rewarding career in the service industry, we&apos;d
              love to hear from you.
            </p>

            <div className="bg-muted/50 rounded-xl p-8 mb-8">
              <p className="text-foreground mb-2">
                No openings listed currently — send your resume to
              </p>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-accent font-semibold text-lg hover:underline"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <WhatsAppButton message="Hi, I'm interested in career opportunities at Ohelpbro." />
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
