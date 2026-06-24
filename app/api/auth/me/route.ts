import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      fullName: user.fullName,
      phone: user.phone,
      companyName: user.companyName,
      services: user.services ? JSON.parse(user.services) : [],
      employeeType: user.employeeType,
      experience: user.experience,
      about: user.about,
    },
  });
}
