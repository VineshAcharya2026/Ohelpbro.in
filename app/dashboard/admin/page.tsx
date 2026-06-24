"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    newLeads: 0,
    pendingUsers: 0,
    activeUsers: 0,
    totalLeads: 0,
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d.stats));
  }, []);

  return (
    <DashboardShell allowedRoles={["admin"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin Overview</h1>
          <p className="text-muted-foreground mt-1">
            Manage leads, users, and platform activity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="New Leads" value={stats.newLeads} />
          <StatCard title="Pending Approvals" value={stats.pendingUsers} />
          <StatCard title="Active Users" value={stats.activeUsers} />
          <StatCard title="Total Leads" value={stats.totalLeads} />
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button asChild variant="default">
            <Link href="/dashboard/admin/leads">View All Leads</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/admin/users">Manage Users</Link>
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
