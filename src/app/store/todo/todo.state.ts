import { Todo, TodoFilter, TodoSort } from '../../core/models/todo.model';

/**
 * Todo State
 * Manages all todo-related state in NgRx
 */
export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  search: string;
  sort: TodoSort;
  loading: boolean;
  error: string | null;
}

export const initialTodoState: TodoState = {
  todos: [],
  filter: TodoFilter.ALL,
  search: '',
  sort: TodoSort.CREATED,
  loading: false,
  error: null,
};
