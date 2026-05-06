// ── IQA Failures bar chart (SVG) ──────────────────────────────────────────────
function IQAFailuresChart() {
  const categories = [
    { label: "Blur",  value: 42, color: "#0d2444" },
    { label: "Light", value: 31, color: "#0ea5e9" },
    { label: "Frame", value: 18, color: "#00c4a8" },
    { label: "Other", value: 9,  color: "#94a3b8" },
  ];
  const max = 42; const W = 260; const H = 100;
  const bw = 36; const gap = 22;
  const totalW = categories.length * (bw + gap) - gap;
  const sx = (W - totalW) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full">
      {[0.5, 1].map((f, i) => (
        <line key={i} x1={0} y1={H * f} x2={W} y2={H * f} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      {categories.map(({ label, value, color }, i) => {
        const barH = (value / max) * H;
        const x = sx + i * (bw + gap);
        const y = H - barH;
        return (
          <g key={label}>
            <defs>
              <linearGradient id={`iqa-${i}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={color} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <rect x={x} y={H} width={bw} height={0} rx="4" fill={`url(#iqa-${i})`}>
              <animate attributeName="y" from={H} to={y} dur="0.6s" begin={`${i * 0.1}s`} fill="freeze" />
              <animate attributeName="height" from={0} to={barH} dur="0.6s" begin={`${i * 0.1}s`} fill="freeze" />
            </rect>
            <text x={x + bw / 2} y={y - 5} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{value}%</text>
            <text x={x + bw / 2} y={H + 18} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default IQAFailuresChart;