import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {
    let auth = localStorage.getItem("auth");
    console.log("Auth : "+auth);
    if (auth != null && auth.length > 0)
      return true;
    else {
      this.router.navigate(['login']);
      return false;
    }

  }

}
