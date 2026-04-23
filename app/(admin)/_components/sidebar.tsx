"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { LogOut ,ChevronRight,LayoutDashboardIcon,History,Settings ,CircleQuestionMark,Users,FileText} from 'lucide-react';
import Link from "next/link";


// ── Types ─────────────────────────────────────────────────────────────────────

export interface AdminSidebarProps {
  active: string;
  onNav?: (id: string) => void;
}



// ── Nav items ─────────────────────────────────────────────────────────────────

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

// Clinician colour tokens
const C = {
  bg:           "#F8FAFC",
  border:       "#e2e8f0",
  brand:        "#0f2744",
  activeBg:     "#0f2744",
  activeText:   "#ffffff",
  inactiveText: "#0f2744",
  hoverBg:      "rgba(15,39,68,0.08)",
  pillBg:       "rgba(15,39,68,0.05)",
  pillBorder:   "#e2e8f0",
  statusDot:    "#0f2744",
  statusText:   "#0f2744",
  collapseBtn:  "#F8FAFC",
};

// ── Sidebar ───────────────────────────────────────────────────────────────────

export default function AdminSidebar({ active, onNav }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="relative flex flex-col shrink-0 min-h-screen transition-all duration-300 select-none"
      style={{
        width: collapsed ? 68 : 224,
        background: C.bg,
        borderRight: `1px solid ${C.border}`,
      }}
    >
      {/* ── Brand ── */}
      <div
        className="relative flex items-center gap-3 px-4 py-2 border-b"
        style={{ borderColor: C.border }}
      >
        <div
          className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center shadow-md"
          style={{ background: C.brand }}
        >
          <Image src={logo} alt="Logo" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-lg leading-none tracking-wide" style={{ color: C.brand }}>DermaDx</p>
            <p className="text-[10px] tracking-[0.18em] uppercase mt-0.5" style={{ color: `${C.brand}66` }}>Admin Console</p>
          </div>
        )}
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border z-10 transition-all hover:scale-110"
          style={{ background: C.collapseBtn, borderColor: C.border, color: `${C.brand}66` }}
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
              className="relative w-full flex items-center gap-3 rounded-lg transition-all duration-150"
              style={{
                padding: collapsed ? "10px 0" : "9px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                background: isActive ? C.activeBg : "transparent",
                color: isActive ? C.activeText : C.inactiveText,
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = C.hoverBg;
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                  style={{ background: C.activeText }}
                />
              )}
              <NavIcon />
              {!collapsed && (
                <span
                  className="text-[13px] font-medium flex-1 text-left"
                  style={{ color: isActive ? C.activeText : C.inactiveText }}
                >
                  {label}
                </span>
              )}
              {!collapsed && badge && (
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(239,68,68,0.12)", color: "#dc2626" }}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── System status pill ── */}
      {!collapsed && (
        <div
          className="mx-3 mb-4 rounded-xl p-3"
          style={{ background: C.pillBg, border: `1px solid ${C.pillBorder}` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: `${C.brand}66` }}>
              System
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.statusDot }} />
              <span className="text-[10px] font-semibold" style={{ color: C.statusText }}>Operational</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[10px]" style={{ color: `${C.brand}66` }}>Uptime</span>
              <span className="text-[10px] font-bold" style={{ color: C.brand }}>99.98%</span>
            </div>
            <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: `${C.brand}14` }}>
              <div className="h-full rounded-full" style={{ width: "99.98%", background: C.brand }} />
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom links ── */}
      <div className="px-2.5 pb-5 space-y-0.5 border-t pt-3" style={{ borderColor: C.border }}>
        {BOTTOM_ITEMS.map(({ id, label, icon: BotIcon }) => (
          <button
            key={id}
            onClick={() => onNav?.(id)}
            title={collapsed ? label : undefined}
            className="w-full flex items-center gap-3 rounded-lg transition-colors"
            style={{
              padding: collapsed ? "10px 0" : "9px 12px",
              justifyContent: collapsed ? "center" : "flex-start",
              color: `${C.brand}66`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = C.brand;
              (e.currentTarget as HTMLElement).style.background = C.hoverBg;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = `${C.brand}66`;
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <BotIcon />
            {!collapsed && <span className="text-[13px] font-medium">{label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
}
