import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  CreateProfile(form:NgForm){
    console.log("profile created clicked!")
    const data = {
      username : form.value.username,
      email  : form.value.email,
      firstname  : form.value.firstname,
      lastname : form.value.lastname,
      address  : form.value.address,
      inputState: form.value.inputState,
      inputCity: form.value.inputCity,
      inputZip : form.value.inputZip,
      inputCountry : form.value.inputCountry,
    }
    console.log(data)
  }
}
