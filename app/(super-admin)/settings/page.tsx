"use client";

import { useState } from "react";

// ── Settings tabs ──────────────────────────────────────────────────────────────
const TABS = [
  {
    id: "platform",
    label: "Platform Config",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: "security",
    label: "Security & Auth",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: "model",
    label: "AI Model",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" strokeLinecap="round" /><line x1="15" y1="1" x2="15" y2="4" strokeLinecap="round" />
        <line x1="9" y1="20" x2="9" y2="23" strokeLinecap="round" /><line x1="15" y1="20" x2="15" y2="23" strokeLinecap="round" />
        <line x1="20" y1="9" x2="23" y2="9" strokeLinecap="round" /><line x1="20" y1="14" x2="23" y2="14" strokeLinecap="round" />
        <line x1="1" y1="9" x2="4" y2="9" strokeLinecap="round" /><line x1="1" y1="14" x2="4" y2="14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "billing",
    label: "Plans & Billing",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About Platform",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeWidth={2.5} />
      </svg>
    ),
  },
];

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ value, onChange, color = "#7c3aed" }: { value: boolean; onChange: (v: boolean) => void; color?: string }) {
  return (
    <button type="button" onClick={() => onChange(!value)}
      className="relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0"
      style={{ background: value ? color : "#d1d5db" }}>
      <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: value ? "translateX(24px)" : "translateX(0)" }} />
    </button>
  );
}

