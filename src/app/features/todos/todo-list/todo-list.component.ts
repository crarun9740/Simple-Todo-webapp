import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService } from '../../../core/services/todo.service';
import { Todo, TodoFilter, TodoSort } from '../../../core/models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

/**
 * TodoListComponent: Main todo list page
 * Handles displaying, filtering, and managing todos
 */
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  stats$!: Observable<any>;
  filter$!: Observable<TodoFilter>;
  search$!: Observable<string>;
  sort$!: Observable<TodoSort>;

  TodoFilter = TodoFilter;
  TodoSort = TodoSort;

  showForm = false;
  editingTodo: Todo | null = null;
  searchQuery = '';
  activeFilter = TodoFilter.ALL;
  activeSort = TodoSort.CREATED;
  exportText = '';
  showExportModal = false;
  showImportModal = false;
  importText = '';
  importError = '';

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.filteredTodos$;
    this.stats$ = this.todoService.stats$;
    this.filter$ = this.todoService.filter$;
    this.search$ = this.todoService.search$;
    this.sort$ = this.todoService.sort$;
  }

  ngOnInit(): void {
    this.todoService.filter$.subscribe((f) => (this.activeFilter = f));
    this.todoService.search$.subscribe((s) => (this.searchQuery = s));
    this.todoService.sort$.subscribe((s) => (this.activeSort = s));
  }

  /**
   * Create a new todo
   */
  onCreateTodo(data: { title: string; description?: string }): void {
    try {
      this.todoService.createTodo(data.title, data.description);
      this.showForm = false;
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  }

  /**
   * Update an existing todo
   */
  onUpdateTodo(data: { title: string; description?: string }): void {
    if (!this.editingTodo) return;

    try {
      this.todoService.updateTodo(this.editingTodo.id, {
        title: data.title,
        description: data.description,
      });
      this.editingTodo = null;
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  }

  /**
   * Toggle todo completion
   */
  onToggleTodo(id: string): void {
    this.todoService.toggleTodo(id);
  }

  /**
   * Edit a todo
   */
  onEditTodo(todo: Todo): void {
    this.editingTodo = todo;
    this.showForm = false; // Hide create form
  }

  /**
   * Delete a todo
   */
  onDeleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  /**
   * Cancel form
   */
  onCancelForm(): void {
    this.showForm = false;
    this.editingTodo = null;
  }

  /**
   * Update search query
   */
  onSearchChange(query: string): void {
    this.todoService.setSearch(query);
  }

  /**
   * Change filter
   */
  setFilter(filter: TodoFilter): void {
    this.todoService.setFilter(filter);
  }

  /**
   * Change sort
   */
  setSort(sort: TodoSort): void {
    this.todoService.setSort(sort);
  }

  /**
   * Toggle all todos
   */
  onToggleAll(): void {
    const allCompleted = (this.todoService.getTodos() || []).every((t) => t.completed);
    this.todoService.toggleAll(!allCompleted);
  }

  /**
   * Clear completed todos
   */
  onClearCompleted(): void {
    if (confirm('Are you sure you want to clear all completed todos?')) {
      this.todoService.clearCompleted();
    }
  }

  /**
   * Export todos as JSON
   */
  onExport(): void {
    this.exportText = this.todoService.exportTodos();
    this.showExportModal = true;
  }

  /**
   * Copy export text to clipboard
   */
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.exportText).then(() => {
      alert('Todos exported to clipboard!');
    });
  }

  /**
   * Download export as file
   */
  downloadExport(): void {
    const blob = new Blob([this.exportText], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Handle import
   */
  onImport(): void {
    if (!this.importText.trim()) {
      this.importError = 'Please paste JSON content';
      return;
    }

    try {
      this.todoService.importTodos(this.importText);
      this.importText = '';
      this.importError = '';
      this.showImportModal = false;
      alert('Todos imported successfully!');
    } catch (error) {
      this.importError = (error as Error).message;
    }
  }

  /**
   * Trigger import from file
   */
  onImportFromFile(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        this.todoService.importTodos(content);
        this.importText = '';
        this.importError = '';
        this.showImportModal = false;
        alert('Todos imported successfully!');
      } catch (error) {
        this.importError = (error as Error).message;
      }
    };
    reader.readAsText(file);
  }
}
