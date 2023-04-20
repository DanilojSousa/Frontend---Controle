import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-produto',
  templateUrl: './dialogProduto.component.html',
  styleUrls: ['./dialogProduto.component.css']
})
export class DialogProdutoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }


}
