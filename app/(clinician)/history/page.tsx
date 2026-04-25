"use client";

import { useState } from "react";
import Link from "next/link";

import {ChevronRight ,EyeIcon,Plus,Bell,Download,Calendar,SlidersVertical,ChevronLeft,ChevronDown,Search} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface HistoryRow {
  id: string;
  condition: string;
  risk: string;
  riskColor: string;
  confidence: number;
  barColor: string;
  date: string;
  status: string;
  statusStyle: string;
  imgColors: [string, string, string];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const HISTORY_DATA: HistoryRow[] = [
  { id: "DX-8842-A", condition: "Melanoma (Superficial)",  risk: "HIGH RISK",        riskColor: "text-rose-500",  confidence: 94, barColor: "bg-rose-500",  date: "Oct 24, 2023", status: "REVIEWED",    statusStyle: "bg-teal-100 text-teal-700",  imgColors: ["#1a2a3a", "#2a3f55", "#3a5570"] },
  { id: "DX-8839-B", condition: "Seborrheic Keratosis",    risk: "BENIGN POTENTIAL", riskColor: "text-teal-600",  confidence: 88, barColor: "bg-teal-500",  date: "Oct 23, 2023", status: "PRELIMINARY", statusStyle: "bg-gray-100 text-gray-600",   imgColors: ["#0d1b2a", "#1a2f45", "#253d52"] },
  { id: "DX-8835-C", condition: "Dermal Nevus",            risk: "MONITORING",       riskColor: "text-gray-400",  confidence: 72, barColor: "bg-gray-400",  date: "Oct 21, 2023", status: "REVIEWED",    statusStyle: "bg-teal-100 text-teal-700",  imgColors: ["#151f2b", "#1e2f40", "#283d52"] },
  { id: "DX-8812-F", condition: "Basal Cell Carcinoma",    risk: "HIGH RISK",        riskColor: "text-rose-500",  confidence: 91, barColor: "bg-rose-500",  date: "Oct 19, 2023", status: "REVIEWED",    statusStyle: "bg-teal-100 text-teal-700",  imgColors: ["#0a1520", "#142030", "#1d2f42"] },
];

const CONDITIONS  = ["All Conditions", "Melanoma", "Seborrheic Keratosis", "Dermal Nevus", "Basal Cell Carcinoma", "Actinic Keratosis"];
const DATE_RANGES = ["Last 30 Days", "Last 60 Days", "Last 90 Days", "Last 6 Months", "All Time"];
const TABLE_HEADS = ["Case ID", "Analysis View", "Suspected Condition", "Confidence", "Date Submitted", "Status", "Actions"];

// ── Sub-components ────────────────────────────────────────────────────────────

function DermThumb({ colors }: { colors: [string, string, string] }) {
  const [a, b, c] = colors;
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <rect width="48" height="48" fill={a} />
      <circle cx="24" cy="24" r="18" fill={b} opacity="0.8" />
      <circle cx="24" cy="24" r="11" fill={c} opacity="0.9" />
      <circle cx="21" cy="21" r="4"  fill="#000" opacity="0.5" />
      <circle cx="28" cy="27" r="2.5" fill="#000" opacity="0.35" />
    </svg>
  );
}

function Select({ label, value, options, onChange, icon }: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="min-w-[160px]">
      <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none pl-3 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 cursor-pointer"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon ?? <ChevronDown className="w-4 h-4"     />}
        </span>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HistoryPage() {
  const [search,     setSearch]     = useState("");
  const [condition,  setCondition]  = useState("All Conditions");
  const [threshold,  setThreshold]  = useState(85);
  const [dateRange,  setDateRange]  = useState("Last 30 Days");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = HISTORY_DATA.filter((r) => {
    const matchSearch = search === "" || r.id.toLowerCase().includes(search.toLowerCase());
    const matchCond   = condition === "All Conditions" || r.condition.toLowerCase().includes(condition.toLowerCase());
    return matchSearch && matchCond && r.confidence >= threshold;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fb]">
      {/* Custom top bar with doctor info */}
      <header className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between shrink-0">
        <nav className="flex items-center gap-1.5 text-sm text-gray-400">
          <span className="hover:text-[#0f2744] cursor-pointer transition-colors text-xs">Home</span>
          <ChevronRight  className="w-3.5 h-3.5" />
          <span className="text-[#0f2744] font-bold uppercase tracking-wide text-[11px]">History</span>
        </nav>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors relative">
            <Bell />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
            <div className="text-right">
              <p className="text-xs font-bold text-[#0f2744] leading-tight">Dr. Aris Thorne</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Chief Dermatologist</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden border-2 border-teal-300">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <rect width="36" height="36" fill="#b2dfdb" />
                <circle cx="18" cy="14" r="7" fill="#80cbc4" />
                <ellipse cx="18" cy="30" rx="11" ry="8" fill="#80cbc4" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-7 overflow-auto space-y-5">
        {/* Heading */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0f2744]">Analysis History</h1>
            <p className="text-sm text-gray-500 mt-0.5">Review and manage clinical dermatological assessments.</p>
          </div>
          <Link
            href="/upload"
            className="flex items-center gap-2 bg-[#0f2744] hover:bg-[#1a3d6b] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4"/> New Case Analysis
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm px-6 py-5">
          <div className="flex items-end gap-5 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Search Case ID</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search className="w-4 h-4"/></span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. DX-9921"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 focus:border-[#0f2744]/30 transition-all"
                />
              </div>
            </div>

            <Select label="Condition Filter" value={condition} options={CONDITIONS} onChange={setCondition} />

            {/* Confidence threshold */}
            <div className="min-w-[200px] flex-1">
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">
                Confidence Threshold
                <span className="ml-2 bg-teal-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">{threshold}%+</span>
              </label>
              <input
                type="range" min={0} max={100} value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-1.5 accent-teal-500 cursor-pointer"
              />
            </div>

            <Select label="Date Range" value={dateRange} options={DATE_RANGES} onChange={setDateRange} icon={<Calendar  className="w-4 h-4" strokeWidth={1.8} />} />

            <button className="w-9 h-9 border border-gray-200 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors shrink-0">
              <SlidersVertical className="w-4 h-4 stroke-2" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {TABLE_HEADS.map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No analyses match your filters.</td>
                </tr>
              ) : filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[#f8fafd] transition-colors group">
                  <td className="px-5 py-4">
                    <span className="font-bold text-[#0f2744] text-xs">{row.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                      <DermThumb colors={row.imgColors} />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-800 text-sm leading-tight">{row.condition}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${row.riskColor}`}>{row.risk}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${row.barColor}`} style={{ width: `${row.confidence}%` }} />
                      </div>
                      <span className="text-sm font-bold text-gray-700">{row.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{row.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${row.statusStyle}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors" title="View">
                        <EyeIcon/>
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors" title="Download">
                        <Download className="w-4 h-4"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing <span className="font-semibold text-[#0f2744]">1 – 10</span> of{" "}
              <span className="font-semibold text-[#0f2744]">48</span> analyses
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === p ? "bg-[#0f2744] text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs">…</span>
              <button
                onClick={() => setCurrentPage(5)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                  currentPage === 5 ? "bg-[#0f2744] text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                5
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5"  />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
