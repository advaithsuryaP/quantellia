import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
    providedIn: 'root',
})
export class TodoListService {
    private todos = new BehaviorSubject<TodoItem[]>([
        {
            id: 1,
            description: 'Get selected for the interview',
            completed: false,
        },
        {
            id: 2,
            description: 'Implement Add To-Do functionality with modal form',
            completed: true,
        },
        {
            id: 3,
            description:
                'Ensure tasks toggle completion and re-order correctly',
            completed: true,
        },
        {
            id: 4,
            description: 'Display incomplete tasks above completed ones',
            completed: true,
        },
        {
            id: 5,
            description:
                'Design recursive Task Explorer with dynamic hierarchy',
            completed: true,
        },
        {
            id: 6,
            description: 'Enable lazy loading of subtasks on expand',
            completed: true,
        },
        {
            id: 7,
            description:
                'Track completion status of tree nodes with checkboxes',
            completed: true,
        },
        {
            id: 8,
            description: 'Show loading indicators during async operations',
            completed: true,
        },
        {
            id: 9,
            description: 'Use Syncfusion components for bonus points',
            completed: true,
        },
        {
            id: 10,
            description: 'Implement authentication and route protection',
            completed: true,
        },
    ]);

    private nextId = this.todos.value.length;

    getTodos(): Observable<TodoItem[]> {
        return this.todos.asObservable();
    }

    addTodo(description: string): void {
        const currentTodos = [...this.todos.value];
        const newTodo: TodoItem = {
            id: this.nextId + 1,
            description,
            completed: false,
        };
        this.todos.next([newTodo, ...currentTodos]);
    }

    toggleTodo(id: number): void {
        const currentTodos = [...this.todos.value];
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
