"use client";

import Image from "next/image";
import logo from "@/public/logo.svg"
import login from "@/public/images/login.png"
import { useState } from "react";
import { Mail, Lock,EyeIcon,EyeOffIcon } from 'lucide-react';

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
      <div className="w-full md:w-1/2 bg-[#F3F5F8] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl p-10 shadow-sm">

          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
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
                <Mail className="text-slate-400 text-lg mr-2" />
                <input
                  type="text"
                  placeholder="name@clinic-dx.com"
                  className="bg-transparent outline-none w-full text-sm text-slate-700 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                Password
              </label>
              <div className="flex items-center bg-slate-100 rounded-md px-3 py-3">
                <Lock className="text-slate-400 text-lg mr-2" />

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
                  {
                    showPassword? (
                      <EyeOffIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />

                    )
                  }
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
            <button className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-[#0A2540] transition">
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


