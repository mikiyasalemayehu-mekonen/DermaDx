"use client";

import { useState } from "react";
import {
  Bell as LucideBellIcon,
  Shield as LucideShieldIcon,
  TriangleAlert as LucideTriangleAlertIcon,
  Flag as LucideFlagIcon,
} from "lucide-react";
import Section from "../../_components/section";
import Toggle from "../../_components/toggle";

export default function NotificationsPage() {
  const [abnormalRej, setAbnormal]    = useState(true);
  const [auditFlags, setAuditFlags]   = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [criticalAlert, setCritical]  = useState(true);

  const items = [
    { icon: <LucideTriangleAlertIcon className="w-5 h-5 text-red-500" />, label: "Abnormal Rejection Rate",  desc: "Notify when IQA failure exceeds 15% of daily volume.",                   value: abnormalRej,   onChange: setAbnormal },
    { icon: <LucideFlagIcon className="w-5 h-5" />,                       label: "Audit Flags",              desc: "Immediate email alert for any clinician-contested model results.",       value: auditFlags,    onChange: setAuditFlags },
    { icon: <LucideBellIcon className="w-5 h-5" />,                       label: "Daily Email Digest",       desc: "Summarised system activity report sent each morning.",                  value: emailDigest,   onChange: setEmailDigest },
    { icon: <LucideShieldIcon className="w-5 h-5" />,                     label: "Critical System Alerts",   desc: "Push notification for downtime, model drift, or security events.",      value: criticalAlert, onChange: setCritical },
  ];

  return (
    <Section title="Alerts & Notifications" id="notifications">
      {items.map(({ icon, label, desc, value, onChange }) => (
        <div key={label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
              {icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
            </div>
          </div>
          <Toggle value={value} onChange={onChange} />
        </div>
      ))}
    </Section>
  );
}
