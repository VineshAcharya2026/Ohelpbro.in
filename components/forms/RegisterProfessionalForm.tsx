"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ALL_SERVICES, EXPERIENCE_OPTIONS } from "@/lib/constants";
import {
  registerProfessionalSchema,
  type RegisterProfessionalData,
} from "@/lib/validations";

export function RegisterProfessionalForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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

  const onSubmit = async (data: RegisterProfessionalData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "register-professional" }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit registration");
      }

      setStatus("success");
      reset();
      setSelectedServices([]);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const whatsappMessage = `Hi, I'd like to register as a professional on Ohelpbro.`;

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
        <Select onValueChange={(val) => setValue("experience", val)}>
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

      {status === "success" && (
        <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          Registration submitted successfully! We&apos;ll review your profile soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit Registration"}
        </Button>
        <WhatsAppButton message={whatsappMessage} className="flex-1" />
      </div>
    </form>
  );
}
