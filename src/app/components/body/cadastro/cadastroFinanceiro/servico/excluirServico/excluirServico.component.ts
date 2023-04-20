import { map } from 'rxjs';
import { TipoPedidoService } from 'src/app/components/service/tipoPedido.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from 'src/app/components/interface/servico';
import { HeaderService } from 'src/app/components/service/header.service';
import { ServicoService } from 'src/app/components/service/servico.service';
import { DialogServicoComponent } from './dialogServico/dialogServico.component';

@Component({
  selector: 'app-excluir-servico',
  templateUrl: './excluirServico.component.html',
  styleUrls: ['./excluirServico.component.css']
})
export class ExcluirServicoComponent implements OnInit {

  constructor(private servicoServer: ServicoService, 
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private tipoPedidoServer: TipoPedidoService,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Excluir Serviço',
        icon: 'sync_alt',
        routerUrl: 'cadastro/financeiro/servico',
      }
   }

   servico!: Servico;
   servicoPedidoDiaolog!: string;
  
   ngOnInit(): void {
     this.selecionarPorId();
   }
 
   selecionarPorId(){
     const id = this.router.snapshot.paramMap.get('id');
     this.servicoServer.selecionarPorId(id!).subscribe(res =>{
       this.servico = res;
     })
   }
  
   voltar(){
     this.route.navigate(['cadastro/financeiro/servico']);
   }
 
    openDialog(){
      
      const dialogRef = this.dialog.open(DialogServicoComponent, {
        width: '250px',
        data: 'Deseja deletar o cadastro?'
      });
  
      dialogRef.afterClosed().subscribe(result => { 
        if(result){
          //verificando se está sendo usado em outra entidade
          this.tipoPedidoServer.possueServico(this.servico.id!.toString()).subscribe(res => { 
            if(!res){
              //excluindo
              this.servicoServer.excluirServico(this.servico.id!.toString()).subscribe(res =>{
                this.servicoServer.message("Cadastro excluido com sucesso!")
                this.voltar();
            });
            }else{
              this.servicoServer.message("Tipo Pedido possui cadastro com esse registro...", res)
              this.voltar();
          }
        });
    }
    });
  }
}
