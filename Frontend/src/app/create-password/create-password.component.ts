import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlluserService } from './../services/alluser.service';
import { showNotification } from '../commonFunctions'


declare var $: any;

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  password_data: any;

  constructor(private alluserService: AlluserService, public router: Router) { }

  ngOnInit(): void {
  }
  onSignIn(postform : NgForm){
    let email = postform.value.email
    let pass1 = postform.value.password1
    let pass2 = postform.value.password2
    console.log(email, pass1, pass2)
    if (pass1 != pass2){
      console.log("password not matched")
      showNotification('Password do not match!', 4)
    }
    else{
      var save_pass_data = {
        email : email,
        password : pass1
      }
      this.saveUserPass(save_pass_data);
    }
  }
  
  saveUserPass(data) {
    this.alluserService.savePassword(data).subscribe((data: any[]) => {
      this.password_data = data;
      console.log('--saveUserPass call-->>>>', this.password_data.status)
      if (this.password_data.status == '1') {
        localStorage.setItem("auth", "true");
        this.router.navigate(['login']);
      }
      else if (this.password_data.status == '2') {
       showNotification(this.password_data.msg, 4)
        return
      }
      else {
        showNotification(this.password_data.msg, 4)
      }
      return;
    });
  }

}
