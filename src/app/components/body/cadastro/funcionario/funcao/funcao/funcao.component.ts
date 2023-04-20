import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FuncionarioSetorService } from 'src/app/components/service/funcionarioSetor.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';
import { FuncionarioSetor } from 'src/app/components/interface/funcionarioSetor';

@Component({
  selector: 'app-funcao',
  templateUrl: './funcao.component.html',
  styleUrls: ['./funcao.component.css']
})
export class FuncaoComponent implements OnInit {

  listaFuncionarioSetor: FuncionarioSetor[] = []; 
  displayedColumns: string[] = ['id', 'funcionario', 'setor', 'cargo','salario', 'acao'];
  dataSource$!: MatTableDataSource<FuncionarioSetor>; 
  mostraSpinner!: Boolean;

  //Paginação
  length!: number;
  pageSize!: number;
  pageIndex!: number;

  constructor(private server: FuncionarioSetorService, 
     private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: ' Função',
        icon: 'groups',
        routerUrl: 'inicio',
      }
     }

  ngOnInit(): void {
    this.loadPage({pageIndex: 0, pageSize: 4}); 
  }

  loadPage(pageEvent: any){
    this.server.pesquisaPorPaginacao(pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe(page => {
        this.mostraSpinner = false;
        this.listaFuncionarioSetor = page.content;
        this.dataSource$ = new MatTableDataSource<FuncionarioSetor>(page.content);
        this.length = page.totalElements;
        this.pageSize = pageEvent.pageSize;
        this.pageIndex = pageEvent.pageIndex;
        this.mostraSpinner = true;
      });
  }

  selecionarTodos(){
    this.server.selecionarAtivos().subscribe(res =>
      { 
        this.listaFuncionarioSetor = res;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/funcionario/funcao/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/funcionario/funcao/editar/'+id])
  }

  voltar(){
  this.route.navigate(['inicio'])
}

  novaFuncao(){
    this.route.navigate(['cadastro/funcionario/funcao/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/funcionario/funcao/excluir/'+id])
  }
}
