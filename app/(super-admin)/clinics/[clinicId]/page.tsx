"use client";

import { useState } from "react";
import Link from "next/link";

// In real app: fetch by params.clinicId from FastAPI
// import { useParams } from "next/navigation";

const CLINIC = {
  id: "c001",
  name: "Memorial Health Systems",
  license: "HC-US-77210",
  country: "USA",
  plan: "Enterprise",
  status: "active" as const,
  joined: "Jan 15, 2023",
  address: "1400 Pelham Pkwy S, Bronx, NY 10461",
  website: "memorial-health.org",
  specialties: ["Dermatology", "Oncology", "Pathology"],
  admin: { name: "Dr. Aris Thorne", email: "a.thorne@memorial.org", phone: "+1 (555) 012-3456", id: "MD-9920-X12" },
  stats: { users: 48, analyses: 12400, avgConfidence: 94.8, iqaRejectRate: 3.1, lastActivity: "2 mins ago" },
};

const USERS = [
  { name: "Dr. Sarah Mitchell", role: "Dermatologist", email: "s.mitchell@memorial.org", status: "active",    lastLogin: "Today" },
  { name: "Dr. Thomas Weaver",  role: "Dermatologist", email: "t.weaver@memorial.org",   status: "active",    lastLogin: "Yesterday" },
  { name: "Dr. James Chen",     role: "Pathologist",   email: "j.chen@memorial.org",     status: "active",    lastLogin: "2d ago" },
  { name: "Rajesh Kapoor",      role: "Lab Tech",      email: "r.kapoor@memorial.org",   status: "active",    lastLogin: "Today" },
  { name: "Eleanor Lyon",       role: "Admin",         email: "e.lyon@memorial.org",     status: "suspended", lastLogin: "14d ago" },
];

const TABS = ["Overview", "Users", "Usage", "Audit Log"];

export default function ClinicDetailPage() {
  const [tab, setTab]           = useState("Overview");
  const [suspended, setSuspended] = useState(false);
  const [toast, setToast]       = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .row-hover:hover { background: #f8fafd; }
        @keyframes toastIn { from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1} }
        .toast-anim { animation: toastIn 0.3s ease; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.45s ease both; }
      `}</style>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
            <span>SUPER ADMIN</span><span className="text-slate-300">/</span>
            <Link href="/clinics" className="hover:text-violet-600 transition-colors cursor-pointer">Clinics</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-bold text-[11px]">{CLINIC.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setSuspended(!suspended); showToast(suspended ? "✓ Clinic reactivated." : "Clinic suspended."); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${suspended ? "border-teal-200 text-teal-600 hover:bg-teal-50" : "border-rose-200 text-rose-500 hover:bg-rose-50"}`}>
              {suspended ? "Reactivate Clinic" : "Suspend Clinic"}
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-7 overflow-auto space-y-5 fade-in">
          {/* Clinic header */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                {CLINIC.name.split(" ").map((w: string) => w[0]).join("").slice(0,2)}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{CLINIC.name}</h1>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase ${suspended ? "bg-rose-100 text-rose-700" : "bg-teal-100 text-teal-700"}`}>
                    {suspended ? "Suspended" : CLINIC.status}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-violet-100 text-violet-700">{CLINIC.plan}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{CLINIC.address} · {CLINIC.country}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] text-slate-400 font-mono">{CLINIC.license}</span>
                  <span className="text-slate-200">·</span>
                  <span className="text-[10px] text-slate-400">Joined {CLINIC.joined}</span>
                  <span className="text-slate-200">·</span>
                  <span className="text-[10px] text-slate-400">{CLINIC.website}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">Specialties:</span>
              {CLINIC.specialties.map(s => (
                <span key={s} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-600">{s}</span>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-5 gap-4">
            {[
              ["Total Users",     CLINIC.stats.users,            "#7c3aed"],
              ["Analyses",        CLINIC.stats.analyses.toLocaleString(), "#0d9488"],
              ["Avg Confidence",  `${CLINIC.stats.avgConfidence}%`, "#0d2444"],
              ["IQA Reject Rate", `${CLINIC.stats.iqaRejectRate}%`, "#d97706"],
              ["Last Activity",   CLINIC.stats.lastActivity,     "#64748b"],
            ].map(([label, value, color]) => (
              <div key={label as string} className="bg-white rounded-xl p-4 shadow-sm border-l-4" style={{ borderLeftColor: color as string }}>
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mb-1">{label}</p>
                <p className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif", color: color as string }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100 px-6">
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="px-4 py-4 text-sm font-semibold border-b-2 transition-all"
                  style={{ borderColor: tab===t ? "#7c3aed" : "transparent", color: tab===t ? "#7c3aed" : "#94a3b8" }}>
                  {t}
                </button>
              ))}
            </div>

            {tab === "Overview" && (
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Clinic admin */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Clinic Admin</p>
                  <div className="rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                    {[["Name", CLINIC.admin.name], ["Email", CLINIC.admin.email], ["Phone", CLINIC.admin.phone], ["Professional ID", CLINIC.admin.id]].map(([k,v]) => (
                      <div key={k} className="flex justify-between px-4 py-3">
                        <span className="text-xs text-slate-400">{k}</span>
                        <span className="text-xs font-semibold text-slate-700">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Actions */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Admin Actions</p>
                  <div className="space-y-2">
                    {[
                      ["Resend Admin Invitation", "#7c3aed"],
                      ["Change Subscription Plan", "#0d2444"],
                      ["Download Audit Report",    "#0d9488"],
                      ["Reset Admin Password",     "#d97706"],
                    ].map(([label, color]) => (
                      <button key={label as string} onClick={() => showToast(`${label} triggered.`)}
                        className="w-full px-4 py-3 rounded-xl border text-sm font-semibold text-left transition-all hover:opacity-80"
                        style={{ borderColor: `${color}30`, color, background: `${color}08` }}>
                        {label} →
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "Users" && (
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#fafbfc" }}>
                    {["Name", "Role", "Email", "Status", "Last Login"].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold border-b border-slate-100">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {USERS.map(u => (
                    <tr key={u.name} className="row-hover transition-colors">
                      <td className="px-5 py-3.5 text-xs font-semibold text-slate-700">{u.name}</td>
                      <td className="px-5 py-3.5"><span className="text-[10px] font-bold px-2 py-1 rounded-md bg-blue-50 text-blue-600">{u.role}</span></td>
                      <td className="px-5 py-3.5 text-xs text-slate-400 font-mono">{u.email}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase ${u.status==="active" ? "bg-teal-100 text-teal-700" : "bg-rose-100 text-rose-700"}`}>{u.status}</span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-400">{u.lastLogin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === "Usage" && (
              <div className="p-6 text-center py-16">
                <p className="text-slate-300 text-sm">Usage analytics chart — connect to FastAPI endpoint</p>
                <p className="text-slate-200 text-xs mt-1">GET /api/clinics/{"{clinicId}"}/analytics</p>
              </div>
            )}

            {tab === "Audit Log" && (
              <div className="p-6 text-center py-16">
                <p className="text-slate-300 text-sm">Audit log — connect to FastAPI endpoint</p>
                <p className="text-slate-200 text-xs mt-1">GET /api/clinics/{"{clinicId}"}/audit-log</p>
              </div>
            )}
          </div>
        </main>

        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">DermaDx Platform · Super Admin Console</p>
          <span className="text-[10px] text-slate-300">© 2024 DermaDx</span>
        </footer>
      </div>

      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #0a0f1e, #7c3aed)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}