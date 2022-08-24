import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { HttpClient } from '@angular/common/http';
import { showNotification } from '../../commonFunctions'



@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  component_val: any;
  alldata: any;
  analyzed_data = [];
  not_analyzed_data = [];
  multipleImages = [];

  constructor(private imageService: ImageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.component_val = 0;
    localStorage.setItem("state", this.component_val);
  }

  
  comp_state(a) {
    this.component_val = a;
    this.imageService.getImageData({ flag: 1 }).subscribe((data: any[]) => {
      this.alldata = data;
      // console.log("---->> inside func2", this.alldata.data);
      var complete_data = this.alldata.data;
      
      for(let inx in complete_data){
        if (complete_data[inx]['status']=='analyzed'){
          this.analyzed_data.push(complete_data[inx])
        }
        else{
          this.not_analyzed_data.push(complete_data[inx]);
        }
      }
      // console.log("analyzed_data", this.analyzed_data);
      // console.log("not_analyzed_data", this.not_analyzed_data);
    });

  }
  
  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onMultipleSubmit(){
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }

    this.http.post<any>('http://localhost:3000/multipleFiles', formData).subscribe(
      (res) =>{
        console.log("status", res.status)
        showNotification("Files uploaded!", 2)

      } ,
      (err) => {
        console.log("status", err.status)
        showNotification("Upload only .mat files.", 4)

      }
    );
  }

  file_upload(){
    alert("inside file upload!!")
  }

}
