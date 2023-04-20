import { Pageable } from '../../../../interface/pesquisaFiltrada/pageable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { Usuario } from 'src/app/components/interface/usuario';
import { HeaderService } from 'src/app/components/service/header.service';
import { UsuarioService } from 'src/app/components/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
   //pesquisa
   myControl = new FormControl<string | Usuario>('');
   listaUsuarioFiltrado!: Observable<Usuario[]>;
   //------------------------------------------------
 
   data = new Date('dd/MM/yyyy');
   listaUsuario: Usuario[] = []; 
   displayedColumns: string[] = ['id', 'nome', 'email', 'tipo', 'situacao.nome', 'acao'];
   dataSource$!: MatTableDataSource<Usuario>; 
   mostraSpinner!: Boolean;
   cliente: Boolean = false;
   funcionario: Boolean = false;
   fornecedor: Boolean = false;

   //Paginação
   length!: number;
   pageSize!: number;
   pageIndex!: number;

 
   constructor(
      private server: UsuarioService, 
      private route: Router,
      private headerService: HeaderService) {
       headerService.headerData = {
         title: 'Usuario',
         icon: 'person',
         routerUrl: 'inicio',
       }
      }
 
   ngOnInit(): void {
     this.loadPage({pageIndex: 0, pageSize: 4}); 
     this.atualizaLista();
   }

   loadPage(pageEvent: any){
    this.server.pesquisaPorPaginacao(pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe(page => {
        this.mostraSpinner = false;
        this.listaUsuario = page.content;
        this.dataSource$ = new MatTableDataSource<Usuario>(page.content);
        this.length = page.totalElements;
        this.pageSize = pageEvent.pageSize;
        this.pageIndex = pageEvent.pageIndex;
        this.mostraSpinner = true;
      });
  }
  
   selecionarAtivos(){
     this.server.pesquisaPorPaginacao(0, 4).subscribe(res =>
       { 
         this.listaUsuario = res.content;
       })
   }
   
   detalhes(id: number){
     this.route.navigate(['cadastro/usuario/detalhes/'+id])
   }
 
   editar(id: number){
     this.route.navigate(['cadastro/usuario/editar/'+id])
   }
 
   voltar(){
    this.route.navigate(['inicio'])
  }
 
   novoUsuario(){
     this.route.navigate(['cadastro/usuario/criar'])
   }
  
   deletar(id: number){
     this.route.navigate(['cadastro/usuario/excluir/'+id])
   }
 
   //pesquisa
   atualizaLista(){
     this.pesquisaFiltrada().subscribe(res =>{this.dataSource$ = new MatTableDataSource<Usuario>(res)});
   }
   
   displayFn(usuario: Usuario): string {
     return usuario && usuario?.nome ? usuario?.nome : '';
   }
 
   pesquisaFiltrada(): Observable<Usuario[]>{
     this.listaUsuarioFiltrado = this.myControl.valueChanges.pipe(
       startWith(''),
       distinctUntilChanged(),
       map(value => {
         const name = typeof value === 'string' ? value : value?.nome;
         return name ? this._filter(name as string): this.listaUsuario;
       }));
       return this.listaUsuarioFiltrado;
   }
 
   private _filter(nome: string): Usuario[] {
     const filterValue = nome.toLowerCase();
     if(nome != null && nome != ""){
      if(this.cliente === true){
       this.server.pesquisaCliente(filterValue).subscribe(res =>{ 
        this.listaUsuario = []
         this.listaUsuario = res; 
       });
      }else if(this.funcionario === true){
        this.server.pesquisaFuncionario(filterValue).subscribe(res =>{
          this.listaUsuario = []
          this.listaUsuario = res; 
        });
       }else if(this.fornecedor === true){
        this.server.pesquisaFornecedor(filterValue).subscribe(res =>{
          this.listaUsuario = []
          this.listaUsuario = res; 
        });
       }else{
        this.server.pesquisaTodos(filterValue).subscribe(res =>{
          this.listaUsuario = []
          this.listaUsuario = res; 
        });
       }
     }else{
      this.listaUsuario = []
      this.selecionarAtivos();
     }
       return this.listaUsuario; 
   }

   tipoCliente(){
    this.fornecedor = false;
    this.funcionario = false;
  }

  tipoFuncionario(){
    this.fornecedor = false;
    this.cliente = false;
  }

  tipoFornecedor(){
    this.cliente = false;
    this.funcionario = false;
  }

}
