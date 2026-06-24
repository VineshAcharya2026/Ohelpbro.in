import type { Metadata } from "next";
import { RegisterCustomerForm } from "@/components/forms/RegisterCustomerForm";
import { FadeIn } from "@/components/shared/FadeIn";

export const metadata: Metadata = {
  title: "Register as Customer",
  description:
    "Register as a customer on Ohelpbro to access trusted cleaning and manpower staffing services.",
};

export default function RegisterCustomerPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Register as Customer
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your service needs and we&apos;ll connect you with
              the right professionals.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 border border-border/50">
            <RegisterCustomerForm />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
