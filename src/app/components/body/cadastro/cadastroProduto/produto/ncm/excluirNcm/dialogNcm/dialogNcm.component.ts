import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ncm',
  templateUrl: './dialogNcm.component.html',
  styleUrls: ['./dialogNcm.component.css']
})
export class DialogNcmComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogNcmComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
