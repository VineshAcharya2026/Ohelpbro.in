import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { requireAdmin, isNextResponse } from "@/lib/auth/guards";
import { hashPassword } from "@/lib/auth/password";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "customer", "professional"]),
  status: z.enum(["pending", "active", "suspended"]).default("active"),
  fullName: z.string().min(2),
  phone: z.string().min(10),
  companyName: z.string().optional(),
  services: z.array(z.string()).optional(),
  employeeType: z.string().optional(),
  experience: z.string().optional(),
  about: z.string().optional(),
});

const updateUserSchema = z.object({
  status: z.enum(["pending", "active", "suspended"]).optional(),
  role: z.enum(["admin", "customer", "professional"]).optional(),
  fullName: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  companyName: z.string().nullable().optional(),
  password: z.string().min(6).optional(),
});

export async function GET() {
  const admin = await requireAdmin();
  if (isNextResponse(admin)) return admin;

  const db = await getDb();
  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      status: users.status,
      fullName: users.fullName,
      phone: users.phone,
      companyName: users.companyName,
      services: users.services,
      employeeType: users.employeeType,
      experience: users.experience,
      about: users.about,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt));

  return NextResponse.json({
    users: allUsers.map((u) => ({
      ...u,
      services: u.services ? JSON.parse(u.services) : [],
    })),
  });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (isNextResponse(admin)) return admin;

  try {
    const body = createUserSchema.parse(await request.json());
    const db = await getDb();
    const email = body.email.toLowerCase();
    const now = new Date();

    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(body.password);
    const id = crypto.randomUUID();

    await db.insert(users).values({
      id,
      email,
      passwordHash,
      role: body.role,
      status: body.status,
      fullName: body.fullName,
      phone: body.phone,
      companyName: body.companyName ?? null,
      services: body.services ? JSON.stringify(body.services) : null,
      employeeType: body.employeeType ?? null,
      experience: body.experience ?? null,
      about: body.about ?? null,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin();
  if (isNextResponse(admin)) return admin;

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "User id required" }, { status: 400 });
    }

    const parsed = updateUserSchema.parse(updates);
    const db = await getDb();
    const now = new Date();

    const setValues: Record<string, unknown> = { updatedAt: now };
    if (parsed.status) setValues.status = parsed.status;
    if (parsed.role) setValues.role = parsed.role;
    if (parsed.fullName) setValues.fullName = parsed.fullName;
    if (parsed.phone) setValues.phone = parsed.phone;
    if (parsed.companyName !== undefined) setValues.companyName = parsed.companyName;
    if (parsed.password) {
      setValues.passwordHash = await hashPassword(parsed.password);
    }

    await db.update(users).set(setValues).where(eq(users.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
