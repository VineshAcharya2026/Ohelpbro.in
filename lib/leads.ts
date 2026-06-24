import { WHATSAPP_NUMBER } from "@/lib/constants";

export function buildAdminWhatsAppUrl(summary: string): string {
  const text = encodeURIComponent(
    `[Ohelpbro Lead]\n\n${summary}\n\nPlease follow up from the admin dashboard.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function formatLeadSummary(
  type: string,
  data: Record<string, unknown>
): string {
  const lines = [`Type: ${type}`];
  for (const [key, value] of Object.entries(data)) {
    if (key === "password" || key === "confirmPassword") continue;
    if (Array.isArray(value)) {
      lines.push(`${key}: ${value.join(", ")}`);
    } else if (value) {
      lines.push(`${key}: ${value}`);
    }
  }
  return lines.join("\n");
}
