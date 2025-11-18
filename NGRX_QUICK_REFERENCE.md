# NgRx Quick Reference

## Installation
```bash
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools --save
```

## Basic Usage

### 1. Create Actions
```typescript
export const createTodo = createAction(
  '[Todo] Create Todo',
  props<{ title: string; description?: string }>()
);
```

### 2. Create Reducer
```typescript
export const todoReducer = createReducer(
  initialState,
  on(TodoActions.createTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  }))
);
```

### 3. Create Selectors
```typescript
export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);
```

### 4. Create Effects
```typescript
@Injectable()
export class TodoEffects {
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createTodo),
      map(({ title }) => {
        const todo = this.todoService.createTodo(title);
        return TodoActions.createTodoSuccess({ todo });
      })
    )
  );
}
```

### 5. Provide Store
```typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideStore(reducers),
    provideEffects(effects),
    provideStoreDevtools(),
  ],
});
```

### 6. Use in Component
```typescript
export class MyComponent {
  todos$ = this.store.select(selectAllTodos);

  constructor(private store: Store) {}

  createTodo(title: string) {
    this.store.dispatch(createTodo({ title }));
  }
}
```

## Common Patterns

### Creating Feature State
```typescript
export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};
```

### Action Naming Convention
```
[Source] Event Name
[Todo] Create Todo       // Action started
[Todo] Create Todo Success
[Todo] Create Todo Failure
```

### Selector Memoization
```typescript
export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectFilter,
  selectSearch,
  (todos, filter, search) => {
    // Memoized: only runs if inputs change
    return todos.filter(...).filter(...);
  }
);
```

### Effect with HTTP
```typescript
loadTodos$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodoActions.loadTodos),
    switchMap(() =>
      this.http.get<Todo[]>('/api/todos').pipe(
        map(todos => TodoActions.loadTodosSuccess({ todos })),
        catchError(() => of(TodoActions.loadTodosFailure(...)))
      )
    )
  )
);
```

### Dispatching Multiple Actions
```typescript
saveAndRedirect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TodoActions.saveTodo),
    switchMap(() => {
      return [
        TodoActions.saveTodoSuccess(),
        TodoActions.navigateToList(),
      ];
    })
  ),
  { dispatch: true }
);
```

## Debugging

### Redux DevTools
1. Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension)
2. Open DevTools in browser
3. See all actions and state changes
4. Time-travel debug

### Console Logging
```typescript
export const todoReducer = createReducer(
  initialState,
  on(TodoActions.createTodo, (state, action) => {
    console.log('Creating todo:', action);
    return state; // Then apply action
  })
);
```

## Testing

### Testing Reducer
```typescript
it('should add todo', () => {
  const action = TodoActions.createTodoSuccess({ todo: mockTodo });
  const state = todoReducer(initialState, action);
  expect(state.todos.length).toBe(1);
});
```

### Testing Selector
```typescript
it('should select all todos', () => {
  const result = selectAllTodos.projector(state);
  expect(result.length).toBe(1);
});
```

### Testing Component
```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideMockStore({ initialState })],
  });
  store = TestBed.inject(MockStore);
});

it('should dispatch action', () => {
  spyOn(store, 'dispatch');
  component.onCreateTodo('Title');
  expect(store.dispatch).toHaveBeenCalledWith(
    createTodo({ title: 'Title' })
  );
});
```

## Performance Tips

### 1. Use OnPush Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {}
```

### 2. Use Memoized Selectors
```typescript
// Good - memoized
todos$ = this.store.select(selectFilteredTodos);

// Avoid - runs on every change detection
todos$ = this.store.pipe(
  select(selectAllTodos),
  map(todos => todos.filter(...))
);
```

### 3. Unsubscribe from Long-Lived Subscriptions
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.todos$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(...);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## Common Mistakes

❌ **Mutating state in reducer**
```typescript
// WRONG
return state.todos.push(todo);

// RIGHT
return [...state.todos, todo];
```

❌ **Not memoizing selectors**
```typescript
// WRONG
todos$ = this.store.pipe(map(state => state.todos));

// RIGHT
todos$ = this.store.select(selectAllTodos);
```

❌ **Forgetting to dispatch action**
```typescript
// WRONG
this.todoService.createTodo(title);

// RIGHT
this.store.dispatch(createTodo({ title }));
```

❌ **Mutating action payload**
```typescript
// WRONG
const state = { ...state, todo: action.payload };
action.payload.title = 'Modified'; // Don't do this!

// RIGHT
on(UpdateTodo, (state, { todo }) => {
  return { ...state, todo: { ...todo } };
});
```

## Project Structure
```
src/app/
├── store/
│   ├── index.ts                    # Store config
│   ├── todo/
│   │   ├── todo.actions.ts
│   │   ├── todo.reducer.ts
│   │   ├── todo.selectors.ts
│   │   ├── todo.effects.ts
│   │   └── todo.state.ts
│   └── auth/
│       ├── auth.actions.ts
│       ├── auth.reducer.ts
│       ├── auth.selectors.ts
│       ├── auth.effects.ts
│       └── auth.state.ts
├── features/
│   └── todos/
│       └── todo-list.component.ts
└── main.ts                         # Store providers
```

## Documentation
- `NGRX_INTEGRATION.md` - Full architecture guide
- `NGRX_COMPONENT_REFACTORING.md` - Component migration
- `NGRX_TESTING.md` - Testing strategies
- `NGRX_SETUP_SUMMARY.md` - What was done

## Resources
- [NgRx Docs](https://ngrx.io)
- [Store Guide](https://ngrx.io/guide/store)
- [Effects Guide](https://ngrx.io/guide/effects)
- [Selectors Guide](https://ngrx.io/guide/store/selectors)
