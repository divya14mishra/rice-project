import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { image_analysis , del_img_id} from '../model/filemodel'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  hostName = window.location.hostname;
  port = 3000;

  host = this.hostName +':' + this.port;

  constructor(private http: HttpClient) { }

  getImageData() {
    let url = 'http://localhost:3000/imageMetaData';
    return this.http.get(url);
  }
  
  image_analysis(image_analysis: image_analysis){
    console.log('image_analysis ' + JSON.stringify(image_analysis));
    return this.http.post('http://3.82.176.212:8080/', image_analysis)
  }

  image_delete(del_img_id : del_img_id){
     // console.log('image_analysis ' + JSON.stringify(image_analysis));
     return this.http.post('http://localhost:3000/del_img_id', del_img_id)
  }
  getImagesObs(): Observable<string[]> {

    return this.http.get<string[]>('http://' + this.host + "/retrieve_images").pipe(
      tap(data => console.log(data)),
      catchError(err => {
        console.log("Error while fetching images: "+err);
        throw err;
      })
    );
  }


  async getImage(input: string): Promise<string> {
    let images = '';
    await this.http.get('http://' + this.host + "/retrieve_image?image=" + input).toPromise().then(data => images = data.toString()).catch((err: HttpErrorResponse) => {
      images = err.error.text;
    });

    return images;
  }

  async getImages(): Promise<string[]> {

    let images = [];
    console.log(this.host);
    
    await this.http.get<string[]>('http://'+ this.host + "/retrieve_images").toPromise().then(data => images = data);

    return images;
  }


  
}
