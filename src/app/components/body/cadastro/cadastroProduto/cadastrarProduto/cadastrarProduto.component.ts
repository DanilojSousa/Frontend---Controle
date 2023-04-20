import { UnidadeMedidaService } from './../../../../service/unidadeMedida.service';
import { UnidadeMedida } from './../../../../interface/unidadeMedida';
import { GrupoProduto } from './../../../../interface/grupoProduto';
import { Ncm } from './../../../../interface/ncm';
import { Marca } from './../../../../interface/marca';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/components/interface/produto';
import { Situacao } from 'src/app/components/interface/situacao';
import { GrupoProdutoService } from 'src/app/components/service/grupoProduto.service';
import { HeaderService } from 'src/app/components/service/header.service';
import { MarcaService } from 'src/app/components/service/marca.service';
import { NcmService } from 'src/app/components/service/ncm.service';
import { ProdutoService } from 'src/app/components/service/produto.service';
import { SituacaoService } from 'src/app/components/service/situacao.service';

@Component({
  selector: 'app-cadastrarProduto',
  templateUrl: './cadastrarProduto.component.html',
  styleUrls: ['./cadastrarProduto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  produtos: Produto = new Produto();

  listaSituacao: Situacao[] = [];
  listaNcm: Ncm[] = [];
  listaMarca: Marca[] = [];
  listaUnidade: UnidadeMedida[] = [];

  constructor(private route: Router, 
    private server: ProdutoService,
    private situation: SituacaoService,
    private ncm: NcmService,
    private marca: MarcaService,
    private unidade: UnidadeMedidaService,
    private headerService: HeaderService) { 
      
        headerService.headerData = {
          title: 'Cadastrar Produto',
          icon: 'inventory_2',
          routerUrl: 'cadastro/produto',
        }
    }

  ngOnInit(): void {
    this.selecionarSituacao();
    this.selecionarNcm();
    this.selecionarMarca();
    this.selecionarUnidade();
  }

  salvar(): void{
    this.server.cadastrarProduto(this.produtos).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/produto']);
    })
  }

  selecionarSituacao(){
    this.situation.selecionarTodos().subscribe(res => {
      this.listaSituacao = res;
    })
  }
  voltar(): void{
    this.route.navigate(['cadastro/produto'])
  }

  selecionarNcm(){
    this.ncm.selecionarTodos().subscribe(res => {
      this.listaNcm = res;
    })
  }

  selecionarMarca(){
    this.marca.selecionarTodos().subscribe(res => {
      this.listaMarca = res;
    })
  }

  selecionarUnidade(){
    this.unidade.selecionarTodos().subscribe(res => {
      this.listaUnidade = res;
    })
  }
}
