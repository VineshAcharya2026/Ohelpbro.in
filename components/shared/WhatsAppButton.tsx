"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
  variant?: "default" | "icon" | "outline";
  className?: string;
  label?: string;
}

export function WhatsAppButton({
  message,
  variant = "default",
  className,
  label = "Chat on WhatsApp",
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(message);

  if (variant === "icon") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors shadow-md",
          className
        )}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    );
  }

  return (
    <Button
      asChild
      variant={variant === "outline" ? "outline" : "default"}
      className={cn(
        variant === "default" && "bg-[#25D366] hover:bg-[#20BD5A] text-white",
        className
      )}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-2 h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}
