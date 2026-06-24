import type { Metadata } from "next";
import { RegisterProfessionalForm } from "@/components/forms/RegisterProfessionalForm";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata: Metadata = {
  title: "Register as Professional",
  description:
    "Join Ohelpbro as a professional and offer your cleaning or staffing services to customers across the region.",
};

export default function RegisterProfessionalPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Register as Professional
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our network of trusted professionals and grow your business
              with Ohelpbro.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 border border-border/50">
            <RegisterProfessionalForm />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
