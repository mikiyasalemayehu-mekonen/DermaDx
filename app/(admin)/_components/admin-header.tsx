"use client";

import { usePathname } from "next/navigation";
import { Bell, HelpCircle } from "lucide-react";
import { useAuthContext } from "@/hooks";

const ROUTE_TITLES: Record<string, string[]> = {
  "/admin-dashboard": ["Admin", "System Overview"],
  "/user-management": ["Admin", "User Management"],
  "/user-management/requests": ["Admin", "User Management", "Access Requests"],
  "/system-reports": ["Admin", "System Reports"],
  "/admin-history": ["Admin", "History"],
  "/admin-settings": ["Admin", "Settings"],
  "/admin-settings/profile": ["Admin", "Settings", "Profile"],
  "/admin-settings/config": ["Admin", "Settings", "System Config"],
  "/admin-settings/model": ["Admin", "Settings", "Model Management"],
  "/admin-settings/notifications": ["Admin", "Settings", "Notifications"],
  "/admin-settings/about": ["Admin", "Settings", "About System"],
  "/clinicians": ["Admin", "Clinicians"],
  "/clinicians/invite": ["Admin", "Clinicians", "Invite"],
  "/superadmin-dashboard": ["Admin", "Super Admin"],
  "/super-system-reports": ["Admin", "Super System Reports"],
  "/admins": ["Admin", "Admins"],
  "/clinics": ["Admin", "Clinics"],
};

function titleCase(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getCrumbs(pathname: string) {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return ["Admin"];

  return ["Admin", ...segments.map(titleCase)];
}

export function AdminHeader() {
  const pathname = usePathname();
  const crumbs = getCrumbs(pathname);
  const { user } = useAuthContext();
  const displayName = user?.full_name ?? user?.email ?? "";
  const roleLabel = user?.role === "super_admin" ? "Super Admin" : user?.role === "administrator" ? "System Admin" : user?.role === "clinician" ? "Clinician" : "";

  return (
    <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
      <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide">
        {crumbs.map((crumb, index) => (
          <span key={`${crumb}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span className="text-slate-300">/</span>}
            <span className={index === crumbs.length - 1 ? "text-slate-700 font-bold uppercase tracking-widest text-[11px]" : "uppercase tracking-wide"}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors" type="button">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors" type="button">
          <HelpCircle className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-700 leading-tight">Dr. Aris Thorne</p>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest">System Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-teal-200">
            <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
              <rect width="32" height="32" fill="#ccf0eb" />
              <circle cx="16" cy="12" r="6" fill="#5eead4" />
              <ellipse cx="16" cy="26" rx="10" ry="7" fill="#5eead4" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
