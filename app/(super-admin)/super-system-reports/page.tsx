"use client";

import { useState } from "react";

// ── Stat cards ────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Platform Analyses",   value: "42,901", delta: "+5.2k this week",  positive: true,  color: "#7c3aed", bg: "#f5f3ff", icon: "🔬" },
  { label: "Active Clinics",      value: "12 / 14", delta: "2 pending setup",  positive: false, color: "#d97706", bg: "#fffbeb", icon: "🏥" },
  { label: "Avg Confidence",      value: "94.8%",  delta: "Stable across all", positive: true,  color: "#0d9488", bg: "#f0fdf9", icon: "✅" },
  { label: "IQA Rejection Rate",  value: "3.9%",   delta: "-0.3% vs last wk",  positive: true,  color: "#059669", bg: "#ecfdf5", icon: "📋" },
  { label: "Flagged Cases",       value: "241",    delta: "+18 this week",     positive: false, color: "#ef4444", bg: "#fff1f2", icon: "🚩" },
  { label: "New Users (30d)",     value: "+47",    delta: "Across 8 clinics",  positive: true,  color: "#0d2444", bg: "#f0f4ff", icon: "👤" },
];

// ── Clinic performance table data ─────────────────────────────────────────────
const CLINIC_PERF = [
  { name: "Memorial Health Systems",  analyses: 12400, confidence: 96.2, iqa: 2.1, flagged: 42,  plan: "Enterprise",   trend: "up" },
  { name: "Hadassah Medical Centre",  analyses: 18200, confidence: 95.8, iqa: 2.4, flagged: 61,  plan: "Enterprise",   trend: "up" },
  { name: "Kings Medical Centre",     analyses: 8900,  confidence: 94.1, iqa: 3.8, flagged: 29,  plan: "Professional", trend: "stable" },
  { name: "Warsaw MedLab",           analyses: 5600,  confidence: 93.7, iqa: 4.2, flagged: 24,  plan: "Professional", trend: "up" },
  { name: "Cairo Derm Institute",     analyses: 4100,  confidence: 92.9, iqa: 5.1, flagged: 18,  plan: "Professional", trend: "down" },
  { name: "Accra Health Institute",   analyses: 2100,  confidence: 91.4, iqa: 6.8, flagged: 12,  plan: "Basic",        trend: "stable" },
  { name: "Clinique Dakar",           analyses: 980,   confidence: 88.3, iqa: 9.4, flagged: 14,  plan: "Basic",        trend: "down" },
];

const PLAN_STYLE: Record<string, string> = {
  Enterprise:   "bg-violet-100 text-violet-700",
  Professional: "bg-blue-100 text-blue-700",
  Basic:        "bg-slate-100 text-slate-600",
};

// ── Fairness by clinic ────────────────────────────────────────────────────────
const FAIRNESS = [
  { label: "Type I–II",   global: 95.8, best: "Hadassah (97.1%)", worst: "Clinique Dakar (88.4%)" },
  { label: "Type III–IV", global: 93.9, best: "Memorial (96.0%)",  worst: "Accra (89.1%)" },
  { label: "Type V–VI",   global: 91.2, best: "Cairo (93.8%)",     worst: "Clinique Dakar (82.1%)" },
];

// ── IQA failure breakdown ─────────────────────────────────────────────────────
const IQA_FAILURES = [
  { label: "Blur",  value: 41, color: "#7c3aed" },
  { label: "Light", value: 30, color: "#0ea5e9" },
  { label: "Frame", value: 19, color: "#0d9488" },
  { label: "Other", value: 10, color: "#94a3b8" },
];

