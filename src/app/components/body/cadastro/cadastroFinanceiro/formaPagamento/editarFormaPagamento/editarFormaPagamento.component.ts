import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPagamento } from 'src/app/components/interface/formaPagamento';
import { FormaPagamentoService } from 'src/app/components/service/formaPagamento.service';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-editar-forma-pagamento',
  templateUrl: './editarFormaPagamento.component.html',
  styleUrls: ['./editarFormaPagamento.component.css']
})
export class EditarFormaPagamentoComponent implements OnInit {
 
  constructor(private server: FormaPagamentoService, 
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {
        headerService.headerData = {
        title: 'Editar Pagamento',
        icon: 'payments',
        routerUrl: 'cadastro/financeiro/pagamento',
     }
    }

  formaPagamento!: FormaPagamento;
  mudouTela: boolean = false;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.formaPagamento = res;
    })
  }

  salvar(){
    this.server.cadastrarFormaPagamento(this.formaPagamento).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/financeiro/pagamento'])
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
