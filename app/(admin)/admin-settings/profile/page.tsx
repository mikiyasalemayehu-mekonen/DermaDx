"use client";

import { useState } from "react";
import { Lock as LucideLockIcon, Shield as LucideShieldIcon } from "lucide-react";
import Section from "../../_components/section";
import Toggle from "../../_components/toggle";

export default function ProfilePage() {
  const [fullName] = useState("Dr. Aris Thorne");
  const [profId]   = useState("MD-9920-X12");
  const [twoFA, setTwoFA] = useState(true);

  return (
    <Section title="Profile & Security" id="profile"
      action={<p className="text-xs text-slate-400">Manage your clinician credentials and authentication methods.</p>}>
      <div className="grid md:grid-cols-2 gap-6">
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

        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Security Settings</p>
          <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
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
  );
}
