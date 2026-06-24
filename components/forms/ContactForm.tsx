"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL_SERVICES } from "@/lib/constants";
import { submitViaWhatsApp } from "@/lib/whatsapp";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    const lines = [
      "Hi, I'm contacting Ohelpbro.",
      "",
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Service: ${data.service}`,
    ];
    if (data.message) lines.push(`Message: ${data.message}`);

    submitViaWhatsApp(lines.join("\n"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="fullName">Full Name *</Label>
        <Input id="fullName" {...register("fullName")} className="mt-1.5" />
        {errors.fullName && (
          <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" {...register("email")} className="mt-1.5" />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input id="phone" type="tel" {...register("phone")} className="mt-1.5" />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label>Service Interested In *</Label>
        <Select onValueChange={(val) => setValue("service", val, { shouldValidate: true })}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {ALL_SERVICES.map((service) => (
              <SelectItem key={service.id} value={service.label}>
                {service.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && (
          <p className="text-sm text-red-500 mt-1">{errors.service.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...register("message")} className="mt-1.5" />
      </div>

      <p className="text-sm text-muted-foreground">
        Submitting opens WhatsApp with your details pre-filled to +91 95380 33894.
      </p>

      <Button type="submit" variant="primary" className="w-full bg-[#25D366] hover:bg-[#20BD5A]">
        <MessageCircle className="mr-2 h-4 w-4" />
        Send via WhatsApp
      </Button>
    </form>
  );
}
