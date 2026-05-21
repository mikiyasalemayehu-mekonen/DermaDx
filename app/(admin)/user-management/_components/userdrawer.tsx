"use client";
import {useState} from "react";
import { inviteClinician } from "../../../../lib/api/clinicians";
import { X,Info ,Shield} from "lucide-react";



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


const CLINICAL_ROLES = ["Dermatologist", "Lab Technician", "Pathologist", "Radiologist", "System Admin", "Nurse Practitioner"];
function AddUserDrawer({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Dermatologist");
  const [department, setDepartment] = useState("");
  const [mfa, setMfa] = useState(true);
  const [restricted, setRestricted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit = fullName.trim().length > 2 && email.includes("@");

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await inviteClinician({ email, full_name: fullName, role, department });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onCreated();
        onClose();
      }, 900);
    } catch (err: any) {
      setLoading(false);
      console.error("Invite failed:", err);
      // show minimal UX feedback by keeping drawer open and not setting success
    }
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
            <X className="w-4 h-4" />
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
                <Info className="w-4 h-4" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-teal-700 mb-0.5">Automatic Credentials</p>
                  <p className="text-xs text-teal-700/70 leading-relaxed">A temporary password and onboarding instructions will be sent to the clinician&apos;s email immediately upon creation.</p>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-1">
                {[
                  { label: "Enable MFA", desc: "Require multi-factor authentication on sign-in", value: mfa, onChange: setMfa, icon: <Shield className="w-4 h-4" /> },
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

export default AddUserDrawer;