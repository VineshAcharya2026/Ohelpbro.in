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

interface ProUser {
  id: string;
  fullName: string;
  role: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [professionals, setProfessionals] = useState<ProUser[]>([]);

  const load = () => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((d) => setLeads(d.leads || []));
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) =>
        setProfessionals(
          (d.users || []).filter((u: { role: string }) => u.role === "professional")
        )
      );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <DashboardShell allowedRoles={["admin"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-primary">Leads</h1>
        <LeadsTable
          leads={leads}
          professionals={professionals}
          onUpdate={load}
          showAssign
          showStatusUpdate
        />
      </div>
    </DashboardShell>
  );
}
