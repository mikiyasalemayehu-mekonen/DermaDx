"use client";

import { UploadCloud as LucideUploadIcon, Database as LucideDatabaseIcon } from "lucide-react";
import Section from "../../_components/section";

export default function ModelPage() {
  return (
    <Section title="Model Management" id="model"
      action={
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #0b1f3a, #0d3260)", boxShadow: "0 4px 12px rgba(11,31,58,0.2)" }}>
          <LucideUploadIcon className="w-4 h-4" />Request Model Update
        </button>
      }>
      <div className="rounded-xl border-l-4 border-teal-500 bg-slate-50 p-5 flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Active Version</p>
          <p className="text-3xl font-black text-slate-800 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>v4.2.1-prod</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#0d9488" }}>STABLE</span>
            <span className="text-[10px] text-slate-400">Deployed 12-Oct</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-2">Core Performance Metrics (Validation Set)</p>
          <div className="flex gap-6">
            {[["0.942","MAP"],["96.8%","Precision"],["92.1%","Recall"]].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{val}</p>
                <p className="text-[9px] uppercase tracking-widest text-slate-400">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 px-5 py-4 rounded-xl border border-slate-200 bg-white">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <LucideDatabaseIcon className="w-4 h-4 text-slate-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-700">Training Dataset: GlobalDerm_v8</p>
          <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
            Includes 142k verified clinical images across 8 demographic clusters.
            Bias check passed (p &lt; 0.05) on 01-Nov-2023.
          </p>
        </div>
        <span className="shrink-0 text-[9px] font-bold px-2 py-1 rounded-full" style={{ background: "#ecfdf5", color: "#059669" }}>Validated</span>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Fitzpatrick Fairness Scores</p>
        {[["Type I–II", 96], ["Type III–IV", 94], ["Type V–VI", 91]].map(([label, val]) => (
          <div key={label as string}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-600 font-medium">{label}</span>
              <span className="font-bold text-teal-600">{val}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-teal-500 transition-all duration-700" style={{ width: `${val as number}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
