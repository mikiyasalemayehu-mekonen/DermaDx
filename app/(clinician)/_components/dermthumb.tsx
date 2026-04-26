function DermThumb({ colors }: { colors: [string, string, string] }) {
  const [a, b, c] = colors;
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <rect width="48" height="48" fill={a} />
      <circle cx="24" cy="24" r="18" fill={b} opacity="0.8" />
      <circle cx="24" cy="24" r="11" fill={c} opacity="0.9" />
      <circle cx="21" cy="21" r="4"  fill="#000" opacity="0.5" />
      <circle cx="28" cy="27" r="2.5" fill="#000" opacity="0.35" />
    </svg>
  );
}

export default  DermThumb;