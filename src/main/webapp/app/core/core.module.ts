import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule} from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule} from "@angular/material/list";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    HomeComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule
  ]
})
export class CoreModule { }
