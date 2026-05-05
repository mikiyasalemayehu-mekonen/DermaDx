"use client";

import { useState } from "react";
import AdminSidebar from "../_components/sidebar";
import {} from "lucide-react";
// ── Icons ─────────────────────────────────────────────────────────────────────
const ExportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const SignOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" strokeLinecap="round" />
    <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Stat cards data ───────────────────────────────────────────────────────────
const STATS = [
  { label: "Total Analyses",  value: "24,812", delta: "+12%",  positive: true,  icon: "🔬", iconBg: "#eef3f9", borderColor: "#0d2444" },
  { label: "IQA Rejection %", value: "4.2%",   delta: "−0.4%", positive: true,  icon: "📋", iconBg: "#fef9ec", borderColor: "#d97706" },
  { label: "Avg Confidence",  value: "94.8%",  delta: "Stable", positive: true, icon: "✅", iconBg: "#ecfdf5", borderColor: "#059669" },
  { label: "Flagged Cases",   value: "128",    delta: "+3",    positive: false,  icon: "🚩", iconBg: "#fef2f2", borderColor: "#dc2626" },
];

// ── Model performance SVG line chart ─────────────────────────────────────────
function ModelPerformanceChart() {
  const W = 560; const H = 200;
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];

  // Smooth sinusoidal-like confidence & IQA paths
  const confidence = [
    [0, 130], [80, 100], [160, 60], [240, 90], [320, 55], [400, 80], [W, 40],
  ];
  const iqaPass = [
    [0, 155], [80, 145], [160, 130], [240, 120], [320, 125], [400, 118], [W, 110],
  ];

  const toPath = (pts: number[][]) =>
    pts.map(([x, y], i) => `${i === 0 ? "M" : "C"} ${x},${y}`).join(" ");

  // Cubic smooth path
  const smooth = (pts: number[][]): string => {
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx1 = prev[0] + (curr[0] - prev[0]) / 3;
      const cpy1 = prev[1];
      const cpx2 = curr[0] - (curr[0] - prev[0]) / 3;
      const cpy2 = curr[1];
      d += ` C ${cpx1},${cpy1} ${cpx2},${cpy2} ${curr[0]},${curr[1]}`;
    }
    return d;
  };

  const confPath = smooth(confidence);
  const iqaPath  = smooth(iqaPass);

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full">
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map((f, i) => (
        <line key={i} x1={0} y1={H * f} x2={W} y2={H * f} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      {/* IQA area fill */}
      <path
        d={`${iqaPath} L ${W},${H} L 0,${H} Z`}
        fill="url(#iqaGrad)" opacity="0.15"
      />
      {/* Confidence area fill */}
      <path
        d={`${confPath} L ${W},${H} L 0,${H} Z`}
        fill="url(#confGrad)" opacity="0.1"
      />
      <defs>
        <linearGradient id="confGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0d2444" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0d2444" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="iqaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00c4a8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00c4a8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* IQA line (dashed teal) */}
      <path d={iqaPath} fill="none" stroke="#00c4a8" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
      {/* Confidence line (solid navy) */}
      <path d={confPath} fill="none" stroke="#0d2444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots on confidence */}
      {confidence.filter((_, i) => i % 2 === 0).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="white" stroke="#0d2444" strokeWidth="2" />
      ))}
      {/* Month labels */}
      {months.map((m, i) => (
        <text key={m} x={(W / (months.length - 1)) * i} y={H + 22} textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">{m}</text>
      ))}
    </svg>
  );
}

