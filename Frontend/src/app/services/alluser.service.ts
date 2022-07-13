import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup,Login,UpdateProfile} from '../model/filemodel'

@Injectable({
  providedIn: 'root'
})
export class AlluserService {

  constructor(private httpClient: HttpClient) { }
  getusers() {
    let url = 'http://localhost:3000/all_users';
    return this.httpClient.get(url);
  }
  
  signupData(signup: Signup) {
    // console.log('signupData ' + JSON.stringify(signup));
    return this.httpClient.post('http://localhost:3000/signup', signup)
  }

  loginData(login: Login){
    // console.log('loginData ' + JSON.stringify(login));
    return this.httpClient.post('http://localhost:3000/login', login)
  }

  savePassword(login: Login){
    // console.log('savePassword ' + JSON.stringify(login));
    return this.httpClient.post('http://localhost:3000/savepassword', login)
  }

  updateUserProfile(updateProfile: UpdateProfile){
    // console.log('updateProfile ' + JSON.stringify(updateProfile));
    return this.httpClient.post('http://localhost:3000/updateProfile', updateProfile)
  }
}
