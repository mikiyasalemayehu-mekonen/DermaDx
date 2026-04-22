"use client";

import { useState } from "react";
import AdminSidebar from "../_components/sidebar";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Case {
  id: string;
  clinician: string;
  clinicianRole: string;
  condition: string;
  conditionColor: string;
  confidence: number;
  confidenceColor: string;
  iqa: "Pass" | "Marginal" | "Fail";
  date: string;
  skinType: string;
  imageQuality: number;
  finding: string;
  risk: "high" | "medium" | "low";
}

// ── Data ──────────────────────────────────────────────────────────────────────
const CASES: Case[] = [
  {
    id: "#DX-8291", clinician: "Dr. Aris Thorne",    clinicianRole: "Chief Dermatologist",
    condition: "Melanoma", conditionColor: "bg-rose-100 text-rose-700",
    confidence: 94, confidenceColor: "#0d2444",
    iqa: "Pass", date: "Oct 24, 2023", skinType: "Fitzpatrick IV",
    imageQuality: 98,
    finding: "Lesion exhibits significant irregular pigment distribution and peripheral globule formation. AI detection indicates a high probability score for early-stage superficial spreading melanoma. Clinical correlation and immediate biopsy are strongly recommended.",
    risk: "high",
  },
  {
    id: "#DX-8290", clinician: "Dr. Sarah Vance",    clinicianRole: "Dermatologist",
    condition: "Nevus", conditionColor: "bg-teal-100 text-teal-700",
    confidence: 81, confidenceColor: "#00c4a8",
    iqa: "Pass", date: "Oct 24, 2023", skinType: "Fitzpatrick II",
    imageQuality: 91,
    finding: "Symmetric melanocytic nevus with uniform pigment network. No atypical features detected. Routine monitoring recommended at 12-month intervals. Patient should be advised on dermoscopic self-check practices.",
    risk: "low",
  },
  {
    id: "#DX-8289", clinician: "Dr. Marcus Sterling", clinicianRole: "Consultant",
    condition: "BCC", conditionColor: "bg-slate-100 text-slate-600",
    confidence: 62, confidenceColor: "#f59e0b",
    iqa: "Marginal", date: "Oct 23, 2023", skinType: "Fitzpatrick III",
    imageQuality: 67,
    finding: "Possible basal cell carcinoma with arborizing vessels observed. Image quality flagged as marginal due to partial out-of-focus regions. Re-imaging recommended before finalising diagnosis.",
    risk: "medium",
  },
  {
    id: "#DX-8288", clinician: "Dr. Aris Thorne",    clinicianRole: "Chief Dermatologist",
    condition: "Melanoma", conditionColor: "bg-rose-100 text-rose-700",
    confidence: 98, confidenceColor: "#0d2444",
    iqa: "Pass", date: "Oct 23, 2023", skinType: "Fitzpatrick V",
    imageQuality: 99,
    finding: "Nodular melanoma with high-confidence detection. Asymmetric structure, multiple colours, and irregular border noted. Urgent surgical referral warranted. Case escalated to oncology team.",
    risk: "high",
  },
  {
    id: "#DX-8287", clinician: "Dr. Priya Anand",    clinicianRole: "Senior Clinician",
    condition: "Seborrheic K.", conditionColor: "bg-amber-100 text-amber-700",
    confidence: 87, confidenceColor: "#00c4a8",
    iqa: "Pass", date: "Oct 22, 2023", skinType: "Fitzpatrick I",
    imageQuality: 95,
    finding: "Classic seborrheic keratosis with milia-like cysts and comedo-like openings. Benign lesion. No clinical intervention required. Patient reassured.",
    risk: "low",
  },
  {
    id: "#DX-8286", clinician: "Dr. Sarah Vance",    clinicianRole: "Dermatologist",
    condition: "Actinic K.", conditionColor: "bg-orange-100 text-orange-700",
    confidence: 78, confidenceColor: "#f59e0b",
    iqa: "Pass", date: "Oct 22, 2023", skinType: "Fitzpatrick II",
    imageQuality: 88,
    finding: "Actinic keratosis with scaly surface texture and erythematous base. Pre-malignant lesion detected. Cryotherapy or topical treatment recommended. Follow-up in 6 weeks.",
    risk: "medium",
  },
];

