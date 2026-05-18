"use client";

import { useCallback, useEffect, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getMe,
  TokenResponse,
  UserProfile,
  LoginPayload,
  RegisterPayload,
} from "@/lib/api/auth";
import {
  getAccessToken,
  getRefreshToken,
  setTokens as storeTokens,
  clearTokens as removeTokens,
  ApiError,
} from "@/lib/api/client";

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<UserProfile | null>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

/**
 * Custom hook for managing authentication state and operations
 * Handles login, logout, token management, and user profile fetching
 */
export function useAuth(): AuthContextType {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  /**
   * Initialize auth state from localStorage and validate token
   */
  const initializeAuth = useCallback(async () => {
    try {
      const accessToken = getAccessToken();

      if (!accessToken) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        return;
      }

      // Try to fetch current user profile
      const userProfile = await getMe();
      setState({
        user: userProfile,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Auth initialization failed:", error);
      removeTokens();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error:
          error instanceof ApiError ? error.message : "Failed to initialize auth",
      });
    }
  }, []);

  /**
   * Initialize on mount
   */
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  /**
   * Login with email and password
   */
  const login = useCallback(
    async (email: string, password: string) => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const payload: LoginPayload = { email, password };
        const response: TokenResponse = await apiLogin(payload);

        // Store tokens
        storeTokens(response.access_token, response.refresh_token);

        // Store user info in localStorage
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }

        setState({
          user: response.user as unknown as UserProfile,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return response.user as unknown as UserProfile;
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : error instanceof Error
              ? error.message
              : "Login failed";

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: message,
        }));

        throw error;
      }
    },
    []
  );

  /**
   * Register new user
   */
  const register = useCallback(
    async (data: RegisterPayload) => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const response: TokenResponse = await apiRegister(data);

        // Store tokens
        storeTokens(response.access_token, response.refresh_token);

        // Store user info
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }

        setState({
          user: response.user as unknown as UserProfile,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : error instanceof Error
              ? error.message
              : "Registration failed";

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: message,
        }));

        throw error;
      }
    },
    []
  );

  /**
   * Logout current user
   */
  const logout = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Call logout endpoint
      await apiLogout();

      // Clear tokens and storage
      removeTokens();

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Even if logout fails, clear local state
      removeTokens();

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  /**
   * Refresh user profile
   */
  const refreshUser = useCallback(async () => {
    try {
      const userProfile = await getMe();
      setState((prev) => ({
        ...prev,
        user: userProfile,
      }));
    } catch (error) {
      console.error("Failed to refresh user profile:", error);
      throw error;
    }
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
    clearError,
    refreshUser,
  };
}
