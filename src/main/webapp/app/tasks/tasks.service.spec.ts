import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Task} from "./model";
import {RandomUuid} from "testcontainers/dist/uuid";

describe('TasksService', () => {
  let httpTestingController: HttpTestingController;
  let service: TasksService;
  let baseUrl = 'api/tasks'
  let task: Task

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TasksService);
    httpTestingController = TestBed.inject(HttpTestingController)
    task = {
      id: new RandomUuid().nextUuid(),
      name: "test"
    }
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return data", () => {
    let result: Task[];
    service.list().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl
    });

    req.flush([task]);

    expect(result[0]).toEqual(task);
  });
});
