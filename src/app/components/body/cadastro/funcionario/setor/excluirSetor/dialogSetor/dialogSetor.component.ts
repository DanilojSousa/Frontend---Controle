import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-setor',
  templateUrl: './dialogSetor.component.html',
  styleUrls: ['./dialogSetor.component.css']
})
export class DialogSetorComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<DialogSetorComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }


}
