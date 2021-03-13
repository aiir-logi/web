import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TasksListComponent} from "./tasks-list/tasks-list.component";

const routes : Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'prefix'},
  {path: 'list', component: TasksListComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TasksRoutingModule { }
