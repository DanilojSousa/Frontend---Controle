import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TipoPedido } from 'src/app/components/interface/tipoPedido';
import { HeaderService } from 'src/app/components/service/header.service';
import { TipoPedidoService } from 'src/app/components/service/tipoPedido.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoPedidoComponent implements OnInit {

  listaTipoPedido: TipoPedido[] = []; 
  displayedColumns: string[] = ['id', 'nome','servico','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<TipoPedido>; 
  mostraSpinner!: Boolean;

  constructor(private server: TipoPedidoService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Tipo Pedido',
        icon: 'list_alt',
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
        this.listaTipoPedido = res;
        this.dataSource$ = new MatTableDataSource<TipoPedido>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/financeiro/tipo/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/financeiro/tipo/editar/'+id])
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  novoTipoPedido(){
    this.route.navigate(['cadastro/financeiro/tipo/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/financeiro/tipo/excluir/'+id])
  }
}
