import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../core/models/todo.model';

/**
 * TodoItemComponent: Renders a single todo item with actions
 * Emits events for toggle, edit, and delete actions
 */
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggled = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();

  showDeleteConfirm = false;

  onToggle(): void {
    this.toggled.emit(this.todo.id);
  }

  onEdit(): void {
    this.edit.emit(this.todo);
  }

  onDeleteClick(): void {
    this.showDeleteConfirm = true;
  }

  onConfirmDelete(): void {
    this.delete.emit(this.todo.id);
    this.showDeleteConfirm = false;
  }

  onCancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
