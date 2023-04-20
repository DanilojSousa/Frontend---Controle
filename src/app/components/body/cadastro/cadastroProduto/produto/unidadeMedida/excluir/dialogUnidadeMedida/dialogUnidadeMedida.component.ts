import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-unidade-medida',
  templateUrl: './dialogUnidadeMedida.component.html',
  styleUrls: ['./dialogUnidadeMedida.component.css']
})
export class DialogUnidadeMedidaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUnidadeMedidaComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
