# NgRx Integration Guide - Component Refactoring

This guide shows how to refactor your existing components to use NgRx instead of direct service calls.

## Step 1: Update Todo List Component

### Before (Service-Based)

```typescript
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  stats$!: Observable<any>;
  
  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.filteredTodos$;
    this.stats$ = this.todoService.stats$;
  }

  onCreateTodo(title: string, description?: string) {
    this.todoService.createTodo(title, description);
  }
}
```

### After (NgRx)

```typescript
import { Store } from '@ngrx/store';
import { selectFilteredTodos, selectStats } from '../../store/todo/todo.selectors';
import * as TodoActions from '../../store/todo/todo.actions';

export class TodoListComponent implements OnInit {
  // Select data from store
  filteredTodos$ = this.store.select(selectFilteredTodos);
  stats$ = this.store.select(selectStats);
  
  constructor(private store: Store) {}

  onCreateTodo(title: string, description?: string) {
    // Dispatch action instead of calling service
    this.store.dispatch(TodoActions.createTodo({ title, description }));
  }

  onToggleTodo(id: string) {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  onSetFilter(filter: TodoFilter) {
    this.store.dispatch(TodoActions.setFilter({ filter }));
  }

  onSetSearch(search: string) {
    this.store.dispatch(TodoActions.setSearch({ search }));
  }

  onSetSort(sort: TodoSort) {
    this.store.dispatch(TodoActions.setSort({ sort }));
  }
}
```

## Step 2: Update Header Component

### Before (Service-Based)

```typescript
export class HeaderComponent {
  isAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
```

### After (NgRx)

```typescript
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

export class HeaderComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(private store: Store) {}

  onLogin() {
    this.store.dispatch(AuthActions.login());
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
```

## Step 3: Update Settings Component

### Before (Service-Based)

```typescript
export class SettingsComponent {
  isAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  onLogout() {
    this.authService.logout();
  }
}
```

### After (NgRx)

```typescript
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

export class SettingsComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
```

## Step 4: Import Store Providers

Ensure your `main.ts` includes the store providers (already done):

```typescript
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers, effects } from './app/store';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(reducers),
    provideEffects(effects),
  ],
});
```

## Complete Example: Todo List Component

```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectFilteredTodos,
  selectStats,
  selectFilter,
  selectSearch,
  selectSort,
  selectLoading,
  selectError,
} from '../../store/todo/todo.selectors';
import * as TodoActions from '../../store/todo/todo.actions';
import { Todo, TodoFilter, TodoSort } from '../../core/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  // Selectors (read-only state)
  filteredTodos$: Observable<Todo[]>;
  stats$: Observable<any>;
  filter$: Observable<TodoFilter>;
  search$: Observable<string>;
  sort$: Observable<TodoSort>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  // Local UI state (not in store)
  showForm = false;
  editingTodo: Todo | null = null;

  TodoFilter = TodoFilter;
  TodoSort = TodoSort;

  constructor(private store: Store) {
    this.filteredTodos$ = this.store.select(selectFilteredTodos);
    this.stats$ = this.store.select(selectStats);
    this.filter$ = this.store.select(selectFilter);
    this.search$ = this.store.select(selectSearch);
    this.sort$ = this.store.select(selectSort);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    // Load initial todos from localStorage via effects
    this.store.dispatch(TodoActions.loadTodos());
  }

  // Dispatch actions instead of calling service methods
  onCreateTodo(title: string, description?: string) {
    this.store.dispatch(TodoActions.createTodo({ title, description }));
    this.showForm = false;
  }

  onToggleTodo(id: string) {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  onEditTodo(todo: Todo) {
    this.editingTodo = todo;
    this.showForm = true;
  }

  onUpdateTodo(title: string, description?: string) {
    if (this.editingTodo) {
      this.store.dispatch(
        TodoActions.updateTodo({
          id: this.editingTodo.id,
          updates: { title, description },
        })
      );
      this.showForm = false;
      this.editingTodo = null;
    }
  }

  onDeleteTodo(id: string) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  onSetFilter(filter: TodoFilter) {
    this.store.dispatch(TodoActions.setFilter({ filter }));
  }

  onSetSearch(search: string) {
    this.store.dispatch(TodoActions.setSearch({ search }));
  }

  onSetSort(sort: TodoSort) {
    this.store.dispatch(TodoActions.setSort({ sort }));
  }

  onToggleAll() {
    this.store.dispatch(TodoActions.toggleAll({ completed: true }));
  }

  onClearCompleted() {
    this.store.dispatch(TodoActions.clearCompleted());
  }

  onImportTodos(jsonString: string) {
    this.store.dispatch(TodoActions.importTodos({ jsonString }));
  }
}
```

## Benefits of NgRx Refactoring

| Aspect | Before (Service) | After (NgRx) |
|--------|------------------|--------------|
| State Source | Multiple services | Single store |
| Data Flow | Bidirectional | Unidirectional |
| Testing | Harder to test | Easy to test (pure functions) |
| Debugging | Hard to trace | Redux DevTools time-travel |
| Scalability | Difficult | Highly scalable |
| Performance | Manual optimization | Automatic (memoized selectors) |
| Side Effects | Mixed with business logic | Isolated in effects |

## Migration Checklist

- [ ] Update components to use `Store.select()`
- [ ] Replace service method calls with `Store.dispatch()`
- [ ] Remove RxJS subjects from components
- [ ] Update templates to use new selector names
- [ ] Test all CRUD operations
- [ ] Verify error handling
- [ ] Check Redux DevTools for proper state changes
- [ ] Update component tests with MockStore

## Next: Testing NgRx Components

See `NGRX_TESTING.md` for unit testing strategies with NgRx.
