
function FairnessBar({ label, pct }: { label: string; pct: number }) {
  const color = pct >= 95 ? "#00c4a8" : pct >= 92 ? "#0ea5e9" : "#f59e0b";
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
        />
      </div>
    </div>
  );
}

export default FairnessBar;