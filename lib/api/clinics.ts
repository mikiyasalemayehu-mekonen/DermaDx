import { apiFetch } from "./client";

export interface Clinic {
  id: string;
  name: string;
  admin_email: string;
  license_number: string;
  department: string;
  status: "active" | "pending" | "suspended";
  created_at: string;
}

export interface OnboardClinicPayload {
  full_name: string;
  professional_email: string;
  license_number: string;
  clinic_name: string;
  department: string;
  document?: File;
}

export const getClinics = (): Promise<Clinic[]> =>
  apiFetch("/clinics");

export const getClinic = (id: string): Promise<Clinic> =>
  apiFetch(`/clinics/${id}`);

export const onboardClinic = (data: OnboardClinicPayload): Promise<Clinic> => {
  const form = new FormData();
  form.append("full_name",          data.full_name);
  form.append("professional_email", data.professional_email);
  form.append("license_number",     data.license_number);
  form.append("clinic_name",        data.clinic_name);
  form.append("department",         data.department);
  if (data.document) form.append("document", data.document);
  return apiFetch("/clinics/onboard", { method: "POST", body: form });
};

export const updateClinic = (
  id: string,
  data: Partial<Clinic>
): Promise<Clinic> =>
  apiFetch(`/clinics/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const suspendClinic = (id: string): Promise<void> =>
  apiFetch(`/clinics/${id}/suspend`, { method: "POST" });

export const activateClinic = (id: string): Promise<void> =>
  apiFetch(`/clinics/${id}/activate`, { method: "POST" });
