import { Routes } from '@angular/router';

export default [
    {
        path: 'login',
        loadComponent: () => import('./auth.component'),
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
] as Routes;
