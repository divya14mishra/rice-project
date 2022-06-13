import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {

  constructor(public router: Router) { }

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
      // if email exist in db update user password
      console.log("navigate to home")
      this.router.navigate(['home']);
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

}
