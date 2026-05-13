"use client";
import { Case } from "@/types";
import  { useState } from "react";
import {
  X as XIcon,
  TriangleAlert as AlertIcon,
  CircleCheck as CheckCircleIcon,
  FileText as PdfIcon,
  UserPlus as UserPlusIcon,
} from "lucide-react";
import DermThumb from "./dermthub";
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
            <p className="text-[10px] tracking-[0.18em] uppercase font-semibold mt-0.5 text-slate-400">Diagnostic Report (Read-Only)</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Dermoscopy image */}
        <div className="mx-5 mt-5 rounded-xl overflow-hidden shrink-0 border border-slate-100" style={{ height: 200 }}>
          <DermThumb risk={c.risk} />
        </div>

        <div className="px-6 py-5 space-y-5 flex-1">
          {/* Primary result */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-400 mb-2">Primary Analysis Result</p>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {c.condition === "Melanoma" ? "Melanoma Detected" :
                   c.condition === "Nevus"    ? "Benign Nevus"      :
                   c.condition === "BCC"      ? "BCC Suspected"     : `${c.condition} Detected`}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Model Confidence: {c.confidence}%</p>
              </div>
              {c.risk === "high" && <AlertIcon className="w-5 h-5 text-red-500" />}
              {c.risk === "medium" && (
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-500 font-bold text-sm">!</span>
                </div>
              )}
              {c.risk === "low" && (
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <CheckCircleIcon color="#00c4a8" className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-400 mb-1">Image Quality</p>
              <p className="text-sm font-bold text-teal-600">Optimal ({c.imageQuality}/100)</p>
            </div>
            <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-400 mb-1">Skin Type</p>
              <p className="text-sm font-bold text-slate-700">{c.skinType}</p>
            </div>
          </div>

          {/* Confidence visual */}
          <div className="rounded-xl p-4 bg-slate-50 border border-slate-100">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-400">Confidence Score</span>
              <span className="text-sm font-bold" style={{ color: c.confidenceColor }}>{c.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-slate-200">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${c.confidence}%`, background: `linear-gradient(90deg, ${c.confidenceColor}, ${c.confidenceColor}aa)` }} />
            </div>
          </div>

          {/* Findings */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-400 mb-2">Findings Description</p>
            <p className="text-sm text-slate-600 leading-relaxed">{c.finding}</p>
          </div>

          {/* Clinician + date */}
          <div className="rounded-xl px-4 py-3 border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[10px] font-bold text-white">
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
              <><CheckCircleIcon color="white" className="w-4 h-4" />PDF Ready — Download</>
            ) : (
              <><PdfIcon className="w-4 h-4" />Generate PDF Summary</>
            )}
          </button>
          <button className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
            <UserPlusIcon className="w-4 h-4" />Assign to Specialist
          </button>
        </div>
      </div>
    </>
  );
}

export default CaseDetailPanel;