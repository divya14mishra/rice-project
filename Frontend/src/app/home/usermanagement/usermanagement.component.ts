import { Component, OnInit } from '@angular/core';
import { AlluserService } from '../../services/alluser.service';


@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  all_user_data: any;
  constructor(private alluserService: AlluserService,) { }

  ngOnInit(): void {
    this.all_users()
  }
  
  accept_request(): void {
    alert('accept_request!!!!!!!')
  }

  reject_request() {
    alert('reject_request!!!!!!!')
  }

  delete_user() {
    alert('delete_user!!!!!!!')
  }

  make_user() {
    alert('make_user!!!!!!!')
  }

  all_users() {
    this.alluserService.getusers().subscribe((data: any[]) => {
      this.all_user_data = data;
    });
  }
}

