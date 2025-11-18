# NgRx Architecture Diagram & Flow

## Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER INTERACTION                        │
│                                                                   │
│  User clicks "Create Todo" button in TodoListComponent           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                          COMPONENT                               │
│                                                                   │
│  this.store.dispatch(TodoActions.createTodo({                   │
│    title: 'Buy milk',                                            │
│    description: 'From the grocery store'                         │
│  }))                                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ACTION DISPATCHED                             │
│                                                                   │
│  {                                                               │
│    type: '[Todo] Create Todo',                                  │
│    payload: {                                                    │
│      title: 'Buy milk',                                          │
│      description: 'From the grocery store'                       │
│    }                                                              │
│  }                                                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
        ┌──────────────────┐  ┌──────────────────┐
        │    REDUCER       │  │     EFFECT       │
        │                  │  │                  │
        │  Pure Function   │  │  Side Effect     │
        │  Immutable       │  │  (localStorage)  │
        │  State Update    │  │                  │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 ▼                     ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ NEW STATE        │  │ localStorage.set │
        │                  │  │                  │
        │ {                │  │ Save todos to    │
        │   todos: [       │  │ browser storage  │
        │     ...existing, │  │                  │
        │     {new todo}   │  │ Dispatch:        │
        │   ],             │  │ createTodoSuccess│
        │   loading: false │  │                  │
        │ }                │  │                  │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 └────────────┬────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        STORE                                     │
│                                                                   │
│  Updated TodoState:                                              │
│  {                                                               │
│    todos: [{ id, title, completed, ... }, ...],                │
│    filter: 'ALL',                                               │
│    search: '',                                                  │
│    sort: 'CREATED',                                             │
│    loading: false,                                              │
│    error: null                                                  │
│  }                                                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
        ┌──────────────────┐  ┌──────────────────┐
        │   SELECTORS      │  │   OTHER APPS     │
        │   (memoized)     │  │   (Redux DevTools)
        │                  │  │                  │
        │ selectFiltered   │  │ See all actions  │
        │ selectStats      │  │ Time-travel debug
        │ selectLoading    │  │                  │
        └────────┬─────────┘  └──────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OBSERVABLES                                 │
│                                                                   │
│  filteredTodos$: Observable<Todo[]>                             │
│  stats$: Observable<{ total, active, completed }>              │
│  loading$: Observable<boolean>                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      TEMPLATE                                    │
│                                                                   │
│  <div *ngFor="let todo of filteredTodos$ | async">             │
│    {{ todo.title }}                                              │
│  </div>                                                           │
│                                                                   │
│  <div>{{ (stats$ | async)?.total }} total todos</div>          │
└─────────────────────────────────────────────────────────────────┘
```

## State Tree

```
Store
├── todo (feature)
│   ├── todos: Todo[]
│   │   ├── id: string
│   │   ├── title: string
│   │   ├── description?: string
│   │   ├── completed: boolean
│   │   └── createdAt: string
│   ├── filter: 'ALL' | 'ACTIVE' | 'COMPLETED'
│   ├── search: string
│   ├── sort: 'CREATED' | 'TITLE' | 'STATUS'
│   ├── loading: boolean
│   └── error: string | null
│
└── auth (feature)
    ├── isAuthenticated: boolean
    ├── loading: boolean
    └── error: string | null
```

## Action Categories

```
┌─────────────────────────────────────────┐
│           ACTION CATEGORIES             │
├─────────────────────────────────────────┤
│                                         │
│  CRUD Operations                        │
│  ├── [Todo] Load Todos                 │
│  ├── [Todo] Create Todo                │
│  ├── [Todo] Update Todo                │
│  ├── [Todo] Delete Todo                │
│  └── [Todo] Toggle Todo                │
│                                         │
│  Filtering & Sorting                    │
│  ├── [Todo] Set Filter                 │
│  ├── [Todo] Set Search                 │
│  ├── [Todo] Set Sort                   │
│  └── [Todo] Toggle All                 │
│                                         │
│  Data Management                        │
│  ├── [Todo] Clear Completed            │
│  ├── [Todo] Import Todos               │
│  └── [Todo] Export Todos               │
│                                         │
│  Result Actions                         │
│  ├── [Todo] * Success                  │
│  └── [Todo] * Failure                  │
│                                         │
│  Authentication                         │
│  ├── [Auth] Login                      │
│  └── [Auth] Logout                     │
│                                         │
└─────────────────────────────────────────┘
```

## Selector Hierarchy

```
Root Selector
└── selectTodoState
    ├── selectAllTodos
    │   ├── selectFilteredTodos (memoized)
    │   │   ├── Filter
    │   │   ├── Search
    │   │   └── Sort
    │   └── selectStats (memoized)
    │       └── Calculate { total, active, completed }
    │
    ├── selectFilter
    ├── selectSearch
    ├── selectSort
    ├── selectLoading
    └── selectError
