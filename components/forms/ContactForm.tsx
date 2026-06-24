"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "contact" }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send message");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
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
        <Select onValueChange={(val) => setValue("service", val)}>
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

      {status === "success" && (
        <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          Thank you! Your message has been sent successfully.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
          {errorMessage}
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}
