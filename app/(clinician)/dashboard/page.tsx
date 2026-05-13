import Link from "next/link";
import { TopBar } from "../_components/shell";
import ConfidenceBar from "../_components/confidencebar";
import { Microscope,Plus,Check,TrendingUp,Bell,Zap,Shield } from "lucide-react";

const STATS = [
  { label: "Total Analyses",   value: "1,240", badge: "+4.2%",         BadgeIcon: TrendingUp, badgeColor: "text-emerald-600", borderColor: "border-l-[#0f2744]",  iconBg: "bg-[#eef3f9]", Icon: Microscope, iconColor: "text-[#0f2744]" },
  { label: "Pending Reviews",  value: "12",    badge: "Priority",      BadgeIcon: null,        badgeColor: "text-amber-500",  borderColor: "border-l-amber-400",  iconBg: "bg-amber-50",  Icon: Bell,       iconColor: "text-amber-500" },
  { label: "Avg. Confidence",  value: "91%",   badge: "High Precision",BadgeIcon: null,        badgeColor: "text-teal-600",   borderColor: "border-l-teal-500",   iconBg: "bg-teal-50",   Icon: Shield,     iconColor: "text-teal-600" },
  { label: "System Uptime",    value: "99.9%", badge: "Active",        BadgeIcon: null,        badgeColor: "text-[#0f2744]",  borderColor: "border-l-[#0f2744]",  iconBg: "bg-[#eef3f9]", Icon: Zap,  iconColor: "text-[#0f2744]" },
];

const ANALYSES = [
  { id: "#DX-9821", condition: "Basal Cell Carcinoma", confidence: 94, date: "Oct 12, 2023", status: "COMPLETED", statusStyle: "bg-emerald-100 text-emerald-700" },
  { id: "#DX-9815", condition: "Seborrheic Keratosis", confidence: 88, date: "Oct 12, 2023", status: "REVIEWING", statusStyle: "bg-amber-100 text-amber-700" },
  { id: "#DX-9799", condition: "Malignant Melanoma",   confidence: 98, date: "Oct 11, 2023", status: "URGENT",    statusStyle: "bg-rose-100 text-rose-700" },
  { id: "#DX-9782", condition: "Actinic Keratosis",    confidence: 82, date: "Oct 10, 2023", status: "COMPLETED", statusStyle: "bg-emerald-100 text-emerald-700" },
];

const GUIDELINES = [
  { label: "Good Focus",       desc: "Ensure the lesion is sharp and centered." },
  { label: "Uniform Lighting", desc: "Avoid direct glare or heavy shadowing." },
  { label: "Scale Marker",     desc: "Place a metric ruler next to the lesion." },
  { label: "Multiple Angles",  desc: "Capture top-down and lateral views." },
];



export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fb]">
      <TopBar crumbs={["Home", "Dashboard"]} />

      <main className="flex-1 px-8 py-7 space-y-6 overflow-auto">
        {/* Welcome */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0f2744]">Welcome, Dr. Sarah Mitchell</h1>
            <p className="text-sm text-gray-500 mt-0.5">Here is the latest overview of your clinical activity.</p>
          </div>
          <Link
            href="/upload"
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4"/> Start New Analysis
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          {STATS.map(({ label, value, badge, BadgeIcon, badgeColor, borderColor, iconBg, Icon, iconColor }) => (
            <div key={label} className={`bg-white rounded-xl p-5 border-l-4 ${borderColor} shadow-sm flex flex-col gap-4`}>
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
                  <span className={iconColor}><Icon /></span>
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${badgeColor}`}>
                  {BadgeIcon && <BadgeIcon  className="w-3.5 h-3.5"  />}{badge}
                </span>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">{label}</p>
                <p className="text-2xl font-bold text-[#0f2744] mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main content row */}
        <div className="flex gap-5">
          {/* Recent Analyses table */}
          <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-sm font-bold text-[#0f2744] uppercase tracking-widest">Recent Analyses</h2>
              <button className="text-xs text-[#0f2744] font-semibold hover:underline">View All History</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                  {["Case ID", "Condition", "Confidence", "Date", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ANALYSES.map((row) => (
                  <tr key={row.id} className="hover:bg-[#f8fafd] transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-bold text-[#0f2744] text-xs">{row.id}</td>
                    <td className="px-6 py-4 text-gray-700">{row.condition}</td>
                    <td className="px-6 py-4"><ConfidenceBar value={row.confidence} /></td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{row.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest ${row.statusStyle}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right column */}
          <div className="w-60 flex flex-col gap-4">
            <div className="bg-blue-900 rounded-xl p-5 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">i</span>
                </div>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest">Analysis Guidelines</h3>
              </div>
              <ul className="space-y-3.5">
                {GUIDELINES.map(({ label, desc }) => (
                  <li key={label} className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white"><Check className="w-3.5 h-3.5" /></span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold leading-tight">{label}</p>
                      <p className="text-white/50 text-[10px] leading-snug mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3">System Health</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 font-medium">Model Version</span>
                  <span className="text-xs font-bold text-[#0f2744]">v4.2.1-stable</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 font-medium">API Latency</span>
                  <span className="text-xs font-bold text-teal-600">42ms</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[10px] text-gray-400">All systems operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
