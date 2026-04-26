"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { LogOut ,ChevronRight,LayoutDashboardIcon,History,Settings ,CircleQuestionMark,Users,FileText} from 'lucide-react';
import Link from "next/link";
import { AdminSidebarProps } from "@/types";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",  href: "/admin-dashboard",      icon: LayoutDashboardIcon, badge: null },
  { id: "users",     label: "User Management", href: "/user-management", icon: Users,     badge: "3" },
  { id: "reports",   label: "System Reports",  href: "/system-reports", icon: FileText,   badge: null },
  { id: "history",   label: "History",         href: "/admin-history", icon: History,   badge: null },
  { id: "settings",  label: "Settings",        href: "/admin-settings", icon: Settings,  badge: null },
];


const BOTTOM_ITEMS = [
  { id: "support", label: "Support",  icon: CircleQuestionMark },
  { id: "signout", label: "Sign Out", icon: LogOut },
];

export default function AdminSidebar({ active, onNav }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col shrink-0 min-h-screen transition-all duration-300 select-none bg-[#F8FAFC] border-r border-[#e2e8f0] ${
        collapsed ? "w-17" : "w-56"
      }`}
    >
      {/* ── Brand ── */}
      <div className="relative flex items-center gap-3 px-4 py-2 border-b border-[#e2e8f0]">
        <div className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center shadow-md bg-[#0f2744]">
          <Image src={logo} alt="Logo" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-lg leading-none tracking-wide text-[#0f2744]">DermaDx</p>
            <p className="text-[10px] tracking-[0.18em] uppercase mt-0.5 text-[#0f274466]">Admin Console</p>
          </div>
        )}
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border border-[#e2e8f0] z-10 transition-all hover:scale-110 bg-[#F8FAFC] text-[#0f274466]"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <span className={`transition-transform duration-300 ${collapsed ? "rotate-0" : "rotate-180"}`}>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* ── Main nav ── */}
      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-hidden">
        {NAV_ITEMS.map(({ id, label, href, icon: NavIcon, badge }) => {
          const isActive = active === id;
          return (
            <Link
              key={id}
              href={href}
              onClick={() => onNav?.(id)}
              title={collapsed ? label : undefined}
              className={`relative w-full flex items-center gap-3 rounded-lg transition-all duration-150 ${
                collapsed ? "py-2.5 px-0 justify-center" : "py-2.25 px-3 justify-start"
              } ${isActive ? "bg-[#0f2744] text-white" : "text-[#0f2744] hover:bg-[rgba(15,39,68,0.08)]"}`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-white" />
              )}
              <NavIcon />
              {!collapsed && (
                <span className="text-[13px] font-medium flex-1 text-left">
                  {label}
                </span>
              )}
              {!collapsed && badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[rgba(239,68,68,0.12)] text-[#dc2626]">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── System status pill ── */}
      {!collapsed && (
        <div className="mx-3 mb-4 rounded-xl p-3 bg-[rgba(15,39,68,0.05)] border border-[#e2e8f0]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0f274466]">
              System
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#0f2744]" />
              <span className="text-[10px] font-semibold text-[#0f2744]">Operational</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[10px] text-[#0f274466]">Uptime</span>
              <span className="text-[10px] font-bold text-[#0f2744]">99.98%</span>
            </div>
            <div className="w-full h-1 rounded-full overflow-hidden bg-[#0f274414]">
              <div className="h-full rounded-full w-[99.98%] bg-[#0f2744]" />
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom links ── */}
      <div className="px-2.5 pb-5 space-y-0.5 border-t border-[#e2e8f0] pt-3">
        {BOTTOM_ITEMS.map(({ id, label, icon: BotIcon }) => (
          <button
            key={id}
            onClick={() => onNav?.(id)}
            title={collapsed ? label : undefined}
            className={`w-full flex items-center gap-3 rounded-lg transition-colors text-[#0f274466] hover:text-[#0f2744] hover:bg-[rgba(15,39,68,0.08)] ${
              collapsed ? "py-2.5 px-0 justify-center" : "py-2.25 px-3 justify-start"
            }`}
          >
            <BotIcon />
            {!collapsed && <span className="text-[13px] font-medium">{label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
}
