"use client";

import Image from "next/image";
import logo from "@/public/logo.svg"
import loginImage from "@/public/images/login.png"
import { useState, useEffect } from "react";
import { Mail, Lock, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuthContext } from "@/hooks";
import { useRouter } from "next/navigation";

function getDashboardRoute(role?: string | null) {
  switch (role) {
    case "super_admin":
      return "/superadmin-dashboard";
    case "administrator":
      return "/admin-dashboard";
    case "clinician":
    default:
      return "/dashboard";
  }
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const { login, isLoading, error, isAuthenticated, clearError, user } = useAuthContext();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(getDashboardRoute(user?.role));
    }
  }, [isAuthenticated, router, user?.role]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      return;
    }

    try {
      const user = await login(email, password);

      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      router.push(getDashboardRoute(user?.role));
    } catch (err) {
      // Error is handled by the auth context and displayed via `error` state
      console.error("Login failed:", err);
    }
  };

  return (
    <main className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src={loginImage}
          alt="medical login"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B2A4A]/80" />
      </div>
      <div className="w-full md:w-1/2 bg-[#F3F5F8] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl p-10 shadow-sm">

          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center shadow-md">              <Image
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
              Sign in with your assigned account
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                Email or Username
              </label>
              <div className="flex items-center bg-slate-100 rounded-md px-3 py-3">
                <Mail className="text-slate-400 text-lg mr-2" />
                <input
                  type="email"
                  placeholder="name@clinic-dx.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-transparent outline-none w-full text-sm text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-transparent outline-none w-full text-sm text-slate-700 disabled:opacity-50"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-50"
                >
                  {
                    showPassword ? (
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
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                Remember me
              </label>

              <a href="/auth/forgot-password" className="text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 text-white py-3 rounded-md font-medium hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* DIVIDER */}
            <div className="border-t pt-6 text-center text-xs text-slate-400">
              <span>
                Access is restricted to invited healthcare personnel only.
              </span>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}


