"use client";

import Image from "next/image";
import logo from "@/public/logo.svg"
import login from "@/public/images/login.png"
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src = {login}
          alt="medical login"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B2A4A]/80" />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 bg-[#F3F5F8] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl p-10 shadow-sm">

          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-[#0B2A4A] rounded-lg flex items-center justify-center shadow-md">
            <Image
                src={logo}
                alt="Logo"
              />

            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to your clinician account
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                Email or Username
              </label>
              <div className="flex items-center bg-slate-100 rounded-md px-3 py-3">
                <span className="material-symbols-outlined text-slate-400 text-lg mr-2">
                  mail
                </span>
                <input
                  type="text"
                  placeholder="name@clinic-dx.com"
                  className="bg-transparent outline-none w-full text-sm text-slate-700 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                Password
              </label>
              <div className="flex items-center bg-slate-100 rounded-md px-3 py-3">
                <span className="material-symbols-outlined text-slate-400 text-lg mr-2">
                  lock
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full text-sm text-slate-700"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>

              <a className="text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>
            <button className="w-full bg-[#0B2A4A] text-white py-3 rounded-md font-medium hover:bg-[#0A2540] transition">
              Sign In
            </button>

            {/* DIVIDER */}
            <div className="border-t pt-6 text-center text-xs text-slate-400">
              <span>
                Access is restricted to registered healthcare personnel only.
              </span>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}




// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);

//   return (
//     <main className="min-h-screen flex" >
//       {/* ── LEFT PANEL ─────────────────────────────────────────────────────── */}

//     <div className="hidden md:flex w-1/2 relative">
//        <Image
//           src = {login}
//           alt="medical login"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-[#0B2A4A]/80" />
//       </div>

//       {/* ── RIGHT PANEL ─────────────────────────────────────────────────────── */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12" style={{ background: "#F3F5F8" }}>
//         <div className="w-full max-w-md fade-in">

//           {/* Card */}
//           <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100">

//             {/* Logo */}
//             <div className="flex justify-center mb-8">
//               <div className="relative">
//                 <div className="ring-pulse absolute inset-0 rounded-xl bg-teal-400/20" />
//                 <div className="relative w-12 h-12 rounded-xl bg-[#0B2A4A] flex items-center justify-center shadow-lg">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-6 h-6">
//                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//                     <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Heading */}
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Welcome Back</h2>
//               <p className="text-sm text-slate-400 mt-1.5">Sign in to your clinician account</p>
//             </div>

//             {/* Form */}
//             <div className="space-y-5">
//               {/* Email */}
//               <div>
//                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email or Username</label>
//                 <div className="input-focus flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 transition-all duration-200">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={1.8} className="w-4 h-4 shrink-0 mr-3">
//                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//                     <polyline points="22,6 12,13 2,6" />
//                   </svg>
//                   <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="name@clinic-dx.com"
//                     className="bg-transparent outline-none w-full text-sm text-slate-700 placeholder:text-slate-300"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
//                 <div className="input-focus flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 transition-all duration-200">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={1.8} className="w-4 h-4 shrink-0 mr-3">
//                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                     <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//                   </svg>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="bg-transparent outline-none w-full text-sm text-slate-700 placeholder:text-slate-300"
//                   />
//                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-300 hover:text-slate-500 transition-colors ml-2 shrink-0">
//                     {showPassword ? (
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//                         <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//                         <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
//                       </svg>
//                     ) : (
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                         <circle cx="12" cy="12" r="3" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember + Forgot */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-2.5 cursor-pointer select-none">
//                   <button
//                     type="button"
//                     onClick={() => setRemember(!remember)}
//                     className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${remember ? "bg-[#0B2A4A] border-[#0B2A4A]" : "border-slate-300 bg-white"}`}
//                   >
//                     {remember && (
//                       <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-2.5 h-2.5">
//                         <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     )}
//                   </button>
//                   <span className="text-sm text-slate-500">Remember me</span>
//                 </label>
//                 <a className="text-sm font-semibold text-[#0B2A4A] hover:text-teal-600 transition-colors cursor-pointer">Forgot password?</a>
//               </div>

//               {/* Sign In button */}
//               <button className="btn-glow w-full bg-[#0B2A4A] hover:bg-[#0d3260] text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.98]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
//                 Sign In →
//               </button>

//               {/* Divider */}
//               <div className="relative flex items-center gap-3 py-1">
//                 <div className="flex-1 h-px bg-slate-100" />
//                 <span className="text-xs text-slate-300 font-medium">or continue with</span>
//                 <div className="flex-1 h-px bg-slate-100" />
//               </div>

//               {/* SSO Options */}
//               <div className="grid grid-cols-2 gap-3">
//                 {[
//                   {
//                     label: "Microsoft SSO",
//                     icon: (
//                       <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
//                         <rect x="1" y="1" width="10" height="10" fill="#f25022" rx="1" />
//                         <rect x="13" y="1" width="10" height="10" fill="#7fba00" rx="1" />
//                         <rect x="1" y="13" width="10" height="10" fill="#00a4ef" rx="1" />
//                         <rect x="13" y="13" width="10" height="10" fill="#ffb900" rx="1" />
//                       </svg>
//                     ),
//                   },
//                   {
//                     label: "Google",
//                     icon: (
//                       <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
//                         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//                         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//                         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
//                         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
//                       </svg>
//                     ),
//                   },
//                 ].map(({ label, icon }) => (
//                   <button key={label} className="flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-sm text-slate-600 font-medium">
//                     {icon}{label}
//                   </button>
//                 ))}
//               </div>

//               {/* Footer note */}
//               <div className="pt-2 text-center">
//                 <p className="text-[11px] text-slate-300 leading-relaxed">Access restricted to registered healthcare personnel only.</p>
//               </div>
//             </div>
//           </div>

//           {/* Outside card links */}
//           <p className="text-center text-sm text-slate-400 mt-6">
//             Need access?{" "}
//             <a className="text-[#0B2A4A] font-semibold hover:text-teal-600 transition-colors cursor-pointer">Request credentials →</a>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }