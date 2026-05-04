export function DermoscopySVG() {
  return (
    <svg viewBox="0 0 520 480" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Screen bezel */}
      <rect x="20" y="20" width="480" height="440" rx="24" fill="#0a1628" stroke="#1e3a5f" strokeWidth="2" />
      <rect x="36" y="36" width="448" height="408" rx="16" fill="#0d1f3c" />

      {/* Image area */}
      <rect x="36" y="36" width="280" height="260" rx="16" fill="#091525" />
      {/* Dermoscopy simulation */}
      <circle cx="176" cy="166" r="110" fill="#1a0e0a" />
      <circle cx="176" cy="166" r="90" fill="#2d1a10" />
      <circle cx="176" cy="166" r="70" fill="#3d2218" opacity="0.9" />
      <circle cx="165" cy="155" r="30" fill="#1a0a08" opacity="0.8" />
      <circle cx="185" cy="175" r="20" fill="#0d0605" opacity="0.7" />
      <circle cx="155" cy="178" r="15" fill="#2a1008" opacity="0.6" />
      {/* Pigment network lines */}
      {[[140,130,210,190],[150,160,200,150],[170,135,165,195],[130,165,220,170]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5a3020" strokeWidth="1.5" opacity="0.4" />
      ))}
      {/* Analysis overlay */}
      <rect x="120" y="110" width="112" height="112" rx="4" fill="none" stroke="#00d4b4" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.9" />
      <circle cx="176" cy="166" r="45" fill="none" stroke="#00d4b4" strokeWidth="1" opacity="0.5" />
      {/* Corner markers */}
      {[[120,110],[232,110],[120,222],[232,222]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#00d4b4" opacity="0.9" />
      ))}
      {/* Crosshair */}
      <line x1="176" y1="145" x2="176" y2="125" stroke="#00d4b4" strokeWidth="1" opacity="0.7" />
      <line x1="176" y1="187" x2="176" y2="207" stroke="#00d4b4" strokeWidth="1" opacity="0.7" />
      <line x1="155" y1="166" x2="135" y2="166" stroke="#00d4b4" strokeWidth="1" opacity="0.7" />
      <line x1="197" y1="166" x2="217" y2="166" stroke="#00d4b4" strokeWidth="1" opacity="0.7" />

      {/* Confidence meter */}
      <rect x="50" y="270" width="250" height="14" rx="7" fill="#112240" />
      <rect x="50" y="270" width="220" height="14" rx="7" fill="url(#confGrad)" />
      <defs>
        <linearGradient id="confGrad" x1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00b4d8" />
          <stop offset="100%" stopColor="#00d4a4" />
        </linearGradient>
      </defs>
      <text x="307" y="282" fill="#00d4b4" fontSize="11" fontFamily="monospace" fontWeight="bold">94%</text>

      {/* Labels */}
      <rect x="50" y="296" width="130" height="22" rx="4" fill="#0f2744" />
      <text x="58" y="311" fill="#94b8d8" fontSize="10" fontFamily="monospace">SUSPECTED CONDITION</text>
      <rect x="50" y="324" width="200" height="28" rx="6" fill="#112a4a" />
      <text x="62" y="343" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold">Melanoma (Superficial)</text>
      <rect x="258" y="324" width="60" height="28" rx="6" fill="#ef4444" opacity="0.15" />
      <text x="268" y="343" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">HIGH RISK</text>

      {/* Right panel — stats */}
      <rect x="332" y="36" width="152" height="408" rx="12" fill="#091525" />
      <text x="344" y="64" fill="#4a7fa5" fontSize="9" fontFamily="monospace" letterSpacing="2">ANALYSIS STATS</text>

      {[
        { label: "ABCD Score", value: "7.8", color: "#ef4444" },
        { label: "Border", value: "Irregular", color: "#f59e0b" },
        { label: "Color Var.", value: "High", color: "#ef4444" },
        { label: "Diameter", value: "8.2mm", color: "#f59e0b" },
        { label: "Symmetry", value: "0.31", color: "#00d4b4" },
      ].map(({ label, value, color }, i) => (
        <g key={i} transform={`translate(344, ${84 + i * 58})`}>
          <rect width="128" height="44" rx="8" fill="#0d1f3c" />
          <text x="10" y="16" fill="#4a7fa5" fontSize="8" fontFamily="monospace" letterSpacing="1">{label}</text>
          <text x="10" y="34" fill={color} fontSize="14" fontFamily="monospace" fontWeight="bold">{value}</text>
        </g>
      ))}

      {/* Bottom action bar */}
      <rect x="36" y="378" width="280" height="66" rx="12" fill="#091525" />
      <text x="52" y="400" fill="#4a7fa5" fontSize="9" fontFamily="monospace" letterSpacing="1.5">RECOMMENDATION</text>
      <text x="52" y="420" fill="#ffffff" fontSize="11" fontFamily="monospace">Urgent biopsy referral advised</text>
      <rect x="52" y="430" width="120" height="6" rx="3" fill="#112240" />
      <rect x="52" y="430" width="98" height="6" rx="3" fill="#ef4444" opacity="0.8" />

      <rect x="190" y="424" width="110" height="28" rx="8" fill="#00d4b4" opacity="0.15" />
      <text x="220" y="442" fill="#00d4b4" fontSize="10" fontFamily="monospace" fontWeight="bold">VIEW REPORT →</text>

      {/* Status dot */}
      <circle cx="480" cy="52" r="5" fill="#00d4b4" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="440" y="56" fill="#4a7fa5" fontSize="9" fontFamily="monospace">LIVE</text>
    </svg>
  );
}