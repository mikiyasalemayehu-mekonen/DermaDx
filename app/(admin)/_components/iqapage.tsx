import {  CircleCheck as CheckCircleIcon} from "lucide-react";


// ── IQA badge ─────────────────────────────────────────────────────────────────
function IQABadge({ iqa }: { iqa: string }) {
  const styles: Record<string, string> = {
    Pass:     "text-teal-600",
    Marginal: "text-amber-500",
    Fail:     "text-rose-500",
  };
  return (
    <div className={`flex items-center gap-1 ${styles[iqa] || "text-slate-500"}`}>
      <CheckCircleIcon color={iqa === "Pass" ? "#00c4a8" : iqa === "Marginal" ? "#f59e0b" : "#ef4444"} className="w-4 h-4" />
      <span className="text-xs font-bold">{iqa}</span>
    </div>
  );
}

export default IQABadge;