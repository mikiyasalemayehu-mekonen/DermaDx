// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)}
      className="relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0"
      style={{ background: value ? "#0d9488" : "#d1d5db" }}>
      <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: value ? "translateX(24px)" : "translateX(0)" }} />
    </button>
  );
}

export default Toggle;