export default function AboutPage() {
  const INFO = [
    ["Product",       "DermaDx Clinical Portal"],
    ["Version",       "v4.2.1-stable"],
    ["Model Engine",  "DermNet-v7 (Transformer)"],
    ["Compliance",    "HIPAA Compliant • CE Marked"],
    ["Support Email", "support@dermadx.health"],
    ["Last Updated",  "October 2023"],
  ];

  return (
    <div className="bg-[#f4f7fb] rounded-xl p-6 flex-1 space-y-4">
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">About DermaDx</p>
      <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
        {INFO.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-400 font-medium">{k}</span>
            <span className="text-xs font-semibold text-[#0f2744]">{v}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 leading-relaxed">
        DermaDx is a clinical decision support tool intended for use by licensed dermatologists and pathologists. It is not a standalone diagnostic device.
      </p>
    </div>
  );
}
