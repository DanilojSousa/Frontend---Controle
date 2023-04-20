import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from 'src/app/components/interface/servico';
import { TipoPedido } from 'src/app/components/interface/tipoPedido';
import { HeaderService } from 'src/app/components/service/header.service';
import { ServicoService } from 'src/app/components/service/servico.service';
import { TipoPedidoService } from 'src/app/components/service/tipoPedido.service';

@Component({
  selector: 'app-editar-tipo-pedido',
  templateUrl: './editarTipoPedido.component.html',
  styleUrls: ['./editarTipoPedido.component.css']
})
export class EditarTipoPedidoComponent implements OnInit {

  constructor(private server: TipoPedidoService, 
    private serverServico: ServicoService,
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {
        headerService.headerData = {
        title: 'Editar Situação',
        icon: 'list_alt',
        routerUrl: 'cadastro/financeiro/tipo',
     }
    }

    tipoPedido!: TipoPedido;
    listaServico: Servico[] = [];
    mudouTela: boolean = false;

  ngOnInit(): void {
    this.selecionarPorId();
    this.selecionaServico();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.tipoPedido = res;
    })
  }

  selecionaServico(){
    this.serverServico.selecionarTodos().subscribe(res => {
      this.listaServico = res;
    })
  }

  salvar(){
    this.server.cadastrarTipoPedido(this.tipoPedido).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/financeiro/tipo'])
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
