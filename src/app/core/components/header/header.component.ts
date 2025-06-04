import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

interface User {
    username: string;
    token: string;
}

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, AppBarModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    private _authService = inject(AuthService);
    private _router = inject(Router);

    isLoggedIn$: Observable<boolean> = this._authService.isLoggedIn();
    currentUser$: Observable<User | null> = this._authService.getCurrentUser();

    logout(): void {
        this._authService.logout();
        this._router.navigate(['/login']);
    }
}
