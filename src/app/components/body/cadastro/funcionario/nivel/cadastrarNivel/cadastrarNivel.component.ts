import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NivelFuncao } from 'src/app/components/interface/NivelFuncao';
import { HeaderService } from 'src/app/components/service/header.service';
import { NivelFuncaoService } from 'src/app/components/service/nivelFuncao.service';

@Component({
  selector: 'app-cadastrarNivel',
  templateUrl: './cadastrarNivel.component.html',
  styleUrls: ['./cadastrarNivel.component.css']
})
export class CadastrarNivelComponent implements OnInit {

  nivelFuncao: NivelFuncao = new NivelFuncao();

  constructor(private route: Router, 
    private server: NivelFuncaoService,
    private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Cadastrar Serviço',
          icon: 'trending_up',
          routerUrl: 'cadastro/funcionario/nivel',
        }
    }

  ngOnInit(): void {

  }

  salvar(): void{
    this.server.cadastrarNivelFuncao(this.nivelFuncao).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/funcionario/nivel']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/funcionario/nivel'])
  }

}
