import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, distinctUntilChanged, map, startWith } from 'rxjs';
import { Login } from 'src/app/components/interface/login';
import { HeaderService } from 'src/app/components/service/header.service';
import { LoginService } from 'src/app/components/service/login.service';

@Component({
  selector: 'app-loginCadastro',
  templateUrl: './loginCadastro.component.html',
  styleUrls: ['./loginCadastro.component.css']
})
export class LoginCadastroComponent implements OnInit {

   //pesquisa
   myControl = new FormControl<string | Login>('');
   listaLoginFiltrado!: Observable<Login[]>;
   //------------------------------------------------
 
   data = new Date('dd/MM/yyyy');
   listaLogin: Login[] = []; 
   displayedColumns: string[] = ['id', 'nome', 'apelido', 'email', 'acao'];
   dataSource$!: MatTableDataSource<Login>; 
   mostraSpinner!: Boolean;
   login: Login = new Login();

   //Paginação
   length!: number;
   pageSize!: number;
   pageIndex!: number;

   constructor(
      private server: LoginService, 
      private route: Router,
      private headerService: HeaderService) {
       headerService.headerData = {
         title: 'Login',
         icon: 'key',
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
        this.listaLogin = page.content;
        this.dataSource$ = new MatTableDataSource<Login>(page.content);
        this.length = page.totalElements;
        this.pageSize = pageEvent.pageSize;
        this.pageIndex = pageEvent.pageIndex;
        this.mostraSpinner = true;
      });
  }
  
   selecionarAtivos(){
     this.server.pesquisaPorPaginacao(0, 4).subscribe(res =>
       { 
         this.listaLogin = res.content;
       })
   }
   
   detalhes(id: number){
     this.route.navigate(['cadastro/login/detalhes/'+id])
   }
 
   editar(id: number){
     this.route.navigate(['cadastro/login/editar/'+id])
   }
 
   voltar(){
    this.route.navigate(['inicio'])
  }
 
   novoLogin(){
     this.route.navigate(['cadastro/login/criar'])
   }
  
   deletar(id: number){
     this.route.navigate(['cadastro/login/excluir/'+id])
   }
 
   //pesquisa
   atualizaLista(){
     this.pesquisaFiltrada().subscribe(res =>{this.dataSource$ = new MatTableDataSource<Login>(res)});
   }
   
   displayFn(login: Login): string {
     return login && login.usuario?.nome ? login.usuario?.nome : '';
   }
 
   pesquisaFiltrada(): Observable<Login[]>{
     this.listaLoginFiltrado = this.myControl.valueChanges.pipe(
       startWith(''),
       distinctUntilChanged(),
       map(value => {
         const name = typeof value === 'string' ? value : value?.apelido;

         return name ? this._filter(name as string): this.listaLogin;
       }));
       return this.listaLoginFiltrado;
   }
 
   private _filter(nome: string): Login[] {
     const filterValue = nome.toLowerCase();
     if(nome != null && nome != ""){
      this.server.pesquisaLogin(filterValue).subscribe(res =>{ 
        this.listaLogin = []
         this.listaLogin = res; 
       });
      }else{
      this.listaLogin = []
      this.selecionarAtivos();
     }
       return this.listaLogin; 
   }
}
