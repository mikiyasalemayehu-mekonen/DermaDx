"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.svg"
import {
 IconAnalysis,
  IconFeedback,  IconSupport,
  IconSignOut, IconDashboard, IconUpload,IconMicroscope
} from "./icons";
import {IconHistory ,IconSettings , type Icon } from "@tabler/icons-react"

const NAV_ITEMS = [
  { label: "Dashboard",    href: "/dashboard", icon: IconDashboard },
  { label: "New Analysis", href: "/upload",    icon: IconMicroscope },
  { label: "History",      href: "/history",   icon: IconHistory },
  { label: "Feedback",     href: "/feedback",  icon: IconFeedback },
  { label: "Settings",     href: "/settings/profile",  icon: IconSettings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-[#F8FAFC] flex flex-col shrink-0">
      {/* Brand */}

      <div className="px-4 py-2 border-b border-[#e2e8f0] flex flex-row space-x-3 items-center">
                  <div className="w-11 h-11 bg-[#0B2A4A] rounded-lg flex items-center justify-center shadow-md">
                  <Image
                      src={logo}
                      alt="Logo"
                    />

                  </div>
                  <div>

        <p className="text-[#0f2744] font-bold text-lg tracking-wide leading-none">DermaDx</p>
        <p className="text-[#0f2744]/40 text-[10px] tracking-[0.18em] uppercase mt-0.5">Clinical Portal</p>
        </div>
      </div>



      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ label, href, icon: NavIcon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#0f2744] text-white"
                  : "text-[#0f2744] hover:bg-[#0f2744]/80 hover:text-white/80"
              }`}
            >
              <NavIcon />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="px-3 pb-6 space-y-0.5 border-t border-[#e2e8f0] pt-2">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#0f2744] hover:text-white/70 hover:bg-[#0f2744] transition-all duration-150">
          <IconSupport /> Support
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#0f2744] hover:text-white/70 hover:bg-[#0f2744] transition-all duration-150">
          <IconSignOut /> Sign Out
        </button>
      </div>
    </aside>
  );
}