```

## Effect Flow

```
Action Dispatched
        │
        ▼
  Effect Observer
  (ofType)
        │
        ▼
  Operator Chain
  ├── map/switchMap/mergeMap
  ├── filter/catch
  └── Side Effects (API, localStorage)
        │
        ▼
  New Action Dispatched
  (Success/Failure)
        │
        ▼
  Reducer Processes
  New Action
        │
        ▼
  State Updated
        │
        ▼
  Selectors Re-evaluate
        │
        ▼
  Components Re-render
```

## Component Integration Pattern

```
Template
    │
    ├─→ *ngFor="item of obs$ | async"   (async pipe)
    └─→ (click)="handler()"              (event binding)
        │
        ▼
    Component Class
    │
    ├─ Store.select() → Observable      (read from store)
    └─ Store.dispatch() → Action        (write to store)
        │
        ▼
    Store
    │
    ├─ Reducer                          (update state)
    ├─ Effect                           (side effects)
    └─ Selector                         (memoize & query)
        │
        ▼
    Back to Template                    (observable emits)
```

## Redux DevTools Inspection

```
Time-Travel Debugging
│
├─ Action Log
│  ├─ [1] [Todo] Create Todo
│  ├─ [2] [Todo] Create Todo Success
│  ├─ [3] [Todo] Toggle Todo
│  ├─ [4] [Todo] Toggle Todo Success
│  └─ [5] [Todo] Set Filter
│
├─ State Inspector
│  ├─ Diff: Show what changed
│  ├─ Diff Options: Deep/Full/Raw
│  └─ Copy: Export state as JSON
│
├─ Action Inspector
│  ├─ Type: [Todo] Create Todo
│  └─ Payload: { title: '...', description: '...' }
│
└─ Timeline Controls
   ├─ Play: Auto-replay actions
   ├─ Pause: Stop playback
   ├─ Step: Go to next action
   └─ Skip/Jump: Jump to action
```

## Unidirectional Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                 UNIDIRECTIONAL FLOW                      │
│                                                          │
│  Component              Store               Selectors    │
│  (UI Layer)          (State Layer)        (Query Layer)  │
│                                                          │
│      │                                         │          │
│      ├──dispatch(action)──→ Reducer ──→ Update State   │
│      │                        │             │            │
│      │                        └─→ Effects ─→ Side FX    │
│      │                                       │            │
│      └────────────── Select ←──────────────┘            │
│           (read)              Emit new value            │
│                                                          │
│  One-way data binding                                   │
│  Easy to understand                                     │
│  Easy to test                                           │
│  Easy to debug                                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Comparison: Before & After

### Before (Service-Based)
```
Component
├── Service A
│   └── BehaviorSubject
├── Service B
│   └── BehaviorSubject
└── Service C
    └── BehaviorSubject
    
Problems:
✗ Multiple state sources
✗ Hard to debug
✗ No clear data flow
✗ Difficult to test
```

### After (NgRx)
```
Component
    │
    ▼
   Store (Single Source of Truth)
├── Todo Reducer
├── Auth Reducer
    │
    ├── Todo Effects
    └── Auth Effects
    
Benefits:
✓ Centralized state
✓ Easy to debug (Redux DevTools)
✓ Clear unidirectional flow
✓ Simple to test
```

## Performance Flow

```
Selector Called
    │
    ▼
Check Memoization Cache
    │
    ├─ Input Changed? ──YES──→ Recompute
    │                              │
    └─ No Change ──NO──→ Return Cached Result
                              │
                              ▼
                         Emit Same Reference
                              │
                              ▼
                    Change Detection Skipped
                    (if using OnPush)
                              │
                              ▼
                        No Unnecessary Renders
```

## Debugging Checklist

```
✓ Check Redux DevTools
  - See action dispatched?
  - State updated correctly?
  - New action in queue?

✓ Console Logs
  - Action received in reducer?
  - Effect triggered?
  - Side effect completed?

✓ Selector Performance
  - Memoization working?
  - Selector called multiple times?

✓ Component Binding
  - Observable emitting?
  - Async pipe present?
  - Template rendering?

✓ Error Handling
  - Error action dispatched?
  - Error state updated?
  - Error message displayed?
```
