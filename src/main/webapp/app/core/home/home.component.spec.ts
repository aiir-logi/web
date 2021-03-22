import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatListModule} from "@angular/material/list";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const routes = [{
    path: '',
    component: HomeComponent,
    children: [
      {path: 'testing/path', component: HomeComponent, data: {icon: 'testing-icon'}}
    ]
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        NoopAnimationsModule
        ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open menu', () => {
    expect(component.menuOpened).toBeTruthy()
    component.openMenu()
    expect(component.menuOpened).toBeFalsy()
  })
});
