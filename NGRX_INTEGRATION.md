# NgRx State Management Integration

## Overview

The Todo app now uses **NgRx** for centralized state management. This replaces the previous service-based state management with a more predictable, scalable architecture.

## Architecture

```
┌─────────────────────────────────────────┐
│         Components                      │
│  (todo-list, header, settings, etc.)    │
└──────────────┬──────────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │  Selectors (read)    │  selectAllTodos$, selectFilteredTodos$, etc.
    └──────────────┬───────┘
                   │
         ┌─────────┴──────────┐
         ▼                    ▼
    ┌──────────┐         ┌──────────┐
    │   Store  │         │ Effects  │
    │(reducers)│         │(side fx) │
    └────┬─────┘         └────┬─────┘
         │                    │
         │              (localStorage)
         │                    │
    ┌────┴────────────────────┴────┐
    │      TodoService             │
    │  (low-level operations)      │
    └──────────────────────────────┘
```

## Store Structure

### Todo Store (`src/app/store/todo/`)

**State:**
- `todos: Todo[]` - All todos
- `filter: TodoFilter` - Current filter (ALL, ACTIVE, COMPLETED)
- `search: string` - Search query
- `sort: TodoSort` - Sort order (CREATED, TITLE, STATUS)
- `loading: boolean` - Loading state
- `error: string | null` - Error message

**Actions:**
- Load/Create/Update/Delete/Toggle todos
- Set filter/search/sort
- Import todos
- Success and failure variants

**Reducers:**
- Pure functions that handle state mutations
- Immutable state updates

**Selectors:**
- `selectAllTodos` - All todos
- `selectFilteredTodos` - Todos after applying filter/search/sort
- `selectStats` - Todo statistics (total, active, completed)
- `selectFilter`, `selectSearch`, `selectSort` - Current filter state
- `selectLoading`, `selectError` - UI state

**Effects:**
- Handle side effects (localStorage persistence)
- Subscribe to actions and trigger observables
- Return new actions to update state

### Auth Store (`src/app/store/auth/`)

**State:**
- `isAuthenticated: boolean` - Login status
- `loading: boolean` - Loading state
- `error: string | null` - Error message

**Actions:**
- Login/Logout

**Selectors:**
- `selectIsAuthenticated` - Auth status

**Effects:**
- Handle login/logout side effects

## File Structure

```
src/app/store/
├── index.ts                 # Store configuration
├── todo/
│   ├── todo.state.ts       # State interface
│   ├── todo.actions.ts     # Action creators
│   ├── todo.reducer.ts     # Reducer function
│   ├── todo.selectors.ts   # Selectors
│   └── todo.effects.ts     # Effects (side effects)
└── auth/
    ├── auth.state.ts       # State interface
    ├── auth.actions.ts     # Action creators
    ├── auth.reducer.ts     # Reducer function
    ├── auth.selectors.ts   # Selectors
    └── auth.effects.ts     # Effects (side effects)
```

## Usage Examples

### Selecting Data

```typescript
import { Store } from '@ngrx/store';
import { selectFilteredTodos, selectStats } from './store/todo/todo.selectors';

export class TodoListComponent {
  filteredTodos$ = this.store.select(selectFilteredTodos);
  stats$ = this.store.select(selectStats);

  constructor(private store: Store) {}
}
```

### Dispatching Actions

```typescript
import { Store } from '@ngrx/store';
import * as TodoActions from './store/todo/todo.actions';

export class TodoListComponent {
  onCreateTodo(title: string, description?: string) {
    this.store.dispatch(TodoActions.createTodo({ title, description }));
  }

  onToggleTodo(id: string) {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  onSetFilter(filter: TodoFilter) {
    this.store.dispatch(TodoActions.setFilter({ filter }));
  }

  constructor(private store: Store) {}
}
```

### Effects Example

```typescript
@Injectable()
export class TodoEffects {
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createTodo),
      map(({ title, description }) => {
        // Create todo, save to localStorage
        const todo = this.todoService.createTodoItem(title, description);
        this.todoService.saveToStorage([...todos, todo]);
        
        // Dispatch success action
        return TodoActions.createTodoSuccess({ todo });
      })
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
```

## DevTools

Redux DevTools are enabled by default. You can:

1. Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension)
2. Open DevTools in your browser
3. See all dispatched actions and state changes
4. Time-travel debug (rewind/replay actions)

## Benefits

✅ **Predictable State Management** - Single source of truth
✅ **Time-Travel Debugging** - Redux DevTools support
✅ **Performance Optimization** - Memoized selectors
✅ **Testability** - Easy to test pure functions
✅ **Scalability** - Structured for growth
✅ **Maintainability** - Clear separation of concerns

## Migration Path

### From Service-Based to NgRx

**Before (Service):**
```typescript
constructor(private todoService: TodoService) {
  this.filteredTodos$ = this.todoService.filteredTodos$;
}

createTodo(title: string) {
  this.todoService.createTodo(title);
}
```

**After (NgRx):**
```typescript
filteredTodos$ = this.store.select(selectFilteredTodos);

constructor(private store: Store) {}

createTodo(title: string) {
  this.store.dispatch(createTodo({ title }));
}
```

## Next Steps

1. **Refactor Components** - Update todo-list, header, settings components to use NgRx
2. **Add More Effects** - Handle API calls instead of localStorage
3. **Error Handling** - Better error messages in reducers
4. **Async Operations** - Use concatMap/switchMap for async effects
5. **Entity Adapter** - Use `@ngrx/entity` for normalized state

## Resources

- [NgRx Documentation](https://ngrx.io)
- [NgRx Effects](https://ngrx.io/guide/effects)
- [NgRx Store](https://ngrx.io/guide/store)
- [Selectors](https://ngrx.io/guide/store/selectors)
- [Redux DevTools](https://ngrx.io/guide/store-devtools)
