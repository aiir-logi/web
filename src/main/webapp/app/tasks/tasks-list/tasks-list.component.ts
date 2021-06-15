import { Component, OnInit } from '@angular/core';
import {Task} from "../model";
import {TasksService} from "../tasks.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  tasks : Array<Task>
  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'status'];

  constructor(private service : TasksService) {
    this.loadTasks();
  }

  ngOnInit(): void {
  }

  loadTasks() {
    this.service.list().subscribe(result => {
      this.tasks = result ? result : [];
      console.log(this.tasks);
    })
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
