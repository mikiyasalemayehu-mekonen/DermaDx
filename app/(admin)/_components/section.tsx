
// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, id, children, action }: { title: string; id: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-teal-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
        </div>
        {action}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-5">
        {children}
      </div>
    </div>
  );
}

export default Section;