// ── Slider ────────────────────────────────────────────────────────────────────
function Slider({ label, value, onChange, min = 0, max = 100, suffix = "" }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; suffix?: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
          {value}{suffix}
        </span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full cursor-pointer" style={{ accentColor: "#7c3aed" }} />
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
        {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-4">
        {children}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SuperAdminSettingsPage() {
  const [activeTab, setTab]         = useState("platform");

  // Platform config
  const [maxClinics, setMaxClinics] = useState(50);
  const [maxUsersPerClinic, setMax] = useState(200);
  const [sessionTimeout, setSession] = useState(8);
  const [maintenanceMode, setMaint] = useState(false);
  const [auditLogging, setAudit]    = useState(true);
  const [dataRegion, setRegion]     = useState("eu-west-1");

  // Security
  const [mfaRequired, setMFAReq]   = useState(true);
  const [ssoEnabled, setSSO]        = useState(false);
  const [pwMinLength, setPwLen]     = useState(12);
  const [inviteExpiry, setExpiry]   = useState(72);
  const [ipWhitelist, setIPWhite]   = useState(false);

  // Model
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [globalConf, setGlobalConf] = useState(85);
  const [globalIQA, setGlobalIQA]   = useState(42);

  // Notifications
  const [clinicAlerts, setClinic]   = useState(true);
  const [securityAlerts, setSec]    = useState(true);
  const [usageDigest, setUsage]     = useState(true);
  const [modelAlerts, setModel]     = useState(false);

  // Save
  const [saved, setSaved]           = useState(false);
  const [toast, setToast]           = useState("");

  const handleSave = () => {
    setSaved(true);
    setToast("Settings saved successfully.");
    setTimeout(() => { setSaved(false); setToast(""); }, 2500);
  };

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.45s ease both; }
        .input-ring:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }
        @keyframes toastIn { from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1} }
        .toast-anim { animation: toastIn 0.3s ease; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
      `}</style>


      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wide">
            <span>SUPER ADMIN</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-bold uppercase tracking-widest text-[11px]">Settings</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Maintenance mode pill */}
            {maintenanceMode && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-700 bg-amber-100">
                <div className="w-2 h-2 rounded-full bg-amber-500" style={{ animation: "pulse 1.5s infinite" }} />
                Maintenance Mode Active
              </div>
            )}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-100">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>SA</div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-7 overflow-auto fade-in">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Platform Settings
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Global configuration for the entire DermaDx SaaS platform.
            </p>
          </div>

          {/* Super admin notice */}
          <div className="mb-6 flex items-start gap-3 px-5 py-4 rounded-xl border"
            style={{ background: "rgba(124,58,237,0.04)", borderColor: "rgba(124,58,237,0.15)" }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "#7c3aed" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-3.5 h-3.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">Platform-Level Access</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Changes made here affect <span className="font-semibold text-slate-700">all clinics and users</span> on the platform. All modifications are logged and audited automatically.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            {/* Settings sidebar nav */}
            <div className="w-52 shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 space-y-0.5">
                {TABS.map(({ id, label, icon: TabIcon }) => (
                  <button key={id} onClick={() => setTab(id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{
                      background: activeTab === id ? "#7c3aed" : "transparent",
                      color: activeTab === id ? "white" : "#64748b",
                    }}
                    onMouseEnter={e => { if (activeTab !== id) (e.currentTarget as HTMLElement).style.background = "#f8fafc"; }}
                    onMouseLeave={e => { if (activeTab !== id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <TabIcon />{label}
                  </button>
                ))}
              </div>

              {/* Save button */}
              <button onClick={handleSave}
                className="mt-4 w-full py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-95"
                style={{
                  background: saved ? "#0d9488" : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.2)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 space-y-6">

              {/* ── Platform Config ── */}
              {activeTab === "platform" && (
                <>
                  <Section title="Platform Limits" desc="Global limits applied across all clinic tenants.">
                    <Slider label="Max Clinics on Platform" value={maxClinics} onChange={setMaxClinics} min={1} max={200} />
                    <Slider label="Max Users per Clinic"    value={maxUsersPerClinic} onChange={setMax} min={5} max={500} />
                    <Slider label="Session Timeout (hours)" value={sessionTimeout} onChange={setSession} min={1} max={24} suffix="h" />
                  </Section>

                  <Section title="Data & Infrastructure" desc="Region and data retention settings.">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">Data Region</label>
                      <div className="relative">
                        <select value={dataRegion} onChange={e => setRegion(e.target.value)}
                          className="input-ring w-full appearance-none px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-600 cursor-pointer transition-all">
                          <option value="eu-west-1">EU West (Ireland)</option>
                          <option value="us-east-1">US East (Virginia)</option>
                          <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                          <option value="af-south-1">Africa (Cape Town)</option>
                        </select>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <polyline points="6 9 12 15 18 9" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    {[
                      { label: "Audit Logging",     desc: "Log all admin and clinician actions platform-wide.", value: auditLogging, set: setAudit },
                      { label: "Maintenance Mode",  desc: "Temporarily disable all clinic access for system updates.", value: maintenanceMode, set: setMaint },
                    ].map(({ label, desc, value, set }) => (
                      <div key={label} className="flex items-center justify-between py-1">
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{label}</p>
                          <p className="text-xs text-slate-400">{desc}</p>
                        </div>
                        <Toggle value={value} onChange={set} />
                      </div>
                    ))}
                  </Section>
                </>
              )}

              {/* ── Security & Auth ── */}
              {activeTab === "security" && (
                <>
                  <Section title="Authentication Rules" desc="Applied to all users across all clinics.">
                    {[
                      { label: "MFA Required for All Users", desc: "Force 2FA on every account — cannot be overridden by clinic admins.", value: mfaRequired, set: setMFAReq },
                      { label: "SSO / SAML Integration",     desc: "Allow enterprise single sign-on via SAML 2.0.", value: ssoEnabled, set: setSSO },
                      { label: "IP Whitelist Enforcement",   desc: "Restrict login to clinic-registered IP ranges.", value: ipWhitelist, set: setIPWhite },
                    ].map(({ label, desc, value, set }) => (
                      <div key={label} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                        </div>
                        <Toggle value={value} onChange={set} />
                      </div>
                    ))}
                  </Section>

                  <Section title="Password & Invitation Policy">
                    <Slider label="Minimum Password Length" value={pwMinLength} onChange={setPwLen} min={8} max={32} suffix=" chars" />
                    <Slider label="Invitation Link Expiry"  value={inviteExpiry} onChange={setExpiry} min={12} max={168} suffix="h" />
                    <div className="px-4 py-3 rounded-xl border text-xs text-slate-500 leading-relaxed"
                      style={{ background: "#f5f3ff", borderColor: "#ddd6fe" }}>
                      <span className="font-bold text-violet-700">Note:</span> Invitation links are single-use and time-limited. Expired links must be resent by the clinic admin or super admin.
                    </div>
                  </Section>
                </>
              )}

              {/* ── AI Model ── */}
              {activeTab === "model" && (
                <>
                  <Section title="Global Model Configuration" desc="Defaults applied to all clinics. Clinic admins can override within allowed ranges.">
                    <Slider label="Global Confidence Warning Threshold" value={globalConf} onChange={setGlobalConf} suffix="%" />
                    <p className="text-xs text-rose-500 -mt-2">Analyses below this value are flagged for senior review across all tenants.</p>
                    <Slider label="Global IQA Blur Threshold" value={globalIQA} onChange={setGlobalIQA} />
                  </Section>

                  <Section title="Model Version Management">
                    <div className="flex items-start justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Active Global Version</p>
                        <p className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>v4.2.1-prod</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#0d9488" }}>STABLE</span>
                          <span className="text-[10px] text-slate-400">Deployed 12-Oct · All tenants</span>
                        </div>
                      </div>
                      <button className="px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                        Deploy Update
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Auto-Update Model</p>
                        <p className="text-xs text-slate-400">Automatically deploy validated model updates to all clinics.</p>
                      </div>
                      <Toggle value={autoUpdate} onChange={setAutoUpdate} />
                    </div>

                    {/* Fitzpatrick fairness */}
                    <div className="pt-2">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Fitzpatrick Fairness Scores</p>
                      {[["Type I–II", 96], ["Type III–IV", 94], ["Type V–VI", 91]].map(([label, val]) => (
                        <div key={label as string} className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600 font-medium">{label}</span>
                            <span className="font-bold text-teal-600">{val}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-teal-500" style={{ width: `${val as number}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                </>
              )}

              {/* ── Plans & Billing ── */}
              {activeTab === "billing" && (
                <Section title="Subscription Plans" desc="Manage plan definitions and feature limits for each tier.">
                  <div className="space-y-3">
                    {[
                      { plan: "Basic",        price: "$99/mo",  clinicians: 10,  analyses: "5,000/mo",  color: "#64748b", bg: "#f1f5f9" },
                      { plan: "Professional", price: "$299/mo", clinicians: 50,  analyses: "25,000/mo", color: "#2563eb", bg: "#eff6ff" },
                      { plan: "Enterprise",   price: "Custom",  clinicians: 999, analyses: "Unlimited", color: "#7c3aed", bg: "#f5f3ff" },
                    ].map(({ plan, price, clinicians, analyses, color, bg }) => (
                      <div key={plan} className="flex items-center justify-between px-5 py-4 rounded-xl border"
                        style={{ borderColor: `${color}28`, background: bg }}>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md`}
                            style={{ background: `${color}18`, color }}>{plan}</span>
                          <span className="text-sm font-bold text-slate-700">{price}</span>
                        </div>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                          <span>Up to <span className="font-bold text-slate-700">{clinicians === 999 ? "Unlimited" : clinicians}</span> clinicians</span>
                          <span><span className="font-bold text-slate-700">{analyses}</span> analyses</span>
                        </div>
                        <button className="text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">Edit →</button>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* ── Notifications ── */}
              {activeTab === "notifications" && (
                <Section title="Platform Alert Preferences" desc="Email and system alerts sent to super admin accounts.">
                  {[
                    { label: "New Clinic Onboarding",   desc: "Alert when a new clinic is created or pending approval.", value: clinicAlerts,   set: setClinic },
                    { label: "Security Events",          desc: "Alert on failed logins, suspended accounts, MFA bypasses.", value: securityAlerts, set: setSec },
                    { label: "Weekly Usage Digest",      desc: "Summary of analyses, users, and platform performance.", value: usageDigest,    set: setUsage },
                    { label: "Model Deployment Alerts",  desc: "Notify when a model is updated or validation fails.", value: modelAlerts,    set: setModel },
                  ].map(({ label, desc, value, set }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                      </div>
                      <Toggle value={value} onChange={set} />
                    </div>
                  ))}
                </Section>
              )}

              {/* ── About ── */}
              {activeTab === "about" && (
                <>
                  <Section title="System Architecture">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Database",         value: "AWS RDS Aurora",   status: "HEALTHY", color: "#059669" },
                        { label: "Inference Engine", value: "TensorRT Edge",    status: "ACTIVE",  color: "#0d9488" },
                        { label: "Storage API",      value: "S3 Gateway",       status: "99.9%",   color: "#7c3aed" },
                        { label: "CDN",              value: "CloudFront",       status: "ACTIVE",  color: "#0d9488" },
                        { label: "Auth Service",     value: "Cognito / JWT",    status: "ACTIVE",  color: "#0d9488" },
                        { label: "Queue Service",    value: "SQS",              status: "ACTIVE",  color: "#0d9488" },
                      ].map(({ label, value, status, color }) => (
                        <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] uppercase tracking-widest text-slate-400">{label}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: color }}>{status}</span>
                          </div>
                          <p className="text-sm font-bold text-slate-700">{value}</p>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <Section title="Platform Information">
                    {[
                      ["Product",         "DermaDx SaaS Platform"],
                      ["Version",         "v4.2.1-prod"],
                      ["Build",           "2024.01.15.RC1"],
                      ["Compliance",      "HIPAA · GDPR · CE Marked · SOC 2 Type II"],
                      ["Active Region",   "EU West (Ireland)"],
                      ["Support Email",   "platform@dermadx.health"],
                      ["SLA",             "99.9% uptime guarantee"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <span className="text-xs text-slate-400 font-medium">{k}</span>
                        <span className="text-xs font-bold text-slate-700 font-mono">{v}</span>
                      </div>
                    ))}
                  </Section>
                </>
              )}
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">DermaDx Platform · Super Admin Console</p>
          <span className="text-[10px] text-slate-300">© 2024 DermaDx</span>
        </footer>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #0a0f1e, #7c3aed)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-4 h-4 shrink-0">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}