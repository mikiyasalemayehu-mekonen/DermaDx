"use client";

import { useState } from "react";
import { TopBar } from "../../_components/shell";
import {
  IconUser, IconShield, IconCheck, IconBell,
  IconSave, IconCamera, IconChevronDown,
} from "../../_components/icons";

// ── Settings tab definitions ──────────────────────────────────────────────────

const SETTINGS_TABS = [
  { id: "profile",     label: "Profile",     Icon: IconUser },
  { id: "security",    label: "Security",    Icon: IconShield },
  {
    id: "preferences", label: "Preferences",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <line x1="8"  y1="6"  x2="21" y2="6"  strokeLinecap="round" />
        <line x1="8"  y1="12" x2="21" y2="12" strokeLinecap="round" />
        <line x1="8"  y1="18" x2="21" y2="18" strokeLinecap="round" />
        <line x1="3"  y1="6"  x2="3.01" y2="6"  strokeLinecap="round" strokeWidth={2.5} />
        <line x1="3"  y1="12" x2="3.01" y2="12" strokeLinecap="round" strokeWidth={2.5} />
        <line x1="3"  y1="18" x2="3.01" y2="18" strokeLinecap="round" strokeWidth={2.5} />
      </svg>
    ),
  },
  {
    id: "about", label: "About",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8"  x2="12"    y2="12" strokeLinecap="round" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeWidth={2.5} />
      </svg>
    ),
  },
];

// ── Toggle component ──────────────────────────────────────────────────────────

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${value ? "bg-teal-500" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? "translate-x-4" : ""}`} />
    </button>
  );
}

// ── Tab: Profile ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const [fullName, setFullName] = useState("Aris Thorne");
  const [phone,    setPhone]    = useState("+1 (555) 012-3456");
  const [saved,    setSaved]    = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-[#f4f7fb] rounded-xl p-6 flex-1">
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-5">Profile Settings</p>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-7">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md bg-teal-100">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <rect width="64" height="64" fill="#e0f2f1" />
              <rect x="16" y="38" width="32" height="26" rx="4" fill="#546e7a" />
              <circle cx="32" cy="26" r="13" fill="#ffccbc" />
              <ellipse cx="32" cy="16" rx="12" ry="7" fill="#37474f" />
              <rect x="24" y="38" width="16" height="6" rx="2" fill="#78909c" />
              <polygon points="32,41 29,52 32,55 35,52" fill="#1a237e" opacity="0.7" />
              <rect x="20" y="44" width="10" height="7" rx="1" fill="#4caf50" opacity="0.9" />
              <rect x="21" y="45" width="8" height="1.5" rx="0.5" fill="white" />
              <rect x="21" y="47.5" width="5" height="1.5" rx="0.5" fill="white" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center border-2 border-white">
            <IconCamera />
          </div>
        </div>
        <div>
          <p className="font-bold text-[#0f2744] text-base leading-tight">Dr. Aris Thorne</p>
          <p className="text-xs text-gray-400 mt-0.5">Senior Dermatopathologist • St. Jude Medical</p>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1.5">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 focus:border-[#0f2744]/30 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1.5">Email (Read-only)</label>
          <input
            value="a.thorne@stjude.med"
            readOnly
            className="w-full px-3 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-xs text-gray-500 font-medium mb-1.5">Phone Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full max-w-xs px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 focus:border-[#0f2744]/30 transition-all"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl shadow transition-all active:scale-95 ${
            saved ? "bg-teal-500 text-white" : "bg-[#0f2744] hover:bg-[#1a3d6b] text-white"
          }`}
        >
          {saved ? <><IconCheck /> Saved!</> : <><IconSave /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}

// ── Tab: Security ─────────────────────────────────────────────────────────────

