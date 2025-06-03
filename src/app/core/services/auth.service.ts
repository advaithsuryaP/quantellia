import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    check(): Observable<boolean> {
        return of(true);
    }
}
