import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, TodoFilter, TodoSort } from '../models/todo.model';

/**
 * TodoService: Manages todo CRUD operations, persistence, and state
 * 
 * This service uses localStorage for persistence. To add a backend API:
 * 1. Inject HttpClient
 * 2. Replace localStorage calls with HTTP requests
 * 3. Update methods to return observables from HTTP calls
 * 4. Keep the same public interface for components
 */
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly STORAGE_KEY = 'app_todos';
  
  // BehaviorSubject for reactive state management
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.todosSubject.asObservable();

  private filterSubject = new BehaviorSubject<TodoFilter>(TodoFilter.ALL);
  public filter$ = this.filterSubject.asObservable();

  private searchSubject = new BehaviorSubject<string>('');
  public search$ = this.searchSubject.asObservable();

  private sortSubject = new BehaviorSubject<TodoSort>(TodoSort.CREATED);
  public sort$ = this.sortSubject.asObservable();

  /**
   * Observable of filtered and sorted todos
   */
  public filteredTodos$: Observable<Todo[]> = this.todos$.pipe(
    map((todos) => this.applyFiltersAndSort(todos))
  );

  /**
   * Observable of todo statistics
   */
  public stats$ = this.todos$.pipe(
    map((todos) => ({
      total: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }))
  );

  constructor() {
    // Load from storage on initialization
    const loadedTodos = this.loadFromStorage();
    if (loadedTodos.length > 0) {
      this.todosSubject.next(loadedTodos);
    }
  }

  /**
   * Get all todos (unfiltered)
   */
  getTodos(): Todo[] {
    return this.todosSubject.value;
  }

  /**
   * Create a new todo
   */
  createTodo(title: string, description?: string): Todo {
    if (!title?.trim()) {
      throw new Error('Title is required');
    }

    const newTodo: Todo = {
      id: this.generateId(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const todos = [...this.todosSubject.value, newTodo];
    this.todosSubject.next(todos);
    this.saveToStorage(todos);

    return newTodo;
  }

  /**
   * Update an existing todo
   */
  updateTodo(id: string, updates: Partial<Todo>): Todo {
    const todos = this.todosSubject.value;
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const updated: Todo = {
      ...todos[index],
      ...updates,
      id: todos[index].id, // Prevent id change
      createdAt: todos[index].createdAt, // Prevent createdAt change
      updatedAt: new Date().toISOString(),
    };

    todos[index] = updated;
    this.todosSubject.next(todos);
    this.saveToStorage(todos);

    return updated;
  }

  /**
   * Toggle todo completed status
   */
  toggleTodo(id: string): void {
    const todo = this.todosSubject.value.find((t) => t.id === id);
    if (todo) {
      this.updateTodo(id, { completed: !todo.completed });
    }
  }

  /**
   * Delete a todo
   */
  deleteTodo(id: string): void {
    const todos = this.todosSubject.value.filter((t) => t.id !== id);
    this.todosSubject.next(todos);
    this.saveToStorage(todos);
  }

  /**
   * Toggle all todos complete/incomplete
   */
  toggleAll(completed: boolean): void {
    const todos = this.todosSubject.value.map((t) => ({
      ...t,
      completed,
      updatedAt: new Date().toISOString(),
    }));
    this.todosSubject.next(todos);
    this.saveToStorage(todos);
  }

  /**
   * Clear all completed todos
   */
  clearCompleted(): void {
    const todos = this.todosSubject.value.filter((t) => !t.completed);
    this.todosSubject.next(todos);
    this.saveToStorage(todos);
  }

  /**
   * Set active filter
   */
  setFilter(filter: TodoFilter): void {
    this.filterSubject.next(filter);
  }

  /**
   * Set search query
   */
  setSearch(query: string): void {
    this.searchSubject.next(query);
  }

  /**
   * Set sort option
   */
  setSort(sort: TodoSort): void {
    this.sortSubject.next(sort);
  }

  /**
   * Export todos as JSON
   */
  exportTodos(): string {
    return JSON.stringify(this.todosSubject.value, null, 2);
  }

  /**
   * Import todos from JSON
   */
  importTodos(jsonString: string): Todo[] {
    try {
      const imported = JSON.parse(jsonString);

      // Validate structure
      if (!Array.isArray(imported)) {
        throw new Error('Import must be an array of todos');
      }

      // Validate each todo has required fields
      const validated = imported.map((item: any) => {
        if (!item.id || !item.title) {
          throw new Error('Each todo must have id and title');
        }
        return {
          id: String(item.id),
          title: String(item.title),
          description: item.description ? String(item.description) : undefined,
          completed: Boolean(item.completed),
          createdAt: item.createdAt ? String(item.createdAt) : new Date().toISOString(),
          updatedAt: item.updatedAt ? String(item.updatedAt) : undefined,
        };
      });

      this.todosSubject.next(validated);
      this.saveToStorage(validated);

      return validated;
    } catch (error) {
      throw new Error(`Failed to import todos: ${(error as Error).message}`);
    }
  }

  /**
   * Private method: Apply filter and sort to todos
   */
  private applyFiltersAndSort(todos: Todo[]): Todo[] {
    const filter = this.filterSubject.value;
    const search = this.searchSubject.value.toLowerCase();
    const sort = this.sortSubject.value;

    // Apply filter
    let filtered = todos;
    if (filter === TodoFilter.ACTIVE) {
      filtered = todos.filter((t) => !t.completed);
    } else if (filter === TodoFilter.COMPLETED) {
      filtered = todos.filter((t) => t.completed);
    }

    // Apply search
    if (search) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(search) ||
          (t.description && t.description.toLowerCase().includes(search))
      );
    }

    // Apply sort
    const sorted = [...filtered];
    if (sort === TodoSort.TITLE) {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === TodoSort.STATUS) {
      sorted.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
    } else {
      // Default: by created date (newest first)
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return sorted;
  }

  /**
   * Private method: Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Private method: Load todos from localStorage
   */
  loadFromStorage(): Todo[] {
    try {
      // Check if localStorage is available (not SSR environment)
      if (typeof localStorage === 'undefined') {
        return [];
      }
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load todos from storage:', error);
      return [];
    }
  }

  /**
   * Private method: Save todos to localStorage
   */
  saveToStorage(todos: Todo[]): void {
    try {
      // Check if localStorage is available (not SSR environment)
      if (typeof localStorage === 'undefined') {
        return;
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to storage:', error);
    }
  }

  /**
   * Helper: Get todos synchronously for NgRx effects
   */
  getTodosSync(): Todo[] {
    return this.todosSubject.value;
  }

  /**
   * Helper: Create todo item (without side effects)
   */
  createTodoItem(title: string, description?: string): Todo {
    if (!title?.trim()) {
      throw new Error('Title is required');
    }

    return {
      id: this.generateId(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Helper: Import todos synchronously for NgRx effects
   */
  importTodosSync(jsonString: string): Todo[] {
    try {
      const data = JSON.parse(jsonString);

      if (!Array.isArray(data)) {
        throw new Error('Imported data must be an array');
      }

      const validated: Todo[] = data.map((item: any) => {
        if (!item.id || !item.title) {
          throw new Error('Each todo must have id and title');
        }

        return {
          id: String(item.id),
          title: String(item.title),
          description: item.description ? String(item.description) : undefined,
          completed: Boolean(item.completed),
          createdAt: item.createdAt ? String(item.createdAt) : new Date().toISOString(),
          updatedAt: item.updatedAt ? String(item.updatedAt) : undefined,
        };
      });

      return validated;
    } catch (error) {
      throw new Error(`Failed to import todos: ${(error as Error).message}`);
    }
  }
}
