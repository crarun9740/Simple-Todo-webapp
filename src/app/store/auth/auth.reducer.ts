import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

/**
 * Auth Reducer
 * Handles authentication state mutations
 */
export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    isAuthenticated: true,
    loading: false,
  })),

  on(AuthActions.loginFailure, (state) => ({
    ...state,
    loading: false,
    error: 'Login failed',
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    loading: false,
  }))
);
