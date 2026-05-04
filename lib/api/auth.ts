import { apiFetch } from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export const login = (data: LoginPayload): Promise<TokenResponse> =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const logout = (): Promise<void> =>
  apiFetch("/auth/logout", { method: "POST" });

export const refreshToken = (): Promise<TokenResponse> =>
  apiFetch("/auth/refresh", { method: "POST" });

export const getMe = () => apiFetch("/auth/me");

export const setPassword = (data: {
  token: string;
  password: string;
}): Promise<void> =>
  apiFetch("/auth/set-password", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const verifyMFA = (data: {
  token: string;
  code: string;
}): Promise<void> =>
  apiFetch("/auth/mfa/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const setupMFA = (): Promise<{ qr_url: string; secret: string }> =>
  apiFetch("/auth/mfa/setup", { method: "POST" });
