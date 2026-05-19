"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import FairnessChart from "../_components/fairnesschart";


const ACTIVITY = [  { name: "Dr. Julian Vance",    role: "Chief Pathologist",  action: "New Analysis Created", context: "Patient ID: #4492-Au", time: "2 mins ago",  status: "COMPLETED",  statusStyle: "bg-teal-100 text-teal-700",  avatar: "JV", avatarBg: "#0f4c75" },
  { name: "Sarah Chen",          role: "System Admin",       action: "Policy Update",         context: "User Access Control", time: "14 mins ago", status: "PROCESSING", statusStyle: "bg-blue-100 text-blue-700",   avatar: "SC", avatarBg: "#1a3a5c" },
  { name: "Dr. Elena Rodriguez", role: "Dermatologist",      action: "Export Report",          context: "Monthly Clinical Audit", time: "45 mins ago", status: "COMPLETED", statusStyle: "bg-teal-100 text-teal-700", avatar: "ER", avatarBg: "#0d3d52" },
  { name: "Dr. Kwame Asante",    role: "Senior Clinician",   action: "Model Feedback",         context: "Case DX-9821",       time: "1 hr ago",    status: "REVIEWED",   statusStyle: "bg-slate-100 text-slate-600", avatar: "KA", avatarBg: "#2d4a2d" },
];

const STAT_CARDS = [
  { label: "Total Users",       value: "1,284", delta: "+12% vs last month",  positive: true,  icon: "👤", borderColor: "#0d2444" },
  { label: "Total Diagnoses",   value: "42,901", delta: "+5.2k active sessions", positive: true,  icon: "🔬", borderColor: "#0d7070" },
  { label: "IQA Rejection Rate",value: "2.4%",   delta: "-0.8% improvement",  positive: true,  icon: "📋", borderColor: "#b45309" },
  { label: "Avg. Confidence",   value: "94.8%",  delta: "Global model performance", positive: true, icon: "✅", borderColor: "#065f46" },
];


export default function AdminDashboard() {
  const [chartView, setChartView] = useState<"weekly" | "monthly">("weekly");
  const [activitySearch, setActivitySearch] = useState("");

  const filteredActivity = ACTIVITY.filter((a) =>
    activitySearch === "" ||
    a.name.toLowerCase().includes(activitySearch.toLowerCase()) ||
    a.action.toLowerCase().includes(activitySearch.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content */}
        <main className="flex-1 px-8 py-7 overflow-auto space-y-6">

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-4 gap-4 animate-fade-up">
            {STAT_CARDS.map(({ label, value, delta, positive, icon, borderColor }, i) => (
              <div
                key={label}
                className="card-lift bg-white rounded-xl p-5 border-l-4 shadow-sm"
                style={{ borderLeftColor: borderColor, animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">{label}</p>
                  <span className="text-xl">{icon}</span>
                </div>
                <p className="text-[28px] font-bold text-slate-800 leading-none mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
                <p className={`text-xs font-medium ${positive ? "text-teal-600" : "text-rose-500"}`}>{delta}</p>
              </div>
            ))}
          </div>

          {/* ── Charts row ── */}
          <div className="flex gap-5">
            {/* Fairness chart */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h2 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Skin-tone Fairness Metrics</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Model confidence comparison across Fitzpatrick scales I–VI</p>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1 border border-slate-100">
                  {(["weekly", "monthly"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setChartView(v)}
                      className="px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all"
                      style={{
                        background: chartView === v ? "#2563eb" : "transparent",
                        color: chartView === v ? "white" : "#94a3b8",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <FairnessChart view={chartView} />
              </div>

              {/* Legend */}
              <div className="flex items-center gap-5 mt-3 pt-3 border-t border-slate-50">
                {[["≥95%", "#00c4a8", "Excellent"], ["≥92%", "#0ea5e9", "Good"], ["≥89%", "#f59e0b", "Fair"], ["<89%", "#ef4444", "Watch"]].map(([range, color, label]) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                    <span className="text-[10px] text-slate-400">{range} — {label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="w-64 shrink-0 rounded-xl p-6 flex flex-col " style={{ background: "linear-gradient(160deg, #1c398e 0%, #162456 100%)" }}>
              <div className="mb-5">
                <h3 className="text-white font-bold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>System Health</h3>
                <p className="text-teal-400/60 text-[10px] mt-0.5 tracking-wide">Real-time infrastructure status</p>
              </div>

              <div className="space-y-4 flex-1">
                {[
                  { label: "Uptime",           value: "99.98%", valueColor: "#00d4b4", bar: 99.98, barColor: "#00d4b4" },
                  { label: "Model Version",    value: "v2.4.0-pro", valueColor: "#94b8d8", bar: null, barColor: null },
                  { label: "Latent Response",  value: "180ms", valueColor: "#94b8d8", bar: null, barColor: null },
                  { label: "Active Sessions",  value: "5,240", valueColor: "#94b8d8", bar: null, barColor: null },
                ].map(({ label, value, valueColor, bar, barColor }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] text-slate-400">{label}</span>
                      <span className="text-[11px] font-bold font-mono" style={{ color: valueColor }}>{value}</span>
                    </div>
                    {bar !== null && barColor && (
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${bar}%`, background: `linear-gradient(90deg, ${barColor}, #00a8d0)` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Status indicators */}
              <div className="mt-5 pt-4 border-t space-y-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                {[["API Gateway", true], ["AI Model", true], ["Storage", true]].map(([svc, ok]) => (
                  <div key={svc as string} className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{svc as string}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: ok ? "#00d4b4" : "#ef4444", animation: "pulse 2s infinite" }} />
                      <span className="text-[10px]" style={{ color: ok ? "#00d4b4" : "#f87171" }}>{ok ? "Online" : "Down"}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all hover:opacity-90 active:scale-95"
                style={{ background: "rgba(0,212,180,0.12)", color: "#00d4b4", border: "1px solid rgba(0,212,180,0.2)" }}>
                View Log Details
              </button>
            </div>
          </div>

          {/* ── Recent User Activity ── */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Recent User Activity</h2>
                <p className="text-xs text-slate-400 mt-0.5">Live audit log across all clinician accounts</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2"><Search className="w-4 h-4" /></span>
                  <input
                    value={activitySearch}
                    onChange={(e) => setActivitySearch(e.target.value)}
                    placeholder="Filter activity..."
                    className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all text-slate-600 placeholder:text-slate-300"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #1c398e, #1c398e)" }}>

                  <Plus className="h-4 w-4" />Export
                </button>
              </div>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: "#fafbfc" }}>
                  {["User", "Action", "Context", "Time", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredActivity.map((row) => (
                  <tr key={row.name} className="row-hover transition-colors cursor-pointer">
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: row.avatarBg }}>
                          {row.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-700">{row.name}</p>
                          <p className="text-[10px] text-slate-400">{row.role}</p>
                        </div>
                      </div>
                    </td>
                    {/* Action */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700 font-medium">{row.action}</span>
                    </td>
                    {/* Context */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">{row.context}</span>
                    </td>
                    {/* Time */}
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-400">{row.time}</span>
                    </td>
                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest ${row.statusStyle}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredActivity.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-300">No activity matches your filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
    </div>
  );
}
