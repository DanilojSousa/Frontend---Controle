import { GrupoProduto } from './../../../../interface/grupoProduto';
import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/components/interface/marca';
import { Situacao } from 'src/app/components/interface/situacao';
import { UnidadeMedida } from 'src/app/components/interface/unidadeMedida';
import { Ncm } from 'src/app/components/interface/ncm';
import { ProdutoService } from 'src/app/components/service/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SituacaoService } from 'src/app/components/service/situacao.service';
import { GrupoProdutoService } from 'src/app/components/service/grupoProduto.service';
import { MarcaService } from 'src/app/components/service/marca.service';
import { NcmService } from 'src/app/components/service/ncm.service';
import { UnidadeMedidaService } from 'src/app/components/service/unidadeMedida.service';
import { HeaderService } from 'src/app/components/service/header.service';
import { Produto } from 'src/app/components/interface/produto';
import { IEditaCanDeactivate } from 'src/app/account/shared/intefaceEditaDeactivateGuard';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editarProduto.component.html',
  styleUrls: ['./editarProduto.component.css']
})
export class EditarProdutoComponent implements OnInit, IEditaCanDeactivate {

  listaSituacao!: Situacao[];
  listaMarca!: Marca[];
  listaUnidadeMedida!: UnidadeMedida[];
  listaNcm!: Ncm[];
  produto!: Produto;
  mostraSpinner!: Boolean;
  mudouTela: boolean = false;
    
    
  constructor(private server: ProdutoService, 
    private router: ActivatedRoute, 
    private route: Router,
    private situacao: SituacaoService,
    private marca: MarcaService,
    private ncm: NcmService,
    private medida: UnidadeMedidaService,
    private headerService: HeaderService) {
        headerService.headerData = {
          title: 'Editar Produto',
          icon: 'inventory_2',
          routerUrl: 'cadastro/produto',
     }
    }

  ngOnInit(): void {
    this.selecionarPorId();
    this.selecionarSituacao();
    this.selecionarNcm();
    this.selecionarMarca();
    this.selecionarMedida();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.produto = res;
    })
  }

  salvar(){
      this.situacao.selecionarPorId(this.produto.situacao.id!.toString()).subscribe(res =>{
        this.produto.situacao = res;
      });
      this.marca.selecionarPorId(this.produto.marca.id!.toString()).subscribe(res =>{
        this.produto.marca = res;
      });
      this.ncm.selecionarPorId(this.produto.ncm.id!.toString()).subscribe(res =>{
        this.produto.ncm = res;
      });
      this.medida.selecionarPorId(this.produto.unidadeMedida.id!.toString()).subscribe(res =>{
        this.produto.unidadeMedida = res;
      });
    
    this.server.cadastrarProduto(this.produto).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/produto'])
  }

  selecionarSituacao(){
    this.situacao.selecionarTodos().subscribe(res => {
      this.listaSituacao = res;
      this.mostraSpinner = true;
    })
  }
  selecionarMarca(){
    this.marca.selecionarTodos().subscribe(res => {
      this.listaMarca = res;
      this.mostraSpinner = true;
    })
  }

  selecionarMedida(){
    this.medida.selecionarTodos().subscribe(res => {
      this.listaUnidadeMedida = res;
      this.mostraSpinner = true;
    })
  }

  selecionarNcm(){
    this.ncm.selecionarTodos().subscribe(res => {
      this.listaNcm = res;
      this.mostraSpinner = true;
    })
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
