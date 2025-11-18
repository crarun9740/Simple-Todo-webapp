# 🚀 Quick Start Guide - Todo App

## ⚡ Install & Run in 2 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The app will open automatically at `http://localhost:4200`

---

## 📋 Available Commands

```bash
# Development server (http://localhost:4200)
npm start

# Production build
npm run build

# Watch mode development
npm run watch

# Run tests
npm test

# Run tests once (headless)
npm test -- --watch=false

# Run tests with coverage
npm test -- --code-coverage
```

---

## 📖 Documentation

- **README.md** - Complete project documentation, features, architecture
- **DEMO_SCRIPT.md** - Step-by-step testing guide for all features
- **This file** - Quick start guide

---

## 🎯 Quick Feature Overview

### Create & Manage Todos
- ✅ Add todos with title and optional description
- ✅ Edit todos inline
- ✅ Mark complete/incomplete
- ✅ Delete with confirmation

### Filter & Search
- ✅ Filter by status (All/Active/Completed)
- ✅ Real-time search by title or description
- ✅ Sort by date created, title, or status

### Bulk Operations
- ✅ Toggle all todos at once
- ✅ Clear all completed todos
- ✅ Export todos as JSON
- ✅ Import todos from JSON

### Persistence & Auth
- ✅ Auto-save to localStorage
- ✅ Protected settings page with authentication
- ✅ Login/Logout toggle in header

---

## 🧪 Run Tests

```bash
# Watch mode (recommended for development)
npm test

# Single run (CI/CD)
npm test -- --watch=false

# With coverage report
npm test -- --code-coverage
```

Test files:
- `src/app/core/services/todo.service.spec.ts` - Service tests
- `src/app/features/todos/todo-list/todo-list.component.spec.ts` - Component tests

---

## 🔑 Key Features to Test

1. **Create Todo** → Click "+ New Todo" button
2. **Edit Todo** → Click pencil icon
3. **Complete Todo** → Click checkbox
4. **Delete Todo** → Click trash icon
5. **Filter** → Use dropdown (All/Active/Completed)
6. **Search** → Type in search box
7. **Export/Import** → Use bulk actions buttons
8. **Protected Route** → Click "Login" then "Settings"

See **DEMO_SCRIPT.md** for comprehensive testing steps.

---

## 🎨 Customize Colors

Edit CSS variables in `src/app/shared/ui/styles.css`:

```css
:root {
  --color-primary: #0f6fff;      /* Change this to your brand color */
  --color-accent: #7c3aed;       /* Secondary accent */
  /* ... other variables ... */
}
```

---

## 🔌 Connect to Backend API

To replace localStorage with a real API:

1. **Open `src/app/core/services/todo.service.ts`**
2. **Inject HttpClient and replace localStorage calls**
3. **Update TodoService methods to use HTTP calls**
4. **See code comments for integration points**

Example:
```typescript
// Before: localStorage
this.saveToStorage(todos);

// After: API
return this.http.post('/api/todos', todo).pipe(...)
```

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/         # Data models
│   │   ├── services/       # Business logic
│   │   └── guards/         # Route protection
│   ├── features/
│   │   ├── todos/          # Todo list feature
│   │   ├── about/          # About page
│   │   └── settings/       # Settings page (protected)
│   ├── shared/
│   │   ├── components/     # Header, Footer
│   │   └── ui/             # Global styles
│   ├── app.component.ts    # Root component
│   ├── app.routes.ts       # Route definitions
│   └── main.ts             # Bootstrap
├── styles.css              # Global styles
└── environments/           # Config files
```

---

## ♿ Accessibility

The app is fully keyboard accessible:
- **Tab** - Navigate between elements
- **Enter** - Activate buttons, submit forms
- **Space** - Toggle checkboxes
- **Escape** - Close modals

All interactive elements have:
- ✅ ARIA labels
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ Color contrast compliance

---

## 📱 Responsive Design

Optimized for all screen sizes:
- **Mobile** (< 480px) - Single column, optimized touch targets
- **Tablet** (481-768px) - 2-column grid where appropriate
- **Desktop** (> 768px) - Full layout

---

## 🧠 Tech Stack

- **Angular 19** - Standalone components
- **TypeScript** - Strict mode enabled
- **RxJS** - Reactive state management
- **Plain CSS** - No frameworks, ~2KB minified
- **Jasmine/Karma** - Unit testing
- **localStorage** - Persistence (swappable with API)

---

## 📊 Performance

- ✅ **Small bundle** - No heavy CSS frameworks
- ✅ **Fast load** - Single page application
- ✅ **Optimized** - Tree-shaking ready
- ✅ **Scalable** - Service-oriented architecture

---

## 🐛 Troubleshooting

### Port 4200 already in use?
```bash
ng serve --port 4300
```

### Tests not running?
```bash
npm install
npm test -- --browsers=Chrome
```

### Build errors?
```bash
rm -rf node_modules dist
npm install
npm run build
```

---

## 📚 Learn More

- **README.md** - Full documentation
- **DEMO_SCRIPT.md** - Testing guide with all acceptance criteria
- **Code comments** - JSDoc on all public methods
- **Angular docs** - https://angular.io

---

## ✨ Next Steps

1. ✅ Install: `npm install`
2. ✅ Start: `npm start`
3. ✅ Test: Open browser → http://localhost:4200
4. 🎯 Follow DEMO_SCRIPT.md to test all features
5. 🔌 Connect backend API (see README.md Backend Guide)
6. 🚀 Deploy to production

---

## 📝 Notes

- All todos stored in localStorage by default
- Auth is simulated (for demo purposes)
- Easy to integrate real backend and authentication
- Production-ready code with best practices
- No external dependencies except Angular and RxJS

---

**Ready to go! 🚀** 

Questions? Check **README.md** for detailed documentation or see code comments for implementation details.
