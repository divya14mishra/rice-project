import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlluserService } from './../services/alluser.service';


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
      this.showNotification('Password do not matched', 4)
    }
    else{
      var save_pass_data = {
        email : email,
        password : pass1
      }
      this.saveUserPass(save_pass_data);
    }
  }
  
  showNotification(message:String, num:number ){
    const type = ['','info','success','warning','danger'];
    $.notify({
        icon: "pe-7s-gift",
        message: message
    },{
        type: type[num],
        timer: 1000,
        placement: {
            from: 'bottom',
            align: 'right'
        }
    });
  }

  saveUserPass(data) {
    this.alluserService.savePassword(data).subscribe((data: any[]) => {
      this.password_data = data;
      console.log('--saveUserPass call-->>>>', this.password_data)
      if (this.password_data.status == '1') {
        this.router.navigate(['home']);
      }
      else if (this.password_data.status == '2') {
        this.showNotification(this.password_data.msg, 4)
        return
      }
      else {
        this.showNotification(this.password_data.msg, 4)
      }
      return;
    });
  }

}
