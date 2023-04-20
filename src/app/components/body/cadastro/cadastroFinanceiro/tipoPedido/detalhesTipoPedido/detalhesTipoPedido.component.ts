import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from 'src/app/components/interface/servico';
import { TipoPedido } from 'src/app/components/interface/tipoPedido';
import { HeaderService } from 'src/app/components/service/header.service';
import { ServicoService } from 'src/app/components/service/servico.service';
import { TipoPedidoService } from 'src/app/components/service/tipoPedido.service';

@Component({
  selector: 'app-detalhes-tipo-pedido',
  templateUrl: './detalhesTipoPedido.component.html',
  styleUrls: ['./detalhesTipoPedido.component.css']
})
export class DetalhesTipoPedidoComponent implements OnInit {

  constructor(private server: TipoPedidoService, 
    private serverServico: ServicoService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Tipo',
        icon: 'list_alt',
        routerUrl: 'cadastro/financeiro/tipo',
      }
    }

  tipoPedido!: TipoPedido;
  listaServico: Servico[] = []

  ngOnInit(): void {
    this.selecionarPorId();
    this.selecionarServico();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.tipoPedido = res;
      })
  }
  selecionarServico(){
    this.serverServico.selecionarTodos().subscribe(res =>{
      this.listaServico = res;
    })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/financeiro/tipo/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/financeiro/tipo'])
  }

}
