import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const baseSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().optional(),
  formType: z.enum(["contact", "register-customer", "register-professional"]),
});

const contactSchema = baseSchema.extend({
  formType: z.literal("contact"),
  service: z.string().min(1),
});

const customerSchema = baseSchema.extend({
  formType: z.literal("register-customer"),
  companyName: z.string().optional(),
  servicesNeeded: z.array(z.string()).min(1),
  employeeType: z.string().min(1),
});

const professionalSchema = baseSchema.extend({
  formType: z.literal("register-professional"),
  companyName: z.string().optional(),
  servicesProvided: z.array(z.string()).min(1),
  experience: z.string().min(1),
});

function buildEmailHtml(data: Record<string, unknown>, formType: string) {
  const rows = Object.entries(data)
    .filter(([key]) => key !== "formType")
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">${key}</td><td style="padding:8px;border:1px solid #ddd;">${Array.isArray(value) ? value.join(", ") : value}</td></tr>`
    )
    .join("");

  return `
    <h2>New ${formType} submission — Ohelpbro</h2>
    <table style="border-collapse:collapse;width:100%;">${rows}</table>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formType = body.formType;

    let data;
    let subject;

    switch (formType) {
      case "contact":
        data = contactSchema.parse(body);
        subject = `Contact Form: ${data.fullName}`;
        break;
      case "register-customer":
        data = customerSchema.parse(body);
        subject = `Customer Registration: ${data.fullName}`;
        break;
      case "register-professional":
        data = professionalSchema.parse(body);
        subject = `Professional Registration: ${data.fullName}`;
        break;
      default:
        return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } =
      process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
      console.log("SMTP not configured. Form submission:", data);
      return NextResponse.json({ success: true, message: "Received (dev mode)" });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_EMAIL,
      replyTo: data.email,
      subject,
      html: buildEmailHtml(data as Record<string, unknown>, formType),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
