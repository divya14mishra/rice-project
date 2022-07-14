import { Component, OnInit } from '@angular/core';
import { AlluserService } from '../../services/alluser.service';
import { ConfirmdialogComponent } from '../../components/dialogs/confirmdialog/confirmdialog.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { showNotification } from '../../commonFunctions'





@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  all_user_data: any;
  user_d = JSON.parse(localStorage.getItem('user_info'));

  constructor(private alluserService: AlluserService, public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.all_users()
  }

  // flags conditions
  // 0: accept admin request
  // 1: reject admin request
  // 2: change admin back to user
  // 3: delete user or admin

  accept_request() {
    const update_dta = {
      id: this.user_d._id,
      flag: 0
    }
    const msg = "Do you want to give user admin's access?";
    this.commonFunction(update_dta, msg);
  }

  reject_request() {
    const update_dta = {
      id: this.user_d._id,
      flag: 1
    }
    const msg = "You are about to reject user's admin request.";
    this.commonFunction(update_dta, msg);
  }

  delete_user() {
    const update_dta = {
      id: this.user_d._id,
      flag: 3
    }
    const msg = "Do you want to delete user permanently?";
    this.commonFunction(update_dta, msg);
  }

  change_to_user() {
    const update_dta = {
      id: this.user_d._id,
      flag: 2
    }
    const msg = "Do you want to change this admin to user?";
    this.commonFunction(update_dta, msg);
  }

  all_users() {
    this.alluserService.getusers().subscribe((data: any[]) => {
      this.all_user_data = data;
    });
  }

  commonFunction(update_dta, msg) {
    const dialogRef = this.matDialog.open(ConfirmdialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Are you sure?",
        message: msg
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.alluserService.userManagement(update_dta).subscribe((data: any[]) => {
          this.all_user_data = data;
          if (this.all_user_data.status == 1) {
            return showNotification(this.all_user_data.msg, 2)
          }
          else if (this.all_user_data.status == 2) {
            return showNotification(this.all_user_data.msg, 4)
          }
          else {
            return showNotification(this.all_user_data.msg, 4)
          }

        });
      }
    });
  }

}

