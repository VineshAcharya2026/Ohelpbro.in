import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { leads, users } from "@/lib/db/schema";
import { requireAdmin, isNextResponse } from "@/lib/auth/guards";

export async function GET() {
  const admin = await requireAdmin();
  if (isNextResponse(admin)) return admin;

  const db = await getDb();

  const [leadStats] = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads)
    .where(eq(leads.status, "new"));

  const [pendingUsers] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.status, "pending"));

  const [activeUsers] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.status, "active"));

  const [totalLeads] = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads);

  return NextResponse.json({
    stats: {
      newLeads: leadStats?.count ?? 0,
      pendingUsers: pendingUsers?.count ?? 0,
      activeUsers: activeUsers?.count ?? 0,
      totalLeads: totalLeads?.count ?? 0,
    },
  });
}
