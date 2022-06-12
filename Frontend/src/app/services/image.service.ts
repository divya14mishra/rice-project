import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  hostName = window.location.hostname;
  port = 3000;

  host = this.hostName +':' + this.port;

  constructor(private http: HttpClient) { }

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
