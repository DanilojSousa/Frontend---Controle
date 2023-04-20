import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-tipo-pedido',
  templateUrl: './dialogTipoPedido.component.html',
  styleUrls: ['./dialogTipoPedido.component.css']
})
export class DialogTipoPedidoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogTipoPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
