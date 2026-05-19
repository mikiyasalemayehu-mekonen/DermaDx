import { apiFetch } from "./client";

export interface MetricsResponse {
  total_diagnoses?: number;
  total_users?: number;
  recent_diagnoses_24h?: number;
  condition_distribution?: Record<string, number>;
  generated_at?: string;
  // system report fields
  total_analyses?: number;
  avg_confidence?: number;
  iqa_rejection_rate?: number;
  uptime?: number;
}

export const getMetrics = async (): Promise<MetricsResponse> => {
  const res = await apiFetch("/metrics");
  // backend returns { success: true, data: {...} }
  if (res && res.data) return res.data as MetricsResponse;
  return (res as MetricsResponse) || {};
};
