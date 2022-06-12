import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = '';
  userPassword = '';
  
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  onLoginBtnPressed(): void {
    console.log(this.userName , this.userPassword);
    localStorage.setItem("auth", "logged");
    if (this.userName == 'admin')
    {
      if(this.userPassword=='admin')
      {
        localStorage.setItem("userType", "admin");
        this.router.navigate(['home']);
      }
      else
      this.showNotification("Username/Password not matched")
    }
    else if (this.userName == 'user1')
    {
      if(this.userPassword=='123456')
      {
        localStorage.setItem("userType", "user");
        this.router.navigate(['home']);
      }
      else
      this.showNotification("Username/Password not matched")
    }
    else
    this.showNotification("No user with "+this.userPassword+" found")
  }

  onSignup(): void {
    this.router.navigate(['signup']);
  }

showNotification(message:String){
  const type = ['','info','success','warning','danger'];
  $.notify({
      icon: "pe-7s-gift",
      message: message
  },{
      type: type[4],
      timer: 1000,
      placement: {
          from: 'bottom',
          align: 'right'
      }
  });
}

}
