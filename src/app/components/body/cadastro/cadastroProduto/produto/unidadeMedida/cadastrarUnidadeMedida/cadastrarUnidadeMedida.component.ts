import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UnidadeMedida } from 'src/app/components/interface/unidadeMedida';
import { HeaderService } from 'src/app/components/service/header.service';
import { UnidadeMedidaService } from 'src/app/components/service/unidadeMedida.service';

@Component({
  selector: 'app-cadastrar-unidade-medida',
  templateUrl: './cadastrarUnidadeMedida.component.html',
  styleUrls: ['./cadastrarUnidadeMedida.component.css']
})
export class CadastrarUnidadeMedidaComponent implements OnInit {

  unidadeMedida: UnidadeMedida = new UnidadeMedida();

  constructor(private route: Router, 
    private server: UnidadeMedidaService,
    private headerService: HeaderService) { 
      
        headerService.headerData = {
          title: 'Cadastrar Unidade Medida',
          icon: 'inventory_2',
          routerUrl: 'cadastro/produto/unidadeMedida',
        }
    }

 ngOnInit(): void {

  }

  salvar(): void{
    this.server.cadastrarUnidadeMedida(this.unidadeMedida).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/produto/unidadeMedida']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/produto/unidadeMedida'])
  }

}
