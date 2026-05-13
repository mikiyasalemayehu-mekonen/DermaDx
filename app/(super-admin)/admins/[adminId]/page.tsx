"use client";

import { useState } from "react";
import Link from "next/link";
import SuperAdminSidebar from "../../_components/SuperAdminSidebar";

// In real app: const params = useParams(); fetch by params.adminId
const ADMIN = {
  id: "a001",
  name: "Dr. Aris Thorne",
  email: "a.thorne@memorial.org",
  phone: "+1 (555) 012-3456",
  profId: "MD-9920-X12",
  dept: "Dermatology",
  clinic: "Memorial Health Systems",
  clinicId: "c001",
  country: "USA",
  status: "active" as "active" | "pending_activation" | "suspended",
  mfa: true,
  joined: "January 15, 2023",
  lastLogin: "Today, 14:35",
  activatedAt: "January 16, 2023",
  avatar: "AT",
  avatarBg: "#0f3460",
  plan: "Enterprise",
  loginCount: 284,
  teamSize: 48,
  analysesManaged: 12400,
};

const AUDIT_LOG = [
  { action: "Invited clinician",     target: "Dr. Sarah Mitchell",  time: "Oct 24, 2023 · 14:22", type: "invite" },
  { action: "Updated system config", target: "IQA Threshold → 0.45", time: "Oct 22, 2023 · 09:11", type: "config" },
  { action: "Suspended user",        target: "Eleanor Lyon",         time: "Oct 18, 2023 · 16:44", type: "alert" },
  { action: "Exported audit report", target: "Monthly Clinical Audit", time: "Oct 15, 2023 · 11:30", type: "export" },
  { action: "Resent invitation",     target: "Dr. James Chen",       time: "Oct 10, 2023 · 08:55", type: "invite" },
  { action: "Changed MFA setting",   target: "Enabled TOTP",         time: "Oct 05, 2023 · 17:01", type: "security" },
];

const TYPE_COLOR: Record<string, string> = {
  invite:   "#7c3aed",
  config:   "#0d9488",
  alert:    "#ef4444",
  export:   "#0d2444",
  security: "#d97706",
};

const TABS = ["Profile", "Activity", "Permissions", "Security"];

