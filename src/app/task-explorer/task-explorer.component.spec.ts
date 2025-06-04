import { ComponentFixture, TestBed } from '@angular/core/testing';

import TaskExplorerComponent from './task-explorer.component';

describe('TaskExplorerComponent', () => {
    let component: TaskExplorerComponent;
    let fixture: ComponentFixture<TaskExplorerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskExplorerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskExplorerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
