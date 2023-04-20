import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from 'src/app/components/interface/servico';
import { TipoPedido } from 'src/app/components/interface/tipoPedido';
import { HeaderService } from 'src/app/components/service/header.service';
import { ServicoService } from 'src/app/components/service/servico.service';
import { TipoPedidoService } from 'src/app/components/service/tipoPedido.service';

@Component({
  selector: 'app-cadastro-tipo-pedido',
  templateUrl: './cadastroTipoPedido.component.html',
  styleUrls: ['./cadastroTipoPedido.component.css']
})
export class CadastroTipoPedidoComponent implements OnInit {

  tipoPedido: TipoPedido = new TipoPedido();
  listaServico: Servico[] = [];

  constructor(private route: Router, 
    private server: TipoPedidoService,
    private serverServico: ServicoService,
    private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Cadastrar Tipo',
          icon: 'list_alt',
          routerUrl: 'cadastro/financeiro/tipo',
        }
    }

  ngOnInit(): void {
    this.selecionarServico();
  }
  
  salvar(): void{
    this.server.cadastrarTipoPedido(this.tipoPedido).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/financeiro/tipo']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/financeiro/tipo'])
  }

  selecionarServico(){
    this.serverServico.selecionarTodos().subscribe(res =>{
      this.listaServico = res;
    })
  }

}
