"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
              O
            </div>
            <span className="text-xl font-bold text-primary">{SITE_NAME}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted">
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
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
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button asChild variant="primary" size="sm">
              <Link href="/contact">Book Our Services</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/register-customer">Register as Customer</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/register-professional">Register as Professional</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Login</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-[600px] pb-6" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted"
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
                    <div className="pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary"
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
                  className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-2 pt-4 px-2">
              <Button asChild variant="primary" className="w-full">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  Book Our Services
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href="/register-customer"
                  onClick={() => setMobileOpen(false)}
                >
                  Register as Customer
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href="/register-professional"
                  onClick={() => setMobileOpen(false)}
                >
                  Register as Professional
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
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
