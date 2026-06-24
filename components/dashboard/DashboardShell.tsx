"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "./DashboardSidebar";

interface User {
  id: string;
  email: string;
  role: "admin" | "customer" | "professional";
  fullName: string;
}

export function DashboardShell({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: Array<User["role"]>;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (allowedRoles && !allowedRoles.includes(data.user.role)) {
          router.push("/dashboard");
          return;
        }
        setUser(data.user);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-muted">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-primary-muted">
      <DashboardSidebar role={user.role} userName={user.fullName} />
      <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
