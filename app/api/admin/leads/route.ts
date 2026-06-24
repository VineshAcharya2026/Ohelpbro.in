import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { requireAdmin, isNextResponse } from "@/lib/auth/guards";

export async function GET() {
  const admin = await requireAdmin();
  if (isNextResponse(admin)) return admin;

  const db = await getDb();
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return NextResponse.json({
    leads: allLeads.map((l) => ({
      ...l,
      payload: JSON.parse(l.payload),
    })),
  });
}
