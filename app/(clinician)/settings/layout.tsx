"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { TopBar } from "../_components/shell";
import {
  User,
  Shield as IconShield,
} from "lucide-react";

const SETTINGS_TABS = [
  { label: "Profile",     icon: User,        href: "/settings/profile" },
  { label: "Security",    icon: IconShield,  href: "/settings/security" },
  {
    label: "Preferences",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <line x1="8"  y1="6"  x2="21" y2="6"  strokeLinecap="round" />
        <line x1="8"  y1="12" x2="21" y2="12" strokeLinecap="round" />
        <line x1="8"  y1="18" x2="21" y2="18" strokeLinecap="round" />
        <line x1="3"  y1="6"  x2="3.01" y2="6"  strokeLinecap="round" strokeWidth={2.5} />
        <line x1="3"  y1="12" x2="3.01" y2="12" strokeLinecap="round" strokeWidth={2.5} />
        <line x1="3"  y1="18" x2="3.01" y2="18" strokeLinecap="round" strokeWidth={2.5} />
      </svg>
    ),
    href: "/settings/preferences",
  },
  {
    label: "About",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8"  x2="12"    y2="12" strokeLinecap="round" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeWidth={2.5} />
      </svg>
    ),
    href: "/settings/about",
  },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/settings") router.replace("/settings/profile");
  }, [pathname, router]);

  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fb]">


      <main className="flex-1 px-8 py-7 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f2744]">User Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
            Manage your clinician profile, security preferences, and system information.
          </p>
        </div>

        <div className="flex gap-5 items-start">
          <div className="w-44 shrink-0 bg-white rounded-xl shadow-sm p-2 space-y-0.5">
            {SETTINGS_TABS.map(({ label, icon: Icon, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-900 text-white"
                      : "text-gray-500 hover:bg-gray-50 hover:text-blue-700"
                  }`}
                >
                  <Icon />{label}
                </Link>
              );
            })}
          </div>

          <div className="flex-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
