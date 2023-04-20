import { ProdutoService } from 'src/app/components/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadeMedida } from 'src/app/components/interface/unidadeMedida';
import { HeaderService } from 'src/app/components/service/header.service';
import { UnidadeMedidaService } from 'src/app/components/service/unidadeMedida.service';
import { DialogUnidadeMedidaComponent } from './dialogUnidadeMedida/dialogUnidadeMedida.component';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluirUnidadeMedida.component.html',
  styleUrls: ['./excluirUnidadeMedida.component.css']
})
export class ExcluirUnidadeMedidaComponent implements OnInit {

  unidadeMedida!: UnidadeMedida;
  clienteDiaolog!: string;

  constructor(private server: UnidadeMedidaService, 
    private route: Router, 
    private produtoServer: ProdutoService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) { 
      headerService.headerData = {
        title: 'Excluir Unidade Medida',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/unidadeMedida',
      }
    }

  
  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>{
      this.unidadeMedida = res;
    })
  }


  voltar(){
    this.route.navigate(['cadastro/produto/unidadeMedida']);
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogUnidadeMedidaComponent, {
      width: '250px',
      data: 'Deseja deletar o cadastro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //verificando se está sendo usado em outra entidade
        this.produtoServer.possueMedida(this.unidadeMedida.id!.toString()).subscribe(res => { 
          if(!res){
           //excluindo
           this.server.excluirUnidadeMedida(this.unidadeMedida.id!.toString()).subscribe(res =>{
            this.server.message("Cadastro excluido com sucesso!")
            this.voltar();
            });
          }else{
            this.server.message("Produto possui cadastro com esse registro...", res)
            this.voltar();
          }
        });
      }
    });
  }

}


