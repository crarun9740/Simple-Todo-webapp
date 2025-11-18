# NgRx Testing Guide

This guide covers testing NgRx stores, effects, reducers, and components.

## Testing Reducers

Reducers are pure functions, making them easy to test.

### Example: Todo Reducer Tests

```typescript
import { todoReducer } from './todo.reducer';
import * as TodoActions from './todo.actions';
import { initialTodoState, TodoState } from './todo.state';
import { Todo } from '../../core/models/todo.model';

describe('TodoReducer', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  describe('createTodoSuccess', () => {
    it('should add todo to state', () => {
      const action = TodoActions.createTodoSuccess({ todo: mockTodo });
      const state = todoReducer(initialTodoState, action);

      expect(state.todos.length).toBe(1);
      expect(state.todos[0]).toEqual(mockTodo);
      expect(state.loading).toBe(false);
    });
  });

  describe('deleteTodoSuccess', () => {
    it('should remove todo from state', () => {
      const initialState: TodoState = {
        ...initialTodoState,
        todos: [mockTodo],
      };

      const action = TodoActions.deleteTodoSuccess({ id: '1' });
      const state = todoReducer(initialState, action);

      expect(state.todos.length).toBe(0);
    });
  });

  describe('setFilter', () => {
    it('should update filter in state', () => {
      const action = TodoActions.setFilter({ filter: 'ACTIVE' });
      const state = todoReducer(initialTodoState, action);

      expect(state.filter).toBe('ACTIVE');
    });
  });
});
```

## Testing Selectors

Use memoized selectors to test state queries.

### Example: Todo Selectors Tests

```typescript
import {
  selectAllTodos,
  selectFilteredTodos,
  selectStats,
  selectFilter,
} from './todo.selectors';
import { Todo, TodoFilter } from '../../core/models/todo.model';
import { TodoState } from './todo.state';

describe('TodoSelectors', () => {
  const mockState: TodoState = {
    todos: [
      {
        id: '1',
        title: 'Buy milk',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Finish project',
        completed: true,
        createdAt: new Date().toISOString(),
      },
    ],
    filter: TodoFilter.ALL,
    search: '',
    sort: 'CREATED',
    loading: false,
    error: null,
  };

  describe('selectAllTodos', () => {
    it('should return all todos', () => {
      const result = selectAllTodos.projector(mockState);
      expect(result.length).toBe(2);
    });
  });

  describe('selectFilteredTodos', () => {
    it('should filter todos by ACTIVE', () => {
      const result = selectFilteredTodos.projector(
        mockState.todos,
        TodoFilter.ACTIVE,
        '',
        'CREATED'
      );
      expect(result.length).toBe(1);
      expect(result[0].completed).toBe(false);
    });

    it('should filter todos by COMPLETED', () => {
      const result = selectFilteredTodos.projector(
        mockState.todos,
        TodoFilter.COMPLETED,
        '',
        'CREATED'
      );
      expect(result.length).toBe(1);
      expect(result[0].completed).toBe(true);
    });

    it('should search todos by title', () => {
      const result = selectFilteredTodos.projector(
        mockState.todos,
        TodoFilter.ALL,
        'project',
        'CREATED'
      );
      expect(result.length).toBe(1);
      expect(result[0].title).toContain('project');
    });
  });

  describe('selectStats', () => {
    it('should calculate stats correctly', () => {
      const result = selectStats.projector(mockState.todos);
      expect(result).toEqual({
        total: 2,
        active: 1,
        completed: 1,
      });
    });
  });
});
```

## Testing Effects

Effects handle side effects and should be tested with `TestBed` and action matchers.

### Example: Todo Effects Tests

```typescript
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { hot, cold } from 'jest-marbles';
import { TodoEffects } from './todo.effects';
import { TodoService } from '../../core/services/todo.service';
import * as TodoActions from './todo.actions';
import { Todo } from '../../core/models/todo.model';

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;
  let todoService: jasmine.SpyObj<TodoService>;

  const mockTodo: Todo = {
    id: '1',
    title: 'Test',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TodoService', [
      'createTodoItem',
      'getTodosSync',
      'saveToStorage',
      'loadFromStorage',
    ]);

    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        { provide: TodoService, useValue: spy },
      ],
    });

    effects = TestBed.inject(TodoEffects);
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  describe('createTodo$', () => {
    it('should dispatch createTodoSuccess on success', () => {
      const action = TodoActions.createTodo({
        title: 'New Todo',
        description: 'Description',
      });

      todoService.createTodoItem.and.returnValue(mockTodo);
      todoService.getTodosSync.and.returnValue([]);
      todoService.saveToStorage.and.returnValue(undefined);

      const completion = TodoActions.createTodoSuccess({ todo: mockTodo });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.createTodo$).toBeObservable(expected);
    });

    it('should dispatch createTodoFailure on error', () => {
      const action = TodoActions.createTodo({ title: '' });
      todoService.createTodoItem.and.throwError('Error');

      const completion = TodoActions.createTodoFailure({
        error: 'Failed to create todo',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.createTodo$).toBeObservable(expected);
    });
  });
});
```

