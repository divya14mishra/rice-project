import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'experiments', title: 'Experiments',  icon:'collections', class: '' },
    { path: 'user-profile', title: 'Profile',  icon:'person', class: '' },
    { path: 'user-management', title: 'User Management',  icon:'group', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    var isAdmin=localStorage.getItem('userType');

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if(isAdmin!='admin')
    {
     this.menuItems= this.menuItems.filter(item=>item.path!='user-management');
    }
  }
  isMobileMenu() {
    return false;
      // if ($(window).width() > 991) {
      //     return false;
      // }
      // return true;
  };
}
