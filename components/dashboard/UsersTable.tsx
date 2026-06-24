"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface UserRow {
  id: string;
  email: string;
  role: string;
  status: string;
  fullName: string;
  phone: string;
  companyName: string | null;
  createdAt: string;
}

export function UsersTable({ onUpdate }: { onUpdate?: () => void }) {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
    fullName: "",
    phone: "",
    status: "active",
  });

  const loadUsers = () => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(d.users || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadUsers();
    onUpdate?.();
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowCreate(false);
      setForm({
        email: "",
        password: "",
        role: "customer",
        fullName: "",
        phone: "",
        status: "active",
      });
      loadUsers();
      onUpdate?.();
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-accent-light text-accent-dark",
    active: "bg-emerald-50 text-emerald-800",
    suspended: "bg-red-50 text-red-700",
  };

  if (loading) return <p className="text-muted-foreground">Loading users...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary">All Users</h2>
        <Button onClick={() => setShowCreate(!showCreate)} variant="primary" size="sm">
          {showCreate ? "Cancel" : "Create User"}
        </Button>
      </div>

      {showCreate && (
        <form
          onSubmit={createUser}
          className="bg-white rounded-xl border p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <Label>Full Name</Label>
            <Input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm({ ...form, role: v })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" variant="primary">
              Create User
            </Button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="p-4 font-medium">{user.fullName}</td>
                <td className="p-4 text-muted-foreground">{user.email}</td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium capitalize",
                      statusColors[user.status]
                    )}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-1 flex-wrap">
                    {user.status === "pending" && (
                      <Button
                        size="sm"
                        variant="primary"
                        className="h-7 text-xs"
                        onClick={() => updateStatus(user.id, "active")}
                      >
                        Approve
                      </Button>
                    )}
                    {user.status === "active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => updateStatus(user.id, "suspended")}
                      >
                        Suspend
                      </Button>
                    )}
                    {user.status === "suspended" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => updateStatus(user.id, "active")}
                      >
                        Reactivate
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
