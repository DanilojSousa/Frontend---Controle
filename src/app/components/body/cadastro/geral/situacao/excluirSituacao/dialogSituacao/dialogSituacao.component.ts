import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogSituacao',
  templateUrl: './dialogSituacao.component.html',
  styleUrls: ['./dialogSituacao.component.css']
})
export class DialogSituacaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSituacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
