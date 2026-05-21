"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks";
import Image from "next/image";
import logo from "@/public/logo.svg";

const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Clinics: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Admins: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Reports: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Support: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeWidth={2.5} />
    </svg>
  ),
  SignOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" strokeLinecap="round" />
      <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

const NAV = [
  { href: "/superadmin-dashboard", label: "Dashboard", icon: Icons.Dashboard, badge: null },
  { href: "/clinics", label: "Clinics", icon: Icons.Clinics, badge: "12" },
  { href: "/admins", label: "Clinic Admins", icon: Icons.Admins, badge: "3" },
  { href: "/super-system-reports", label: "System Reports", icon: Icons.Reports, badge: null },
  { href: "/settings", label: "Settings", icon: Icons.Settings, badge: null },
];

const BOTTOM = [
  { href: "/support", label: "Support", icon: Icons.Support },
  { href: "/sign-out", label: "Sign Out", icon: Icons.SignOut },
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { logout } = useAuthContext();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const handleSignOut = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <aside
      className={`relative flex flex-col shrink-0 min-h-screen transition-all duration-300 select-none bg-[#F8FAFC] border-r border-[#e2e8f0] ${
        collapsed ? "w-[68px]" : "w-56"
      }`}
    >
      <div className="relative flex items-center gap-3 px-4 py-2 border-b border-[#e2e8f0]">
        <div className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center shadow-md bg-blue-900">
          <Image src={logo} alt="Logo" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-lg leading-none tracking-wide text-[#0f2744]">DermaCare</p>
            <p className="text-[10px] tracking-[0.18em] uppercase mt-0.5 text-[#0f274466]">Super Admin</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border border-[#e2e8f0] z-10 transition-all hover:scale-110 bg-[#F8FAFC] text-[#0f274466]"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <span className={`transition-transform duration-300 ${collapsed ? "rotate-0" : "rotate-180"}`}>
            <Icons.ChevronRight />
          </span>
        </button>
      </div>

      {!collapsed && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-lg flex items-center gap-2 bg-blue-50 border border-blue-100">
          <span className="text-blue-600"><Icons.Shield /></span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-800">Super Admin</p>
            <p className="text-[8px] text-blue-500">Full platform access</p>
          </div>
        </div>
      )}

      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-hidden">

        {NAV.map(({ href, label, icon: NavIcon, badge }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative w-full flex items-center gap-3 rounded-lg transition-all duration-150 ${
                collapsed ? "py-2.5 px-0 justify-center" : "py-[9px] px-3 justify-start"
              } ${active ? "bg-blue-900 text-white" : "text-[#0f2744] hover:bg-blue-50 hover:text-blue-700"}`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-blue-100" />
              )}
              <NavIcon />
              {!collapsed && <span className="text-[13px] font-medium flex-1 text-left">{label}</span>}
              {!collapsed && badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[rgba(239,68,68,0.12)] text-[#dc2626]">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mx-3 mb-4 rounded-xl p-3 bg-blue-50 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0f274466]">Platform</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-blue-600" />
              <span className="text-[10px] font-semibold text-blue-700">All Systems</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[10px] text-[#0f274466]">Active Clinics</span>
              <span className="text-[10px] font-bold text-blue-700">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-[#0f274466]">Total Users</span>
              <span className="text-[10px] font-bold text-blue-700">284</span>
            </div>
            <div className="w-full h-1 rounded-full overflow-hidden bg-blue-100">
              <div className="h-full rounded-full w-[92%] bg-blue-600" />
            </div>
          </div>
        </div>
      )}

      <div className="px-2.5 pb-5 space-y-0.5 border-t border-[#e2e8f0] pt-3">
        {BOTTOM.map(({ href, label, icon: BotIcon }) => (
          <Link
            key={href}
            href={href}
            onClick={href === "/sign-out" ? (e) => { e.preventDefault(); void handleSignOut(); } : undefined}
            className={`w-full flex items-center gap-3 rounded-lg transition-colors text-[#0f274466] hover:text-blue-700 hover:bg-blue-50 ${
              collapsed ? "py-2.5 px-0 justify-center" : "py-[9px] px-3 justify-start"
            }`}
          >
            <BotIcon />
            {!collapsed && <span className="text-[13px] font-medium">{label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}