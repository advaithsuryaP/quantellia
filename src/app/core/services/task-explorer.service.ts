import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { TaskNode } from '../models/task-node.model';

@Injectable({
    providedIn: 'root',
})
export class TaskExplorerService {
    // In house data for the task explorer
    private _tasks: TaskNode[] = [
        {
            id: '1',
            text: 'Football',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        {
            id: '1.1',
            pid: '1',
            text: 'Goalkeeper',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '1.1.1', pid: '1.1', text: 'Shot Stopping', isChecked: false },
        { id: '1.1.2', pid: '1.1', text: 'Distribution', isChecked: false },
        { id: '1.1.3', pid: '1.1', text: 'Command Area', isChecked: false },

        {
            id: '1.2',
            pid: '1',
            text: 'Defender',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '1.2.1', pid: '1.2', text: 'Center Back', isChecked: false },
        { id: '1.2.2', pid: '1.2', text: 'Full Back', isChecked: false },
        { id: '1.2.3', pid: '1.2', text: 'Wing Back', isChecked: false },

        {
            id: '1.3',
            pid: '1',
            text: 'Midfielder',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '1.3.1', pid: '1.3', text: 'Defensive Mid', isChecked: false },
        { id: '1.3.2', pid: '1.3', text: 'Central Mid', isChecked: false },
        { id: '1.3.3', pid: '1.3', text: 'Attacking Mid', isChecked: false },

        {
            id: '1.4',
            pid: '1',
            text: 'Forward',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '1.4.1', pid: '1.4', text: 'Winger', isChecked: false },
        { id: '1.4.2', pid: '1.4', text: 'Striker', isChecked: false },
        { id: '1.4.3', pid: '1.4', text: 'False 9', isChecked: false },

        {
            id: '2',
            text: 'Cricket',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        {
            id: '2.1',
            pid: '2',
            text: 'Batsman',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '2.1.1', pid: '2.1', text: 'Opening Batsman', isChecked: false },
        { id: '2.1.2', pid: '2.1', text: 'Middle Order', isChecked: false },
        { id: '2.1.3', pid: '2.1', text: 'Finisher', isChecked: false },

        {
            id: '2.2',
            pid: '2',
            text: 'Bowler',
            hasChildren: true,
            expanded: false,
            isChecked: false,
        },
        { id: '2.2.1', pid: '2.2', text: 'Fast Bowler', isChecked: false },
        { id: '2.2.2', pid: '2.2', text: 'Spin Bowler', isChecked: false },
        { id: '2.2.3', pid: '2.2', text: 'All-rounder', isChecked: false },
        {
            id: '3',
            text: 'Tennis',
            isChecked: false,
            hasChildren: false,
        },
        {
            id: '4',
            text: 'Basketball',
            isChecked: false,
            hasChildren: true,
            expanded: false,
        },
        { id: '4.1', pid: '4', text: 'Point Guard', isChecked: false },
        { id: '4.2', pid: '4', text: 'Shooting Guard', isChecked: false },
        { id: '4.3', pid: '4', text: 'Small Forward', isChecked: false },
        { id: '4.4', pid: '4', text: 'Power Forward', isChecked: false },
        { id: '4.5', pid: '4', text: 'Center', isChecked: false },
    ];

    /**
     * Fetch the tasks that either do not have a "pid", meaning it is a parent task
     * or are in expanded state, meaning they have already been fetched
     * @returns Observable<TaskNode[]>
     */
    fetchTaskExplorer(): Observable<TaskNode[]> {
        const result = this._tasks.filter(
            (task) =>
                !task.pid ||
                (task.pid &&
                    this._tasks.find((t) => t.id === task.pid)?.expanded)
        );
        return of(result).pipe(delay(500));
    }

    /**
     * Fetch the sub tasks of a task by its id
     * @param taskId - The id of the task
     * @returns Observable<TaskNode[]> - The sub tasks of the task
     */
    fetchSubTasksById(taskId: string): Observable<TaskNode[]> {
        const subTasks = this._tasks.filter((task) => task.pid === taskId);
        const updatedTasks = this._tasks.map((task) =>
            task.id === taskId ? { ...task, expanded: true } : task
        );
        this._tasks = [...updatedTasks];

        return of(subTasks).pipe(delay(300));
    }

    /**
     * Update the completion status of a task
     * @param payload - The ids of the tasks to update
     * @returns Observable<boolean> - The new completion status of the task
     */
    updateTaskCompletion(payload: string[]): Observable<boolean> {
        const updatedTasks = this._tasks.map((task) => {
            if (payload.includes(task.id)) {
                return {
                    ...task,
                    isChecked: true,
                };
            }
            return { ...task, isChecked: false };
        });
        this._tasks = [...updatedTasks];
        return of(true).pipe(delay(200));
    }

    /**
     * Update the expanded state of a task
     * @param taskIdToUpdate - The id of the task to update
     * @returns Observable<boolean> - The new expanded state of the task
     */
    updateExpandedState(taskIdToUpdate: string): Observable<boolean> {
        const currentTasks = this._tasks;
        let newExpandedState: boolean = false;
        const updatedTasks = currentTasks.map((task) => {
            if (task.id === taskIdToUpdate) {
                newExpandedState = !task.expanded;
                return { ...task, expanded: newExpandedState };
            }
            return task;
        });
        this._tasks = [...updatedTasks];
        return of(newExpandedState);
    }
}
