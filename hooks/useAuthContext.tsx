"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth, AuthContextType } from "./useAuth";

/**
 * AuthContext - provides authentication state and methods to all child components
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - wraps application with authentication context
 * Must be placed at root level or around protected routes
 *
 * Usage:
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use authentication context
 * Must be called from within AuthProvider
 *
 * @throws Error if used outside of AuthProvider
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuthContext();
 *   // ...
 * }
 * ```
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthProvider. " +
        "Make sure AuthProvider is wrapping your component tree."
    );
  }

  return context;
}

/**
 * Higher-order component to protect routes that require authentication
 * Redirects to login if user is not authenticated
 *
 * Usage:
 * ```tsx
 * const ProtectedDashboard = withAuth(Dashboard);
 * ```
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // In a real app, you'd use next/navigation to redirect
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      return null;
    }

    return <Component {...props} />;
  };
}

/**
 * Higher-order component to protect routes by role
 * Redirects to unauthorized page if user doesn't have required role
 *
 * Usage:
 * ```tsx
 * const AdminDashboard = withRole('administrator', Dashboard);
 * ```
 */
export function withRole<P extends object>(
  allowedRoles: string | string[],
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated, isLoading, user } = useAuthContext();
    const roles = Array.isArray(allowedRoles)
      ? allowedRoles
      : [allowedRoles];

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      return null;
    }

    if (!user || !roles.includes(user.role || "")) {
      if (typeof window !== "undefined") {
        window.location.href = "/unauthorized";
      }
      return null;
    }

    return <Component {...props} />;
  };
}
