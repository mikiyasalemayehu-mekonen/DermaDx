"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell as LucideBellIcon,
  HelpCircle as LucideHelpIcon,
  Shield as LucideShieldIcon,
  Sliders as LucideSlidersIcon,
  Cpu as LucideCpuIcon,
  Info as LucideInfoIcon,
} from "lucide-react";

const SETTING_TABS = [
  { label: "Profile & Security", icon: LucideShieldIcon,  href: "/admin-settings/profile" },
  { label: "System Config",      icon: LucideSlidersIcon, href: "/admin-settings/config" },
  { label: "Model Management",   icon: LucideCpuIcon,     href: "/admin-settings/model" },
  { label: "Notifications",      icon: LucideBellIcon,    href: "/admin-settings/notifications" },
  { label: "About System",       icon: LucideInfoIcon,    href: "/admin-settings/about" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
      <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
          <span className="font-medium">Admin</span>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">Settings</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
            <LucideBellIcon className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
            <LucideHelpIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-700 leading-tight">Dr. Aris Thorne</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest">System Admin</p>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-teal-200">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <rect width="32" height="32" fill="#ccf0eb" />
                <circle cx="16" cy="12" r="6" fill="#5eead4" />
                <ellipse cx="16" cy="26" rx="10" ry="7" fill="#5eead4" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-7 overflow-auto fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Settings</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage system configuration, model parameters, and admin preferences.</p>
        </div>

        <div className="mb-6 flex items-start gap-3 px-5 py-4 rounded-xl border" style={{ background: "rgba(13,36,68,0.04)", borderColor: "rgba(13,36,68,0.12)" }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#0d2444" }}>
            <LucideShieldIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-700">Admin Privileges Active</p>
            <p className="text-xs text-slate-500 mt-0.5">You are currently in SuperAdmin mode. Critical system changes are logged and audited automatically.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div className="w-52 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 space-y-0.5">
              {SETTING_TABS.map(({ label, icon: TabIcon, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{
                      background: isActive ? "#0d2444" : "transparent",
                      color: isActive ? "white" : "#64748b",
                    }}
                  >
                    <TabIcon className="w-4 h-4" />{label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
