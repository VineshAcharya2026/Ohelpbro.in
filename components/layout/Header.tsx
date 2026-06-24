"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinkClass =
  "px-2.5 py-1.5 text-xs xl:text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted whitespace-nowrap";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between gap-3 flex-nowrap">
          <Link href="/" className="shrink-0">
            <Image
              src="/ohelpbro-logo.png"
              alt="Ohelpbro"
              width={150}
              height={44}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center min-w-0">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className={cn(navLinkClass, "flex items-center gap-0.5")}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="bg-white rounded-xl shadow-lg border border-border py-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden xl:flex items-center gap-1.5 shrink-0">
            <Button asChild variant="default" size="sm" className="h-8 text-xs px-3">
              <Link href="/contact">Book Now</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="h-8 text-xs px-3">
              <Link href="/register-customer">Customer</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="h-8 text-xs px-3">
              <Link href="/register-professional">Professional</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="h-8 text-xs px-3">
              <Link href="/login">Login</Link>
            </Button>
          </div>

          <div className="flex xl:hidden items-center gap-2 shrink-0">
            <Button asChild variant="default" size="sm" className="h-8 text-xs px-3 hidden sm:inline-flex">
              <Link href="/contact">Book</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="h-8 text-xs px-2 hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <button
              className="p-1.5 rounded-lg hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "xl:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-[600px] pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-0.5 pt-2">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        servicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-2 pt-3 px-1">
              <Button asChild variant="default" className="w-full h-9" size="sm">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  Book Our Services
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-9" size="sm">
                <Link
                  href="/register-customer"
                  onClick={() => setMobileOpen(false)}
                >
                  Register as Customer
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-9" size="sm">
                <Link
                  href="/register-professional"
                  onClick={() => setMobileOpen(false)}
                >
                  Register as Professional
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full h-9 sm:hidden" size="sm">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
