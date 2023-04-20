import { PedidoService } from './../../../../../service/pedido.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoPedido } from 'src/app/components/interface/tipoPedido';
import { HeaderService } from 'src/app/components/service/header.service';
import { TipoPedidoService } from 'src/app/components/service/tipoPedido.service';
import { DialogTipoPedidoComponent } from './dialogTipoPedido/dialogTipoPedido.component';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluirTipoPedido.component.html',
  styleUrls: ['./excluirTipoPedido.component.css']
})
export class ExcluirTipoPedidoComponent implements OnInit {

  constructor(private tipoPedidoServer: TipoPedidoService, 
    private pedidoServer: PedidoService,
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Excluir Situação',
        icon: 'list_alt',
        routerUrl: 'cadastro/financeiro/tipo',
      }
   }

   tipoPedido!: TipoPedido;
   tipoPedidoDiaolog!: string;
  
   ngOnInit(): void {
     this.selecionarPorId();
   }
 
   selecionarPorId(){
     const id = this.router.snapshot.paramMap.get('id');
     this.tipoPedidoServer.selecionarPorId(id!).subscribe(res =>{
       this.tipoPedido = res;
     })
   }
  
   voltar(){
     this.route.navigate(['cadastro/financeiro/tipo']);
   }
 
   openDialog(){
     const dialogRef = this.dialog.open(DialogTipoPedidoComponent, {
       width: '250px',
       data: 'Deseja deletar o cadastro?'
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if(result){
        //verificando se está sendo usado em outra entidade
        this.pedidoServer.possueTipoPedido(this.tipoPedido.id!.toString()).subscribe(res => { 
          if(!res){
          //excluindo
          this.tipoPedidoServer.excluirTipoPedido(this.tipoPedido.id!.toString()).subscribe(res =>{
            this.tipoPedidoServer.message("Cadastro excluido com sucesso!")
            this.voltar();
            });
          }else{
            this.tipoPedidoServer.message("Pedido possui cadastro com esse registro...", res)
            this.voltar();
          }
        });
       }
     });
   }
}

        