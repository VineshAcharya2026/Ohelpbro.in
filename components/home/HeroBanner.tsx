"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80"
        alt="Professional cleaning services"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Trusted Cleaning & Staffing Services at Your Doorstep
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Connecting you with trained professionals for cleaning, maintenance,
            and manpower needs.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="default">
              <Link href="/contact">Book Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
