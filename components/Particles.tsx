export function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.05,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-teal-400"
          style={{
            width: p.size, height: p.size,
            left: `${p.x}%`, top: `${p.y}%`,
            opacity: p.opacity,
            animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(${Math.random() > 0.5 ? "" : "-"}${Math.floor(Math.random() * 40 + 10)}px, -${Math.floor(Math.random() * 40 + 10)}px) scale(1.2); }
          100% { transform: translate(${Math.floor(Math.random() * 30 + 5)}px, ${Math.floor(Math.random() * 30 + 5)}px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}