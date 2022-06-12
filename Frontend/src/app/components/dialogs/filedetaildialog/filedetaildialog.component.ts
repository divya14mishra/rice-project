import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileDetail } from 'src/app/model/filemodel';

@Component({
  selector: 'app-filedetaildialog',
  templateUrl: './filedetaildialog.component.html',
  styleUrls: ['./filedetaildialog.component.css']
})
export class FiledetaildialogComponent implements OnInit {

  fileData:FileDetail;
  constructor(public dialModalRef: MatDialogRef<FiledetaildialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileDetail) {
      this.fileData=data;
     }

  ngOnInit(): void {
  }
  

}



