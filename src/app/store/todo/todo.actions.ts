import { createAction, props } from '@ngrx/store';
import { Todo, TodoFilter, TodoSort } from '../../core/models/todo.model';

// Load Todos
export const loadTodos = createAction('[Todo] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>()
);

// Create Todo
export const createTodo = createAction(
  '[Todo] Create Todo',
  props<{ title: string; description?: string }>()
);

export const createTodoSuccess = createAction(
  '[Todo] Create Todo Success',
  props<{ todo: Todo }>()
);

export const createTodoFailure = createAction(
  '[Todo] Create Todo Failure',
  props<{ error: string }>()
);

// Update Todo
export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ id: string; updates: Partial<Todo> }>()
);

export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>()
);

export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ error: string }>()
);

// Delete Todo
export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: string }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: string }>()
);

export const deleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{ error: string }>()
);

// Toggle Todo
export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: string }>()
);

export const toggleTodoSuccess = createAction(
  '[Todo] Toggle Todo Success',
  props<{ todo: Todo }>()
);

export const toggleTodoFailure = createAction(
  '[Todo] Toggle Todo Failure',
  props<{ error: string }>()
);

// Toggle All Todos
export const toggleAll = createAction(
  '[Todo] Toggle All',
  props<{ completed: boolean }>()
);

export const toggleAllSuccess = createAction(
  '[Todo] Toggle All Success',
  props<{ todos: Todo[] }>()
);

export const toggleAllFailure = createAction(
  '[Todo] Toggle All Failure',
  props<{ error: string }>()
);

// Clear Completed
export const clearCompleted = createAction('[Todo] Clear Completed');

export const clearCompletedSuccess = createAction(
  '[Todo] Clear Completed Success',
  props<{ todos: Todo[] }>()
);

export const clearCompletedFailure = createAction(
  '[Todo] Clear Completed Failure',
  props<{ error: string }>()
);

// Set Filter
export const setFilter = createAction(
  '[Todo] Set Filter',
  props<{ filter: TodoFilter }>()
);

// Set Search
export const setSearch = createAction(
  '[Todo] Set Search',
  props<{ search: string }>()
);

// Set Sort
export const setSort = createAction(
  '[Todo] Set Sort',
  props<{ sort: TodoSort }>()
);

// Import Todos
export const importTodos = createAction(
  '[Todo] Import Todos',
  props<{ jsonString: string }>()
);

export const importTodosSuccess = createAction(
  '[Todo] Import Todos Success',
  props<{ todos: Todo[] }>()
);

export const importTodosFailure = createAction(
  '[Todo] Import Todos Failure',
  props<{ error: string }>()
);