// ── Condition mix donut ───────────────────────────────────────────────────────
function ConditionMixDonut() {
  const slices = [
    { label: "Common",      pct: 82, color: "#0d2444" },
    { label: "Acne",        pct: 42, color: "#ef4444" },
    { label: "Derm.",       pct: 28, color: "#00c4a8" },
    { label: "Other",       pct: 18, color: "#94a3b8" },
  ];

  // Draw arcs for first donut (big one showing 82%)
  const R = 54; const cx = 75; const cy = 75;
  const circumference = 2 * Math.PI * R;
  const gap = 2;

  const total = 100;
  const mainPct = 82;
  const dashMain = (mainPct / 100) * circumference;
  const gapMain  = circumference - dashMain;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative" style={{ width: 150, height: 150 }}>
        <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
          {/* Background ring */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f1f5f9" strokeWidth="14" />
          {/* Main arc — navy 82% */}
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke="#0d2444"
            strokeWidth="14"
            strokeDasharray={`${dashMain} ${gapMain}`}
            strokeLinecap="round"
          />
          {/* Teal accent arc — starts at ~60% mark */}
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke="#00c4a8"
            strokeWidth="10"
            strokeDasharray={`${(42 / 100) * circumference * 0.5} ${circumference}`}
            strokeDashoffset={-dashMain * 0.6}
            strokeLinecap="round"
          />
          {/* Red accent */}
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke="#ef4444"
            strokeWidth="8"
            strokeDasharray={`${(28 / 100) * circumference * 0.4} ${circumference}`}
            strokeDashoffset={-dashMain * 0.3}
            strokeLinecap="round"
          />
        </svg>
        {/* Centre text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>82%</span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Common</span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-3">
        {[["#ef4444","Acne","42%"],["#00c4a8","Derm.","28%"]].map(([color,label,pct]) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-[11px] text-slate-500">{label}</span>
            <span className="text-[11px] font-bold text-slate-700">{pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── IQA Failures bar chart (SVG) ──────────────────────────────────────────────
function IQAFailuresChart() {
  const categories = [
    { label: "Blur",  value: 42, color: "#0d2444" },
    { label: "Light", value: 31, color: "#0ea5e9" },
    { label: "Frame", value: 18, color: "#00c4a8" },
    { label: "Other", value: 9,  color: "#94a3b8" },
  ];
  const max = 42; const W = 260; const H = 100;
  const bw = 36; const gap = 22;
  const totalW = categories.length * (bw + gap) - gap;
  const sx = (W - totalW) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full">
      {[0.5, 1].map((f, i) => (
        <line key={i} x1={0} y1={H * f} x2={W} y2={H * f} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      {categories.map(({ label, value, color }, i) => {
        const barH = (value / max) * H;
        const x = sx + i * (bw + gap);
        const y = H - barH;
        return (
          <g key={label}>
            <defs>
              <linearGradient id={`iqa-${i}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={color} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <rect x={x} y={H} width={bw} height={0} rx="4" fill={`url(#iqa-${i})`}>
              <animate attributeName="y" from={H} to={y} dur="0.6s" begin={`${i * 0.1}s`} fill="freeze" />
              <animate attributeName="height" from={0} to={barH} dur="0.6s" begin={`${i * 0.1}s`} fill="freeze" />
            </rect>
            <text x={x + bw / 2} y={y - 5} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{value}%</text>
            <text x={x + bw / 2} y={H + 18} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Fairness bar ──────────────────────────────────────────────────────────────
function FairnessBar({ label, pct }: { label: string; pct: number }) {
  const color = pct >= 95 ? "#00c4a8" : pct >= 92 ? "#0ea5e9" : "#f59e0b";
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
        />
      </div>
    </div>
  );
}

// ── Feedback table ────────────────────────────────────────────────────────────
const FEEDBACK = [
  { name: "Dr. Julian Vance",  dept: "Unit B",   case: "#DX-99021", sentiment: "positive", comment: "Analysis was extremely accurate and well-structured." },
  { name: "Dr. Sarah Chen",    dept: "Oncology", case: "#DX-98944", sentiment: "negative", comment: "IQA rejected twice despite optimal image conditions." },
  { name: "Dr. Kwame Asante",  dept: "Derm.",    case: "#DX-98801", sentiment: "positive", comment: "Confidence score matched biopsy outcome perfectly." },
];

function SentimentIcon({ sentiment }: { sentiment: string }) {
  return sentiment === "positive" ? (
    <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2} className="w-4 h-4">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 13s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
    </div>
  ) : (
    <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} className="w-4 h-4">
        <circle cx="12" cy="12" r="9" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" strokeLinecap="round" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SystemReportsPage() {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .card-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
        .row-hover:hover { background: #f8fafd; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        .fade-in { animation: fadeUp 0.5s ease both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide">
            <span>ADMIN</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">System Reports</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            {/* Doctor info */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-700 leading-tight">Dr. Aris Thorne</p>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest">System Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-teal-200">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <rect width="32" height="32" fill="#ccf0eb" />
                  <circle cx="16" cy="12" r="6" fill="#5eead4" />
                  <ellipse cx="16" cy="26" rx="10" ry="7" fill="#5eead4" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-8 py-7 overflow-auto space-y-5">

          {/* Heading + Export */}
          <div className="flex items-start justify-between fade-in">
            <div>
              <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                System Intelligence Report
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">Real-time clinical model metrics and diagnostic accuracy oversight.</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all active:scale-95 hover:opacity-90"
              style={{ background: "#00c4a8", boxShadow: "0 4px 16px rgba(0,196,168,0.3)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {exporting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
                    <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" />
                  </svg>
                  Exporting…
                </>
              ) : (
                <><ExportIcon />Export PDF</>
              )}
            </button>
          </div>

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-4 gap-4">
            {STATS.map(({ label, value, delta, positive, icon, iconBg, borderColor }, i) => (
              <div
                key={label}
                className="card-lift bg-white rounded-xl p-5 border-l-4 shadow-sm fade-in"
                style={{ borderLeftColor: borderColor, animationDelay: `${i * 0.07}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: iconBg }}>
                    {icon}
                  </div>
                  <span className={`text-xs font-bold flex items-center gap-0.5 ${positive ? "text-teal-600" : "text-rose-500"}`}>
                    {positive ? "↗" : "△"}{delta}
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1">{label}</p>
                <p className="text-[26px] font-bold text-slate-800 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* ── Charts row ── */}
          <div className="flex gap-5">
            {/* Model Performance */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Model Performance Matrix</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Confidence vs IQA Pass Rate</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-0.5 bg-slate-800" />
                    <span className="text-[10px] text-slate-500 font-medium">Confidence</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-0.5 border-t-2 border-dashed border-teal-500" />
                    <span className="text-[10px] text-slate-500 font-medium">IQA Pass</span>
                  </div>
                </div>
              </div>
              <ModelPerformanceChart />
            </div>

            {/* Condition Mix */}
            <div className="w-64 bg-white rounded-xl shadow-sm p-6 flex flex-col shrink-0">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Condition Mix</h2>
              <div className="flex-1 flex items-center justify-center">
                <ConditionMixDonut />
              </div>
            </div>
          </div>

          {/* ── Fairness + IQA row ── */}
          <div className="flex gap-5">
            {/* Fairness Analysis */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Fairness Analysis</h2>
                <button className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                  View Deep-Dive <ArrowRightIcon />
                </button>
              </div>
              <div className="space-y-4">
                <FairnessBar label="Type I–II"   pct={96} />
                <FairnessBar label="Type III–IV" pct={94} />
                <FairnessBar label="Type V–VI"   pct={93} />
              </div>
              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-4">
                {[["#00c4a8","≥95% Excellent"],["#0ea5e9","≥92% Good"],["#f59e0b","<92% Watch"]].map(([color, label]) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-[10px] text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* IQA Failures */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-5">IQA Failures</h2>
              <IQAFailuresChart />
              <div className="mt-3 pt-3 border-t border-slate-50 grid grid-cols-4 gap-2 text-center">
                {[["Blur","42%","#0d2444"],["Light","31%","#0ea5e9"],["Frame","18%","#00c4a8"],["Other","9%","#94a3b8"]].map(([label, pct, color]) => (
                  <div key={label}>
                    <p className="text-xs font-bold" style={{ color }}>{pct}</p>
                    <p className="text-[10px] text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Recent Clinician Feedback ── */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Recent Clinician Feedback</h2>
                <p className="text-xs text-slate-400 mt-0.5">Sentiment analysis across recent case submissions</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg" style={{ background: "#f1f5f9", color: "#64748b" }}>
                Last 10 Entries
              </span>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: "#fafbfc" }}>
                  {["Clinician", "Case", "Sent.", "Comments", "Action"].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {FEEDBACK.map((row, i) => (
                  <tr key={i} className="row-hover transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-700">{row.name}</p>
                      <p className="text-[10px] text-slate-400">{row.dept}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-semibold text-slate-500">{row.case}</span>
                    </td>
                    <td className="px-6 py-4">
                      <SentimentIcon sentiment={row.sentiment} />
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-slate-500 truncate">{row.comment}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-teal-600 transition-colors">
                        <ExternalLinkIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Load more */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-center">
              <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors">
                Load All Feedback <ArrowRightIcon />
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">For clinical decision support only. Not a diagnostic device.</p>
          <div className="flex gap-4">
            {["Terms", "Privacy"].map(t => (
              <button key={t} className="text-[10px] text-slate-400 hover:text-slate-600 tracking-widest uppercase transition-colors">{t}</button>
            ))}
            <span className="text-[10px] text-slate-300">© 2023 DermaDx</span>
          </div>
        </footer>
    </div>
  );
}
