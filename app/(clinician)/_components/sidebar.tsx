"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import logo from "@/public/logo.svg"
import { LogOut,Microscope,LayoutDashboard,MessageSquare ,CircleQuestionMark,History,Settings,ChevronRight} from 'lucide-react';
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks";

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
  const router = useRouter();
  const { logout } = useAuthContext();

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
      {/* Brand */}

      <div className="relative flex items-center gap-3 px-4 py-2 border-b border-[#e2e8f0]">
        <div className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center shadow-md bg-blue-900">
          <Image
            src={logo}
            alt="Logo"
          />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-lg leading-none tracking-wide text-[#0f2744]">DermaCare</p>
            <p className="text-[10px] tracking-[0.18em] uppercase mt-0.5 text-[#0f274466]">Clinical Portal</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border border-[#e2e8f0] z-10 transition-all hover:scale-110 bg-[#F8FAFC] text-[#0f274466]"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <span className={`transition-transform duration-300 ${collapsed ? "rotate-0" : "rotate-180"}`}>
            <ChevronRight className="w-4 h-4" />
          </span>
        </button>
      </div>



      {/* Main nav */}
      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-hidden">
        {NAV_ITEMS.map(({ label, href, icon: NavIcon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`relative w-full flex items-center gap-3 rounded-lg transition-all duration-150 ${
                collapsed ? "py-2.5 px-0 justify-center" : "py-[9px] px-3 justify-start"
              } ${isActive ? "bg-blue-900 text-white" : "text-[#0f2744] hover:bg-blue-100 hover:text-blue-700"}`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-blue-100" />
              )}
              <NavIcon className="w-6 h-6" />
              {!collapsed && (
                <span className="text-[14px] font-medium flex-1 text-left leading-5">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="px-2.5 pb-5 space-y-0.5 border-t border-[#e2e8f0] pt-3">
        {[
          { id: "support", label: "Support", Icon: CircleQuestionMark },
          { id: "signout", label: "Sign Out", Icon: LogOut },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            title={collapsed ? label : undefined}
            className={`w-full flex items-center gap-3 rounded-lg transition-colors text-[#0f2744] hover:text-blue-700 hover:bg-blue-50 ${
              collapsed ? "py-2.5 px-0 justify-center" : "py-[9px] px-3 justify-start"
            }`}
          >
            <Icon className="w-6 h-6" />
            {!collapsed && <span className="text-[14px] font-medium leading-5">{label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
}
