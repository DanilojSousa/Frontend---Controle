import { PedidoProduto } from './../../../interface/pedidoProduto';
import { ProdutoService } from 'src/app/components/service/produto.service';
import { Produto } from 'src/app/components/interface/produto';
import { TipoPedidoService } from './../../../service/tipoPedido.service';
import { FormaPagamentoService } from './../../../service/formaPagamento.service';
import { FormaPagamento } from './../../../interface/formaPagamento';
import { SituacaoPedidoService } from './../../../service/situacaoPedido.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SituacaoPedido } from 'src/app/components/interface/situacaoPedido';
import { TipoPedido } from 'src/app/components/interface/tipoPedido';
import { Pedido } from 'src/app/components/interface/pedido';
import { FormControl} from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import { Usuario } from 'src/app/components/interface/usuario';
import { UsuarioService } from 'src/app/components/service/usuario.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  myControl = new FormControl<string | Usuario>('');
  listaUsuario!: Usuario[];
  listaUsuarioFiltrado!: Observable<Usuario[]>;

  listaProduto!: Produto[];
  listaSituacaoPedido: SituacaoPedido[] = [];
  listaTipoPedido: TipoPedido[] = [];
  listaFormaPagamento: FormaPagamento[] = [];
  
  pedidoProduto!: PedidoProduto;
  pedido: Pedido = new Pedido();
  usuario: Usuario = new Usuario();

  constructor(private router: Router,
    private situacaoRouter: SituacaoPedidoService,
    private formaPagamentoRouter: FormaPagamentoService,
    private tipoPedidoRouter: TipoPedidoService,
    private usuarioRouter: UsuarioService,
    private produtoRouter: ProdutoService
    ) {}

  ngOnInit(): void {
    this.pesquisaFiltrada();
    this.selecionarTipoPedido();
    this.selecionarSituacaoPedido();

    //this.selecionarFormaPagamento();
    //this.selecionarProduto();
  }

  displayFn(usuario: Usuario): string {
    return usuario && usuario.nome ? usuario.nome : '';
  }

  pesquisaFiltrada(){
    this.listaUsuarioFiltrado = this.myControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nome;
        return name ? this._filter(name as string): this.listaUsuario;
      }));
  }

  private _filter(nome: string): Usuario[] {
    const filterValue = nome.toLowerCase();
    this.usuarioRouter.pesquisaCliente(filterValue).subscribe(res =>{
      this.listaUsuario = res; 
    });
      return this.listaUsuario; 
  }


  selecionarSituacaoPedido(){
    this.situacaoRouter.selecionarTodos().subscribe(res =>{
      this.listaSituacaoPedido = res;
    })
  }

  selecionarProduto(){
    this.produtoRouter.selecionarTodos().subscribe(res =>{
      this.listaProduto = res;
    })
  }

  selecionarTipoPedido(){
    this.tipoPedidoRouter.selecionarTodos().subscribe(res =>{
      this.listaTipoPedido = res;
    })
  }
  selecionarFormaPagamento(){
    this.formaPagamentoRouter.selecionarTodos().subscribe(res =>{
      this.listaFormaPagamento = res;
    })
  }
  proximo(){

  }

  sair(){
    
  }
  

}
