// DEVELOPER_QUICK_REFERENCE.md
// Quick reference for developers working on the Todo App

# 🚀 Developer Quick Reference

## 📌 Quick Navigation

| Task | File | Location |
|------|------|----------|
| Create/Read/Update/Delete | `todo.service.ts` | `src/app/core/services/` |
| Todo Model | `todo.model.ts` | `src/app/core/models/` |
| List Page | `todo-list/` | `src/app/features/todos/` |
| Single Todo Item | `todo-item/` | `src/app/features/todos/` |
| Todo Form | `todo-form/` | `src/app/features/todos/` |
| Header Component | `header/` | `src/app/shared/components/` |
| Global Styles | `styles.css` | `src/app/shared/ui/` |
| Routes | `app.routes.ts` | `src/app/` |
| Tests | `*.spec.ts` | Various directories |

---

## 🔑 Key Files Explained

### Core Services
```typescript
// src/app/core/services/todo.service.ts
- createTodo(title, description)          // Create
- getTodos()                               // Read all
- updateTodo(id, updates)                 // Update
- deleteTodo(id)                          // Delete
- toggleTodo(id)                          // Toggle completion
- toggleAll(completed)                    // Bulk toggle
- clearCompleted()                        // Bulk delete
- setFilter(filter)                       // Filter management
- setSearch(query)                        // Search
- setSort(sort)                           // Sorting
- exportTodos()                           // Export as JSON
- importTodos(jsonString)                 // Import from JSON
- todos$                                  // Observable todos
- filteredTodos$                          // Observable filtered todos
- stats$                                  // Observable stats
```

### Authentication Service
```typescript
// src/app/core/services/auth.service.ts
- login()                                 // Login user
- logout()                                // Logout user
- isAuthenticated()                       // Check auth (sync)
- isAuthenticated$                        // Observable auth state
```

### Auth Guard
```typescript
// src/app/core/guards/auth.guard.ts
- canActivate()                           // Protect route
```

---

## 🎯 Common Tasks

### Add a New Todo
```typescript
this.todoService.createTodo('My Todo', 'Description');
```

### Subscribe to Todos
```typescript
this.todos$ = this.todoService.filteredTodos$;
// In template: *ngFor="let todo of todos$ | async"
```

### Update Todo Completion
```typescript
this.todoService.toggleTodo(todoId);
```

### Filter and Search
```typescript
this.todoService.setFilter(TodoFilter.ACTIVE);
this.todoService.setSearch('query');
this.todoService.setSort(TodoSort.TITLE);
```

### Export Data
```typescript
const json = this.todoService.exportTodos();
```

### Import Data
```typescript
try {
  this.todoService.importTodos(jsonString);
} catch (error) {
  console.error('Import failed:', error);
}
```

### Check Authentication
```typescript
// Subscribe to auth state
this.authService.isAuthenticated$.subscribe(isAuth => {
  console.log('Authenticated:', isAuth);
});

// Check synchronously
if (this.authService.isAuthenticated()) {
  // User is logged in
}
```

---

## 🧪 Testing

### Run Tests
```bash
npm test                                  # Watch mode
npm test -- --watch=false                # Single run
npm test -- --code-coverage              # With coverage
```

### Test File Locations
```
src/app/core/services/todo.service.spec.ts
src/app/features/todos/todo-list/todo-list.component.spec.ts
```

### Test Template
```typescript
describe('Feature', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should do something', () => {
    // Arrange
    const result = service.getTodos();
    
    // Assert
    expect(result).toBeDefined();
  });
});
```

---

## 🎨 Styling

### Global CSS Variables
```css
/* src/app/shared/ui/styles.css */
:root {
  --color-primary: #0f6fff;           /* Blue */
  --color-accent: #7c3aed;            /* Purple */
  --color-text-primary: #0b1220;      /* Dark */
  --color-text-muted: #556075;        /* Gray */
  --color-success: #16a34a;           /* Green */
  --color-danger: #ef4444;            /* Red */
  --color-border: #e6e9f2;            /* Light */
  --spacing-sm: 0.5rem;               /* 8px */
  --spacing-md: 1rem;                 /* 16px */
  --spacing-lg: 1.5rem;               /* 24px */
}
```

