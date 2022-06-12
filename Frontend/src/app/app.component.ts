import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RICE User Web Portal';

  login(){
    var user=(<HTMLInputElement>document.getElementById("username")).value;
    var pass=(<HTMLInputElement>document.getElementById("password")).value;
    //console.log(user);
    //console.log(pass);
    var cUser="researcher1";
    var cPass="riceisnice";

    if(user!=cUser||pass!=cPass){
        alert("You have input a wrong username or password!");
    }else{
      var photobox=(<HTMLInputElement>document.getElementById("photoBox")).style.display="block";
      var loginbox=(<HTMLInputElement>document.getElementById("formBox")).style.display="none";
    }

    return 0;
    }
}
