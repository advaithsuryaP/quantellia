import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import {
    NodeCheckEventArgs,
    NodeExpandEventArgs,
    TreeViewComponent,
    TreeViewModule,
} from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { TaskExplorerService } from '../core/services/task-explorer.service';
import { TaskNode } from '../core/models/task-node.model';
import { Subject, takeUntil } from 'rxjs';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

@Component({
    selector: 'app-task-explorer',
    standalone: true,
    imports: [NgIf, TreeViewModule, CheckBoxModule, ButtonModule],
    templateUrl: './task-explorer.component.html',
    styleUrls: ['./task-explorer.component.css'],
})
export default class TaskExplorerComponent implements OnInit, OnDestroy {
    @ViewChild('tree') public treeObj!: TreeViewComponent;

    private _taskExplorerService = inject(TaskExplorerService);

    // TreeView properties
    field: Object = {};
    readonly autoCheck: boolean = false;
    readonly showCheckBox: boolean = true;

    // Task Explorer Statistics
    totalTasks: number = 0;
    completedTasks: number = 0;
    incompleteTasks: number = 0;

    isLoading: boolean = false;
    fetchedTasks: TaskNode[] = [];
    tasksForWhichSubTasksAreFetched: string[] = [];

    private _unsubscribeAll: Subject<void> = new Subject<void>();

    ngOnInit(): void {
        this.isLoading = true;
        this._taskExplorerService
            .fetchTaskExplorer()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tasks) => {
                this.isLoading = false;
                this.fetchedTasks = [...tasks];
                this._initDataToTreeView(tasks);
            });
    }

    private _initDataToTreeView(tasks: TaskNode[]): void {
        this.field = {
            id: 'id',
            text: 'text',
            parentID: 'pid',
            dataSource: tasks,
            expanded: 'expanded',
            isChecked: 'isChecked',
            hasChildren: 'hasChildren',
        };

        this.totalTasks = tasks.length;
        this.completedTasks = tasks.filter((task) => task.isChecked).length;
        this.incompleteTasks = this.totalTasks - this.completedTasks;
    }

    /**
     * Update the completion status of a task
     * @param args - The event arguments
     */
    onNodeChecked(args: NodeCheckEventArgs): void {
        this.isLoading = true;
        this._taskExplorerService
            .updateTaskCompletion(this.treeObj.checkedNodes)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (_) => {
                    this.fetchedTasks = this.fetchedTasks.map((task) =>
                        this.treeObj.checkedNodes.includes(task.id)
                            ? { ...task, isChecked: true }
                            : { ...task, isChecked: false }
                    );
                    this._initDataToTreeView([...this.fetchedTasks]);
                    this.isLoading = false;
                },
            });
    }

    /**
     * Update the expanded state of a task
     * @param args - The event arguments
     */
    onTaskExpanded(args: NodeExpandEventArgs): void {
        const taskId: string = args.nodeData['id'] as string;
        const parentTask = this.fetchedTasks.find((task) => task.id === taskId);
        if (!parentTask) {
            return;
        }

        if (this.tasksForWhichSubTasksAreFetched.includes(taskId)) {
            this._updateExpandedState(taskId);
            return;
        }

        this.isLoading = true;
        this._taskExplorerService
            .fetchSubTasksById(taskId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tasks) => {
                this.isLoading = false;
                this.tasksForWhichSubTasksAreFetched.push(taskId);
                parentTask.expanded = true;
                this.fetchedTasks = [...this.fetchedTasks, ...tasks];
                this._initDataToTreeView(this.fetchedTasks);
            });
    }

    /**
     * Update the collapsed state of a task
     * @param args - The event arguments
     */
    onTaskCollapsed(args: NodeExpandEventArgs): void {
        const taskId: string = args.nodeData['id'] as string;
        this._updateExpandedState(taskId);
    }

    /**
     * Update the expanded state of a task
     * @param taskId - The id of the task
     */
    private _updateExpandedState(taskId: string): void {
        this.isLoading = true;
        this._taskExplorerService
            .updateExpandedState(taskId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (result) => {
                    this.isLoading = false;
                    this.fetchedTasks = this.fetchedTasks.map((task) =>
                        task.id === taskId
                            ? { ...task, expanded: result }
                            : task
                    );
                    this._initDataToTreeView(this.fetchedTasks);
                },
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
