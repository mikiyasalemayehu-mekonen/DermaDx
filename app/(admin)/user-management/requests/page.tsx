"use client";

import { useState } from "react";
import AdminSidebar from "../../_components/sidebar";

type Status = "pending" | "approved" | "rejected";

interface Request {
  id: string;
  name: string;
  email: string;
  license: string;
  hospital: string;
  role: string;
  dept: string;
  submitted: string;
  status: Status;
  hasDoc: boolean;
  avatar: string;
  avatarBg: string;
}

const INITIAL: Request[] = [
  { id: "REQ-001", name: "Dr. Fatima Al-Rashid", email: "f.alrashid@kingsmedical.org", license: "MD-7821-KL9", hospital: "Kings Medical Centre", role: "Dermatologist",  dept: "Dermatology", submitted: "2h ago",  status: "pending",  hasDoc: true,  avatar: "FA", avatarBg: "#1a3a5c" },
  { id: "REQ-002", name: "Dr. Kwame Asante",    email: "k.asante@accrahealth.gh",     license: "MD-3310-GH4", hospital: "Accra Health Institute", role: "Pathologist",    dept: "Pathology",   submitted: "5h ago",  status: "pending",  hasDoc: true,  avatar: "KA", avatarBg: "#1a3a2a" },
  { id: "REQ-003", name: "Nina Kowalski",        email: "n.kowalski@medlab.pl",        license: "LT-9920-PL2", hospital: "Warsaw MedLab",          role: "Lab Technician", dept: "Pathology",   submitted: "1d ago",  status: "pending",  hasDoc: false, avatar: "NK", avatarBg: "#3a1a2a" },
  { id: "REQ-004", name: "Dr. Lior Ben-David",   email: "l.bendavid@hadassah.il",      license: "MD-5512-IL7", hospital: "Hadassah Medical Centre", role: "Dermatologist",  dept: "Oncology",    submitted: "2d ago",  status: "approved", hasDoc: true,  avatar: "LB", avatarBg: "#0f3460" },
  { id: "REQ-005", name: "Dr. Amara Diallo",     email: "a.diallo@clinique-dakar.sn",  license: "MD-0041-SN3", hospital: "Clinique Dakar",          role: "Dermatologist",  dept: "Dermatology", submitted: "3d ago",  status: "rejected", hasDoc: false, avatar: "AD", avatarBg: "#3a2010" },
];

const STATUS_STYLES: Record<Status, string> = {
  pending:  "bg-amber-100 text-amber-700",
  approved: "bg-teal-100 text-teal-700",
  rejected: "bg-rose-100 text-rose-700",
};

