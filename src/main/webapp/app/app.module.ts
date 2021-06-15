import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import {TasksModule} from './tasks/tasks.module';
import {JsonDateInterceptor} from './JsonDateInterceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    TasksModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JsonDateInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
