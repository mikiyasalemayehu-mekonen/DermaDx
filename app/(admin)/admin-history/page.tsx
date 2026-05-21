"use client";

import { useState, useEffect } from "react";
import { Case } from "@/types";
import {
  Calendar as CalIcon,
  ChevronDown as ChevronIcon,
  Search as SearchIcon,
} from "lucide-react";
import CaseDetailPanel from "../_components/casedetail";
import ConfBar from "../_components/confbar";
import IQABadge from "../_components/iqapage";


import { getAnalyses, type AnalysisResult } from "@/lib/api/analyses";
import { getClinicians } from "@/lib/api/clinicians";

const CONDITION_COLORS: Record<string, string> = {
  Melanoma: "bg-rose-100 text-rose-700",
  Nevus: "bg-teal-100 text-teal-700",
  BCC: "bg-slate-100 text-slate-600",
  "Seborrheic K.": "bg-amber-100 text-amber-700",
  "Actinic K.": "bg-orange-100 text-orange-700",
};

function mapConfidenceColor(v: number) {
  if (v >= 95) return "#0d2444";
  if (v >= 90) return "#0d9488";
  if (v >= 80) return "#f59e0b";
  return "#ef4444";
}

const CONDITIONS = ["All Conditions", "Melanoma", "Nevus", "BCC", "Seborrheic K.", "Actinic K."];
const CLINICIANS  = ["All Staff", "Dr. Aris Thorne", "Dr. Sarah Vance", "Dr. Marcus Sterling", "Dr. Priya Anand"];

export default function AdminHistoryPage() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [condFilter, setCondFilter]     = useState("All Conditions");
  const [clinFilter, setClinFilter]     = useState("All Staff");
  const [search, setSearch]             = useState("");

  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const analyses = await getAnalyses({ limit: 100 });
        const clinicians = await getClinicians();
        const cliniciansMap = new Map<string, { full_name?: string; role?: string }>();
        clinicians.forEach((cl: any) => cliniciansMap.set(cl.id || cl._id || String(cl.user_id || ""), { full_name: cl.full_name || cl.name || "Unknown", role: cl.role || "" }));

        const mapped = (analyses as AnalysisResult[]).map((a) => {
          const clin = cliniciansMap.get(a.clinician_id) || { full_name: "Unknown", role: "" };
          const conf = Math.round((a.confidence ?? 0) * 100) / 100;
          const iqa = conf >= 75 ? "Pass" : conf >= 50 ? "Marginal" : "Fail";
          return {
            id: a.id,
            clinician: clin.full_name || "Unknown",
            clinicianRole: clin.role || "",
            condition: a.condition,
            conditionColor: CONDITION_COLORS[a.condition] || "bg-slate-100 text-slate-600",
            confidence: conf,
            confidenceColor: mapConfidenceColor(conf),
            iqa: iqa as Case["iqa"],
            date: a.date,
            skinType: "-",
            imageQuality: Math.min(100, Math.round(conf)),
            finding: a.status ? `${a.status} • Confidence ${conf}%` : `Confidence ${conf}%`,
            risk: a.risk as Case["risk"],
          } as Case;
        });

        if (mounted) setCases(mapped);
      } catch (err: any) {
        if (mounted) setError(err?.message || "Failed to load cases");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const filtered = cases.filter(c => {
    const matchCond = condFilter === "All Conditions" || c.condition === condFilter;
    const matchClin = clinFilter === "All Staff" || c.clinician === clinFilter;
    const matchSearch = search === "" || c.id.toLowerCase().includes(search.toLowerCase()) || c.clinician.toLowerCase().includes(search.toLowerCase());
    return matchCond && matchClin && matchSearch;
  });

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
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
                <CalIcon className="w-4 h-4 text-slate-400" strokeWidth={1.8} />
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
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronIcon className="w-3.5 h-3.5 text-slate-400" /></span>
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
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronIcon className="w-3.5 h-3.5 text-slate-400" /></span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1" style={{ minWidth: 180 }}>
              <label className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Search</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon className="w-4 h-4 text-slate-400" strokeWidth={1.8} /></span>
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
                Showing <span className="font-bold text-slate-600">1–{Math.min(15, filtered.length)}</span> of <span className="font-bold text-slate-600">{cases.length}</span> cases
              </p>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 text-xs">‹</button>
                {[1,2,3].map(p => (
                  <button key={p} className="w-7 h-7 rounded-lg text-xs font-bold transition-colors"
                    style={{ background: p===1 ? "#1c398e" : "#f1f5f9", color: p===1 ? "white" : "#64748b" }}>{p}</button>
                ))}
                <span className="text-slate-300 text-xs px-0.5">…</span>
                <button className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold">29</button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 text-xs">›</button>
              </div>
            </div>
          </div>
        </main>


      {selectedCase && <CaseDetailPanel c={selectedCase} onClose={() => setSelectedCase(null)} />}
    </div>
  );
}
