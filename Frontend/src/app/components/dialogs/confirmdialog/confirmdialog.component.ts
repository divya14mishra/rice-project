import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.css']
})
export class ConfirmdialogComponent implements OnInit {


  dialogData: DialogData;
  title:string;
  message:string;

  constructor(
      public dialogRef: MatDialogRef<ConfirmdialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
              ) {}

  ngOnInit() {

  }

  onConfirm(): void {
      // Close the dialog, return true
      this.dialogRef.close(true);
  }

  onDismiss(): void {
      // Close the dialog, return false
      this.dialogRef.close(false);
  }

}

export interface DialogData {
  title: string;
  message: string;
}
