import { AlluserService } from './../services/alluser.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { showNotification } from '../commonFunctions'
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindata: any;
  constructor(private alluserService: AlluserService, public router: Router) { }

  ngOnInit(): void {
  }

  onLoginBtnPressed(form: NgForm): void {
    let userEmail = form.value.email
    let userPassword = form.value.userPassword
    var data = {
      email: userEmail,
      password: userPassword
    }
    if (userEmail == '' || userPassword == '') {
      showNotification("All fields are required!", 4)
    }
    this.verifyLogin(data);
  }

  verifyLogin(data) {
    this.alluserService.loginData(data).subscribe((data: any[]) => {
      this.logindata = data;
      console.log(this.logindata.status, this.logindata)
      if (this.logindata.status == '1') {
        localStorage.setItem("auth", "true");
        localStorage.setItem("usertype", this.logindata.data.usertype);
        localStorage.setItem("user_info", JSON.stringify(this.logindata.data));
        this.router.navigate(['home']);
      }
      else if (this.logindata.status == '2') {
        showNotification(this.logindata.msg, 4)
        return
      }
      else {
        showNotification(this.logindata.msg, 4)
      }
      return;
    });
  }
  onSignup(): void {
    this.router.navigate(['signup']);
  }
}
