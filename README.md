# Todo App - Production-Ready Angular 19 Application

A modern, fully-featured todo application built with Angular 19, TypeScript, and plain CSS. Demonstrates best practices for building scalable, accessible, and maintainable web applications.

## ✨ Features

### Core Functionality
- ✅ **Create, Read, Update, Delete** todos with title and optional descriptions
- ✅ **Mark todos complete/incomplete** with visual feedback
- ✅ **Edit todos** inline or through a dedicated form
- ✅ **Delete todos** with confirmation UI

### Filtering & Search
- ✅ **Filter by status**: All, Active, Completed
- ✅ **Live search** by title or description
- ✅ **Sort options**: By date created, alphabetically by title, or by status
- ✅ **Search is case-insensitive** and real-time

### Bulk Operations
- ✅ **Toggle all** todos complete/incomplete at once
- ✅ **Clear completed** todos with confirmation
- ✅ **Export todos** as JSON (copy to clipboard or download file)
- ✅ **Import todos** from JSON (paste or upload file)

### Persistence & State
- ✅ **localStorage** for automatic persistence
- ✅ Todos persist across browser sessions
- ✅ **Automatic syncing** with the UI (no manual save required)
- ✅ Ready for backend API integration (see code comments)

### Authentication & Routing
- ✅ **Protected routes** with AuthGuard (Settings page requires login)
- ✅ **Simulated authentication** (toggle login in header)
- ✅ Persistent auth state with localStorage
- ✅ Easy migration to real OAuth2/JWT

### UI/UX & Accessibility
- ✅ **Responsive design** (mobile, tablet, desktop)
- ✅ **Modern color palette** with semantic HTML
- ✅ **Full keyboard navigation** support
- ✅ **ARIA labels** and roles for screen readers
- ✅ **Smooth CSS transitions** and micro-interactions
- ✅ **Card-based layout** with subtle shadows
- ✅ **8px spacing scale** for consistency
- ✅ **Inter font** from Google Fonts
- ✅ **Dark mode support** via CSS media query

### Development
- ✅ **Unit tests** (Jasmine/Karma) for services and components
- ✅ **Standalone components** (Angular 19 best practice)
- ✅ **RxJS observables** for state management
- ✅ **Clean code architecture** with separation of concerns
- ✅ **TypeScript strict mode** enabled
- ✅ **ESLint/Prettier** configuration included

## 🎨 Design

### Color Palette
- **Primary**: `#0F6FFF` - Bright blue
- **Accent**: `#7C3AED` - Violet
- **Surface**: `#FFFFFF` - White
- **Background**: `#F5F7FB` - Light blue-gray
- **Text Primary**: `#0B1220` - Dark navy
- **Text Muted**: `#556075` - Medium gray
- **Success**: `#16A34A` - Green
- **Danger**: `#EF4444` - Red
- **Border**: `#E6E9F2` - Light gray

### Spacing Scale (8px base)
- `8px` (0.5rem) - xs
- `16px` (1rem) - sm
- `24px` (1.5rem) - md
- `32px` (2rem) - lg
- `48px` (3rem) - xl

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core application logic
│   │   ├── models/
│   │   │   └── todo.model.ts    # Todo interface and enums
│   │   ├── services/
│   │   │   ├── todo.service.ts  # Todo CRUD + filtering + persistence
│   │   │   └── auth.service.ts  # Authentication state management
│   │   └── guards/
│   │       └── auth.guard.ts    # Route protection guard
│   │
│   ├── features/                # Feature modules
│   │   ├── todos/
│   │   │   ├── todo-list/       # Main todo list page
│   │   │   ├── todo-item/       # Single todo item component
│   │   │   └── todo-form/       # Create/edit form component
│   │   ├── about/               # About page
│   │   └── settings/            # Settings page (protected)
│   │
│   ├── shared/                  # Shared components & styles
│   │   ├── components/
│   │   │   ├── header/          # Top navigation
│   │   │   ├── footer/          # App footer
│   │   │   └── modal/           # Modal component (if needed)
│   │   └── ui/
│   │       └── styles.css       # Global utilities & variables
│   │
│   ├── app.routes.ts            # Route definitions
│   ├── app.component.ts         # Root component
│   └── main.ts                  # Bootstrap file
│
├── assets/                      # Static assets
├── environments/                # Environment configs
├── index.html                   # HTML entry point
├── styles.css                   # Global styles
└── main.server.ts               # SSR bootstrap (if enabled)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Angular CLI 19+ (optional, use `npx ng` if not installed globally)

### Installation

1. **Navigate to the project directory**:
```bash
cd Ecomm
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

The application will be available at `http://localhost:4200`

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Building for Production

```bash
npm run build
# or
ng build --configuration production
```

