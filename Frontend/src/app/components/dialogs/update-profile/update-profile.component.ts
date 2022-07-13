import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { showNotification } from '../../../commonFunctions'
declare var $: any;


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  form: FormGroup;
  user_d = JSON.parse(localStorage.getItem('user_info'));
  constructor(
    public dialogRef: MatDialogRef<UpdateProfileComponent>) { }

  ngOnInit(): void {
  }

  update_data(form: NgForm) {
    let data =
    {
      id: this.user_d._id,
      username: form.value.username,
      firstname: form.value.fistname,
      lastname: form.value.lastname,
      address: form.value.fistname,
      contact: form.value.contact,
      inputState: form.value.state,
      inputCity: form.value.city,
      inputZip: form.value.zip,
      inputCountry: form.value.country,
    }
    var phoneno = /^\d{10}$/;
    if (!data.contact.match(phoneno)) {
      showNotification('Contact is not correct! Profile not update', 4)
    }
    else {
      // showNotification('Profile Update!', 2)
      this.dialogRef.close(data);
    }
  }
  cancel_update() {
    this.dialogRef.close(false);
  }
}
