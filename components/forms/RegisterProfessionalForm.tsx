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
import { ALL_SERVICES, EXPERIENCE_OPTIONS } from "@/lib/constants";
import { FormSuccess } from "@/components/forms/FormSuccess";
import {
  registerProfessionalWithPasswordSchema,
  type RegisterProfessionalWithPasswordData,
} from "@/lib/validations";

export function RegisterProfessionalForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    message: string;
    whatsappUrl?: string;
  } | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterProfessionalWithPasswordData>({
    resolver: zodResolver(registerProfessionalWithPasswordSchema),
    defaultValues: { servicesProvided: [] },
  });

  const toggleService = (label: string) => {
    const updated = selectedServices.includes(label)
      ? selectedServices.filter((s) => s !== label)
      : [...selectedServices, label];
    setSelectedServices(updated);
    setValue("servicesProvided", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: RegisterProfessionalWithPasswordData) => {
    setLoading(true);
    setError("");
    setSuccess(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "register-professional" }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to submit");

      setSuccess({
        message: result.message,
        whatsappUrl: result.whatsappUrl,
      });
      reset();
      setSelectedServices([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <FormSuccess message={success.message} whatsappUrl={success.whatsappUrl} />;
  }

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
        <Label htmlFor="password">Password *</Label>
        <Input id="password" type="password" {...register("password")} className="mt-1.5" />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
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
        Your account will be pending until admin approval. You can log in after activation.
      </p>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Register"}
      </Button>
    </form>
  );
}
