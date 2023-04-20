import { SituacaoPedido } from './../../../../../interface/situacaoPedido';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SituacaoPedidoService } from 'src/app/components/service/situacaoPedido.service';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-cadastro-situacao-pedido',
  templateUrl: './cadastroSituacaoPedido.component.html',
  styleUrls: ['./cadastroSituacaoPedido.component.css']
})
export class CadastroSituacaoPedidoComponent implements OnInit {

  situacaoPedido: SituacaoPedido = new SituacaoPedido();

  constructor(private route: Router, 
    private server: SituacaoPedidoService,
    private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Cadastrar Situação',
          icon: 'more_horiz',
          routerUrl: 'cadastro/financeiro/situacao',
        }
    }

  ngOnInit(): void {

  }

  salvar(): void{
    this.server.cadastrarSituacaoPedido(this.situacaoPedido).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/financeiro/situacao']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/financeiro/situacao'])
  }
}
