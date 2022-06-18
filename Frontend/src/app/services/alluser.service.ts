import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup } from '../model/filemodel'

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
    console.log('createProduct ' + JSON.stringify(signup));
    return this.httpClient.post('http://localhost:3000/signup', signup)
  }

}
