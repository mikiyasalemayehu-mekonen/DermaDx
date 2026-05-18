import { apiFetch } from "./client";

// Request Payloads
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name?: string;
  role?: "clinician" | "administrator" | "super_admin";
}

// Response Models
export interface UserInfo {
  user_id: string;
  email: string;
  full_name?: string;
  role?: string;
  clinic_id?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserInfo;
}

export interface UserProfile {
  user_id: string;
  email: string;
  full_name?: string;
  role: "clinician" | "administrator" | "super_admin";
  is_active: boolean;
  created_at: string;
  last_login?: string;
  login_count: number;
}

export interface MFASetup {
  qr_url: string;
  secret: string;
}

export interface SuccessResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// Auth API Endpoints

/**
 * Login with email and password
 * @param data - Login credentials
 * @returns Token response with user info
 */
export const login = (data: LoginPayload): Promise<TokenResponse> =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

/**
 * Register a new user
 * @param data - Registration details
 * @returns Token response with user info
 */
export const register = (data: RegisterPayload): Promise<TokenResponse> =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

/**
 * Logout current user
 * @returns Success response
 */
export const logout = (): Promise<SuccessResponse> =>
  apiFetch("/auth/logout", { method: "POST" });

/**
 * Refresh the access token
 * @returns New token response
 */
export const refreshToken = (): Promise<TokenResponse> =>
  apiFetch("/auth/refresh", { method: "POST" });

/**
 * Get current user profile
 * @returns User profile information
 */
export const getMe = (): Promise<UserProfile> => 
  apiFetch("/auth/me");

/**
 * Verify authentication token
 * @returns Success response with token validity
 */
export const verifyToken = (): Promise<SuccessResponse> =>
  apiFetch("/auth/verify");

/**
 * Set password with activation token (for invited users)
 * @param data - Token and new password
 * @returns Success response
 */
export const setPassword = (data: {
  token: string;
  password: string;
}): Promise<SuccessResponse> =>
  apiFetch("/auth/set-password", {
    method: "POST",
    body: JSON.stringify(data),
  });

/**
 * Setup MFA for current user
 * @returns QR code URL and secret for TOTP
 */
export const setupMFA = (): Promise<MFASetup> =>
  apiFetch("/auth/mfa/setup", { method: "POST" });

/**
 * Verify MFA code and enable MFA
 * @param data - Token and 6-digit TOTP code
 * @returns Success response
 */
export const verifyMFA = (data: {
  token: string;
  code: string;
}): Promise<SuccessResponse> =>
  apiFetch("/auth/mfa/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
