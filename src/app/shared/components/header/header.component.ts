import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

/**
 * HeaderComponent: Modern, responsive navigation header
 * Features:
 * - Logo/brand with icon
 * - Navigation menu with active state highlighting
 * - Compact search bar
 * - Login/Logout button with auth state
 * - Mobile hamburger menu (sticky header)
 * - Dark mode support
 * - Smooth transitions and hover effects
 */
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

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.initializeDarkMode();
  }

  ngOnInit(): void {}

  /**
   * Initialize dark mode preference from localStorage or system
   */
  private initializeDarkMode(): void {
    // Check if localStorage is available (not SSR environment)
    if (typeof localStorage === 'undefined') {
      this.isDarkMode = false;
    } else {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        this.isDarkMode = JSON.parse(savedMode);
      } else {
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    this.applyDarkMode();
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    // Check if localStorage is available (not SSR environment)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
    }
    this.applyDarkMode();
  }

  /**
   * Apply dark mode classes to document
   */
  private applyDarkMode(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  /**
   * Toggle mobile menu visibility
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  /**
   * Handle search query
   */
  handleSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Search for:', this.searchQuery);
      // TODO: Dispatch search action or navigate to search results
    }
  }

  /**
   * Clear search
   */
  clearSearch(): void {
    this.searchQuery = '';
  }

  /**
   * Trigger login
   */
  onLogin(): void {
    this.authService.login();
    this.closeMobileMenu();
  }

  /**
   * Trigger logout
   */
  onLogout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }
}
