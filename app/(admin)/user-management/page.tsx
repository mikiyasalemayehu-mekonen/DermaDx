"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter, MoreVertical, User, LogOut, Plus } from "lucide-react";
import AddUserDrawer from "./_components/userdrawer";
import {
  getClinicians,
  inviteClinician,
  updateClinician,
  deactivateClinician,
} from "../../../lib/api/clinicians";

type UIClinician = {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  avatarBg: string;
  status: string;
};

// clinicians will be loaded from the API

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
  const [clinicians, setClinicians] = useState<UIClinician[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const fetchClinicians = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getClinicians();
      const mapped = data.map((c: any) => ({
        id: c.id,
        username: (c.email || c.full_name || "").split("@")[0].toLowerCase(),
        name: c.full_name,
        email: c.email,
        role: (c.role || "").toUpperCase(),
        avatar: (c.full_name || c.email || "").split(" ").map((p: string) => p[0]).join("").slice(0,2).toUpperCase(),
        avatarBg: "#0d7070",
        status: c.status === "active" ? "Active" : c.status === "inactive" ? "Suspended" : c.status,
      }));
      setClinicians(mapped);
    } catch (err: any) {
      setToast(err?.message || "Failed to load clinicians");
      setTimeout(() => setToast(""), 3500);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClinicians();
  }, [fetchClinicians]);

  const handleCreated = () => {
    setToast("User invite sent.");
    setTimeout(() => setToast(""), 3500);
    fetchClinicians();
  };

  const handleSuspend = async (id: string) => {
    try {
      await deactivateClinician(id);
      setToast("User suspended.");
      fetchClinicians();
    } catch (err: any) {
      setToast(err?.message || "Failed to suspend user");
    }
    setTimeout(() => setToast(""), 3000);
  };

  const handleEdit = async (id: string) => {
    const newRole = window.prompt("Enter new role (e.g. DERMATOLOGIST):");
    if (!newRole) return;
    try {
      await updateClinician(id, { role: newRole });
      setToast("User updated.");
      fetchClinicians();
    } catch (err: any) {
      setToast(err?.message || "Failed to update user");
    }
    setTimeout(() => setToast(""), 3000);
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
              className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white shadow-md transition-all active:scale-95 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #0b1f3a 0%, #0d3260 100%)", boxShadow: "0 4px 16px rgba(11,31,58,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Plus className="w-4 h-4" />Add New User
            </button>
          </div>

          {/* Summary cards (moved from header) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border-l-4" style={{ borderLeftColor: "#7c3aed" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#f5f3ff", color: "#7c3aed" }}>📊</div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Total</p>
                <p className="text-2xl font-bold text-slate-800">{clinicians.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border-l-4" style={{ borderLeftColor: "#0d9488" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#ecfdf5", color: "#0d9488" }}>✅</div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Active</p>
                <p className="text-2xl font-bold text-slate-800">{clinicians.filter(c => c.status === "Active").length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border-l-4" style={{ borderLeftColor: "#d97706" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fffbeb", color: "#d97706" }}>⏳</div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Pending</p>
                <p className="text-2xl font-bold text-slate-800">{clinicians.filter(c => c.status === "Pending").length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border-l-4" style={{ borderLeftColor: "#ef4444" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#fff1f2", color: "#ef4444" }}>🔒</div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">No MFA</p>
                <p className="text-2xl font-bold text-slate-800">N/A</p>
                <p className="text-xs text-slate-400 mt-1">(requires backend field)</p>
              </div>
            </div>
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
                        <button onClick={() => handleEdit(c.id)} className="px-3 py-1 text-[11px] font-semibold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">Edit</button>
                        <button onClick={() => handleSuspend(c.id)} className="px-3 py-1 text-[11px] font-semibold rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-50 transition-colors">Suspend</button>
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
