import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { requireUser, isNextResponse } from "@/lib/auth/guards";

const updateSchema = z.object({
  status: z.enum(["contacted", "closed"]),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireUser();
  if (isNextResponse(user)) return user;

  if (user.role !== "professional") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = updateSchema.parse(await request.json());
  const db = await getDb();

  const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  if (!lead || lead.assignedTo !== user.id) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  await db
    .update(leads)
    .set({ status: body.status, updatedAt: new Date() })
    .where(eq(leads.id, id));

  return NextResponse.json({ success: true });
}
