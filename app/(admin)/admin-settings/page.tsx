"use client";

import { useState } from "react";
import AdminSidebar from "../_components/sidebar";
import Section from "../_components/section";
import Toggle from "../_components/toggle";
import Slider from "../_components/slider";
import {
  Bell as LucideBellIcon,
  HelpCircle as LucideHelpIcon,
  Lock as LucideLockIcon,
  Shield as LucideShieldIcon,
  Sliders as LucideSlidersIcon,
  Cpu as LucideCpuIcon,
  TriangleAlert as LucideTriangleAlertIcon,
  Info as LucideInfoIcon,
  UploadCloud as LucideUploadIcon,
  Database as LucideDatabaseIcon,
  Grid as LucideGridIcon,
  Flag as LucideFlagIcon,
  Check as LucideCheckIcon,
} from "lucide-react";



const SETTING_TABS = [
  { id: "profile",  label: "Profile & Security",  icon: LucideShieldIcon },
  { id: "config",   label: "System Config",        icon: LucideSlidersIcon },
  { id: "model",    label: "Model Management",     icon: LucideCpuIcon },
  { id: "notifs",   label: "Notifications",        icon: LucideBellIcon },
  { id: "about",    label: "About System",         icon: LucideInfoIcon },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminSettingsPage() {
  const [activeNav, setActiveNav]   = useState("settings");
  const [activeTab, setActiveTab]   = useState("profile");

  // Profile
  const [fullName]                  = useState("Dr. Aris Thorne");
  const [profId]                    = useState("MD-9920-X12");
  const [twoFA, setTwoFA]           = useState(true);

  // System config
  const [iqaThreshold, setIqa]      = useState(42);
  const [luminance, setLuminance]   = useState(65);
  const [confWarning, setConf]      = useState(85);
  const [uploadSize]                = useState("128 MB");

  // Notifications
  const [abnormalRej, setAbnormal]  = useState(true);
  const [auditFlags, setAuditFlags] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [criticalAlert, setCritical] = useState(true);

  // Save state
  const [saved, setSaved]           = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2200); };

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.45s ease both; }
        .input-focus:focus { outline:none; border-color:#0d9488; box-shadow:0 0 0 3px rgba(13,148,136,0.1); }
        @keyframes toastIn { from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1} }
        .toast-anim { animation: toastIn 0.3s ease; }
      `}</style>

      {/* Sidebar */}
      <AdminSidebar active={activeNav} onNav={setActiveNav} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
            <span className="font-medium">Admin</span>
            <span className="text-slate-300">›</span>
            <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">Settings</span>
          </div>
          <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                  <LucideBellIcon className="w-5 h-5" />
                </button>
                <button className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                  <LucideHelpIcon className="w-5 h-5" />
                </button>
            {/* Avatar */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-700 leading-tight">Dr. Aris Thorne</p>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest">System Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-teal-200">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <rect width="32" height="32" fill="#ccf0eb" />
                  <circle cx="16" cy="12" r="6" fill="#5eead4" />
                  <ellipse cx="16" cy="26" rx="10" ry="7" fill="#5eead4" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-7 overflow-auto fade-in">

          {/* Page heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Settings</h1>
            <p className="text-sm text-slate-400 mt-0.5">Manage system configuration, model parameters, and admin preferences.</p>
          </div>

          {/* Admin privileges banner */}
          <div className="mb-6 flex items-start gap-3 px-5 py-4 rounded-xl border" style={{ background: "rgba(13,36,68,0.04)", borderColor: "rgba(13,36,68,0.12)" }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#0d2444" }}>
              <LucideShieldIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-700">Admin Privileges Active</p>
              <p className="text-xs text-slate-500 mt-0.5">You are currently in SuperAdmin mode. Critical system changes are logged and audited automatically.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            {/* Settings side nav */}
            <div className="w-52 shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 space-y-0.5">
                {SETTING_TABS.map(({ id, label, icon: TabIcon }) => (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{
                      background: activeTab === id ? "#0d2444" : "transparent",
                      color: activeTab === id ? "white" : "#64748b",
                    }}
                    onMouseEnter={e => { if (activeTab !== id) (e.currentTarget as HTMLElement).style.background = "#f8fafc"; }}
                    onMouseLeave={e => { if (activeTab !== id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <TabIcon />{label}
                  </button>
                ))}
              </div>

              {/* Save button in sidebar */}
              <button onClick={handleSave}
                className="mt-4 w-full py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-95"
                style={{ background: saved ? "#0d9488" : "linear-gradient(135deg, #0b1f3a, #0d3260)", boxShadow: "0 4px 16px rgba(11,31,58,0.2)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6">

              {/* ── Profile & Security ── */}
              {activeTab === "profile" && (
                <>
                  <Section title="Profile & Security" id="profile"
                    action={<p className="text-xs text-slate-400">Manage your clinician credentials and authentication methods.</p>}>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Account info */}
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account Information</p>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1.5">Full Name</label>
                          <input defaultValue={fullName} readOnly
                            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-600" />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1.5">Professional ID</label>
                          <input defaultValue={profId} readOnly
                            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-mono" />
                        </div>
                      </div>

                      {/* Security */}
                      <div className="space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Security Settings</p>
                        <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors group">
                          <span className="text-sm font-semibold text-teal-700">Change System Password</span>
                          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                                  <LucideLockIcon className="w-4 h-4" />
                          </div>
                        </button>
                        <div className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-slate-200">
                          <div>
                            <p className="text-sm font-semibold text-slate-700">Two-Factor Authentication</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Require 2FA on every login</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {twoFA && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest" style={{ background: "#0d9488", color: "white" }}>ACTIVE</span>
                            )}
                            <Toggle value={twoFA} onChange={setTwoFA} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Section>
                </>
              )}

              {/* ── System Config ── */}
              {activeTab === "config" && (
                <Section title="System Configuration" id="config"
                  action={
                    <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
                      <LucideHelpIcon className="w-4 h-4" />
                    </button>
                  }>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left — sliders */}
                    <div className="space-y-6">
                      <div>
                        <Slider label="IQA Blur Threshold" value={iqaThreshold} onChange={setIqa} min={0} max={100} />
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">Higher values reject slightly blurred images to ensure diagnostic precision.</p>
                      </div>
                      <div>
                        <Slider label="Luminance Sensitivity" value={luminance} onChange={setLuminance} min={0} max={100} />
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">Controls sensitivity to over- or under-exposed image regions.</p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Confidence Warning Threshold</label>
                        <div className="flex items-center gap-2">
                          <input type="number" value={confWarning} onChange={e => setConf(Number(e.target.value))} min={0} max={100}
                            className="input-focus flex-1 px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono transition-all" />
                          <span className="text-sm text-slate-400 font-medium">%</span>
                        </div>
                        <p className="text-xs text-rose-500 mt-1.5">Flags analysis results below this value for manual senior review.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Max Upload Size</label>
                          <div className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600">{uploadSize}</div>
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Retention Policy</label>
                          <div className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600 flex items-center gap-2">
                            90 Days <LucideLockIcon className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>
              )}

              {/* ── Model Management ── */}
              {activeTab === "model" && (
                <Section title="Model Management" id="model"
                  action={
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{ background: "linear-gradient(135deg, #0b1f3a, #0d3260)", boxShadow: "0 4px 12px rgba(11,31,58,0.2)" }}>
                      <LucideUploadIcon className="w-4 h-4" />Request Model Update
                    </button>
                  }>
                  {/* Version banner */}
                  <div className="rounded-xl border-l-4 border-teal-500 bg-slate-50 p-5 flex items-start justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Active Version</p>
                      <p className="text-3xl font-black text-slate-800 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>v4.2.1-prod</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#0d9488" }}>STABLE</span>
                        <span className="text-[10px] text-slate-400">Deployed 12-Oct</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-2">Core Performance Metrics (Validation Set)</p>
                      <div className="flex gap-6">
                        {[["0.942","MAP"],["96.8%","Precision"],["92.1%","Recall"]].map(([val, lbl]) => (
                          <div key={lbl} className="text-center">
                            <p className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{val}</p>
                            <p className="text-[9px] uppercase tracking-widest text-slate-400">{lbl}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dataset card */}
                  <div className="flex items-start gap-4 px-5 py-4 rounded-xl border border-slate-200 bg-white">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <LucideDatabaseIcon className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">Training Dataset: GlobalDerm_v8</p>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                        Includes 142k verified clinical images across 8 demographic clusters.
                        Bias check passed (p &lt; 0.05) on 01-Nov-2023.
                      </p>
                    </div>
                    <span className="shrink-0 text-[9px] font-bold px-2 py-1 rounded-full" style={{ background: "#ecfdf5", color: "#059669" }}>Validated</span>
                  </div>

                  {/* Performance bars */}
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Fitzpatrick Fairness Scores</p>
                    {[["Type I–II", 96], ["Type III–IV", 94], ["Type V–VI", 91]].map(([label, val]) => (
                      <div key={label as string}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600 font-medium">{label}</span>
                          <span className="font-bold text-teal-600">{val}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-teal-500 transition-all duration-700" style={{ width: `${val as number}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* ── Notifications ── */}
              {activeTab === "notifs" && (
                <>
                  <Section title="Alerts & Notifications" id="notifs">
                    {[
                        { icon: <LucideTriangleAlertIcon className="w-5 h-5 text-red-500" />, label: "Abnormal Rejection Rate", desc: "Notify when IQA failure exceeds 15% of daily volume.", value: abnormalRej, onChange: setAbnormal },
                        { icon: <LucideFlagIcon className="w-5 h-5" />,      label: "Audit Flags",              desc: "Immediate email alert for any clinician-contested model results.", value: auditFlags, onChange: setAuditFlags },
                        { icon: <LucideBellIcon className="w-5 h-5" />,      label: "Daily Email Digest",       desc: "Summarised system activity report sent each morning.", value: emailDigest, onChange: setEmailDigest },
                        { icon: <LucideShieldIcon className="w-5 h-5" />,    label: "Critical System Alerts",   desc: "Push notification for downtime, model drift, or security events.", value: criticalAlert, onChange: setCritical },
                    ].map(({ icon, label, desc, value, onChange }) => (
                      <div key={label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                            {icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-700">{label}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                          </div>
                        </div>
                        <Toggle value={value} onChange={onChange} />
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {/* ── About System ── */}
              {activeTab === "about" && (
                <>
                  <Section title="System Architecture" id="about">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: <LucideDatabaseIcon className="w-5 h-5 text-slate-500" />, label: "Database",         value: "AWS RDS (Aurora)", status: "HEALTHY",  statusColor: "#059669" },
                        { icon: <LucideCpuIcon className="w-5 h-5 text-slate-500" />,      label: "Inference Engine", value: "TensorRT Edge",    status: "ACTIVE",   statusColor: "#0d9488" },
                        { icon: <LucideGridIcon className="w-5 h-5 text-slate-500" />,     label: "Storage API",      value: "S3 Gateway",       status: "99.9%",    statusColor: "#0d9488" },
                      ].map(({ icon, label, value, status, statusColor }) => (
                        <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500">{icon}</div>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: statusColor }}>{status}</span>
                          </div>
                          <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
                          <p className="text-sm font-bold text-slate-700">{value}</p>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <Section title="About DermaDx" id="about2">
                    {[
                      ["Product",       "DermaDx Enterprise"],
                      ["Version",       "v4.2.1-prod"],
                      ["Build",         "2023T1.05.RC1"],
                      ["License",       "Memorial Health Systems"],
                      ["Compliance",    "HIPAA • GDPR • CE Marked"],
                      ["Support Email", "enterprise@dermadx.health"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <span className="text-xs text-slate-400 font-medium">{k}</span>
                        <span className="text-xs font-bold text-slate-700 font-mono">{v}</span>
                      </div>
                    ))}
                    <p className="text-xs text-slate-400 pt-2 leading-relaxed">
                      DermaDx Enterprise v4.2.1 • Licensed to Memorial Health Systems<br />
                      <span className="text-slate-300">Build: 2023T1.05.RC1</span>
                    </p>
                  </Section>
                </>
              )}
            </div>
          </div>
        </main>


      </div>

      {/* Toast */}
      {saved && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #0b1f3a, #0d9488)" }}>
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"><LucideCheckIcon className="w-3 h-3 text-white" /></div>
          Settings saved successfully.
        </div>
      )}
    </div>
  );
}
