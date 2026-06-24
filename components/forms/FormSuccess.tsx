"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormSuccessProps {
  message: string;
  whatsappUrl?: string;
}

export function FormSuccess({ message, whatsappUrl }: FormSuccessProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-green-600 bg-green-50 p-4 rounded-lg">{message}</p>
      {whatsappUrl && (
        <Button asChild className="w-full bg-[#25D366] hover:bg-[#20BD5A]">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Notify Admin via WhatsApp
          </a>
        </Button>
      )}
    </div>
  );
}
