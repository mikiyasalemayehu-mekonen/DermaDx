function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 95 ? "bg-blue-600" : value >= 85 ? "bg-teal-500" : "bg-amber-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-sm font-semibold text-gray-700">{value}%</span>
    </div>
  );
}

export default ConfidenceBar;