import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
        // This is a mock implementation. In a real app, you would make an HTTP call to your backend
        if (username === 'admin' && password === 'admin') {
            const user: User = {
                username: username,
                token: 'dummy-token',
            };
            localStorage.setItem('token', user.token);
            localStorage.setItem('username', user.username);
            this.currentUser.next(user);
            this.isAuthenticated.next(true);
            return of(true);
        }
        return of(false);
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.currentUser.next(null);
        this.isAuthenticated.next(false);
    }

    check(): Observable<boolean> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
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
