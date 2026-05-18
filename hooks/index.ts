// Export all auth-related hooks and utilities
export { useAuth, type AuthState, type AuthContextType } from "./useAuth";
export {
  AuthProvider,
  useAuthContext,
  withAuth,
  withRole,
  type AuthProviderProps,
} from "./useAuthContext";
