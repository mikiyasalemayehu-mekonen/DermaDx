"use client";

import { useState } from "react";
import { Smartphone, Lock,EyeIcon,EyeOffIcon ,Shield,Check} from 'lucide-react';

type Step = "password" | "mfa" | "done";



// const CheckIcon = ({ size = 4 }: { size?: number }) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={`w-${size} h-${size}`}>
//     <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );


// ── Password strength ─────────────────────────────────────────────────────────
function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH_LABELS = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
const STRENGTH_COLORS = ["", "#ef4444", "#f97316", "#f59e0b", "#00c4a8", "#059669"];

// ── MFA QR mock ───────────────────────────────────────────────────────────────
function QRCode() {
  const cells: boolean[] = [];
  // deterministic "QR-like" grid
  const seed = [1,0,1,1,0,1,1,0,1,0,1,1,0,0,1,0,1,0,1,1,0,1,0,1,1,0,0,1,1,0,1,0,1,1,0,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1,1,0,0,1,0];
  const SIZE = 8;
  for (let i = 0; i < SIZE * SIZE; i++) cells.push(seed[i % seed.length] === 1);
  return (
    <div className="inline-grid gap-0.5 p-3 bg-white rounded-xl border border-slate-200 shadow-sm" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}>
      {cells.map((on, i) => (
        <div key={i} className="w-4 h-4 rounded-sm" style={{ background: on ? "#0d2444" : "white" }} />
      ))}
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────
function StepDot({ label, num, active, done }: { label: string; num: number; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
        done ? "bg-teal-500 text-white" : active ? "bg-[#0d2444] text-white" : "bg-slate-100 text-slate-400"
      }`}>
        {done ? <Check className="w-3 h-3 text-white" /> : num}
      </div>
      <span className={`text-xs font-semibold ${active ? "text-slate-700" : done ? "text-teal-600" : "text-slate-400"}`}>{label}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ActivationPage() {
  const [step, setStep]             = useState<Step>("password");
  const [pw, setPw]                 = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otp, setOtp]               = useState(["", "", "", "", "", ""]);
  const [loading, setLoading]       = useState(false);

  const strength    = getStrength(pw);
  const pwMatch     = pw === confirmPw && confirmPw.length > 0;
  const pwValid     = strength >= 3 && pwMatch;
  const otpFilled   = otp.every(d => d !== "");

  const rules = [
    { label: "At least 8 characters",          ok: pw.length >= 8 },
    { label: "At least one uppercase letter",  ok: /[A-Z]/.test(pw) },
    { label: "At least one number",            ok: /[0-9]/.test(pw) },
    { label: "At least one special character", ok: /[^A-Za-z0-9]/.test(pw) },
    { label: "Passwords match",                ok: pwMatch },
  ];

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      document.getElementById(`otp-${i - 1}`)?.focus();
    }
  };

  const handleSetPassword = () => {
    if (!pwValid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("mfa"); }, 1000);
  };

  const handleVerifyMFA = () => {
    if (!otpFilled) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("done"); }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f7fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .input-ring:focus { outline: none; border-color: #0d9488; box-shadow: 0 0 0 3px rgba(13,148,136,0.1); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeUp 0.5s ease both; }
        @keyframes checkPop { 0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)} }
        .check-pop { animation: checkPop 0.5s ease; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
      `}</style>

      {/* Left panel */}
      <div className="hidden lg:flex w-2/5 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0b1f3a 0%, #0d2a4a 60%, #061a30 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(0,212,180,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,180,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00d4b4 0%, transparent 70%)" }} />

        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-sm">D</span>
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>DermaDx</p>
            <p className="text-teal-400/50 text-[9px] tracking-[0.2em] uppercase mt-0.5">Clinical Portal</p>
          </div>
        </div>

        <div className="relative space-y-6">
          <h2 className="text-3xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Activate your<br /><span style={{ background: "linear-gradient(135deg, #94d8f0, #00d4b4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>clinical account</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            You&apos;ve been provisioned access by your institution&apos;s admin. Complete these steps to secure your account and gain access to DermaDx.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { icon: <Lock />, title: "Set your password", desc: "Minimum 12 characters with complexity requirements" },
              { icon: <Smartphone />, title: "Enable MFA", desc: "Time-based one-time password via authenticator app" },
              { icon: <Shield />, title: "Access granted", desc: "Role-scoped dashboard unlocks upon completion" },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(0,212,180,0.1)", color: "#00d4b4" }}>{icon}</div>
                <div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-slate-600 text-xs">
          This activation link expires in <span className="text-teal-400 font-semibold">71h 43m</span>. Contact your admin if it expires.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md fade-in">

          {/* Step indicators */}
          <div className="flex items-center gap-4 mb-8">
            <StepDot num={1} label="Set Password" active={step === "password"} done={step === "mfa" || step === "done"} />
            <div className="flex-1 h-px bg-slate-200" />
            <StepDot num={2} label="Enable MFA"    active={step === "mfa"} done={step === "done"} />
            <div className="flex-1 h-px bg-slate-200" />
            <StepDot num={3} label="Complete"      active={step === "done"} done={false} />
          </div>

          {/* Invited by banner */}
          <div className="mb-6 px-4 py-3 rounded-xl border flex items-center gap-3"
            style={{ background: "#f0f6ff", borderColor: "rgba(13,36,68,0.12)" }}>
            <div className="w-8 h-8 rounded-full bg-[#0d2444] flex items-center justify-center text-[10px] font-bold text-white shrink-0">AT</div>
            <div>
              <p className="text-xs font-bold text-slate-700">Invited by Dr. Aris Thorne</p>
              <p className="text-[10px] text-slate-400">Role: Dermatologist · Memorial Health Systems</p>
            </div>
          </div>

          {/* ── Step 1: Set Password ── */}
          {step === "password" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-5">
              <div>
                <h1 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Set your password</h1>
                <p className="text-sm text-slate-400 mt-1">Choose a strong password you haven't used before.</p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">New Password</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 transition-all input-ring">
                  <Lock className="w-5 h-5" />
                  <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)}
                    placeholder="••••••••••••" className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 mx-3" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="text-slate-300 hover:text-slate-500 transition-colors">
                    <EyeIcon  />
                  </button>
                </div>
                {/* Strength bar */}
                {pw && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                          style={{ background: i <= strength ? STRENGTH_COLORS[strength] : "#e2e8f0" }} />
                      ))}
                    </div>
                    <p className="text-[10px] font-semibold" style={{ color: STRENGTH_COLORS[strength] }}>
                      {STRENGTH_LABELS[strength]}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Confirm Password</label>
                <div className={`flex items-center border rounded-xl px-4 py-3 transition-all input-ring ${
                  confirmPw && !pwMatch ? "border-rose-300 bg-rose-50" : "bg-slate-50 border-slate-200"
                }`}>
                  <Lock className="w-5 h-5" />
                  <input type={showConfirm ? "text" : "password"} value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                    placeholder="••••••••••••" className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 mx-3" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-slate-300 hover:text-slate-500 transition-colors">
                    {
                      showConfirm ? <EyeOffIcon /> : <EyeIcon />
                    }
                  </button>
                </div>
              </div>

              {/* Rules */}
              <div className="space-y-1.5 pt-1">
                {rules.map(({ label, ok }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${ok ? "bg-teal-500" : "bg-slate-100"}`}>
                          {ok && <Check className="w-3 h-3 text-white" />}
                        </div>
                    <span className={`text-xs transition-colors ${ok ? "text-teal-700 font-medium" : "text-slate-400"}`}>{label}</span>
                  </div>
                ))}
              </div>

              <button onClick={handleSetPassword} disabled={!pwValid || loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ background: pwValid ? "linear-gradient(135deg, #0b1f3a, #0d3260)" : "#e2e8f0",
                  color: pwValid ? "white" : "#94a3b8", cursor: pwValid ? "pointer" : "not-allowed",
                  boxShadow: pwValid ? "0 4px 16px rgba(11,31,58,0.2)" : "none", fontFamily: "'Space Grotesk', sans-serif" }}>
                {loading ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}><circle cx="12" cy="12" r="9" strokeOpacity="0.3" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" /></svg>
                  : "Continue to MFA Setup →"}
              </button>
            </div>
          )}

          {/* ── Step 2: MFA ── */}
          {step === "mfa" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-5">
              <div>
                <h1 className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Enable two-factor authentication</h1>
                <p className="text-sm text-slate-400 mt-1">Scan the QR code with your authenticator app, then enter the 6-digit code.</p>
              </div>

              <div className="flex flex-col items-center gap-4 py-2">
                <QRCode />
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Or enter key manually</p>
                  <p className="text-sm font-mono font-bold text-slate-700 tracking-widest">DXMD-9921-K4XR-8VPQ</p>
                </div>
              </div>

              {/* OTP input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 text-center">Enter verification code</label>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, i) => (
                    <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      className="w-11 h-12 text-center text-lg font-bold border rounded-xl transition-all focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      style={{ background: digit ? "#f0fdf9" : "#f8fafc", borderColor: digit ? "#0d9488" : "#e2e8f0", color: "#0d2444" }} />
                  ))}
                </div>
              </div>

              <div className="px-4 py-3 rounded-xl border text-xs text-slate-500 leading-relaxed"
                style={{ background: "#f0f9ff", borderColor: "#bae6fd" }}>
                <span className="font-bold text-slate-700">Recommended apps:</span> Google Authenticator, Authy, Microsoft Authenticator, 1Password
              </div>

              <button onClick={handleVerifyMFA} disabled={!otpFilled || loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ background: otpFilled ? "#0d9488" : "#e2e8f0", color: otpFilled ? "white" : "#94a3b8",
                  cursor: otpFilled ? "pointer" : "not-allowed", boxShadow: otpFilled ? "0 4px 16px rgba(13,148,136,0.25)" : "none",
                  fontFamily: "'Space Grotesk', sans-serif" }}>
                {loading ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}><circle cx="12" cy="12" r="9" strokeOpacity="0.3" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" /></svg>
                  : "Verify & Activate Account →"}
              </button>
            </div>
          )}

          {/* ── Step 3: Done ── */}
          {step === "done" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center space-y-5">
              <div className="check-pop w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0b1f3a, #0d7070)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-10 h-10">
                  <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Account Activated!</h2>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Your DermaDx clinical account is now secure and ready. Your role-scoped dashboard is loading.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-left">
                {[["Role", "Dermatologist"], ["Institution", "Memorial Health"], ["MFA", "Enabled ✓"], ["Access Level", "Clinical"]].map(([k,v]) => (
                  <div key={k} className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[9px] uppercase tracking-widest text-slate-400">{k}</p>
                    <p className="text-sm font-bold text-slate-700 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #0b1f3a, #0d3260)", boxShadow: "0 4px 16px rgba(11,31,58,0.2)", fontFamily: "'Space Grotesk', sans-serif" }}>
                Go to Dashboard →
              </button>
            </div>
          )}

          <p className="text-center text-xs text-slate-400 mt-6">
            Having trouble? <a className="text-teal-600 font-semibold cursor-pointer hover:text-teal-700">Contact your system admin</a>
          </p>
        </div>
      </div>
    </div>
  );
}
