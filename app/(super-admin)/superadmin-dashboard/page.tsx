"use client";

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Active Clinics",    value: "12",    delta: "+2 this month",   positive: true,  color: "#2563eb", bg: "#eff6ff", icon: "🏥" },
  { label: "Total Clinicians",  value: "284",   delta: "+18 this month",  positive: true,  color: "#0d9488", bg: "#f0fdf9", icon: "👨‍⚕️" },
  { label: "Pending Approvals", value: "5",     delta: "3 clinics, 2 admins", positive: false, color: "#d97706", bg: "#fffbeb", icon: "⏳" },
  { label: "Total Analyses",    value: "42,901",delta: "+5.2k this week", positive: true,  color: "#0d2444", bg: "#f0f4ff", icon: "🔬" },
  { label: "Avg Confidence",    value: "94.8%", delta: "Stable",          positive: true,  color: "#059669", bg: "#ecfdf5", icon: "✅" },
  { label: "System Uptime",     value: "99.98%",delta: "All regions",     positive: true,  color: "#2563eb", bg: "#eff6ff", icon: "⚡" },
];

const CLINICS = [
  { name: "Memorial Health Systems", plan: "Enterprise", users: 48, analyses: 12400, status: "active",          joined: "Jan 2023" },
  { name: "Kings Medical Centre",    plan: "Professional", users: 31, analyses: 8900, status: "active",         joined: "Mar 2023" },
  { name: "Accra Health Institute",  plan: "Basic",       users: 12, analyses: 2100, status: "pending_setup",   joined: "Oct 2023" },
  { name: "Warsaw MedLab",           plan: "Professional", users: 22, analyses: 5600, status: "active",         joined: "Jun 2023" },
  { name: "Hadassah Medical Centre", plan: "Enterprise",  users: 61, analyses: 18200, status: "active",         joined: "Feb 2023" },
  { name: "Clinique Dakar",          plan: "Basic",       users: 8,  analyses: 980,   status: "suspended",      joined: "Aug 2023" },
];

const ACTIVITY = [
  { action: "New clinic onboarded",        target: "Accra Health Institute", time: "2h ago",   type: "clinic" },
  { action: "Admin account created",       target: "Dr. Kwame Asante",       time: "3h ago",   type: "admin" },
  { action: "Clinic suspended",            target: "Clinique Dakar",          time: "1d ago",   type: "alert" },
  { action: "Model version deployed",      target: "v4.2.1-prod → all tenants", time: "2d ago", type: "system" },
  { action: "New access request",          target: "Warsaw MedLab",           time: "2d ago",   type: "request" },
  { action: "Bulk clinician invite sent",  target: "Memorial Health (12)",    time: "3d ago",   type: "clinic" },
];

const STATUS_STYLE: Record<string, string> = {
  active:        "bg-teal-100 text-teal-700",
  pending_setup: "bg-amber-100 text-amber-700",
  suspended:     "bg-rose-100 text-rose-700",
};

const PLAN_STYLE: Record<string, string> = {
  Enterprise:   "bg-violet-100 text-violet-700",
  Professional: "bg-blue-100 text-blue-700",
  Basic:        "bg-slate-100 text-slate-600",
};

const TYPE_COLOR: Record<string, string> = {
  clinic:  "#2563eb",
  admin:   "#0d9488",
  alert:   "#ef4444",
  system:  "#0d2444",
  request: "#d97706",
};

