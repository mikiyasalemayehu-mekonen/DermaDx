"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./_components/sidebar";
import AdminFooter from "./_components/footer";

const PATH_TO_NAV: Record<string, string> = {
  "/admin-dashboard": "dashboard",
  "/user-management": "users",
  "/system-reports":  "reports",
  "/admin-history":   "history",
  "/admin-settings/profile":       "settings",
  "/admin-settings/config":        "settings",
  "/admin-settings/model":         "settings",
  "/admin-settings/notifications": "settings",
  "/admin-settings/about":         "settings",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = PATH_TO_NAV[pathname] ?? "dashboard";

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <div className="flex flex-1 min-h-0">
        <AdminSidebar active={active} onNav={() => {}} />
        <div className="flex-1 flex flex-col min-w-0">{children}</div>
      </div>
      <AdminFooter />
    </div>
  );
}
