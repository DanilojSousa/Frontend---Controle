import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { Produto } from 'src/app/components/interface/produto';
import { HeaderService } from 'src/app/components/service/header.service';
import { ProdutoService } from 'src/app/components/service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

    //pesquisa
    myControl = new FormControl<string | Produto>('');
    listaProdutoFiltrado!: Observable<Produto[]>;
    //------------------------------------------------

  data = new Date('dd/MM/yyyy');
  listaProduto: Produto[] = []; 
  displayedColumns: string[] = ['id', 'nome', 'marca', 'modelo', 'situacao.nome', 'acao'];
  dataSource$!: MatTableDataSource<Produto>; 
  mostraSpinner!: Boolean;

  //Paginação
  length!: number;
  pageSize!: number;
  pageIndex!: number;

  constructor(private server: ProdutoService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Produto',
        icon: 'inventory_2',
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
        this.listaProduto = page.content;
        this.dataSource$ = new MatTableDataSource<Produto>(page.content);
        this.length = page.totalElements;
        this.pageSize = pageEvent.pageSize;
        this.pageIndex = pageEvent.pageIndex;
        this.mostraSpinner = true;
      });
  }

  selecionarTodos(){
    this.server.selecionarAtivos().subscribe(res =>
      { 
        this.listaProduto = res;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/produto/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/produto/editar/'+id])
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  novoProduto(){
    this.route.navigate(['cadastro/produto/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/produto/excluir/'+id])
  }

   //pesquisa
   atualizaLista(){
    this.pesquisaFiltrada().subscribe(res =>{this.dataSource$ = new MatTableDataSource<Produto>(res)});
  }
  
  displayFn(produto: Produto): string {
    return produto && produto.nome ? produto.nome : '';
  }

  pesquisaFiltrada(): Observable<Produto[]>{
    this.listaProdutoFiltrado = this.myControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nome;
        this.listaProduto = this._filter(name as string)
        return name ? this._filter(name as string): this.listaProduto;
      }));
      return this.listaProdutoFiltrado;
  }

  private _filter(nome: string): Produto[] {
    const filterValue = nome.toLowerCase();
    if(nome != null && nome != ""){
      this.server.pesquisa(filterValue).subscribe(res =>{
        this.listaProduto = []
        this.listaProduto = res; 
      });
    }else{
      this.selecionarTodos();
    }
      return this.listaProduto; 
  }

}
