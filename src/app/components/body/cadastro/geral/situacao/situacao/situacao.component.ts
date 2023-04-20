import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Situacao } from 'src/app/components/interface/situacao';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoService } from 'src/app/components/service/situacao.service';

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.component.html',
  styleUrls: ['./situacao.component.css']
})
export class SituacaoComponent implements OnInit {

  listaSituacao: Situacao[] = []; 
  displayedColumns: string[] = ['id', 'nome','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<Situacao>; 
  mostraSpinner!: Boolean;

  constructor(private server: SituacaoService, 
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
        this.listaSituacao = res;
        this.dataSource$ = new MatTableDataSource<Situacao>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/geral/situacao/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/geral/situacao/editar/'+id])
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  novoSituacao(){
    this.route.navigate(['cadastro/geral/situacao/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/geral/situacao/excluir/'+id])
  }

}
