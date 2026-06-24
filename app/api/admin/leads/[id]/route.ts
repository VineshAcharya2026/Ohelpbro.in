import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { requireAdmin, isNextResponse } from "@/lib/auth/guards";

const updateSchema = z.object({
  status: z.enum(["new", "contacted", "assigned", "closed"]).optional(),
  assignedTo: z.string().nullable().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (isNextResponse(admin)) return admin;

  const { id } = await params;
  const body = updateSchema.parse(await request.json());
  const db = await getDb();
  const now = new Date();

  const updates: Partial<typeof leads.$inferInsert> = { updatedAt: now };
  if (body.status) updates.status = body.status;
  if (body.assignedTo !== undefined) {
    updates.assignedTo = body.assignedTo;
    if (body.assignedTo && !body.status) updates.status = "assigned";
  }

  await db.update(leads).set(updates).where(eq(leads.id, id));

  const [updated] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  if (!updated) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({
    lead: { ...updated, payload: JSON.parse(updated.payload) },
  });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (isNextResponse(admin)) return admin;

  const { id } = await params;
  const db = await getDb();
  const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({
    lead: { ...lead, payload: JSON.parse(lead.payload) },
  });
}
