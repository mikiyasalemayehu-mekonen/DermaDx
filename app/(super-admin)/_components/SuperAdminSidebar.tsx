"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Clinics: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Admins: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Reports: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
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
  SignOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[18px] h-[18px]">
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

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV = [
  { href: "/superadmin-dashboard", label: "Dashboard",      icon: Icons.Dashboard, badge: null },
  { href: "/clinics",              label: "Clinics",         icon: Icons.Clinics,   badge: "12" },
  { href: "/admins",               label: "Clinic Admins",   icon: Icons.Admins,    badge: "3" },
  { href: "/super-system-reports",              label: "System Reports",  icon: Icons.Reports,   badge: null },
  { href: "/settings",             label: "Settings",        icon: Icons.Settings,  badge: null },
];

const BOTTOM = [
  { href: "/support",  label: "Support",  icon: Icons.Support },
  { href: "/sign-out", label: "Sign Out", icon: Icons.SignOut },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function SuperAdminSidebar() {
  const pathname  = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className="relative flex flex-col shrink-0 min-h-screen transition-all duration-300"
      style={{
        width: collapsed ? 68 : 232,
        background: "linear-gradient(180deg, #0a0f1e 0%, #0d1530 60%, #080c1a 100%)",
        borderRight: "1px solid rgba(139,92,246,0.12)",
      }}
    >
      {/* Purple glow — distinguishes super admin visually from clinic admin */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />

      {/* ── Brand ── */}
      <div className="relative flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: "rgba(139,92,246,0.12)" }}>
          <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)" }}>
          <span className="text-white font-black text-[13px]">D</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-[15px] leading-none tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>DermaDx</p>
            <p className="text-[10px] tracking-[0.18em] uppercase mt-0.5"
              style={{ color: "rgba(167,139,250,0.6)" }}>Super Admin</p>
          </div>
        )}

        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border z-10 transition-all hover:scale-110"
          style={{ background: "#0d1530", borderColor: "rgba(139,92,246,0.2)", color: "rgba(255,255,255,0.4)" }}>
          <span className={`transition-transform duration-300 ${collapsed ? "rotate-0" : "rotate-180"}`}>
            <Icons.ChevronRight />
          </span>
        </button>
      </div>

      {/* ── Super Admin badge ── */}
          {!collapsed && (
            <div className="mx-3 mt-3 px-3 py-2 rounded-lg flex items-center gap-2"
            style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.12)" }}>
            <span style={{ color: "#93c5fd" }}><Icons.Shield /></span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(167,139,250,0.8)" }}>Super Admin</p>
              <p className="text-[8px]" style={{ color: "rgba(167,139,250,0.45)" }}>Full platform access</p>
            </div>
          </div>
        )}

      {/* ── Main nav ── */}
      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-hidden">
        {!collapsed && (
          <p className="text-[10px] uppercase tracking-[0.18em] font-semibold px-3 pb-2 mb-1"
            style={{ color: "rgba(255,255,255,0.18)" }}>Navigation</p>
        )}
        {NAV.map(({ href, label, icon: NavIcon, badge }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href}
              className="relative w-full flex items-center gap-3 rounded-lg transition-all duration-150 group"
              style={{
                padding: collapsed ? "10px 0" : "9px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                display: "flex",
                background: active ? "rgba(139,92,246,0.15)" : "transparent",
                color: active ? "#a78bfa" : "rgba(255,255,255,0.42)",
                textDecoration: "none",
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {/* Active indicator — purple */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                  style={{ background: "#bfdbfe" }} />
              )}
              <NavIcon />
                {!collapsed && (
                  <span className="text-[13px] font-medium flex-1 text-left"
                    style={{ color: active ? "#ffffff" : "rgba(255,255,255,0.45)" }}>
                    {label}
                  </span>
                )}
              {!collapsed && badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(37,99,235,0.2)", color: "#2563eb" }}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Platform status ── */}
        {!collapsed && (
          <div className="mx-3 mb-4 rounded-xl p-3"
            style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.1)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "rgba(255,255,255,0.25)" }}>Platform</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400"
                  style={{ animation: "pulse 2s infinite" }} />
                <span className="text-[10px] text-violet-400 font-semibold">All Systems</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Active Clinics</span>
                <span className="text-[10px] font-bold text-violet-400">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Total Users</span>
                <span className="text-[10px] font-bold text-violet-400">284</span>
              </div>
              <div className="w-full h-1 rounded-full overflow-hidden mt-1"
                style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full"
                  style={{ width: "92%", background: "linear-gradient(90deg, #7c3aed, #a78bfa)" }} />
              </div>
            </div>
          </div>
        )}

      {/* ── Bottom links ── */}
      <div className="px-2.5 pb-5 space-y-0.5 border-t pt-3"
        style={{ borderColor: "rgba(139,92,246,0.1)" }}>
        {BOTTOM.map(({ href, label, icon: BotIcon }) => (
          <Link key={href} href={href}
            className="w-full flex items-center gap-3 rounded-lg py-2.5 transition-colors"
            style={{
              padding: collapsed ? "10px 0" : "9px 12px",
              justifyContent: collapsed ? "center" : "flex-start",
              display: "flex",
              color: "rgba(255,255,255,0.28)",
              textDecoration: "none",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)"; }}
          >
            <BotIcon />
            {!collapsed && <span className="text-[13px] font-medium">{label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
}