const CONDITIONS = ["All Conditions", "Melanoma", "Nevus", "BCC", "Seborrheic K.", "Actinic K."];
const CLINICIANS  = ["All Staff", "Dr. Aris Thorne", "Dr. Sarah Vance", "Dr. Marcus Sterling", "Dr. Priya Anand"];

// ── Icons ─────────────────────────────────────────────────────────────────────
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
  </svg>
);
const CalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-400">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" /><line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" />
  </svg>
);
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-slate-400">
    <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-400">
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
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
    <polyline points="16 17 21 12 16 7" strokeLinecap="round" /><line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
  </svg>
);
const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="#ef4444" className="w-5 h-5">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth={1.8} strokeLinecap="round" />
    <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth={2.5} strokeLinecap="round" />
  </svg>
);
const CheckCircleIcon = ({ color = "#00c4a8" }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} className="w-4 h-4">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PdfIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
  </svg>
);
const UserPlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" strokeLinecap="round" /><line x1="23" y1="11" x2="17" y2="11" strokeLinecap="round" />
  </svg>
);

// ── Dermoscopy SVG thumbnail ───────────────────────────────────────────────────
function DermThumb({ risk }: { risk: string }) {
  const baseColor   = risk === "high" ? "#3d1010" : risk === "medium" ? "#2a1a0a" : "#0a1f2a";
  const midColor    = risk === "high" ? "#7a2020" : risk === "medium" ? "#5a3010" : "#1a4a2a";
  const coreColor   = risk === "high" ? "#c03030" : risk === "medium" ? "#8a5010" : "#2a7a4a";
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <rect width="300" height="200" fill="#050a10" />
      <radialGradient id={`dg-${risk}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1a0505" /><stop offset="100%" stopColor="#050a10" />
      </radialGradient>
      <rect width="300" height="200" fill={`url(#dg-${risk})`} />
      <circle cx="150" cy="100" r="80" fill={baseColor} opacity="0.9" />
      <circle cx="150" cy="100" r="60" fill={midColor} opacity="0.85" />
      <circle cx="150" cy="100" r="40" fill={coreColor} opacity="0.8" />
      <circle cx="138" cy="88" r="18" fill={risk === "high" ? "#e05050" : "#888"} opacity="0.7" />
      <circle cx="162" cy="112" r="12" fill={risk === "high" ? "#c02020" : "#555"} opacity="0.6" />
      {/* Vessel network */}
      {risk === "high" && (
        <>
          <line x1="100" y1="70"  x2="200" y2="130" stroke="#ff6060" strokeWidth="1" opacity="0.3" />
          <line x1="110" y1="130" x2="190" y2="70"  stroke="#ff6060" strokeWidth="1" opacity="0.25" />
          <line x1="80"  y1="100" x2="220" y2="100" stroke="#ff4444" strokeWidth="0.8" opacity="0.2" />
        </>
      )}
      {/* Targeting reticle */}
      <rect x="90" y="50" width="120" height="100" rx="3" fill="none"
        stroke={risk === "high" ? "#ff6060" : risk === "medium" ? "#fbbf24" : "#00d4b4"}
        strokeWidth="1.2" strokeDasharray="5 3" opacity="0.7" />
      {[[90,50],[210,50],[90,150],[210,150]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5"
          fill={risk === "high" ? "#ff6060" : risk === "medium" ? "#fbbf24" : "#00d4b4"} opacity="0.9" />
      ))}
    </svg>
  );
}

// ── Confidence bar ────────────────────────────────────────────────────────────
function ConfBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-sm font-bold text-slate-700">{value}%</span>
    </div>
  );
}

// ── IQA badge ─────────────────────────────────────────────────────────────────
function IQABadge({ iqa }: { iqa: string }) {
  const styles: Record<string, string> = {
    Pass:     "text-teal-600",
    Marginal: "text-amber-500",
    Fail:     "text-rose-500",
  };
  return (
    <div className={`flex items-center gap-1 ${styles[iqa] || "text-slate-500"}`}>
      <CheckCircleIcon color={iqa === "Pass" ? "#00c4a8" : iqa === "Marginal" ? "#f59e0b" : "#ef4444"} />
      <span className="text-xs font-bold">{iqa}</span>
    </div>
  );
}

