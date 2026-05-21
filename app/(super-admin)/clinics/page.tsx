"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getClinics, onboardClinic, suspendClinic, activateClinic, type Clinic as ClinicType } from "@/lib/api/clinics";

// ── Types & Data ──────────────────────────────────────────────────────────────
type ClinicStatus = "active" | "pending_setup" | "pending" | "suspended";
type Plan = "Enterprise" | "Professional" | "Basic";

interface Clinic {
  id: string;
  name: string;
  admin_email: string;
  license_number: string;
  department: string;
  status: ClinicStatus;
  created_at: string;
}

// Local UI interface for display enrichment
interface ClinicDisplay extends Clinic {
  adminName?: string;
  plan?: Plan;
  users?: number;
  analyses?: number;
  joined?: string;
  country?: string;
  license?: string;
}

// Clinics will be fetched from backend
const STATUS_STYLE: Record<ClinicStatus, string> = {
  active:        "bg-teal-100 text-teal-700",
  pending_setup: "bg-amber-100 text-amber-700",
  pending:       "bg-amber-100 text-amber-700",
  suspended:     "bg-rose-100 text-rose-700",
};
const PLAN_STYLE: Record<Plan, string> = {
  Enterprise:   "bg-violet-100 text-violet-700",
  Professional: "bg-blue-100 text-blue-700",
  Basic:        "bg-slate-100 text-slate-600",
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-400">
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-slate-400">
    <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ClinicsPage() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState<"all" | ClinicStatus>("all");
  const [planFilter, setPlan]     = useState<"all" | Plan>("all");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast]         = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    adminEmail: "",
    clinicName: "",
    department: "",
  });

  // Fetch clinics on mount
  useEffect(() => {
    const loadClinics = async () => {
      setLoading(true);
      try {
        const data = await getClinics();
        setClinics(data || []);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Failed to load clinics");
      } finally {
        setLoading(false);
      }
    };
    loadClinics();
  }, []);

  const handleOnboard = async () => {
    if (!formData.fullName || !formData.adminEmail || !formData.clinicName || !formData.department) {
      showToast("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const newClinic = await onboardClinic({
        full_name: formData.fullName,
        professional_email: formData.adminEmail,
        license_number: "HC-PENDING",
        clinic_name: formData.clinicName,
        department: formData.department,
      });
      setClinics([...clinics, newClinic]);
      setShowModal(false);
      setFormData({ fullName: "", adminEmail: "", clinicName: "", department: "" });
      showToast(`✓ Clinic "${formData.clinicName}" onboarded. Invitation email sent.`);
    } catch (err: any) {
      console.error(err);
      showToast(`Error: ${err?.message || "Failed to onboard clinic"}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuspend = async (clinic: Clinic) => {
    try {
      await suspendClinic(clinic.id);
      setClinics(clinics.map(c => c.id === clinic.id ? { ...c, status: "suspended" } : c));
      showToast(`${clinic.name} suspended.`);
    } catch (err: any) {
      showToast(`Error: ${err?.message || "Failed to suspend clinic"}`);
    }
  };

  const handleActivate = async (clinic: Clinic) => {
    try {
      await activateClinic(clinic.id);
      setClinics(clinics.map(c => c.id === clinic.id ? { ...c, status: "active" } : c));
      showToast(`${clinic.name} reactivated.`);
    } catch (err: any) {
      showToast(`Error: ${err?.message || "Failed to activate clinic"}`);
    }
  };

  const filtered = clinics.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.admin_email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

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
        

        <main className="flex-1 px-8 py-7 overflow-auto space-y-5 fade-in">
          {/* Heading */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Clinic Management</h1>
              <p className="text-sm text-slate-400 mt-0.5">Onboard, manage, and monitor all registered clinics on the platform.</p>
            </div>
            <button onClick={() => setShowModal(true)} disabled={loading}
              className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 4px 16px rgba(124,58,237,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}>
              + Onboard New Clinic
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border-l-4" style={{ borderLeftColor: "#7c3aed" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#f5f3ff", color: "#7c3aed" }}>📊</div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Total</p>
                <p className="text-2xl font-bold text-slate-800">{clinics.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border-l-4" style={{ borderLeftColor: "#0d9488" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#ecfdf5", color: "#0d9488" }}>✅</div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Active</p>
                <p className="text-2xl font-bold text-slate-800">{clinics.filter(c => c.status === "active").length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border-l-4" style={{ borderLeftColor: "#d97706" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fffbeb", color: "#d97706" }}>⏳</div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Pending</p>
                <p className="text-2xl font-bold text-slate-800">{clinics.filter(c => c.status === "pending").length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border-l-4" style={{ borderLeftColor: "#ef4444" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fff1f2", color: "#ef4444" }}>🚫</div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Suspended</p>
                <p className="text-2xl font-bold text-slate-800">{clinics.filter(c => c.status === "suspended").length}</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-700 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-slate-500">
              Loading clinics...
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm px-5 py-4 flex items-end gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search clinic or admin name…"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-all" />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Status</label>
              <div className="relative">
                <select value={statusFilter} onChange={e => setStatus(e.target.value as any)}
                  className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600 focus:outline-none cursor-pointer">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronIcon /></span>
              </div>
            </div>
            <div className="ml-auto text-xs text-slate-400">
              <span className="font-bold text-slate-600">{filtered.length}</span> of <span className="font-bold text-slate-600">{clinics.length}</span> clinics
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: "#fafbfc" }}>
                  {["Clinic", "Admin", "Department", "License", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(c => (
                  <tr key={c.id} className="row-hover transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                          {c.name.split(" ").map((w: string) => w[0]).join("").slice(0,2)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-700">{c.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{c.license_number}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs font-semibold text-slate-600">{c.admin_email}</p>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-600">{c.department}</td>
                    <td className="px-5 py-4 text-xs text-slate-500">{c.license_number}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase ${STATUS_STYLE[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/super-admin/clinics/${c.id}`}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-violet-200 text-violet-600 hover:bg-violet-50 transition-colors">
                          <ExternalIcon />View
                        </Link>
                        {c.status === "active" ? (
                          <button onClick={() => handleSuspend(c)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-rose-200 text-rose-500 hover:bg-rose-50 transition-colors">
                            Suspend
                          </button>
                        ) : c.status === "suspended" ? (
                          <button onClick={() => handleActivate(c)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-teal-200 text-teal-600 hover:bg-teal-50 transition-colors">
                            Reactivate
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between" style={{ background: "#fafbfc" }}>
              <p className="text-[11px] text-slate-400">Showing <span className="font-bold text-slate-600">{filtered.length}</span> clinics</p>
            </div>
          </div>
            </>
          )}
        </main>

        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">DermaDx Platform · Super Admin Console</p>
          <span className="text-[10px] text-slate-300">© 2024 DermaDx</span>
        </footer>
      </div>

      {/* Onboard modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }} onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="modal-in bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="px-7 py-5 border-b border-slate-100"
                style={{ background: "linear-gradient(135deg, #0a0f1e, #1a0d35)" }}>
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Onboard New Clinic</h2>
                <p className="text-violet-400/60 text-[10px] mt-0.5 tracking-widest uppercase">Creates a clinic admin account + sends invitation</p>
              </div>
              <div className="px-7 py-6 space-y-4">
                {[["Clinic Name", "clinicName", "Memorial Health Systems"], ["Admin Full Name", "fullName", "Dr. Jane Doe"], ["Admin Email", "adminEmail", "admin@clinic.org"], ["Department", "department", "Dermatology"]].map(([label, key, placeholder]) => (
                  <div key={key}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
                    <input placeholder={placeholder}
                      value={formData[key as keyof typeof formData]}
                      onChange={e => setFormData({...formData, [key]: e.target.value})}
                      disabled={submitting}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all disabled:opacity-50" />
                  </div>
                ))}
              </div>
              <div className="px-7 pb-6 space-y-2.5">
                <button onClick={handleOnboard} disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98] disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {submitting ? "Creating..." : "Create Clinic & Send Invitation"}
                </button>
                <button onClick={() => setShowModal(false)} disabled={submitting}
                  className="w-full py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #0a0f1e, #7c3aed)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}