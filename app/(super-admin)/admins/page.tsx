"use client";

import { useState } from "react";
import Link from "next/link";
import SuperAdminSidebar from "../_components/SuperAdminSidebar";

type AdminStatus = "active" | "pending_activation" | "suspended";

interface ClinicAdmin {
  id: string;
  name: string;
  email: string;
  phone: string;
  profId: string;
  clinic: string;
  clinicId: string;
  dept: string;
  status: AdminStatus;
  mfa: boolean;
  joined: string;
  lastLogin: string;
  avatar: string;
  avatarBg: string;
}

const ADMINS: ClinicAdmin[] = [
  { id: "a001", name: "Dr. Aris Thorne",    email: "a.thorne@memorial.org",   phone: "+1 555 012 3456", profId: "MD-9920-X12", clinic: "Memorial Health Systems", clinicId: "c001", dept: "Dermatology", status: "active",             mfa: true,  joined: "Jan 2023", lastLogin: "Today",     avatar: "AT", avatarBg: "#0f3460" },
  { id: "a002", name: "Dr. Sarah Mitchell", email: "s.mitchell@kings.nhs.uk", phone: "+44 20 1234 5678", profId: "MD-4412-UK9", clinic: "Kings Medical Centre",    clinicId: "c002", dept: "Oncology",    status: "active",             mfa: true,  joined: "Mar 2023", lastLogin: "Yesterday", avatar: "SM", avatarBg: "#0d3d52" },
  { id: "a003", name: "Dr. Kwame Asante",   email: "k.asante@accrahealth.gh", phone: "+233 30 222 1111", profId: "MD-3310-GH4", clinic: "Accra Health Institute",  clinicId: "c003", dept: "Pathology",   status: "pending_activation", mfa: false, joined: "Oct 2023", lastLogin: "Never",     avatar: "KA", avatarBg: "#1a3a2a" },
  { id: "a004", name: "Nina Kowalski",      email: "n.kowalski@medlab.pl",    phone: "+48 22 111 2222",  profId: "LT-9920-PL2", clinic: "Warsaw MedLab",           clinicId: "c004", dept: "Laboratory",  status: "active",             mfa: true,  joined: "Jun 2023", lastLogin: "2d ago",    avatar: "NK", avatarBg: "#3a1a2a" },
  { id: "a005", name: "Dr. Lior Ben-David", email: "l.bendavid@hadassah.il",  phone: "+972 2 677 7777",  profId: "MD-5512-IL7", clinic: "Hadassah Medical Centre", clinicId: "c005", dept: "Dermatology", status: "active",             mfa: true,  joined: "Feb 2023", lastLogin: "Today",     avatar: "LB", avatarBg: "#0f4c75" },
  { id: "a006", name: "Dr. Amara Diallo",   email: "a.diallo@dakar.sn",       phone: "+221 33 000 1111", profId: "MD-0041-SN3", clinic: "Clinique Dakar",          clinicId: "c006", dept: "Dermatology", status: "suspended",          mfa: false, joined: "Aug 2023", lastLogin: "45d ago",   avatar: "AD", avatarBg: "#3a2010" },
];

const STATUS_STYLE: Record<AdminStatus, string> = {
  active:             "bg-teal-100 text-teal-700",
  pending_activation: "bg-amber-100 text-amber-700",
  suspended:          "bg-rose-100 text-rose-700",
};

