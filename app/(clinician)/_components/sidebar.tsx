"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import logo from "@/public/logo.svg"
import { LogOut,Microscope,LayoutDashboard,MessageSquare ,CircleQuestionMark,History,Settings,ChevronRight} from 'lucide-react';

const NAV_ITEMS = [
  { label: "Dashboard",    href: "/dashboard", icon: LayoutDashboard},//className="w-5 h-5
  { label: "New Analysis", href: "/upload",    icon: Microscope },
  { label: "History",      href: "/history",   icon: History },
  { label: "Feedback",     href: "/feedback",  icon: MessageSquare },
  { label: "Settings",     href: "/settings/profile",  icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="relative min-h-screen bg-[#F8FAFC] flex flex-col shrink-0 transition-all duration-300"
      style={{ width: collapsed ? 68 : 224 }}
    >
      {/* Brand */}

      <div className="relative px-4 py-2 border-b border-[#e2e8f0] flex flex-row space-x-3 items-center">
        <div className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <Image
            src={logo}
            alt="Logo"
          />
        </div>
        {!collapsed && (
          <div>
            <p className="text-[#0f2744] font-bold text-lg tracking-wide leading-none">DermaDx</p>
            <p className="text-[#0f2744]/40 text-[10px] tracking-[0.18em] uppercase mt-0.5">Clinical Portal</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border z-10 transition-all hover:scale-110"
          style={{ background: "#F8FAFC", borderColor: "#e2e8f0", color: "#0f274466" }}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <span className={`transition-transform duration-300 ${collapsed ? "rotate-0" : "rotate-180"}`}>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>



      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ label, href, icon: NavIcon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-[#0f2744] hover:bg-blue-50 hover:text-blue-700"
              }`}
              style={{
                padding: collapsed ? "10px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <NavIcon />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="px-3 pb-6 space-y-0.5 border-t border-[#e2e8f0] pt-2">
        <button
          title={collapsed ? "Support" : undefined}
          className="w-full flex items-center gap-3 rounded-lg text-sm text-[#0f2744] hover:text-white hover:bg-linear-to-r hover:from-blue-600 hover:to-blue-500 transition-all duration-150"
          style={{
            padding: collapsed ? "10px 0" : "10px 12px",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <CircleQuestionMark /> Support
        </button>
        <button
          title={collapsed ? "Sign Out" : undefined}
          className="w-full flex items-center gap-3 rounded-lg text-sm text-[#0f2744] hover:text-white hover:bg-linear-to-r hover:from-blue-600 hover:to-blue-500 transition-all duration-150"
          style={{
            padding: collapsed ? "10px 0" : "10px 12px",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <LogOut /> Sign Out
        </button>
      </div>
    </aside>
  );
}
