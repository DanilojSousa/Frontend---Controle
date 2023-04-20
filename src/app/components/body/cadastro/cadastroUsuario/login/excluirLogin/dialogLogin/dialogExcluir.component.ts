import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogLogin',
  templateUrl: './dialogLogin.component.html',
  styleUrls: ['./dialogLogin.component.css']
})
export class DialogExcluirComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogExcluirComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }


}