export default function AdminsPage() {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState<"all" | AdminStatus>("all");
  const [showInviteModal, setModal] = useState(false);
  const [toast, setToast]           = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const filtered = ADMINS.filter(a => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.clinic.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .row-hover:hover { background: #f8fafd; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.45s ease both; }
        @keyframes toastIn { from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1} }
        .toast-anim { animation: toastIn 0.3s ease; }
        @keyframes modalIn { from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)} }
        .modal-in { animation: modalIn 0.25s ease; }
      `}</style>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
            <span>SUPER ADMIN</span><span className="text-slate-300">/</span>
            <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">Clinic Admins</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              [ADMINS.length.toString(),                                          "Total",   "#f5f3ff", "#7c3aed"],
              [ADMINS.filter(a=>a.status==="active").length.toString(),           "Active",  "#f0fdf9", "#0d9488"],
              [ADMINS.filter(a=>a.status==="pending_activation").length.toString(),"Pending", "#fffbeb", "#d97706"],
              [ADMINS.filter(a=>!a.mfa).length.toString(),                        "No MFA",  "#fff1f2", "#e11d48"],
            ].map(([count, label, bg, color]) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: bg, color }}>
                <span className="font-black">{count}</span> {label}
              </div>
            ))}
          </div>
        </header>

        <main className="flex-1 px-8 py-7 overflow-auto space-y-5 fade-in">
          {/* Heading */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Clinic Admins</h1>
              <p className="text-sm text-slate-400 mt-0.5">Manage all clinic-level administrators across the platform.</p>
            </div>
            <button onClick={() => setModal(true)}
              className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 4px 16px rgba(124,58,237,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}>
              + Invite Clinic Admin
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm px-5 py-4 flex items-end gap-4">
            <div className="relative flex-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, clinic, or email…"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-all" />
            </div>
            <div className="flex gap-1.5">
              {(["all","active","pending_activation","suspended"] as const).map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className="px-3 py-2 rounded-lg text-[11px] font-bold transition-all"
                  style={{ background: statusFilter===s ? "#7c3aed" : "#f1f5f9", color: statusFilter===s ? "white" : "#64748b" }}>
                  {s==="all" ? "All" : s==="pending_activation" ? "Pending" : s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
            <div className="ml-auto text-xs text-slate-400">
              <span className="font-bold text-slate-600">{filtered.length}</span> of <span className="font-bold text-slate-600">{ADMINS.length}</span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: "#fafbfc" }}>
                  {["Admin", "Professional ID", "Clinic", "Department", "MFA", "Status", "Last Login", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(a => (
                  <tr key={a.id} className="row-hover transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: a.avatarBg }}>{a.avatar}</div>
                        <div>
                          <p className="text-xs font-bold text-slate-700">{a.name}</p>
                          <p className="text-[10px] text-slate-400">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{a.profId}</span></td>
                    <td className="px-5 py-4">
                      <Link href={`/clinics/${a.clinicId}`} className="text-xs font-semibold text-violet-600 hover:underline">{a.clinic}</Link>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">{a.dept}</td>
                    <td className="px-5 py-4">
                      {a.mfa ? (
                        <span className="flex items-center gap-1 text-teal-600 text-[10px] font-bold">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3"><polyline points="20 6 9 17 4 12" strokeLinecap="round" /></svg>Enabled
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-500">⚠ Disabled</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase ${STATUS_STYLE[a.status]}`}>
                        {a.status === "pending_activation" ? "Pending" : a.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">{a.lastLogin}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admins/${a.id}`}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-violet-200 text-violet-600 hover:bg-violet-50 transition-colors">
                          View
                        </Link>
                        {a.status === "pending_activation" && (
                          <button onClick={() => showToast(`Invitation resent to ${a.name}.`)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-amber-200 text-amber-600 hover:bg-amber-50 transition-colors">
                            Resend
                          </button>
                        )}
                        {a.status === "active" && (
                          <button onClick={() => showToast(`${a.name} suspended.`)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-rose-200 text-rose-500 hover:bg-rose-50 transition-colors">
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between" style={{ background: "#fafbfc" }}>
              <p className="text-[11px] text-slate-400">Showing <span className="font-bold text-slate-600">{filtered.length}</span> admins</p>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">DermaDx Platform · Super Admin Console</p>
          <span className="text-[10px] text-slate-300">© 2024 DermaDx</span>
        </footer>
      </div>

      {/* Invite modal */}
      {showInviteModal && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }} onClick={() => setModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="modal-in bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="px-7 py-5 border-b border-slate-100" style={{ background: "linear-gradient(135deg, #0a0f1e, #1a0d35)" }}>
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Invite Clinic Admin</h2>
                <p className="text-violet-400/60 text-[10px] mt-0.5 tracking-widest uppercase">Creates admin account + sends activation email</p>
              </div>
              <div className="px-7 py-6 space-y-4">
                {[["Full Name","Dr. Jane Doe"], ["Professional Email","admin@clinic.org"], ["Professional ID","MD-XXXX-XXX"], ["Assign to Clinic","Select clinic…"]].map(([label, placeholder]) => (
                  <div key={label}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
                    <input placeholder={placeholder}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 placeholder:text-slate-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all" />
                  </div>
                ))}
                <div className="px-4 py-3 rounded-xl border text-xs text-slate-500 leading-relaxed" style={{ background: "#f5f3ff", borderColor: "#ddd6fe" }}>
                  <span className="font-bold text-violet-700">Note:</span> The admin will receive an invitation email with a 72-hour activation link. MFA enrollment is required on first login.
                </div>
              </div>
              <div className="px-7 pb-6 space-y-2.5">
                <button onClick={() => { setModal(false); showToast("✓ Invitation sent to clinic admin."); }}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  Send Invitation
                </button>
                <button onClick={() => setModal(false)}
                  className="w-full py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #0a0f1e, #7c3aed)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}