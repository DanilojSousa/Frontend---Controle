import { Situacao } from './../../../../../interface/situacao';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoService } from 'src/app/components/service/situacao.service';

@Component({
  selector: 'app-cadastrarSituacao',
  templateUrl: './cadastrarSituacao.component.html',
  styleUrls: ['./cadastrarSituacao.component.css']
})
export class CadastrarSituacaoComponent implements OnInit {

  situacao: Situacao = new Situacao();

  constructor(private route: Router, 
    private server: SituacaoService,
    private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Cadastrar Situação',
          icon: 'more_horiz',
          routerUrl: 'cadastro/geral/situacao',
        }
    }

  ngOnInit(): void {

  }
  
  salvar(): void{
    this.server.cadastrarSituacao(this.situacao).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/geral/situacao']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/geral/situacao'])
  }

}
