import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  mobileMenuOpen = false;
  searchQuery = '';
  isDarkMode = false;

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {
    this.initializeDarkMode();
  }

  /**
   * Initialize dark mode preference from localStorage or system
   */
  private initializeDarkMode(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // SSR: Browser APIs not available
      this.isDarkMode = false;
      return;
    }

    // Safe browser-only code
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode !== null) {
      this.isDarkMode = JSON.parse(savedMode);
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    this.applyDarkMode();
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
      this.applyDarkMode();
    }
  }

  /**
   * Apply dark mode classes to document
   */
  private applyDarkMode(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;

    if (this.isDarkMode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  handleSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Search for:', this.searchQuery);
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  onLogin(): void {
    this.authService.login();
    this.closeMobileMenu();
  }

  onLogout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }
}
