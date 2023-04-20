import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NivelFuncao } from 'src/app/components/interface/NivelFuncao';
import { HeaderService } from 'src/app/components/service/header.service';
import { NivelFuncaoService } from 'src/app/components/service/nivelFuncao.service';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {

  listaNivelFuncao: NivelFuncao[] = []; 
  displayedColumns: string[] = ['id', 'nome','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<NivelFuncao>; 
  mostraSpinner!: Boolean;

  constructor(private server: NivelFuncaoService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Nível',
        icon: 'trending_up',
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
        this.listaNivelFuncao = res;
        this.dataSource$ = new MatTableDataSource<NivelFuncao>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/funcionario/nivel/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/funcionario/nivel/editar/'+id])
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  novoNivel(){
    this.route.navigate(['cadastro/funcionario/nivel/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/funcionario/nivel/excluir/'+id])
  }

}
