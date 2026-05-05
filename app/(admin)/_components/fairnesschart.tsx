
const FAIRNESS_DATA = [
  { label: "F-I",   weekly: 96, monthly: 94 },
  { label: "F-II",  weekly: 95, monthly: 93 },
  { label: "F-III", weekly: 94, monthly: 92 },
  { label: "F-IV",  weekly: 93, monthly: 90 },
  { label: "F-V",   weekly: 91, monthly: 89 },
  { label: "F-VI",  weekly: 88, monthly: 85 },
];
// ── Fairness bar chart (SVG) ──────────────────────────────────────────────────
function FairnessChart({ view }: { view: "weekly" | "monthly" }) {
  const W = 480; const H = 180;
  const barW = 38; const gap = 34;
  const totalW = FAIRNESS_DATA.length * (barW + gap) - gap;
  const startX = (W - totalW) / 2;
  const maxH = 130;

  return (
    <svg viewBox={`0 0 ${W} ${H + 36}`} className="w-full" style={{ fontFamily: "monospace" }}>
      {/* Y-axis grid lines */}
      {[80, 85, 90, 95, 100].map((v) => {
        const y = H - ((v - 75) / 25) * maxH;
        return (
          <g key={v}>
            <line x1={startX - 8} y1={y} x2={W - startX + 8} y2={y} stroke="#f1f5f9" strokeWidth="1" />
            <text x={startX - 12} y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="9">{v}%</text>
          </g>
        );
      })}

      {FAIRNESS_DATA.map(({ label, weekly, monthly }, i) => {
        const val = view === "weekly" ? weekly : monthly;
        const x = startX + i * (barW + gap);
        const barH = ((val - 75) / 25) * maxH;
        const y = H - barH;
        const color = val >= 95 ? "#00c4a8" : val >= 92 ? "#0ea5e9" : val >= 89 ? "#f59e0b" : "#ef4444";
        return (
          <g key={label}>
            {/* Background bar */}
            <rect x={x} y={H - maxH} width={barW} height={maxH} rx="4" fill="#f8fafc" />
            {/* Value bar with gradient */}
            <defs>
              <linearGradient id={`bar-${i}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={color} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <rect x={x} y={y} width={barW} height={barH} rx="4" fill={`url(#bar-${i})`} />
            {/* Value label on top */}
            <text x={x + barW / 2} y={y - 5} textAnchor="middle" fill={color} fontSize="9" fontWeight="700">{val}%</text>
            {/* X label */}
            <text x={x + barW / 2} y={H + 18} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default FairnessChart;