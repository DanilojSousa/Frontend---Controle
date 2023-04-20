import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogNivel',
  templateUrl: './dialogNivel.component.html',
  styleUrls: ['./dialogNivel.component.css']
})
export class DialogNivelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNivelComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
