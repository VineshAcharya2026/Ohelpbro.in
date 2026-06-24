import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Trusted Cleaning & Staffing Services`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Ohelpbro connects you with trained professionals for cleaning, maintenance, and manpower staffing services. Book trusted services at your doorstep.",
  keywords: [
    "cleaning services",
    "manpower staffing",
    "housekeeping",
    "deep cleaning",
    "Ohelpbro",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
