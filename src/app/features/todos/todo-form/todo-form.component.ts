import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../../core/models/todo.model';

/**
 * TodoFormComponent: Form for creating and editing todos
 * Emits created/updated todos to parent components
 */
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  @Input() todo: Todo | null = null; // If provided, form is in edit mode
  @Output() submitted = new EventEmitter<{ title: string; description?: string }>();
  @Output() cancelled = new EventEmitter<void>();

  title = '';
  description = '';
  showErrors = false;

  ngOnInit(): void {
    if (this.todo) {
      this.title = this.todo.title;
      this.description = this.todo.description || '';
    }
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    if (!this.title.trim()) {
      this.showErrors = true;
      return;
    }

    this.submitted.emit({
      title: this.title.trim(),
      description: this.description.trim() || undefined,
    });

    this.resetForm();
  }

  onCancel(): void {
    this.cancelled.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.showErrors = false;
  }
}
