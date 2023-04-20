import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-forma-pagamento',
  templateUrl: './dialogFormaPagamento.component.html',
  styleUrls: ['./dialogFormaPagamento.component.css']
})
export class DialogFormaPagamentoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogFormaPagamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
