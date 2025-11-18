/**
 * Auth State
 * Manages authentication state in NgRx
 */
export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};
