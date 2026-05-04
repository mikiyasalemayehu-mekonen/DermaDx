import { apiFetch } from "./client";

export interface AccessRequest {
  id: string;
  name: string;
  email: string;
  license: string;
  hospital: string;
  role: string;
  department: string;
  submitted_at: string;
  status: "pending" | "approved" | "rejected";
  has_document: boolean;
}

export interface SystemReport {
  total_users: number;
  total_analyses: number;
  avg_confidence: number;
  iqa_rejection_rate: number;
  uptime: number;
  generated_at: string;
}

// ── Access Requests ───────────────────────────────────────────────────────────

export const getAccessRequests = (): Promise<AccessRequest[]> =>
  apiFetch("/admin/access-requests");

export const approveRequest = (id: string): Promise<void> =>
  apiFetch(`/admin/access-requests/${id}/approve`, { method: "POST" });

export const rejectRequest = (id: string, note?: string): Promise<void> =>
  apiFetch(`/admin/access-requests/${id}/reject`, {
    method: "POST",
    body: JSON.stringify({ note }),
  });

// ── System Reports ────────────────────────────────────────────────────────────

export const getSystemReport = (): Promise<SystemReport> =>
  apiFetch("/admin/reports/system");

export const getFairnessReport = () =>
  apiFetch("/admin/reports/fairness");

export const getActivityLog = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page)   query.set("page",   String(params.page));
  if (params?.limit)  query.set("limit",  String(params.limit));
  if (params?.search) query.set("search", params.search);
  const q = query.toString();
  return apiFetch(`/admin/activity${q ? `?${q}` : ""}`);
};

// ── Super Admin — Clinic Admins ───────────────────────────────────────────────

export const getAdmins = () => apiFetch("/super-admin/admins");

export const getAdmin = (id: string) => apiFetch(`/super-admin/admins/${id}`);

export const createAdmin = (data: {
  full_name: string;
  email: string;
  clinic_id: string;
}) =>
  apiFetch("/super-admin/admins", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deactivateAdmin = (id: string): Promise<void> =>
  apiFetch(`/super-admin/admins/${id}/deactivate`, { method: "POST" });
