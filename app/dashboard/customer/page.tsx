"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  type: string;
  status: string;
  payload: Record<string, unknown>;
  userId: string | null;
  assignedTo: string | null;
  createdAt: string;
}

export default function CustomerDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const load = () => {
    fetch("/api/leads/list")
      .then((r) => r.json())
      .then((d) => setLeads(d.leads || []));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <DashboardShell allowedRoles={["customer"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">My Requests</h1>
            <p className="text-muted-foreground mt-1">
              Track your service requests and registrations
            </p>
          </div>
          <Button asChild variant="default">
            <Link href="/contact">New Request</Link>
          </Button>
        </div>
        <LeadsTable leads={leads} />
      </div>
    </DashboardShell>
  );
}
