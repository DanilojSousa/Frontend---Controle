import { PedidoService } from './../../../../../service/pedido.service';
import { DialogFormaPagamentoComponent } from './dialogFormaPagamento/dialogFormaPagamento.component';
import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from 'src/app/components/interface/formaPagamento';
import { FormaPagamentoService } from 'src/app/components/service/formaPagamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluirFormaPagamento.component.html',
  styleUrls: ['./excluirFormaPagamento.component.css']
})
export class ExcluirFormaPagamentoComponent implements OnInit {

  constructor(private formaPagamentoServer: FormaPagamentoService, 
    private pedidoServer: PedidoService,
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Excluir Pagamento',
        icon: 'payments',
        routerUrl: 'cadastro/financeiro/pagamento',
      }
   }

  formaPagamento!: FormaPagamento;
  formaPagamentoDiaolog!: string;
  
   ngOnInit(): void {
     this.selecionarPorId();
   }
 
   selecionarPorId(){
     const id = this.router.snapshot.paramMap.get('id');
     this.formaPagamentoServer.selecionarPorId(id!).subscribe(res =>{
       this.formaPagamento = res;
     })
   }
  
   voltar(){
     this.route.navigate(['cadastro/financeiro/pagamento']);
   }
 
   openDialog(){
     const dialogRef = this.dialog.open(DialogFormaPagamentoComponent, {
       width: '250px',
       data: 'Deseja deletar o cadastro?'
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if(result){
          //verificando se está sendo usado em outra entidade
          this.pedidoServer.possueFormaPagamento(this.formaPagamento.id!.toString()).subscribe(res => { 
            if(!res){
              //excluindo
              this.formaPagamentoServer.excluirFormaPagamento(this.formaPagamento.id!.toString()).subscribe(res =>{
                this.formaPagamentoServer.message("Cadastro excluido com sucesso!")
                this.voltar();
            });
            }else{
              this.formaPagamentoServer.message("Pedido possui cadastro com esse registro...", res)
              this.voltar();
          }
        });
       }
     });
   }

}


         