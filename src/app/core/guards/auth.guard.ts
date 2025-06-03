import {
    Router,
    CanActivateFn,
    CanActivateChildFn,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.check().pipe(
        switchMap((isAuthenticated) => {
            if (!isAuthenticated) {
                const urlTree = router.parseUrl('/login');
                return of(urlTree);
            }

            return of(true);
        })
    );
};
