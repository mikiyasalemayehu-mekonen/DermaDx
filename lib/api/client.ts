const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Track if we're currently refreshing to avoid multiple refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Get access token from storage
 */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

/**
 * Get refresh token from storage
 */
export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

/**
 * Store tokens in localStorage
 */
export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

/**
 * Clear tokens from localStorage
 */
export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
}

/**
 * Attempt to refresh the access token using the refresh token
 */
async function refreshAccessToken(): Promise<string | null> {
  // If already refreshing, wait for the result
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        return null;
      }

      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) {
        // Refresh failed, clear tokens and redirect to login
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return null;
      }

      const data = await response.json();
      const newAccessToken = data.access_token;
      const newRefreshToken = data.refresh_token || refreshToken;

      setTokens(newAccessToken, newRefreshToken);
      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export interface ApiErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: ApiErrorResponse
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  retried = false
) {
  const accessToken = getAccessToken();
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  // Handle 401 - token expired, try to refresh
  if (res.status === 401 && !retried) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Retry the request with new token
      return apiFetch(endpoint, options, true);
    } else {
      // Refresh failed, redirect to login
      throw new ApiError("Unauthorized", 401, { detail: "Session expired" });
    }
  }

  if (!res.ok) {
    let errorData: ApiErrorResponse = {};
    try {
      errorData = await res.json();
    } catch {
      // Response is not JSON
    }

    const errorMessage =
      errorData.detail ?? errorData.message ?? errorData.error ?? "Request failed";

    throw new ApiError(errorMessage, res.status, errorData);
  }

  return res.json();
}
