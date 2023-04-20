import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-grupo',
  templateUrl: './dialogGrupo.component.html',
  styleUrls: ['./dialogGrupo.component.css']
})
export class DialogGrupoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }


}
