"use client";

import { useState } from "react";
import { HelpCircle as LucideHelpIcon, Lock as LucideLockIcon } from "lucide-react";
import Section from "../../_components/section";
import Slider from "../../_components/slider";

export default function ConfigPage() {
  const [iqaThreshold, setIqa]    = useState(42);
  const [luminance, setLuminance] = useState(65);
  const [confWarning, setConf]    = useState(85);
  const [uploadSize]              = useState("128 MB");

  return (
    <Section title="System Configuration" id="config"
      action={
        <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
          <LucideHelpIcon className="w-4 h-4" />
        </button>
      }>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Slider label="IQA Blur Threshold" value={iqaThreshold} onChange={setIqa} min={0} max={100} />
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Higher values reject slightly blurred images to ensure diagnostic precision.</p>
          </div>
          <div>
            <Slider label="Luminance Sensitivity" value={luminance} onChange={setLuminance} min={0} max={100} />
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Controls sensitivity to over- or under-exposed image regions.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Confidence Warning Threshold</label>
            <div className="flex items-center gap-2">
              <input type="number" value={confWarning} onChange={e => setConf(Number(e.target.value))} min={0} max={100}
                className="input-focus flex-1 px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono transition-all" />
              <span className="text-sm text-slate-400 font-medium">%</span>
            </div>
            <p className="text-xs text-rose-500 mt-1.5">Flags analysis results below this value for manual senior review.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Max Upload Size</label>
              <div className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600">{uploadSize}</div>
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Retention Policy</label>
              <div className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600 flex items-center gap-2">
                90 Days <LucideLockIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
