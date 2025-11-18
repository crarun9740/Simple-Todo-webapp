# Header Component - Visual Reference & Code Examples

## 🎨 Visual Layout

### Desktop View (>1024px)
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🎯 Todo Pro  [Search todos...        ]  Home  About  Settings  🌙 Login│
└─────────────────────────────────────────────────────────────────────────┘
```

### Tablet View (768px - 1024px)
```
┌──────────────────────────────────────────────────────────┐
│ 🎯 Todo Pro  [Search...]  Home  About  Settings  🌙 ☰   │
└──────────────────────────────────────────────────────────┘
```

### Mobile View (<768px - Menu Closed)
```
┌───────────────────────────────┐
│ 🎯 Todo Pro          🌙 ☰     │
└───────────────────────────────┘
```

### Mobile View (<768px - Menu Open)
```
┌───────────────────────────────┐
│ 🎯 Todo Pro          🌙 ✕     │
├───────────────────────────────┤
│ Home                          │
│ About                         │
│ Settings                      │
├───────────────────────────────┤
│ [Login]  or  [Logout]        │
└───────────────────────────────┘
```

---

## 📋 Component Sections

### 1. Brand/Logo Section
```html
<div class="header__brand">
  <a routerLink="/" class="brand">
    <svg class="brand__icon"><!-- grid icon --></svg>
    <span class="brand__text">Todo Pro</span>
  </a>
</div>
```

**Styling Highlights:**
- Gradient text color (blue to purple)
- Hover effect: color changes to primary blue
- Icon scales 1.1x on hover
- Smooth 150ms transitions

### 2. Search Bar
```html
<div class="header__search">
  <div class="search-box">
    <svg class="search-box__icon"><!-- search icon --></svg>
    <input 
      type="text"
      [(ngModel)]="searchQuery"
      (keyup.enter)="handleSearch()"
      placeholder="Search todos..."
    />
    <button *ngIf="searchQuery" (click)="clearSearch()">
      <!-- clear icon -->
    </button>
  </div>
</div>
```

**Features:**
- Two-way data binding
- Clear button appears when input has text
- Focus state: 3px blue shadow
- Responsive: hidden on mobile

### 3. Navigation Menu
```html
<nav class="header__nav" [class.header__nav--open]="mobileMenuOpen">
  <ul class="nav-list">
    <li>
      <a routerLink="/" 
         routerLinkActive="nav-link--active"
         [routerLinkActiveOptions]="{ exact: true }">
        Home
      </a>
    </li>
    <!-- More links... -->
  </ul>
</nav>
```

**Features:**
- Active link highlighting with underline
- Smooth hover effects
- Mobile: Full-width dropdown

### 4. Auth Buttons
```html
<button *ngIf="!(isAuthenticated$ | async)" 
        class="btn btn-secondary" 
        (click)="onLogin()">
  Login
</button>

<button *ngIf="isAuthenticated$ | async" 
        class="btn btn-danger" 
        (click)="onLogout()">
  Logout
</button>
```

**Features:**
- Reactive state with Observable
- Context-aware display
- Scale animation on click

### 5. Dark Mode Toggle
```html
<button class="header__theme-toggle" (click)="toggleDarkMode()">
  <!-- Sun icon for light mode -->
  <!-- Moon icon for dark mode -->
</button>
```

**Features:**
- Icon rotates on hover
- Persists to localStorage
- System preference fallback

### 6. Mobile Menu Toggle
```html
<button class="header__mobile-toggle" 
        (click)="toggleMobileMenu()">
  <span class="hamburger__line"></span>
  <span class="hamburger__line"></span>
  <span class="hamburger__line"></span>
