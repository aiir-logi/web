import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksListComponent} from "./tasks-list/tasks-list.component";
import {TasksRoutingModule} from "./tasks-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import { TaskResultsComponent } from './task-results/task-results.component';
import {RouterModule} from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreateTaskComponent } from './create-task/create-task.component';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';




@NgModule({
  declarations: [
    TasksListComponent,
    TaskResultsComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    TasksRoutingModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class TasksModule { }
