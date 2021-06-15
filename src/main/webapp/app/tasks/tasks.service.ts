import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "./model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http : HttpClient) { }

  list() : Observable<Array<Task>> {
    return this.http.get<Array<Task>>('api/tasks');
  }

  create(task: Task): Observable<Task> {
    return this.http.post('api/tasks', task);
  }
}
