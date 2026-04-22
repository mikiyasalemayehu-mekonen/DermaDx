"use client";

import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const CLINICIANS = [
  { username: "s_mitchell", name: "Sarah Mitchell",  email: "s.mitchell@dermadx.io", role: "DERMATOLOGIST", avatar: "SM", avatarBg: "#0f3460", status: "Active" },
  { username: "r_kapoor",   name: "Rajesh Kapoor",   email: "r.kapoor@dermadx.io",   role: "LAB TECH",      avatar: "RK", avatarBg: "#7c4a03", status: "Active" },
  { username: "e_lyon",     name: "Eleanor Lyon",    email: "e.lyon@dermadx.io",     role: "ADMIN",         avatar: "EL", avatarBg: "#374151", status: "Active" },
  { username: "t_weaver",   name: "Thomas Weaver",   email: "t.weaver@dermadx.io",   role: "DERMATOLOGIST", avatar: "TW", avatarBg: "#0f4c75", status: "Active" },
  { username: "m_okafor",   name: "Maria Okafor",    email: "m.okafor@dermadx.io",   role: "PATHOLOGIST",   avatar: "MO", avatarBg: "#1a3a2a", status: "Suspended" },
  { username: "j_chen",     name: "James Chen",      email: "j.chen@dermadx.io",     role: "DERMATOLOGIST", avatar: "JC", avatarBg: "#2d1a4a", status: "Active" },
];

const ROLE_COLORS: Record<string, string> = {
  "DERMATOLOGIST": "bg-blue-100 text-blue-700",
  "LAB TECH":      "bg-amber-100 text-amber-700",
  "ADMIN":         "bg-slate-100 text-slate-600",
  "PATHOLOGIST":   "bg-violet-100 text-violet-700",
};

const CLINICAL_ROLES = ["Dermatologist", "Lab Technician", "Pathologist", "Radiologist", "System Admin", "Nurse Practitioner"];

// ── Icons ─────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-slate-400">
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" /><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const SignOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" strokeLinecap="round" /><line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
  </svg>
);
const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" strokeLinejoin="round" />
  </svg>
);
const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <circle cx="12" cy="5" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="19" r="1" fill="currentColor" />
  </svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={1.8} className="w-4 h-4 shrink-0">
    <circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" /><line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeWidth={2.5} />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// ── Toggle component ──────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none"
      style={{ background: value ? "#0f766e" : "#d1d5db" }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: value ? "translateX(24px)" : "translateX(0)" }}
      />
    </button>
  );
}

