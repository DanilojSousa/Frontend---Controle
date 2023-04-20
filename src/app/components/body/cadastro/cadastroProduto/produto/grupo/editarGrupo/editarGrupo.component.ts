import { ProdutoService } from './../../../../../../service/produto.service';
import { GrupoProdutoService } from './../../../../../../service/grupoProduto.service';
import { GrupoProduto } from './../../../../../../interface/grupoProduto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';
import { FormControl } from '@angular/forms';
import { Produto } from 'src/app/components/interface/produto';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editarGrupo.component.html',
  styleUrls: ['./editarGrupo.component.css']
})
export class EditarGrupoComponent implements OnInit {

  grupoProduto!: GrupoProduto;
  myControl = new FormControl<string | Produto>('');
  listaProduto!: Produto[];
  listaProdutoFiltrado!: Observable<Produto[]>;
  mudouTela: boolean = false;
    
  constructor(private server: GrupoProdutoService, 
    private serverProduto: ProdutoService,
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Editar Grupo',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/grupo',
      }
    }

  ngOnInit(): void {
    this.selecionarPorId();
    this.pesquisaFiltrada();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.grupoProduto = res;
      this.myControl.setValue(res.produto);
    })
  }

  salvar(){
    if(this.listaProduto != undefined){
      this.grupoProduto.produto = this.listaProduto[0]
    }
      this.server.cadastrarGrupoProduto(this.grupoProduto).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/produto/grupo'])
  }

   //pesquisa 
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
     this.serverProduto.pesquisa(filterValue).subscribe(res =>{
       this.listaProduto = res; 
     });
       return this.listaProduto; 
   }

   onInput(){
    this.mudouTela = true;
  }

  podeDesativar(): boolean {
    if(this.mudouTela){
      confirm('A edição não foi salva, deseja sair?')
    }
    return true;
  }
 
}
