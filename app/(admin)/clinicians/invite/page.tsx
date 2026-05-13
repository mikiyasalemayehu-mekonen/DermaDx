export default function InviteClinicianPage() {
	return (
		<div className="flex-1 px-8 py-7 overflow-auto bg-[var(--color-surface)]">
			<div className="max-w-3xl mx-auto space-y-6">
				<div>
					<p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0f274466]">Clinicians / Invite</p>
					<h1 className="text-2xl font-bold text-[#0f2744]">Invite a Clinician</h1>
					<p className="text-sm text-slate-500 mt-1">Create a consistent onboarding flow for new clinicians.</p>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-1.5">
							<label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0f274466]">Full Name</label>
							<div className="h-11 rounded-lg border border-slate-200 bg-slate-50" />
						</div>
						<div className="space-y-1.5">
							<label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0f274466]">Email Address</label>
							<div className="h-11 rounded-lg border border-slate-200 bg-slate-50" />
						</div>
					</div>
					<div className="space-y-1.5">
						<label className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0f274466]">Role</label>
						<div className="h-11 rounded-lg border border-slate-200 bg-slate-50" />
					</div>
					<button className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white">
						Send Invite
					</button>
				</div>
			</div>
		</div>
	);
}
