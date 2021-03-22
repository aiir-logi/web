import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './tasks-list.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {Observable, throwError} from "rxjs";
import {TasksService} from "../tasks.service";
import {TasksServiceMock} from "../../../assets/mocks/tasks-service.mock";

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let restService: TasksServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatTableModule],
      declarations: [ TasksListComponent ],
      providers: [
        {provide: TasksService, useClass: TasksServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    restService = TestBed.inject(TasksService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load Tasks on response', () => {
    spyOn(restService, 'list').and.returnValue(Observable)
    expect(component.tasks).toEqual([])
  });

});
