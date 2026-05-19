import { apiFetch } from "./client";

export interface SuperAdminAdmin {
  id: string;
  full_name: string;
  email: string;
  clinic_id: string;
  status?: string;
  created_at?: string;
}

export const getSuperAdmins = (): Promise<SuperAdminAdmin[]> => apiFetch("/super-admin/admins");

export const createSuperAdmin = (payload: { full_name: string; email: string; clinic_id: string; }) =>
  apiFetch("/super-admin/admins", { method: "POST", body: JSON.stringify(payload) });

export const deactivateSuperAdmin = (id: string) =>
  apiFetch(`/super-admin/admins/${id}/deactivate`, { method: "POST" });
