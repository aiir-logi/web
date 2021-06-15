import { TestBed } from '@angular/core/testing';

import { TaskResultsService } from './task-results.service';

describe('TaskResultsService', () => {
  let service: TaskResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
