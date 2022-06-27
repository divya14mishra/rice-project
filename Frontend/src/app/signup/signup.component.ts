import { ConfirmdialogComponent } from 'src/app/components/dialogs/confirmdialog/confirmdialog.component';
import { ComponentsModule } from './../components/components.module';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlluserService } from './../services/alluser.service';
import { showNotification } from '../commonFunctions'
import * as internal from 'stream';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usertype = 'user'
  signup_data: any;
  resp: any;

  constructor(private alluserService: AlluserService, public router: Router) { }
  ngOnInit(): void {
  }

  CreateProfile(form: NgForm) {
    // console.log("profile created clicked!")
    var data = {
      username: form.value.username,
      email: form.value.email,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      address: form.value.address,
      contact: form.value.contact,
      inputState: form.value.inputState,
      inputCity: form.value.inputCity,
      inputZip: form.value.inputZip,
      inputCountry: form.value.inputCountry,
      usertype: this.usertype
    }

    for (let val in data) {
      if (data[val] == '') {
        showNotification('All fields are required!', 4)
        return
      }
    }

    var phoneno = /^\d{10}$/;
    if (data.contact.match(phoneno)) {
      this.saveUsersData(data);
    }
    else {
      showNotification('Contact is not correct!', 4)
      return
    }
  }

  saveUsersData(data) {
    this.alluserService.signupData(data).subscribe((data: any[]) => {
      this.signup_data = data;
      console.log('--signup call-->>>>', this.signup_data.status, this.signup_data.msgType)
      if (this.signup_data.status == '1') {
        showNotification('Profile Created', 2)
        this.router.navigate(['createPassword']);
      }
      else if (this.signup_data.status == '2') {
        showNotification(this.signup_data.msg, 4)
        return
      }
      else {
        showNotification(this.signup_data.msg, 4)
      }
      return;
    });
  }

}
