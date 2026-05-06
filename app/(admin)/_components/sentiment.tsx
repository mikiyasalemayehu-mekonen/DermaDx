function SentimentIcon({ sentiment }: { sentiment: string }) {
  return sentiment === "positive" ? (
    <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth={2} className="w-4 h-4">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 13s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
    </div>
  ) : (
    <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} className="w-4 h-4">
        <circle cx="12" cy="12" r="9" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" strokeLinecap="round" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default SentimentIcon;