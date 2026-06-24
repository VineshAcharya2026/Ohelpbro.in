import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { users, leads } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import {
  contactFormSchema,
  registerCustomerSchema,
  registerProfessionalSchema,
} from "@/lib/validations";
import { buildAdminWhatsAppUrl, formatLeadSummary } from "@/lib/leads";

const leadsBodySchema = z.discriminatedUnion("formType", [
  contactFormSchema.extend({ formType: z.literal("contact") }),
  registerCustomerSchema
    .extend({
      formType: z.literal("register-customer"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    })
    .omit({ servicesNeeded: true })
    .extend({
      servicesNeeded: z.array(z.string()).min(1),
    }),
  registerProfessionalSchema
    .extend({
      formType: z.literal("register-professional"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    })
    .omit({ servicesProvided: true })
    .extend({
      servicesProvided: z.array(z.string()).min(1),
    }),
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = leadsBodySchema.parse(body);
    const db = await getDb();
    const now = new Date();
    const leadId = crypto.randomUUID();

    let userId: string | null = null;

    if (data.formType === "register-customer") {
      const email = data.email.toLowerCase();
      const [existing] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existing) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      userId = crypto.randomUUID();
      const passwordHash = await hashPassword(data.password);

      await db.insert(users).values({
        id: userId,
        email,
        passwordHash,
        role: "customer",
        status: "pending",
        fullName: data.fullName,
        phone: data.phone,
        companyName: data.companyName ?? null,
        services: JSON.stringify(data.servicesNeeded),
        employeeType: data.employeeType,
        about: data.message ?? null,
        createdAt: now,
        updatedAt: now,
      });

      const { password, formType, ...payload } = data;
      await db.insert(leads).values({
        id: leadId,
        type: "customer_registration",
        status: "new",
        payload: JSON.stringify(payload),
        userId,
        createdAt: now,
        updatedAt: now,
      });
    } else if (data.formType === "register-professional") {
      const email = data.email.toLowerCase();
      const [existing] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existing) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      userId = crypto.randomUUID();
      const passwordHash = await hashPassword(data.password);

      await db.insert(users).values({
        id: userId,
        email,
        passwordHash,
        role: "professional",
        status: "pending",
        fullName: data.fullName,
        phone: data.phone,
        companyName: data.companyName ?? null,
        services: JSON.stringify(data.servicesProvided),
        experience: data.experience,
        about: data.message ?? null,
        createdAt: now,
        updatedAt: now,
      });

      const { password, formType, ...payload } = data;
      await db.insert(leads).values({
        id: leadId,
        type: "professional_registration",
        status: "new",
        payload: JSON.stringify(payload),
        userId,
        createdAt: now,
        updatedAt: now,
      });
    } else {
      const { formType, ...payload } = data;
      await db.insert(leads).values({
        id: leadId,
        type: "contact",
        status: "new",
        payload: JSON.stringify(payload),
        userId: null,
        createdAt: now,
        updatedAt: now,
      });
    }

    const summary = formatLeadSummary(data.formType, data as Record<string, unknown>);
    const whatsappUrl = buildAdminWhatsAppUrl(summary);

    return NextResponse.json({
      success: true,
      leadId,
      message:
        data.formType === "contact"
          ? "Your message has been received!"
          : "Registration submitted! Your account is pending admin approval.",
      whatsappUrl,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Leads API error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
