import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-funcao',
  templateUrl: './dialogFuncao.component.html',
  styleUrls: ['./dialogFuncao.component.css']
})
export class DialogFuncaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogFuncaoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
