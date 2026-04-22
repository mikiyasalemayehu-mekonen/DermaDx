"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { LogOut ,ChevronRight } from 'lucide-react';



// ── Types ─────────────────────────────────────────────────────────────────────

export interface AdminSidebarProps {
  active: string;
  onNav?: (id: string) => void;
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const icons = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Reports: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
      <polyline points="10 9 9 9 8 9" strokeLinecap="round" />
    </svg>
  ),
  History: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Support: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeWidth={2.5} />
    </svg>
  ),

};

// ── Nav items ─────────────────────────────────────────────────────────────────

// const NAV_ITEMS = [
//   { id: "dashboard", label: "Dashboard",  href: "/admindashboard",      icon: icons.Dashboard, badge: null },
//   { id: "users",     label: "User Management", href: "/usermanagement ", icon: icons.Users,     badge: "3" },
//   { id: "reports",   label: "System Reports",  href: "/systemreports", icon: icons.Reports,   badge: null },
//   { id: "history",   label: "History",         href: "/adminhistory", icon: icons.History,   badge: null },
//   { id: "settings",  label: "Settings",        href: "/adminsettings", icon: icons.Settings,  badge: null },
// ];
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",       icon: icons.Dashboard, badge: null },
  { id: "users",     label: "User Management" , icon: icons.Users,     badge: "3" },
  { id: "reports",   label: "System Reports",   icon: icons.Reports,   badge: null },
  { id: "history",   label: "History",         icon: icons.History,   badge: null },
  { id: "settings",  label: "Settings",        icon: icons.Settings,  badge: null },
];



const BOTTOM_ITEMS = [
  { id: "support", label: "Support",  icon: icons.Support },
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
        {!collapsed && (
          <p
            className="text-[9px] uppercase tracking-[0.2em] font-semibold px-3 pb-2 mb-1"
            style={{ color: `${C.brand}44` }}
          >
            Navigation
          </p>
        )}
        {NAV_ITEMS.map(({ id, label, icon: NavIcon, badge }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
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
            </button>
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
