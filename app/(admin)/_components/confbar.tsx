// ── Confidence bar ────────────────────────────────────────────────────────────
function ConfBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-sm font-bold text-slate-700">{value}%</span>
    </div>
  );
}

export default ConfBar;