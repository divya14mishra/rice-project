import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {
    let auth = localStorage.getItem("auth");
    if (auth == 'true')
      return true;
    else {
      this.router.navigate(['login']);
      return false;
    }

  }

}
