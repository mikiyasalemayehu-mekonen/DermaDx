import { apiFetch, getAccessToken } from "./client";

export interface AnalysisResult {
  id: string;
  condition: string;
  confidence: number;
  risk: "high" | "medium" | "low";
  date: string;
  status: string;
  clinician_id: string;
}

export interface AnalysisFilters {
  condition?: string;
  min_confidence?: number;
  date_range?: string;
  page?: number;
  limit?: number;
}

export const getAnalyses = (filters?: AnalysisFilters): Promise<AnalysisResult[]> => {
  const params = new URLSearchParams();
  if (filters?.condition) params.set("condition", filters.condition);
  if (filters?.min_confidence !== undefined) params.set("min_confidence", String(filters.min_confidence));
  if (filters?.date_range) params.set("date_range", filters.date_range);
  if (filters?.page !== undefined) params.set("page", String(filters.page));
  if (filters?.limit !== undefined) params.set("limit", String(filters.limit));
  const query = params.toString();
  return apiFetch(`/analyses${query ? `?${query}` : ""}`);
};

export const getAnalysis = (id: string): Promise<AnalysisResult> =>
  apiFetch(`/analyses/${id}`);

export const submitAnalysis = (formData: FormData): Promise<AnalysisResult> =>
  apiFetch("/analyses", { method: "POST", body: formData });

export const deleteAnalysis = (id: string): Promise<void> =>
  apiFetch(`/analyses/${id}`, { method: "DELETE" });

export const downloadReport = async (id: string): Promise<Blob> => {
  const token = getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/analyses/${id}/report`,
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  if (!res.ok) throw new Error("Failed to download report");
  return res.blob();
};
