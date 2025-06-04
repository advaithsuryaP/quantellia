import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-auth',
    imports: [CommonModule, FormsModule, TextBoxModule, ButtonModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
})
export default class AuthComponent {
    private _authService = inject(AuthService);
    private _router = inject(Router);
    private _route = inject(ActivatedRoute);

    username: string = '';
    password: string = '';
    errorMessage: string = '';

    onSubmit(): void {
        this._authService
            .login(this.username, this.password)
            .pipe(take(1))
            .subscribe((success) => {
                if (success) {
                    const returnUrl =
                        this._route.snapshot.queryParams['returnUrl'] || '/';
                    this._router.navigateByUrl(returnUrl);
                } else {
                    this.errorMessage = 'Invalid username or password';
                }
            });
    }
}
