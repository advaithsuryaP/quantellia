import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
    providedIn: 'root',
})
export class TodoListService {
    private todos = new BehaviorSubject<TodoItem[]>([]);
    private nextId = 1;

    getTodos(): Observable<TodoItem[]> {
        return this.todos.asObservable();
    }

    addTodo(description: string): void {
        const currentTodos = this.todos.value;
        const newTodo: TodoItem = {
            id: this.nextId++,
            description,
            completed: false,
        };
        this.todos.next([newTodo, ...currentTodos]);
    }

    toggleTodo(id: number): void {
        const currentTodos = this.todos.value;
        const updatedTodos = currentTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        // Sort todos: incomplete first, then completed
        const sortedTodos = updatedTodos.sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
        });
        this.todos.next(sortedTodos);
    }
}
