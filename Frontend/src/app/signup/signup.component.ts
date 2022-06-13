import { ConfirmdialogComponent } from 'src/app/components/dialogs/confirmdialog/confirmdialog.component';
import { ComponentsModule } from './../components/components.module';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as internal from 'stream';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usertype = ''
  
  constructor(public router: Router) { }
  ngOnInit(): void {
  }
  
  CreateProfile(form:NgForm){
    console.log("profile created clicked!")
    var data = {
      username : form.value.username,
      email  : form.value.email,
      firstname  : form.value.firstname,
      lastname : form.value.lastname,
      address  : form.value.address,
      contact  : form.value.contact,
      inputState: form.value.inputState,
      inputCity: form.value.inputCity,
      inputZip : form.value.inputZip,
      inputCountry : form.value.inputCountry,
      usertype : this.usertype
    }
    console.log(data)
    
    for (let val in data) {
      console.log(data[val]);
      if(data[val]==''){
        this.showNotification('All fields are required!', 4)
        return
      }
    }
    this.showNotification('Profile Created', 2)
    this.router.navigate(['createPassword']);
    return
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
