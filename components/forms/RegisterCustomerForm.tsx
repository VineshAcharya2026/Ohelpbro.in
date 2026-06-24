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
import { ALL_SERVICES, EMPLOYEE_TYPES } from "@/lib/constants";
import { submitViaWhatsApp } from "@/lib/whatsapp";
import {
  registerCustomerSchema,
  type RegisterCustomerData,
} from "@/lib/validations";

export function RegisterCustomerForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterCustomerData>({
    resolver: zodResolver(registerCustomerSchema),
    defaultValues: { servicesNeeded: [] },
  });

  const toggleService = (label: string) => {
    const updated = selectedServices.includes(label)
      ? selectedServices.filter((s) => s !== label)
      : [...selectedServices, label];
    setSelectedServices(updated);
    setValue("servicesNeeded", updated, { shouldValidate: true });
  };

  const onSubmit = (data: RegisterCustomerData) => {
    const lines = [
      "Hi, I'd like to register as a customer on Ohelpbro.",
      "",
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
    ];
    if (data.companyName) lines.push(`Company: ${data.companyName}`);
    lines.push(
      `Services Needed: ${data.servicesNeeded.join(", ")}`,
      `Employee Type: ${data.employeeType}`
    );
    if (data.message) lines.push(`Additional Requirements: ${data.message}`);

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
        <Label htmlFor="companyName">Company Name</Label>
        <Input id="companyName" {...register("companyName")} className="mt-1.5" />
      </div>

      <div>
        <Label>Services Needed *</Label>
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
        {errors.servicesNeeded && (
          <p className="text-sm text-red-500 mt-1">
            {errors.servicesNeeded.message}
          </p>
        )}
      </div>

      <div>
        <Label>Employee Type Needed *</Label>
        <Select onValueChange={(val) => setValue("employeeType", val, { shouldValidate: true })}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select employee type" />
          </SelectTrigger>
          <SelectContent>
            {EMPLOYEE_TYPES.map((type) => (
              <SelectItem key={type.id} value={type.label}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.employeeType && (
          <p className="text-sm text-red-500 mt-1">
            {errors.employeeType.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message / Additional Requirements</Label>
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
