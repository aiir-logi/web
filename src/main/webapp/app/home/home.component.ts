import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public menuOpened = false

  constructor() { }

  ngOnInit(): void {
  }

  openMenu(): void {
    this.menuOpened = !this.menuOpened
  }

}
