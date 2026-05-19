"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight } from "lucide-react";

const HEADER_ROUTES: Record<string, string[]> = {
  "/dashboard": ["Home", "Dashboard"],
  "/history": ["Home", "History"],
  "/feedback": ["Home", "Feedback"],
  "/upload": ["Home", "New Analysis", "Upload Image"],
  "/analysis": ["Home", "Analysis"],
  "/settings": ["Home", "Settings"],
  "/settings/profile": ["Home", "Settings", "Profile"],
  "/settings/security": ["Home", "Settings", "Security"],
  "/settings/preferences": ["Home", "Settings", "Preferences"],
  "/settings/about": ["Home", "Settings", "About"],
};

function titleCase(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getCrumbs(pathname: string) {
  if (HEADER_ROUTES[pathname]) return HEADER_ROUTES[pathname];

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return ["Home"];

  return ["Home", ...segments.map(titleCase)];
}

export function ClinicianHeader() {
  const pathname = usePathname();
  const crumbs = getCrumbs(pathname);

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between shrink-0">
      <nav className="flex items-center gap-1.5 text-sm text-gray-400">
        {crumbs.map((crumb, index) => (
          <span key={`${crumb}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5" />}
            {index === 0 ? (
              <Link href="/dashboard" className="hover:text-[#0f2744] cursor-pointer transition-colors text-[10px] tracking-[0.18em] uppercase">
                {crumb}
              </Link>
            ) : (
              <span
                className={
                  index === crumbs.length - 1
                    ? "text-[#0f2744] font-bold uppercase tracking-wide text-[11px]"
                    : "hover:text-[#0f2744] cursor-pointer transition-colors text-[10px] tracking-[0.18em] uppercase"
                }
              >
                {crumb}
              </span>
            )}
          </span>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors relative" type="button">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="text-right">
            <p className="text-xs font-bold text-[#0f2744] leading-tight">Dr. Aris Thorne</p>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">Chief Dermatologist</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden border-2 border-teal-300">
            <svg viewBox="0 0 36 36" className="w-full h-full" aria-hidden="true">
              <rect width="36" height="36" fill="#b2dfdb" />
              <circle cx="18" cy="14" r="7" fill="#80cbc4" />
              <ellipse cx="18" cy="30" rx="11" ry="8" fill="#80cbc4" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
