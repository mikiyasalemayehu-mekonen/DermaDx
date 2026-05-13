"use client"
import { useState, useEffect } from "react";
import  useCounter  from "@/hooks/useCounter";
import useInView from "@/hooks/useInView";
import {Particles} from "../components/landing/Particles";
import {DermoscopySVG} from "../components/landing/DermoscopySVG";
import Image from "next/image";
import  Logo from "@/public/logo.svg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsRef, statsInView] = useInView(0.3);

  const c1 = useCounter(98, 1600, statsInView);
  const c2 = useCounter(12400, 1800, statsInView);
  const c3 = useCounter(47, 1400, statsInView);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#edf4ff_52%,#f7fbff_100%)] text-slate-800 overflow-x-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center"> */}
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center shadow-md">
              <Image src={Logo} alt="Logo" />

            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>DermaDx</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "How it Works", "Research", "Contact"].map((item, i) => (
              <a key={item} className={`text-sm transition-colors cursor-pointer ${i === 0 ? "text-blue-700 font-semibold" : "text-slate-500 hover:text-slate-900"}`}>{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors px-4 py-2">
              Sign In
            </Link>
            <button className="relative inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg bg-linear-to-r from-blue-600 to-blue-500 text-white hover:opacity-90 transition-all glow-teal-sm">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button className="md:hidden text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white/95 border-t border-blue-100 px-6 py-4 space-y-3 shadow-sm">
            {["Features", "How it Works", "Research", "Contact"].map((item) => (
              <a key={item} className="block text-sm text-slate-600 hover:text-slate-900 py-1 cursor-pointer">{item}</a>
            ))}
            <button className="w-full mt-2 inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg bg-linear-to-r from-blue-600 to-blue-500 text-white">Get Started →</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center clip-hero noise-overlay" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #ffffff 0%, #edf4ff 52%, #dce8ff 100%)" }}>
        <Particles />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#b7d4ff 1px, transparent 1px), linear-gradient(90deg, #b7d4ff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #bcd7ff 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <div className="fade-up">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-blue-400 pulse-ring" />
                <div className="relative w-2 h-2 rounded-full bg-blue-400" />
              </div>
              <span className="text-xs text-blue-700 font-semibold tracking-wide">FDA-Class II AI Medical Device</span>
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="text-slate-900">Diagnose</span><br />
              <span className="text-gradient">Smarter.</span><br />
              <span className="text-slate-900">Treat Earlier.</span>
            </h1>

            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-lg">
              AI-powered dermatoscopic analysis trusted by <span className="text-slate-900 font-medium">12,400+ clinicians</span> across 47 countries. Detect skin conditions with 98% precision — in seconds.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-blue-600 to-blue-500 hover:opacity-90 transition-all glow-teal">
                Start Free Trial
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-slate-600 hover:text-slate-900 border border-blue-100 hover:border-blue-200 transition-all bg-white/70">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="#111827" className="w-3 h-3 translate-x-0.5">
                    <path d="M5 3l14 9L5 21V3z" />
                  </svg>
                </div>
                Watch Demo
              </button>
            </div>

          </div>

          {/* Right — product mockup */}
          <div className="relative fade-up" style={{ animationDelay: "0.2s" }}>
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-3xl opacity-20" style={{ background: "radial-gradient(ellipse, #0099ff 0%, transparent 70%)" }} />

            <div className="relative border-gradient rounded-2xl overflow-hidden glow-teal shimmer" style={{ background: "#ffffff" }}>
              {/* Scan line effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
                <div className="scan-line absolute w-full h-0.5 opacity-30" style={{ background: "linear-gradient(90deg, transparent, #b7d4ff, transparent)" }} />
              </div>
              <DermoscopySVG />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -left-8 top-1/4 bg-white/90 border border-blue-100 rounded-xl px-4 py-3 backdrop-blur-sm shadow-sm" style={{ animationDelay: "1s" }}>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Accuracy</p>
              <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>98.4<span className="text-blue-500 text-sm">%</span></p>
            </div>
            <div className="absolute -right-8 bottom-1/4 bg-white/90 border border-blue-100 rounded-xl px-4 py-3 backdrop-blur-sm shadow-sm">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Avg. Analysis</p>
              <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1.2<span className="text-blue-500 text-sm">s</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { num: c1, suffix: "%", label: "Diagnostic Accuracy", sub: "Across all skin types" },
              { num: c2.toLocaleString(), suffix: "+", label: "Analyses Completed", sub: "This month alone" },
              { num: c3, suffix: "", label: "Countries Deployed", sub: "Global clinical reach" },
            ].map(({ num, suffix, label, sub }, i) => (
              <div key={i} className="group">
                <div className="text-5xl lg:text-6xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-gradient">{num}{suffix}</span>
                </div>
                <p className="text-slate-900 font-semibold text-lg">{label}</p>
                <p className="text-slate-500 text-sm mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-200 to-transparent" />
      </section>

      {/* ── WHY ── */}
      <section className="py-28 relative" style={{ background: "#f8fbff" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-blue-700 text-sm font-semibold tracking-[0.2em] uppercase">Why DermaDx?</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-3 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Built different.<br /><span className="text-gradient">Performs differently.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Precision AI Core",
                desc: "Our DermNet-v7 transformer model delivers sub-2 second analysis with fairness-tested performance across all six Fitzpatrick skin tones.",
                accent: "#0099ff",
              },
              {
                icon: "🩺",
                title: "Clinician-First UX",
                desc: "Designed alongside 200+ dermatologists. Every screen, every interaction optimized for fast, confident clinical decisions — not just demos.",
                accent: "#003d7a",
              },
              {
                icon: "🌍",
                title: "Works Anywhere",
                desc: "Progressive architecture runs on 2G connections. Offline-capable for field clinics, mobile units, and underserved regions worldwide.",
                accent: "#0066cc",
              },
            ].map(({ icon, title, desc, accent }, i) => (
              <div
                key={i}
                className="card-hover relative rounded-2xl p-7 border border-blue-100 group overflow-hidden bg-white shadow-sm"
              >
                {/* Accent corner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" style={{ background: `radial-gradient(circle at top right, ${accent}18, transparent 70%)` }} />

                <div className="text-3xl mb-5">{icon}</div>
                <div className="w-8 h-0.5 mb-5 rounded" style={{ background: accent }} />
                <h3 className="text-slate-900 font-bold text-xl mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>

                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors" style={{ color: accent }}>
                  Learn more
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#edf4ff" }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(#c7dbff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-blue-700 text-sm font-semibold tracking-[0.2em] uppercase">Process</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              3 steps to <span className="text-gradient">clinical clarity</span>
            </h2>
            <p className="text-slate-600 mt-4 text-lg max-w-xl mx-auto">Seamlessly integrates into your existing diagnostic workflow with zero disruption.</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-6">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px" style={{ background: "linear-gradient(90deg, transparent, #c7dbff, #79aefc, #c7dbff, transparent)" }} />

            {[
              { step: "01", title: "Capture & Upload", desc: "Snap or import a dermatoscopic image. Our intelligent pre-processor checks focus, lighting, and resolution quality automatically.", icon: "📷", color: "from-blue-500 to-blue-400" },
              { step: "02", title: "AI Analysis", desc: "DermNet-v7 evaluates morphology, pigment networks, color distribution, and border architecture in under 2 seconds.", icon: "⚡", color: "from-blue-600 to-blue-500" },
              { step: "03", title: "Decision Support", desc: "Receive a structured report with confidence scores, risk stratification, differential diagnoses, and biopsy recommendations.", icon: "📋", color: "from-blue-700 to-blue-600" },
            ].map(({ step, title, desc, icon, color }, i) => (
              <div key={i} className="relative group">
                <div className="rounded-2xl p-7 border border-blue-100 h-full transition-all duration-300 group-hover:border-blue-300 bg-white shadow-sm">
                  <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                    {icon}
                  </div>
                  <div className="text-[10px] font-bold tracking-[0.3em] text-blue-700 mb-2">{step}</div>
                  <h3 className="text-slate-900 font-bold text-xl mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="py-28 clip-trust relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f8fbff 0%, #e9f1ff 50%, #dce8ff 100%)" }}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(45deg, #c5dbff 1px, transparent 1px), linear-gradient(-45deg, #c5dbff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-700 text-sm font-semibold tracking-[0.2em] uppercase">Built for Professionals</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-3 mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Clinical-grade.<br />Enterprise-ready.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              Developed with 3 years of clinical validation, real-world dermatologist feedback, and rigorous bias testing across diverse patient populations.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {[
                { label: "HIPAA Compliant", icon: "🔒" },
                { label: "GDPR Ready", icon: "🇪🇺" },
                { label: "CE Marked", icon: "✅" },
                { label: "ISO 27001", icon: "🏆" },
                { label: "Ethical AI", icon: "⚖️" },
                { label: "SOC 2 Type II", icon: "🛡️" },
              ].map(({ label, icon }) => (
                <div key={label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-blue-100 shadow-sm">
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm text-slate-700 font-medium">{label}</span>
                </div>
              ))}
            </div>

            <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-blue-600 to-blue-500 hover:opacity-90 transition-all glow-teal">
              View Security Whitepaper
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Testimonial card */}
          <div className="space-y-4">
            {[
              { quote: "DermaDx cut our biopsy-referral turnaround from 3 days to same-day. The accuracy is genuinely impressive.", name: "Dr. Sarah Mitchell", role: "Chief of Dermatology, UCSF", avatar: "SM" },
              { quote: "The only AI tool our team actually trusts for high-risk lesion screening. It's become part of our daily workflow.", name: "Dr. James Okonkwo", role: "Consultant Dermatologist, Lagos", avatar: "JO" },
            ].map(({ quote, name, role, avatar }, i) => (
              <div key={i} className="bg-white/90 backdrop-blur rounded-2xl p-6 border border-blue-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} viewBox="0 0 24 24" fill="#f59e0b" className="w-4 h-4">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5 italic">&quot;{quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">{avatar}</div>
                  <div>
                    <p className="text-slate-900 text-sm font-semibold">{name}</p>
                    <p className="text-slate-500 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 relative overflow-hidden text-center" style={{ background: "#f8fbff" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, #ffffff 0%, #edf4ff 70%)" }} />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#c7dbff 1px, transparent 1px), linear-gradient(90deg, #c7dbff 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

        <div className="relative max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 mb-8">
            <span className="text-xs text-blue-700 font-semibold tracking-wide">🚀 Now accepting new clinical partnerships</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Elevate your<br /><span className="text-gradient">clinical precision.</span>
          </h2>

          <p className="text-slate-600 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Join 400+ healthcare facilities using DermaDx to improve early detection rates and patient outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-9 py-4 rounded-xl font-bold text-white bg-linear-to-r from-blue-600 to-blue-500 hover:opacity-90 transition-all glow-teal text-lg">
              Request Access →
            </button>
            <button className="px-9 py-4 rounded-xl font-semibold text-slate-600 hover:text-slate-900 border border-blue-100 hover:border-blue-200 transition-all text-lg bg-white/80">
              Schedule a Demo
            </button>
          </div>

          <p className="text-slate-500 text-sm mt-8">No credit card required · 30-day free trial · Full clinical validation access</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-blue-100 py-12" style={{ background: "#f2f7ff" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-black text-xs">D</span>
                </div>
                <span className="font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>DermaDx</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">Clinical AI for dermatology. Built for precision. Trusted globally.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Security", "Pricing", "Changelog"] },
              { title: "Clinical", links: ["Research", "Validation Studies", "Case Library", "Guidelines"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="text-slate-900 text-sm font-semibold mb-4">{title}</p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}><a className="text-slate-600 text-sm hover:text-slate-900 transition-colors cursor-pointer">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">© 2024 DermaDx Clinical Systems. For clinical decision support only — not a standalone diagnostic device.</p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Security", "Status"].map((item) => (
                <a key={item} className="text-slate-600 text-xs hover:text-slate-900 transition-colors cursor-pointer">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}