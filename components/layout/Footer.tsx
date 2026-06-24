import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import {
  SITE_NAME,
  COMPANY_NAME,
  GST_NUMBER,
  FOOTER_LINKS,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary font-bold text-xl">
            O
          </div>
          <span className="text-2xl font-bold">{SITE_NAME}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">For Customers</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.customers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">For Professionals</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.professionals.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Social Media</h3>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <WhatsAppButton variant="icon" className="h-10 w-10" />
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center text-sm text-primary-foreground/70">
          <p className="mb-1">* As on December 31, 2026</p>
          <p>
            © Copyright 2026 Ohelpbro services website (registered under{" "}
            {COMPANY_NAME}) All rights reserved. | GST no: {GST_NUMBER}
          </p>
        </div>
      </div>
    </footer>
  );
}
