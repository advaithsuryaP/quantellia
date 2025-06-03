import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListService } from '../core/services/todo-list.service';
import { TodoItem } from '../core/models/todo-item.model';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [CommonModule, TodoAddComponent, CheckBoxModule],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css',
})
export default class TodoListComponent implements OnDestroy {
    private todoService = inject(TodoListService);

    private _unsubscribeAll: Subject<void> = new Subject<void>();
    todos$: Observable<TodoItem[]> = this.todoService
        .getTodos()
        .pipe(takeUntil(this._unsubscribeAll));

    toggleTodo(todo: TodoItem): void {
        this.todoService.toggleTodo(todo.id);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
