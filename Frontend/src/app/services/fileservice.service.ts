import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FileDTO, RecommendationDTO } from '../model/filemodel';
import { json } from 'express';



@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseURL="http://3.138.106.133:3000"

  dummyFileList: string = '[{"fileId":"","fileName":"Sample(1).mat","status":"Not Reviewed","diceOutput":"0.53","share":"Share with everybody","imageUrl":"https://raw.githubusercontent.com/PreyeaRegmi/RICE-Portal/dev/src/assets/img/60190-S70.jpg","matUrl":"","fileDetail":{"metaData":["Sample Organism : Mitochondria","Sampling Time : 1800 miliseconds"],"scanParameter":["Resolution of Image : 3840 X 2160","No of images in volume : 30"],"analyticsOutput":["Precision : N/A","DiceOutput : .53"],"shareStatus":["Share Status : Share with everybody"]}}]';
  dummyRecommendations:string='[{"actionId":"1","actionMessage":"Change Resolution of your image to","actionsOptions":[{"actionOptionId":"1","actionName":"720p","semCommand":{}},{"actionOptionId":"3","actionName":"1080p","semCommand":{}},{"actionOptionId":"4","actionName":"1920p","semCommand":{}},{"actionOptionId":"5","actionName":"3160p","semCommand":{}}]},{"actionId":"2","actionMessage":"Change size of image to","actionsOptions":[{"actionOptionId":"8","actionName":"1024 X 1024","semCommand":{}},{"actionOptionId":"9","actionName":"2048 X 2048","semCommand":{}}]},{"actionId":"3","actionMessage":"Move sample stage to","actionsOptions":[{"actionOptionId":"10","actionName":"X : 125","semCommand":{}},{"actionOptionId":"11","actionName":"Y : 250","semCommand":{}}]}]';
  host: string;
  constructor(private http: HttpClient) {

  }


  async getFiles(): Promise<FileDTO[]> {
    let fileList:FileDTO[]=JSON.parse(this.dummyFileList)
    await this.http.get<FileDTO[]>( this.baseURL + "/retrieve_files").toPromise().then(data => fileList = data)
      .catch((err: HttpErrorResponse) => {
        console.log("Error while fetching file list")
       

      });

    console.log(fileList[0]);
    return fileList;
  }

  async getRecommendation(): Promise<RecommendationDTO[]> {
    let recommendationList:RecommendationDTO[] = JSON.parse(this.dummyRecommendations);

    await this.http.get<RecommendationDTO[]>( this.baseURL + "/get_action_recommendation").toPromise().then(data => recommendationList = data)
      .catch((err: HttpErrorResponse) => {
        console.log("Error while fetching recommendation file list")
      });

    return recommendationList;
  }

  async performAnalytics(fileId:String): Promise<boolean> {

    const request:JSON = <JSON><unknown>{
      "fileId": fileId,
    }


    await this.http.post( this.baseURL + "/perform_analytics",request).toPromise()
      .catch((err: HttpErrorResponse) => {
        console.log("Error while performing analytics")
        return true;
      });

    return true;
  }


}
