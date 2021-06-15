import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from '../model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pageable} from './model';



@Injectable({
  providedIn: 'root'
})
export class TaskResultsService {

  constructor(private http: HttpClient) { }

  list(id: string, size: number, page: number): Observable<Pageable> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    return this.http.get<Pageable>(`api/logs/${id}`, {params: params});
  }
}
