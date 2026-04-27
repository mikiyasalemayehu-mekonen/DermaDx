function DermThumb({ risk }: { risk: string }) {
  const baseColor   = risk === "high" ? "#3d1010" : risk === "medium" ? "#2a1a0a" : "#0a1f2a";
  const midColor    = risk === "high" ? "#7a2020" : risk === "medium" ? "#5a3010" : "#1a4a2a";
  const coreColor   = risk === "high" ? "#c03030" : risk === "medium" ? "#8a5010" : "#2a7a4a";
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <rect width="300" height="200" fill="#050a10" />
      <radialGradient id={`dg-${risk}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1a0505" /><stop offset="100%" stopColor="#050a10" />
      </radialGradient>
      <rect width="300" height="200" fill={`url(#dg-${risk})`} />
      <circle cx="150" cy="100" r="80" fill={baseColor} opacity="0.9" />
      <circle cx="150" cy="100" r="60" fill={midColor} opacity="0.85" />
      <circle cx="150" cy="100" r="40" fill={coreColor} opacity="0.8" />
      <circle cx="138" cy="88" r="18" fill={risk === "high" ? "#e05050" : "#888"} opacity="0.7" />
      <circle cx="162" cy="112" r="12" fill={risk === "high" ? "#c02020" : "#555"} opacity="0.6" />
      {/* Vessel network */}
      {risk === "high" && (
        <>
          <line x1="100" y1="70"  x2="200" y2="130" stroke="#ff6060" strokeWidth="1" opacity="0.3" />
          <line x1="110" y1="130" x2="190" y2="70"  stroke="#ff6060" strokeWidth="1" opacity="0.25" />
          <line x1="80"  y1="100" x2="220" y2="100" stroke="#ff4444" strokeWidth="0.8" opacity="0.2" />
        </>
      )}
      {/* Targeting reticle */}
      <rect x="90" y="50" width="120" height="100" rx="3" fill="none"
        stroke={risk === "high" ? "#ff6060" : risk === "medium" ? "#fbbf24" : "#00d4b4"}
        strokeWidth="1.2" strokeDasharray="5 3" opacity="0.7" />
      {[[90,50],[210,50],[90,150],[210,150]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5"
          fill={risk === "high" ? "#ff6060" : risk === "medium" ? "#fbbf24" : "#00d4b4"} opacity="0.9" />
      ))}
    </svg>
  );
}

export default DermThumb;