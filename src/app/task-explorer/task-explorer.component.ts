import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    DataBoundEventArgs,
    NodeExpandEventArgs,
    TreeViewComponent,
    TreeViewModule,
} from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { TaskExplorerService } from '../core/services/task-explorer.service';
import { TaskNode } from '../core/models/task-node.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-task-explorer',
    standalone: true,
    imports: [CommonModule, TreeViewModule, CheckBoxModule, ButtonModule],
    templateUrl: './task-explorer.component.html',
    styleUrls: ['./task-explorer.component.css'],
})
export default class TaskExplorerComponent implements OnInit, OnDestroy {
    @ViewChild('tree') public treeObj!: TreeViewComponent;

    private _taskExplorerService = inject(TaskExplorerService);

    // TreeView properties
    field: Object = {};
    showCheckBox = true;

    // Task Explorer statistics
    totalTasks: number = 0;
    completedTasks: number = 0;
    pendingTasks: number = 0;

    private _unsubscribeAll: Subject<void> = new Subject<void>();

    ngOnInit(): void {
        this._taskExplorerService.tasks$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tasks) => {
                this.field = {
                    id: 'id',
                    text: 'text',
                    parentID: 'pid',
                    dataSource: tasks,
                    expanded: 'expanded',
                    isChecked: 'isChecked',
                    hasChildren: 'hasChildren',
                };
            });
    }

    // Save the checked status of the task nodes
    onNodeChecked(): void {
        this._taskExplorerService.updateTaskCompletion(
            this.treeObj.checkedNodes
        );
    }

    onDataBound(event: DataBoundEventArgs): void {
        const completedTasks: number = event.data.filter(
            (task) => task['isChecked']
        ).length;

        this.totalTasks = event.data.length;
        this.completedTasks = completedTasks;
        this.pendingTasks = this.totalTasks - completedTasks;
    }

    // Save the expanded state of the task nodes
    onNodeExpanded(args: NodeExpandEventArgs): void {
        if (args.nodeData) {
            const nodeData = args.nodeData as Object as TaskNode;
            this._taskExplorerService.updateExpandedState(nodeData);
        }
    }

    // Save the collapsed state of the task nodes
    onNodeCollapsed(args: NodeExpandEventArgs): void {
        if (args.nodeData) {
            const nodeData = args.nodeData as Object as TaskNode;
            this._taskExplorerService.updateExpandedState(nodeData);
        }
    }

    onExpandAll(): void {
        this.treeObj.expandAll();
    }

    onCollapseAll(): void {
        this.treeObj.collapseAll();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
