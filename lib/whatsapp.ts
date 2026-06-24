import { WHATSAPP_NUMBER } from "./constants";

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(
    message || "Hi, I'm interested in your services"
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function submitViaWhatsApp(message: string) {
  window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}
