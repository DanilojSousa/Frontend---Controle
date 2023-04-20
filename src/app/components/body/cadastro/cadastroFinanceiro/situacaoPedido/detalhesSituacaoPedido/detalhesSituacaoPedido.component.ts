import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SituacaoPedido } from 'src/app/components/interface/situacaoPedido';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoPedidoService } from 'src/app/components/service/situacaoPedido.service';

@Component({
  selector: 'app-detalhes-situacao-pedido',
  templateUrl: './detalhesSituacaoPedido.component.html',
  styleUrls: ['./detalhesSituacaoPedido.component.css']
})
export class DetalhesSituacaoPedidoComponent implements OnInit {

  constructor(private server: SituacaoPedidoService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Situção',
        icon: 'more_horiz',
        routerUrl: 'cadastro/financeiro/situacao',
      }
    }

  situacaoPedido!: SituacaoPedido;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.situacaoPedido = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/financeiro/situacao/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/financeiro/situacao'])
  }


}
