"use client";

import { useState } from "react";
import { Case } from "@/types";
import {
  X as XIcon,
  Calendar as CalIcon,
  ChevronDown as ChevronIcon,
  Search as SearchIcon,
  User as UserIcon,
  LogOut as SignOutIcon,

} from "lucide-react";
import CaseDetailPanel from "../_components/casedetail";
import ConfBar from "../_components/confbar";
import IQABadge from "../_components/iqapage";


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

export default function AdminHistoryPage() {
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
    <div className="flex-1 flex flex-col min-h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
            <span className="font-medium">ADMIN</span>
            <span className="text-slate-300">›</span>
            <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">History</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"><UserIcon className="w-5 h-5" /></button>
            <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"><SignOutIcon className="w-5 h-5" /></button>
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
            <div className="flex-1 min-w-[180px]">
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


      {selectedCase && <CaseDetailPanel c={selectedCase} onClose={() => setSelectedCase(null)} />}
    </div>
  );
}
