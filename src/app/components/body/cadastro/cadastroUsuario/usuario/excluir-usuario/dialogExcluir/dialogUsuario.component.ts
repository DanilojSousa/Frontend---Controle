import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogUsuario',
  templateUrl: './dialogUsuario.component.html',
  styleUrls: ['./dialogUsuario.component.css']
})
export class DialogUsuarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
