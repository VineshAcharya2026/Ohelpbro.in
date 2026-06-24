"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { LeadsTable } from "@/components/dashboard/LeadsTable";

interface Lead {
  id: string;
  type: string;
  status: string;
  payload: Record<string, unknown>;
  userId: string | null;
  assignedTo: string | null;
  createdAt: string;
}

export default function ProfessionalDashboardPage() {
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
    <DashboardShell allowedRoles={["professional"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Assigned Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Leads assigned to you by the admin team
          </p>
        </div>
        <LeadsTable
          leads={leads}
          onUpdate={load}
          showStatusUpdate
          professionalMode
        />
      </div>
    </DashboardShell>
  );
}
