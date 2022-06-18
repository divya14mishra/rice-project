import { ConfirmdialogComponent } from 'src/app/components/dialogs/confirmdialog/confirmdialog.component';
import { ComponentsModule } from './../components/components.module';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlluserService } from './../services/alluser.service';
import * as internal from 'stream';
declare var $: any;

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
        this.showNotification('All fields are required!', 4)
        return
      }
    }
    var phoneno = /^\d{10}$/;
    if (data.contact.match(phoneno)) {
      this.all_users(data);
    }
    else {
      this.showNotification('Contact is not correct!', 4)
      return
    }
  }

  all_users(data) {
    this.alluserService.signupData(data).subscribe((data: any[]) => {
      this.signup_data = data;
      console.log('--signup call-->>>>', this.signup_data.status, this.signup_data.msgType)
      if (this.signup_data.status == '1') {
        this.showNotification('Profile Created', 2)
        this.router.navigate(['createPassword']);
      }
      else if (this.signup_data.status == '2') {
        this.showNotification(this.signup_data.msg, 4)
        return
      }
      else {
        this.showNotification(this.signup_data.msg, 4)
      }
      return;
    });
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
