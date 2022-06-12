import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {
    let userType = localStorage.getItem("userType");
    if (userType=="admin")
      return true;
    else {
      this.router.navigate(['unauthorized']);
      return false;
    }

  }
}
