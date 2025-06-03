import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-todo-item',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './todo-item.component.html',
    styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {}
