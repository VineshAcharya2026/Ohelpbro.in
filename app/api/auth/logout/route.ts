import { NextResponse } from "next/server";
import {
  clearSessionCookie,
  getSessionToken,
  verifySessionToken,
  destroySession,
} from "@/lib/auth/session";

export async function POST() {
  const token = await getSessionToken();
  if (token) {
    const parsed = await verifySessionToken(token);
    if (parsed) {
      await destroySession(parsed.sessionId);
    }
  }

  await clearSessionCookie();
  const response = NextResponse.json({ success: true });
  response.cookies.delete("ohelpbro_role");
  return response;
}
