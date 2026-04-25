"use client";

import { useState, useRef, useCallback } from "react";
import { TopBar } from "../_components/shell";
import { Check,Shield,CloudUpload,Image,ArrowRight,Info ,X,SquareCheckBig,Lock} from "lucide-react";

const QUALITY_REQS = [
  "Optimal focus on the lesion",
  "Uniform clinical lighting",
  "Minimum resolution: 1024px",
  "Center lesion in frame",
];

export default function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File | null | undefined) => {
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const clearFile = () => { setFile(null); setPreview(null); };

  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fb]">
      <TopBar crumbs={["Home", "New Analysis", "Upload Image"]} />

      <main className="flex-1 px-8 py-7 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f2744]">New Analysis</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            Upload a high-resolution dermatoscopic image for clinical decision support. Our AI models analyze morphology, color distribution, and border architecture.
          </p>
        </div>

        <div className="flex gap-5 items-start">
          {/* Drop zone */}
          <div className="flex-1">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 overflow-hidden flex items-center justify-center ${
                dragOver
                  ? "border-teal-400 bg-teal-50/60"
                  : file
                  ? "border-[#0f2744]/20 bg-white"
                  : "border-gray-300 bg-white hover:border-[#0f2744]/40 hover:bg-[#f8fafd]"
              }`}
              style={{ minHeight: 380 }}
            >
              {preview ? (
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Upload preview" className="w-full object-contain rounded-xl" style={{ maxHeight: 380 }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl pointer-events-none" />
                  <button
                    onClick={clearFile}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 hover:bg-white shadow transition-all"
                  >
                    <X className="w-4 h-4"/>
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur rounded-lg px-3 py-1.5">
                      <span className="text-[#0f2744]"><Image   className="w-5 h-5"/></span>
                      <span className="text-xs font-semibold text-[#0f2744] truncate max-w-[200px]">{file?.name}</span>
                    </div>
                    <span className="bg-teal-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-widest">READY</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-colors ${dragOver ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-400"}`}>
                    <CloudUpload className="w-8 h-8"/>
                  </div>
                  <p className="text-base font-bold text-[#0f2744] mb-1">Drag and drop your image here</p>
                  <p className="text-xs text-gray-400 mb-7">Accepted formats: JPEG, PNG, WebP. Maximum file size: 10MB.</p>
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="flex items-center gap-2 bg-[#0f2744] hover:bg-[#1a3d6b] text-white text-sm font-semibold px-7 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <Image  className="w-5 h-5"/> Browse Files
                  </button>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right panels */}
          <div className="w-64 flex flex-col gap-4 shrink-0">
            {/* Privacy & Security */}
            <div className="bg-[#0f2744] rounded-xl p-5 relative overflow-hidden">
              <div className="absolute -bottom-6 -right-6 opacity-[0.07] text-white pointer-events-none">
                <Lock className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-teal-400 shrink-0"><Shield className="w-5 h-5" /></span>
                <h3 className="text-white text-[10px] font-bold uppercase tracking-widest">Privacy &amp; Security</h3>
              </div>
              <p className="text-white/55 text-xs leading-relaxed">
                Images processed in memory only. No patient data or clinical images are permanently stored on our servers unless opted-in for longitudinal tracking. HIPAA compliant.
              </p>
            </div>

            {/* Quality Requirements */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#0f2744]"><SquareCheckBig className="w-5 h-5"/></span>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0f2744]">Quality Requirements</h3>
              </div>
              <ul className="space-y-2.5">
                {QUALITY_REQS.map((req) => (
                  <li key={req} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                      <span className="text-white"><Check className="w-3.5 h-3.5"/></span>
                    </div>
                    <span className="text-xs text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reference example */}
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full">
                  <rect width="64" height="64" fill="#c9b49a" />
                  <circle cx="32" cy="32" r="24" fill="#9b7a56" opacity="0.5" />
                  <circle cx="32" cy="32" r="16" fill="#7a5230" opacity="0.65" />
                  <circle cx="29" cy="29" r="6" fill="#3d2010" opacity="0.8" />
                  <circle cx="37" cy="35" r="3.5" fill="#3d2010" opacity="0.5" />
                  <circle cx="26" cy="35" r="2" fill="#5a3520" opacity="0.4" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Reference Example</p>
                <p className="text-sm font-bold text-[#0f2744] leading-tight">Standard Dermoscopy</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom action bar */}
      <div className="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-gray-400">
          <Info className="w-4 h-4" />
          <span className="text-xs">By submitting, you agree to our clinician terms and diagnostic guidelines.</span>
        </div>
        <button
          disabled={!file}
          className={`flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-xl shadow-md transition-all active:scale-95 ${
            file ? "bg-teal-500 hover:bg-teal-600 text-white cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Process Analysis <ArrowRight className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
}
