import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { APP_CONSTANTS } from '../app.constants';

interface User {
    username: string;
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticated = new BehaviorSubject<boolean>(false);
    private currentUser = new BehaviorSubject<User | null>(null);

    login(username: string, password: string): Observable<boolean> {
        if (
            username === APP_CONSTANTS.AUTH.USERNAME &&
            password === APP_CONSTANTS.AUTH.PASSWORD
        ) {
            const user: User = {
                username: username,
                token: APP_CONSTANTS.AUTH.TOKEN,
            };
            localStorage.setItem(APP_CONSTANTS.KEYS.TOKEN, user.token);
            localStorage.setItem(APP_CONSTANTS.KEYS.USERNAME, user.username);
            this.currentUser.next(user);
            this.isAuthenticated.next(true);
            return of(true);
        }
        return of(false);
    }

    logout(): void {
        localStorage.removeItem(APP_CONSTANTS.KEYS.TOKEN);
        localStorage.removeItem(APP_CONSTANTS.KEYS.USERNAME);
        this.currentUser.next(null);
        this.isAuthenticated.next(false);
    }

    check(): Observable<boolean> {
        const token = localStorage.getItem(APP_CONSTANTS.KEYS.TOKEN);
        const username = localStorage.getItem(APP_CONSTANTS.KEYS.USERNAME);
        const isAuthenticated = !!token;

        if (isAuthenticated && username) {
            this.currentUser.next({ username, token });
        }

        this.isAuthenticated.next(isAuthenticated);
        return this.isAuthenticated.asObservable();
    }

    getCurrentUser(): Observable<User | null> {
        return this.currentUser.asObservable();
    }

    isLoggedIn(): Observable<boolean> {
        return this.isAuthenticated.asObservable();
    }
}
