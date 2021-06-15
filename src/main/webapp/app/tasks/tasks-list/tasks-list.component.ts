import { Component, OnInit } from '@angular/core';
import {Task} from "../model";
import {TasksService} from "../tasks.service";
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  tasks : Array<Task>
  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'status'];
  pollingData:any;
  value:any="";

  constructor(private service : TasksService) {
    this.PollValues();
  }

  ngOnInit(): void {
  }

  PollValues(): any {
    this.pollingData = interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => this.service.list())
      )
      .subscribe(
        res => {
          this.tasks = res;
        },
        error=>{

        }
      );
  }

  ngOnDestroy(){
    this.pollingData.unsubscribe();
  }

  getStatus(task: Task): string {
    var res = {};
    task.subtasks.forEach(v => {
      res[v.status] = (res[v.status] || 0) + 1;
    });
    if( res["IN_PROGRESS"] !== undefined) {
      return "In progress"
    }
    if( res['CREATED'] !== undefined ) {
      return "Created"
    }
    return "Done"
  }

}
