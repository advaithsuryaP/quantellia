import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'to-do',
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () => import('./core/components/shell/shell.component'),
        children: [
            {
                path: 'to-do',
                loadComponent: () => import('./todo/todo.component'),
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