// ── Growth data (monthly analyses) ───────────────────────────────────────────
const GROWTH = [22, 28, 31, 27, 35, 38, 42, 39, 45, 48, 44, 52];
const MONTHS  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ── Top conditions ────────────────────────────────────────────────────────────
const CONDITIONS = [
  { label: "Melanoma",           pct: 28, color: "#ef4444" },
  { label: "Basal Cell Carc.",   pct: 22, color: "#f97316" },
  { label: "Seborrheic K.",      pct: 19, color: "#f59e0b" },
  { label: "Actinic Keratosis",  pct: 14, color: "#0d9488" },
  { label: "Dermal Nevus",       pct: 10, color: "#0d2444" },
  { label: "Other",              pct: 7,  color: "#94a3b8" },
];

// ── SVG charts ────────────────────────────────────────────────────────────────
function GrowthChart() {
  const W = 520; const H = 120;
  const max = 52;
  const bw = 30; const gap = 10;
  const sx = 8;

  return (
    <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full">
      <defs>
        <linearGradient id="growthGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {[0.33, 0.66, 1].map((f, i) => (
        <line key={i} x1={0} y1={H * f} x2={W} y2={H * f} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      {GROWTH.map((v, i) => {
        const barH = (v / max) * H;
        const x = sx + i * (bw + gap);
        return (
          <g key={i}>
            <rect x={x} y={H - barH} width={bw} height={barH} rx="4" fill="url(#growthGrad)" />
            <text x={x + bw / 2} y={H - barH - 4} textAnchor="middle" fill="#7c3aed" fontSize="8" fontWeight="700">{v}k</text>
            <text x={x + bw / 2} y={H + 15} textAnchor="middle" fill="#94a3b8" fontSize="8">{MONTHS[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function IQAChart() {
  const W = 220; const H = 120; const R = 50;
  const cx = 75; const cy = 68;
  const circumference = 2 * Math.PI * R;
  let offset = 0;

  return (
    <svg viewBox={`0 0 ${W} ${H + 10}`} className="w-full">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f1f5f9" strokeWidth="14" />
      {IQA_FAILURES.map(({ value, color }, i) => {
        const dash = (value / 100) * circumference;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={R} fill="none"
            stroke={color} strokeWidth="14"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            style={{ transform: `rotate(-90deg)`, transformOrigin: `${cx}px ${cy}px` }}
          />
        );
        offset += dash;
        return el;
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800" fontFamily="'Space Grotesk', sans-serif">3.9%</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#94a3b8" fontSize="9">Global IQA</text>
      {/* Legend */}
      {IQA_FAILURES.map(({ label, value, color }, i) => (
        <g key={label} transform={`translate(138, ${20 + i * 22})`}>
          <rect width="10" height="10" rx="2" fill={color} />
          <text x="14" y="9" fill="#64748b" fontSize="10" fontFamily="system-ui">{label}</text>
          <text x="72" y="9" fill={color} fontSize="10" fontWeight="700" fontFamily="monospace" textAnchor="end">{value}%</text>
        </g>
      ))}
    </svg>
  );
}

// ── Confidence colour helper ──────────────────────────────────────────────────
function confColor(v: number) {
  if (v >= 95) return "#0d9488";
  if (v >= 92) return "#0ea5e9";
  if (v >= 89) return "#f59e0b";
  return "#ef4444";
}
function trendIcon(t: string) {
  if (t === "up")     return <span className="text-teal-500 font-bold text-sm">↑</span>;
  if (t === "down")   return <span className="text-rose-500 font-bold text-sm">↓</span>;
  return <span className="text-slate-400 font-bold text-sm">→</span>;
}

// ── Top bar ───────────────────────────────────────────────────────────────────
function TopBar({ onExport, exporting }: { onExport: () => void; exporting: boolean }) {
  return (
    <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
        <span>SUPER ADMIN</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">System Reports</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-500" style={{ animation: "pulse 2s infinite" }} />
          Live data
        </div>
        <button onClick={onExport}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 4px 12px rgba(124,58,237,0.2)" }}>
          {exporting ? (
            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
              <circle cx="12" cy="12" r="9" strokeOpacity="0.3" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" />
            </svg>Exporting…</>
          ) : (
            <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
            </svg>Export PDF</>
          )}
        </button>
      </div>
    </header>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SuperAdminReportsPage() {
  const [period, setPeriod]     = useState<"weekly" | "monthly">("monthly");
  const [exporting, setExporting] = useState(false);
  const [sortBy, setSortBy]     = useState<"analyses" | "confidence" | "iqa">("analyses");

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  const sorted = [...CLINIC_PERF].sort((a, b) => {
    if (sortBy === "analyses")   return b.analyses - a.analyses;
    if (sortBy === "confidence") return b.confidence - a.confidence;
    return b.iqa - a.iqa;
  });

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .card-lift { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .card-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
        .row-hover:hover { background: #f8fafd; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.45s ease both; }
      `}</style>


      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* <TopBar onExport={handleExport} exporting={exporting} /> */}

        <main className="flex-1 px-8 py-7 overflow-auto space-y-6 fade-in">

          {/* Heading */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Platform Intelligence Report
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">Cross-tenant analytics — all clinics, real-time model metrics, fairness & growth.</p>
            </div>
            {/* Period toggle */}
            <div className="flex gap-1 bg-white rounded-xl p-1 border border-slate-100 shadow-sm">
              {(["weekly", "monthly"] as const).map(v => (
                <button key={v} onClick={() => setPeriod(v)}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all"
                  style={{ background: period === v ? "#7c3aed" : "transparent", color: period === v ? "white" : "#94a3b8" }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-6 gap-4">
            {STATS.map(({ label, value, delta, positive, color, bg, icon }, i) => (
              <div key={label}
                className="card-lift col-span-1 bg-white rounded-xl p-4 shadow-sm border-l-4 fade-in"
                style={{ borderLeftColor: color, animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: bg }}>{icon}</div>
                  <span className={`text-[10px] font-bold ${positive ? "text-teal-600" : "text-rose-500"}`}>
                    {positive ? "↗" : "⚠"} {delta}
                  </span>
                </div>
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">{label}</p>
                <p className="text-xl font-bold text-slate-800 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* ── Growth + IQA row ── */}
          <div className="flex gap-5">
            {/* Growth chart */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Platform Analysis Volume</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Total analyses across all clinics (thousands)</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
                  +137% YoY
                </span>
              </div>
              <GrowthChart />
            </div>

            {/* IQA donut */}
            <div className="w-72 bg-white rounded-xl shadow-sm p-6 shrink-0">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-1">IQA Failure Breakdown</h2>
              <p className="text-xs text-slate-400 mb-4">Global platform average</p>
              <IQAChart />
            </div>
          </div>

          {/* ── Clinic performance table ── */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Clinic Performance Comparison</h2>
                <p className="text-xs text-slate-400 mt-0.5">Ranked by your selected metric</p>
              </div>
              {/* Sort controls */}
              <div className="flex gap-1.5">
                {([["analyses","Volume"],["confidence","Confidence"],["iqa","IQA Rate"]] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setSortBy(key)}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all"
                    style={{ background: sortBy === key ? "#7c3aed" : "#f1f5f9", color: sortBy === key ? "white" : "#64748b" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: "#fafbfc" }}>
                  {["#", "Clinic", "Plan", "Analyses", "Avg Confidence", "IQA Reject %", "Flagged", "Trend"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sorted.map(({ name, analyses, confidence, iqa, flagged, plan, trend }, i) => (
                  <tr key={name} className="row-hover transition-colors cursor-pointer">
                    <td className="px-5 py-4">
                      <span className="text-sm font-black text-slate-300">#{i + 1}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                          {name.split(" ").map((w: string) => w[0]).join("").slice(0,2)}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${PLAN_STYLE[plan]}`}>{plan}</span>
                    </td>
                    <td className="px-5 py-4 text-xs font-bold text-slate-700">{analyses.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${confidence}%`, background: confColor(confidence) }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: confColor(confidence) }}>{confidence}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold ${iqa > 7 ? "text-rose-500" : iqa > 4 ? "text-amber-500" : "text-teal-600"}`}>
                        {iqa}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-600">{flagged}</td>
                    <td className="px-5 py-4">{trendIcon(trend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Fairness + Conditions row ── */}
          <div className="flex gap-5">
            {/* Fairness analysis */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Global Fairness Analysis</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Fitzpatrick scale performance across all clinics</p>
                </div>
                <button className="text-xs font-semibold text-violet-600 hover:underline">Clinic breakdown →</button>
              </div>
              <div className="space-y-5">
                {FAIRNESS.map(({ label, global, best, worst }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-slate-700">{label}</span>
                      <span className="text-sm font-bold" style={{ color: confColor(global) }}>{global}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${global}%`, background: confColor(global) }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>🏆 Best: <span className="font-semibold text-teal-600">{best}</span></span>
                      <span>⚠ Lowest: <span className="font-semibold text-rose-400">{worst}</span></span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Colour legend */}
              <div className="flex items-center gap-5 mt-5 pt-4 border-t border-slate-50">
                {[["#0d9488","≥95% Excellent"],["#0ea5e9","≥92% Good"],["#f59e0b","≥89% Fair"],["#ef4444","<89% Watch"]].map(([color, label]) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                    <span className="text-[10px] text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Condition mix */}
            <div className="w-72 bg-white rounded-xl shadow-sm p-6 shrink-0">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-1">Top Conditions</h2>
              <p className="text-xs text-slate-400 mb-5">Platform-wide diagnosis distribution</p>
              <div className="space-y-3">
                {CONDITIONS.map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-600">{label}</span>
                      <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Stacked bar */}
              <div className="mt-5 h-3 rounded-full overflow-hidden flex">
                {CONDITIONS.map(({ label, pct, color }) => (
                  <div key={label} className="h-full" style={{ width: `${pct}%`, background: color }} title={`${label}: ${pct}%`} />
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-2">42,901 total analyses</p>
            </div>
          </div>

          {/* ── Model health ── */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Global Model Health</h2>
                <p className="text-xs text-slate-400 mt-0.5">v4.2.1-prod deployed to all 12 active tenants</p>
              </div>
              <span className="text-[9px] font-bold px-2 py-1 rounded-full text-white" style={{ background: "#0d9488" }}>STABLE</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                ["MAP Score",      "0.942",  "#7c3aed"],
                ["Precision",      "96.8%",  "#0d9488"],
                ["Recall",         "92.1%",  "#0d2444"],
                ["F1 Score",       "0.944",  "#0ea5e9"],
              ].map(([label, value, color]) => (
                <div key={label as string} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-2">{label}</p>
                  <p className="text-2xl font-black" style={{ fontFamily: "'Space Grotesk', sans-serif", color: color as string }}>{value}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Validation set</p>
                </div>
              ))}
            </div>

            {/* Fairness per type — thin bars */}
            <div className="mt-5 pt-5 border-t border-slate-50 grid grid-cols-3 gap-4">
              {[["Type I–II", 95.8], ["Type III–IV", 93.9], ["Type V–VI", 91.2]].map(([label, val]) => (
                <div key={label as string}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium">{label}</span>
                    <span className="font-bold" style={{ color: confColor(val as number) }}>{val}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${val as number}%`, background: confColor(val as number) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>

        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">DermaCare Platform · Super Admin Console</p>
          <div className="flex gap-4">
            {["Terms", "Privacy"].map(t => (
              <button key={t} className="text-[10px] text-slate-400 hover:text-slate-600 tracking-widest uppercase transition-colors">{t}</button>
            ))}
            <span className="text-[10px] text-slate-300">© 2024 DermaCare</span>
          </div>
        </footer>
      </div>
    </div>
  );
}