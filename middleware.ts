import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "ohelpbro_session";

const publicPaths = ["/login", "/api/auth/login", "/api/leads"];
const protectedPrefixes = ["/dashboard", "/api/admin"];

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function getTokenPayload(token: string) {
  const secret = getSecret();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { sid?: string; uid?: string; role?: string };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow one-time admin bootstrap without auth
  if (pathname === "/api/admin/bootstrap") {
    return NextResponse.next();
  }

  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await getTokenPayload(token);
  if (!payload?.uid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based route protection (full validation in API routes)
  if (pathname.startsWith("/dashboard/admin") || pathname.startsWith("/api/admin")) {
    const role = request.cookies.get("ohelpbro_role")?.value;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/dashboard/customer")) {
    const role = request.cookies.get("ohelpbro_role")?.value;
    if (role !== "customer" && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/dashboard/professional")) {
    const role = request.cookies.get("ohelpbro_role")?.value;
    if (role !== "professional" && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
};
