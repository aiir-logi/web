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
  displayedColumns: string[] = ['id', 'name'];

  constructor(private service : TasksService) {
    this.loadTasks();
  }

  ngOnInit(): void {
  }

  loadTasks() {
    this.service.list().subscribe(result => {
      this.tasks = result ? result : [];
    })
  }

}
