import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todo-list',
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/auth.component'),
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () => import('./core/components/shell/shell.component'),
        children: [
            {
                path: 'todo-list',
                loadComponent: () => import('./todo-list/todo-list.component'),
            },
            {
                path: 'task-explorer',
                loadComponent: () =>
                    import('./task-explorer/task-explorer.component'),
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