function SecurityTab() {
  const [twoFA,        setTwoFA]        = useState(true);
  const [sessionAlert, setSessionAlert] = useState(false);

  return (
    <div className="bg-[#f4f7fb] rounded-xl p-6 flex-1 space-y-5">
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Security Settings</p>

      <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
        <p className="text-sm font-bold text-[#0f2744]">Change Password</p>
        {["Current Password", "New Password", "Confirm Password"].map((label) => (
          <div key={label}>
            <label className="block text-xs text-gray-500 font-medium mb-1">{label}</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full max-w-sm px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 transition-all"
            />
          </div>
        ))}
        <div className="flex justify-end pt-1">
          <button className="bg-[#0f2744] hover:bg-[#1a3d6b] text-white text-sm font-bold px-5 py-2 rounded-lg transition-all active:scale-95">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
        <p className="text-sm font-bold text-[#0f2744]">Security Preferences</p>
        {[
          { label: "Two-Factor Authentication", desc: "Require a verification code on login",  value: twoFA,        set: setTwoFA },
          { label: "Session Alerts",            desc: "Notify me of new sign-ins via email",   value: sessionAlert, set: setSessionAlert },
        ].map(({ label, desc, value, set }) => (
          <div key={label} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 font-medium">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            <Toggle value={value} onChange={() => set(!value)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Preferences ──────────────────────────────────────────────────────────

function PreferencesTab() {
  const [theme,  setTheme]  = useState("System");
  const [lang,   setLang]   = useState("English");
  const [notifs, setNotifs] = useState(true);

  return (
    <div className="bg-[#f4f7fb] rounded-xl p-6 flex-1 space-y-5">
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Preferences</p>
      <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
        {[
          { label: "Theme",    options: ["Light", "Dark", "System"],              value: theme, set: setTheme },
          { label: "Language", options: ["English", "Dutch", "French", "German"], value: lang,  set: setLang },
        ].map(({ label, options, value, set }) => (
          <div key={label} className="flex items-center justify-between">
            <p className="text-sm text-gray-700 font-medium">{label}</p>
            <div className="relative">
              <select
                value={value}
                onChange={(e) => set(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none cursor-pointer"
              >
                {options.map((o) => <option key={o}>{o}</option>)}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <IconChevronDown />
              </span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 font-medium">Email Notifications</p>
            <p className="text-xs text-gray-400">Receive case update summaries</p>
          </div>
          <Toggle value={notifs} onChange={() => setNotifs(!notifs)} />
        </div>
      </div>
    </div>
  );
}

// ── Tab: About ────────────────────────────────────────────────────────────────

function AboutTab() {
  const INFO = [
    ["Product",       "DermaDx Clinical Portal"],
    ["Version",       "v4.2.1-stable"],
    ["Model Engine",  "DermNet-v7 (Transformer)"],
    ["Compliance",    "HIPAA Compliant • CE Marked"],
    ["Support Email", "support@dermadx.health"],
    ["Last Updated",  "October 2023"],
  ];

  return (
    <div className="bg-[#f4f7fb] rounded-xl p-6 flex-1 space-y-4">
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">About DermaDx</p>
      <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
        {INFO.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-400 font-medium">{k}</span>
            <span className="text-xs font-semibold text-[#0f2744]">{v}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 leading-relaxed">
        DermaDx is a clinical decision support tool intended for use by licensed dermatologists and pathologists. It is not a standalone diagnostic device.
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TAB_CONTENT: Record<string, React.ReactNode> = {
  profile:     <ProfileTab />,
  security:    <SecurityTab />,
  preferences: <PreferencesTab />,
  about:       <AboutTab />,
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fb]">
      <TopBar crumbs={["Home", "Settings", "Profile"]} />

      <main className="flex-1 px-8 py-7 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f2744]">User Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
            Manage your clinician profile, security preferences, and system information.
          </p>
        </div>

        <div className="flex gap-5 items-start">
          {/* Tab sidebar */}
          <div className="w-44 shrink-0 bg-white rounded-xl shadow-sm p-2 space-y-0.5">
            {SETTINGS_TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  activeTab === id
                    ? "bg-[#0f2744] text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-[#0f2744]"
                }`}
              >
                <Icon />{label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1">{TAB_CONTENT[activeTab]}</div>
        </div>
      </main>
    </div>
  );
}
