import { Component, OnInit } from '@angular/core';
import { ConfirmdialogComponent } from 'src/app/components/dialogs/confirmdialog/confirmdialog.component';
import { ImageService } from 'src/app/services/image.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecommendationdialogComponent } from '../../components/dialogs/recommendationdialog/recommendationdialog.component';
import { FiledetaildialogComponent } from 'src/app/components/dialogs/filedetaildialog/filedetaildialog.component';
import { FileService } from 'src/app/services/fileservice.service';
import { FileDTO, RecommendationDTO } from 'src/app/model/filemodel';

declare var $:any;

@Component({
  selector: 'app-imagedirlisting',
  templateUrl: './imagedirlisting.component.html',
  styleUrls: ['./imagedirlisting.component.css']
})
export class ImagedirlistingComponent implements OnInit {

  imageURLOrBuffer = '';
  imageName = '';

  viewerOpen = false;
  recommendationAvailable = false;

  imageService: ImageService;
  fileService: FileService;

  htmlString: string[];
  fileList: FileDTO[]
  recommendationList: RecommendationDTO[]

  isDialogShowing=false;


  constructor(imageService: ImageService, fileService: FileService, public dialog: MatDialog) {
    this.imageService = imageService;
    this.fileService = fileService
  }

  ngOnInit(): void {
    this.imageService.getImages().then(data => {
      this.htmlString = data;
    });

    this.fileService.getFiles().then(filData => {
      this.fileList = filData
      if(this.fileList.length>0)
      {
        let hasAnalayzedValue=false;
        this.fileList.forEach((item)=>{
          if(item.status.toLowerCase()==='analyzed')
            {
                hasAnalayzedValue=true;
            }
        });
        console.log("Has analyzed: "+hasAnalayzedValue);
        if(hasAnalayzedValue&&!this.isDialogShowing)
          this.getRecommendation("0");
      }
    });


  }

  isAlreadyAnalyzed(index): boolean {
    return this.fileList[index].status.toLowerCase() === 'analyzed';
  }



  getActionLabel(index) {
    if (!this.isAlreadyAnalyzed(index)) {
      return "Send to Analytics";
    }
    else
      return "";
  }

  onImageClicked(item): void {
    this.imageURLOrBuffer = item;
    this.viewerOpen = true;
  }

  showFileDetail(index): void {
    const dialogRef = this.dialog.open(FiledetaildialogComponent, {
      minWidth: "400px",
      data: this.fileList[index].fileDetail

    }
    );
  }
  sendCurrentImageForAnalytics(): void {
    this.viewerOpen = false;
  }

  getImage(index: any) {
    // this.imageName = $event.target.innerText;;
    // this.imageService.getImage(this.imageName).then(data => {
    //   this.imageURLOrBuffer = data;
    //   this.viewerOpen = true;
    // })

    this.imageURLOrBuffer = this.fileList[index].imageUrl;
    console.log(this.imageURLOrBuffer);
    this.viewerOpen = true;
    //   
  }

  sendToAnalytics(index) {

    if (this.isAlreadyAnalyzed(index))
      return;

    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Are you sure?",
        message: "You are about to send the '" + this.fileList[index].fileName + "'  for analytics."
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {
        this.fileService.performAnalytics(this.fileList[index].fileId).then(
          result => {
            if (result) {
                this.showNotification("File is queued for processing.")
              // setTimeout(() => {
              //   this.fileService.getRecommendation().then(recommendationList => {
              //     this.recommendationList = recommendationList
              //     this.fileService.getFiles().then(filData => {
              //       this.fileList = filData
              //       // this.fileList[index].status="Analyzed"
              //       // this.fileList[index].diceOutput="0.56"

              //       this.recommendationAvailable = true;
              //       this.showRecommendation(index);
              //     });

              //   });
              // }, 120000);


            }
            else {

            }
          }
        )
      }

    });
  }

  getRecommendation(index) {
    this.fileService.getRecommendation().then(recommendationList => {
     
      setTimeout(() => {
        this.recommendationList = recommendationList
        this.recommendationAvailable = true;
        this.showRecommendation(index);
      }, 1500); // 2500
    });

    // this.fileService.getRecommendation().then(recommendationList => {
    //   this.recommendationList = recommendationList
    //   this.fileService.getFiles().then(filData => {
    //     setTimeout(() => {
    //       this.fileList = filData
    //       // this.fileList[index].status="Analyzed"
    //       // this.fileList[index].diceOutput="0.56"

    //       this.recommendationAvailable = true;
    //       this.showRecommendation(index);
    //     }, 4000); // 2500 is millisecond
    //   });

    // });
  }

  showRecommendation(index) {
    this.isDialogShowing=true;
    const dialogRef = this.dialog.open(RecommendationdialogComponent, {
      maxWidth: "600px",
      data: this.recommendationList
    }
    );

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {
        this.isDialogShowing=false
        this.recommendationAvailable = false;

      }
      else
        this.isDialogShowing=false;

    });
  }

  showNotification(message:String){
    const type = ['','info','success','warning','danger'];
  
    var color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: "pe-7s-gift",
        message: message
    },{
        type: type[4],
        timer: 1000,
        placement: {
            from: 'bottom',
            align: 'right'
        }
    });
  }


}
