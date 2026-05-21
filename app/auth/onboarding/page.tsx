"use client";

import { useState } from "react";

type Step = "hipaa" | "role" | "done";

export default function OnboardingPage() {
  const [step, setStep]           = useState<Step>("hipaa");
  const [agreed, setAgreed]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [roleConfirmed, setRoleConfirmed] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 20) setScrolled(true);
  };

  const proceed = (next: Step) => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(next); }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.45s ease both; }
        @keyframes checkPop { 0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)} }
        .check-pop { animation: checkPop 0.4s ease; }
        .hipaa-scroll::-webkit-scrollbar { width: 4px; }
        .hipaa-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
      `}</style>

      <div className="w-full max-w-xl fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">D</span>
            </div>
            <span className="font-bold text-lg text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>DermaCare</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            {[["1", "Terms & HIPAA"], ["2", "Confirm Role"], ["3", "Access Ready"]].map(([num, label], i) => {
              const idx = step === "hipaa" ? 0 : step === "role" ? 1 : 2;
              return (
                <div key={num} className="flex items-center gap-1.5">
                  {i > 0 && <div className="w-8 h-px bg-slate-200" />}
                  <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      i < idx ? "bg-teal-500 text-white" : i === idx ? "bg-[#0d2444] text-white" : "bg-slate-200 text-slate-400"
                    }`}>{i < idx ? "✓" : num}</div>
                    <span className={`text-xs font-medium hidden sm:block ${i === idx ? "text-slate-700" : "text-slate-400"}`}>{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── HIPAA Step ── */}
        {step === "hipaa" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-7 py-5 border-b border-slate-100" style={{ background: "linear-gradient(135deg, #0b1f3a 0%, #0d2a4a 100%)" }}>
              <h2 className="text-white font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Clinical Data Agreement</h2>
              <p className="text-teal-400/60 text-xs mt-1 tracking-wide uppercase">HIPAA Compliance & Terms of Use — Read-required</p>
            </div>

            <div onScroll={handleScroll}
              className="hipaa-scroll overflow-y-auto px-7 py-5 text-xs text-slate-500 leading-relaxed space-y-4"
              style={{ maxHeight: 280 }}>
              <p><span className="font-bold text-slate-700">1. Nature of the Platform.</span> DermaCare is a clinical decision support tool designed for use by licensed healthcare professionals. It is not a standalone diagnostic device and does not replace clinical judgement.</p>
              <p><span className="font-bold text-slate-700">2. HIPAA Compliance.</span> As a user of DermaCare, you acknowledge that you may encounter protected health information (PHI) during your use of the platform. You agree to handle all such information in compliance with the Health Insurance Portability and Accountability Act (HIPAA) and any applicable state laws.</p>
              <p><span className="font-bold text-slate-700">3. Data Security.</span> You are responsible for maintaining the confidentiality of your account credentials. You must not share access with any other individual. Any breach of security must be reported to your institution's admin immediately.</p>
              <p><span className="font-bold text-slate-700">4. Clinical Responsibility.</span> AI-generated analysis results are intended to assist, not replace, clinical decision-making. Final diagnostic decisions remain the sole responsibility of the licensed clinician.</p>
              <p><span className="font-bold text-slate-700">5. Audit & Logging.</span> All actions performed within DermaCare are logged for compliance and audit purposes. These logs may be reviewed by your institution's compliance officers.</p>
              <p><span className="font-bold text-slate-700">6. Data Retention.</span> Patient images and analysis reports are retained according to your institution's configured retention policy. You may not export or transmit PHI outside of approved channels.</p>
              <p><span className="font-bold text-slate-700">7. Acceptable Use.</span> You agree not to use DermaCare for any purpose other than legitimate clinical assessment within your authorised scope of practice.</p>
              <p className="text-slate-400 italic">By ticking the checkbox below, you confirm you have read and understood these terms in their entirety.</p>
            </div>

            {!scrolled && (
              <div className="mx-7 mb-4 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 shrink-0">
                  <path d="M12 5v8M12 17h.01" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                Please scroll to the bottom to continue
              </div>
            )}

            <div className="px-7 py-5 border-t border-slate-100 space-y-4">
              <label className={`flex items-start gap-3 cursor-pointer ${!scrolled ? "opacity-40 pointer-events-none" : ""}`}>
                <button type="button" onClick={() => setAgreed(!agreed)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all shrink-0 ${
                    agreed ? "bg-[#0d2444] border-[#0d2444]" : "border-slate-300 bg-white"
                  }`}>
                  {agreed && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3"><polyline points="20 6 9 17 4 12" strokeLinecap="round" /></svg>}
                </button>
                <span className="text-sm text-slate-600 leading-relaxed">
                  I have read, understood, and agree to the <span className="font-semibold text-slate-800">DermaCare Clinical Terms of Use</span> and confirm I will handle all patient data in accordance with <span className="font-semibold text-slate-800">HIPAA regulations</span>.
                </span>
              </label>

              <button onClick={() => proceed("role")} disabled={!agreed || loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ background: agreed ? "linear-gradient(135deg, #0b1f3a, #0d3260)" : "#e2e8f0",
                  color: agreed ? "white" : "#94a3b8", cursor: agreed ? "pointer" : "not-allowed",
                  fontFamily: "'Space Grotesk', sans-serif" }}>
                {loading ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}><circle cx="12" cy="12" r="9" strokeOpacity="0.3" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" /></svg>
                  : "I Agree — Continue →"}
              </button>
            </div>
          </div>
        )}

        {/* ── Role Confirmation ── */}
        {step === "role" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Confirm your access profile</h2>
              <p className="text-sm text-slate-400 mt-1">Review the role and permissions assigned to your account by your admin.</p>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3" style={{ background: "#f8fafc" }}>
                <div className="w-10 h-10 rounded-full bg-[#0d2444] flex items-center justify-center text-white font-bold text-sm">AT</div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Dr. Aris Thorne</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Your account identity</p>
                </div>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  ["Assigned Role",  "Dermatologist",          "bg-blue-100 text-blue-700"],
                  ["Department",     "Oncology",               null],
                  ["Institution",    "Memorial Health Systems", null],
                  ["Access Level",   "Clinical (Standard)",    null],
                  ["Professional ID","MD-9920-X12",            null],
                ].map(([k, v, badge]) => (
                  <div key={k as string} className="px-5 py-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{k}</span>
                    {badge ? (
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${badge}`}>{v}</span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-700">{v}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-3.5 rounded-xl border text-xs text-slate-500 leading-relaxed"
              style={{ background: "#f0fdf9", borderColor: "#99f6e4" }}>
              <span className="font-bold text-teal-700">Note:</span> If your role or department is incorrect, contact your system admin before proceeding. Role changes require admin re-provisioning.
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <button type="button" onClick={() => setRoleConfirmed(!roleConfirmed)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all shrink-0 ${
                  roleConfirmed ? "bg-teal-500 border-teal-500" : "border-slate-300 bg-white"
                }`}>
                {roleConfirmed && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3"><polyline points="20 6 9 17 4 12" strokeLinecap="round" /></svg>}
              </button>
              <span className="text-sm text-slate-600">I confirm that the above profile accurately reflects my clinical role and institutional affiliation.</span>
            </label>

            <button onClick={() => proceed("done")} disabled={!roleConfirmed || loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ background: roleConfirmed ? "#0d9488" : "#e2e8f0", color: roleConfirmed ? "white" : "#94a3b8",
                cursor: roleConfirmed ? "pointer" : "not-allowed", boxShadow: roleConfirmed ? "0 4px 16px rgba(13,148,136,0.25)" : "none",
                fontFamily: "'Space Grotesk', sans-serif" }}>
              {loading ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}><circle cx="12" cy="12" r="9" strokeOpacity="0.3" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" /></svg>
                : "Confirm & Enter DermaCare →"}
            </button>
          </div>
        )}

        {/* ── Done ── */}
        {step === "done" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center space-y-5">
            <div className="check-pop w-20 h-20 rounded-full mx-auto flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0b1f3a, #0d9488)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-10 h-10">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>You're all set, Dr. Thorne</h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">Onboarding complete. Your clinical dashboard is ready.</p>
            </div>
            <button className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #0b1f3a, #0d3260)", boxShadow: "0 4px 16px rgba(11,31,58,0.2)", fontFamily: "'Space Grotesk', sans-serif" }}>
              Enter Clinical Portal →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
