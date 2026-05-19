"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell as LucideBellIcon,
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
                      background: isActive ? "#1c398e" : "transparent",

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