// ── Add User Drawer ───────────────────────────────────────────────────────────
function AddUserDrawer({ onClose, onCreated }: { onClose: () => void; onCreated: (name: string) => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Dermatologist");
  const [department, setDepartment] = useState("");
  const [mfa, setMfa] = useState(true);
  const [restricted, setRestricted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit = fullName.trim().length > 2 && email.includes("@");

  const handleSubmit = () => {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => { onCreated(fullName); onClose(); }, 1400);
    }, 1200);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{ background: "rgba(10,22,40,0.45)", backdropFilter: "blur(3px)" }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col shadow-2xl"
        style={{
          width: 420,
          background: "#ffffff",
          animation: "slideIn 0.3s ease",
        }}
      >
        <style>{`
          @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          @keyframes checkPop { 0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)} }
          .check-pop { animation: checkPop 0.4s ease; }
          .input-ring:focus { outline: none; box-shadow: 0 0 0 3px rgba(13,116,110,0.12); border-color: #0d9488; }
        `}</style>

        {/* Header */}
        <div className="px-7 py-5 flex items-start justify-between shrink-0" style={{ background: "linear-gradient(135deg, #0b1f3a 0%, #0d2a4a 100%)" }}>
          <div>
            <h2 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Add New User</h2>
            <p className="text-[10px] tracking-[0.18em] uppercase mt-1" style={{ color: "rgba(0,212,180,0.6)" }}>Clinical Access Provisioning</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)") }
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)") }
          >
            <XIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
          {success ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="check-pop w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "#ecfdf5" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2.5} className="w-8 h-8">
                  <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>User Created!</p>
              <p className="text-sm text-slate-400 mt-1.5">Credentials sent to <span className="font-semibold text-slate-600">{email}</span></p>
            </div>
          ) : (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                <input
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Dr. Jane Doe"
                  className="input-ring w-full px-4 py-3 text-sm rounded-xl border text-slate-700 placeholder:text-slate-300 transition-all"
                  style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Institutional Email</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="jane.doe@hospital.org"
                  className="input-ring w-full px-4 py-3 text-sm rounded-xl border text-slate-700 placeholder:text-slate-300 transition-all"
                  style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
                />
              </div>

              {/* Role + Department */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Clinical Role</label>
                  <div className="relative">
                    <select
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="input-ring w-full appearance-none px-4 py-3 text-sm rounded-xl border text-slate-700 transition-all cursor-pointer"
                      style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
                    >
                      {CLINICAL_ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2} className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Department</label>
                  <input
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    placeholder="Oncology"
                    className="input-ring w-full px-4 py-3 text-sm rounded-xl border text-slate-700 placeholder:text-slate-300 transition-all"
                    style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
                  />
                </div>
              </div>

              {/* Auto-credentials notice */}
              <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl border" style={{ background: "#f0fdf9", borderColor: "#99f6e4" }}>
                <InfoIcon />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-teal-700 mb-0.5">Automatic Credentials</p>
                  <p className="text-xs text-teal-700/70 leading-relaxed">A temporary password and onboarding instructions will be sent to the clinician&apos;s email immediately upon creation.</p>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-1">
                {[
                  { label: "Enable MFA", desc: "Require multi-factor authentication on sign-in", value: mfa, onChange: setMfa, icon: <ShieldIcon /> },
                  { label: "Access to Restricted Records", desc: "Allow access to high-sensitivity patient records", value: restricted, onChange: setRestricted, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> },
                ].map(({ label, desc, value, onChange, icon }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#f1f5f9" }}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-slate-400">{icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>
                      </div>
                    </div>
                    <Toggle value={value} onChange={onChange} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {!success && (
          <div className="px-7 py-5 border-t space-y-2.5 shrink-0" style={{ borderColor: "#f1f5f9" }}>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
              style={{
                background: canSubmit ? "linear-gradient(135deg, #0b1f3a 0%, #0d7070 100%)" : "#e2e8f0",
                color: canSubmit ? "white" : "#94a3b8",
                cursor: canSubmit ? "pointer" : "not-allowed",
                boxShadow: canSubmit ? "0 4px 20px rgba(13,116,110,0.25)" : "none",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" strokeOpacity="0.25" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" />
                  </svg>
                  Creating User…
                </span>
              ) : "Confirm & Create User"}
            </button>
            <button onClick={onClose} className="w-full py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
              Cancel Request
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function UserManagementPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showDrawer, setShowDrawer] = useState(false);
  const [clinicians, setClinicians] = useState(CLINICIANS);
  const [toast, setToast] = useState("");

  const handleCreated = (name: string) => {
    setClinicians((currentClinicians) => [
      {
        username: name.toLowerCase().replace(/\s+/g, "_"),
        name,
        email: "",
        role: "DERMATOLOGIST",
        avatar: name
          .split(" ")
          .filter(Boolean)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        avatarBg: "#0d7070",
        status: "Active",
      },
      ...currentClinicians,
    ]);
    setToast(`${name} has been added successfully.`);
    setTimeout(() => setToast(""), 3500);
  };

  const filtered = clinicians.filter(c => {
    const matchSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.username.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || c.role === roleFilter;
    return matchSearch && matchRole;
  });

  const ROLE_OPTIONS = ["All", ...Array.from(new Set(clinicians.map(c => c.role)))];

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .row-hover:hover { background: #f8fafd; }
        @keyframes toastIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .toast-anim { animation: toastIn 0.3s ease; }
      `}</style>

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide">
            <span>ADMIN</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">User Management</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"><UserIcon /></button>
            <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"><SignOutIcon /></button>
          </div>
        </header>

        <main className="flex-1 px-8 py-7 space-y-5 overflow-auto">
          {/* Page heading */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <span>Admin</span>
                <span>›</span>
                <span className="text-slate-600 font-semibold">User Management</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Active Clinicians &amp; Staff</h1>
              <p className="text-sm text-slate-400 mt-0.5">Manage access, roles, and permissions for all registered users.</p>
            </div>
            <button
              onClick={() => setShowDrawer(true)}
              className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white shadow-md transition-all active:scale-95 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #0b1f3a 0%, #0d3260 100%)", boxShadow: "0 4px 16px rgba(11,31,58,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <PlusIcon />Add New User
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm px-5 py-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by username, name, or email..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 text-slate-600 placeholder:text-slate-300 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <FilterIcon />
              <div className="flex gap-1.5">
                {ROLE_OPTIONS.map(r => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all"
                    style={{
                      background: roleFilter === r ? "#0b1f3a" : "#f1f5f9",
                      color: roleFilter === r ? "white" : "#64748b",
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-auto text-xs text-slate-400">
              <span className="font-semibold text-slate-600">{filtered.length}</span> of <span className="font-semibold text-slate-600">{clinicians.length}</span> clinicians
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: "#fafbfc" }}>
                  {["Clinician", "Credentials", "Role", "Status", "Actions"].map(h => (
                    <th key={h} className="px-6 py-3.5 text-left text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(c => (
                  <tr key={c.username} className="row-hover transition-colors cursor-pointer group">
                    {/* Clinician */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: c.avatarBg }}>
                          {c.avatar}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-500 font-mono">{c.username}</p>
                          <p className="text-xs text-slate-700 font-semibold">{c.name}</p>
                        </div>
                      </div>
                    </td>
                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">{c.email}</td>
                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest ${ROLE_COLORS[c.role] || "bg-slate-100 text-slate-600"}`}>
                        {c.role}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.status === "Active" ? "#00c4a8" : "#f59e0b" }} />
                        <span className="text-xs text-slate-500">{c.status}</span>
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-3 py-1 text-[11px] font-semibold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">Edit</button>
                        <button className="px-3 py-1 text-[11px] font-semibold rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-50 transition-colors">Suspend</button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                          <MoreIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-14 text-center text-slate-300 text-sm">No clinicians match your search.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Table footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-between" style={{ background: "#fafbfc" }}>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest">
                Showing <span className="font-bold text-slate-600">{filtered.length}</span> of <span className="font-bold text-slate-600">28</span> clinicians
              </p>
              <div className="flex items-center gap-1">
                {[1,2,3].map(p => (
                  <button key={p} className="w-7 h-7 rounded-lg text-xs font-bold transition-colors" style={{ background: p === 1 ? "#0b1f3a" : "#f1f5f9", color: p === 1 ? "white" : "#64748b" }}>{p}</button>
                ))}
                <span className="text-slate-300 text-xs px-1">…</span>
                <button className="w-7 h-7 rounded-lg text-xs font-bold bg-slate-100 text-slate-500">7</button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">For clinical decision support only. Not a diagnostic device.</p>
          <div className="flex gap-4">
            {["Terms of Service", "Privacy Policy"].map(t => (
              <button key={t} className="text-[10px] text-slate-400 hover:text-slate-600 tracking-widest uppercase transition-colors">{t}</button>
            ))}
          </div>
        </footer>
      </div>

      {/* Drawer overlay */}
      {showDrawer && (
        <AddUserDrawer
          onClose={() => setShowDrawer(false)}
          onCreated={handleCreated}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #0b1f3a, #0d7070)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-4 h-4 shrink-0">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}
