import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * AuthService: Manages authentication state
 * 
 * This is a simulated authentication service. To integrate with a real backend:
 * 1. Inject HttpClient
 * 2. Replace login/logout with HTTP calls to your auth endpoints
 * 3. Store tokens instead of using localStorage boolean
 * 4. Add token refresh logic
 * 5. Keep the same isAuthenticated$ observable interface
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'app_auth';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.loadAuthState());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Initialize from storage
  }

  /**
   * Get current authentication state synchronously
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Login (simulated - just sets localStorage boolean)
   */
  login(username?: string): void {
    // In a real app, you would call an HTTP endpoint here
    // and handle token storage
    this.isAuthenticatedSubject.next(true);
    this.saveAuthState(true);
  }

  /**
   * Logout
   */
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.saveAuthState(false);
  }

  /**
   * Private: Load auth state from storage
   */
  private loadAuthState(): boolean {
    try {
      const stored = localStorage.getItem(this.AUTH_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.error('Failed to load auth state:', error);
      return false;
    }
  }

  /**
   * Private: Save auth state to storage
   */
  private saveAuthState(isAuthenticated: boolean): void {
    try {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(isAuthenticated));
    } catch (error) {
      console.error('Failed to save auth state:', error);
    }
  }
}
