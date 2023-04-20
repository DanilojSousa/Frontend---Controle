import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-servico',
  templateUrl: './dialogServico.component.html',
  styleUrls: ['./dialogServico.component.css']
})
export class DialogServicoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogServicoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }


}
