"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function CustomerProfilePage() {
  const [user, setUser] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user));
  }, []);

  if (!user) return null;

  return (
    <DashboardShell allowedRoles={["customer"]}>
      <div className="space-y-6 max-w-lg">
        <h1 className="text-3xl font-bold text-primary">My Profile</h1>
        <div className="bg-white rounded-xl shadow-md border p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{String(user.fullName)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{String(user.email)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{String(user.phone)}</p>
          </div>
          {user.companyName ? (
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="font-medium">{String(user.companyName)}</p>
            </div>
          ) : null}
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium capitalize">{String(user.status)}</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
