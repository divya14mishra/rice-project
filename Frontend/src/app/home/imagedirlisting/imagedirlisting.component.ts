import { Component, OnInit } from "@angular/core";
import { ConfirmdialogComponent } from "src/app/components/dialogs/confirmdialog/confirmdialog.component";
import { ImageService } from "src/app/services/image.service";
import { AlluserService } from '../../services/alluser.service';
import { MatDialog} from "@angular/material/dialog";
import { RecommendationdialogComponent } from "../../components/dialogs/recommendationdialog/recommendationdialog.component";
import { FiledetaildialogComponent } from "src/app/components/dialogs/filedetaildialog/filedetaildialog.component";
import { FileService } from "src/app/services/fileservice.service";
import { FileDTO, RecommendationDTO } from "src/app/model/filemodel";
import { showNotification } from '../../commonFunctions'
declare var $: any;

@Component({
  selector: "app-imagedirlisting",
  templateUrl: "./imagedirlisting.component.html",
  styleUrls: ["./imagedirlisting.component.css"],
})
export class ImagedirlistingComponent implements OnInit {
  imageURLOrBuffer = "";
  imageName = "";

  viewerOpen = false;
  recommendationAvailable = false;

  imageService: ImageService;
  fileService: FileService;

  htmlString: string[];
  fileList: FileDTO[];
  recommendationList: RecommendationDTO[];
  isDialogShowing = false;
  metadata: any;
  anlyzedData: any;
  deltedData: any;
  updateData: any;
  
  constructor(private alluserService: AlluserService, imageService: ImageService, fileService: FileService, public dialog: MatDialog) {
    this.imageService = imageService;
    this.fileService = fileService;
  }

  ngOnInit(): void {
    this.imageService.getImageData({flag:0}).subscribe((data: any[]) => {
      this.metadata = data;
    });
  }

  isAlreadyAnalyzed(index): boolean {
    return this.fileList[index].status.toLowerCase() === "analyzed";
  }

  getActionLabel(index) {
    if (!this.isAlreadyAnalyzed(index)) {
      return "Send to Analytics";
    } else return "";
  }

  onImageClicked(item): void {
    this.imageURLOrBuffer = item;
    this.viewerOpen = true;
  }

  showFileDetail(index): void {
    const dialogRef = this.dialog.open(FiledetaildialogComponent, {
      minWidth: "400px",
      data: this.fileList[index].fileDetail,
    });
  }
  sendCurrentImageForAnalytics(): void {
    this.viewerOpen = false;
  }

  getImage(index: any) {
    this.imageURLOrBuffer = this.fileList[index].imageUrl;
    console.log(this.imageURLOrBuffer);
    this.viewerOpen = true;
    //
  }

  sendToAnalytics(filename, filepath, _id) {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: "450px",
      data: {
        title: "Are you sure?",
        message:
          "You are about to send the '" +
          filename +
          "'  for analytics.",
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        showNotification("Please wait while your image is analyzing...", 2);
        this.imageService.image_analysis({ filename: filename, filepath: filepath }).subscribe((data: any[]) => {
          this.anlyzedData = data;
          if (this.anlyzedData.status != 0) {
            document.getElementById("volume_" + _id).innerHTML = "No of images in voulme: " + this.anlyzedData.data.imageVolume;;
            document.getElementById("precision_" + _id).innerHTML = "Precision: " + this.anlyzedData.data.precision;
            document.getElementById("dicescore_" + _id).innerHTML = "Dice Score: " + this.anlyzedData.data.diceSore;
            showNotification(`Data analyzed successfully.`, 2);
            document.getElementById("analysis_" + _id).innerHTML = 'Analyzed'
            var analysis_btn = document.getElementById("analysis_" + _id) as HTMLButtonElement
            analysis_btn.disabled = true;
            this.imageService.update_exp_status({ _id : _id, diceSore: this.anlyzedData.data.diceSore, precision : this.anlyzedData.data.precision }).subscribe((data: any[]) => {
              this.updateData = data;
            });
          }
          else {
            showNotification(this.anlyzedData.msg, 4);
          }
        });
      }
    });
  }

  deleteData(filename, _id) {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: "450px",
      data: {
        title: "Are you sure?",
        message:
          "Your file '" +
          filename +
          "' will be deleted permanently.",
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {

        this.imageService.image_delete({ _id : _id }).subscribe((data: any[]) => {
          console.log("image meta data deleting--> ", data);
          this.deltedData = data;
        });
      }
    });
  }
  
  getRecommendation(index) {
    this.fileService.getRecommendation().then((recommendationList) => {
      setTimeout(() => {
        this.recommendationList = recommendationList;
        this.recommendationAvailable = true;
        this.showRecommendation(index);
      }, 1500); // 2500
    });
  }

  showRecommendation(index) {
    this.isDialogShowing = true;
    const dialogRef = this.dialog.open(RecommendationdialogComponent, {
      maxWidth: "600px",
      data: this.recommendationList,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.isDialogShowing = false;
        this.recommendationAvailable = false;
      } else this.isDialogShowing = false;
    });
  }
}