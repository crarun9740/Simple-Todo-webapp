import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

/**
 * SettingsComponent: Protected settings page
 * Requires authentication (see auth.guard)
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="settings-page">
      <div class="container">
        <section class="card">
          <h1 class="page-title">Settings</h1>

          <div class="settings-form">
            <div class="form-group">
              <h2 class="section-title">Account</h2>
              <p class="section-description">You are currently logged in as an authenticated user.</p>

              <button class="btn btn-danger" (click)="onLogout()">
                Logout
              </button>
            </div>

            <div class="form-group">
              <h2 class="section-title">Storage</h2>
              <p class="section-description">Manage your local storage data.</p>

              <div class="storage-info">
                <p class="storage-stat">
                  <span class="stat-label">Storage Used:</span>
                  <span class="stat-value">{{ getStorageSize() }}</span>
                </p>
              </div>

              <button class="btn btn-secondary" (click)="onClearStorage()">
                Clear All Data
              </button>
            </div>

            <div class="form-group">
              <h2 class="section-title">About</h2>
              <p class="app-info">
                <strong>App Version:</strong> 1.0.0<br />
                <strong>Built with:</strong> Angular 19, TypeScript, RxJS<br />
                <strong>Storage:</strong> localStorage<br />
              </p>
              <p class="app-note">
                This is a demo app with simulated authentication. In production, replace the
                AuthService with real OAuth2 or JWT authentication, and use a backend API instead
                of localStorage.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  `,
  styles: `
    .settings-page {
      padding: 2rem 1rem;
    }

    .container {
      max-width: 56rem;
      margin: 0 auto;
    }

    .card {
      background-color: #ffffff;
      border: 1px solid #e6e9f2;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(11, 18, 32, 0.06);
      padding: 2rem;
    }

    .page-title {
      margin: 0 0 2rem 0;
      font-size: 2rem;
      font-weight: 700;
      color: #0b1220;
    }

    .settings-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #e6e9f2;
    }

    .form-group:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    .section-title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      color: #0b1220;
    }

    .section-description {
      margin: 0;
      font-size: 0.875rem;
      color: #556075;
    }

    .storage-info {
      background-color: #f5f7fb;
      border: 1px solid #e6e9f2;
      border-radius: 0.375rem;
      padding: 1rem;
      margin: 0.5rem 0;
    }

    .storage-stat {
      margin: 0;
      font-size: 0.875rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #556075;
    }

    .stat-label {
      font-weight: 600;
    }

    .stat-value {
      color: #0b1220;
      font-weight: 700;
    }

    .app-info {
      margin: 0;
      font-size: 0.875rem;
      color: #556075;
      line-height: 1.8;
      background-color: #f5f7fb;
      padding: 1rem;
      border-radius: 0.375rem;
    }

    .app-info strong {
      color: #0b1220;
    }

    .app-note {
      margin: 1rem 0 0 0;
      font-size: 0.8125rem;
      color: #9ca3af;
      font-style: italic;
      line-height: 1.6;
      background-color: #fffbeb;
      border-left: 3px solid #f59e0b;
      padding: 0.75rem;
      border-radius: 0.25rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
    }

    .btn:focus {
      outline: 2px solid #0f6fff;
      outline-offset: 2px;
    }

    .btn-secondary {
      background-color: #e6e9f2;
      color: #0b1220;
    }

    .btn-secondary:hover {
      background-color: #d0d4e0;
    }

    .btn-danger {
      background-color: #ef4444;
      color: #ffffff;
    }

    .btn-danger:hover {
      background-color: #dc2626;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }

    @media (max-width: 640px) {
      .settings-page {
        padding: 1rem;
      }

      .card {
        padding: 1.5rem;
      }

      .page-title {
        font-size: 1.5rem;
      }

      .section-title {
        font-size: 1rem;
      }
    }
  `,
})
export class SettingsComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {}

  onLogout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      window.location.href = '/';
    }
  }

  onClearStorage(): void {
    if (confirm('This will delete all todos and clear all app data. Are you sure?')) {
      localStorage.clear();
      alert('All data cleared. Refreshing page...');
      window.location.reload();
    }
  }

  getStorageSize(): string {
    try {
      const allData = JSON.stringify(localStorage);
      const bytes = new Blob([allData]).size;
      const kb = (bytes / 1024).toFixed(2);
      return `${kb} KB`;
    } catch {
      return 'Unable to calculate';
    }
  }
}
