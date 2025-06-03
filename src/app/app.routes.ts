import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'to-do',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path: 'to-do',
        canActivate: [AuthGuard],
        loadComponent: () => import('./todo/todo.component'),
    },
    {
        path: 'task-explorer',
        canActivate: [AuthGuard],
        loadComponent: () => import('./task-explorer/task-explorer.component'),
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
