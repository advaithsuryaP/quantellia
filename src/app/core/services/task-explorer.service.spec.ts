import { TestBed } from '@angular/core/testing';

import { TaskExplorerService } from './task-explorer.service';

describe('TaskExplorerService', () => {
  let service: TaskExplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskExplorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
