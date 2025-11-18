import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo, TodoFilter, TodoSort } from '../models/todo.model';

/**
 * Unit tests for TodoService
 */
describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('CRUD Operations', () => {
    it('should create a new todo', () => {
      const todo = service.createTodo('Test Todo', 'Test Description');

      expect(todo.id).toBeDefined();
      expect(todo.title).toBe('Test Todo');
      expect(todo.description).toBe('Test Description');
      expect(todo.completed).toBe(false);
      expect(todo.createdAt).toBeDefined();
    });

    it('should throw error if title is empty', () => {
      expect(() => service.createTodo('', 'Description')).toThrowError('Title is required');
      expect(() => service.createTodo('   ', 'Description')).toThrowError('Title is required');
    });

    it('should get all todos', () => {
      service.createTodo('Todo 1');
      service.createTodo('Todo 2');

      const todos = service.getTodos();
      expect(todos.length).toBe(2);
    });

    it('should update a todo', () => {
      const todo = service.createTodo('Original Title');
      service.updateTodo(todo.id, { title: 'Updated Title' });

      const updated = service.getTodos()[0];
      expect(updated.title).toBe('Updated Title');
      expect(updated.updatedAt).toBeDefined();
    });

    it('should delete a todo', () => {
      const todo = service.createTodo('Test Todo');
      service.deleteTodo(todo.id);

      expect(service.getTodos().length).toBe(0);
    });

    it('should throw error when updating non-existent todo', () => {
      expect(() => service.updateTodo('non-existent-id', { title: 'New' })).toThrowError();
    });
  });

  describe('Toggle Operations', () => {
    it('should toggle todo completion status', () => {
      const todo = service.createTodo('Test Todo');
      expect(todo.completed).toBe(false);

      service.toggleTodo(todo.id);
      const toggled = service.getTodos()[0];
      expect(toggled.completed).toBe(true);

      service.toggleTodo(todo.id);
      const toggled2 = service.getTodos()[0];
      expect(toggled2.completed).toBe(false);
    });

    it('should toggle all todos', () => {
      service.createTodo('Todo 1');
      service.createTodo('Todo 2');
      service.createTodo('Todo 3');

      service.toggleAll(true);
      const todos = service.getTodos();
      expect(todos.every((t) => t.completed)).toBe(true);

      service.toggleAll(false);
      const todos2 = service.getTodos();
      expect(todos2.every((t) => !t.completed)).toBe(true);
    });
  });

  describe('Clear Operations', () => {
    it('should clear completed todos', () => {
      const todo1 = service.createTodo('Todo 1');
      const todo2 = service.createTodo('Todo 2');
      const todo3 = service.createTodo('Todo 3');

      service.toggleTodo(todo1.id);
      service.toggleTodo(todo2.id);

      service.clearCompleted();
      const remaining = service.getTodos();

      expect(remaining.length).toBe(1);
      expect(remaining[0].id).toBe(todo3.id);
    });
  });

  describe('Filtering', () => {
    beforeEach(() => {
      service.createTodo('Active Todo 1');
      const completed1 = service.createTodo('Completed Todo 1');
      service.toggleTodo(completed1.id);

      service.createTodo('Active Todo 2');
      const completed2 = service.createTodo('Completed Todo 2');
      service.toggleTodo(completed2.id);
    });

    it('should filter by status', (done) => {
      service.setFilter(TodoFilter.ACTIVE);
      service.filteredTodos$.subscribe((todos) => {
        expect(todos.length).toBe(2);
        expect(todos.every((t) => !t.completed)).toBe(true);
        done();
      });
    });

    it('should filter completed todos', (done) => {
      service.setFilter(TodoFilter.COMPLETED);
      service.filteredTodos$.subscribe((todos) => {
        expect(todos.length).toBe(2);
        expect(todos.every((t) => t.completed)).toBe(true);
        done();
      });
    });

    it('should show all todos with ALL filter', (done) => {
      service.setFilter(TodoFilter.ALL);
      service.filteredTodos$.subscribe((todos) => {
        expect(todos.length).toBe(4);
        done();
      });
    });
  });

  describe('Search', () => {
    beforeEach(() => {
      service.createTodo('Buy Groceries', 'Need milk and bread');
      service.createTodo('Call Mom', 'Birthday wishes');
      service.createTodo('Fix Bug', 'Login page issue');
    });

    it('should search by title', (done) => {
      service.setSearch('buy');
      service.filteredTodos$.subscribe((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].title).toContain('Buy');
        done();
      });
    });

    it('should search by description', (done) => {
      service.setSearch('bread');
      service.filteredTodos$.subscribe((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].description).toContain('bread');
        done();
      });
    });

    it('should be case-insensitive', (done) => {
      service.setSearch('CALL');
      service.filteredTodos$.subscribe((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].title.toLowerCase()).toContain('call');
        done();
      });
    });
  });

  describe('Sorting', () => {
    beforeEach(() => {
      service.createTodo('Zebra Todo');
      service.createTodo('Apple Todo');
      service.createTodo('Banana Todo');
    });

    it('should sort by title', (done) => {
      service.setSort(TodoSort.TITLE);
      service.filteredTodos$.subscribe((todos) => {
        expect(todos[0].title).toContain('Apple');
        expect(todos[1].title).toContain('Banana');
        expect(todos[2].title).toContain('Zebra');
        done();
      });
    });

    it('should sort by creation date (newest first)', (done) => {
      service.setSort(TodoSort.CREATED);
      service.filteredTodos$.subscribe((todos) => {
        expect(todos[0].title).toContain('Banana');
        expect(todos[2].title).toContain('Zebra');
        done();
      });
    });
  });

  describe('Stats Observable', () => {
    it('should emit correct stats', (done) => {
      const todo1 = service.createTodo('Todo 1');
      const todo2 = service.createTodo('Todo 2');
      const todo3 = service.createTodo('Todo 3');

      service.toggleTodo(todo1.id);
      service.toggleTodo(todo2.id);

      service.stats$.subscribe((stats) => {
        expect(stats.total).toBe(3);
        expect(stats.completed).toBe(2);
        expect(stats.active).toBe(1);
        done();
      });
    });
  });

  describe('Import/Export', () => {
    it('should export todos as JSON', () => {
      service.createTodo('Todo 1', 'Description 1');
      service.createTodo('Todo 2', 'Description 2');

      const json = service.exportTodos();
      const parsed = JSON.parse(json);

      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBe(2);
    });

    it('should import todos from JSON', () => {
      const todos: Todo[] = [
        {
          id: 'test-1',
          title: 'Imported Todo 1',
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'test-2',
          title: 'Imported Todo 2',
          description: 'With description',
          completed: true,
          createdAt: new Date().toISOString(),
        },
      ];

      const json = JSON.stringify(todos);
      const imported = service.importTodos(json);

      expect(imported.length).toBe(2);
      expect(imported[0].title).toBe('Imported Todo 1');
      expect(imported[1].completed).toBe(true);
    });

    it('should throw error on invalid JSON', () => {
      expect(() => service.importTodos('invalid json')).toThrowError();
    });

    it('should throw error if import is not an array', () => {
      expect(() => service.importTodos('{"not": "array"}')).toThrowError('must be an array');
    });

    it('should validate required fields on import', () => {
      const invalid = JSON.stringify([{ title: 'No ID' }]);
      expect(() => service.importTodos(invalid)).toThrowError();
    });
  });

  describe('Persistence', () => {
    it('should save to localStorage', () => {
      service.createTodo('Test Todo');

      const stored = localStorage.getItem('app_todos');
      expect(stored).toBeDefined();

      const parsed = JSON.parse(stored!);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBe(1);
    });

    it('should load from localStorage on init', () => {
      const todos: Todo[] = [
        {
          id: 'test-1',
          title: 'Persisted Todo',
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ];

      localStorage.setItem('app_todos', JSON.stringify(todos));

      const newService = new TodoService();
      const loaded = newService.getTodos();

      expect(loaded.length).toBe(1);
      expect(loaded[0].title).toBe('Persisted Todo');
    });

    it('should handle corrupted localStorage gracefully', () => {
      localStorage.setItem('app_todos', 'corrupted data');

      const newService = new TodoService();
      const todos = newService.getTodos();

      expect(Array.isArray(todos)).toBe(true);
      expect(todos.length).toBe(0);
    });
  });
});
