import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-marca',
  templateUrl: './dialogMarca.component.html',
  styleUrls: ['./dialogMarca.component.css']
})
export class DialogMarcaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
