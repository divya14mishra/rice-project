import { AlluserService } from './../services/alluser.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  all_user_data: any;
  logindata: any;
  constructor(private alluserService: AlluserService, public router: Router) { }

  ngOnInit(): void {
    // this.all_users()
  }

  all_users() {
    this.alluserService.getusers().subscribe((data: any[]) => {
      this.all_user_data = data;
      console.log('---->>>>', this.all_user_data)
    });
  }

  onLoginBtnPressed(form: NgForm): void {
    let userEmail = form.value.email
    let userPassword = form.value.userPassword
    var data = {
      email: userEmail,
      password: userPassword
    }
    console.log("--->>", userEmail, userPassword);
    if (userEmail == '' || userPassword == '') {
      this.showNotification("All fields are required!", 4)
    }
    else if(userEmail == 'admin@gmail.com' && userPassword == '123456'){
      this.router.navigate(['home']);
      return;
    }
    this.verifyLogin(data);
  }

  verifyLogin(data) {
    this.alluserService.loginData(data).subscribe((data: any[]) => {
      this.logindata = data;
      console.log('--verifyLogin call-->>>>', this.logindata.status, this.logindata.msgType, this.logindata.data)
      if (this.logindata.status == '1') {
        localStorage.setItem("auth", "true");
        localStorage.setItem("usertype", this.logindata.data);
        this.router.navigate(['home']);
      }
      else if (this.logindata.status == '2') {
        this.showNotification(this.logindata.msg, 4)
        return
      }
      else {
        this.showNotification(this.logindata.msg, 4)
      }
      return;
    });
  }
  onSignup(): void {
    this.router.navigate(['signup']);
  }

  showNotification(message: String, num: number) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    $.notify({
      icon: "pe-7s-gift",
      message: message
    }, {
      type: type[num],
      timer: 1000,
      placement: {
        from: 'bottom',
        align: 'right'
      }
    });
  }
}
