import { createReducer, on } from '@ngrx/store';
import { TodoState, initialTodoState } from './todo.state';
import * as TodoActions from './todo.actions';

/**
 * Todo Reducer
 * Handles all todo state mutations
 */
export const todoReducer = createReducer(
  initialTodoState,

  // Load Todos
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),

  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Todo
  on(TodoActions.createTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodoActions.createTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false,
  })),

  on(TodoActions.createTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Todo
  on(TodoActions.updateTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodoActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    loading: false,
  })),

  on(TodoActions.updateTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Todo
  on(TodoActions.deleteTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
    loading: false,
  })),

  on(TodoActions.deleteTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Toggle Todo
  on(TodoActions.toggleTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodoActions.toggleTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    loading: false,
  })),

  on(TodoActions.toggleTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Toggle All Todos
  on(TodoActions.toggleAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodoActions.toggleAllSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),

  on(TodoActions.toggleAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear Completed
  on(TodoActions.clearCompleted, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodoActions.clearCompletedSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),

  on(TodoActions.clearCompletedFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Set Filter
  on(TodoActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),

  // Set Search
  on(TodoActions.setSearch, (state, { search }) => ({
    ...state,
    search,
  })),

  // Set Sort
  on(TodoActions.setSort, (state, { sort }) => ({
    ...state,
    sort,
  })),

  // Import Todos
  on(TodoActions.importTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodoActions.importTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),

  on(TodoActions.importTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