### Common CSS Classes
```css
.btn                      /* Button base */
.btn-primary              /* Primary button */
.btn-secondary            /* Secondary button */
.btn-danger               /* Danger button */
.card                     /* Card container */
.container                /* Max-width wrapper */
.flex                     /* Flexbox */
.text-muted              /* Muted text */
```

---

## 📦 Component Structure

### Standalone Component Template
```typescript
@Component({
  selector: 'app-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class MyComponent implements OnInit {
  ngOnInit() {
    // Initialize
  }
}
```

---

## 🔌 API Integration Points

### Replace localStorage in TodoService
1. Inject `HttpClient`
2. Replace `loadFromStorage()` with HTTP GET
3. Replace `saveToStorage()` with HTTP POST/PUT
4. Update method signatures to return Observables

Example:
```typescript
// Before
createTodo(title, description) {
  // Create todo
  this.saveToStorage(todos);  // ← Replace this
  return newTodo;
}

// After
createTodo(title: string, description?: string): Observable<Todo> {
  return this.http.post<Todo>('/api/todos', { title, description })
    .pipe(
      tap(newTodo => {
        const todos = [...this.todosSubject.value, newTodo];
        this.todosSubject.next(todos);
      })
    );
}
```

### Replace Auth in AuthService
1. Add `HttpClient`
2. Replace `login()` with POST to auth endpoint
3. Store token in localStorage
4. Add HTTP interceptor for Authorization header

---

## 🗂️ Folder Organization

```
src/app/core/
├── models/              # Data models, interfaces, enums
├── services/            # Business logic, API calls
└── guards/              # Route protection

src/app/features/
├── todos/               # Todo feature (list, item, form)
├── about/               # About page feature
└── settings/            # Settings page feature

src/app/shared/
├── components/          # Reusable components (header, footer)
└── ui/                  # Global styles and utilities
```

---

## ⚡ Performance Tips

1. **Use OnPush Change Detection**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

2. **Unsubscribe from Observables**
   ```typescript
   private destroy$ = new Subject<void>();
   
   ngOnInit() {
     this.service.data$.pipe(
       takeUntil(this.destroy$)
     ).subscribe(data => {});
   }
   
   ngOnDestroy() {
     this.destroy$.next();
   }
   ```

3. **Use async Pipe in Templates**
   ```html
   <div *ngFor="let item of items$ | async">
     {{ item.name }}
   </div>
   ```

---

## 🐛 Debugging

### View localStorage
```javascript
// In browser console
console.log(JSON.parse(localStorage.getItem('app_todos')));
console.log(JSON.parse(localStorage.getItem('app_auth')));
```

### Enable Debug Mode
```typescript
// In any service
console.log('Debug:', this.todosSubject.value);
```

### Check Auth State
```javascript
// Browser console
localStorage.getItem('app_auth')  // true/false
```

---

## 📋 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

---

## 🚀 Deployment Checklist

- [ ] Run tests: `npm test -- --watch=false`
- [ ] Build: `npm run build`
- [ ] Check bundle size
- [ ] Test in production mode
- [ ] Update environment.ts with API URL
- [ ] Review console for errors
- [ ] Check accessibility (axe DevTools)
- [ ] Test on mobile devices
- [ ] Deploy to hosting

---

## 📚 Additional Resources

- [Angular Docs](https://angular.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 💡 Tips & Tricks

### Hot Reload Development
```bash
npm start
# Make changes to files and save
# Browser auto-refreshes
```

### View Console Errors
Open DevTools (F12) → Console tab

### Test Specific Suite
```bash
ng test --include='**/todo.service.spec.ts'
```

### Generate Component
```bash
ng generate component components/my-component
```

### Format Code
```bash
npx prettier --write "src/**/*.ts"
```

---

## ✅ Checklist Before Commit

- [ ] Code builds without errors
- [ ] Tests pass: `npm test -- --watch=false`
- [ ] No console errors
- [ ] Code formatted with Prettier
- [ ] TypeScript strict: no `any` types
- [ ] JSDoc comments added to public methods
- [ ] No console.log left in production code
- [ ] Accessibility checked

---

**Happy coding! 🎉**