export default function PendingRequestsPage() {
  const [activeNav, setActiveNav] = useState("users");
  const [requests, setRequests]   = useState<Request[]>(INITIAL);
  const [filter, setFilter]       = useState<"all" | Status>("all");
  const [selected, setSelected]   = useState<Request | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast]         = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setActionLoading(id);
    setTimeout(() => {
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
      setActionLoading(null);
      setSelected(null);
      showToast(action === "approved" ? "✓ Activation email sent to clinician." : "Request rejected and clinician notified.");
    }, 1000);
  };

  const displayed = requests.filter(r => filter === "all" || r.status === filter);
  const pendingCount = requests.filter(r => r.status === "pending").length;

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .row-hover:hover { background: #f8fafd; }
        @keyframes slidePanel { from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1} }
        @keyframes toastIn { from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1} }
        .toast-anim { animation: toastIn 0.3s ease; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.45s ease both; }
      `}</style>

      <AdminSidebar active={activeNav} onNav={setActiveNav} />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
            <span>ADMIN</span><span className="text-slate-300">/</span>
            <span>User Management</span><span className="text-slate-300">/</span>
            <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">Access Requests</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "#fff7ed", color: "#c2410c" }}>
              <div className="w-2 h-2 rounded-full bg-amber-500" style={{ animation: "pulse 2s infinite" }} />
              {pendingCount} Pending Review
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-7 overflow-auto space-y-5 fade-in">
          {/* Heading */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Access Requests</h1>
              <p className="text-sm text-slate-400 mt-0.5">Review and approve incoming clinician access requests.</p>
            </div>
            {/* Summary badges */}
            <div className="flex gap-2">
              {([["all","All",requests.length,"#f1f5f9","#64748b"],
                 ["pending","Pending",pendingCount,"#fff7ed","#c2410c"],
                 ["approved","Approved",requests.filter(r=>r.status==="approved").length,"#f0fdf9","#0d9488"],
                 ["rejected","Rejected",requests.filter(r=>r.status==="rejected").length,"#fff1f2","#e11d48"]] as [string,string,number,string,string][]).map(([id,label,count,bg,color]) => (
                <button key={id} onClick={() => setFilter(id as any)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border"
                  style={{ background: filter===id ? color : bg, color: filter===id ? "white" : color,
                    borderColor: filter===id ? color : "transparent", boxShadow: filter===id ? `0 2px 8px ${color}40` : "none" }}>
                  {label} <span className="ml-1 opacity-70">{count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: "#fafbfc" }}>
                  {["Clinician", "Licence No.", "Institution", "Role", "Submitted", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {displayed.map(r => (
                  <tr key={r.id} className="row-hover transition-colors cursor-pointer group" onClick={() => setSelected(r)}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: r.avatarBg }}>{r.avatar}</div>
                        <div>
                          <p className="text-xs font-bold text-slate-700">{r.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{r.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{r.license}</span></td>
                    <td className="px-5 py-4"><span className="text-xs text-slate-600">{r.hospital}</span></td>
                    <td className="px-5 py-4"><span className="text-xs text-slate-600">{r.role}</span></td>
                    <td className="px-5 py-4"><span className="text-xs text-slate-400">{r.submitted}</span></td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase ${STATUS_STYLES[r.status]}`}>{r.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      {r.status === "pending" ? (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                          <button onClick={() => handleAction(r.id, "approved")}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold text-white transition-all hover:opacity-90"
                            style={{ background: "#0d9488" }}
                            disabled={actionLoading === r.id}>
                            {actionLoading === r.id ? "…" : "Approve"}
                          </button>
                          <button onClick={() => { setSelected(r); }}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold border border-rose-200 text-rose-500 hover:bg-rose-50 transition-all">
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                      )}
                    </td>
                  </tr>
                ))}
                {displayed.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-300 text-sm">No requests match this filter.</td></tr>
                )}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between" style={{ background: "#fafbfc" }}>
              <p className="text-[11px] text-slate-400">Showing <span className="font-bold text-slate-600">{displayed.length}</span> requests</p>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">For clinical decision support only. Not a diagnostic device.</p>
          <span className="text-[10px] text-slate-300">© 2023 DermaDx</span>
        </footer>
      </div>

      {/* Detail panel */}
      {selected && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(2px)" }} onClick={() => setSelected(null)} />
          <div className="fixed top-0 right-0 h-full z-50 flex flex-col bg-white shadow-2xl border-l border-slate-100 overflow-y-auto"
            style={{ width: 400, animation: "slidePanel 0.28s ease" }}>
            <div className="px-7 py-5 border-b border-slate-100 flex items-start justify-between shrink-0"
              style={{ background: "linear-gradient(135deg, #0b1f3a, #0d2a4a)" }}>
              <div>
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Request {selected.id}</h2>
                <p className="text-teal-400/60 text-[9px] tracking-[0.2em] uppercase mt-1">Clinician Access Review</p>
              </div>
              <button onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="px-7 py-6 space-y-5 flex-1">
              {/* Clinician card */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: selected.avatarBg }}>{selected.avatar}</div>
                <div>
                  <p className="font-bold text-slate-800">{selected.name}</p>
                  <p className="text-xs text-slate-400 font-mono">{selected.email}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-0 rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                {[
                  ["Medical Licence", selected.license, true],
                  ["Hospital / Clinic", selected.hospital, false],
                  ["Clinical Role", selected.role, false],
                  ["Department", selected.dept, false],
                  ["Submitted", selected.submitted, false],
                  ["Supporting Doc", selected.hasDoc ? "✓ Uploaded" : "Not provided", false],
                ].map(([k, v, mono]) => (
                  <div key={k as string} className="px-4 py-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{k}</span>
                    <span className={`text-xs font-bold text-slate-700 ${mono ? "font-mono" : ""} ${v === "✓ Uploaded" ? "text-teal-600" : v === "Not provided" ? "text-slate-400 font-normal" : ""}`}>{v as string}</span>
                  </div>
                ))}
              </div>

              {/* Status badge */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-100 bg-slate-50">
                <span className="text-xs text-slate-400 font-medium">Current Status</span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase ${STATUS_STYLES[selected.status]}`}>{selected.status}</span>
              </div>

              {/* Rejection note (only when pending) */}
              {selected.status === "pending" && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Rejection Note <span className="normal-case tracking-normal font-normal text-slate-300">(optional)</span></label>
                  <textarea value={rejectNote} onChange={e => setRejectNote(e.target.value)} rows={3}
                    placeholder="Reason for rejection (will be included in notification email)…"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-600 placeholder:text-slate-300 focus:outline-none focus:border-teal-500 resize-none transition-all" />
                </div>
              )}
            </div>

            {/* Actions */}
            {selected.status === "pending" && (
              <div className="px-7 pb-7 space-y-2.5 shrink-0">
                <button onClick={() => handleAction(selected.id, "approved")}
                  disabled={actionLoading === selected.id}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #0b1f3a, #0d7070)", boxShadow: "0 4px 16px rgba(13,112,112,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {actionLoading === selected.id
                    ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}><circle cx="12" cy="12" r="9" strokeOpacity="0.3" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" /></svg>
                    : "✓ Approve & Send Activation Email"}
                </button>
                <button onClick={() => handleAction(selected.id, "rejected")}
                  disabled={actionLoading === selected.id}
                  className="w-full py-3 rounded-xl font-semibold text-sm border border-rose-200 text-rose-500 hover:bg-rose-50 transition-all">
                  Reject Request
                </button>
                <button onClick={() => setSelected(null)} className="w-full py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #0b1f3a, #0d9488)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
