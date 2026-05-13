"use client";

import { useState } from "react";
import { TopBar } from "../_components/shell";
import { FeedbackItem } from "@/types";
import StarRating from "../_components/starrating";
import { Check ,Send, Star} from "lucide-react";


const FEEDBACK_CATEGORIES = [
  "AI Diagnosis Accuracy",
  "UI / User Experience",
  "Image Upload & Processing",
  "Report Generation",
  "System Performance",
  "Other",
];



const RECENT_FEEDBACK: FeedbackItem[] = [
  {
    id: "FB-0041", category: "AI Diagnosis Accuracy",
    excerpt: "The confidence score for melanoma cases seems slightly over-reported compared to biopsy outcomes.",
    date: "Oct 22, 2023", status: "Under Review", statusStyle: "bg-amber-100 text-amber-700", rating: 3,
  },
  {
    id: "FB-0038", category: "UI / User Experience",
    excerpt: "Would love a dark mode option — long sessions in bright clinical environments are tough.",
    date: "Oct 18, 2023", status: "Acknowledged", statusStyle: "bg-teal-100 text-teal-700", rating: 5,
  },
  {
    id: "FB-0034", category: "Report Generation",
    excerpt: "PDF export sometimes cuts off the confidence chart on the second page.",
    date: "Oct 11, 2023", status: "Resolved", statusStyle: "bg-emerald-100 text-emerald-700", rating: 4,
  },
];

const RESPONSE_TIMES = [
  { label: "Bug Reports",       time: "24–48 hrs" },
  { label: "Feature Requests",  time: "2–5 days" },
  { label: "General Feedback",  time: "1 week" },
];

const WHY_MATTERS = [
  { icon: "🎯", text: "Improves AI diagnostic accuracy" },
  { icon: "🔒", text: "Helps us maintain HIPAA standards" },
  { icon: "⚡", text: "Prioritises feature development" },
  { icon: "🩺", text: "Shapes the clinical workflow" },
];


export default function FeedbackPage() {
  const [category,  setCategory]  = useState("");
  const [rating,    setRating]    = useState(0);
  const [message,   setMessage]   = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [section,   setSection]   = useState<"submit" | "history">("submit");

  const canSubmit = category !== "" && rating > 0 && message.trim().length >= 10;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCategory(""); setRating(0); setMessage(""); setAnonymous(false);
      setSection("history");
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fb]">
      <TopBar crumbs={["Home", "Feedback"]} />

      <main className="flex-1 px-8 py-7 overflow-auto space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-2xl font-bold text-[#0f2744]">Feedback</h1>
          <p className="text-sm text-gray-500 mt-0.5">Help us improve DermaDx by sharing your clinical experience and suggestions.</p>
        </div>

        {/* Section tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm w-fit">
          {(["submit", "history"] as const).map((id) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                section === id ? "bg-blue-900 text-white shadow" : "text-gray-500 hover:text-[#0f2744]"
              }`}
            >
              {id === "submit" ? "Submit Feedback" : "My Submissions"}
            </button>
          ))}
        </div>

        {section === "submit" ? (
          <div className="flex gap-5 items-start">
            {/* Form */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6 space-y-5">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                    <span className="text-teal-600"><Check className="w-4 h-4"/></span>
                  </div>
                  <p className="text-lg font-bold text-[#0f2744]">Thank you for your feedback!</p>
                  <p className="text-sm text-gray-400 mt-1">Your submission has been received and will be reviewed by our team.</p>
                </div>
              ) : (
                <>
                  {/* Category */}
                  <div>
                    <label className="block text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">Feedback Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {FEEDBACK_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all text-left leading-tight ${
                            category === cat
                              ? "bg-[#0f2744] text-white border-[#0f2744]"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#0f2744]/30 hover:bg-[#f0f4fa]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">Overall Rating</label>
                    <StarRating value={rating} onChange={setRating} />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">
                      Your Feedback
                      <span className="ml-2 text-gray-300 font-normal normal-case tracking-normal">{message.length} / 500</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                      rows={5}
                      placeholder="Describe your experience, issue, or suggestion in detail..."
                      className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 focus:border-[#0f2744]/30 transition-all"
                    />
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <button
                        type="button"
                        onClick={() => setAnonymous(!anonymous)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          anonymous ? "bg-[#0f2744] border-[#0f2744]" : "border-gray-300 bg-white"
                        }`}
                      >
                        {anonymous && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-2.5 h-2.5">
                            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <span className="text-xs text-gray-500">Submit anonymously</span>
                    </label>

                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      className={`flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl shadow transition-all active:scale-95 ${
                        canSubmit
                          ? "bg-[#0f2744] hover:bg-[#1a3d6b] text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-4 h-4"/> Submit Feedback
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Right info panel */}
            <div className="w-60 shrink-0 space-y-4">
              <div className="bg-blue-900 rounded-xl p-5">
                <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Why Your Feedback Matters</p>
                <ul className="space-y-3">
                  {WHY_MATTERS.map(({ icon, text }) => (
                    <li key={text} className="flex items-start gap-2.5">
                      <span className="text-base leading-none mt-0.5">{icon}</span>
                      <span className="text-white/60 text-xs leading-snug">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-3">Response Time</p>
                <div className="space-y-2">
                  {RESPONSE_TIMES.map(({ label, time }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{label}</span>
                      <span className="text-xs font-bold text-[#0f2744]">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* History tab */
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <p className="text-sm font-bold text-[#0f2744] uppercase tracking-widest">Recent Submissions</p>
              <span className="text-xs text-gray-400">{RECENT_FEEDBACK.length} total</span>
            </div>
            <div className="divide-y divide-gray-50">
              {RECENT_FEEDBACK.map((fb) => (
                <div key={fb.id} className="px-6 py-5 hover:bg-[#f8fafd] transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#0f2744]">{fb.id}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{fb.category}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{fb.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{fb.excerpt}</p>
                      <Star />
                    </div>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${fb.statusStyle}`}>
                      {fb.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
