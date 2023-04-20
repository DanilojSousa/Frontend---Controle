import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from 'src/app/components/interface/servico';
import { HeaderService } from 'src/app/components/service/header.service';
import { ServicoService } from 'src/app/components/service/servico.service';

@Component({
  selector: 'app-cadastrar-servico',
  templateUrl: './cadastroServico.component.html',
  styleUrls: ['./cadastroServico.component.css']
})
export class CadastroServicoComponent implements OnInit {

  servico: Servico = new Servico();

  constructor(private route: Router, 
    private server: ServicoService,
    private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Cadastrar Serviço',
          icon: 'sync_alt',
          routerUrl: 'cadastro/financeiro/servico',
        }
    }

  ngOnInit(): void {

  }

  salvar(): void{
    this.server.cadastrarServico(this.servico).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/financeiro/servico']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/financeiro/servico'])
  }

}