## Testing Components with NgRx (MockStore)

Use `MockStore` to test components without real store.

### Example: Todo List Component Tests

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TodoListComponent } from './todo-list.component';
import * as TodoActions from '../../store/todo/todo.actions';
import {
  selectFilteredTodos,
  selectStats,
} from '../../store/todo/todo.selectors';
import { TodoFilter } from '../../core/models/todo.model';

describe('TodoListComponent with NgRx', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore;

  const initialState = {
    todo: {
      todos: [
        {
          id: '1',
          title: 'Test Todo',
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
      filter: TodoFilter.ALL,
      search: '',
      sort: 'CREATED',
      loading: false,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Todo Actions', () => {
    it('should dispatch createTodo action', () => {
      spyOn(store, 'dispatch');
      component.onCreateTodo('New Todo', 'Description');

      expect(store.dispatch).toHaveBeenCalledWith(
        TodoActions.createTodo({
          title: 'New Todo',
          description: 'Description',
        })
      );
    });

    it('should dispatch toggleTodo action', () => {
      spyOn(store, 'dispatch');
      component.onToggleTodo('1');

      expect(store.dispatch).toHaveBeenCalledWith(
        TodoActions.toggleTodo({ id: '1' })
      );
    });

    it('should dispatch setFilter action', () => {
      spyOn(store, 'dispatch');
      component.onSetFilter(TodoFilter.ACTIVE);

      expect(store.dispatch).toHaveBeenCalledWith(
        TodoActions.setFilter({ filter: TodoFilter.ACTIVE })
      );
    });
  });

  describe('Selectors', () => {
    it('should select filtered todos', (done) => {
      component.filteredTodos$.subscribe((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].title).toBe('Test Todo');
        done();
      });
    });

    it('should select stats', (done) => {
      component.stats$.subscribe((stats) => {
        expect(stats.total).toBe(1);
        expect(stats.active).toBe(1);
        expect(stats.completed).toBe(0);
        done();
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message', (done) => {
      store.setState({
        todo: {
          ...initialState.todo,
          error: 'Failed to load todos',
        },
      });

      component.error$.subscribe((error) => {
        expect(error).toBe('Failed to load todos');
        done();
      });
    });
  });
});
```

## Testing Tips

### 1. Use `provideMockStore` for Component Tests
```typescript
TestBed.configureTestingModule({
  providers: [provideMockStore({ initialState })],
});
```

### 2. Spy on Store Dispatch
```typescript
spyOn(store, 'dispatch');
component.onCreateTodo('Title');
expect(store.dispatch).toHaveBeenCalledWith(TodoActions.createTodo(...));
```

### 3. Test Selectors with Projector
```typescript
const result = selectFilteredTodos.projector(todos, filter, search, sort);
expect(result.length).toBe(2);
```

### 4. Test Effects with Marbles
```typescript
actions$ = hot('-a', { a: action });
const expected = cold('-b', { b: completion });
expect(effects.myEffect$).toBeObservable(expected);
```

### 5. Mock Services
```typescript
const spy = jasmine.createSpyObj('TodoService', ['createTodo']);
spy.createTodo.and.returnValue(mockTodo);
TestBed.configureTestingModule({
  providers: [{ provide: TodoService, useValue: spy }],
});
```

## Running Tests

```bash
npm test                          # Run all tests
npm test -- --code-coverage      # With coverage
npm test -- --watch=false        # Single run
```

## Coverage Goals

- ✅ Reducers: 100% (pure functions)
- ✅ Selectors: 100% (memoized queries)
- ✅ Effects: 90%+ (side effects)
- ✅ Components: 80%+ (UI interactions)

## Resources

- [NgRx Testing Documentation](https://ngrx.io/guide/store/testing)
- [Testing Effects](https://ngrx.io/guide/effects/testing)
- [MockStore API](https://ngrx.io/guide/store/testing/mock-store)
- [Jasmine Marbles](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/testing/marble-testing.md)
