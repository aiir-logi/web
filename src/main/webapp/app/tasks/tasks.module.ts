import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksListComponent} from "./tasks-list/tasks-list.component";
import {TasksRoutingModule} from "./tasks-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    TasksListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
