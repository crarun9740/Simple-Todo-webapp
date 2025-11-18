import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { TodoService } from '../../core/services/todo.service';
import { Todo } from '../../core/models/todo.model';

/**
 * Todo Effects
 * Handles side effects for todo operations (e.g., localStorage persistence)
 */
@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      map(() => {
        try {
          const todos = this.todoService.loadFromStorage();
          return TodoActions.loadTodosSuccess({ todos });
        } catch (error) {
          return TodoActions.loadTodosFailure({
            error: 'Failed to load todos from storage',
          });
        }
      })
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createTodo),
      map(({ title, description }) => {
        try {
          const todo = this.todoService.createTodoItem(title, description);
          this.todoService.saveToStorage([
            ...this.todoService.getTodosSync(),
            todo,
          ]);
          return TodoActions.createTodoSuccess({ todo });
        } catch (error) {
          return TodoActions.createTodoFailure({
            error: 'Failed to create todo',
          });
        }
      })
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      map(({ id, updates }) => {
        try {
          const todos = this.todoService.getTodosSync();
          const todo = todos.find((t) => t.id === id);
          if (!todo) throw new Error('Todo not found');
          const updated: Todo = {
            ...todo,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          const newTodos = todos.map((t) => (t.id === id ? updated : t));
          this.todoService.saveToStorage(newTodos);
          return TodoActions.updateTodoSuccess({ todo: updated });
        } catch (error) {
          return TodoActions.updateTodoFailure({
            error: 'Failed to update todo',
          });
        }
      })
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      map(({ id }) => {
        try {
          const todos = this.todoService.getTodosSync();
          const newTodos = todos.filter((t) => t.id !== id);
          this.todoService.saveToStorage(newTodos);
          return TodoActions.deleteTodoSuccess({ id });
        } catch (error) {
          return TodoActions.deleteTodoFailure({
            error: 'Failed to delete todo',
          });
        }
      })
    )
  );

  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleTodo),
      map(({ id }) => {
        try {
          const todos = this.todoService.getTodosSync();
          const todo = todos.find((t) => t.id === id);
          if (!todo) throw new Error('Todo not found');
          const updated: Todo = {
            ...todo,
            completed: !todo.completed,
            updatedAt: new Date().toISOString(),
          };
          const newTodos = todos.map((t) => (t.id === id ? updated : t));
          this.todoService.saveToStorage(newTodos);
          return TodoActions.toggleTodoSuccess({ todo: updated });
        } catch (error) {
          return TodoActions.toggleTodoFailure({
            error: 'Failed to toggle todo',
          });
        }
      })
    )
  );

  toggleAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleAll),
      map(({ completed }) => {
        try {
          const todos = this.todoService.getTodosSync();
          const updated = todos.map((t): Todo => ({
            ...t,
            completed,
            updatedAt: new Date().toISOString(),
          }));
          this.todoService.saveToStorage(updated);
          return TodoActions.toggleAllSuccess({ todos: updated });
        } catch (error) {
          return TodoActions.toggleAllFailure({
            error: 'Failed to toggle all todos',
          });
        }
      })
    )
  );

  clearCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.clearCompleted),
      map(() => {
        try {
          const todos = this.todoService.getTodosSync();
          const remaining = todos.filter((t) => !t.completed);
          this.todoService.saveToStorage(remaining);
          return TodoActions.clearCompletedSuccess({ todos: remaining });
        } catch (error) {
          return TodoActions.clearCompletedFailure({
            error: 'Failed to clear completed todos',
          });
        }
      })
    )
  );

  importTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.importTodos),
      map(({ jsonString }) => {
        try {
          const todos = this.todoService.importTodosSync(jsonString);
          this.todoService.saveToStorage(todos);
          return TodoActions.importTodosSuccess({ todos });
        } catch (error) {
          return TodoActions.importTodosFailure({
            error: 'Failed to import todos',
          });
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}
