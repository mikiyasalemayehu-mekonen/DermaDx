function ModelPerformanceChart() {
  const W = 560; const H = 200;
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];

  // Smooth sinusoidal-like confidence & IQA paths
  const confidence = [
    [0, 130], [80, 100], [160, 60], [240, 90], [320, 55], [400, 80], [W, 40],
  ];
  const iqaPass = [
    [0, 155], [80, 145], [160, 130], [240, 120], [320, 125], [400, 118], [W, 110],
  ];

  const toPath = (pts: number[][]) =>
    pts.map(([x, y], i) => `${i === 0 ? "M" : "C"} ${x},${y}`).join(" ");

  // Cubic smooth path
  const smooth = (pts: number[][]): string => {
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx1 = prev[0] + (curr[0] - prev[0]) / 3;
      const cpy1 = prev[1];
      const cpx2 = curr[0] - (curr[0] - prev[0]) / 3;
      const cpy2 = curr[1];
      d += ` C ${cpx1},${cpy1} ${cpx2},${cpy2} ${curr[0]},${curr[1]}`;
    }
    return d;
  };

  const confPath = smooth(confidence);
  const iqaPath  = smooth(iqaPass);

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full">
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map((f, i) => (
        <line key={i} x1={0} y1={H * f} x2={W} y2={H * f} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      {/* IQA area fill */}
      <path
        d={`${iqaPath} L ${W},${H} L 0,${H} Z`}
        fill="url(#iqaGrad)" opacity="0.15"
      />
      {/* Confidence area fill */}
      <path
        d={`${confPath} L ${W},${H} L 0,${H} Z`}
        fill="url(#confGrad)" opacity="0.1"
      />
      <defs>
        <linearGradient id="confGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0d2444" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0d2444" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="iqaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00c4a8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00c4a8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* IQA line (dashed teal) */}
      <path d={iqaPath} fill="none" stroke="#00c4a8" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
      {/* Confidence line (solid navy) */}
      <path d={confPath} fill="none" stroke="#0d2444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots on confidence */}
      {confidence.filter((_, i) => i % 2 === 0).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="white" stroke="#0d2444" strokeWidth="2" />
      ))}
      {/* Month labels */}
      {months.map((m, i) => (
        <text key={m} x={(W / (months.length - 1)) * i} y={H + 22} textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">{m}</text>
      ))}
    </svg>
  );
}

export default ModelPerformanceChart;