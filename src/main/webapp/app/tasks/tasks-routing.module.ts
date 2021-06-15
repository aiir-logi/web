import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TasksListComponent} from "./tasks-list/tasks-list.component";
import {TaskResultsComponent} from './task-results/task-results.component';
import {CreateTaskComponent} from './create-task/create-task.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'prefix'},
  {path: 'list', component: TasksListComponent},
  {path: 'new', component: CreateTaskComponent},
  {path: ':id', component: TaskResultsComponent},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TasksRoutingModule { }
