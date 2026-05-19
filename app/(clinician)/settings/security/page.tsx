"use client";

import { useState } from "react";
import { setupMFA, verifyMFA, getMe } from "@/lib/api/auth";

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
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [me, setMe] = useState<any>(null);

  const handleSetup = async () => {
    try {
      const res = await setupMFA();
      // res.qr_url is provisioning URI - render via external QR API
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(res.qr_url)}`);
      const profile = await getMe();
      setMe(profile);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async () => {
    if (!me) return;
    try {
      await verifyMFA({ token: me.user_id, code: mfaCode });
      setTwoFA(true);
      setQrUrl(null);
      setMfaCode("");
      alert("MFA enabled successfully");
    } catch (err: any) {
      alert(err?.message || "MFA verification failed");
    }
  };

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
          <button className="bg-blue-900 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all active:scale-95">
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
        {/* MFA setup area */}
        <div className="pt-3 border-t border-gray-100">
          {!qrUrl ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 font-medium">Set up MFA</p>
                <p className="text-xs text-gray-400">Set up Time-based One-Time Password (TOTP) using an authenticator app</p>
              </div>
              <div>
                <button onClick={handleSetup} className="bg-blue-900 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg">
                  Setup MFA
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <img src={qrUrl} alt="MFA QR" className="w-36 h-36 bg-white p-2 rounded" />
              <div className="flex-1">
                <p className="text-sm font-medium">Scan the QR with your authenticator app, then enter the 6-digit code below.</p>
                <div className="mt-3 flex items-center gap-2">
                  <input value={mfaCode} onChange={(e) => setMfaCode(e.target.value)} placeholder="123456" className="px-3 py-2 border rounded w-36" />
                  <button onClick={handleVerify} className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded">Verify & Enable</button>
                  <button onClick={() => setQrUrl(null)} className="text-sm text-gray-500 underline">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