// ── Icons ─────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AdminDetailPage() {
  const [tab, setTab]             = useState("Profile");
  const [status, setStatus]       = useState(ADMIN.status);
  const [mfa, setMfa]             = useState(ADMIN.mfa);
  const [toast, setToast]         = useState("");
  const [confirmModal, setConfirm] = useState<null | "suspend" | "reset" | "resend">(null);
  const [actionLoading, setLoading] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (confirmModal === "suspend") {
        setStatus(status === "active" ? "suspended" : "active");
        showToast(status === "active" ? "Admin account suspended." : "Admin account reactivated.");
      } else if (confirmModal === "reset") {
        showToast("Password reset email sent to admin.");
      } else if (confirmModal === "resend") {
        showToast("Activation email resent (expires in 72h).");
      }
      setConfirm(null);
    }, 1000);
  };

  const STATUS_STYLE = {
    active:             "bg-teal-100 text-teal-700",
    pending_activation: "bg-amber-100 text-amber-700",
    suspended:          "bg-rose-100 text-rose-700",
  };

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
        .modal-in { animation: modalIn 0.2s ease; }
      `}</style>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
            <span>SUPER ADMIN</span>
            <span className="text-slate-300">/</span>
            <Link href="/admins" className="hover:text-violet-600 transition-colors cursor-pointer">Clinic Admins</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-bold text-[11px]">{ADMIN.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Quick actions */}
            <button
              onClick={() => setConfirm("resend")}
              className="px-4 py-2 rounded-lg text-xs font-bold border border-violet-200 text-violet-600 hover:bg-violet-50 transition-colors"
            >
              Resend Invitation
            </button>
            <button
              onClick={() => setConfirm("reset")}
              className="px-4 py-2 rounded-lg text-xs font-bold border border-amber-200 text-amber-600 hover:bg-amber-50 transition-colors"
            >
              Reset Password
            </button>
            <button
              onClick={() => setConfirm("suspend")}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${
                status === "active"
                  ? "border-rose-200 text-rose-500 hover:bg-rose-50"
                  : "border-teal-200 text-teal-600 hover:bg-teal-50"
              }`}
            >
              {status === "active" ? "Suspend Admin" : "Reactivate Admin"}
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-7 overflow-auto space-y-5 fade-in">

          {/* Admin hero card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-5">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg"
                  style={{ background: ADMIN.avatarBg }}
                >
                  {ADMIN.avatar}
                </div>
                {/* Status dot */}
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                  style={{ background: status === "active" ? "#00c4a8" : status === "suspended" ? "#ef4444" : "#f59e0b" }}
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {ADMIN.name}
                  </h1>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase ${STATUS_STYLE[status]}`}>
                    {status === "pending_activation" ? "Pending" : status}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-violet-100 text-violet-700">
                    Clinic Admin
                  </span>
                </div>
                <p className="text-xs text-slate-400">{ADMIN.email} · {ADMIN.phone}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    {ADMIN.profId}
                  </span>
                  <Link href={`/clinics/${ADMIN.clinicId}`} className="text-[10px] text-violet-600 font-semibold hover:underline">
                    {ADMIN.clinic}
                  </Link>
                  <span className="text-[10px] text-slate-400">{ADMIN.dept} · {ADMIN.country}</span>
                  <span className="text-[10px] text-slate-400">Joined {ADMIN.joined}</span>
                </div>
              </div>

              {/* MFA toggle */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50">
                <div>
                  <p className="text-xs font-bold text-slate-700">MFA</p>
                  <p className="text-[10px] text-slate-400">Two-factor auth</p>
                </div>
                <button
                  onClick={() => { setMfa(!mfa); showToast(mfa ? "MFA disabled for admin." : "MFA enabled for admin."); }}
                  className="relative w-10 h-6 rounded-full transition-colors duration-200"
                  style={{ background: mfa ? "#0d9488" : "#d1d5db" }}
                >
                  <span
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                    style={{ transform: mfa ? "translateX(16px)" : "translateX(0)" }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              ["Team Size",         ADMIN.teamSize,                           "#7c3aed"],
              ["Analyses Managed",  ADMIN.analysesManaged.toLocaleString(),   "#0d9488"],
              ["Total Logins",      ADMIN.loginCount,                         "#0d2444"],
              ["Last Login",        ADMIN.lastLogin,                          "#64748b"],
            ].map(([label, value, color]) => (
              <div key={label as string} className="bg-white rounded-xl p-4 shadow-sm border-l-4" style={{ borderLeftColor: color as string }}>
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mb-1">{label}</p>
                <p className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: color as string }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-slate-100 px-6">
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-5 py-4 text-sm font-semibold border-b-2 transition-all"
                  style={{ borderColor: tab === t ? "#7c3aed" : "transparent", color: tab === t ? "#7c3aed" : "#94a3b8" }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* ── Profile tab ── */}
            {tab === "Profile" && (
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Account details */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Account Information</p>
                  <div className="rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                    {[
                      ["Full Name",       ADMIN.name],
                      ["Email",           ADMIN.email],
                      ["Phone",           ADMIN.phone],
                      ["Professional ID", ADMIN.profId],
                      ["Department",      ADMIN.dept],
                      ["Country",         ADMIN.country],
                      ["Plan",            ADMIN.plan],
                      ["Joined",          ADMIN.joined],
                      ["Last Login",      ADMIN.lastLogin],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between px-4 py-3">
                        <span className="text-xs text-slate-400 font-medium">{k}</span>
                        <span className="text-xs font-semibold text-slate-700">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin actions */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Admin Controls</p>
                  <div className="space-y-2">
                    {[
                      { label: "Edit Admin Profile",       color: "#7c3aed", action: () => showToast("Edit profile opened.") },
                      { label: "Change Assigned Clinic",   color: "#0d2444", action: () => showToast("Clinic reassignment opened.") },
                      { label: "Change Subscription Plan", color: "#0d9488", action: () => showToast("Plan change opened.") },
                      { label: "Download Admin Report",    color: "#64748b", action: () => showToast("Report downloading…") },
                      { label: "Force MFA Re-enrollment",  color: "#d97706", action: () => showToast("MFA re-enrollment forced.") },
                    ].map(({ label, color, action }) => (
                      <button
                        key={label}
                        onClick={action}
                        className="w-full px-4 py-3 rounded-xl border text-sm font-semibold text-left transition-all hover:opacity-80 active:scale-[0.99]"
                        style={{ borderColor: `${color}28`, color, background: `${color}06` }}
                      >
                        {label} →
                      </button>
                    ))}
                  </div>

                  {/* Danger zone */}
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-5 mb-3">Danger Zone</p>
                  <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 space-y-2">
                    <button
                      onClick={() => setConfirm("suspend")}
                      className="w-full px-4 py-2.5 rounded-lg border border-rose-200 text-sm font-bold text-rose-600 hover:bg-rose-100 transition-colors"
                    >
                      {status === "active" ? "Suspend Admin Account" : "Reactivate Admin Account"}
                    </button>
                    <p className="text-[10px] text-rose-400 leading-relaxed">
                      Suspending this admin will immediately revoke access for all clinicians in their clinic.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Activity tab ── */}
            {tab === "Activity" && (
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Recent Admin Actions</p>
                <div className="space-y-0 divide-y divide-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                  {AUDIT_LOG.map(({ action, target, time, type }, i) => (
                    <div key={i} className="row-hover flex items-center gap-4 px-5 py-4 transition-colors">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: TYPE_COLOR[type] }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-700">{action}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{target}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">{time}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-xs font-semibold text-violet-600 hover:underline">
                  Load full audit log →
                </button>
              </div>
            )}

            {/* ── Permissions tab ── */}
            {tab === "Permissions" && (
              <div className="p-6 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Role-Based Permissions</p>
                <div className="rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                  {[
                    ["Invite & manage clinicians",    true],
                    ["View all analyses in clinic",   true],
                    ["Export clinical reports",       true],
                    ["Configure system settings",     true],
                    ["Approve access requests",       true],
                    ["Access restricted records",     false],
                    ["Cross-clinic data access",      false],
                    ["Platform-level configuration",  false],
                  ].map(([label, granted]) => (
                    <div key={label as string} className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-sm text-slate-600">{label}</span>
                      <div className={`flex items-center gap-1.5 text-xs font-bold ${granted ? "text-teal-600" : "text-slate-300"}`}>
                        {granted ? (
                          <><div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center"><CheckIcon /></div>Granted</>
                        ) : (
                          <><div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={3} className="w-2.5 h-2.5">
                              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                            </svg>
                          </div>Denied</>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Permissions are defined by the <span className="font-semibold text-slate-600">Clinic Admin</span> role. To change permissions, adjust the role assignment.
                </p>
              </div>
            )}

            {/* ── Security tab ── */}
            {tab === "Security" && (
              <div className="p-6 space-y-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Security Overview</p>

                {/* MFA status */}
                <div className="rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                  {[
                    ["MFA Status",        mfa ? "✓ Enabled (TOTP)" : "⚠ Disabled",       mfa ? "text-teal-600" : "text-rose-500"],
                    ["Last Login",        ADMIN.lastLogin,                                  "text-slate-700"],
                    ["Account Activated", ADMIN.activatedAt,                                "text-slate-700"],
                    ["Login Count",       ADMIN.loginCount.toString(),                      "text-slate-700"],
                    ["Failed Logins",     "0 in last 30 days",                              "text-teal-600"],
                    ["Session Timeout",   "8 hours (institution policy)",                   "text-slate-700"],
                  ].map(([k, v, color]) => (
                    <div key={k as string} className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-xs text-slate-400 font-medium">{k}</span>
                      <span className={`text-xs font-bold ${color}`}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Security actions */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Force Password Reset",     color: "#d97706", action: () => setConfirm("reset") },
                    { label: "Force MFA Re-enrollment",  color: "#7c3aed", action: () => showToast("MFA re-enrollment enforced.") },
                    { label: "Invalidate All Sessions",  color: "#ef4444", action: () => showToast("All sessions invalidated.") },
                    { label: "Download Security Log",    color: "#0d9488", action: () => showToast("Downloading security log…") },
                  ].map(({ label, color, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="px-4 py-3 rounded-xl border text-sm font-semibold text-left transition-all hover:opacity-80"
                      style={{ borderColor: `${color}28`, color, background: `${color}06` }}
                    >
                      {label} →
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">DermaDx Platform · Super Admin Console</p>
          <span className="text-[10px] text-slate-300">© 2024 DermaDx</span>
        </footer>
      </div>

      {/* Confirm modal */}
      {confirmModal && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
            onClick={() => setConfirm(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="modal-in bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
              <div className="px-7 py-5 border-b border-slate-100"
                style={{ background: confirmModal === "suspend" ? "linear-gradient(135deg, #1a0505, #3a0a0a)" : "linear-gradient(135deg, #0a0f1e, #1a0d35)" }}>
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {confirmModal === "suspend" ? (status === "active" ? "Suspend Admin?" : "Reactivate Admin?") :
                   confirmModal === "reset"   ? "Reset Password?" : "Resend Invitation?"}
                </h2>
                <p className="text-white/40 text-xs mt-1">This action will be logged in the audit trail.</p>
              </div>
              <div className="px-7 py-5">
                <p className="text-sm text-slate-500 leading-relaxed">
                  {confirmModal === "suspend" && status === "active" &&
                    "Suspending this admin will immediately revoke access for them and notify their clinic users."}
                  {confirmModal === "suspend" && status !== "active" &&
                    "Reactivating this admin will restore their access and send a notification email."}
                  {confirmModal === "reset" &&
                    "A password reset email will be sent to the admin's registered email address."}
                  {confirmModal === "resend" &&
                    "A new activation email will be sent. The previous link will be invalidated."}
                </p>
              </div>
              <div className="px-7 pb-6 flex gap-3">
                <button onClick={() => setConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleConfirm} disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{ background: confirmModal === "suspend" && status === "active" ? "#ef4444" : "#7c3aed" }}>
                  {actionLoading
                    ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
                        <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
                        <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" />
                      </svg>
                    : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #0a0f1e, #7c3aed)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}