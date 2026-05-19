"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import DermThumb from "../_components/dermthumb";
import {ChevronRight ,EyeIcon,Plus,Bell,Download,Calendar,SlidersVertical,ChevronLeft,ChevronDown,Search,Loader2} from 'lucide-react';
import { getAnalyses, downloadReport, deleteAnalysis, type AnalysisResult } from "@/lib/api/analyses";
import Select from "../_components/select";



// Map risk level to display properties
function getRiskDisplay(risk: string) {
  switch (risk) {
    case "high":
      return { label: "HIGH RISK", color: "text-rose-500", barColor: "bg-rose-500" };
    case "medium":
      return { label: "MONITORING", color: "text-amber-500", barColor: "bg-amber-500" };
    case "low":
    default:
      return { label: "LOW RISK", color: "text-teal-600", barColor: "bg-teal-500" };
  }
}

// Generate pseudo-random colors for visual preview
function getImgColors(id: string): [string, string, string] {
  const hash = id.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const hues = [(hash % 360), ((hash + 120) % 360), ((hash + 240) % 360)];
  return hues.map(h => `hsl(${h}, 65%, 45%)`) as [string, string, string];
}

const CONDITIONS  = ["All Conditions"];
const DATE_RANGES = ["Last 30 Days", "Last 60 Days", "Last 90 Days", "Last 6 Months", "All Time"];
const TABLE_HEADS = ["Case ID", "Analysis View", "Suspected Condition", "Confidence", "Date Submitted", "Status", "Actions"];


export default function HistoryPage() {
  const [search,     setSearch]     = useState("");
  const [condition,  setCondition]  = useState("All Conditions");
  const [threshold,  setThreshold]  = useState(0);
  const [dateRange,  setDateRange]  = useState("Last 30 Days");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);

  // Load analyses on mount
  useEffect(() => {
    const loadAnalyses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAnalyses({ page: 1, limit: 100 });
        setAnalyses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analyses");
      } finally {
        setIsLoading(false);
      }
    };
    void loadAnalyses();
  }, []);

  // Handle download
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

  // Handle delete
  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this analysis?")) return;
    try {
      await deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete analysis");
    }
  }, []);

  const filtered = useMemo(() => {
    return analyses.filter((r) => {
      const matchSearch = search === "" || r.id.toLowerCase().includes(search.toLowerCase());
      const matchCond   = condition === "All Conditions" || r.condition.toLowerCase().includes(condition.toLowerCase());
      return matchSearch && matchCond && r.confidence >= threshold;
    });
  }, [analyses, search, condition, threshold]);

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-surface)]">
      {/* Custom top bar with doctor info */}


      <main className="flex-1 px-8 py-7 overflow-auto space-y-5">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Heading */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0f2744]">Analysis History</h1>
            <p className="text-sm text-gray-500 mt-0.5">Review and manage clinical dermatological assessments.</p>
          </div>
          <Link
            href="/upload"
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4"/> New Case Analysis
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm px-6 py-5">
          <div className="flex items-end gap-5 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Search Case ID</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search className="w-4 h-4"/></span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. DX-9921"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 focus:border-[#0f2744]/30 transition-all"
                />
              </div>
            </div>

            <Select label="Condition Filter" value={condition} options={CONDITIONS} onChange={setCondition} />

            {/* Confidence threshold */}
            <div className="min-w-[200px] flex-1">
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">
                Confidence Threshold
                <span className="ml-2 bg-teal-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">{threshold}%+</span>
              </label>
              <input
                type="range" min={0} max={100} value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-1.5 accent-teal-500 cursor-pointer"
              />
            </div>

            <Select label="Date Range" value={dateRange} options={DATE_RANGES} onChange={setDateRange} icon={<Calendar  className="w-4 h-4" strokeWidth={1.8} />} />

            <button className="w-9 h-9 border border-gray-200 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors shrink-0">
              <SlidersVertical className="w-4 h-4 stroke-2" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading analyses...</span>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {TABLE_HEADS.map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest text-gray-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No analyses match your filters.</td>
                  </tr>
                ) : filtered.map((row) => {
                  const riskDisplay = getRiskDisplay(row.risk);
                  const imgColors = getImgColors(row.id);
                  return (
                    <tr key={row.id} className="hover:bg-[#f8fafd] transition-colors group">
                      <td className="px-5 py-4">
                        <span className="font-bold text-[#0f2744] text-xs">{row.id}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                          <DermThumb colors={imgColors} />
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800 text-sm leading-tight">{row.condition}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${riskDisplay.color}`}>{riskDisplay.label}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${riskDisplay.barColor}`} style={{ width: `${row.confidence}%` }} />
                          </div>
                          <span className="text-sm font-bold text-gray-700">{row.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs">{new Date(row.date).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-teal-100 text-teal-700">
                          {row.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors" title="View">
                            <EyeIcon/>
                          </button>
                          <button
                            onClick={() => void handleDownload(row.id)}
                            className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4"/>
                          </button>
                          <button
                            onClick={() => void handleDelete(row.id)}
                            className="w-7 h-7 rounded-lg hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors"
                            title="Delete"
                          >
                            ×
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {!isLoading && (
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Showing <span className="font-semibold text-[#0f2744]">{filtered.length}</span> of{" "}
                <span className="font-semibold text-[#0f2744]">{analyses.length}</span> analyses
              </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === p ? "bg-blue-900 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs">…</span>
              <button
                onClick={() => setCurrentPage(5)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                  currentPage === 5 ? "bg-blue-900 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                5
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5"  />
              </button>
            </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
