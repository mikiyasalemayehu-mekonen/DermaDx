"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, User, LogOut, Plus } from "lucide-react";
import AddUserDrawer from "./_components/userdrawer";

const CLINICIANS = [
  { username: "s_mitchell", name: "Sarah Mitchell",  email: "s.mitchell@dermacare.io", role: "DERMATOLOGIST", avatar: "SM", avatarBg: "#0f3460", status: "Active" },
  { username: "r_kapoor",   name: "Rajesh Kapoor",   email: "r.kapoor@dermacare.io",   role: "LAB TECH",      avatar: "RK", avatarBg: "#7c4a03", status: "Active" },
  { username: "e_lyon",     name: "Eleanor Lyon",    email: "e.lyon@dermacare.io",     role: "ADMIN",         avatar: "EL", avatarBg: "#374151", status: "Active" },
  { username: "t_weaver",   name: "Thomas Weaver",   email: "t.weaver@dermacare.io",   role: "DERMATOLOGIST", avatar: "TW", avatarBg: "#0f4c75", status: "Active" },
  { username: "m_okafor",   name: "Maria Okafor",    email: "m.okafor@dermacare.io",   role: "PATHOLOGIST",   avatar: "MO", avatarBg: "#1a3a2a", status: "Suspended" },
  { username: "j_chen",     name: "James Chen",      email: "j.chen@dermacare.io",     role: "DERMATOLOGIST", avatar: "JC", avatarBg: "#2d1a4a", status: "Active" },
];

const ROLE_COLORS: Record<string, string> = {
  "DERMATOLOGIST": "bg-blue-100 text-blue-700",
  "LAB TECH":      "bg-amber-100 text-amber-700",
  "ADMIN":         "bg-slate-100 text-slate-600",
  "PATHOLOGIST":   "bg-violet-100 text-violet-700",
};




 function UserManagementPage() {
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
    <div className="flex-1 flex flex-col min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .row-hover:hover { background: #f8fafd; }
        @keyframes toastIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .toast-anim { animation: toastIn 0.3s ease; }
      `}</style>


        <main className="flex-1 px-8 py-7 space-y-5 overflow-auto">
          {/* Page heading */}
          <div className="flex items-start justify-between">
            <div>

              <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Active Clinicians &amp; Staff</h1>
              <p className="text-sm text-slate-400 mt-0.5">Manage access, roles, and permissions for all registered users.</p>
            </div>
            <button
              onClick={() => setShowDrawer(true)}
              className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white shadow-md transition-all active:scale-95 hover:opacity-90 bg-blue-900"

            >
              <Plus className="w-4 h-4" />Add New User
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm px-5 py-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><Search className="w-4 h-4 text-slate-400" /></span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by username, name, or email..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 text-slate-600 placeholder:text-slate-300 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
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
                          <MoreVertical className="w-4 h-4" />
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

export default UserManagementPage;
