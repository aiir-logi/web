import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../tasks.service';
import {Task} from '../model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted: boolean;
  numberOfFilters: number = 0;

  fields = [
    {id: 'id', display: 'Id'},
    {id: 'created', display: 'Created'},
    {id:'thread', display: 'Thread'},
    {id:'level', display: 'Level'},
    {id:'loggerName', display: 'Logger Name'},
    {id:'message', display: 'Message'},
    {id: 'endOfBatch', display: 'End of Batch'},
    {id: 'loggerFqcn', display: 'Logger Fqcn'},
    {id:'threadId', display: 'Thread Id'},
    {id:'threadPriority', display: 'Thread Priority'}];


  constructor(private formBuilder: FormBuilder,
              private taskService: TasksService,
              private router: Router) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      numberOfFilters: ['0', Validators.required],
      filters: new FormArray([])
    });
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.filters as FormArray; }
  get filterFormGroups() { return this.t.controls as FormGroup[]; }

  onChangeTickets(e) {
    this.numberOfFilters += e;
    this.numberOfFilters = Math.max(this.numberOfFilters, 0);
    if (this.t.length < this.numberOfFilters) {
      for (let i = this.t.length; i < this.numberOfFilters; i++) {
        this.t.push(this.formBuilder.group({
          fieldName: ['', Validators.required],
          type: ['', [Validators.required]],
          value: ['', [Validators.required]]
        }));
      }
    } else {
      for (let i = this.t.length; i >= this.numberOfFilters; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      console.log(this.dynamicForm);
      return;
    }

    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
    var task : Task;
    task = this.dynamicForm.value;
    delete task['numberOfFilters'];
    task.startDate = new Date(task.startDate).toISOString();
    task.endDate = new Date(task.endDate).toISOString();
    console.log(task);
    this.taskService.create(task).subscribe(value => {
      this.router.navigate(['tasks/list']);
    });
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }

}
