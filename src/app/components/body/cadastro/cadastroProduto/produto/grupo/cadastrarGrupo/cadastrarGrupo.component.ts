import { ProdutoService } from './../../../../../../service/produto.service';
import { GrupoProduto } from '../../../../../../interface/grupoProduto';
import { GrupoProdutoService } from '../../../../../../service/grupoProduto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';
import { Produto } from 'src/app/components/interface/produto';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-cadastrar-grupo',
  templateUrl: './cadastrarGrupo.component.html',
  styleUrls: ['./cadastrarGrupo.component.css']
})
export class CadastrarGrupoComponent implements OnInit {

  grupoProduto: GrupoProduto = new GrupoProduto();

  constructor(private route: Router, 
    private grupo: GrupoProdutoService,
    private routerProduto: ProdutoService,
    private headerService: HeaderService) { 
      
        headerService.headerData = {
          title: 'Cadastrar Grupo',
          icon: 'inventory_2',
          routerUrl: 'cadastro/produto/grupo',
        }
    }

 ngOnInit(): void {
  this.pesquisaFiltrada();
 }

  salvar(): void{
    this.grupoProduto.produto = this.listaProduto[0]
    this.grupo.cadastrarGrupoProduto(this.grupoProduto!).subscribe(() =>{
      this.grupo.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/produto/grupo']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/produto/grupo'])
  }

  //pesquisa

  myControl = new FormControl<string | Produto>('');
  listaProduto!: Produto[];
  listaProdutoFiltrado!: Observable<Produto[]>;

  displayFn(produto: Produto): string {
    return produto && produto.nome ? produto.nome : '';
  }

  pesquisaFiltrada(){
    this.listaProdutoFiltrado = this.myControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nome;
        return name ? this._filter(name as string): this.listaProduto;
      }));
  }

  private _filter(nome: string): Produto[] {
    const filterValue = nome.toLowerCase();
    this.routerProduto.pesquisa(filterValue).subscribe(res =>{
      this.listaProduto = res; 
    });
      return this.listaProduto; 
  }

}
