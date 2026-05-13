export default function AnalysisPage() {
	return (
		<div className="flex-1 px-8 py-7 overflow-auto bg-[var(--color-surface)]">
			<div className="max-w-5xl mx-auto space-y-6">
				<div>
					<p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0f274466]">Analysis</p>
					<h1 className="text-2xl font-bold text-[#0f2744]">Analysis Workspace</h1>
					<p className="text-sm text-slate-500 mt-1">This route is reserved for the clinician analysis view.</p>
				</div>
				<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
					<p className="text-sm text-slate-600">Add the analysis workflow here when it is ready.</p>
				</div>
			</div>
		</div>
	);
}
