import { FormaPagamento } from './../../../../../interface/formaPagamento';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';
import { FormaPagamentoService } from 'src/app/components/service/formaPagamento.service';

@Component({
  selector: 'app-cadastro-forma-pagamento',
  templateUrl: './cadastroFormaPagamento.component.html',
  styleUrls: ['./cadastroFormaPagamento.component.css']
})
export class CadastroFormaPagamentoComponent implements OnInit {

  formaPagamento: FormaPagamento = new FormaPagamento();

  constructor(private route: Router, 
    private server: FormaPagamentoService,
    private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Cadastrar Pagamento',
          icon: 'payments',
          routerUrl: 'cadastro/financeiro/pagamento',
        }
    }

  ngOnInit(): void {

  }

  salvar(): void{
    this.server.cadastrarFormaPagamento(this.formaPagamento).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/financeiro/pagamento']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/financeiro/pagamento'])
  }

}
