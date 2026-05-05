import { Database as LucideDatabaseIcon, Cpu as LucideCpuIcon, Grid as LucideGridIcon } from "lucide-react";
import Section from "../../_components/section";

export default function AboutPage() {
  return (
    <>
      <Section title="System Architecture" id="about">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <LucideDatabaseIcon className="w-5 h-5 text-slate-500" />, label: "Database",         value: "AWS RDS (Aurora)", status: "HEALTHY", statusColor: "#059669" },
            { icon: <LucideCpuIcon className="w-5 h-5 text-slate-500" />,      label: "Inference Engine", value: "TensorRT Edge",    status: "ACTIVE",  statusColor: "#0d9488" },
            { icon: <LucideGridIcon className="w-5 h-5 text-slate-500" />,     label: "Storage API",      value: "S3 Gateway",       status: "99.9%",   statusColor: "#0d9488" },
          ].map(({ icon, label, value, status, statusColor }) => (
            <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">{icon}</div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: statusColor }}>{status}</span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
              <p className="text-sm font-bold text-slate-700">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="About DermaDx" id="about2">
        {[
          ["Product",       "DermaDx Enterprise"],
          ["Version",       "v4.2.1-prod"],
          ["Build",         "2023T1.05.RC1"],
          ["License",       "Memorial Health Systems"],
          ["Compliance",    "HIPAA • GDPR • CE Marked"],
          ["Support Email", "enterprise@dermadx.health"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <span className="text-xs text-slate-400 font-medium">{k}</span>
            <span className="text-xs font-bold text-slate-700 font-mono">{v}</span>
          </div>
        ))}
        <p className="text-xs text-slate-400 pt-2 leading-relaxed">
          DermaDx Enterprise v4.2.1 • Licensed to Memorial Health Systems<br />
          <span className="text-slate-300">Build: 2023T1.05.RC1</span>
        </p>
      </Section>
    </>
  );
}
