"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  UserCircle,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

interface DashboardSidebarProps {
  role: "admin" | "customer" | "professional";
  userName: string;
}

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/leads", label: "Leads", icon: FileText },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
];

const customerLinks = [
  { href: "/dashboard/customer", label: "My Requests", icon: FileText },
  { href: "/dashboard/customer/profile", label: "Profile", icon: UserCircle },
];

const professionalLinks = [
  { href: "/dashboard/professional", label: "Assigned Jobs", icon: Briefcase },
  { href: "/dashboard/professional/profile", label: "Profile", icon: UserCircle },
];

export function DashboardSidebar({ role, userName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const links =
    role === "admin"
      ? adminLinks
      : role === "customer"
        ? customerLinks
        : professionalLinks;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-primary text-primary-foreground min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary font-bold">
            O
          </div>
          <span className="font-bold text-lg">{SITE_NAME}</span>
        </Link>
        <p className="text-sm text-primary-foreground/70 mt-3 capitalize">{role} Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-white/15 text-white font-medium"
                  : "text-primary-foreground/80 hover:bg-white/10"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <p className="text-sm text-primary-foreground/70 mb-3 truncate">{userName}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
