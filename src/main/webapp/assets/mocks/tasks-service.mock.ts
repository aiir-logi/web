import {Observable, of, throwError} from 'rxjs';
import {Task} from "../../app/tasks/model";

export class TasksServiceMock {
  list(): Observable<Array<Task>> {
      return of([]);
  }
}
