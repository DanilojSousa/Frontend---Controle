import { PedidoService } from './../../../../../service/pedido.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SituacaoPedido } from 'src/app/components/interface/situacaoPedido';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoPedidoService } from 'src/app/components/service/situacaoPedido.service';
import { DialogSituacaoPedidoComponent } from './dialogSituacaoPedido/dialogSituacaoPedido.component';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluirSituacaoPedido.component.html',
  styleUrls: ['./excluirSituacaoPedido.component.css']
})
export class ExcluirSituacaoPedidoComponent implements OnInit {

  constructor(private situacaoPedidoServer: SituacaoPedidoService, 
    private pedidoServer: PedidoService,
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Excluir Situação',
        icon: 'more_horiz',
        routerUrl: 'cadastro/financeiro/situacao',
      }
   }

   situacaoPedido!: SituacaoPedido;
   situacaoPedidoDiaolog!: string;
  
   ngOnInit(): void {
     this.selecionarPorId();
   }
 
   selecionarPorId(){
     const id = this.router.snapshot.paramMap.get('id');
     this.situacaoPedidoServer.selecionarPorId(id!).subscribe(res =>{
       this.situacaoPedido = res;
     })
   }
  
   voltar(){
     this.route.navigate(['cadastro/financeiro/situacao']);
   }
 
   openDialog(){
     const dialogRef = this.dialog.open(DialogSituacaoPedidoComponent, {
       width: '250px',
       data: 'Deseja deletar o cadastro?'
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if(result){
        //verificando se está sendo usado em outra entidade
        this.pedidoServer.possueSituacao(this.situacaoPedido.id!.toString()).subscribe(res => { 
          if(!res){
          //excluindo
            this.situacaoPedidoServer.excluirSituacaoPedido(this.situacaoPedido.id!.toString()).subscribe(res =>{
            this.situacaoPedidoServer.message("Cadastro excluido com sucesso!")
            this.voltar();
            });
          }else{
            this.situacaoPedidoServer.message("Pedido possui cadastro com esse registro...", res)
            this.voltar();
          }
        });
      }
    });
  }

}