</button>
```

**Features:**
- Animated hamburger icon (lines rotate into X)
- Only visible on mobile
- ARIA expanded attribute

---

## 🎨 Color Specifications

### Light Mode Palette
```
Primary Action:     #0F6FFF (Bright Blue)
Primary Text:       #0B1220 (Dark Navy)
Secondary Text:     #556075 (Gray Blue)
Background:         #FFFFFF (White)
Background Alt:     #F8FAFC (Off-White)
Border:             #E6E9F2 (Light Gray)
Danger Button:      #EF4444 (Red)
Success:            #10B981 (Green)
```

### Dark Mode Palette
```
Background:         #1A1F2E (Dark Navy)
Background Alt:     #242D3D (Darker Navy)
Primary Text:       #F1F5F9 (Light Gray)
Secondary Text:     #94A3B8 (Muted Gray)
Border:             #334155 (Dark Gray)
(Primary Blue & Red remain the same)
```

---

## 📐 Spacing & Sizing

### Header
```css
Height (Desktop):    64px (4rem)
Height (Mobile):     56px (3.5rem)
Padding (Desktop):   0 1.5rem
Padding (Mobile):    0 1rem
Gap (Desktop):       1.5rem
Gap (Mobile):        0.75rem
Max Width:           100rem (1600px)
```

### Search Box
```css
Max Width:           24rem (384px)
Height:              Auto (content-based)
Padding:             0.5rem
Border Radius:       0.5rem (8px)
```

### Navigation Links
```css
Padding:             0.5rem 1rem (8px 16px)
Border Radius:       0.375rem (6px)
Gap:                 0.25rem (4px)
Underline Height:    2px
```

### Buttons
```css
Padding:             0.5rem 1rem (8px 16px)
Border Radius:       0.375rem (6px)
Font Size:           0.875rem (14px)
Font Weight:         600 (semi-bold)
```

---

## 🎬 Animation Timings

### Fast Transitions (150ms)
- Hover color changes
- Icon transforms
- Border color transitions

### Normal Transitions (200ms)
- Background color changes
- Shadow transitions
- Underline animations

### Slow Transitions (300ms)
- Mobile menu open/close
- Navigation drawer slide

### Animation Curves
```css
All: ease (standard easing function)
```

---

## 🔍 Focus & Accessibility States

### Focus Visible (Keyboard)
```css
Outline:             2px solid #0F6FFF (Primary Blue)
Outline Offset:      2px
Border Radius:       4px
```

### Active States
```css
Links:               Color: #0F6FFF, Background: rgba(15, 111, 255, 0.1)
Buttons:             Transform: scale(0.98)
Hamburger:           Background: rgba(15, 111, 255, 0.1)
```

### Hover States
```css
Links:               Color: #0F6FFF, Background: rgba(15, 111, 255, 0.08)
Buttons:             Box Shadow & Color changes
Search:              Border color to primary, box shadow
```

---

## 📱 Responsive Breakpoints

```css
/* Tablet Adjustments */
@media (max-width: 1024px) {
  Header gap:        1rem (from 1.5rem)
  Padding:           0 1rem (from 0 1.5rem)
  Search max-width:  16rem (from 24rem)
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  Header height:     3.5rem (from 4rem)
  Gap:               0.75rem (from 1.5rem)
  Search:            Hidden (display: none)
  Mobile toggle:     Visible (display: flex)
  Nav dropdown:      Position absolute, full-width
  Auth buttons:      Full width in dropdown
}

/* Small Mobile */
@media (max-width: 480px) {
  Logo text:         Hidden
  Padding:           0 0.75rem
  Button padding:    0.5rem 0.75rem
  Font size:         0.8125rem (13px)
}
```

---

## 💻 HTML Structure

### Complete Template
```html
<header class="header">
  <div class="header__container">
    
    <!-- Logo Section -->
    <div class="header__brand">
      <a routerLink="/" class="brand" aria-label="Todo App Home">
        <svg class="brand__icon"><!-- Icon --></svg>
        <span class="brand__text">Todo Pro</span>
      </a>
    </div>

    <!-- Search Bar (Desktop only) -->
    <div class="header__search">
      <div class="search-box">
        <svg class="search-box__icon"><!-- Search Icon --></svg>
        <input type="text" 
               class="search-box__input"
               placeholder="Search todos..."
               [(ngModel)]="searchQuery"
               (keyup.enter)="handleSearch()" />
        <button *ngIf="searchQuery" 
                class="search-box__clear"
                (click)="clearSearch()">
          <!-- Clear Icon -->
        </button>
      </div>
    </div>

    <!-- Right Section -->
    <div class="header__right">
      
      <!-- Navigation -->
      <nav class="header__nav" 
           [class.header__nav--open]="mobileMenuOpen"
           role="navigation">
        <ul class="nav-list">
          <li><a routerLink="/" routerLinkActive="nav-link--active" 
                 [routerLinkActiveOptions]="{ exact: true }">Home</a></li>
          <li><a routerLink="/about" routerLinkActive="nav-link--active">About</a></li>
          <li><a routerLink="/settings" routerLinkActive="nav-link--active">Settings</a></li>
        </ul>

        <!-- Auth Buttons -->
        <div class="header__auth">
          <button *ngIf="!(isAuthenticated$ | async)" 
                  class="btn btn-secondary" (click)="onLogin()">
            Login
          </button>
          <button *ngIf="isAuthenticated$ | async" 
                  class="btn btn-danger" (click)="onLogout()">
            Logout
          </button>
        </div>
      </nav>

      <!-- Dark Mode Toggle -->
      <button class="header__theme-toggle" (click)="toggleDarkMode()">
        <!-- Sun/Moon Icon -->
      </button>

      <!-- Mobile Menu Toggle -->
      <button class="header__mobile-toggle" 
              (click)="toggleMobileMenu()"
              [attr.aria-expanded]="mobileMenuOpen">
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
      </button>

    </div>
  </div>
