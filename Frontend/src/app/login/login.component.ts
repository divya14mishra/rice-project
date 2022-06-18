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
    console.log("--->>", userEmail, userPassword);
    if (userEmail == '' || userPassword == '') {
      this.showNotification("All fields are required!")
    }
    
    // localStorage.setItem("auth", "logged");

    // if (this.userName == 'admin')
    // {
    //   if(this.userPassword=='admin')
    //   {
    //     localStorage.setItem("userType", "admin");
    //     this.router.navigate(['home']);
    //   }
    //   else
    //   this.showNotification("Username/Password not matched")
    // }
    // else if (this.userName == 'user1')
    // {
    //   if(this.userPassword=='123456')
    //   {
    //     localStorage.setItem("userType", "user");
    //     this.router.navigate(['home']);
    //   }
    //   else
    //   this.showNotification("Username/Password not matched")
    // }
    // else
    // this.showNotification("No user with "+this.userPassword+" found")
  }

  onSignup(): void {
    this.router.navigate(['signup']);
  }

  showNotification(message: String) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    $.notify({
      icon: "pe-7s-gift",
      message: message
    }, {
      type: type[4],
      timer: 1000,
      placement: {
        from: 'bottom',
        align: 'right'
      }
    });
  }

}
