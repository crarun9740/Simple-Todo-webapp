import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../../core/services/todo.service';
import { TodoFilter, TodoSort } from '../../../core/models/todo.model';

/**
 * Unit tests for TodoListComponent
 */
describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, CommonModule, FormsModule],
      providers: [TodoService],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);

    // Clear localStorage
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the todo form section when showForm is true', () => {
    component.showForm = true;
    fixture.detectChanges();

    const formSection = fixture.nativeElement.querySelector('.form-section');
    expect(formSection).toBeTruthy();
  });

  it('should display the search input', () => {
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('.search-input');
    expect(searchInput).toBeTruthy();
  });

  it('should display filter controls', () => {
    fixture.detectChanges();

    const filterSelect = fixture.nativeElement.querySelector('#filter-select');
    expect(filterSelect).toBeTruthy();
  });

  it('should display sort controls', () => {
    fixture.detectChanges();

    const sortSelect = fixture.nativeElement.querySelector('#sort-select');
    expect(sortSelect).toBeTruthy();
  });

  it('should display stats section', () => {
    fixture.detectChanges();

    const statsSection = fixture.nativeElement.querySelector('.stats-section');
    expect(statsSection).toBeTruthy();
  });

  it('should create a todo when form is submitted', () => {
    spyOn(todoService, 'createTodo');

    component.onCreateTodo({ title: 'Test Todo', description: 'Test Description' });

    expect(todoService.createTodo).toHaveBeenCalledWith('Test Todo', 'Test Description');
  });

  it('should update a todo when editing', () => {
    const todo = todoService.createTodo('Original Title');
    spyOn(todoService, 'updateTodo');

    component.editingTodo = todo;
    component.onUpdateTodo({ title: 'Updated Title' });

    expect(todoService.updateTodo).toHaveBeenCalledWith(
      todo.id,
      jasmine.objectContaining({ title: 'Updated Title' })
    );
  });

  it('should toggle a todo when checkbox is clicked', () => {
    const todo = todoService.createTodo('Test Todo');
    spyOn(todoService, 'toggleTodo');

    component.onToggleTodo(todo.id);

    expect(todoService.toggleTodo).toHaveBeenCalledWith(todo.id);
  });

  it('should delete a todo', () => {
    const todo = todoService.createTodo('Test Todo');
    spyOn(todoService, 'deleteTodo');

    component.onDeleteTodo(todo.id);

    expect(todoService.deleteTodo).toHaveBeenCalledWith(todo.id);
  });

  it('should set editing todo when edit is clicked', () => {
    const todo = todoService.createTodo('Test Todo');

    component.onEditTodo(todo);

    expect(component.editingTodo).toBe(todo);
    expect(component.showForm).toBe(false);
  });

  it('should cancel form and clear editing state', () => {
    component.showForm = true;
    component.editingTodo = todoService.createTodo('Test');

    component.onCancelForm();

    expect(component.showForm).toBe(false);
    expect(component.editingTodo).toBeNull();
  });

  it('should update search query', () => {
    spyOn(todoService, 'setSearch');

    component.onSearchChange('test query');

    expect(todoService.setSearch).toHaveBeenCalledWith('test query');
  });

  it('should set filter', () => {
    spyOn(todoService, 'setFilter');

    component.setFilter(TodoFilter.COMPLETED);

    expect(todoService.setFilter).toHaveBeenCalledWith(TodoFilter.COMPLETED);
  });

  it('should set sort', () => {
    spyOn(todoService, 'setSort');

    component.setSort(TodoSort.TITLE);

    expect(todoService.setSort).toHaveBeenCalledWith(TodoSort.TITLE);
  });

  it('should export todos', () => {
    todoService.createTodo('Todo 1');
    spyOn(todoService, 'exportTodos').and.returnValue('{"exported": true}');

    component.onExport();

    expect(component.showExportModal).toBe(true);
    expect(component.exportText).toBe('{"exported": true}');
  });

  it('should import todos from JSON', () => {
    spyOn(todoService, 'importTodos').and.returnValue([
      {
        id: '1',
        title: 'Imported',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);

    component.importText = '{"id":"1","title":"Imported"}';
    component.onImport();

    expect(component.showImportModal).toBe(false);
    expect(component.importText).toBe('');
  });

  it('should show error if import text is empty', () => {
    component.importText = '';
    component.onImport();

    expect(component.importError).toBe('Please paste JSON content');
  });

  it('should toggle all todos', () => {
    todoService.createTodo('Todo 1');
    todoService.createTodo('Todo 2');
    spyOn(todoService, 'toggleAll');

    component.onToggleAll();

    expect(todoService.toggleAll).toHaveBeenCalled();
  });

  it('should clear completed todos with confirmation', () => {
    spyOn(todoService, 'clearCompleted');
    spyOn(window, 'confirm').and.returnValue(true);

    component.onClearCompleted();

    expect(todoService.clearCompleted).toHaveBeenCalled();
  });

  it('should not clear completed todos if user cancels', () => {
    spyOn(todoService, 'clearCompleted');
    spyOn(window, 'confirm').and.returnValue(false);

    component.onClearCompleted();

    expect(todoService.clearCompleted).not.toHaveBeenCalled();
  });

  it('should display todos from observable', (done) => {
    todoService.createTodo('Test Todo 1');
    todoService.createTodo('Test Todo 2');

    component.todos$.subscribe((todos) => {
      expect(todos.length).toBe(2);
      done();
    });
  });

  it('should display stats from observable', (done) => {
    const todo1 = todoService.createTodo('Test 1');
    const todo2 = todoService.createTodo('Test 2');
    todoService.toggleTodo(todo1.id);

    component.stats$.subscribe((stats) => {
      expect(stats.total).toBe(2);
      expect(stats.completed).toBe(1);
      expect(stats.active).toBe(1);
      done();
    });
  });

  it('should copy export text to clipboard', () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    spyOn(window, 'alert');

    component.exportText = 'test export data';
    component.copyToClipboard();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test export data');
  });

  it('should download export as JSON file', () => {
    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:mock-url');
    spyOn(window.URL, 'revokeObjectURL');
    spyOn(document.body, 'appendChild');
    spyOn(document.body, 'removeChild');

    component.exportText = '[{"id":"1","title":"Test"}]';
    component.downloadExport();

    expect(window.URL.createObjectURL).toHaveBeenCalled();
  });
});
