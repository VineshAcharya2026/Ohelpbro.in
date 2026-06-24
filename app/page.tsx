import type { Metadata } from "next";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StaffingGrid } from "@/components/home/StaffingGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Trusted Cleaning & Staffing Services at Your Doorstep",
  description:
    "Connecting you with trained professionals for cleaning, maintenance, and manpower needs. Book Ohelpbro services today.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <ServicesGrid />
      <StaffingGrid />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
