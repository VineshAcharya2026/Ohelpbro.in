import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

export const registerCustomerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  companyName: z.string().optional(),
  servicesNeeded: z
    .array(z.string())
    .min(1, "Please select at least one service"),
  employeeType: z.string().min(1, "Please select employee type"),
  message: z.string().optional(),
});

export const registerProfessionalSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  companyName: z.string().optional(),
  servicesProvided: z
    .array(z.string())
    .min(1, "Please select at least one service"),
  experience: z.string().min(1, "Please select years of experience"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type RegisterCustomerData = z.infer<typeof registerCustomerSchema>;
export type RegisterProfessionalData = z.infer<typeof registerProfessionalSchema>;

export const registerCustomerWithPasswordSchema = registerCustomerSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerProfessionalWithPasswordSchema =
  registerProfessionalSchema.extend({
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

export type RegisterCustomerWithPasswordData = z.infer<
  typeof registerCustomerWithPasswordSchema
>;
export type RegisterProfessionalWithPasswordData = z.infer<
  typeof registerProfessionalWithPasswordSchema
>;
