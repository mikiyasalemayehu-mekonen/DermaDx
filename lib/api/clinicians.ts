import { apiFetch } from "./client";

export interface Clinician {
  id: string;
  full_name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "pending" | "inactive";
  created_at: string;
}

export interface InviteClinicianPayload {
  email: string;
  full_name: string;
  role: string;
  department: string;
}

export const getClinicians = (): Promise<Clinician[]> =>
  apiFetch("/clinicians");

export const getClinician = (id: string): Promise<Clinician> =>
  apiFetch(`/clinicians/${id}`);

export const inviteClinician = (data: InviteClinicianPayload): Promise<void> =>
  apiFetch("/clinicians/invite", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateClinician = (
  id: string,
  data: Partial<Clinician>
): Promise<Clinician> =>
  apiFetch(`/clinicians/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deactivateClinician = (id: string): Promise<void> =>
  apiFetch(`/clinicians/${id}/deactivate`, { method: "POST" });

export const resendInvite = (id: string): Promise<void> =>
  apiFetch(`/clinicians/${id}/resend-invite`, { method: "POST" });
