"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { UsersTable } from "@/components/dashboard/UsersTable";

export default function AdminUsersPage() {
  return (
    <DashboardShell allowedRoles={["admin"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-primary">User Management</h1>
        <UsersTable />
      </div>
    </DashboardShell>
  );
}
