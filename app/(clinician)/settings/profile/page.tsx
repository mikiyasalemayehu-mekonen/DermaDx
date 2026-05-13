"use client";

import { useState } from "react";
import { Check as IconCheck, Save as IconSave, Camera as IconCamera } from "lucide-react";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Aris Thorne");
  const [phone,    setPhone]    = useState("+1 (555) 012-3456");
  const [saved,    setSaved]    = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="bg-[#f4f7fb] rounded-xl p-6 flex-1">
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-5">Profile Settings</p>
      <div className="flex items-center gap-4 mb-7">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md bg-teal-100">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <rect width="64" height="64" fill="#e0f2f1" />
              <rect x="16" y="38" width="32" height="26" rx="4" fill="#546e7a" />
              <circle cx="32" cy="26" r="13" fill="#ffccbc" />
              <ellipse cx="32" cy="16" rx="12" ry="7" fill="#37474f" />
              <rect x="24" y="38" width="16" height="6" rx="2" fill="#78909c" />
              <polygon points="32,41 29,52 32,55 35,52" fill="#1a237e" opacity="0.7" />
              <rect x="20" y="44" width="10" height="7" rx="1" fill="#4caf50" opacity="0.9" />
              <rect x="21" y="45" width="8" height="1.5" rx="0.5" fill="white" />
              <rect x="21" y="47.5" width="5" height="1.5" rx="0.5" fill="white" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center border-2 border-white">
            <IconCamera />
          </div>
        </div>
        <div>
          <p className="font-bold text-[#0f2744] text-base leading-tight">Dr. Aris Thorne</p>
          <p className="text-xs text-gray-400 mt-0.5">Senior Dermatopathologist • St. Jude Medical</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1.5">Full Name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 focus:border-[#0f2744]/30 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1.5">Email (Read-only)</label>
          <input value="a.thorne@stjude.med" readOnly
            className="w-full px-3 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed" />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-xs text-gray-500 font-medium mb-1.5">Phone Number</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)}
          className="w-full max-w-xs px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 focus:border-[#0f2744]/30 transition-all" />
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave}
          className={`flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl shadow transition-all active:scale-95 ${
            saved ? "bg-teal-500 text-white" : "bg-blue-900 hover:bg-blue-700 text-white"
          }`}>
          {saved ? <><IconCheck /> Saved!</> : <><IconSave /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}
