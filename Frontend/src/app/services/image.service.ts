import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { image_analysis , del_img_id, update_exp_status, imageMetaData} from '../model/filemodel'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  hostName = window.location.hostname;
  port = 3000;

  host = this.hostName +':' + this.port;

  constructor(private http: HttpClient) { }

  getImageData(imageMetaData: imageMetaData) {
    let url = 'http://localhost:3000/imageMetaData';
    return this.http.post(url, imageMetaData);
  }
  
  image_analysis(image_analysis: image_analysis){
    // console.log('image_analysis ' + JSON.stringify(image_analysis));
    return this.http.post('http://54.208.113.77:8080/', image_analysis)
  }

  image_delete(del_img_id : del_img_id){
     // console.log('image_analysis ' + JSON.stringify(image_analysis));
     return this.http.post('http://localhost:3000/del_img_id', del_img_id)
  }

  update_exp_status(update_exp_status : update_exp_status){
    // console.log('image_analysis ' + JSON.stringify(image_analysis));
    return this.http.post('http://localhost:3000/update_exp_status', update_exp_status)
 }
 

}
