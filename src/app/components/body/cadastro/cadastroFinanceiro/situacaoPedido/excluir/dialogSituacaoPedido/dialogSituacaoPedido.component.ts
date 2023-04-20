import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-situacao-pedido',
  templateUrl: './dialogSituacaoPedido.component.html',
  styleUrls: ['./dialogSituacaoPedido.component.css']
})
export class DialogSituacaoPedidoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSituacaoPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
