"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  type: string;
  status: string;
  payload: Record<string, unknown>;
  userId: string | null;
  assignedTo: string | null;
  createdAt: string;
}

interface LeadsTableProps {
  leads: Lead[];
  professionals?: Array<{ id: string; fullName: string }>;
  onUpdate?: () => void;
  showAssign?: boolean;
  showStatusUpdate?: boolean;
  professionalMode?: boolean;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  assigned: "bg-purple-100 text-purple-800",
  closed: "bg-green-100 text-green-800",
};

export function LeadsTable({
  leads,
  professionals = [],
  onUpdate,
  showAssign = false,
  showStatusUpdate = false,
  professionalMode = false,
}: LeadsTableProps) {
  const [updating, setUpdating] = useState<string | null>(null);

  const updateLead = async (
    id: string,
    data: { status?: string; assignedTo?: string | null }
  ) => {
    setUpdating(id);
    const endpoint = professionalMode
      ? `/api/professional/leads/${id}`
      : `/api/admin/leads/${id}`;

    await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setUpdating(null);
    onUpdate?.();
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border/50 p-12 text-center text-muted-foreground">
        No leads found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-medium">Type</th>
              <th className="text-left p-4 font-medium">Contact</th>
              <th className="text-left p-4 font-medium">Details</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Date</th>
              {(showAssign || showStatusUpdate) && (
                <th className="text-left p-4 font-medium">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const p = lead.payload;
              const name = (p.fullName as string) || "—";
              const email = (p.email as string) || "—";
              const phone = (p.phone as string) || "—";
              const service =
                (p.service as string) ||
                ((p.servicesNeeded as string[]) || (p.servicesProvided as string[]) || []).join(
                  ", "
                ) ||
                "—";

              return (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-4 capitalize whitespace-nowrap">
                    {lead.type.replace(/_/g, " ")}
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{name}</p>
                    <p className="text-muted-foreground text-xs">{email}</p>
                    <p className="text-muted-foreground text-xs">{phone}</p>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="truncate">{service}</p>
                    {p.message ? (
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {String(p.message)}
                      </p>
                    ) : null}
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium capitalize",
                        statusColors[lead.status] || "bg-gray-100"
                      )}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  {(showAssign || showStatusUpdate) && (
                    <td className="p-4 space-y-2 min-w-[180px]">
                      {showAssign && (
                        <Select
                          onValueChange={(val) =>
                            updateLead(lead.id, {
                              assignedTo: val === "none" ? null : val,
                            })
                          }
                          disabled={updating === lead.id}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Assign to..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Unassigned</SelectItem>
                            {professionals.map((pro) => (
                              <SelectItem key={pro.id} value={pro.id}>
                                {pro.fullName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {showStatusUpdate && (
                        <div className="flex gap-1 flex-wrap">
                          {professionalMode ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                                disabled={updating === lead.id}
                                onClick={() =>
                                  updateLead(lead.id, { status: "contacted" })
                                }
                              >
                                Contacted
                              </Button>
                              <Button
                                size="sm"
                                variant="primary"
                                className="h-7 text-xs"
                                disabled={updating === lead.id}
                                onClick={() => updateLead(lead.id, { status: "closed" })}
                              >
                                Close
                              </Button>
                            </>
                          ) : (
                            ["new", "contacted", "assigned", "closed"].map((s) => (
                              <Button
                                key={s}
                                size="sm"
                                variant={lead.status === s ? "primary" : "outline"}
                                className="h-7 text-xs capitalize"
                                disabled={updating === lead.id}
                                onClick={() => updateLead(lead.id, { status: s })}
                              >
                                {s}
                              </Button>
                            ))
                          )}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
