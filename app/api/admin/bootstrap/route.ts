import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";

export async function POST() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_EMAIL and ADMIN_PASSWORD must be set" },
      { status: 500 }
    );
  }

  const db = await getDb();
  const [existingAdmin] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, "admin"))
    .limit(1);

  if (existingAdmin) {
    return NextResponse.json({ message: "Admin already exists", seeded: false });
  }

  const now = new Date();
  const passwordHash = await hashPassword(adminPassword);

  await db.insert(users).values({
    id: crypto.randomUUID(),
    email: adminEmail.toLowerCase(),
    passwordHash,
    role: "admin",
    status: "active",
    fullName: "Admin",
    phone: "0000000000",
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ message: "Admin user created", seeded: true });
}
