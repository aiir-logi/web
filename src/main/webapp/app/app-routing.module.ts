import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {MainComponent} from "./core/main/main.component";
import {TaskResultsComponent} from './tasks/task-results/task-results.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: MainComponent, data: {icon: 'home'}},
      {path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule), data: {icon: 'note_alt'}}
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
