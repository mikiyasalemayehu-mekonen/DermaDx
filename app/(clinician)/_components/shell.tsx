import {  IconUser } from "./icons";
import {ChevronRight, LogOut } from 'lucide-react';

interface TopBarProps {
  crumbs: string[];
}

export function TopBar({ crumbs }: TopBarProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between shrink-0">
      <nav className="flex items-center gap-1.5 text-sm text-gray-400">
        {crumbs.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
            <span
              className={
                i === crumbs.length - 1
                  ? "text-[#0f2744] font-bold uppercase tracking-wide text-[11px]"
                  : "hover:text-[#0f2744] cursor-pointer transition-colors text-xs"
              }
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <IconUser />
        </button>
        <button className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <LogOut />
        </button>
      </div>
    </header>
  );
}


