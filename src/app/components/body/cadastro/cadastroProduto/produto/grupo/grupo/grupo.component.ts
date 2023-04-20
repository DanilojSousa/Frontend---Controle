import { GrupoProduto } from './../../../../../../interface/grupoProduto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoProdutoService } from 'src/app/components/service/grupoProduto.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  listaGrupo: GrupoProduto[] = []; 
  displayedColumns: string[] = ['id', 'nome','produto','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<GrupoProduto>; 
  mostraSpinner!: Boolean;

  constructor(private server: GrupoProdutoService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Grupo',
        icon: 'inventory_2',
        routerUrl: 'inicio',
      }
     }

  ngOnInit(): void {
    this.selecionarTodos();
  }

  selecionarTodos(){
    this.mostraSpinner = false;
    this.server.selecionarAtivos().subscribe(res =>
      { 
        this.listaGrupo = res;
        this.dataSource$ = new MatTableDataSource<GrupoProduto>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/produto/grupo/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/produto/grupo/editar/'+id])
  }

  voltar(){
   this.route.navigate(['inicio'])
  }

  novoGrupo(){
    this.route.navigate(['cadastro/produto/grupo/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/produto/grupo/excluir/'+id])
  }
}
