import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public menuOpened = true;
  public items: Array<any> = [];

  constructor(private router: Router) {
    this.items = this.mapItems(router.config)
  }

  ngOnInit(): void {
  }

  mapItems(routes: any[]): any[] {
    const homeChildrenRoutes = routes.find(r => r.path === '').children;
    return homeChildrenRoutes.filter(item => !item.redirectTo && !item.hidden).map(item => {
      return {
        icon: item.data?.icon,
        path: item.path,
        name: item.path.toUpperCase()
      };
    });
  }

  openMenu(): void {
    this.menuOpened = !this.menuOpened
  }

}
