import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskResultsService} from './task-results.service';
import {Log, Pageable} from './model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-task-results',
  templateUrl: './task-results.component.html',
  styleUrls: ['./task-results.component.scss']
})
export class TaskResultsComponent implements OnInit, AfterViewInit {
  id: string;

  data: Log[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  displayedColumns: string[] = ['id', 'created', 'thread', 'level', 'loggerName', 'message', 'endOfBatch', 'loggerFqcn', 'threadId', 'threadPriority'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.taskResultsService.list(
            this.id, 200, this.paginator.pageIndex)
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalSize;
          return data.content;
        })
      ).subscribe(data => this.data = data);
  }

  constructor(private _Activatedroute: ActivatedRoute,
              private taskResultsService: TaskResultsService) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

}
