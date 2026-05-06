"use client";

import { useState } from "react";
import { ChevronDown as IconChevronDown } from "lucide-react";

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${value ? "bg-teal-500" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? "translate-x-4" : ""}`} />
    </button>
  );
}

export default function PreferencesPage() {
  const [theme,  setTheme]  = useState("System");
  const [lang,   setLang]   = useState("English");
  const [notifs, setNotifs] = useState(true);

  return (
    <div className="bg-[#f4f7fb] rounded-xl p-6 flex-1 space-y-5">
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Preferences</p>
      <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
        {[
          { label: "Theme",    options: ["Light", "Dark", "System"],              value: theme, set: setTheme },
          { label: "Language", options: ["English", "Dutch", "French", "German"], value: lang,  set: setLang },
        ].map(({ label, options, value, set }) => (
          <div key={label} className="flex items-center justify-between">
            <p className="text-sm text-gray-700 font-medium">{label}</p>
            <div className="relative">
              <select value={value} onChange={(e) => set(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none cursor-pointer">
                {options.map((o) => <option key={o}>{o}</option>)}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <IconChevronDown />
              </span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 font-medium">Email Notifications</p>
            <p className="text-xs text-gray-400">Receive case update summaries</p>
          </div>
          <Toggle value={notifs} onChange={() => setNotifs(!notifs)} />
        </div>
      </div>
    </div>
  );
}
