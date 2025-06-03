import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskNode } from '../models/task-node.model';

@Injectable({
    providedIn: 'root',
})
export class TaskExplorerService {
    private _tasks = new BehaviorSubject<TaskNode[]>([
        {
            id: '1',
            text: 'Football',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        {
            id: '2',
            pid: '1',
            text: 'Goalkeeper',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '2.1', pid: '2', text: 'Shot Stopping', isChecked: false },
        { id: '2.2', pid: '2', text: 'Distribution', isChecked: false },
        { id: '2.3', pid: '2', text: 'Command Area', isChecked: false },

        {
            id: '3',
            pid: '1',
            text: 'Defender',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '3.1', pid: '3', text: 'Center Back', isChecked: false },
        { id: '3.2', pid: '3', text: 'Full Back', isChecked: false },
        { id: '3.3', pid: '3', text: 'Wing Back', isChecked: false },

        {
            id: '4',
            pid: '1',
            text: 'Midfielder',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '4.1', pid: '4', text: 'Defensive Mid', isChecked: false },
        { id: '4.2', pid: '4', text: 'Central Mid', isChecked: false },
        { id: '4.3', pid: '4', text: 'Attacking Mid', isChecked: false },

        {
            id: '5',
            pid: '1',
            text: 'Forward',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '5.1', pid: '5', text: 'Winger', isChecked: false },
        { id: '5.2', pid: '5', text: 'Striker', isChecked: false },
        { id: '5.3', pid: '5', text: 'False 9', isChecked: false },

        {
            id: '6',
            text: 'Cricket',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        {
            id: '7',
            pid: '6',
            text: 'Batsman',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '7.1', pid: '7', text: 'Opening Batsman', isChecked: false },
        { id: '7.2', pid: '7', text: 'Middle Order', isChecked: false },
        { id: '7.3', pid: '7', text: 'Finisher', isChecked: false },

        {
            id: '8',
            pid: '6',
            text: 'Bowler',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '8.1', pid: '8', text: 'Fast Bowler', isChecked: false },
        { id: '8.2', pid: '8', text: 'Spin Bowler', isChecked: false },
        { id: '8.3', pid: '8', text: 'All-rounder', isChecked: false },
    ]);

    tasks$ = this._tasks.asObservable();

    updateTaskCompletion(checkedNodes: string[]): void {
        const updatedTasks = this._tasks.value.map((task) => ({
            ...task,
            isChecked: checkedNodes.includes(task.id),
        }));
        this._tasks.next(updatedTasks);
    }

    updateExpandedState(updatedTask: TaskNode): void {
        const currentTasks = this._tasks.value;
        const updatedTasks = currentTasks.map((task) => {
            if (task.id === updatedTask.id) {
                return {
                    ...task,
                    expanded: updatedTask.expanded,
                };
            }
            return task;
        });
        this._tasks.next(updatedTasks);
    }
}
