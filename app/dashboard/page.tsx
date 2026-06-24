import { redirect } from "next/navigation";
import { getCurrentUser, getDashboardPath } from "@/lib/auth/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  redirect(getDashboardPath(user.role));
}
