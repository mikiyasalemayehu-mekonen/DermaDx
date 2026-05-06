function ConditionMixDonut() {
  const slices = [
    { label: "Common",      pct: 82, color: "#0d2444" },
    { label: "Acne",        pct: 42, color: "#ef4444" },
    { label: "Derm.",       pct: 28, color: "#00c4a8" },
    { label: "Other",       pct: 18, color: "#94a3b8" },
  ];

  // Draw arcs for first donut (big one showing 82%)
  const R = 54; const cx = 75; const cy = 75;
  const circumference = 2 * Math.PI * R;
  const gap = 2;

  const total = 100;
  const mainPct = 82;
  const dashMain = (mainPct / 100) * circumference;
  const gapMain  = circumference - dashMain;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative" style={{ width: 150, height: 150 }}>
        <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
          {/* Background ring */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f1f5f9" strokeWidth="14" />
          {/* Main arc — navy 82% */}
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke="#0d2444"
            strokeWidth="14"
            strokeDasharray={`${dashMain} ${gapMain}`}
            strokeLinecap="round"
          />
          {/* Teal accent arc — starts at ~60% mark */}
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke="#00c4a8"
            strokeWidth="10"
            strokeDasharray={`${(42 / 100) * circumference * 0.5} ${circumference}`}
            strokeDashoffset={-dashMain * 0.6}
            strokeLinecap="round"
          />
          {/* Red accent */}
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke="#ef4444"
            strokeWidth="8"
            strokeDasharray={`${(28 / 100) * circumference * 0.4} ${circumference}`}
            strokeDashoffset={-dashMain * 0.3}
            strokeLinecap="round"
          />
        </svg>
        {/* Centre text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>82%</span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Common</span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-3">
        {[["#ef4444","Acne","42%"],["#00c4a8","Derm.","28%"]].map(([color,label,pct]) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-[11px] text-slate-500">{label}</span>
            <span className="text-[11px] font-bold text-slate-700">{pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ConditionMixDonut;