</header>
```

---

## 🎯 CSS Variables Reference

```css
:root {
  /* Colors */
  --color-primary: #0f6fff;
  --color-text-primary: #0b1220;
  --color-text-muted: #556075;
  --color-bg-light: #ffffff;
  --color-bg-lighter: #f8fafc;
  --color-border: #e6e9f2;
  --color-shadow-sm: rgba(11, 18, 32, 0.06);
  --color-shadow-md: rgba(11, 18, 32, 0.12);
  --color-success: #10b981;
  --color-error: #ef4444;

  /* Sizing */
  --radius-sm: 0.375rem;    /* 6px */
  --radius-md: 0.5rem;      /* 8px */

  /* Timing */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}

:root.dark-mode {
  --color-bg-light: #1a1f2e;
  --color-bg-lighter: #242d3d;
  --color-text-primary: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
  --color-shadow-sm: rgba(0, 0, 0, 0.2);
  --color-shadow-md: rgba(0, 0, 0, 0.3);
}
```

---

## 🔗 Component Integration

### In app.component.ts
```typescript
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
```

---

## 📊 Interaction Flow

```
User Interaction
    ↓
[Mobile Toggle] → toggleMobileMenu() → mobileMenuOpen = true/false
[Nav Link]      → RouterLink        → Navigation to route
[Search]        → handleSearch()    → Console log (ready for dispatch)
[Clear Search]  → clearSearch()     → Reset searchQuery
[Login Button]  → onLogin()         → AuthService.login()
[Logout Button] → onLogout()        → AuthService.logout()
[Dark Toggle]   → toggleDarkMode()  → isDarkMode = true/false
                                    → Save to localStorage
                                    → Apply 'dark-mode' class
```

---

## 🎓 Customization Examples

### Change Theme Colors
```css
:root {
  --color-primary: #ff6b6b;        /* Red instead of blue */
  --color-text-primary: #1a1a1a;   /* Darker text */
}
```

### Change Brand Name
```html
<span class="brand__text">My App</span>
```

### Add New Navigation Link
```html
<li>
  <a routerLink="/products" routerLinkActive="nav-link--active">
    Products
  </a>
</li>
```

### Disable Dark Mode
```typescript
// In header.component.ts, remove:
toggleDarkMode() method call
```

### Customize Mobile Breakpoint
```css
@media (max-width: 1200px) {  /* Instead of 768px */
  .header__mobile-toggle { display: flex; }
  /* ... rest of mobile styles */
}
```

---

## ✅ Validation Checklist

- [x] Header displays correctly on desktop, tablet, mobile
- [x] All links navigate to correct routes
- [x] Active link highlighting works
- [x] Search input captures text correctly
- [x] Clear search button appears/disappears appropriately
- [x] Login/Logout buttons show based on auth state
- [x] Dark mode toggle switches theme
- [x] Dark mode preference persists on reload
- [x] Mobile menu opens/closes smoothly
- [x] Mobile menu closes when link is clicked
- [x] All keyboard shortcuts work
- [x] Focus states visible with Tab key
- [x] No console errors
- [x] No styling conflicts

---

## 🚀 Performance Tips

1. **CSS-in-JS**: All styling is CSS (no JS calculations)
2. **GPU Acceleration**: Transforms and opacity changes use GPU
3. **Media Queries**: Optimized for fast media query evaluation
4. **No External Images**: SVG icons are inline
5. **Minimal Reflows**: Structural CSS minimizes layout shifts
6. **Transition Optimization**: 150-300ms for smooth 60 FPS

---

**Component Ready for Production** ✨
