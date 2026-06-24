import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import type { User } from "@/lib/db/schema";

export async function requireUser(): Promise<User | NextResponse> {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.status !== "active") {
    return NextResponse.json({ error: "Account not active" }, { status: 403 });
  }
  return user;
}

export async function requireAdmin(): Promise<User | NextResponse> {
  const result = await requireUser();
  if (result instanceof NextResponse) return result;
  if (result.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return result;
}

export function isNextResponse(value: unknown): value is NextResponse {
  return value instanceof NextResponse;
}
