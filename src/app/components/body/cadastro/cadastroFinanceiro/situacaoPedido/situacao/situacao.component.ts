import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SituacaoPedido } from 'src/app/components/interface/situacaoPedido';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoPedidoService } from 'src/app/components/service/situacaoPedido.service';

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.component.html',
  styleUrls: ['./situacao.component.css']
})
export class SituacaoPedidoComponent implements OnInit {

  listaSituacaoPedido: SituacaoPedido[] = []; 
  displayedColumns: string[] = ['id', 'descricao','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<SituacaoPedido>; 
  mostraSpinner!: Boolean;

  constructor(private server: SituacaoPedidoService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Situação',
        icon: 'more_horiz',
        routerUrl: 'inicio',
      }
     }

  ngOnInit(): void {
    this.selecionarTodos();
  }

  selecionarTodos(){
    this.mostraSpinner = false;
    this.server.selecionarTodos().subscribe(res =>
      { 
        this.listaSituacaoPedido = res;
        this.dataSource$ = new MatTableDataSource<SituacaoPedido>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/financeiro/situacao/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/financeiro/situacao/editar/'+id])
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  novoSituacaoPedido(){
    this.route.navigate(['cadastro/financeiro/situacao/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/financeiro/situacao/excluir/'+id])
  }

}
