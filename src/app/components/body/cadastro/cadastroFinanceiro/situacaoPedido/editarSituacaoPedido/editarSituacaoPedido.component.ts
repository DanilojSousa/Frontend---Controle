import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SituacaoPedido } from 'src/app/components/interface/situacaoPedido';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoPedidoService } from 'src/app/components/service/situacaoPedido.service';

@Component({
  selector: 'app-editar-situacao-pedido',
  templateUrl: './editarSituacaoPedido.component.html',
  styleUrls: ['./editarSituacaoPedido.component.css']
})
export class EditarSituacaoPedidoComponent implements OnInit {

  constructor(private server: SituacaoPedidoService, 
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {
        headerService.headerData = {
        title: 'Editar Situação',
        icon: 'more_horiz',
        routerUrl: 'cadastro/financeiro/situacao',
     }
    }

    situacaoPedido!: SituacaoPedido;
    mudouTela: boolean = false;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.situacaoPedido = res;
    })
  }

  salvar(){
    this.server.cadastrarSituacaoPedido(this.situacaoPedido).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/financeiro/situacao'])
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
