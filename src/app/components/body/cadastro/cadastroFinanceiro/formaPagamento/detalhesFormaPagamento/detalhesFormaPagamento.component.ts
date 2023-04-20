import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPagamento } from 'src/app/components/interface/formaPagamento';
import { FormaPagamentoService } from 'src/app/components/service/formaPagamento.service';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-detalhes-forma-pagamento',
  templateUrl: './detalhesFormaPagamento.component.html',
  styleUrls: ['./detalhesFormaPagamento.component.css']
})
export class DetalhesFormaPagamentoComponent implements OnInit {

  constructor(private server: FormaPagamentoService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Pagamento',
        icon: 'payments',
        routerUrl: 'cadastro/financeiro/pagamento',
      }
    }

  formaPagamento!: FormaPagamento;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.formaPagamento = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/financeiro/pagamento/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/financeiro/pagamento'])
  }

}
