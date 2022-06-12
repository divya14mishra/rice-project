import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecommendationActionsDTO, RecommendationDTO } from 'src/app/model/filemodel';

declare var $:any;


@Component({
  selector: 'app-recommendationdialog',
  templateUrl: './recommendationdialog.component.html',
  styleUrls: ['./recommendationdialog.component.css']
})
export class RecommendationdialogComponent implements OnInit {

  recommendationList: RecommendationDTO[];
  
  constructor(public dialModalRef: MatDialogRef<RecommendationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecommendationDTO[]) {
      this.recommendationList=data;
     }

  ngOnInit(): void {
    this.changePosition();
    console.log(this.recommendationList[0].actionsOptions);
  }

  changePosition() {
    this.dialModalRef.updatePosition({ right: '30px', bottom: '80px' });
}

onActionSelected(): void {
  // Close the dialog, return true
  this.dialModalRef.close(true);
}

onSubmitRecommendation():void{
  this.showNotification();
  this.dialModalRef.close(true);

}

showNotification(){
  const type = ['','info','success','warning','danger'];

  var color = Math.floor((Math.random() * 4) + 1);
  $.notify({
      icon: "pe-7s-gift",
      message: "Sem commands updated successfully."
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