The build output will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
# or
ng test
```

Tests will run in watch mode using Karma and Jasmine. Coverage reports are generated in `coverage/`.

**Run tests once (CI mode)**:
```bash
ng test --watch=false --browsers=ChromeHeadless
```

## 📖 Usage Guide

### Creating a Todo
1. Click **"+ New Todo"** button in the bulk actions section
2. Enter the todo title (required, max 100 characters)
3. Optionally add a description (max 500 characters)
4. Click **"Create"** to save

### Editing a Todo
1. Click the **edit icon** (pencil) on any todo
2. The form will appear at the top
3. Modify the title or description
4. Click **"Update"** to save or **"Cancel"** to discard

### Completing a Todo
- Click the **checkbox** next to a todo to mark it complete/incomplete
- Completed todos show with strikethrough text and reduced opacity

### Deleting a Todo
1. Click the **delete icon** (trash) on any todo
2. A confirmation dialog will appear
3. Click **"Delete"** to confirm or **"Cancel"** to keep the todo

### Filtering & Searching
- **Search**: Type in the search box to filter by title or description
- **Filter**: Use the "Filter" dropdown to show All, Active, or Completed todos
- **Sort**: Use the "Sort" dropdown to order by Created date, Title (A-Z), or Status

### Bulk Actions
- **Toggle All**: Mark all todos as complete or incomplete at once
- **Clear Completed**: Delete all completed todos (with confirmation)
- **Export**: Save all todos to a JSON file for backup
- **Import**: Load todos from a previously exported JSON file

### Authentication & Protected Routes

**Settings Page (Protected)**:
1. Click **"Login"** in the header to enable authentication
2. Now you can access the **"Settings"** page
3. The Settings page shows account, storage, and app information
4. Click **"Logout"** to disable authentication

**About Page**:
- View project information, features, and tech stack
- Accessible from the main navigation menu

## 🔌 Backend Integration Guide

### Replacing localStorage with an API

The `TodoService` is designed to make backend integration seamless. Here's how to migrate:

1. **Inject HttpClient**:
```typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}
```

2. **Replace localStorage calls with HTTP requests** (see comments in `todo.service.ts`)

3. **Keep the same public interface** for components

4. **Update AuthService** for real JWT/OAuth2 (see `auth.service.ts`)

## 🧪 Testing

### Running Tests

```bash
# Watch mode (default)
npm test

# Single run (CI mode)
npm test -- --watch=false

# With coverage
npm test -- --code-coverage
```

### Test Files
- `src/app/core/services/todo.service.spec.ts` - TodoService tests
- `src/app/features/todos/todo-list/todo-list.component.spec.ts` - TodoListComponent tests

## ♿ Accessibility

The application follows WCAG 2.1 AA standards:
- ✅ Semantic HTML
- ✅ ARIA labels on interactive elements
- ✅ Full keyboard navigation support
- ✅ Focus indicators on all interactive elements
- ✅ Color contrast ratios meet accessibility standards
- ✅ Form validation messages with proper roles

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## 🎯 Demo Script

See [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for step-by-step testing instructions covering all acceptance criteria.

## 🛠️ Tech Stack

- **Framework**: Angular 19 (with standalone components)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Plain CSS with CSS variables
- **State Management**: RxJS BehaviorSubjects
- **Persistence**: localStorage (ready for backend API)
- **Testing**: Jasmine + Karma
- **Build Tool**: Angular CLI 19
- **Fonts**: Google Fonts (Inter)
- **Icons**: Inline SVG

## 📝 Design Decisions

### Why Plain CSS?
- No build complexity from CSS frameworks
- Full control over styles
- Smaller bundle size
- CSS variables provide theming capability
- Easier to customize and maintain

### Why localStorage?
- Works immediately without backend setup
- Easy to replace with API calls (service pattern allows this)
- Great for demos and prototyping
- All data is reversible (export/import)

### Why Standalone Components?
- Modern Angular 19 approach
- Simpler dependency management
- Smaller bundle sizes
- Better tree-shaking

### Why RxJS?
- Reactive state management
- Easy filtering and transformations
- Better performance with async pipe
- Foundation for real-time features

## 📄 License

MIT License - Free to use for learning and production.

## ❓ FAQ

**Q: Can I use this for production?**
A: Yes! The code is production-ready. Connect a real backend API instead of localStorage.

**Q: How do I add a backend API?**
A: See Backend Integration Guide above. Services are designed for HTTP client integration.

**Q: How do I customize colors?**
A: Edit CSS variables in `src/app/shared/ui/styles.css`.

**Q: Is it mobile responsive?**
A: Yes! Mobile-first design with breakpoints for tablet and desktop.

**Q: Can I use this with a backend framework?**
A: Absolutely! Just connect the TodoService HTTP calls to your API endpoints.

---

**Happy coding! 🚀**
#   S i m p l e - T o d o - w e b a p p  
 