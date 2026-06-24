"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL_SERVICES, EXPERIENCE_OPTIONS } from "@/lib/constants";
import { submitViaWhatsApp } from "@/lib/whatsapp";
import {
  registerProfessionalSchema,
  type RegisterProfessionalData,
} from "@/lib/validations";

export function RegisterProfessionalForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterProfessionalData>({
    resolver: zodResolver(registerProfessionalSchema),
    defaultValues: { servicesProvided: [] },
  });

  const toggleService = (label: string) => {
    const updated = selectedServices.includes(label)
      ? selectedServices.filter((s) => s !== label)
      : [...selectedServices, label];
    setSelectedServices(updated);
    setValue("servicesProvided", updated, { shouldValidate: true });
  };

  const onSubmit = (data: RegisterProfessionalData) => {
    const lines = [
      "Hi, I'd like to register as a professional on Ohelpbro.",
      "",
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
    ];
    if (data.companyName) lines.push(`Company: ${data.companyName}`);
    lines.push(
      `Services Provided: ${data.servicesProvided.join(", ")}`,
      `Experience: ${data.experience}`
    );
    if (data.message) lines.push(`About: ${data.message}`);

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
        <Label htmlFor="companyName">Company Name (if applicable)</Label>
        <Input id="companyName" {...register("companyName")} className="mt-1.5" />
      </div>

      <div>
        <Label>Services We Provide *</Label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border rounded-xl max-h-60 overflow-y-auto">
          {ALL_SERVICES.map((service) => (
            <label
              key={service.id}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <Checkbox
                checked={selectedServices.includes(service.label)}
                onCheckedChange={() => toggleService(service.label)}
              />
              {service.label}
            </label>
          ))}
        </div>
        {errors.servicesProvided && (
          <p className="text-sm text-red-500 mt-1">
            {errors.servicesProvided.message}
          </p>
        )}
      </div>

      <div>
        <Label>Years of Experience *</Label>
        <Select onValueChange={(val) => setValue("experience", val, { shouldValidate: true })}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            {EXPERIENCE_OPTIONS.map((opt) => (
              <SelectItem key={opt.id} value={opt.label}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.experience && (
          <p className="text-sm text-red-500 mt-1">
            {errors.experience.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message / About Yourself</Label>
        <Textarea id="message" {...register("message")} className="mt-1.5" />
      </div>

      <p className="text-sm text-muted-foreground">
        Submitting opens WhatsApp with your registration details to +91 95380 33894.
      </p>

      <Button type="submit" variant="primary" className="w-full bg-[#25D366] hover:bg-[#20BD5A]">
        <MessageCircle className="mr-2 h-4 w-4" />
        Register via WhatsApp
      </Button>
    </form>
  );
}
