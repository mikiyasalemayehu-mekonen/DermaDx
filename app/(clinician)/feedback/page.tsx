"use client";

import { useState, useEffect } from "react";
import { TopBar } from "../_components/shell";
import StarRating from "../_components/starrating";
import { Check, Send, Loader2 } from "lucide-react";
import { submitFeedback, getFeedback, type FeedbackItem } from "@/lib/api/feedback";
import { getAnalyses, type AnalysisResult } from "@/lib/api/analyses";


const FEEDBACK_CATEGORIES = [
  "AI Diagnosis Accuracy",
  "UI / User Experience",
  "Image Upload & Processing",
  "Report Generation",
  "System Performance",
  "Other",
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
  const [diagnosisId, setDiagnosisId] = useState("");
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [category,  setCategory]  = useState("");
  const [rating,    setRating]    = useState(0);
  const [message,   setMessage]   = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [section,   setSection]   = useState<"submit" | "history">("submit");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnalyses = async () => {
      try {
        const data = await getAnalyses({ limit: 20 });
        setAnalyses(data);
      } catch (err) {
        console.error("Failed to load analyses", err);
      }
    };
    void loadAnalyses();
  }, []);

  useEffect(() => {
    if (section === "history") {
      const loadFeedback = async () => {
        setIsLoadingFeedback(true);
        setError(null);
        try {
          const data = await getFeedback();
          setFeedback(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load feedback");
        } finally {
          setIsLoadingFeedback(false);
        }
      };
      void loadFeedback();
    }
  }, [section]);
  const canSubmit = diagnosisId !== "" && category !== "" && rating > 0 && message.trim().length >= 10;
  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsLoading(true);
    setError(null);
    try {
      const feedbackText = `[${category}] ${message}`;
      await submitFeedback({
        diagnosis_id: diagnosisId,
        rating,
        comments: feedbackText,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDiagnosisId(""); setCategory(""); setRating(0); setMessage("");
        setSection("history");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit feedback");
    } finally {
      setIsLoading(false);
    }
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
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

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
                  {/* Diagnosis Selection */}
                  <div>
                    <label className="block text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">Analysis / Diagnosis (Required)</label>
                    <select
                      value={diagnosisId}
                      onChange={(e) => setDiagnosisId(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 focus:border-[#0f2744]/30 transition-all"
                    >
                      <option value="">Select an analysis...</option>
                      {analyses.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.id} - {a.condition} ({a.confidence}%)
                        </option>
                      ))}
                    </select>
                  </div>
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
                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      onClick={() => void handleSubmit()}
                      disabled={!canSubmit || isLoading}
                      className={`flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl shadow transition-all active:scale-95 ${
                        canSubmit && !isLoading
                          ? "bg-[#0f2744] hover:bg-[#1a3d6b] text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4"/>}
                      {isLoading ? "Submitting..." : "Submit Feedback"}
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
              <span className="text-xs text-gray-400">{feedback.length} total</span>
            </div>
            {isLoadingFeedback ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading feedback...</span>
              </div>
            ) : feedback.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-400 text-sm">
                No feedback submitted yet.
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {feedback.map((fb) => (
                  <div key={fb.id} className="px-6 py-5 hover:bg-[#f8fafd] transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold text-[#0f2744]">{fb.id}</span>
                        <span className="text-gray-300">·</span>
                          <span className="text-xs text-gray-400">{fb.diagnosis_id}</span>
                        <span className="text-gray-300">·</span>
                          <span className="text-xs text-gray-400">{new Date(fb.date).toLocaleDateString()}</span>
                      </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{fb.comments}</p>
                        <div className="mt-2 flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-sm ${i < fb.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                          ))}
                        </div>
                    </div>
                      <span className="shrink-0 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-teal-100 text-teal-700">
                        SUBMITTED
                    </span>
                  </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
