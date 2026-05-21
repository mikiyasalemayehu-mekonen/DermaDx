"use client";

import { useState } from "react";
import FairnessBar from "../_components/fairnessbar";
import ModelPerformanceChart from "../_components/performanceChart";
import ConditionMixDonut from "../_components/conditionMix";
import SentimentIcon from "../_components/sentiment";
import IQAFailuresChart from "../_components/iqafailures";
import {FileDown,Bell,ExternalLink,ArrowRight} from "lucide-react";


const STATS = [
  { label: "Total Analyses",  value: "24,812", delta: "+12%",  positive: true,  icon: "🔬", iconBg: "#eef3f9", borderColor: "#0d2444" },
  { label: "IQA Rejection %", value: "4.2%",   delta: "−0.4%", positive: true,  icon: "📋", iconBg: "#fef9ec", borderColor: "#d97706" },
  { label: "Avg Confidence",  value: "94.8%",  delta: "Stable", positive: true, icon: "✅", iconBg: "#ecfdf5", borderColor: "#059669" },
  { label: "Flagged Cases",   value: "128",    delta: "+3",    positive: false,  icon: "🚩", iconBg: "#fef2f2", borderColor: "#dc2626" },
];

const FEEDBACK = [
  { name: "Dr. Julian Vance",  dept: "Unit B",   case: "#DX-99021", sentiment: "positive", comment: "Analysis was extremely accurate and well-structured." },
  { name: "Dr. Sarah Chen",    dept: "Oncology", case: "#DX-98944", sentiment: "negative", comment: "IQA rejected twice despite optimal image conditions." },
  { name: "Dr. Kwame Asante",  dept: "Derm.",    case: "#DX-98801", sentiment: "positive", comment: "Confidence score matched biopsy outcome perfectly." },
];


export default function SystemReportsPage() {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>


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
                <><FileDown className="w-4 h-4" />Export PDF</>
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
                  View Deep-Dive <ArrowRight className="w-4 h-4" />
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
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Load more */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-center">
              <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors">
                Load All Feedback <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

    </div>
  );
}
