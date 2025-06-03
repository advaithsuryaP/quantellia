import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TodoListService } from '../../core/services/todo-list.service';

@Component({
    selector: 'app-todo-add',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        TextBoxModule,
        ButtonModule,
    ],
    templateUrl: './todo-add.component.html',
    styleUrl: './todo-add.component.css',
})
export class TodoAddComponent {
    private todoService = inject(TodoListService);
    public dialogVisible = false;
    public description = '';

    showDialog(): void {
        this.dialogVisible = true;
    }

    hideDialog(): void {
        this.dialogVisible = false;
        this.description = '';
    }

    addTodo(): void {
        if (this.description.trim()) {
            this.todoService.addTodo(this.description.trim());
            this.hideDialog();
        }
    }
}
