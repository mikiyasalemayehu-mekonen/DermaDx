// ── Slider ────────────────────────────────────────────────────────────────────
function Slider({ value, onChange, min = 0, max = 100, label }: { value: number; onChange: (v: number) => void; min?: number; max?: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md" style={{ background: "#f0f4ff", color: "#0d2444" }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full cursor-pointer" style={{ accentColor: "#0d9488" }} />
    </div>
  );
}

export default Slider;