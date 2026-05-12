"use client";

import { useState } from "react";

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${value ? "bg-teal-500" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? "translate-x-4" : ""}`} />
    </button>
  );
}

export default function SecurityPage() {
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
            <input type="password" placeholder="••••••••"
              className="w-full max-w-sm px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 transition-all" />
          </div>
        ))}
        <div className="flex justify-end pt-1">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all active:scale-95">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
        <p className="text-sm font-bold text-[#0f2744]">Security Preferences</p>
        {[
          { label: "Two-Factor Authentication", desc: "Require a verification code on login", value: twoFA,        set: setTwoFA },
          { label: "Session Alerts",            desc: "Notify me of new sign-ins via email",  value: sessionAlert, set: setSessionAlert },
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
