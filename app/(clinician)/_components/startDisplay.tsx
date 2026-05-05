


function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mt-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" className="w-3.5 h-3.5"
          fill={rating >= s ? "#f59e0b" : "none"}
          stroke={rating >= s ? "#f59e0b" : "#e5e7eb"}
          strokeWidth={1.8}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

export default StarDisplay;
