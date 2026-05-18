"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, CloudUpload, FileText, Loader2, Image as ImageIcon, RefreshCw, Shield, Upload, X } from "lucide-react";
import { TopBar } from "../_components/shell";
import { deleteAnalysis, downloadReport, getAnalyses, submitAnalysis, type AnalysisResult } from "@/lib/api/analyses";

const QUALITY_REQS = [
	"Optimal focus on the lesion",
	"Uniform clinical lighting",
	"Minimum resolution: 1024px",
	"Center lesion in frame",
];

export default function AnalysisPage() {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const [dragOver, setDragOver] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoadingHistory, setIsLoadingHistory] = useState(true);
	const [history, setHistory] = useState<AnalysisResult[]>([]);
	const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const handleFile = useCallback((f: File | null | undefined) => {
		if (!f) return;
		setFile(f);
		setError(null);
		setSuccessMessage(null);
		const reader = new FileReader();
		reader.onload = (e) => setPreview(e.target?.result as string);
		reader.readAsDataURL(f);
	}, []);

	const clearFile = useCallback(() => {
		setFile(null);
		setPreview(null);
		setSelectedResult(null);
	}, []);

	const loadHistory = useCallback(async () => {
		setIsLoadingHistory(true);
		setError(null);
		try {
			const items = await getAnalyses({ page: 1, limit: 8 });
			setHistory(items);
			if (!selectedResult && items.length > 0) {
				setSelectedResult(items[0]);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load analyses");
		} finally {
			setIsLoadingHistory(false);
		}
	}, [selectedResult]);

	useEffect(() => {
		void loadHistory();
	}, [loadHistory]);

	const onDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setDragOver(false);
		handleFile(e.dataTransfer.files[0]);
	}, [handleFile]);

	const canSubmit = useMemo(() => Boolean(file && !isSubmitting), [file, isSubmitting]);

	const handleSubmit = useCallback(async () => {
		if (!file) return;

		setIsSubmitting(true);
		setError(null);
		setSuccessMessage(null);

		try {
			const formData = new FormData();
			formData.append("file", file);

			const result = await submitAnalysis(formData);
			setSelectedResult(result);
			setSuccessMessage("Analysis completed successfully.");
			clearFile();
			await loadHistory();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to submit analysis");
		} finally {
			setIsSubmitting(false);
		}
	}, [clearFile, file, loadHistory]);

	const handleDownload = useCallback(async (id: string) => {
		try {
			const blob = await downloadReport(id);
			const url = URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = `analysis-${id}.txt`;
			anchor.click();
			URL.revokeObjectURL(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to download report");
		}
	}, []);

	const handleDelete = useCallback(async (id: string) => {
		try {
			await deleteAnalysis(id);
			if (selectedResult?.id === id) {
				setSelectedResult(null);
			}
			await loadHistory();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to delete analysis");
		}
	}, [loadHistory, selectedResult?.id]);

	return (
		<div className="flex-1 flex flex-col bg-[#f4f7fb]">
			<TopBar crumbs={["Home", "Analysis", "Workspace"]} />

			<main className="flex-1 px-8 py-7 overflow-auto">
				<div className="max-w-6xl mx-auto space-y-6">
					<div className="flex items-start justify-between gap-4 flex-wrap">
						<div>
							<p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0f274466]">Analysis</p>
							<h1 className="text-2xl font-bold text-[#0f2744]">Analysis Workspace</h1>
							<p className="text-sm text-slate-500 mt-1">Upload a dermoscopic image, run the backend analysis, and review recent results.</p>
						</div>
						<button
							onClick={() => void loadHistory()}
							className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#0f2744] shadow-sm hover:bg-slate-50"
						>
							<RefreshCw className="h-4 w-4" />
							Refresh
						</button>
					</div>

					{error && (
						<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
							{error}
						</div>
					)}

					{successMessage && (
						<div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
							{successMessage}
						</div>
					)}

					<div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
						<section className="space-y-4">
							<div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
								<div
									onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
									onDragLeave={() => setDragOver(false)}
									onDrop={onDrop}
									className={`relative overflow-hidden flex items-center justify-center transition-all ${
										dragOver ? "bg-teal-50/70 border-teal-300" : "bg-white"
									}`}
									style={{ minHeight: 420 }}
								>
									{preview ? (
										<div className="relative w-full">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src={preview} alt="Analysis preview" className="w-full object-contain" style={{ maxHeight: 420 }} />
											<div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
											<button
												onClick={clearFile}
												className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 hover:bg-white shadow"
											>
												<X className="w-4 h-4" />
											</button>
											<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
												<div className="flex items-center gap-2 bg-white/90 backdrop-blur rounded-lg px-3 py-1.5">
													<ImageIcon className="w-4 h-4 text-[#0f2744]" />
													<span className="text-xs font-semibold text-[#0f2744] truncate max-w-[220px]">{file?.name}</span>
												</div>
												<span className="bg-teal-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg tracking-widest">READY</span>
											</div>
										</div>
									) : (
										<div className="flex flex-col items-center justify-center py-16 px-8 text-center">
											<div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-colors ${dragOver ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-400"}`}>
												<CloudUpload className="w-8 h-8" />
											</div>
											<p className="text-base font-bold text-[#0f2744] mb-1">Drag and drop your image here</p>
											<p className="text-xs text-gray-400 mb-7">Accepted formats: JPEG, PNG, WebP. Maximum file size: 10MB.</p>
											<button
												onClick={() => inputRef.current?.click()}
												className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-7 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
											>
												<Upload className="w-4 h-4" /> Browse Files
											</button>
											<input
												ref={inputRef}
												type="file"
												accept="image/jpeg,image/png,image/webp"
												className="hidden"
												onChange={(e) => handleFile(e.target.files?.[0])}
											/>
										</div>
									)}
								</div>

								<div className="border-t border-slate-100 px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
									<div className="flex items-center gap-2 text-sm text-slate-500">
										<Shield className="h-4 w-4 text-teal-500" />
										Processing occurs in memory only and follows the backend privacy pipeline.
									</div>
									<button
										onClick={() => void handleSubmit()}
										disabled={!canSubmit}
										className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-md transition-all active:scale-95 ${
											canSubmit ? "bg-blue-900 text-white hover:bg-blue-700" : "cursor-not-allowed bg-gray-100 text-gray-400"
										}`}
									>
										{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
										{isSubmitting ? "Processing..." : "Process Analysis"}
									</button>
								</div>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div className="flex items-center gap-2 mb-4">
									<FileText className="h-4 w-4 text-[#0f2744]" />
									<h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f2744]">Latest Result</h2>
								</div>

								{selectedResult ? (
									<div className="grid gap-4 md:grid-cols-2">
										<div className="rounded-xl bg-slate-50 p-4">
											<p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Condition</p>
											<p className="mt-1 text-lg font-bold text-[#0f2744]">{selectedResult.condition}</p>
										</div>
										<div className="rounded-xl bg-slate-50 p-4">
											<p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Confidence</p>
											<p className="mt-1 text-lg font-bold text-[#0f2744]">{selectedResult.confidence}%</p>
										</div>
										<div className="rounded-xl bg-slate-50 p-4">
											<p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Risk</p>
											<p className="mt-1 text-lg font-bold text-[#0f2744] capitalize">{selectedResult.risk}</p>
										</div>
										<div className="rounded-xl bg-slate-50 p-4">
											<p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Status</p>
											<p className="mt-1 text-lg font-bold text-[#0f2744] capitalize">{selectedResult.status}</p>
										</div>
									</div>
								) : (
									<p className="text-sm text-slate-500">Run an analysis to see the result summary here.</p>
								)}
							</div>
						</section>

						<aside className="space-y-4">
							<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div className="flex items-center gap-2 mb-4">
									<Check className="h-4 w-4 text-teal-500" />
									<h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f2744]">Quality Requirements</h2>
								</div>
								<ul className="space-y-2.5">
									{QUALITY_REQS.map((req) => (
										<li key={req} className="flex items-start gap-2.5">
											<div className="mt-0.5 w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
												<Check className="w-3 h-3 text-white" />
											</div>
											<span className="text-xs text-gray-700">{req}</span>
										</li>
									))}
								</ul>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f2744]">Recent Analyses</h2>
									<span className="text-[10px] text-slate-500">{history.length}</span>
								</div>

								{isLoadingHistory ? (
									<div className="text-sm text-slate-500">Loading recent analyses...</div>
								) : history.length === 0 ? (
									<div className="text-sm text-slate-500">No analyses found yet.</div>
								) : (
									<div className="space-y-3">
										{history.map((item) => (
											<div key={item.id} className="rounded-xl border border-slate-200 p-3 hover:border-blue-200 transition-colors">
												<button className="w-full text-left" onClick={() => setSelectedResult(item)}>
													<div className="flex items-center justify-between gap-3">
														<div>
															<p className="text-sm font-semibold text-[#0f2744]">{item.condition}</p>
															<p className="text-[11px] text-slate-500 mt-0.5">{new Date(item.date).toLocaleString()}</p>
														</div>
														<span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">{item.status}</span>
													</div>
												</button>

												<div className="mt-3 flex items-center gap-2">
													<button
														onClick={() => void handleDownload(item.id)}
														className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-[#0f2744] hover:bg-slate-50"
													>
														Report
													</button>
													<button
														onClick={() => void handleDelete(item.id)}
														className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
													>
														Delete
													</button>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</aside>
					</div>
				</div>
			</main>
		</div>
	);
}
