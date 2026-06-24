import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { leads, users } from "@/lib/db/schema";
import { requireAdmin, isNextResponse } from "@/lib/auth/guards";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  if (user.role === "admin") {
    let query = db.select().from(leads).orderBy(desc(leads.createdAt));
    const allLeads = await query;
    const filtered = allLeads.filter((lead) => {
      if (type && lead.type !== type) return false;
      if (status && lead.status !== status) return false;
      return true;
    });
    return NextResponse.json({
      leads: filtered.map((l) => ({
        ...l,
        payload: JSON.parse(l.payload),
      })),
    });
  }

  if (user.role === "customer") {
    const customerLeads = await db
      .select()
      .from(leads)
      .where(eq(leads.userId, user.id))
      .orderBy(desc(leads.createdAt));
    return NextResponse.json({
      leads: customerLeads.map((l) => ({
        ...l,
        payload: JSON.parse(l.payload),
      })),
    });
  }

  if (user.role === "professional") {
    const assignedLeads = await db
      .select()
      .from(leads)
      .where(eq(leads.assignedTo, user.id))
      .orderBy(desc(leads.createdAt));
    return NextResponse.json({
      leads: assignedLeads.map((l) => ({
        ...l,
        payload: JSON.parse(l.payload),
      })),
    });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
