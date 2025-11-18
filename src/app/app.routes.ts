import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { TodoListComponent } from './features/todos/todo-list/todo-list.component';
import { AboutComponent } from './features/about/about.component';
import { SettingsComponent } from './features/settings/settings.component';

/**
 * Application routes
 */
export const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    data: { title: 'Todo List' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About' },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Settings' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
