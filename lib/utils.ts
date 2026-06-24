import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWhatsAppUrl(message?: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";
  const text = encodeURIComponent(
    message || "Hi, I'm interested in your services"
  );
  return `https://wa.me/${number}?text=${text}`;
}