// ── Mini bar chart (platform usage) ──────────────────────────────────────────
function MiniBarChart() {
  const data = [65, 80, 72, 90, 85, 95, 88, 92, 78, 96, 89, 94];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const max = 96;
  const W = 520; const H = 100;
  const bw = 30; const gap = 12;
  const sx = 10;

  return (
    <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full">
      <defs>
        <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {[0.25,0.5,0.75,1].map((f,i) => (
        <line key={i} x1={0} y1={H*f} x2={W} y2={H*f} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      {data.map((v, i) => {
        const barH = (v / max) * H;
        const x = sx + i * (bw + gap);
        return (
          <g key={i}>
            <rect x={x} y={H - barH} width={bw} height={barH} rx="4" fill="url(#barGrad)" />
            <text x={x + bw/2} y={H+16} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="system-ui">{months[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Top bar ───────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
        <span className="font-medium">SUPER ADMIN</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">Platform Overview</span>
      </div>
      <div className="flex items-center gap-3">
        {/* Platform health pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ background: "#f5f3ff", color: "#7c3aed" }}>
          <div className="w-2 h-2 rounded-full bg-violet-500" style={{ animation: "pulse 2s infinite" }} />
          All systems operational
        </div>
        <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-700 leading-tight">Platform Admin</p>
            <p className="text-[9px] text-violet-500 uppercase tracking-widest font-semibold">Super Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-violet-200"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">SA</div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SuperAdminDashboard() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .card-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
        .row-hover:hover { background: #f8fafd; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.45s ease both; }
      `}</style>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <TopBar />

        <main className="flex-1 px-8 py-7 overflow-auto space-y-6 fade-in">

          {/* Heading */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Platform Overview
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">Real-time visibility across all clinics and tenants.</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #2563eb, #1e40af)", boxShadow: "0 4px 16px rgba(37,99,235,0.18)", fontFamily: "'Space Grotesk', sans-serif" }}>
              + Onboard New Clinic
            </button>
          </div>

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
            {STATS.map(({ label, value, delta, positive, color, bg, icon }, i) => (
              <div key={label}
                className="card-lift col-span-1 bg-white rounded-xl p-4 shadow-sm border-l-4 fade-in"
                style={{ borderLeftColor: color, animationDelay: `${i * 0.06}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: bg }}>{icon}</div>
                  <span className={`text-[10px] font-bold ${positive ? "text-teal-600" : "text-amber-500"}`}>
                    {positive ? "↗" : "⚠"} {delta}
                  </span>
                </div>
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">{label}</p>
                <p className="text-xl font-bold text-slate-800 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* ── Charts + Activity row ── */}
          <div className="flex gap-5">
            {/* Platform usage chart */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Platform Usage</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Total analyses across all clinics</p>
                </div>
                <div className="flex gap-1 bg-slate-50 rounded-lg p-1 border border-slate-100">
                  {(["weekly","monthly"] as const).map(v => (
                    <button key={v} onClick={() => setPeriod(v)}
                      className="px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all"
                      style={{ background: period===v ? "#2563eb" : "transparent", color: period===v ? "white" : "#94a3b8" }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <MiniBarChart />
            </div>

            {/* Recent activity */}
            <div className="w-72 bg-white rounded-xl shadow-sm p-5 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Activity</h2>
                <span className="text-[10px] text-violet-600 font-semibold cursor-pointer hover:underline">View all</span>
              </div>
              <div className="space-y-3">
                {ACTIVITY.map(({ action, target, time, type }, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: TYPE_COLOR[type] }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-600 font-medium leading-tight">{action}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{target}</p>
                    </div>
                    <span className="text-[9px] text-slate-300 shrink-0">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Clinics table ── */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">All Clinics</h2>
                <p className="text-xs text-slate-400 mt-0.5">Platform-wide clinic registry</p>
              </div>
              <button className="text-xs font-semibold text-blue-600 hover:underline">Manage all →</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: "#fafbfc" }}>
                  {["Clinic", "Plan", "Users", "Analyses", "Status", "Joined"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {CLINICS.map(({ name, plan, users, analyses, status, joined }) => (
                  <tr key={name} className="row-hover transition-colors cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                          {name.split(" ").map((w: string) => w[0]).join("").slice(0,2)}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${PLAN_STYLE[plan]}`}>{plan}</span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-600 font-medium">{users}</td>
                    <td className="px-5 py-4 text-xs text-slate-600 font-medium">{analyses.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase ${STATUS_STYLE[status]}`}>
                        {status.replace("_"," ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">{joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">DermaCare Platform · Super Admin Console</p>
          <span className="text-[10px] text-slate-300">© 2024 DermaCare</span>
        </footer>
      </div>
    </div>
  );
}