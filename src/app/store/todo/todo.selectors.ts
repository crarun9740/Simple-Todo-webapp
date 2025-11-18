import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';
import { Todo, TodoFilter, TodoSort } from '../../core/models/todo.model';

/**
 * Todo Selectors
 * Memoized selectors for efficient state queries
 */

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectAllTodos = createSelector(selectTodoState, (state) => state.todos);

export const selectFilter = createSelector(selectTodoState, (state) => state.filter);

export const selectSearch = createSelector(selectTodoState, (state) => state.search);

export const selectSort = createSelector(selectTodoState, (state) => state.sort);

export const selectLoading = createSelector(selectTodoState, (state) => state.loading);

export const selectError = createSelector(selectTodoState, (state) => state.error);

/**
 * Filtered Todos Selector
 * Applies filter, search, and sort to todos
 */
export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectFilter,
  selectSearch,
  selectSort,
  (todos: Todo[], filter: TodoFilter, search: string, sort: TodoSort): Todo[] => {
    // Apply filter
    let filtered = todos;
    if (filter === TodoFilter.ACTIVE) {
      filtered = filtered.filter((t) => !t.completed);
    } else if (filter === TodoFilter.COMPLETED) {
      filtered = filtered.filter((t) => t.completed);
    }

    // Apply search
    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.description && t.description.toLowerCase().includes(query))
      );
    }

    // Apply sort
    const sorted = [...filtered];
    if (sort === TodoSort.TITLE) {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === TodoSort.STATUS) {
      sorted.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    } else if (sort === TodoSort.CREATED) {
      sorted.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeB - timeA;
      });
    }

    return sorted;
  }
);

/**
 * Stats Selector
 * Calculates todo statistics
 */
export interface TodoStats {
  total: number;
  active: number;
  completed: number;
}

export const selectStats = createSelector(
  selectAllTodos,
  (todos: Todo[]): TodoStats => ({
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  })
);
