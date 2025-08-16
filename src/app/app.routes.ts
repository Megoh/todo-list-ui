import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { TaskList } from './components/task-list/task-list';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'tasks', component: TaskList },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];
