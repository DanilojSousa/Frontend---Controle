import { UnidadeMedida } from './../../../../../../interface/unidadeMedida';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UnidadeMedidaService } from 'src/app/components/service/unidadeMedida.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-unidade-medida',
  templateUrl: './unidadeMedida.component.html',
  styleUrls: ['./unidadeMedida.component.css']
})
export class UnidadeMedidaComponent implements OnInit {

  listaUnidadeMedida: UnidadeMedida[] = []; 
  displayedColumns: string[] = ['id', 'nome','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<UnidadeMedida>; 
  mostraSpinner!: Boolean;

  constructor(private server: UnidadeMedidaService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Unidade Medida',
        icon: 'inventory_2',
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
        this.listaUnidadeMedida = res;
        this.dataSource$ = new MatTableDataSource<UnidadeMedida>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/produto/unidadeMedida/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/produto/unidadeMedida/editar/'+id])
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  novoUnidadeMedida(){
    this.route.navigate(['cadastro/produto/unidadeMedida/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/produto/unidadeMedida/excluir/'+id])
  }

}
