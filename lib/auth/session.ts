import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { eq, and, gt } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { sessions, users, type User } from "@/lib/db/schema";

export const SESSION_COOKIE = "ohelpbro_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set and at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: string): Promise<string> {
  const db = await getDb();
  const sessionId = crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS);

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
    createdAt: now,
  });

  const token = await new SignJWT({ sid: sessionId, uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSessionSecret());

  return token;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function verifySessionToken(
  token: string
): Promise<{ sessionId: string; userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    const sessionId = payload.sid as string;
    const userId = payload.uid as string;
    if (!sessionId || !userId) return null;
    return { sessionId, userId };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const token = await getSessionToken();
  if (!token) return null;

  const parsed = await verifySessionToken(token);
  if (!parsed) return null;

  const db = await getDb();
  const now = new Date();

  const [session] = await db
    .select()
    .from(sessions)
    .where(
      and(
        eq(sessions.id, parsed.sessionId),
        eq(sessions.userId, parsed.userId),
        gt(sessions.expiresAt, now)
      )
    )
    .limit(1);

  if (!session) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, parsed.userId))
    .limit(1);

  return user ?? null;
}

export async function destroySession(sessionId: string) {
  const db = await getDb();
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export function getDashboardPath(role: User["role"]): string {
  switch (role) {
    case "admin":
      return "/dashboard/admin";
    case "customer":
      return "/dashboard/customer";
    case "professional":
      return "/dashboard/professional";
    default:
      return "/login";
  }
}