// ── Case Detail Panel ─────────────────────────────────────────────────────────
function CaseDetailPanel({ c, onClose }: { c: Case; onClose: () => void }) {
  const [generating, setGenerating] = useState(false);
  const [generated,  setGenerated]  = useState(false);

  const handlePdf = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1800);
  };

  return (
    <>
      {/* Backdrop (mobile / narrow) */}
      <div className="fixed inset-0 z-30 lg:hidden" style={{ background: "rgba(0,0,0,0.3)" }} onClick={onClose} />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full z-40 flex flex-col bg-white shadow-2xl border-l border-slate-100 overflow-y-auto"
        style={{ width: 380, animation: "slidePanel 0.28s ease" }}
      >
        <style>{`
          @keyframes slidePanel { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
        `}</style>

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Case {c.id}
            </h2>
            <p className="text-[9px] tracking-[0.2em] uppercase font-semibold mt-0.5 text-slate-400">Diagnostic Report (Read-Only)</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <XIcon />
          </button>
        </div>

        {/* Dermoscopy image */}
        <div className="mx-5 mt-5 rounded-xl overflow-hidden shrink-0 border border-slate-100" style={{ height: 200 }}>
          <DermThumb risk={c.risk} />
        </div>

        <div className="px-6 py-5 space-y-5 flex-1">
          {/* Primary result */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-slate-400 mb-2">Primary Analysis Result</p>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {c.condition === "Melanoma" ? "Melanoma Detected" :
                   c.condition === "Nevus"    ? "Benign Nevus"      :
                   c.condition === "BCC"      ? "BCC Suspected"     : `${c.condition} Detected`}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Model Confidence: {c.confidence}%</p>
              </div>
              {c.risk === "high" && <AlertIcon />}
              {c.risk === "medium" && (
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-500 font-bold text-sm">!</span>
                </div>
              )}
              {c.risk === "low" && (
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <CheckCircleIcon color="#00c4a8" />
                </div>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-100">
              <p className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 mb-1">Image Quality</p>
              <p className="text-sm font-bold text-teal-600">Optimal ({c.imageQuality}/100)</p>
            </div>
            <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-100">
              <p className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 mb-1">Skin Type</p>
              <p className="text-sm font-bold text-slate-700">{c.skinType}</p>
            </div>
          </div>

          {/* Confidence visual */}
          <div className="rounded-xl p-4 bg-slate-50 border border-slate-100">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">Confidence Score</span>
              <span className="text-sm font-bold" style={{ color: c.confidenceColor }}>{c.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-slate-200">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${c.confidence}%`, background: `linear-gradient(90deg, ${c.confidenceColor}, ${c.confidenceColor}aa)` }} />
            </div>
          </div>

          {/* Findings */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-slate-400 mb-2">Findings Description</p>
            <p className="text-sm text-slate-600 leading-relaxed">{c.finding}</p>
          </div>

          {/* Clinician + date */}
          <div className="rounded-xl px-4 py-3 border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#0d2444] flex items-center justify-center text-[10px] font-bold text-white">
                {c.clinician.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">{c.clinician.toUpperCase()}</p>
                <p className="text-[9px] text-slate-400">{c.clinicianRole}</p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">{c.date}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 space-y-2.5 shrink-0">
          <button
            onClick={handlePdf}
            className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white transition-all active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #0b1f3a 0%, #0d3260 100%)", boxShadow: "0 4px 16px rgba(11,31,58,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {generating ? (
              <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}><circle cx="12" cy="12" r="9" strokeOpacity="0.3" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" /></svg>Generating…</>
            ) : generated ? (
              <><CheckCircleIcon color="white" />PDF Ready — Download</>
            ) : (
              <><PdfIcon />Generate PDF Summary</>
            )}
          </button>
          <button className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
            <UserPlusIcon />Assign to Specialist
          </button>
        </div>
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminHistoryPage() {
  const [activeNav, setActiveNav]       = useState("history");
  const [selectedCase, setSelectedCase] = useState<Case | null>(CASES[0]);
  const [condFilter, setCondFilter]     = useState("All Conditions");
  const [clinFilter, setClinFilter]     = useState("All Staff");
  const [search, setSearch]             = useState("");

  const filtered = CASES.filter(c => {
    const matchCond = condFilter === "All Conditions" || c.condition === condFilter;
    const matchClin = clinFilter === "All Staff" || c.clinician === clinFilter;
    const matchSearch = search === "" || c.id.toLowerCase().includes(search.toLowerCase()) || c.clinician.toLowerCase().includes(search.toLowerCase());
    return matchCond && matchClin && matchSearch;
  });

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .row-hover:hover { background: #f8fafd; }
        .row-selected { background: #f0f4ff; border-left: 3px solid #0d2444; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.45s ease both; }
      `}</style>

      <AdminSidebar active={activeNav} onNav={setActiveNav} />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
            <span className="font-medium">ADMIN</span>
            <span className="text-slate-300">›</span>
            <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">History</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"><UserIcon /></button>
            <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"><SignOutIcon /></button>
          </div>
        </header>

        <main className="flex-1 px-8 py-7 overflow-auto space-y-5 fade-in">
          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              System Analysis History
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">Monitor and audit diagnostic performance across the clinical network.</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm px-5 py-4 flex items-end gap-4 flex-wrap">
            {/* Date range */}
            <div>
              <label className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Date Range</label>
              <div className="flex items-center gap-2 px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer hover:border-slate-300 transition-colors">
                <CalIcon />
                <span className="text-sm text-slate-600 font-medium">Oct 01 – Oct 24, 2023</span>
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Condition</label>
              <div className="relative">
                <select value={condFilter} onChange={e => setCondFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600 focus:outline-none cursor-pointer">
                  {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronIcon /></span>
              </div>
            </div>

            {/* Clinician */}
            <div>
              <label className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Clinician</label>
              <div className="relative">
                <select value={clinFilter} onChange={e => setClinFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600 focus:outline-none cursor-pointer">
                  {CLINICIANS.map(c => <option key={c}>{c}</option>)}
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronIcon /></span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Search</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by case ID or clinician…"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: "#fafbfc" }}>
                  {["Case ID", "Clinician", "Condition", "Confidence", "IQA Result", "Date"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(c => {
                  const isSelected = selectedCase?.id === c.id;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCase(isSelected ? null : c)}
                      className={`cursor-pointer transition-colors ${isSelected ? "row-selected" : "row-hover"}`}
                      style={isSelected ? { borderLeft: "3px solid #0d2444", background: "#f0f6ff" } : {}}
                    >
                      <td className="px-5 py-4">
                        <span className="font-bold text-xs text-slate-700 font-mono">{c.id}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs font-semibold text-slate-700">{c.clinician}</p>
                        <p className="text-[10px] text-slate-400">{c.clinicianRole}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${c.conditionColor}`}>
                          {c.condition}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <ConfBar value={c.confidence} color={c.confidenceColor} />
                      </td>
                      <td className="px-5 py-4">
                        <IQABadge iqa={c.iqa} />
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400">{c.date}</td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-300 text-sm">No cases match your filters.</td></tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between" style={{ background: "#fafbfc" }}>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest">
                Showing <span className="font-bold text-slate-600">1–15</span> of <span className="font-bold text-slate-600">432</span> cases
              </p>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 text-xs">‹</button>
                {[1,2,3].map(p => (
                  <button key={p} className="w-7 h-7 rounded-lg text-xs font-bold transition-colors"
                    style={{ background: p===1 ? "#0b1f3a" : "#f1f5f9", color: p===1 ? "white" : "#64748b" }}>{p}</button>
                ))}
                <span className="text-slate-300 text-xs px-0.5">…</span>
                <button className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold">29</button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 text-xs">›</button>
              </div>
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

      {/* Case detail panel */}
      {selectedCase && <CaseDetailPanel c={selectedCase} onClose={() => setSelectedCase(null)} />}
    </div>
  );
}
